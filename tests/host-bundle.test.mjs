import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

/**
 * The host half is bundled as ESM (`build.mjs`, `nodeConfig`). `__dirname` and
 * `__filename` do not exist in that scope: referring to one throws a
 * ReferenceError, and because `seedDefaultAssets` wraps its body in a bare
 * `try { } catch {}` the failure was invisible — a fresh install simply never
 * received its bundled default wallpapers. Confirmed on DSH 0.2.0-rc.2 by
 * deleting a seeded wallpaper and restarting the app: it did not come back.
 *
 * This guards the class of mistake, not just that one line.
 */
test('the host bundle resolves its own directory without CJS globals', async () => {
  const bundle = await readFile(new URL('../lib/index.js', import.meta.url), 'utf8')

  // Comments survive the build (it is not minified) and this repository's own
  // documentation names the offending global, so strip them before looking.
  const code = bundle
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^[ \t]*\/\/.*$/gm, '')

  assert.doesNotMatch(code, /\b__dirname\b/, 'ESM has no __dirname')
  assert.doesNotMatch(code, /\b__filename\b/, 'ESM has no __filename')
  assert.match(code, /import\.meta\.url/, 'the bundle derives its directory from import.meta.url')
})
