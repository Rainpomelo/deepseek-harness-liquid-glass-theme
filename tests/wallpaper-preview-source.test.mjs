import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('built-in video previews strip the internal video scheme before assigning src', async () => {
  const source = await readFile(
    new URL('../src/client/LiquidGlassAppearanceRow.tsx', import.meta.url),
    'utf8',
  )

  assert.match(
    source,
    /src=\{normalizeVideoSource\(wp\.url\)\}/,
    'the preview video must receive a browser-loadable data:video URL, not the internal video:data: URL',
  )
})
