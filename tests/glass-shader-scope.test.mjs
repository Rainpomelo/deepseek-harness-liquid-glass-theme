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
