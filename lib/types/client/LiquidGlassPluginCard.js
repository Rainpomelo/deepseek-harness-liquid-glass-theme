import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconCheckOutline16 } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './LiquidGlassPluginCard.module.css';
export function LiquidGlassPluginCard(props) {
    const { t, setEnabled, useStore } = props;
    const enabled = useStore(s => s.enabled);
    return (_jsx("li", { className: css.card, children: _jsxs("div", { className: css.head, children: [_jsxs("div", { className: css.text, children: [_jsx("div", { className: css.title, children: t('liquidGlass.title') }), _jsx("div", { className: css.description, children: t('liquidGlass.description') })] }), _jsxs("button", { type: "button", className: css.toggle, "aria-pressed": enabled, onClick: () => { setEnabled(!enabled); }, children: [_jsx("span", { className: css.check, children: enabled && _jsx(IconCheckOutline16, {}) }), enabled ? t('liquidGlass.enable') : t('liquidGlass.disable')] })] }) }));
}
//# sourceMappingURL=LiquidGlassPluginCard.js.map