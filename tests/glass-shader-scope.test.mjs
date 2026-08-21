import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('sidebar element remains available throughout the render frame', async () => {
  const source = await readFile(new URL('../src/client/glass-shader.ts', import.meta.url), 'utf8')
  const declaration = 'const sidebarEl = document.querySelector<HTMLElement>'
  const fadingDeclaration = 'let isSidebarFading = false'
  const rightDeclaration = 'let sidebarRight = 0'
  const geometryBranch = 'if (sidebarEl) {'
  const laterUse = 'const isInsideSidebar = sidebarEl !== null && sidebarEl.contains(el)'
  const fadingUse = 'if (isSidebarCollapsed || isSidebarFading) {'

  const declarationIndex = source.indexOf(declaration)
  const geometryBranchIndex = source.indexOf(geometryBranch)
  const laterUseIndex = source.indexOf(laterUse)

  assert.notEqual(declarationIndex, -1, 'sidebarEl declaration is missing')
  assert.notEqual(source.indexOf(fadingDeclaration), -1, 'isSidebarFading declaration is missing')
  assert.notEqual(source.indexOf(rightDeclaration), -1, 'sidebarRight declaration is missing')
  assert.notEqual(geometryBranchIndex, -1, 'sidebar geometry branch is missing')
  assert.notEqual(laterUseIndex, -1, 'later sidebarEl use is missing')
  assert.ok(
    declarationIndex < geometryBranchIndex,
    'sidebarEl must be declared before sidebar geometry is calculated so later lens scanning can use it',
  )
  assert.ok(declarationIndex < laterUseIndex)
  assert.ok(source.indexOf(fadingDeclaration) < source.indexOf(fadingUse))
})

test('fragment shader has a complete entry point and link diagnostics', async () => {
  const source = await readFile(new URL('../src/client/glass-shader.ts', import.meta.url), 'utf8')
  const fragmentStart = source.indexOf('const FS_SRC = `')
  const fragmentEnd = source.indexOf('\n`', fragmentStart + 1)
  const fragmentSource = source.slice(fragmentStart, fragmentEnd)

  assert.match(fragmentSource, /void main\s*\(\s*\)/, 'fragment shader main() is missing')
  assert.match(source, /getShaderParameter\([^,]+,\s*gl!\.COMPILE_STATUS\)/)
  assert.match(source, /getProgramParameter\([^,]+,\s*gl\.LINK_STATUS\)/)
})

test('layer 2 lens refraction is composited after layer 1 chat and modal backdrops', async () => {
  const source = await readFile(new URL('../src/client/glass-shader.ts', import.meta.url), 'utf8')
  const fragmentStart = source.indexOf('const FS_SRC = `')
  const fragmentEnd = source.indexOf('\n`', fragmentStart + 1)
  const fragmentSource = source.slice(fragmentStart, fragmentEnd)
  const layer1Start = fragmentSource.indexOf('float chatDist =')
  const layer1ModalBranch = fragmentSource.indexOf('else if (modalDist <= 0.0)', layer1Start)
  const lensBranch = fragmentSource.indexOf('if (bestD <= 0.0)')
  const output = fragmentSource.indexOf('gl_FragColor = vec4(color, 1.0)')

  assert.notEqual(layer1Start, -1, 'layer 1 backdrop composition is missing')
  assert.notEqual(layer1ModalBranch, -1, 'modal backdrop branch is missing')
  assert.notEqual(lensBranch, -1, 'layer 2 lens branch is missing')
  assert.notEqual(output, -1, 'fragment shader output is missing')
  assert.ok(
    layer1ModalBranch < lensBranch,
    'layer 1 chat/modal backdrops must be drawn before the lens or they overwrite composer refraction',
  )
  assert.ok(lensBranch < output, 'lens refraction must be the final optical composition before output')
})

test('layer 2 preserves the strong liquid lens calibration for existing settings', async () => {
  const source = await readFile(new URL('../src/client/glass-shader.ts', import.meta.url), 'utf8')

  assert.match(
    source,
    /vec2 internalBulge = normPos \* \(1\.0 - length\(normPos\) \* 0\.35\) \* 0\.35 \* u_bulge/,
    'existing bulge values must retain the original strong full-body lens displacement',
  )
  assert.match(
    source,
    /edgeDir \* \(edgeSlope \* 0\.35 \+ exp\(-\(-bestD\) \* 0\.08\) \* 0\.18\)/,
    'glass boundaries must preserve the strong edge refraction visible in the reference rendering',
  )
  assert.match(
    source,
    /max\(u_bevel_width \* u_resolution\.y, 8\.0\)/,
    'existing bevel values must retain the original screen-space boundary width',
  )
  assert.match(
    source,
    /\(internalBulge \+ edgeOffset\) \* max\(u_ior - 1\.0, 0\.08\) \* 1\.6 \+ flowOffset/,
    'the same IOR and bulge settings must keep their original optical strength',
  )
  assert.match(
    source,
    /u_dispersion \* 3\.0 \* mix\(0\.5, 2\.5, edgeSlope\)/,
    'edge dispersion must retain the original prism amplification',
  )
})

test('layer 2 ripple tension contributes to lens refraction', async () => {
  const source = await readFile(new URL('../src/client/glass-shader.ts', import.meta.url), 'utf8')
  const fragmentStart = source.indexOf('const FS_SRC = `')
  const fragmentEnd = source.indexOf('\n`', fragmentStart + 1)
  const fragmentSource = source.slice(fragmentStart, fragmentEnd)

  assert.match(fragmentSource, /u_ripple0\.xy/)
  assert.match(fragmentSource, /u_ripple1\.xy/)
  assert.match(fragmentSource, /u_ripple_amp/)
  assert.match(fragmentSource, /lensOffset\s*\+=/)
})

test('composer card exposes the configured layer 2 shadow', async () => {
  const source = await readFile(new URL('../src/client/liquid-glass.module.css', import.meta.url), 'utf8')
  const composerStart = source.indexOf('[data-dsh-liquid-glass] [class*=\'InputTrigger_box\']')
  const composerEnd = source.indexOf('\n}', composerStart)
  const composerBlock = source.slice(composerStart, composerEnd)

  assert.match(composerBlock, /box-shadow:\s*var\(--dsh-l2-shadow/)
  assert.doesNotMatch(composerBlock, /box-shadow:\s*none\s*!important/)
})
