/**
 * Liquid Glass Theme Layer — Multi-Tier Optics Engine.
 */
import type { Context } from '@deepseek-ai/cordis'
import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'
import { attachLiquidGlassShader, type GlassShaderHandle } from './glass-shader.ts'
import { ensureGlassAmbientScene, removeGlassAmbientScene } from './glass-ambient.ts'
import { startSeamStamper } from './seam-stamper.ts'
import { LIQUID_GLASS_DEFAULTS, type LiquidGlassSettings } from './settings-store.ts'

import { loadWallpaperStore } from './wallpaper-storage.ts'
import { BUILTIN_WALLPAPERS } from './builtin-wallpapers.ts'

export const LIQUID_GLASS_ATTRIBUTE = 'data-dsh-liquid-glass'
export const LIQUID_GLASS_ENABLED_KEY = 'dsh.ui-liquid-glass.enabled'
const OVERRIDE_SOURCE = '@deepseek-ai/dsh-client-ui-liquid-glass'

export const LIQUID_GLASS_TOKEN_OVERRIDES: ThemeTokenOverrides = {
  '--dsw-alias-bg-base': { light: 'transparent', dark: 'transparent' },
  '--dsw-alias-bg-layer-1': { light: 'transparent', dark: 'transparent' },
  '--dsw-alias-bg-layer-2': { light: 'transparent', dark: 'transparent' },
  '--dsw-alias-bg-layer-3': { light: 'transparent', dark: 'transparent' },
  '--dsw-alias-bg-overlay': { light: 'transparent', dark: 'transparent' },
  '--dsw-alias-bg-module-platform': { light: 'transparent', dark: 'transparent' },
  '--dsw-alias-bg-multi-select': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-sidebar-fill': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-input-major': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-bubble': { light: 'transparent', dark: 'transparent' },
  '--dsw-specific-menu': { light: 'var(--dsh-l3-mask-bg)', dark: 'var(--dsh-l3-mask-bg)' },
  '--dsw-alias-border-l1': { light: 'rgba(255, 255, 255, 0.25)', dark: 'rgba(255, 255, 255, 0.18)' },
  '--dsw-alias-bg-mask-drop': { light: 'var(--dsh-l3-mask-bg)', dark: 'var(--dsh-l3-mask-bg)' },
  '--dsw-alias-bg-mask-1': { light: 'var(--dsh-l3-mask-bg)', dark: 'var(--dsh-l3-mask-bg)' },
  '--dsw-mask-blur': { light: 'none', dark: 'none' },
}

export class LiquidGlassLayer {
  private enabled = true
  private settings: LiquidGlassSettings = { ...LIQUID_GLASS_DEFAULTS }
  private shaderHandle: GlassShaderHandle | null = null
  private tokenDisposer: (() => void) | undefined
  private seamDisposer: (() => void) | undefined
  private readonly ctx: any
  private saveDebounceTimer: any = null

  constructor(ctx: Context) {
    this.ctx = ctx
    this.loadState()
    this.sync()
    void this.initBootSequence()
  }

  private async initBootSequence(): Promise<void> {
    try {
      await this.hydrateSettingsFromDisk()
      await this.hydrateWallpaperOnBoot()
      if (this.enabled) {
        this.applySettings()
      }
      this.sync()
    } catch {}
  }

  private async hydrateSettingsFromDisk(): Promise<void> {
    try {
      const res = await fetch('/api/liquid-glass/settings')
      if (res.ok) {
        const disk = await res.json()
        if (disk && typeof disk === 'object' && Object.keys(disk).length > 0) {
          if (typeof disk.enabled === 'boolean') {
            this.enabled = disk.enabled
          }
          const { enabled: _en, wallpaper: _wp, ...restSettings } = disk
          this.settings = { ...this.settings, ...restSettings }
          if (this.enabled) {
            this.applySettings()
          }
        }
      }
    } catch {}
  }

