/**
 * Liquid Glass client plugin body — Multi-Tier VisionOS Architecture.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { LiquidGlassPluginCard, type LiquidGlassPluginCardInjected } from './LiquidGlassPluginCard.tsx'
import { LiquidGlassAppearanceRow, type LiquidGlassAppearanceRowInjected } from './LiquidGlassAppearanceRow.tsx'
import { createLiquidGlassRowStore, type LiquidGlassSettingsPayload } from './settings-store.ts'
import { en, NS, zh } from './locales.ts'
import { LiquidGlassLayer } from './theme-layer.ts'
import './liquid-glass.module.css'

export const inject = ['theme', 'slots', 'locale']

export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'ui-liquid-glass: locale dictionaries')

  // 注入 L3 毛玻璃样式 (独立 style 标签，绕过构建工具的属性裁剪)
  // 针对模式选择器、模型选择器及其内嵌面板应用 L3 模态虚化与暗化
  if (typeof document !== 'undefined') {
    const POPOVER_STYLE_ID = 'dsh-popover-l3-blur'
    let tag = document.getElementById(POPOVER_STYLE_ID) as HTMLStyleElement | null
    if (!tag) {
      tag = document.createElement('style')
      tag.id = POPOVER_STYLE_ID
      document.head.appendChild(tag)
    }
    tag.textContent = `
/* ============================================================================
 * Keyframe Animations for all Popups, Dropdowns and Modals
 * ========================================================================== */
@keyframes dshMenuPopupScale {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(6px);
    filter: blur(4px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
}

@keyframes dshMenuRetractScale {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: scale(0.94) translateY(4px);
    filter: blur(3px);
  }
}

@keyframes dshModalDialogEnter {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(12px);
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
}

@keyframes dshModalPanelEnter {
  0% {
    opacity: 0;
    transform: scale(0.94) translateY(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes dshModalPanelExit {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.95) translateY(6px);
  }
}

@keyframes dshModalMaskIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes dshModalMaskOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

/* ============================================================================
 * Layer 3: 全部弹窗、下拉菜单与选择面板 L3 毛玻璃与动效
 * ========================================================================== */
html[data-dsh-liquid-glass] div[role="menu"],
html[data-dsh-liquid-glass] div[role="listbox"],
html[data-dsh-liquid-glass] [class*="Menu_list"],
html[data-dsh-liquid-glass] [class*="MenuView_menu"],
html[data-dsh-liquid-glass] [class*="PopupSelectView_card"],
html[data-dsh-liquid-glass] div[aria-label*="suggestions"],
html[data-dsh-liquid-glass] div[aria-label*="建议"],
html[data-dsh-liquid-glass] div[aria-label*="命令"],
html[data-dsh-liquid-glass] [data-dsh-model-menu],
html[data-dsh-model-open] [data-dsh-model-menu],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"],
html[data-dsh-liquid-glass] [class*="PermissionSelect_menu"],
html[data-dsh-liquid-glass] [class*="Select_menu"],
html[data-dsh-liquid-glass] [class*="CustomSelect_menu"],
html[data-dsh-liquid-glass] [class*="Dropdown_menu"],
html[data-dsh-liquid-glass] [data-dsh-context-panel],
html[data-dsh-liquid-glass] [class*="H57FiG_panel"],
html[data-dsh-liquid-glass] [class*="ContextMeter_panel"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.75)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.20)) !important;
  border-radius: 18px !important;
  box-shadow: var(--dsh-l1-shadow, 0 28px 72px rgba(0, 0, 0, 0.60)), inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.40)) !important;
  color: var(--dsw-alias-label-primary) !important;
  overflow: hidden !important;
}

html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*='headline'],
html[data-dsh-liquid-glass] [class*='H57FiG_panel'] [class*='headline'],
html[data-dsh-liquid-glass] [class*='ContextMeter_panel'] [class*='headline'] {
  color: rgba(255, 255, 255, 0.65) !important;
}

html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*='percent'],
html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*='figures'],
html[data-dsh-liquid-glass] [class*='H57FiG_panel'] [class*='percent'],
html[data-dsh-liquid-glass] [class*='H57FiG_panel'] [class*='figures'],
html[data-dsh-liquid-glass] [class*='ContextMeter_panel'] [class*='percent'],
html[data-dsh-liquid-glass] [class*='ContextMeter_panel'] [class*='figures'] {
  color: #ffffff !important;
  font-weight: 600 !important;
}

html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*='bar'],
html[data-dsh-liquid-glass] [class*='H57FiG_panel'] [class*='bar'],
html[data-dsh-liquid-glass] [class*='ContextMeter_panel'] [class*='bar'] {
  background: rgba(255, 255, 255, 0.10) !important;
}

html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*='row'] dt,
html[data-dsh-liquid-glass] [class*='H57FiG_panel'] [class*='row'] dt,
html[data-dsh-liquid-glass] [class*='ContextMeter_panel'] [class*='row'] dt {
  color: rgba(255, 255, 255, 0.75) !important;
}

