import { BUILTIN_WALLPAPERS, DEFAULT_BUILTIN_ID } from './builtin-wallpapers.ts'

/**
 * The store engine moved between DSH generations, so this module resolves it at
 * runtime instead of importing one fixed specifier:
 *
 *   0.1.0-rc.x … 0.1.1-rc.2  →  `@deepseek-ai/dsh-client-runtime/client`
 *   0.1.2-alpha.2 and later  →  `@deepseek-ai/dsh-client-store`
 *
 * Both are host-provided externals; the host's own module table answers
 * `require`, and an unregistered specifier throws, which is what the fallback
 * catches. Version-axis evidence: `dsh-client-runtime` was published up to
 * 0.1.1-rc.2 only, `dsh-client-store` starts at 0.1.2-alpha.2.
 */

/** Minimal shape of whichever store engine the host provides. */
export interface StoreEngine {
  /**
   * `defineStore` as the host ships it. The signature differs between the two
   * packages, so the return stays untyped here and consumers keep deriving the
   * handle with `ReturnType<typeof createLiquidGlassRowStore>`.
   */
  defineStore: (options: unknown) => any
}

/** Store engine locations, newest layout first. */
export const STORE_ENGINE_MODULES = [
  '@deepseek-ai/dsh-client-store',
  '@deepseek-ai/dsh-client-runtime/client',
] as const

/** Host-provided CommonJS resolver handed to every client bundle factory. */
type HostRequire = (id: string) => unknown

declare const require: HostRequire

/**
 * Pick the store engine from the modules this host can actually load.
 *
 * Exported for tests: pass a fake resolver to exercise either layout without a
 * host runtime.
 * @param load - Resolver for one module specifier; throws when unavailable.
 * @param candidates - Specifiers to try, in order.
 * @returns The first engine that exposes `defineStore`.
 * @throws {Error} When no candidate provides the engine, listing every attempt.
 */
export function pickStoreEngine(
  load: HostRequire,
  candidates: readonly string[] = STORE_ENGINE_MODULES,
): StoreEngine {
  const failures: string[] = []
  for (const id of candidates) {
    try {
      const candidate = load(id) as Partial<StoreEngine> | undefined
      if (candidate !== undefined && typeof candidate.defineStore === 'function') {
        return candidate as StoreEngine
      }
      failures.push(`${id}: no defineStore export`)
    } catch (error) {
      failures.push(`${id}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  throw new Error(`ui-liquid-glass: no store engine on this host — ${failures.join('; ')}`)
}

/** Resolve one engine specifier through the host module table. */
function loadFromHost(id: string): unknown {
  switch (id) {
    case '@deepseek-ai/dsh-client-store':
      return require('@deepseek-ai/dsh-client-store')
    case '@deepseek-ai/dsh-client-runtime/client':
      return require('@deepseek-ai/dsh-client-runtime/client')
    default:
      throw new Error(`unknown store module ${id}`)
  }
}

let engine: StoreEngine | undefined

/** The host's store engine, resolved once on first use. */
function storeEngine(): StoreEngine {
  if (engine === undefined) engine = pickStoreEngine(loadFromHost)
  return engine
}

export interface LiquidGlassSettings {
  enabled: boolean
  l1Blur: number
  l1Opacity: number
  l1Border: number
  modalBlur: number
  l3MaskOpacity: number
  ior: number
  bulge: number
  dispersion: number
  bevel: number
  lensBlur: number
  darkening: number
  rimIntensity: number
  lightAngle: number
  vibrancy: number
  rippleAmp: number
  dropShadowOpacity: number
  dropShadowBlur: number
  dropShadowY: number
  background: 'gradient' | 'wallpaper'
  wallpaper: string
  bgBlur: number
  bgLiquidEnabled: boolean
  bgLiquidAmp: number
  bgLiquidScale: number
  bgLiquidSpeed: number
  bgLiquidDispersion: number
}

/**
 * Wallpaper a fresh install paints before the Host hydrates the real one
 * (`hydrateWallpaperOnBoot`). Resolved from the built-in catalogue so this file
 * does not carry a second copy of the same base64 payload.
 */
const DEFAULT_WALLPAPER = BUILTIN_WALLPAPERS.find((w) => w.id === DEFAULT_BUILTIN_ID)?.url ?? ''
export const LIQUID_GLASS_DEFAULTS: LiquidGlassSettings = {
  enabled: true,
  l1Blur: 2,
  l1Opacity: 0.1,
  l1Border: 0.1,
  modalBlur: 5,
  l3MaskOpacity: 0.15,
  ior: 1.3,
  bulge: 0.25,
  dispersion: 0,
  bevel: 0.01,
  lensBlur: 0,
  darkening: 0,
  rimIntensity: 0,
  lightAngle: 105,
  vibrancy: 1.2,
  rippleAmp: 0.5,
  dropShadowOpacity: 0,
  dropShadowBlur: 48,
  dropShadowY: 16,
  background: 'gradient',
  wallpaper: DEFAULT_WALLPAPER,
  bgBlur: 0,
  bgLiquidEnabled: true,
  bgLiquidAmp: 0.55,
  bgLiquidScale: 0.4,
  bgLiquidSpeed: 0.1,
  bgLiquidDispersion: 0.025,
}

export const USER_PRESET_KEY = 'dsh.ui-liquid-glass.user_preset'

export interface LiquidGlassRowState extends LiquidGlassSettings {
  revision: number
}

export interface LiquidGlassSettingsPayload extends LiquidGlassSettings {}

/** Actions applied by the settings sync channel. */
export type LiquidGlassRowActions = {
  sync: (draft: LiquidGlassRowState, next: LiquidGlassSettingsPayload, revision: number) => void
}

/**
 * Handle of one settings row store, derived from the factory.
 *
 * The handle type used to be written as `EngineStoreHandle`, imported from
 * `@deepseek-ai/dsh-client-runtime`. Official DSH 0.2.0-rc.2 replaced that
 * package with `@deepseek-ai/dsh-client-store`, which exports no such name, so
 * the handle is derived here instead. Both consumers already derive it this way
 * (`PropsStore<ReturnType<typeof createLiquidGlassRowStore>>`).
 */
export type LiquidGlassRowHandle = ReturnType<typeof createLiquidGlassRowStore>

export function createLiquidGlassRowStore() {
  return storeEngine().defineStore({
    init: () => ({ ...LIQUID_GLASS_DEFAULTS, revision: -1 }),
    actions: {
      sync: (draft: LiquidGlassRowState, next: LiquidGlassSettingsPayload, revision: number) => {
        if (revision <= draft.revision) return
        Object.assign(draft, next)
        draft.revision = revision
      },
    },
  })
}
