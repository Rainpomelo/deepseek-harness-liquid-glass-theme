/**
 * WebGL 6.0 Multi-Tier Physical Liquid Glass Optics Engine.
 * Layer 0: Full-screen Backdrop & Fluid Flow
 * Layer 1: Left Sidebar Base Frosted Glass (16-Tap Gaussian Blur + Opacity + Border)
 * Layer 2: Multi-Lens Physical Liquid Glass System (High-Performance Real-Time Motion Tracking & Fast Clean Exit)
 */
export interface ShaderOptions {
    l1Blur: number;
    modalBlur?: number;
    l1Opacity: number;
    l1Border: number;
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
export interface GlassShaderHandle {
    update: (opts: Partial<ShaderOptions>) => void;
    dispose: () => void;
}
export declare function attachLiquidGlassShader(canvas: HTMLCanvasElement, currentOpts: ShaderOptions): GlassShaderHandle;
//# sourceMappingURL=glass-shader.d.ts.map