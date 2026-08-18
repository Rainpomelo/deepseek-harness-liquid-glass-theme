import { attachLiquidGlassShader } from "./glass-shader.js";
import { ensureGlassAmbientScene, removeGlassAmbientScene } from "./glass-ambient.js";
import { startSeamStamper } from "./seam-stamper.js";
import { LIQUID_GLASS_DEFAULTS } from "./settings-store.js";
import { loadWallpaperStore } from "./wallpaper-storage.js";
import { BUILTIN_WALLPAPERS } from "./builtin-wallpapers.js";
export const LIQUID_GLASS_ATTRIBUTE = 'data-dsh-liquid-glass';
export const LIQUID_GLASS_ENABLED_KEY = 'dsh.ui-liquid-glass.enabled';
const OVERRIDE_SOURCE = '@deepseek-ai/dsh-client-ui-liquid-glass';
export const LIQUID_GLASS_TOKEN_OVERRIDES = {
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
    '--dsw-alias-border-l1': { light: 'rgba(255, 255, 255, 0.25)', dark: 'rgba(255, 255, 255, 0.18)' },
    '--dsw-alias-bg-mask-drop': { light: 'var(--dsh-l3-mask-bg)', dark: 'var(--dsh-l3-mask-bg)' },
    '--dsw-alias-bg-mask-1': { light: 'var(--dsh-l3-mask-bg)', dark: 'var(--dsh-l3-mask-bg)' },
    '--dsw-mask-blur': { light: 'none', dark: 'none' },
};
export class LiquidGlassLayer {
    enabled = true;
    settings = { ...LIQUID_GLASS_DEFAULTS };
    shaderHandle = null;
    tokenDisposer;
    seamDisposer;
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
        this.loadState();
        this.sync();
        void this.hydrateWallpaperOnBoot();
    }
    async hydrateWallpaperOnBoot() {
        try {
            const store = await loadWallpaperStore();
            if (this.settings.background === 'wallpaper') {
                const cur = store.customWallpapers.find(it => it.id === store.activeCustomId) || store.customWallpapers[0];
                if (cur && cur.url) {
                    const freshUrl = cur.type === 'video' ? `video:${cur.url}` : cur.url;
                    this.settings.wallpaper = freshUrl;
                    if (this.enabled) {
                        this.applySettings();
                    }
                }
            }
            else if (this.settings.background === 'gradient') {
                const cur = BUILTIN_WALLPAPERS.find(it => it.id === store.activeBuiltinId) || BUILTIN_WALLPAPERS[0];
                if (cur && cur.url) {
                    this.settings.wallpaper = cur.url;
                    if (this.enabled) {
                        this.applySettings();
                    }
                }
            }
        }
        catch { }
    }
    loadState() {
        try {
            const en = localStorage.getItem(LIQUID_GLASS_ENABLED_KEY);
            this.enabled = en === null ? true : en === 'true';
            const raw = localStorage.getItem('dsh.ui-liquid-glass.settings');
            if (raw) {
                this.settings = { ...LIQUID_GLASS_DEFAULTS, ...JSON.parse(raw) };
                if (typeof this.settings.modalBlur !== 'number' || isNaN(this.settings.modalBlur)) {
                    this.settings.modalBlur = 24;
                }
                if (typeof this.settings.l3MaskOpacity !== 'number' || isNaN(this.settings.l3MaskOpacity)) {
                    this.settings.l3MaskOpacity = 0.45;
                }
            }
            // 0ms 同步海报直读：从 localStorage 读取当前活跃壁纸的首帧海报，彻底消除冷启动与重新打开时的黑屏/等待间隙
            const cachedPoster = localStorage.getItem('dsh.ui-liquid-glass.active_poster');
            if (cachedPoster && this.settings.background === 'wallpaper') {
                this.settings.wallpaper = cachedPoster;
            }
        }
        catch {
            this.enabled = true;
        }
    }
    saveState() {
        try {
            localStorage.setItem(LIQUID_GLASS_ENABLED_KEY, String(this.enabled));
            localStorage.setItem('dsh.ui-liquid-glass.settings', JSON.stringify(this.settings));
        }
        catch { }
    }
    sync() {
        if (this.enabled) {
            this.mount();
        }
        else {
            this.unmount();
        }
    }
    updateLayerCssVariables() {
        const root = document.documentElement;
        // =========================================================================
        // Layer 1 (一层基底雾面玻璃: 侧边栏, 消息气泡, 胶囊按钮)
        // =========================================================================
        root.style.setProperty('--dsh-l1-blur', `${this.settings.l1Blur}px`);
        root.style.setProperty('--dsh-l1-opacity', `${this.settings.l1Opacity}`);
        root.style.setProperty('--dsh-l1-bg', `rgba(10, 16, 28, ${Math.max(0.001, this.settings.l1Opacity)})`);
        root.style.setProperty('--dsh-l1-border', this.settings.l1Border > 0.001 ? `rgba(255, 255, 255, ${this.settings.l1Border})` : 'transparent');
        root.style.setProperty('--dsh-l1-border-raw', `${this.settings.l1Border}`);
        root.style.setProperty('--dsh-l1-rim', this.settings.l1Border > 0.001 ? `rgba(255, 255, 255, ${Math.min(1.0, this.settings.l1Border * 1.6)})` : 'transparent');
        root.style.setProperty('--dsh-l1-shadow', '0 20px 48px rgba(0, 0, 0, 0.50)');
        // =========================================================================
        // Layer 3 (三层弹窗玻璃: 设置弹窗/模态弹窗)
        // =========================================================================
        root.style.setProperty('--dsh-modal-blur', `${this.settings.modalBlur}px`);
        const l3Opacity = typeof this.settings.l3MaskOpacity === 'number' && !isNaN(this.settings.l3MaskOpacity)
            ? this.settings.l3MaskOpacity
            : 0.45;
        root.style.setProperty('--dsh-l3-mask-opacity', `${l3Opacity}`);
        root.style.setProperty('--dsh-l3-mask-bg', `rgba(10, 16, 28, ${Math.max(0.001, l3Opacity)})`);
        // =========================================================================
        // Layer 2 (二层悬浮液态透镜/控件: 下拉框, 数值微胶囊, 分段开关, 气泡卡片, 动作按钮)
        // =========================================================================
        // 1. 基底暗化 (darkening: 0.00 ~ 0.80)
        root.style.setProperty('--dsh-l2-darkening', `${this.settings.darkening}`);
        root.style.setProperty('--dsh-l2-bg', this.settings.darkening > 0.01 ? `rgba(15, 23, 42, ${this.settings.darkening})` : 'transparent');
        root.style.setProperty('--dsh-l2-glass-tint', 'transparent');
        // 2. 透镜模糊 (lensBlur: 0 ~ 40px)
        root.style.setProperty('--dsh-l2-blur', `${Math.max(0, this.settings.lensBlur)}px`);
        // 3. 高光强度与倒角 (rimIntensity: 0.00 ~ 1.00)
        root.style.setProperty('--dsh-l2-border', `rgba(255, 255, 255, ${Math.max(0.08, this.settings.rimIntensity * 0.45)})`);
        root.style.setProperty('--dsh-l2-rim', `rgba(255, 255, 255, ${Math.max(0.15, this.settings.rimIntensity * 0.65)})`);
        // 4. 阴影投射 (dropShadowOpacity, dropShadowBlur, dropShadowY)
        root.style.setProperty('--dsh-l2-shadow', `inset 0 1px 0 rgba(255, 255, 255, ${Math.max(0.15, this.settings.rimIntensity * 0.50)}), 0 ${this.settings.dropShadowY * 0.3}px ${this.settings.dropShadowBlur * 0.4}px rgba(0, 0, 0, ${this.settings.dropShadowOpacity})`);
    }
    mount() {
        document.documentElement.setAttribute(LIQUID_GLASS_ATTRIBUTE, 'true');
        this.updateLayerCssVariables();
        // 1. 注入背景 DOM
        ensureGlassAmbientScene();
        // 2. 挂载 WebGL 物理透镜 Shader
        const canvas = document.querySelector('[data-dsh-glass-canvas]');
        if (canvas !== null) {
            if (this.shaderHandle === null) {
                this.shaderHandle = attachLiquidGlassShader(canvas, this.settings);
            }
            else {
                this.shaderHandle.update(this.settings);
            }
        }
        // 3. 注入 Design Token 覆盖栈
        this.tokenDisposer?.();
        if (this.ctx.theme?.overrideTokens) {
            this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, LIQUID_GLASS_TOKEN_OVERRIDES);
        }
        // 4. 挂载动态 Seam Stamper 穿透底层框架
        if (this.seamDisposer === undefined) {
            this.seamDisposer = startSeamStamper();
        }
        this.applySettings();
    }
    applySettings() {
        this.updateLayerCssVariables();
        if (this.shaderHandle) {
            this.shaderHandle.update(this.settings);
        }
    }
    unmount() {
        document.documentElement.removeAttribute(LIQUID_GLASS_ATTRIBUTE);
        document.documentElement.style.removeProperty('--dsh-l1-blur');
        document.documentElement.style.removeProperty('--dsh-l1-bg');
        document.documentElement.style.removeProperty('--dsh-l1-border');
        document.documentElement.style.removeProperty('--dsh-l1-opacity');
        document.documentElement.style.removeProperty('--dsh-modal-blur');
        document.documentElement.style.removeProperty('--dsh-l3-mask-opacity');
        document.documentElement.style.removeProperty('--dsh-l3-mask-bg');
        document.documentElement.style.removeProperty('--dsh-l2-darkening');
        document.documentElement.style.removeProperty('--dsh-l2-bg');
        document.documentElement.style.removeProperty('--dsh-l2-glass-tint');
        document.documentElement.style.removeProperty('--dsh-l2-blur');
        document.documentElement.style.removeProperty('--dsh-l2-border');
        document.documentElement.style.removeProperty('--dsh-l2-rim');
        document.documentElement.style.removeProperty('--dsh-l2-shadow');
        this.tokenDisposer?.();
        this.tokenDisposer = undefined;
        if (this.shaderHandle) {
            this.shaderHandle.dispose();
            this.shaderHandle = null;
        }
        removeGlassAmbientScene();
        this.seamDisposer?.();
        this.seamDisposer = undefined;
    }
    getEnabled() {
        return this.enabled;
    }
    setEnabled(val) {
        if (this.enabled === val)
            return;
        this.enabled = val;
        this.saveState();
        this.sync();
    }
    getSettings() {
        return { ...this.settings };
    }
    updateSettings(partial) {
        this.settings = { ...this.settings, ...partial };
        this.saveState();
        if (this.enabled) {
            this.applySettings();
        }
    }
}
//# sourceMappingURL=theme-layer.js.map