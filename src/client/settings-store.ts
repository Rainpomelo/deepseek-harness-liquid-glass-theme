import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'

export interface LiquidGlassSettings {
  enabled: boolean

  // 一层基底雾面玻璃 (Layer 1: 侧边栏/消息气泡/面板)
  l1Blur: number
  l1Opacity: number
  l1Border: number

  // 三层弹窗玻璃 (Layer 3: 设置弹窗/模态弹窗)
  modalBlur: number
  l3MaskOpacity: number

  // 二层悬浮液态透镜 (Layer 2: 悬浮输入框)
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

  // 环境底板与流体 (Layer 0)
  background: 'gradient' | 'wallpaper'
  wallpaper: string
  bgBlur: number
  bgLiquidEnabled: boolean
  bgLiquidAmp: number
  bgLiquidScale: number
  bgLiquidSpeed: number
  bgLiquidDispersion: number
}

export interface LiquidGlassRowState extends LiquidGlassSettings {
  revision: number
}

export interface LiquidGlassSettingsPayload extends LiquidGlassSettings {}

type LiquidGlassRowActions = {
  sync: (draft: LiquidGlassRowState, next: LiquidGlassSettingsPayload, revision: number) => void
}

export const LIQUID_GLASS_DEFAULTS: LiquidGlassSettings = {
  enabled: true,

  // Layer 1 一层基底雾面玻璃默认值
  l1Blur: 2,
  l1Opacity: 0.1,
  l1Border: 0.1,

  // Layer 3 三层弹窗玻璃默认值
  modalBlur: 5,
  l3MaskOpacity: 0,

  // Layer 2 二层悬浮液态透镜默认值
  ior: 1.3,
  bulge: 0.4,
  dispersion: 0,
  bevel: 0.01,
  lensBlur: 0,
  darkening: 0.1,
  rimIntensity: 0,
  lightAngle: 105,
  vibrancy: 1.2,
  rippleAmp: 0.5,
  dropShadowOpacity: 0.05,
  dropShadowBlur: 48,
  dropShadowY: 16,

  // Layer 0 环境底板与流体默认值
  background: 'gradient',
  wallpaper: 'video:/api/liquid-glass/wallpaper-file?id=default_elden_ring&ext=mp4',
  bgBlur: 0,
  bgLiquidEnabled: true,
  bgLiquidAmp: 0.55,
  bgLiquidScale: 0.4,
  bgLiquidSpeed: 0.1,
  bgLiquidDispersion: 0.025,
}

export function createLiquidGlassRowStore(): EngineStoreHandle<LiquidGlassRowState, LiquidGlassRowActions> {
  return defineStore({
    init: (): LiquidGlassRowState => ({
      ...LIQUID_GLASS_DEFAULTS,
      revision: -1,
    }),
    actions: {
      sync: (d, next: LiquidGlassSettingsPayload, revision: number) => {
        if (revision <= d.revision) return
        d.enabled = next.enabled
        d.l1Blur = next.l1Blur
        d.l1Opacity = next.l1Opacity
        d.l1Border = next.l1Border
        d.modalBlur = next.modalBlur
        d.l3MaskOpacity = next.l3MaskOpacity
        d.ior = next.ior
        d.bulge = next.bulge
        d.dispersion = next.dispersion
        d.bevel = next.bevel
        d.lensBlur = next.lensBlur
        d.darkening = next.darkening
        d.rimIntensity = next.rimIntensity
        d.lightAngle = next.lightAngle
        d.vibrancy = next.vibrancy
        d.rippleAmp = next.rippleAmp
        d.dropShadowOpacity = next.dropShadowOpacity
        d.dropShadowBlur = next.dropShadowBlur
        d.dropShadowY = next.dropShadowY
        d.background = next.background
        d.wallpaper = next.wallpaper
        d.bgBlur = next.bgBlur
        d.bgLiquidEnabled = next.bgLiquidEnabled
        d.bgLiquidAmp = next.bgLiquidAmp
        d.bgLiquidScale = next.bgLiquidScale
        d.bgLiquidSpeed = next.bgLiquidSpeed
        d.bgLiquidDispersion = next.bgLiquidDispersion
        d.revision = revision
      },
    },
  })
}
