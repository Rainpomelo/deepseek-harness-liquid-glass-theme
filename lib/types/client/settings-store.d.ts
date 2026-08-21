import { type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client';
export interface LiquidGlassSettings {
    enabled: boolean;
    l1Blur: number;
    l1Opacity: number;
    l1Border: number;
    modalBlur: number;
    l3MaskOpacity: number;
    ior: number;
    bulge: number;
    dispersion: number;
    bevel: number;
    lensBlur: number;
    darkening: number;
    rimIntensity: number;
    lightAngle: number;
    vibrancy: number;
    rippleAmp: number;
    dropShadowOpacity: number;
    dropShadowBlur: number;
    dropShadowY: number;
    background: 'gradient' | 'wallpaper';
    wallpaper: string;
    bgBlur: number;
    bgLiquidEnabled: boolean;
    bgLiquidAmp: number;
    bgLiquidScale: number;
    bgLiquidSpeed: number;
    bgLiquidDispersion: number;
}
export interface LiquidGlassRowState extends LiquidGlassSettings {
    revision: number;
}
export interface LiquidGlassSettingsPayload extends LiquidGlassSettings {
}
type LiquidGlassRowActions = {
    sync: (draft: LiquidGlassRowState, next: LiquidGlassSettingsPayload, revision: number) => void;
};
export declare const LIQUID_GLASS_DEFAULTS: LiquidGlassSettings;
export declare function createLiquidGlassRowStore(): EngineStoreHandle<LiquidGlassRowState, LiquidGlassRowActions>;
export {};
//# sourceMappingURL=settings-store.d.ts.map