html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*='row'] dd,
html[data-dsh-liquid-glass] [class*='H57FiG_panel'] [class*='row'] dd,
html[data-dsh-liquid-glass] [class*='ContextMeter_panel'] [class*='row'] dd {
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] div[role="menu"]:not([class*="closing"]):not([class*="Closing"]):not([class*="menuClosing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] div[role="listbox"]:not([class*="closing"]):not([class*="Closing"]):not([class*="menuClosing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="Menu_list"]:not([class*="closing"]):not([class*="Closing"]):not([class*="menuClosing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [data-dsh-model-menu]:not([class*="closing"]):not([class*="Closing"]):not([class*="menuClosing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:not([class*="closing"]):not([class*="Closing"]):not([class*="menuClosing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="MenuView_menu"]:not([class*="closing"]):not([class*="Closing"]):not([class*="menuClosing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="PopupSelectView_card"]:not([class*="closing"]):not([class*="Closing"]):not([class*="menuClosing"]):not([data-closing="true"]) {
  animation: dshMenuPopupScale 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
  transform-origin: bottom right;
}

html[data-dsh-liquid-glass] [class*="closing"],
html[data-dsh-liquid-glass] [class*="Closing"],
html[data-dsh-liquid-glass] [class*="menuClosing"],
html[data-dsh-liquid-glass] [data-closing="true"],
html[data-dsh-liquid-glass] div[role="menu"][class*="closing"],
html[data-dsh-liquid-glass] div[role="menu"][class*="Closing"],
html[data-dsh-liquid-glass] div[role="menu"][class*="menuClosing"],
html[data-dsh-liquid-glass] div[role="menu"][data-closing="true"],
html[data-dsh-liquid-glass] [data-dsh-model-menu][class*="menuClosing"],
html[data-dsh-liquid-glass] [data-dsh-model-menu][class*="closing"],
html[data-dsh-liquid-glass] [data-dsh-model-menu][class*="Closing"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"][class*="menuClosing"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"][class*="closing"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"][class*="Closing"] {
  animation: dshMenuRetractScale 0.20s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
  pointer-events: none !important;
  transform-origin: bottom right;
}

/* 弹窗/菜单内部所有列表项统一样式 */
html[data-dsh-liquid-glass] [class*="Menu_entry"],
html[data-dsh-liquid-glass] [class*="Menu_item"],
html[data-dsh-liquid-glass] div[role="menu"] button[role="menuitem"],
html[data-dsh-liquid-glass] div[role="menu"] [role="menuitem"],
html[data-dsh-liquid-glass] [class*="ModelSelect_item"],
html[data-dsh-liquid-glass] [class*="Select_item"] {
  background: transparent !important;
  border-radius: 12px !important;
  border: 1px solid transparent !important;
  color: #ffffff !important;
  transition: all 140ms cubic-bezier(0.16, 1, 0.3, 1) !important;
}

html[data-dsh-liquid-glass] [class*="Menu_entry"]:hover,
html[data-dsh-liquid-glass] [class*="Menu_item"]:hover,
html[data-dsh-liquid-glass] div[role="menu"] button[role="menuitem"]:hover,
html[data-dsh-liquid-glass] [class*="ModelSelect_item"]:hover,
html[data-dsh-liquid-glass] [class*="Select_item"]:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
}

html[data-dsh-liquid-glass] [class*="Menu_entry"][aria-checked="true"],
html[data-dsh-liquid-glass] [class*="Menu_item"][class*="active"],
html[data-dsh-liquid-glass] [class*="Menu_entry"][class*="selected"],
html[data-dsh-liquid-glass] [class*="ModelSelect_item"][class*="selected"],
html[data-dsh-liquid-glass] [class*="Select_item"][class*="selected"] {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(56, 189, 248, 0.12) 100%) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

html[data-dsh-liquid-glass] [class*="Menu_title"],
html[data-dsh-liquid-glass] [class*="Menu_label"] {
  color: #ffffff !important;
  font-weight: 600 !important;
}

html[data-dsh-liquid-glass] [class*="Menu_description"],
html[data-dsh-liquid-glass] [class*="Menu_hint"],
html[data-dsh-liquid-glass] [class*="Menu_shortcut"] {
  color: rgba(255, 255, 255, 0.65) !important;
}

html[data-dsh-liquid-glass] [class*="Menu_check"],
html[data-dsh-liquid-glass] [class*="Menu_icon"][class*="check"] {
  color: #38bdf8 !important;
  filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.50)) !important;
}

html[data-dsh-liquid-glass] [class*="sessionRow"][class*="selected"],
html[data-dsh-liquid-glass] [class*="projectRow"][class*="selected"],
html[data-dsh-liquid-glass] [class*="searchResultRow"][class*="selected"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.75)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  box-shadow: inset 0 1px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.30)), 0 4px 14px rgba(0, 0, 0, 0.35) !important;
  border-radius: 8px !important;
}

/* 模型选择器内嵌中间层精致毛玻璃卡片（单层容器，绝不产生双重边框） */
html[data-dsh-liquid-glass] [class*="modelCollapseWrap"],
html[data-dsh-liquid-glass] [class*="effortCollapseWrap"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html[data-dsh-liquid-glass] [class*="modelInlinePanel"],
html[data-dsh-liquid-glass] [class*="effortInlinePanel"],
html[data-dsh-model-open] [class*="modelInlinePanel"],
html[data-dsh-model-open] [class*="effortInlinePanel"] {
  background: rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 14px !important;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.18), 0 4px 12px rgba(0, 0, 0, 0.15) !important;
  margin: 4px 0 8px 0 !important;
  padding: 6px !important;
}

html[data-dsh-liquid-glass] [class*="ModelSelect_groupTitle"],
html[data-dsh-liquid-glass] [class*="ModelSelect_groupHeader"] {
  color: rgba(255, 255, 255, 0.50) !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
}

html[data-dsh-liquid-glass] [class*="segmentedSliderTrack"],
html[data-dsh-model-open] [class*="segmentedSliderTrack"] {
  background: rgba(0, 0, 0, 0.35) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px !important;
}

html[data-dsh-liquid-glass] [class*="segmentedOption"][class*="active"],
html[data-dsh-liquid-glass] [class*="segmentedOption"][class*="selected"],
html[data-dsh-model-open] [class*="segmentedOption"][class*="active"],
html[data-dsh-model-open] [class*="segmentedOption"][class*="selected"] {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(56, 189, 248, 0.20) 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.35) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  border-radius: 10px !important;
}

