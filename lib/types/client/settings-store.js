import { defineStore } from '@deepseek-ai/dsh-client-runtime/client';
export const LIQUID_GLASS_DEFAULTS = {
    enabled: true,
    // Layer 1 一层基底雾面玻璃默认值
    l1Blur: 28,
    l1Opacity: 0.70,
    l1Border: 1.00,
    // Layer 3 三层弹窗玻璃默认值
    modalBlur: 24,
    l3MaskOpacity: 0.45,
    // Layer 2 二层悬浮液态透镜默认值
    ior: 1.30,
    bulge: 1.80,
    dispersion: 0.035,
    bevel: 0.015,
    lensBlur: 0,
    darkening: 0.00,
    rimIntensity: 0.45,
    lightAngle: 105,
    vibrancy: 1.05,
    rippleAmp: 0.30,
    dropShadowOpacity: 0.35,
    dropShadowBlur: 48,
    dropShadowY: 16,
    // Layer 0 环境底板与流体默认值
    background: 'gradient',
    wallpaper: '',
    bgBlur: 0,
    bgLiquidEnabled: false,
    bgLiquidAmp: 0.40,
    bgLiquidScale: 0.8,
    bgLiquidSpeed: 0.7,
    bgLiquidDispersion: 0.015,
};
export function createLiquidGlassRowStore() {
    return defineStore({
        init: () => ({
            ...LIQUID_GLASS_DEFAULTS,
            revision: -1,
        }),
        actions: {
            sync: (d, next, revision) => {
                if (revision <= d.revision)
                    return;
                d.enabled = next.enabled;
                d.l1Blur = next.l1Blur;
                d.l1Opacity = next.l1Opacity;
                d.l1Border = next.l1Border;
                d.modalBlur = next.modalBlur;
                d.l3MaskOpacity = next.l3MaskOpacity;
                d.ior = next.ior;
                d.bulge = next.bulge;
                d.dispersion = next.dispersion;
                d.bevel = next.bevel;
                d.lensBlur = next.lensBlur;
                d.darkening = next.darkening;
                d.rimIntensity = next.rimIntensity;
                d.lightAngle = next.lightAngle;
                d.vibrancy = next.vibrancy;
                d.rippleAmp = next.rippleAmp;
                d.dropShadowOpacity = next.dropShadowOpacity;
                d.dropShadowBlur = next.dropShadowBlur;
                d.dropShadowY = next.dropShadowY;
                d.background = next.background;
                d.wallpaper = next.wallpaper;
                d.bgBlur = next.bgBlur;
                d.bgLiquidEnabled = next.bgLiquidEnabled;
                d.bgLiquidAmp = next.bgLiquidAmp;
                d.bgLiquidScale = next.bgLiquidScale;
                d.bgLiquidSpeed = next.bgLiquidSpeed;
                d.bgLiquidDispersion = next.bgLiquidDispersion;
                d.revision = revision;
            },
        },
    });
}
//# sourceMappingURL=settings-store.js.map