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