/* ============================================================================
 * 设置面板与模态弹窗 L3 虚化与选项完全生效
 * ========================================================================== */
html[data-dsh-liquid-glass] [class*="SettingsRoot_panel"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="SettingsRoot_panelOpening"],
html[data-dsh-liquid-glass] [class*="Modal_dialog"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]) {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.28)), 0 24px 64px rgba(0, 0, 0, 0.55) !important;
  animation: dshModalPanelEnter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

html[data-dsh-liquid-glass] [class*="SettingsRoot_panelClosing"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_panel"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="Modal_dialog"][data-closing="true"] {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.28)), 0 24px 64px rgba(0, 0, 0, 0.55) !important;
  animation: dshModalPanelExit 0.22s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
  pointer-events: none !important;
}

html[data-dsh-liquid-glass] [class*="PluginsSettingsSection_section"],
html[data-dsh-liquid-glass] [class*="PluginsSettingsSection_panel"],
html[data-dsh-liquid-glass] [class*="PluginsSettingsSection_cards"],
html[data-dsh-liquid-glass] [class*="PluginInventorySettingsTab_section"],
html[data-dsh-liquid-glass] [class*="PluginInventorySettingsTab_catalog"],
html[data-dsh-liquid-glass] [class*="PluginInventorySettingsTab_cards"],
html[data-dsh-liquid-glass] [class*="GeneralSection_section"],
html[data-dsh-liquid-glass] [class*="GeneralSection_panel"],
html[data-dsh-liquid-glass] [class*="ModelsSection_section"],
html[data-dsh-liquid-glass] [class*="ModelsSection_panel"],
html[data-dsh-liquid-glass] [class*="ModelsSection_cards"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_content"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_options"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html[data-dsh-liquid-glass] [class*="panelClosing"] [class*="navCell"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_panel"][data-closing="true"] [class*="navCell"] {
  animation: none !important;
}

html[data-dsh-liquid-glass] [class*="SettingsRoot_mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="maskOpening"],
html[data-dsh-liquid-glass] [class*="Modal_mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]) {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  animation: dshModalMaskIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

html[data-dsh-liquid-glass] [class*="maskClosing"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_mask"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="Modal_mask"][data-closing="true"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  animation: dshModalMaskOut 0.22s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
  pointer-events: none !important;
}

html[data-dsh-liquid-glass] [class*="SettingsRoot_options"] li[class*="card"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_options"] select,
html[data-dsh-liquid-glass] [class*="SettingsRoot_options"] [class*="_field"] {
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.16)) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* ============================================================================
 * 移动端远程控制弹窗 (单层毛玻璃面板 & 进退场自然动画)
 * ========================================================================== */
html[data-dsh-liquid-glass] [class*="NxU6UG_overlay"],
html[data-dsh-liquid-glass] [class*="RemotePanel_overlay"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_panel"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="RemotePanel_panel"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="NxU6UG_panelOpening"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.75)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: var(--dsh-l1-shadow, 0 28px 72px rgba(0, 0, 0, 0.60)), inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.40)) !important;
  animation: dshModalPanelEnter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
  overflow: hidden !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_panelClosing"],
html[data-dsh-liquid-glass] [class*="NxU6UG_panel"][class*="Closing"],
html[data-dsh-liquid-glass] [class*="NxU6UG_panel"][class*="closing"],
html[data-dsh-liquid-glass] [class*="RemotePanel_panelClosing"],
html[data-dsh-liquid-glass] [class*="RemotePanel_panel"][class*="Closing"],
html[data-dsh-liquid-glass] [class*="RemotePanel_panel"][class*="closing"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.75)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: var(--dsh-l1-shadow, 0 28px 72px rgba(0, 0, 0, 0.60)), inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.40)) !important;
  animation: dshModalPanelExit 0.22s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
  pointer-events: none !important;
  overflow: hidden !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_mask"]:not([class*="Closing"]):not([class*="closing"]),
html[data-dsh-liquid-glass] [class*="RemotePanel_mask"]:not([class*="Closing"]):not([class*="closing"]),
html[data-dsh-liquid-glass] [class*="NxU6UG_maskOpening"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  animation: dshModalMaskIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_maskClosing"],
html[data-dsh-liquid-glass] [class*="NxU6UG_mask"][class*="Closing"],
html[data-dsh-liquid-glass] [class*="NxU6UG_mask"][class*="closing"],
html[data-dsh-liquid-glass] [class*="RemotePanel_maskClosing"],
html[data-dsh-liquid-glass] [class*="RemotePanel_mask"][class*="Closing"],
html[data-dsh-liquid-glass] [class*="RemotePanel_mask"][class*="closing"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  animation: dshModalMaskOut 0.22s cubic-bezier(0.25, 1, 0.5, 1) forwards !important;
  pointer-events: none !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_card"],
html[data-dsh-liquid-glass] [class*="RemotePanel_card"],
html[data-dsh-liquid-glass] [class*="NxU6UG_cardHeader"],
html[data-dsh-liquid-glass] [class*="RemotePanel_cardHeader"],
html[data-dsh-liquid-glass] [class*="NxU6UG_cardTitle"],
html[data-dsh-liquid-glass] [class*="RemotePanel_cardTitle"],
html[data-dsh-liquid-glass] [class*="NxU6UG_badges"],
html[data-dsh-liquid-glass] [class*="RemotePanel_badges"],
html[data-dsh-liquid-glass] [class*='AgentPresetSection_inUse'],
html[data-dsh-liquid-glass] [class*='inUse'] {
  background: rgba(255, 255, 255, 0.12) !important;
  backdrop-filter: blur(var(--dsh-l1-blur, 16px)) saturate(140%) !important;
  -webkit-backdrop-filter: blur(var(--dsh-l1-blur, 16px)) saturate(140%) !important;
  border: 1px solid var(--dsh-l2-rim, rgba(255, 255, 255, 0.32)) !important;
  border-radius: 999px !important;
  padding: 1px 8px !important;
  color: #ffffff !important;
  font-weight: 500 !important;
  font-size: 11px !important;
  line-height: 17px !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.40), 0 2px 8px rgba(0, 0, 0, 0.25) !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.40) !important;
}
html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] ul > li,
html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] [data-slot] > *,
html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] [class*='card']:not([class*='cards']),
html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] [class*='Card']:not([class*='cards']),
html[data-dsh-liquid-glass] [class*="PluginsSettingsSection_cards"] > li,
html[data-dsh-liquid-glass] [class*="PluginInventorySettingsTab_cards"] > li,
html[data-dsh-liquid-glass] .qwen-vision-card,
html[data-dsh-liquid-glass] [class*="qwen-vision-card"],
html[data-dsh-liquid-glass] [class*="PluginCard_card"] {
  display: block !important;
  width: 100% !important;
  box-sizing: border-box !important;
  list-style: none !important;
  border: 1px solid var(--dsh-l2-border, rgba(255, 255, 255, 0.22)) !important;
  border-radius: 16px !important;
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 4px 16px rgba(0, 0, 0, 0.18) !important;
  transition: all .18s cubic-bezier(0.16, 1, 0.3, 1) !important;
  overflow: hidden !important;
}

