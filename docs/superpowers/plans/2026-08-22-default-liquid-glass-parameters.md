# Default Liquid Glass Parameters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make fresh or partially missing liquid-glass configuration use the verified screenshot parameters without overwriting persisted user settings.

**Architecture:** Keep the host seed object and client fallback object as the two existing sources of defaults. Add a source-level regression test that verifies both objects expose the same optical and background values, while retaining the host's create-only persistence guard.

**Tech Stack:** TypeScript, React client runtime, Node.js test runner, esbuild build script.

---

### Task 1: Add a failing default-consistency regression test

**Files:**
- Create: `tests/default-settings.test.mjs`
- Read: `src/index.ts`
- Read: `src/client/settings-store.ts`

- [ ] **Step 1: Write the failing test**

Create a Node test that reads both TypeScript sources, extracts the two default object bodies, and verifies these literals in both objects:

```js
const EXPECTED_DEFAULTS = {
  l1Blur: '2', l1Opacity: '0.1', l1Border: '0.1', modalBlur: '5',
  l3MaskOpacity: '0.15', ior: '1.3', bulge: '0.25', dispersion: '0',
  bevel: '0.01', lensBlur: '0', darkening: '0', rimIntensity: '0',
  lightAngle: '105', vibrancy: '1.2', rippleAmp: '0.5',
  dropShadowOpacity: '0', dropShadowBlur: '48', dropShadowY: '16',
  bgBlur: '0', bgLiquidEnabled: 'true', bgLiquidAmp: '0.55',
  bgLiquidScale: '0.4', bgLiquidSpeed: '0.1', bgLiquidDispersion: '0.025',
}
```

Also assert that `src/index.ts` still contains `if (!fs.existsSync(settingsFile))` so upgrades do not overwrite the existing settings file.

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test tests/default-settings.test.mjs`

Expected: FAIL because the existing host/client defaults differ from the approved values.

### Task 2: Synchronize host and client defaults

**Files:**
- Modify: `src/index.ts`
- Modify: `src/client/settings-store.ts`
- Test: `tests/default-settings.test.mjs`

- [ ] **Step 1: Update the host seed defaults**

Change only the approved fields in `DEFAULT_SETTINGS`:

```ts
l1Border: 0.1,
l3MaskOpacity: 0.15,
bulge: 0.25,
darkening: 0,
dropShadowOpacity: 0,
```

Keep its existing create-only settings-file behavior.

- [ ] **Step 2: Update the client fallback defaults**

Set all fields listed in `EXPECTED_DEFAULTS` to the approved values in `LIQUID_GLASS_DEFAULTS`. Keep wallpaper data and wallpaper selection behavior unchanged.

- [ ] **Step 3: Run the focused test and verify success**

Run: `node --test tests/default-settings.test.mjs`

Expected: PASS.

### Task 3: Build, verify, and publish

**Files:**
- Modify through build: `lib/index.js`
- Modify through build: `lib/index.js.map`
- Modify through build: `lib/client.js`
- Modify through build: `lib/client.js.map`

- [ ] **Step 1: Rebuild the independent plugin**

Run: `npm run bundle`

Expected: exit code `0` and refreshed server/client bundles.

- [ ] **Step 2: Run the complete test suite**

Run: `npm test`

Expected: all tests pass, including the new default-consistency test.

- [ ] **Step 3: Commit only related files**

```bash
git add src/index.ts src/client/settings-store.ts tests/default-settings.test.mjs \
  lib/index.js lib/index.js.map lib/client.js lib/client.js.map \
  docs/superpowers/plans/2026-08-22-default-liquid-glass-parameters.md
git commit -m "fix: sync verified liquid glass defaults"
```

- [ ] **Step 4: Push the existing main branch**

Run: `git push origin main`

Expected: `origin/main` advances to the new commit without force-pushing.
