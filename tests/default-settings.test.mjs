import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const EXPECTED_DEFAULTS = {
  l1Blur: '2',
  l1Opacity: '0.1',
  l1Border: '0.1',
  modalBlur: '5',
  l3MaskOpacity: '0.15',
  ior: '1.3',
  bulge: '0.25',
  dispersion: '0',
  bevel: '0.01',
  lensBlur: '0',
  darkening: '0',
  rimIntensity: '0',
  lightAngle: '105',
  vibrancy: '1.2',
  rippleAmp: '0.5',
  dropShadowOpacity: '0',
  dropShadowBlur: '48',
  dropShadowY: '16',
  bgBlur: '0',
  bgLiquidEnabled: 'true',
  bgLiquidAmp: '0.55',
  bgLiquidScale: '0.4',
  bgLiquidSpeed: '0.1',
  bgLiquidDispersion: '0.025',
}

function extractObjectBody(source, marker) {
  const start = source.indexOf(marker)
  assert.notEqual(start, -1, `missing default object marker: ${marker}`)
  const end = source.indexOf('\n}', start)
  assert.notEqual(end, -1, `missing default object terminator: ${marker}`)
  return source.slice(start, end)
}

function readLiteral(objectBody, key) {
  const match = objectBody.match(new RegExp(`^\\s*${key}:\\s*([^,\\r\\n]+),?\\s*$`, 'm'))
  assert.ok(match, `missing default field: ${key}`)
  return match[1].trim()
}

test('host and client defaults match the verified liquid glass parameters', async () => {
  const [hostSource, clientSource] = await Promise.all([
    readFile(new URL('../src/index.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/client/settings-store.ts', import.meta.url), 'utf8'),
  ])
  const hostDefaults = extractObjectBody(hostSource, 'const DEFAULT_SETTINGS = {')
  const clientDefaults = extractObjectBody(
    clientSource,
    'export const LIQUID_GLASS_DEFAULTS: LiquidGlassSettings = {',
  )

  for (const [key, expected] of Object.entries(EXPECTED_DEFAULTS)) {
    assert.equal(readLiteral(hostDefaults, key), expected, `host default mismatch for ${key}`)
    assert.equal(readLiteral(clientDefaults, key), expected, `client default mismatch for ${key}`)
  }

  assert.match(
    hostSource,
    /if \(!fs\.existsSync\(settingsFile\)\)\s*{\s*fs\.writeFileSync\(settingsFile,/,
    'existing user settings must not be overwritten during startup',
  )
})
