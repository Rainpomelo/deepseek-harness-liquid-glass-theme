import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots';
import type { createLiquidGlassRowStore } from './settings-store.ts';
export interface LiquidGlassPluginCardInjected {
    setEnabled: (enabled: boolean) => void;
}
export type LiquidGlassPluginCardComponentProps = PropsRuntime<'settings.plugin.item'> & PropsStore<ReturnType<typeof createLiquidGlassRowStore>> & PropsLocale<'settings.liquid-glass'> & InjectFace<LiquidGlassPluginCardInjected>;
export declare function LiquidGlassPluginCard(props: LiquidGlassPluginCardComponentProps): import("react").JSX.Element;
//# sourceMappingURL=LiquidGlassPluginCard.d.ts.map