  private async hydrateWallpaperOnBoot(): Promise<void> {
    try {
      const store = await loadWallpaperStore()
      if (this.settings.background === 'wallpaper') {
        const cur = store.customWallpapers.find(it => it.id === store.activeCustomId) || store.customWallpapers[0]
        if (cur && (cur.url || cur.poster)) {
          const freshUrl = cur.type === 'video' ? `video:${cur.url || ''}|${cur.poster || ''}` : (cur.url || cur.poster || '')
          this.settings.wallpaper = freshUrl
          if (this.enabled) {
            this.applySettings()
          }
        }
      } else if (this.settings.background === 'gradient') {
        const cur = BUILTIN_WALLPAPERS.find(it => it.id === store.activeBuiltinId) || BUILTIN_WALLPAPERS[0]
        if (cur && cur.url) {
          this.settings.wallpaper = cur.url
          if (this.enabled) {
            this.applySettings()
          }
        }
      }
    } catch {}
  }

  private loadState(): void {
    try {
      const en = localStorage.getItem(LIQUID_GLASS_ENABLED_KEY)
      this.enabled = en === null ? true : en === 'true'

      const raw = localStorage.getItem('dsh.ui-liquid-glass.settings')
      if (raw) {
        this.settings = { ...LIQUID_GLASS_DEFAULTS, ...JSON.parse(raw) }
        this.settings.wallpaper = '' // 启动时不预读旧壁纸，全权由 IndexedDB/Disk 权威异步加载
        if (typeof this.settings.modalBlur !== 'number' || isNaN(this.settings.modalBlur)) {
          this.settings.modalBlur = 24
        }
        if (typeof this.settings.l3MaskOpacity !== 'number' || isNaN(this.settings.l3MaskOpacity)) {
          this.settings.l3MaskOpacity = 0.45
        }
      }
      try { localStorage.removeItem('dsh.ui-liquid-glass.active_poster') } catch {}
    } catch {
      this.enabled = true
    }
  }

