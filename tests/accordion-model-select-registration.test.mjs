import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('accordion model selector declares every context service used by its slot face', async () => {
  const source = await readFile(new URL('../src/client/index.ts', import.meta.url), 'utf8')

  assert.match(
    source,
    /export const inject = \[[^\]]*'sessions'[^\]]*\]/,
    'sessions must be declared at plugin scope before the model slot reads scope.sessions',
  )
  assert.match(source, /priority:\s*-10/)
  assert.match(source, /AccordionModelSelect/)
})

test('accordion selector binds the official model locale namespace', async () => {
  const source = await readFile(new URL('../src/client/index.ts', import.meta.url), 'utf8')

  assert.match(source, /locale:\s*'model'/)
  assert.doesNotMatch(source, /locale:\s*'@deepseek-ai\/dsh-client-ui-model-selection'/)
})

test('accordion selector uses a neutral glass palette instead of saturated provider bars', async () => {
  const css = await readFile(new URL('../src/client/liquid-glass.module.css', import.meta.url), 'utf8')
  const index = await readFile(new URL('../src/client/index.ts', import.meta.url), 'utf8')

  assert.match(css, /--dsh-model-menu-bg:/)
  assert.match(css, /--dsh-model-panel-bg:/)
  assert.match(css, /text-transform:\s*none\s*!important/)
  assert.match(css, /--dsh-model-provider-color:\s*rgba\(255,\s*255,\s*255,\s*0\.9\)/)
  assert.match(css, /--dsh-model-provider-bg:\s*transparent/)
  assert.match(index, /html\[data-dsh-liquid-glass\] \.dsh-model-select-group-title[\s\S]*?color:\s*rgba\(255,\s*255,\s*255,\s*0\.9\)\s*!important/)
  assert.match(index, /html\[data-dsh-liquid-glass\] \.dsh-model-select-group-title[\s\S]*?background:\s*transparent\s*!important/)
  assert.match(index, /html\[data-dsh-liquid-glass\] \.dsh-model-select-group-title[\s\S]*?backdrop-filter:\s*none\s*!important/)
})