html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] ul > li:hover,
html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] [data-slot] > *:hover,
html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] [class*='card']:not([class*='cards']):hover,
html[data-dsh-liquid-glass] [class*='SettingsRoot_options'] [class*='Card']:not([class*='cards']):hover,
html[data-dsh-liquid-glass] [class*="PluginsSettingsSection_cards"] > li:hover,
html[data-dsh-liquid-glass] [class*="PluginInventorySettingsTab_cards"] > li:hover,
html[data-dsh-liquid-glass] .qwen-vision-card:hover,
html[data-dsh-liquid-glass] [class*="qwen-vision-card"]:hover,
html[data-dsh-liquid-glass] [class*="PluginCard_card"]:hover {
  border-color: var(--dsh-l2-rim, rgba(255, 255, 255, 0.38)) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 8px 24px rgba(0, 0, 0, 0.25) !important;
  transform: translateY(-2px);
}

html[data-dsh-liquid-glass] [class*='PluginCard_cardOpen'],
html[data-dsh-liquid-glass] [class*='PluginInventorySettingsTab_card'][data-open='true'],
html[data-dsh-liquid-glass] [class*='AgentPresetSection_cardActive'],
html[data-dsh-liquid-glass] [class*='cardActive'] {
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(var(--dsh-l1-blur, 24px)) saturate(140%) !important;
  -webkit-backdrop-filter: blur(var(--dsh-l1-blur, 24px)) saturate(140%) !important;
  border-color: var(--dsh-l2-rim, rgba(255, 255, 255, 0.48)) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.50), 0 12px 32px rgba(0, 0, 0, 0.28) !important;
}

html[data-dsh-liquid-glass] [class*="ContextMeter_panel"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.80)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.20)) !important;
  border-radius: 16px !important;
  box-shadow: var(--dsh-l1-shadow, 0 20px 48px rgba(0, 0, 0, 0.55)), inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.40)) !important;
  color: var(--dsw-alias-label-primary) !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_actions"],
