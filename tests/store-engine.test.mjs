import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

// The store engine lives in a different package per DSH generation:
//   0.1.0-rc.x … 0.1.1-rc.2 → `@deepseek-ai/dsh-client-runtime/client`
//   0.1.2-alpha.2 and later → `@deepseek-ai/dsh-client-store`
// Only the modern layout is installed here, so the legacy branch is covered by
// driving `pickStoreEngine` with a fake host resolver.
const store = await import(pathToFileURL(resolve(root, 'src/client/settings-store.ts')).href)

const MODERN = '@deepseek-ai/dsh-client-store'
const LEGACY = '@deepseek-ai/dsh-client-runtime/client'

const engine = { defineStore: () => ({}) }

test('resolves the modern store package', () => {
  const load = (id) => {
    if (id === MODERN) return engine
    throw new Error(`Cannot find module '${id}'`)
  }
  assert.equal(store.pickStoreEngine(load), engine)
})

test('falls back to the 0.1.x client runtime when the modern package is absent', () => {
  const calls = []
  const load = (id) => {
    calls.push(id)
    if (id === LEGACY) return engine
    throw new Error(`Cannot find module '${id}'`)
  }
  assert.equal(store.pickStoreEngine(load), engine)
  assert.deepEqual(calls, [MODERN, LEGACY], 'tries the modern layout first, then the legacy one')
})

test('prefers the modern package when a host somehow ships both', () => {
  const modern = { defineStore: () => 'modern' }
  const legacy = { defineStore: () => 'legacy' }
  assert.equal(store.pickStoreEngine((id) => (id === MODERN ? modern : legacy)), modern)
})

test('reports every attempt when no candidate exposes defineStore', () => {
  const load = (id) => {
    if (id === MODERN) return { notAStore: true }
    throw new Error('ENOENT')
  }
  assert.throws(
    () => store.pickStoreEngine(load),
    (error) => {
      assert.match(error.message, /no store engine on this host/)
      assert.match(error.message, /dsh-client-store: no defineStore export/)
      assert.match(error.message, /dsh-client-runtime\/client: ENOENT/)
      return true
    },
  )
})

test('the shipped bundle resolves both layouts through the guarded resolver', async () => {
  const bundle = await readFile(resolve(root, 'lib/client.js'), 'utf8')
  assert.match(bundle, /require\("@deepseek-ai\/dsh-client-store"\)/)
  assert.match(bundle, /require\("@deepseek-ai\/dsh-client-runtime\/client"\)/)
  assert.match(bundle, /function pickStoreEngine\(/, 'resolver survives bundling')
  assert.doesNotMatch(
    bundle,
    /^var import_\w+ = require\("@deepseek-ai\/dsh-client-store"\)/m,
    'no top-level (unguarded) store import remains',
  )
})

test('the static inject list only names services both generations publish', async () => {
  const source = await readFile(resolve(root, 'src/client/index.ts'), 'utf8')
  const declaration = source.match(/export const inject = \[([^\]]*)\]/)
  assert.ok(declaration, 'static inject declaration found')
  const names = declaration[1]
    .split(',')
    .map((value) => value.trim().replace(/^'|'$/g, ''))
    .filter(Boolean)
  assert.deepEqual(names, ['theme', 'slots', 'locale', 'sessions'])
  // A static inject that never resolves leaves the plugin pending forever, and
  // 0.1.0-rc.x / 0.1.1-rc.x publish no `remote.session` service.
  assert.ok(!names.includes('remote.session'))
  assert.match(source, /ctx\.inject\(\['slots', 'modelDirectories', 'sessions'\]/)
})
