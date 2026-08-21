import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import { type createLiquidGlassRowStore, type LiquidGlassSettings } from './settings-store.ts';
export declare const USER_PRESET_KEY = "dsh.ui-liquid-glass.user-preset";
export interface LiquidGlassAppearanceRowInjected {
    applyPreset: (preset: Partial<LiquidGlassSettings>) => void;
    setL1Blur: (val: number) => void;
    setL1Opacity: (val: number) => void;
    setL1Border: (val: number) => void;
    setModalBlur: (val: number) => void;
    setL3MaskOpacity: (val: number) => void;
    setIor: (val: number) => void;
    setBulge: (val: number) => void;
    setDispersion: (val: number) => void;
    setBevel: (val: number) => void;
    setLensBlur: (val: number) => void;
    setDarkening: (val: number) => void;
    setRimIntensity: (val: number) => void;
    setLightAngle: (val: number) => void;
    setVibrancy: (val: number) => void;
    setRippleAmp: (val: number) => void;
    setDropShadowOpacity: (val: number) => void;
    setDropShadowBlur: (val: number) => void;
    setDropShadowY: (val: number) => void;
    setBackground: (val: 'gradient' | 'wallpaper') => void;
    setWallpaper: (val: string) => void;
    setBgBlur: (val: number) => void;
    setBgLiquidEnabled: (val: boolean) => void;
    setBgLiquidAmp: (val: number) => void;
    setBgLiquidScale: (val: number) => void;
    setBgLiquidSpeed: (val: number) => void;
    setBgLiquidDispersion: (val: number) => void;
}
export type LiquidGlassAppearanceRowComponentProps = PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createLiquidGlassRowStore>> & PropsLocale<'settings.liquid-glass'> & LiquidGlassAppearanceRowInjected;
export declare function LiquidGlassAppearanceRow(props: LiquidGlassAppearanceRowComponentProps): import("react").JSX.Element;
//# sourceMappingURL=LiquidGlassAppearanceRow.d.ts.map