html[data-dsh-liquid-glass] [class*="RemotePanel_actions"] {
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  margin-top: 10px !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 0 !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_link"],
html[data-dsh-liquid-glass] [class*="RemotePanel_link"] {
  display: block !important;
  width: 100% !important;
  box-sizing: border-box !important;
  background: rgba(0, 0, 0, 0.35) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-radius: 8px !important;
  padding: 8px 12px !important;
  font-family: var(--dsw-font-mono, ui-monospace, monospace) !important;
  font-size: 12px !important;
  line-height: 1.5 !important;
  color: #38bdf8 !important;
  white-space: normal !important;
  word-break: break-all !important;
  overflow: visible !important;
  text-overflow: clip !important;
  user-select: all !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_addressValue"],
html[data-dsh-liquid-glass] [class*="RemotePanel_addressValue"] {
  font-family: var(--dsw-font-mono, ui-monospace, monospace) !important;
  font-size: 12px !important;
  line-height: 1.4 !important;
  color: rgba(255, 255, 255, 0.65) !important;
  white-space: normal !important;
  word-break: break-all !important;
  overflow: visible !important;
  text-overflow: clip !important;
  flex: 1 !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_action"],
html[data-dsh-liquid-glass] [class*="RemotePanel_action"] {
  height: 34px !important;
  padding: 0 14px !important;
  border-radius: 8px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  white-space: nowrap !important;
  cursor: pointer !important;
  transition: all 140ms ease !important;
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_action"]:first-child,
html[data-dsh-liquid-glass] [class*="RemotePanel_action"]:first-child {
  margin-right: auto !important;
  background: rgba(239, 68, 68, 0.15) !important;
  border: 1px solid rgba(239, 68, 68, 0.28) !important;
  color: #fca5a5 !important;
  box-shadow: none !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_action"]:first-child:hover:not(:disabled),
html[data-dsh-liquid-glass] [class*="RemotePanel_action"]:first-child:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.25) !important;
  border-color: rgba(239, 68, 68, 0.50) !important;
  color: #ffffff !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25) !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_action"]:not(:first-child):hover:not(:disabled),
html[data-dsh-liquid-glass] [class*="RemotePanel_action"]:not(:first-child):hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
  transform: translateY(-1px) !important;
  box-shadow: none !important;
}

html[data-dsh-liquid-glass] [class*="NxU6UG_qrWrap"],
html[data-dsh-liquid-glass] [class*="RemotePanel_qrWrap"] {
  background: #ffffff !important;
  border-radius: 14px !important;
  padding: 12px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.30) !important;
  border: none !important;
}

html[data-dsh-liquid-glass] [class*="SidebarRoot"][class*="collapsed"] [class*="primaryActions"],
html[data-dsh-liquid-glass] [class*="SidebarRoot"][class*="_collapsed"] [class*="_primaryActions"] {
  margin-bottom: 12px !important;
  gap: 12px !important;
}

html[data-dsh-liquid-glass] [class*="collapsed"] [class*="regionArea"] [class*="sectionHeader"],
html[data-dsh-liquid-glass] [class*="rail"] [class*="sectionHeader"],
html[data-dsh-liquid-glass] [class*="collapsed"] [class*="regionArea"] [class*="search"],
html[data-dsh-liquid-glass] [class*="rail"] [class*="search"] {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 0 !important;
  width: 36px !important;
  max-width: 36px !important;
  height: 36px !important;
  margin: 0 auto 12px auto !important;
  box-sizing: border-box !important;
}

html[data-dsh-liquid-glass] [class*="collapsed"] [class*="regionArea"] [class*="headerActions"],
html[data-dsh-liquid-glass] [class*="rail"] [class*="headerActions"],
html[data-dsh-liquid-glass] [class*="collapsed"] [class*="regionArea"] [class*="iconButton"],
html[data-dsh-liquid-glass] [class*="rail"] [class*="iconButton"],
html[data-dsh-liquid-glass] [class*="collapsed"] [class*="regionArea"] [class*="searchButton"],
html[data-dsh-liquid-glass] [class*="rail"] [class*="searchButton"] {
  width: 36px !important;
  max-width: 36px !important;
  height: 36px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 0 !important;
  color: var(--dsw-alias-label-primary) !important;
  box-sizing: border-box !important;
}

/* ============================================================================
 * 桌面端自带插件市场 (Community Market) 分级液态玻璃与 L3 弹窗控制接入
 * ========================================================================== */

/* 1. 遮罩暗化底板 (严格接入 L3 遮罩暗化与虚化参数) */
html[data-dsh-liquid-glass] .dshMarketOverlayMask,
html[data-dsh-liquid-glass] [class*="dshMarketOverlayMask"] {
  position: absolute !important;
  inset: 0 !important;
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  animation: dshModalMaskIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
  border: none !important;
  z-index: 0 !important;
}

/* 2. 插件市场主面板实体 (接入 L3 弹窗玻璃与 L1 边框/光泽) */
html[data-dsh-liquid-glass] .dshMarketOverlayPanel,
html[data-dsh-liquid-glass] [class*="dshMarketOverlayPanel"] {
  position: relative !important;
  z-index: 1 !important;
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.70)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.35)), 0 32px 80px rgba(0, 0, 0, 0.75) !important;
  color: #ffffff !important;
  overflow: hidden !important;
  animation: dshModalPanelEnter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

/* 2.1 市场内部二级弹窗 (确认安装/详情/源管理等，采用高清晰度高对比深色玻璃面板) */
html[data-dsh-liquid-glass] .dshMarketModal,
html[data-dsh-liquid-glass] [class*="dshMarketModal"],
html[data-dsh-liquid-glass] .dshMarketWideModal,
html[data-dsh-liquid-glass] [class*="dshMarketWideModal"],
html[data-dsh-liquid-glass] .dshMarketConfirmModal,
html[data-dsh-liquid-glass] [class*="dshMarketConfirmModal"],
html[data-dsh-liquid-glass] .dshMarketSourceModal,
html[data-dsh-liquid-glass] [class*="dshMarketSourceModal"],
html[data-dsh-liquid-glass] .dshMarketStatusModal,
html[data-dsh-liquid-glass] [class*="dshMarketStatusModal"] {
  position: relative !important;
  z-index: 1001 !important;
  background: linear-gradient(180deg, rgba(16, 24, 40, 0.94) 0%, rgba(10, 16, 28, 0.97) 100%) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 32px)) saturate(180%) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 32px)) saturate(180%) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.20)) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.35)), 0 32px 80px rgba(0, 0, 0, 0.85) !important;
  color: #ffffff !important;
  overflow: hidden !important;
  padding: 24px !important;
  animation: dshModalPanelEnter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

/* 2.2 二级弹窗头部、标题、描述与关闭按钮 */
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_header"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_header"],
html[data-dsh-liquid-glass] .dshMarketModal [class*="header"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="header"] {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  margin-bottom: 6px !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_title"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_title"],
html[data-dsh-liquid-glass] .dshMarketModal [class*="title"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="title"] {
  margin: 0 !important;
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_description"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_description"],
html[data-dsh-liquid-glass] .dshMarketModal [class*="description"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="description"] {
  margin: 0 0 16px !important;
  color: #94a3b8 !important;
  font-size: 13px !important;
  line-height: 20px !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_close"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_close"],
html[data-dsh-liquid-glass] .dshMarketModal [class*="close"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="close"] {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  color: #94a3b8 !important;
  transition: all 0.16s ease !important;
  cursor: pointer !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_close"]:hover,
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_close"]:hover,
html[data-dsh-liquid-glass] .dshMarketModal [class*="close"]:hover,
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="close"]:hover {
  background: rgba(255, 255, 255, 0.16) !important;
  color: #ffffff !important;
  transform: scale(1.05) !important;
}

