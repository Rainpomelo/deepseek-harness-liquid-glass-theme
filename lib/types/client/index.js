import { LiquidGlassPluginCard } from "./LiquidGlassPluginCard.js";
import { LiquidGlassAppearanceRow } from "./LiquidGlassAppearanceRow.js";
import { createLiquidGlassRowStore } from "./settings-store.js";
import { en, NS, zh } from "./locales.js";
import { LiquidGlassLayer } from "./theme-layer.js";
import './liquid-glass.module.css';
export const inject = ['theme', 'slots', 'locale'];
export function apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-liquid-glass: locale dictionaries');
    const layer = new LiquidGlassLayer(ctx);
    const pluginStore = createLiquidGlassRowStore();
    const appearanceStore = createLiquidGlassRowStore();
    let pluginBound;
    let appearanceBound;
    let revision = 0;
    const payload = () => {
        const s = layer.getSettings();
        return {
            enabled: layer.getEnabled(),
            l1Blur: s.l1Blur,
            l1Opacity: s.l1Opacity,
            l1Border: s.l1Border,
            modalBlur: typeof s.modalBlur === 'number' && !isNaN(s.modalBlur) ? s.modalBlur : 24,
            l3MaskOpacity: typeof s.l3MaskOpacity === 'number' && !isNaN(s.l3MaskOpacity) ? s.l3MaskOpacity : 0.45,
            ior: s.ior,
            bulge: s.bulge,
            dispersion: s.dispersion,
            bevel: s.bevel,
            lensBlur: s.lensBlur,
            darkening: s.darkening,
            rimIntensity: s.rimIntensity,
            lightAngle: s.lightAngle,
            vibrancy: s.vibrancy,
            rippleAmp: s.rippleAmp,
            dropShadowOpacity: s.dropShadowOpacity,
            dropShadowBlur: s.dropShadowBlur,
            dropShadowY: s.dropShadowY,
            background: s.background,
            wallpaper: s.wallpaper,
            bgBlur: s.bgBlur,
            bgLiquidEnabled: s.bgLiquidEnabled,
            bgLiquidAmp: s.bgLiquidAmp,
            bgLiquidScale: s.bgLiquidScale,
            bgLiquidSpeed: s.bgLiquidSpeed,
            bgLiquidDispersion: s.bgLiquidDispersion,
        };
    };
    const sync = () => {
        const next = payload();
        pluginBound?.sync(next, revision);
        appearanceBound?.sync(next, revision);
        revision += 1;
    };
    ctx.effect(() => ctx.on('theme/change', () => { sync(); }), 'ui-liquid-glass: appearance sync');
    const pluginInjected = (actions) => {
        pluginBound = actions;
        sync();
        return {
            setEnabled: (enabled) => {
                layer.setEnabled(enabled);
                sync();
            },
        };
    };
    const appearanceInjected = (actions) => {
        appearanceBound = actions;
        sync();
        return {
            applyPreset: (preset) => {
                layer.updateSettings(preset);
                sync();
            },
            // Layer 1 Setters
            setL1Blur: (val) => { layer.updateSettings({ l1Blur: val }); sync(); },
            setL1Opacity: (val) => { layer.updateSettings({ l1Opacity: val }); sync(); },
            setL1Border: (val) => { layer.updateSettings({ l1Border: val }); sync(); },
            // Layer 3 Setters
            setModalBlur: (val) => { layer.updateSettings({ modalBlur: val }); sync(); },
            setL3MaskOpacity: (val) => { layer.updateSettings({ l3MaskOpacity: val }); sync(); },
            // Layer 2 Setters
            setIor: (val) => { layer.updateSettings({ ior: val }); sync(); },
            setBulge: (val) => { layer.updateSettings({ bulge: val }); sync(); },
            setDispersion: (val) => { layer.updateSettings({ dispersion: val }); sync(); },
            setBevel: (val) => { layer.updateSettings({ bevel: val }); sync(); },
            setLensBlur: (val) => { layer.updateSettings({ lensBlur: val }); sync(); },
            setDarkening: (val) => { layer.updateSettings({ darkening: val }); sync(); },
            setRimIntensity: (val) => { layer.updateSettings({ rimIntensity: val }); sync(); },
            setLightAngle: (val) => { layer.updateSettings({ lightAngle: val }); sync(); },
            setVibrancy: (val) => { layer.updateSettings({ vibrancy: val }); sync(); },
            setRippleAmp: (val) => { layer.updateSettings({ rippleAmp: val }); sync(); },
            setDropShadowOpacity: (val) => { layer.updateSettings({ dropShadowOpacity: val }); sync(); },
            setDropShadowBlur: (val) => { layer.updateSettings({ dropShadowBlur: val }); sync(); },
            setDropShadowY: (val) => { layer.updateSettings({ dropShadowY: val }); sync(); },
            // Layer 0 Setters
            setBackground: (val) => { layer.updateSettings({ background: val }); sync(); },
            setWallpaper: (val) => { layer.updateSettings({ wallpaper: val }); sync(); },
            setBgBlur: (val) => { layer.updateSettings({ bgBlur: val }); sync(); },
            setBgLiquidEnabled: (val) => { layer.updateSettings({ bgLiquidEnabled: val }); sync(); },
            setBgLiquidAmp: (val) => { layer.updateSettings({ bgLiquidAmp: val }); sync(); },
            setBgLiquidScale: (val) => { layer.updateSettings({ bgLiquidScale: val }); sync(); },
            setBgLiquidSpeed: (val) => { layer.updateSettings({ bgLiquidSpeed: val }); sync(); },
            setBgLiquidDispersion: (val) => { layer.updateSettings({ bgLiquidDispersion: val }); sync(); },
        };
    };
    ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
        name: 'settings.plugin.item',
        id: 'liquid-glass',
        order: 6,
        store: pluginStore,
        locale: NS,
        inject: pluginInjected,
    }, LiquidGlassPluginCard));
    ctx.slots.inject('settings.general.item', () => ctx.slots.register({
        name: 'settings.general.item',
        id: 'liquid-glass',
        order: 12,
        store: appearanceStore,
        locale: NS,
        inject: appearanceInjected,
    }, LiquidGlassAppearanceRow));
}
//# sourceMappingURL=index.js.map