  private saveState(): void {
    try {
      localStorage.setItem(LIQUID_GLASS_ENABLED_KEY, String(this.enabled))
      const cleanSettings = { ...this.settings, wallpaper: '' }
      localStorage.setItem('dsh.ui-liquid-glass.settings', JSON.stringify(cleanSettings))
    } catch {}

    if (this.saveDebounceTimer) {
      clearTimeout(this.saveDebounceTimer)
    }
    this.saveDebounceTimer = setTimeout(() => {
      try {
        const payload = {
          enabled: this.enabled,
          ...this.settings,
          wallpaper: ''
        }
        fetch('/api/liquid-glass/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {})
      } catch {}
    }, 150)
  }

  public sync(): void {
    if (this.enabled) {
      this.mount()
    } else {
      this.unmount()
    }
  }

  private updateLayerCssVariables(): void {
    const root = document.documentElement

    // =========================================================================
    // Layer 1 (一层基底雾面玻璃: 侧边栏, 消息气泡, 胶囊按钮)
    // =========================================================================
    root.style.setProperty('--dsh-l1-blur', `${this.settings.l1Blur}px`)
    root.style.setProperty('--dsh-l1-opacity', `${this.settings.l1Opacity}`)
    root.style.setProperty('--dsh-l1-bg', `rgba(10, 16, 28, ${Math.max(0.001, this.settings.l1Opacity)})`)
    root.style.setProperty('--dsh-l1-border', this.settings.l1Border > 0.001 ? `rgba(255, 255, 255, ${this.settings.l1Border})` : 'transparent')
    root.style.setProperty('--dsh-l1-border-raw', `${this.settings.l1Border}`)
    root.style.setProperty('--dsh-l1-rim', this.settings.l1Border > 0.001 ? `rgba(255, 255, 255, ${Math.min(1.0, this.settings.l1Border * 1.6)})` : 'transparent')
    root.style.setProperty('--dsh-l1-shadow', '0 20px 48px rgba(0, 0, 0, 0.50)')

    // =========================================================================
    // Layer 3 (三层弹窗玻璃: 设置弹窗/模态弹窗)
    // =========================================================================
    root.style.setProperty('--dsh-modal-blur', `${this.settings.modalBlur}px`)
    const l3Opacity = typeof this.settings.l3MaskOpacity === 'number' && !isNaN(this.settings.l3MaskOpacity)
      ? this.settings.l3MaskOpacity
      : 0.45
    root.style.setProperty('--dsh-l3-mask-opacity', `${l3Opacity}`)
    root.style.setProperty('--dsh-l3-mask-bg', `rgba(10, 16, 28, ${Math.max(0.001, l3Opacity)})`)

    // =========================================================================
    // Layer 2 (二层悬浮液态透镜/控件: 工作区卡片, 气泡卡片, 输入框, 动作按钮)
    // =========================================================================
    // 1. 基底暗化 (darkening: 0.00 ~ 0.80)
    root.style.setProperty('--dsh-l2-darkening', `${this.settings.darkening}`)
    const darkeningVal = typeof this.settings.darkening === 'number' && !isNaN(this.settings.darkening) ? this.settings.darkening : 0.0
    root.style.setProperty('--dsh-l2-bg', darkeningVal > 0.005 ? `rgba(10, 16, 28, ${darkeningVal})` : 'rgba(255, 255, 255, 0.03)')
    root.style.setProperty('--dsh-l2-glass-tint', `linear-gradient(135deg, rgba(255, 255, 255, ${Math.min(0.28, 0.06 + (this.settings.rimIntensity || 0) * 0.18)}) 0%, rgba(255, 255, 255, 0.01) 100%)`)

    // 2. 透镜模糊 (lensBlur: 0 ~ 40px)
    const lensBlurVal = typeof this.settings.lensBlur === 'number' && !isNaN(this.settings.lensBlur) ? this.settings.lensBlur : 0
    root.style.setProperty('--dsh-l2-blur', `${Math.max(0, lensBlurVal)}px`)

    // 3. 高光强度与倒角 (rimIntensity: 0.00 ~ 1.00)
    const rimIntensityVal = typeof this.settings.rimIntensity === 'number' && !isNaN(this.settings.rimIntensity) ? this.settings.rimIntensity : 0.20
    const borderAlpha = Math.max(0.06, rimIntensityVal * 0.45)
    root.style.setProperty('--dsh-l2-border', `rgba(255, 255, 255, ${borderAlpha})`)
    root.style.setProperty('--dsh-l2-rim', `rgba(255, 255, 255, ${Math.min(1.0, borderAlpha * 2.0)})`)

    // 4. 阴影投射 (dropShadowOpacity, dropShadowBlur, dropShadowY)
    const shadowOpacity = typeof this.settings.dropShadowOpacity === 'number' && !isNaN(this.settings.dropShadowOpacity) ? this.settings.dropShadowOpacity : 0.15
    const shadowBlur = typeof this.settings.dropShadowBlur === 'number' && !isNaN(this.settings.dropShadowBlur) ? this.settings.dropShadowBlur : 16
    const shadowY = typeof this.settings.dropShadowY === 'number' && !isNaN(this.settings.dropShadowY) ? this.settings.dropShadowY : 4
    root.style.setProperty(
      '--dsh-l2-shadow',
      `inset 0 1px 0 rgba(255, 255, 255, ${Math.max(0.10, rimIntensityVal * 0.40)}), 0 ${shadowY * 0.35}px ${shadowBlur * 0.45}px rgba(0, 0, 0, ${shadowOpacity})`
    )
  }

  private popoverObserver: MutationObserver | null = null

  private mount(): void {
    document.documentElement.setAttribute(LIQUID_GLASS_ATTRIBUTE, 'true')
    this.updateLayerCssVariables()

    // 1. 注入背景 DOM
    ensureGlassAmbientScene()

    // 2. 挂载 WebGL 物理透镜 Shader
    const canvas = document.querySelector<HTMLCanvasElement>('[data-dsh-glass-canvas]')
    if (canvas !== null) {
      if (this.shaderHandle === null) {
        this.shaderHandle = attachLiquidGlassShader(canvas, this.settings)
      } else {
        this.shaderHandle.update(this.settings)
      }
    }

    // 2.1 Radix Popover L3 毛玻璃注入 (CSS 特异性不足以覆盖 [role=dialog] 规则)
    this.applyPopoverBlur()
    this.popoverObserver = new MutationObserver(() => { this.applyPopoverBlur() })
    this.popoverObserver.observe(document.body, { childList: true, subtree: true })

    // 3. 注入 Design Token 覆盖栈
    this.tokenDisposer?.()
    if (this.ctx.theme?.overrideTokens) {
      this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, LIQUID_GLASS_TOKEN_OVERRIDES)
    }

    // 4. 挂载动态 Seam Stamper 穿透底层框架
    if (this.seamDisposer === undefined) {
      this.seamDisposer = startSeamStamper()
    }

    this.applySettings()
  }

