import { DEFAULT_ELDEN_RING_VIDEO } from './default-videos-data'

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

export const LIQUID_GLASS_DEFAULTS: LiquidGlassSettings = {
  enabled: true,
  l1Blur: 20,
  l1Opacity: 0.85,
  l1Border: 0.15,
  modalBlur: 24,
  l3MaskOpacity: 0.45,
  ior: 1.45,
  bulge: 0.25,
  dispersion: 0.08,
  bevel: 0.35,
  lensBlur: 8,
  darkening: 0.04,
  rimIntensity: 0.65,
  lightAngle: 45,
  vibrancy: 1.25,
  rippleAmp: 0.5,
  dropShadowOpacity: 0.05,
  dropShadowBlur: 48,
  dropShadowY: 16,
  background: 'gradient',
  wallpaper: 'video:' + DEFAULT_ELDEN_RING_VIDEO,
  bgBlur: 0,
  bgLiquidEnabled: true,
  bgLiquidAmp: 0.55,
  bgLiquidScale: 0.4,
  bgLiquidSpeed: 0.1,
  bgLiquidDispersion: 0.025,
}

export const USER_PRESET_KEY = 'dsh.ui-liquid-glass.user_preset'