/* 2.3 事实参数列表 (OperationFacts) */
html[data-dsh-liquid-glass] .dshMarketOperationFacts {
  display: flex !important;
  flex-direction: column !important;
  gap: 0 !important;
  margin: 0 0 14px !important;
  padding: 10px 18px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-radius: 16px !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationFacts > div {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 8px 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
  gap: 16px !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationFacts > div:last-child {
  border-bottom: none !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationFacts dt {
  color: #94a3b8 !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  flex-shrink: 0 !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationFacts dd {
  color: #ffffff !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  text-align: right !important;
  font-family: var(--dsw-font-family-code, ui-monospace, SFMono-Regular, Consolas, monospace) !important;
  overflow-wrap: anywhere !important;
}

/* 2.4 警告提示框与风险提示 (OperationWarning) */
html[data-dsh-liquid-glass] .dshMarketOperationWarning {
  display: flex !important;
  align-items: flex-start !important;
  gap: 10px !important;
  margin-bottom: 8px !important;
  padding: 10px 14px !important;
  background: rgba(245, 158, 11, 0.08) !important;
  border: 1px solid rgba(245, 158, 11, 0.22) !important;
  border-radius: 12px !important;
  color: #cbd5e1 !important;
  font-size: 12.5px !important;
  line-height: 1.55 !important;
  box-shadow: inset 0 1px 0 rgba(245, 158, 11, 0.12) !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationWarning a {
  color: #38bdf8 !important;
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
}

/* 2.5 成功提示与进行中状态 (OperationSuccess / Progress / Error) */
html[data-dsh-liquid-glass] .dshMarketOperationSuccess {
  display: flex !important;
  align-items: flex-start !important;
  gap: 10px !important;
  padding: 12px 16px !important;
  background: rgba(34, 197, 94, 0.10) !important;
  border: 1px solid rgba(34, 197, 94, 0.28) !important;
  border-radius: 14px !important;
  color: #4ade80 !important;
  font-size: 13px !important;
  line-height: 1.55 !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationProgress {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  padding: 12px 16px !important;
  background: rgba(56, 189, 248, 0.10) !important;
  border: 1px solid rgba(56, 189, 248, 0.28) !important;
  border-radius: 14px !important;
  color: #38bdf8 !important;
  font-size: 13px !important;
}

html[data-dsh-liquid-glass] .dshMarketError {
  margin-top: 10px !important;
  padding: 10px 14px !important;
  background: rgba(239, 68, 68, 0.12) !important;
  border: 1px solid rgba(239, 68, 68, 0.30) !important;
  border-radius: 12px !important;
  color: #f87171 !important;
  font-size: 12.5px !important;
}

/* 2.6 二级弹窗底部按钮栏与操作按钮 */
html[data-dsh-liquid-glass] [class*="Modal_footer"],
html[data-dsh-liquid-glass] .dshMarketModalActions {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 12px !important;
  margin-top: 16px !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  width: 100% !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button,
html[data-dsh-liquid-glass] [class*="Modal_footer"] button {
  height: 38px !important;
  padding: 0 20px !important;
  border-radius: 12px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1) !important;
  cursor: pointer !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button:first-child:not([class*="primary"]),
html[data-dsh-liquid-glass] [class*="Modal_footer"] button:first-child:not([class*="primary"]) {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  color: #e2e8f0 !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button:first-child:not([class*="primary"]):hover,
html[data-dsh-liquid-glass] [class*="Modal_footer"] button:first-child:not([class*="primary"]):hover {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.28) !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button[class*="primary"],
html[data-dsh-liquid-glass] .dshMarketModalActions button:last-child:not(:first-child),
html[data-dsh-liquid-glass] [class*="Modal_footer"] button[class*="primary"],
html[data-dsh-liquid-glass] [class*="Modal_footer"] button:last-child:not(:first-child) {
  background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.40) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.40) !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button[class*="primary"]:hover,
html[data-dsh-liquid-glass] .dshMarketModalActions button:last-child:not(:first-child):hover,
html[data-dsh-liquid-glass] [class*="Modal_footer"] button[class*="primary"]:hover,
html[data-dsh-liquid-glass] [class*="Modal_footer"] button:last-child:not(:first-child):hover {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
  box-shadow: 0 6px 22px rgba(37, 99, 235, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.50) !important;
  transform: translateY(-1px) !important;
}

/* 3. 面板头部与主体 */
html[data-dsh-liquid-glass] .dshMarketOverlayHeader,
html[data-dsh-liquid-glass] [class*="dshMarketOverlayHeader"] {
  background: rgba(255, 255, 255, 0.03) !important;
  border-bottom: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.10)) !important;
  padding: 18px 24px 14px !important;
}

html[data-dsh-liquid-glass] .dshMarketOverlayBody,
html[data-dsh-liquid-glass] [class*="dshMarketOverlayBody"],
html[data-dsh-liquid-glass] .dshMarketMain,
html[data-dsh-liquid-glass] [class*="dshMarketMain"],
html[data-dsh-liquid-glass] .dshMarketContent,
html[data-dsh-liquid-glass] [class*="dshMarketContent"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: #ffffff !important;
}

/* 4. 标题与文字层次 (高对比度纯白与浅灰) */
html[data-dsh-liquid-glass] .dshMarketHeaderTitle,
html[data-dsh-liquid-glass] [class*="dshMarketHeaderTitle"],
html[data-dsh-liquid-glass] .dshMarketCardName,
html[data-dsh-liquid-glass] [class*="dshMarketCardName"],
html[data-dsh-liquid-glass] .dshMarketReceiptTitle h3,
html[data-dsh-liquid-glass] [class*="dshMarketReceiptTitle"] h3,
html[data-dsh-liquid-glass] [class*="dshMarket"] h1,
html[data-dsh-liquid-glass] [class*="dshMarket"] h2,
html[data-dsh-liquid-glass] [class*="dshMarket"] h3,
html[data-dsh-liquid-glass] [class*="dshMarket"] h4 {
  color: #ffffff !important;
  font-weight: 600 !important;
}

html[data-dsh-liquid-glass] .dshMarketSummary,
html[data-dsh-liquid-glass] [class*="dshMarketSummary"],
html[data-dsh-liquid-glass] .dshMarketDetails p,
html[data-dsh-liquid-glass] [class*="dshMarketDetails"] p,
html[data-dsh-liquid-glass] [class*="dshMarket"] p {
  color: #cbd5e1 !important;
  line-height: 1.55 !important;
}

html[data-dsh-liquid-glass] .dshMarketReceiptMeta,
html[data-dsh-liquid-glass] [class*="dshMarketReceiptMeta"],
html[data-dsh-liquid-glass] .dshMarketIndexMeta,
html[data-dsh-liquid-glass] [class*="dshMarketIndexMeta"],
html[data-dsh-liquid-glass] .dshMarketCurrentSource,
html[data-dsh-liquid-glass] [class*="dshMarketCurrentSource"],
html[data-dsh-liquid-glass] [class*="dshMarket"] span,
html[data-dsh-liquid-glass] [class*="dshMarket"] label,
html[data-dsh-liquid-glass] [class*="dshMarket"] dt {
  color: #94a3b8 !important;
}

html[data-dsh-liquid-glass] [class*="dshMarket"] dd {
  color: #ffffff !important;
  font-weight: 600 !important;
}

/* 5. 插件卡片 (接入 Layer 2 液态透镜单层卡片样式) */
html[data-dsh-liquid-glass] button.dshMarketCard,
html[data-dsh-liquid-glass] .dshMarketCard:not([class*="Top"]):not([class*="Name"]),
html[data-dsh-liquid-glass] .dshMarketReceipt,
html[data-dsh-liquid-glass] .dshMarketSource {
  background: var(--dsh-l2-glass-tint, linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)), var(--dsh-l2-bg, rgba(10, 16, 28, 0.45)) !important;
  border: 1px solid var(--dsh-l2-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(var(--dsh-l2-blur, 0px)) saturate(140%) !important;
  -webkit-backdrop-filter: blur(var(--dsh-l2-blur, 0px)) saturate(140%) !important;
  box-shadow: var(--dsh-l2-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 4px 16px rgba(0, 0, 0, 0.30)) !important;
  padding: 16px !important;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

html[data-dsh-liquid-glass] button.dshMarketCard:hover,
html[data-dsh-liquid-glass] .dshMarketCard:not([class*="Top"]):not([class*="Name"]):hover,
html[data-dsh-liquid-glass] .dshMarketReceipt:hover,
html[data-dsh-liquid-glass] .dshMarketSource:hover {
  border-color: var(--dsh-l2-rim, rgba(255, 255, 255, 0.40)) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 8px 28px rgba(0, 0, 0, 0.45) !important;
  transform: translateY(-2px) !important;
}

/* 5.1 卡片内部所有容器彻底透明穿透，杜绝多层嵌套框 */
html[data-dsh-liquid-glass] .dshMarketCardTop,
html[data-dsh-liquid-glass] [class*="dshMarketCardTop"],
html[data-dsh-liquid-glass] .dshMarketCardName,
html[data-dsh-liquid-glass] [class*="dshMarketCardName"],
html[data-dsh-liquid-glass] .dshMarketReceiptMain,
html[data-dsh-liquid-glass] [class*="dshMarketReceiptMain"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
}

html[data-dsh-liquid-glass] .dshMarketGlyph,
html[data-dsh-liquid-glass] [class*="dshMarketGlyph"] {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 8px !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* 6. 搜索框与输入控件 (接入 Layer 1 磨砂玻璃输入框) */
html[data-dsh-liquid-glass] .dshMarketSearch input,
html[data-dsh-liquid-glass] [class*="dshMarketSearch"] input,
html[data-dsh-liquid-glass] [class*="dshMarket"] input,
html[data-dsh-liquid-glass] [class*="dshMarket"] select,
html[data-dsh-liquid-glass] [class*="dshMarket"] textarea {
  background: var(--dsh-l1-bg, rgba(10, 16, 28, 0.50)) !important;
  backdrop-filter: blur(var(--dsh-l1-blur, 16px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-l1-blur, 16px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.20)) !important;
  border-radius: 12px !important;
  color: #ffffff !important;
  padding: 8px 14px !important;
  font-size: 13px !important;
}

html[data-dsh-liquid-glass] .dshMarketSearch input::placeholder,
html[data-dsh-liquid-glass] [class*="dshMarketSearch"] input::placeholder {
  color: rgba(255, 255, 255, 0.50) !important;
}

/* 7. 标签胶囊与分类按钮 */
html[data-dsh-liquid-glass] .dshMarketTags span,
html[data-dsh-liquid-glass] [class*="dshMarketTags"] span {
  background: rgba(56, 189, 248, 0.15) !important;
  border: 1px solid rgba(56, 189, 248, 0.30) !important;
  color: #38bdf8 !important;
  border-radius: 999px !important;
  padding: 2px 8px !important;
  font-size: 11px !important;
  font-weight: 500 !important;
}

html[data-dsh-liquid-glass] [class*="dshMarketCategories"] button,
html[data-dsh-liquid-glass] .dshMarketCategories button {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  color: #cbd5e1 !important;
  border-radius: 999px !important;
  padding: 4px 12px !important;
  font-size: 12px !important;
  transition: all 0.14s ease !important;
}

html[data-dsh-liquid-glass] [class*="dshMarketCategories"] button:hover,
html[data-dsh-liquid-glass] .dshMarketCategories button:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] [class*="dshMarketCategories"] button[data-active="true"],
html[data-dsh-liquid-glass] .dshMarketCategories button[data-active="true"] {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.35) 100%) !important;
  border-color: rgba(56, 189, 248, 0.60) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 8px rgba(56, 189, 248, 0.30) !important;
}

/* 8. 选项卡切换器 (浏览/已安装/源管理) */
html[data-dsh-liquid-glass] .dshMarketViewSwitch,
html[data-dsh-liquid-glass] [class*="dshMarketViewSwitch"] {
  background: rgba(0, 0, 0, 0.40) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 12px !important;
  padding: 3px !important;
}

html[data-dsh-liquid-glass] .dshMarketViewSwitch button,
html[data-dsh-liquid-glass] [class*="dshMarketViewSwitch"] button {
  color: #94a3b8 !important;
  border-radius: 9px !important;
  transition: all 0.14s ease !important;
}

html[data-dsh-liquid-glass] .dshMarketViewSwitch button[data-active="true"],
html[data-dsh-liquid-glass] [class*="dshMarketViewSwitch"] button[data-active="true"] {
  background: rgba(255, 255, 255, 0.16) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.30) !important;
}

html[data-dsh-liquid-glass] .dshMarketCommand code,
html[data-dsh-liquid-glass] [class*="dshMarketCommand"] code {
  background: rgba(0, 0, 0, 0.50) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: #38bdf8 !important;
}
`
  }

  const layer = new LiquidGlassLayer(ctx as any)

  const pluginStore = createLiquidGlassRowStore()
  const appearanceStore = createLiquidGlassRowStore()
  let pluginBound: BoundActions<typeof pluginStore> | undefined
  let appearanceBound: BoundActions<typeof appearanceStore> | undefined
  let revision = 0

  const payload = (): LiquidGlassSettingsPayload => {
    const s = layer.getSettings()
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
    }
  }

  const sync = (): void => {
    const next = payload()
    pluginBound?.sync(next, revision)
    appearanceBound?.sync(next, revision)
    revision += 1
  }

  ctx.effect(() => ctx.on('theme/change', () => { sync() }), 'ui-liquid-glass: appearance sync')

  const pluginInjected = (actions: BoundActions<typeof pluginStore>): LiquidGlassPluginCardInjected => {
    pluginBound = actions
    sync()
    return {
      setEnabled: (enabled) => {
        layer.setEnabled(enabled)
        sync()
      },
    }
  }

  const appearanceInjected = (actions: BoundActions<typeof appearanceStore>): LiquidGlassAppearanceRowInjected => {
    appearanceBound = actions
    sync()
    return {
      applyPreset: (preset) => {
        layer.updateSettings(preset)
        sync()
      },
      // Layer 1 Setters
      setL1Blur: (val) => { layer.updateSettings({ l1Blur: val }); sync() },
      setL1Opacity: (val) => { layer.updateSettings({ l1Opacity: val }); sync() },
      setL1Border: (val) => { layer.updateSettings({ l1Border: val }); sync() },
      // Layer 3 Setters
      setModalBlur: (val) => { layer.updateSettings({ modalBlur: val }); sync() },
      setL3MaskOpacity: (val) => { layer.updateSettings({ l3MaskOpacity: val }); sync() },
      // Layer 2 Setters
      setIor: (val) => { layer.updateSettings({ ior: val }); sync() },
      setBulge: (val) => { layer.updateSettings({ bulge: val }); sync() },
      setDispersion: (val) => { layer.updateSettings({ dispersion: val }); sync() },
      setBevel: (val) => { layer.updateSettings({ bevel: val }); sync() },
      setLensBlur: (val) => { layer.updateSettings({ lensBlur: val }); sync() },
      setDarkening: (val) => { layer.updateSettings({ darkening: val }); sync() },
      setRimIntensity: (val) => { layer.updateSettings({ rimIntensity: val }); sync() },
      setLightAngle: (val) => { layer.updateSettings({ lightAngle: val }); sync() },
      setVibrancy: (val) => { layer.updateSettings({ vibrancy: val }); sync() },
      setRippleAmp: (val) => { layer.updateSettings({ rippleAmp: val }); sync() },
      setDropShadowOpacity: (val) => { layer.updateSettings({ dropShadowOpacity: val }); sync() },
      setDropShadowBlur: (val) => { layer.updateSettings({ dropShadowBlur: val }); sync() },
      setDropShadowY: (val) => { layer.updateSettings({ dropShadowY: val }); sync() },
      // Layer 0 Setters
      setBackground: (val) => { layer.updateSettings({ background: val }); sync() },
      setWallpaper: (val) => { layer.updateSettings({ wallpaper: val }); sync() },
      setBgBlur: (val) => { layer.updateSettings({ bgBlur: val }); sync() },
      setBgLiquidEnabled: (val) => { layer.updateSettings({ bgLiquidEnabled: val }); sync() },
      setBgLiquidAmp: (val) => { layer.updateSettings({ bgLiquidAmp: val }); sync() },
      setBgLiquidScale: (val) => { layer.updateSettings({ bgLiquidScale: val }); sync() },
      setBgLiquidSpeed: (val) => { layer.updateSettings({ bgLiquidSpeed: val }); sync() },
      setBgLiquidDispersion: (val) => { layer.updateSettings({ bgLiquidDispersion: val }); sync() },
    }
  }

  ctx.slots.inject('settings.plugin.item', () => ctx.slots.register({
    name: 'settings.plugin.item',
    id: 'liquid-glass',
    order: 6,
    store: pluginStore,
    locale: NS,
    inject: pluginInjected,
  }, LiquidGlassPluginCard))

  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'liquid-glass',
    order: 12,
    store: appearanceStore,
    locale: NS,
    inject: appearanceInjected,
  }, LiquidGlassAppearanceRow))
}