  private applySettings(): void {
    this.updateLayerCssVariables()
    if (this.shaderHandle) {
      this.shaderHandle.update(this.settings)
    }
  }

  private applyPopoverBlur(): void {
    const root = document.getElementById('root')
    if (root && root.style.filter) {
      root.style.removeProperty('filter')
    }

    for (const el of document.querySelectorAll<HTMLElement>(
      'div[role="menu"], div[role="listbox"], [class*="Menu_list"], [class*="MenuView_menu"], [class*="PopupSelectView_card"], div[aria-label*="suggestions"], div[aria-label*="建议"], div[aria-label*="命令"], [data-dsh-model-menu], [class*="ModelSelect_menu"], [class*="PermissionSelect_menu"], [class*="Select_menu"], [class*="CustomSelect_menu"], [class*="Dropdown_menu"], [class*="NxU6UG_panel"], [class*="RemotePanel_panel"], [data-dsh-context-panel], [class*="H57FiG_panel"], [class*="ContextMeter_panel"], div[role="dialog"][aria-label*="移动端"], div[role="dialog"][aria-label*="远程控制"], div[role="dialog"][aria-label*="Remote"]'
    )) {
      if (el.dataset.dshPopoverBlurred === 'true') continue
      el.style.setProperty('background', 'var(--dsh-l3-mask-bg)', 'important')
      el.style.setProperty('backdrop-filter', 'blur(var(--dsh-modal-blur, 24px))', 'important')
      el.style.setProperty('-webkit-backdrop-filter', 'blur(var(--dsh-modal-blur, 24px))', 'important')
      el.dataset.dshPopoverBlurred = 'true'
    }
  }

  private unmount(): void {
    if (this.popoverObserver) {
      this.popoverObserver.disconnect()
      this.popoverObserver = null
    }
    for (const el of document.querySelectorAll<HTMLElement>('[data-dsh-popover-blurred]')) {
      el.style.removeProperty('backdrop-filter')
      el.style.removeProperty('-webkit-backdrop-filter')
      el.style.removeProperty('background')
      el.style.removeProperty('border')
      el.style.removeProperty('border-radius')
      delete el.dataset.dshPopoverBlurred
    }
    document.documentElement.removeAttribute(LIQUID_GLASS_ATTRIBUTE)
    document.documentElement.style.removeProperty('--dsh-l1-blur')
    document.documentElement.style.removeProperty('--dsh-l1-bg')
    document.documentElement.style.removeProperty('--dsh-l1-border')
    document.documentElement.style.removeProperty('--dsh-l1-opacity')
    document.documentElement.style.removeProperty('--dsh-modal-blur')
    document.documentElement.style.removeProperty('--dsh-l3-mask-opacity')
    document.documentElement.style.removeProperty('--dsh-l3-mask-bg')
    document.documentElement.style.removeProperty('--dsh-l2-darkening')
    document.documentElement.style.removeProperty('--dsh-l2-bg')
    document.documentElement.style.removeProperty('--dsh-l2-glass-tint')
    document.documentElement.style.removeProperty('--dsh-l2-blur')
    document.documentElement.style.removeProperty('--dsh-l2-border')
    document.documentElement.style.removeProperty('--dsh-l2-rim')
    document.documentElement.style.removeProperty('--dsh-l2-shadow')
    this.tokenDisposer?.()
    this.tokenDisposer = undefined
    if (this.shaderHandle) {
      this.shaderHandle.dispose()
      this.shaderHandle = null
    }
    removeGlassAmbientScene()
    this.seamDisposer?.()
    this.seamDisposer = undefined
  }

  public getEnabled(): boolean {
    return this.enabled
  }

  public setEnabled(val: boolean): void {
    if (this.enabled === val) return
    this.enabled = val
    this.saveState()
    this.sync()
  }

  public getSettings(): LiquidGlassSettings {
    return { ...this.settings }
  }

  public updateSettings(partial: Partial<LiquidGlassSettings>): void {
    this.settings = { ...this.settings, ...partial }
    this.saveState()
    if (this.enabled) {
      this.applySettings()
    }
  }
}
