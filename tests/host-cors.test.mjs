import assert from 'node:assert/strict'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

/**
 * The plugin's HTTP routes are unauthenticated, and `copy-local-file` copies an
 * arbitrary path from the request body into the folder the file route serves.
 * Answering a blanket `Access-Control-Allow-Origin: *` therefore handed any
 * website the user visits a way to read those responses back out.
 *
 * These cases pin the boundary: the two hosts this plugin runs in yes, every real
 * website no.
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const { isAppOrigin } = await import(pathToFileURL(resolve(root, 'src/index.ts')).href)

test('the loopback origins of the web UI are answered', () => {
  assert.equal(isAppOrigin('http://127.0.0.1:19387'), true)
  assert.equal(isAppOrigin('http://127.0.0.1'), true)
  assert.equal(isAppOrigin('http://localhost:3080'), true)
  assert.equal(isAppOrigin('https://localhost:3080'), true)
  assert.equal(isAppOrigin('http://[::1]:3939'), true)
})

test('the desktop application scheme is answered', () => {
  // The renderer may be served from the app's own scheme rather than loopback.
  assert.equal(isAppOrigin('dsh-app://app'), true)
  assert.equal(isAppOrigin('file://'), true)
})

test('websites are not answered', () => {
  assert.equal(isAppOrigin('https://evil.example'), false)
  assert.equal(isAppOrigin('http://evil.example'), false)
  assert.equal(isAppOrigin('https://evil.example:19387'), false)
  // A page served from a hostname that merely contains "localhost" is not loopback.
  assert.equal(isAppOrigin('http://localhost.evil.example'), false)
  assert.equal(isAppOrigin('http://127.0.0.1.evil.example'), false)
  // Sandboxed frames send `null` from anywhere, so it names no host.
  assert.equal(isAppOrigin('null'), false)
})
