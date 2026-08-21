# Default Liquid Glass Parameters

## Goal

Make a fresh installation, or a configuration with missing fields, use the
verified liquid-glass parameters shown in the user's screenshots. Existing
persisted user values must remain authoritative and must not be overwritten by
an upgrade.

## Default Values

| Setting | Default |
| --- | ---: |
| Base blur (`l1Blur`) | `2` |
| Base darkening (`l1Opacity`) | `0.1` |
| Edge gloss (`l1Border`) | `0.1` |
| Modal blur (`modalBlur`) | `5` |
| Overlay darkening (`l3MaskOpacity`) | `0.15` |
| IOR (`ior`) | `1.3` |
| Lens curvature (`bulge`) | `0.25` |
| Dispersion (`dispersion`) | `0` |
| Bevel width (`bevel`) | `0.01` |
| Lens blur (`lensBlur`) | `0` |
| Lens darkening (`darkening`) | `0` |
| Rim intensity (`rimIntensity`) | `0` |
| Light angle (`lightAngle`) | `105` |
| Vibrancy (`vibrancy`) | `1.2` |
| Ripple tension (`rippleAmp`) | `0.5` |
| Shadow opacity (`dropShadowOpacity`) | `0` |
| Shadow blur (`dropShadowBlur`) | `48` |
| Shadow offset (`dropShadowY`) | `16` |
| Background blur (`bgBlur`) | `0` |
| Background liquid enabled (`bgLiquidEnabled`) | `true` |
| Background liquid amplitude (`bgLiquidAmp`) | `0.55` |
| Background ripple scale (`bgLiquidScale`) | `0.4` |
| Background speed (`bgLiquidSpeed`) | `0.1` |
| Background dispersion (`bgLiquidDispersion`) | `0.025` |

Wallpaper selection and Enter-key behavior are outside this change because
they are not optical parameter defaults.

## Implementation

Update both default sources:

- Host-side `DEFAULT_SETTINGS`, used to seed the persistent settings file.
- Client-side `LIQUID_GLASS_DEFAULTS`, used before or without host hydration.

Keep the existing persistence behavior: a settings file is only seeded when it
does not exist, and hydrated values continue to override client defaults.

## Verification

Add a regression test that parses both default objects and verifies every
optical/background value above is identical. Rebuild `lib/index.js` and
`lib/client.js`, run the complete test suite, then push the resulting commits to
the existing `origin/main` GitHub repository.
