/**
 * Liquid Glass client plugin body — Multi-Tier VisionOS Architecture.
 */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { LiquidGlassPluginCard, type LiquidGlassPluginCardInjected } from './LiquidGlassPluginCard.tsx'
import { LiquidGlassAppearanceRow, type LiquidGlassAppearanceRowInjected } from './LiquidGlassAppearanceRow.tsx'
import { AccordionModelSelect } from './AccordionModelSelect.tsx'
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

@keyframes dshMarketOverlayEnter {
  0% {
    opacity: 0;
    transform: scale(0.93) translateY(16px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
}

@keyframes dshMarketOverlayExit {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: scale(0.95) translateY(12px);
    filter: blur(6px);
  }
}

@keyframes dshMarketDetailEnter {
  0% {
    opacity: 0;
    transform: scale(0.92) translateY(14px);
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
}

@keyframes dshMarketDetailExit {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
    filter: blur(0px);
  }
  100% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
    filter: blur(4px);
  }
}

@keyframes dshDetailContentEnter {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dshModalMaskIn {
  0% {
    opacity: 0;
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
  100% {
    opacity: 1;
    backdrop-filter: blur(var(--dsh-modal-blur, 24px));
    -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px));
  }
}

@keyframes dshModalMaskOut {
  0% {
    opacity: 1;
    backdrop-filter: blur(var(--dsh-modal-blur, 24px));
    -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px));
  }
  100% {
    opacity: 0;
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }
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

/* 模型与推理等级选择器: 推理等级 (Effort) 水平胶囊滑动轨道 (Segmented Slider Track) */
html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])),
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])),
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) {
  width: max-content !important;
  min-width: 320px !important;
  max-width: calc(100vw - 32px) !important;
  padding: 6px 8px !important;
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  gap: 3px !important;
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.75)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 14px !important;
  box-shadow: var(--dsh-l1-shadow, 0 20px 48px rgba(0, 0, 0, 0.50)), inset 0 1px 0 rgba(255, 255, 255, 0.30) !important;
}

/* 选项按钮转为水平分段胶囊 */
html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) button[role="menuitemradio"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="option"],
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) [class*="_7KE1Ra_option"] {
  flex: 1 1 auto !important;
  min-width: 48px !important;
  height: 28px !important;
  min-height: 28px !important;
  padding: 0 10px !important;
  margin: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  border-radius: 8px !important;
  background: transparent !important;
  border: 1px solid transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  cursor: pointer !important;
  transition: all 0.14s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-shadow: none !important;
  transform: none !important;
}

/* 隐藏分段模式下的单选对勾图标 */
html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="check"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="check"],
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) [class*="_7KE1Ra_check"] {
  display: none !important;
}

/* 悬浮态 */
html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) button[role="menuitemradio"]:hover:not(:disabled),
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="option"]:hover:not(:disabled),
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) [class*="_7KE1Ra_option"]:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.10) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.15) !important;
  transform: none !important;
}

/* 选中态高亮胶囊 (Layer 2 晶莹透镜质感) */
html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) button[role="menuitemradio"][aria-checked="true"],
html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) button[role="menuitemradio"][class*="selected"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="option"][class*="selected"],
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) [class*="_7KE1Ra_option"][class*="_7KE1Ra_selected"],
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) [class*="_7KE1Ra_option"][aria-checked="true"] {
  background: var(--dsh-l2-glass-tint, linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.08) 100%)), var(--dsh-l2-bg, rgba(255, 255, 255, 0.14)) !important;
  border: 1px solid var(--dsh-l2-border, rgba(255, 255, 255, 0.35)) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: var(--dsh-l2-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.50), 0 2px 8px rgba(0, 0, 0, 0.30)) !important;
  border-radius: 8px !important;
  transform: none !important;
}

/* 文本居中排版 */
html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="optionCopy"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="optionCopy"],
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) [class*="_7KE1Ra_optionCopy"] {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: row !important;
  width: auto !important;
}

html[data-dsh-liquid-glass] div[role="menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="modelName"],
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"]:has(> button[role="menuitemradio"]):not(:has([class*="group"])) [class*="modelName"],
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"]:has(> [class*="_7KE1Ra_option"]):not(:has([class*="_7KE1Ra_group"])) [class*="_7KE1Ra_modelName"] {
  font-size: 12px !important;
  font-weight: inherit !important;
  color: inherit !important;
  line-height: normal !important;
  white-space: nowrap !important;
}

/* 自定义二级风琴折叠模型与推理选择器 (Accordion Model & Effort Select) */
html[data-dsh-liquid-glass] .dsh-model-select-root {
  position: relative;
  min-width: 0;
  display: inline-flex;
  align-items: center;
}

html[data-dsh-liquid-glass] .dsh-model-select-trigger {
  min-width: 0;
  max-width: 240px;
  height: 28px;
  color: var(--dsw-alias-label-secondary, rgba(255, 255, 255, 0.75)) !important;
  cursor: pointer;
  background: transparent !important;
  border: none !important;
  border-radius: 24px !important;
  outline: none;
  align-items: center;
  gap: 4px;
  padding: 0 6px 0 8px !important;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  display: flex;
  transition: all 0.12s ease;
}

html[data-dsh-liquid-glass] .dsh-model-select-trigger:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] .dsh-model-select-trigger-label {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
}

html[data-dsh-liquid-glass] .dsh-model-select-trigger-effort {
  color: var(--dsw-alias-label-caption, rgba(255, 255, 255, 0.50)) !important;
  flex: none;
}

html[data-dsh-liquid-glass] .dsh-model-select-chevron {
  color: var(--dsw-alias-label-caption, rgba(255, 255, 255, 0.50)) !important;
  flex: none;
  transition: transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
}

html[data-dsh-liquid-glass] .dsh-chevron-open {
  transform: rotate(180deg) !important;
}

html[data-dsh-liquid-glass] .dsh-model-select-menu,
html[data-dsh-liquid-glass] [class*="ModelSelect_menu"],
html[data-dsh-liquid-glass] [class*="_7KE1Ra_menu"] {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  z-index: 50;
  width: 320px;
  max-width: calc(100vw - 32px);
  max-height: min(640px, calc(100vh - 80px)) !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 6px !important;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 16px !important;
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.75)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  box-shadow: var(--dsh-l1-shadow, 0 20px 48px rgba(0, 0, 0, 0.50)), inset 0 1px 0 rgba(255, 255, 255, 0.30) !important;
  animation: dshMenuPopupScale 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

html[data-dsh-liquid-glass] .dsh-model-select-cell {
  width: 100%;
  height: 38px;
  color: #ffffff !important;
  cursor: pointer;
  text-align: left;
  background: transparent !important;
  border: 1px solid transparent !important;
  border-radius: 10px !important;
  align-items: center;
  gap: 8px;
  padding: 0 10px !important;
  font-size: 13px;
  line-height: 20px;
  display: flex;
  flex-shrink: 0;
  transition: all 0.14s ease;
}

html[data-dsh-liquid-glass] .dsh-model-select-cell:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
}

html[data-dsh-liquid-glass] .dsh-cell-active {
  background: rgba(255, 255, 255, 0.06) !important;
  border-color: rgba(255, 255, 255, 0.16) !important;
}

html[data-dsh-liquid-glass] .dsh-model-select-cell-label {
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: auto;
  min-width: 0;
  overflow: hidden;
  font-weight: 500;
}

html[data-dsh-liquid-glass] .dsh-model-select-cell-value {
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
  color: rgba(255, 255, 255, 0.60) !important;
  flex: 0 auto;
  overflow: hidden;
  font-size: 12px;
}

html[data-dsh-liquid-glass] .dsh-model-select-cell-chevron {
  color: rgba(255, 255, 255, 0.50) !important;
  flex: none;
  transition: transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
}

html[data-dsh-liquid-glass] .dsh-chevron-expanded {
  transform: rotate(90deg) !important;
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] .dsh-model-collapse-wrap,
html[data-dsh-liquid-glass] [class*="modelCollapseWrap"],
html[data-dsh-liquid-glass] .dsh-effort-collapse-wrap,
html[data-dsh-liquid-glass] [class*="effortCollapseWrap"] {
  width: 100%;
  padding: 2px 0 4px 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html[data-dsh-liquid-glass] .dsh-model-inline-panel,
html[data-dsh-liquid-glass] [class*="modelInlinePanel"] {
  background: var(--dsh-l1-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-l1-blur, 16px)) saturate(140%) !important;
  -webkit-backdrop-filter: blur(var(--dsh-l1-blur, 16px)) saturate(140%) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 14px !important;
  box-shadow: inset 0 1px 0 var(--dsh-l1-rim, rgba(255, 255, 255, 0.20)), 0 4px 16px rgba(0, 0, 0, 0.25) !important;
  padding: 6px !important;
  max-height: 240px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: background 0.15s ease, border-color 0.15s ease, backdrop-filter 0.15s ease !important;
}

html[data-dsh-liquid-glass] .dsh-model-select-status,
html[data-dsh-liquid-glass] .dsh-model-select-empty {
  color: rgba(255, 255, 255, 0.55) !important;
  font-size: 12px;
  padding: 8px 10px;
  text-align: center;
}

html[data-dsh-liquid-glass] .dsh-model-select-error,
html[data-dsh-liquid-glass] .dsh-model-select-warning {
  background: rgba(239, 68, 68, 0.15) !important;
  border: 1px solid rgba(239, 68, 68, 0.30) !important;
  border-radius: 8px !important;
  color: #fca5a5 !important;
  font-size: 12px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 4px;
}

html[data-dsh-liquid-glass] .dsh-model-select-retry {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  border-radius: 4px !important;
  color: #ffffff !important;
  font-size: 11px;
  cursor: pointer;
  padding: 2px 6px;
}

html[data-dsh-liquid-glass] .dsh-model-select-groups {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

html[data-dsh-liquid-glass] .dsh-model-select-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

html[data-dsh-liquid-glass] .dsh-model-select-group-title,
html[data-dsh-liquid-glass] [class*="ModelSelect_groupTitle"] {
  color: #38bdf8 !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  padding: 4px 8px 2px 8px !important;
  position: sticky;
  top: 0;
  background: rgba(10, 16, 28, 0.85) !important;
  backdrop-filter: blur(12px) !important;
  border-radius: 6px !important;
  z-index: 1;
}

html[data-dsh-liquid-glass] .dsh-model-select-option {
  width: 100%;
  min-height: 32px;
  color: rgba(255, 255, 255, 0.85) !important;
  text-align: left;
  cursor: pointer;
  background: transparent !important;
  border: 1px solid transparent !important;
  border-radius: 8px !important;
  outline: none;
  align-items: center;
  gap: 8px;
  padding: 4px 8px !important;
  display: flex;
  transition: all 0.12s ease;
}

html[data-dsh-liquid-glass] .dsh-model-select-option:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] .dsh-option-selected {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.12) 100%), rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
  font-weight: 500 !important;
}

html[data-dsh-liquid-glass] .dsh-model-select-option-copy {
  flex-direction: column;
  flex: 1;
  min-width: 0;
  display: flex;
}

html[data-dsh-liquid-glass] .dsh-model-select-model-name {
  color: inherit;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
}

html[data-dsh-liquid-glass] .dsh-model-select-description {
  color: rgba(255, 255, 255, 0.50) !important;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  overflow: hidden;
}

html[data-dsh-liquid-glass] .dsh-model-select-check {
  color: #38bdf8 !important;
  flex: 0 0 16px;
  place-items: center;
  display: grid;
}

html[data-dsh-liquid-glass] .dsh-effort-inline-panel,
html[data-dsh-liquid-glass] [class*="effortInlinePanel"] {
  background: var(--dsh-l1-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-l1-blur, 16px)) saturate(140%) !important;
  -webkit-backdrop-filter: blur(var(--dsh-l1-blur, 16px)) saturate(140%) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 14px !important;
  box-shadow: inset 0 1px 0 var(--dsh-l1-rim, rgba(255, 255, 255, 0.20)), 0 4px 16px rgba(0, 0, 0, 0.25) !important;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: background 0.15s ease, border-color 0.15s ease, backdrop-filter 0.15s ease !important;
}

html[data-dsh-liquid-glass] .dsh-effort-header-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 2px;
}

html[data-dsh-liquid-glass] .dsh-effort-glow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38bdf8 !important;
  box-shadow: 0 0 6px rgba(56, 189, 248, 0.80) !important;
}

html[data-dsh-liquid-glass] .dsh-effort-current-label {
  font-size: 12px;
  font-weight: 600;
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] .dsh-segmented-slider-track,
html[data-dsh-liquid-glass] [class*="segmentedSliderTrack"] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  background: rgba(0, 0, 0, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-radius: 10px !important;
  padding: 3px !important;
  overflow-x: auto;
}

html[data-dsh-liquid-glass] .dsh-segmented-option,
html[data-dsh-liquid-glass] [class*="segmentedOption"] {
  flex: 1 1 auto;
  min-width: 44px;
  height: 26px;
  padding: 0 8px !important;
  border-radius: 7px !important;
  background: transparent !important;
  border: 1px solid transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  transition: all 0.14s cubic-bezier(0.16, 1, 0.3, 1);
}

html[data-dsh-liquid-glass] .dsh-segmented-option:hover:not(:disabled),
html[data-dsh-liquid-glass] [class*="segmentedOption"]:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.10) !important;
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] .dsh-segmented-active,
html[data-dsh-liquid-glass] [class*="segmentedOption"][class*="active"],
html[data-dsh-liquid-glass] [class*="segmentedOption"][class*="selected"] {
  background: var(--dsh-l2-glass-tint, linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.08) 100%)), var(--dsh-l2-bg, rgba(255, 255, 255, 0.14)) !important;
  border: 1px solid var(--dsh-l2-border, rgba(255, 255, 255, 0.35)) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: var(--dsh-l2-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.50), 0 2px 8px rgba(0, 0, 0, 0.30)) !important;
  border-radius: 7px !important;
}

/* ============================================================================
 * 设置面板与模态弹窗 L3 虚化与选项完全生效
 * ========================================================================== */
html[data-dsh-liquid-glass] [class*="SettingsRoot_panel"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="VOzbGW_panel"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="_panel"][role="dialog"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="SettingsRoot_panelOpening"],
html[data-dsh-liquid-glass] [class*="Modal_dialog"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]) {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.70)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.35)), 0 32px 80px rgba(0, 0, 0, 0.75) !important;
  animation: dshModalPanelEnter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

html[data-dsh-liquid-glass] [class*="SettingsRoot_panelClosing"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_panel"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="VOzbGW_panel"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="_panel"][role="dialog"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="Modal_dialog"][data-closing="true"],
html[data-dsh-liquid-glass] [data-dsh-closing="true"] [class*="_panel"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.70)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.35)), 0 32px 80px rgba(0, 0, 0, 0.75) !important;
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
html[data-dsh-liquid-glass] [class*="SettingsRoot_options"],
html[data-dsh-liquid-glass] [class*="VOzbGW_content"],
html[data-dsh-liquid-glass] [class*="VOzbGW_options"],
html[data-dsh-liquid-glass] [class*="VOzbGW_nav"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html[data-dsh-liquid-glass] [class*="panelClosing"] [class*="navCell"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_panel"][data-closing="true"] [class*="navCell"],
html[data-dsh-liquid-glass] [class*="VOzbGW_panel"][data-closing="true"] [class*="navCell"] {
  animation: none !important;
}

html[data-dsh-liquid-glass] [class*="mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="Mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="_mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="SettingsRoot_mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="VOzbGW_mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [class*="maskOpening"],
html[data-dsh-liquid-glass] [class*="Modal_mask"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] [role="presentation"] > div[aria-hidden="true"]:not([class*="Closing"]):not([class*="closing"]):not([data-closing="true"]),
html[data-dsh-liquid-glass] .dshMarketOverlayMask,
html[data-dsh-liquid-glass] [class*="dshMarketOverlayMask"] {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  animation: dshModalMaskIn 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

html[data-dsh-liquid-glass] [class*="maskClosing"],
html[data-dsh-liquid-glass] [class*="_mask"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="SettingsRoot_mask"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="VOzbGW_mask"][data-closing="true"],
html[data-dsh-liquid-glass] [class*="Modal_mask"][data-closing="true"],
html[data-dsh-liquid-glass] [role="presentation"][data-dsh-closing="true"] > div[aria-hidden="true"],
html[data-dsh-liquid-glass] [class*="Modal_root"][data-dsh-closing="true"] [class*="Modal_mask"],
html[data-dsh-liquid-glass] [data-dsh-closing="true"] .dshMarketOverlayMask {
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

/* 1. 遮罩暗化底板 (出入场动效) */
html[data-dsh-liquid-glass] .dshMarketOverlayMask,
html[data-dsh-liquid-glass] [class*="dshMarketOverlayMask"],
html[data-dsh-liquid-glass] [class*="Modal_mask"] {
  position: absolute !important;
  inset: 0 !important;
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.45)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  animation: dshModalMaskIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
  border: none !important;
  z-index: 0 !important;
}

html[data-dsh-liquid-glass] .dshMarketOverlay[data-dsh-closing="true"] .dshMarketOverlayMask,
html[data-dsh-liquid-glass] [class*="Modal_root"][data-dsh-closing="true"] [class*="Modal_mask"],
html[data-dsh-liquid-glass] [data-dsh-closing="true"] .dshMarketOverlayMask,
html[data-dsh-liquid-glass] [data-dsh-closing="true"] [class*="Modal_mask"] {
  animation: dshModalMaskOut 0.18s cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
}

/* 2. 插件市场主面板实体 (接入 L3 弹窗玻璃，顶级物理出入场动效) */
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
  animation: dshMarketOverlayEnter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
  will-change: transform, opacity, filter !important;
}

html[data-dsh-liquid-glass] .dshMarketOverlay[data-dsh-closing="true"] .dshMarketOverlayPanel,
html[data-dsh-liquid-glass] [data-dsh-closing="true"] [class*="dshMarketOverlayPanel"] {
  animation: dshMarketOverlayExit 0.18s cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
  pointer-events: none !important;
}

/* 2.1 市场内部二级弹窗与插件详情 (确认安装/详情/源管理等，出入场物理微动效) */
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
  box-sizing: border-box !important;
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.85)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.18)) !important;
  border-radius: 24px !important;
  box-shadow: inset 0 1.5px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.35)), 0 32px 80px rgba(0, 0, 0, 0.80) !important;
  color: #ffffff !important;
  overflow: hidden !important;
  padding: 0 !important;
  animation: dshMarketDetailEnter 0.24s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
  will-change: transform, opacity, filter !important;
}

html[data-dsh-liquid-glass] [class*="Modal_root"][data-dsh-closing="true"] .dshMarketModal,
html[data-dsh-liquid-glass] [class*="Modal_root"][data-dsh-closing="true"] [class*="dshMarketModal"],
html[data-dsh-liquid-glass] .dshMarketModal[data-dsh-closing="true"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"][data-dsh-closing="true"] {
  animation: dshMarketDetailExit 0.18s cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
  pointer-events: none !important;
}

/* 2.1.1 插件详情与操作流内部内容展开动效 */
html[data-dsh-liquid-glass] .dshMarketDetails,
html[data-dsh-liquid-glass] [class*="dshMarketDetails"],
html[data-dsh-liquid-glass] .dshMarketDetailsIntro,
html[data-dsh-liquid-glass] [class*="dshMarketDetailsIntro"],
html[data-dsh-liquid-glass] .dshMarketOperationReview,
html[data-dsh-liquid-glass] [class*="dshMarketOperationReview"] {
  animation: dshDetailContentEnter 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

/* 2.2 二级弹窗内部容器彻底透明穿透，绝无第二层框 */
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_content"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_content"],
html[data-dsh-liquid-glass] .dshMarketModalContent,
html[data-dsh-liquid-glass] [class*="dshMarketModalContent"],
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_body"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_body"],
html[data-dsh-liquid-glass] .dshMarketOperationReview,
html[data-dsh-liquid-glass] [class*="dshMarketOperationReview"] {
  box-sizing: border-box !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_content"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_content"] {
  padding: 24px 24px 16px !important;
}

/* 2.3 二级弹窗头部、标题、描述与关闭按钮 */
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_header"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_header"] {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  margin-bottom: 6px !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_title"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_title"] {
  margin: 0 !important;
  color: #ffffff !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_description"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_description"] {
  margin: 0 0 14px !important;
  color: rgba(255, 255, 255, 0.70) !important;
  font-size: 13px !important;
  line-height: 20px !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_close"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_close"] {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  color: #ffffff !important;
  transition: all 0.16s ease !important;
  cursor: pointer !important;
}

html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_close"]:hover,
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_close"]:hover {
  background: rgba(255, 255, 255, 0.16) !important;
  color: #ffffff !important;
  transform: scale(1.05) !important;
}

/* 2.4 事实参数列表 (OperationFacts - 纯平极简单层对齐) */
html[data-dsh-liquid-glass] .dshMarketOperationFacts,
html[data-dsh-liquid-glass] [class*="dshMarketOperationFacts"] {
  display: flex !important;
  flex-direction: column !important;
  gap: 0 !important;
  margin: 8px 0 14px !important;
  padding: 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationFacts > div {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 7px 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  gap: 16px !important;
  box-sizing: border-box !important;
  width: 100% !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationFacts > div:last-child {
  border-bottom: none !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationFacts dt {
  color: rgba(255, 255, 255, 0.60) !important;
  font-size: 13px !important;
  font-weight: 400 !important;
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

/* 2.5 提示与警告信息 (纯平单色文本，无额外边框/背景) */
html[data-dsh-liquid-glass] .dshMarketOperationWarning,
html[data-dsh-liquid-glass] [class*="dshMarketOperationWarning"] {
  display: flex !important;
  align-items: flex-start !important;
  gap: 8px !important;
  margin-bottom: 6px !important;
  padding: 4px 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  color: rgba(255, 255, 255, 0.70) !important;
  font-size: 12.5px !important;
  line-height: 1.55 !important;
  box-sizing: border-box !important;
  width: 100% !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationWarning a {
  color: #ffffff !important;
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
}

html[data-dsh-liquid-glass] .dshMarketOperationSuccess,
html[data-dsh-liquid-glass] .dshMarketOperationProgress,
html[data-dsh-liquid-glass] .dshMarketError {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 8px 0 !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: #ffffff !important;
  font-size: 13px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* 2.6 二级弹窗底部操作栏与单色微光按钮 */
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"],
html[data-dsh-liquid-glass] .dshMarketModalActions,
html[data-dsh-liquid-glass] [class*="dshMarketModalActions"] {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 10px !important;
  padding: 14px 24px 20px !important;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button,
html[data-dsh-liquid-glass] [class*="dshMarketModalActions"] button,
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"] button,
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"] button {
  height: 36px !important;
  padding: 0 18px !important;
  border-radius: 10px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  cursor: pointer !important;
  box-sizing: border-box !important;
  transition: all 0.16s ease !important;
}

/* 取消按钮 */
html[data-dsh-liquid-glass] .dshMarketModalActions button:first-child:not([class*="primary"]),
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"] button:first-child:not([class*="primary"]),
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"] button:first-child:not([class*="primary"]) {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  color: rgba(255, 255, 255, 0.85) !important;
  box-shadow: none !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button:first-child:not([class*="primary"]):hover,
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"] button:first-child:not([class*="primary"]):hover,
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"] button:first-child:not([class*="primary"]):hover {
  background: rgba(255, 255, 255, 0.14) !important;
  color: #ffffff !important;
  border-color: rgba(255, 255, 255, 0.26) !important;
}

/* 确认安装 / 主按钮 - 纯净单层微光白 */
html[data-dsh-liquid-glass] .dshMarketModalActions button[class*="primary"],
html[data-dsh-liquid-glass] .dshMarketModalActions button:last-child:not(:first-child),
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"] button[class*="primary"],
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"] button[class*="primary"],
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"] button:last-child:not(:first-child),
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"] button:last-child:not(:first-child) {
  background: rgba(255, 255, 255, 0.20) !important;
  border: 1px solid rgba(255, 255, 255, 0.35) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.30), 0 2px 8px rgba(0, 0, 0, 0.30) !important;
}

html[data-dsh-liquid-glass] .dshMarketModalActions button[class*="primary"]:hover,
html[data-dsh-liquid-glass] .dshMarketModalActions button:last-child:not(:first-child):hover,
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"] button[class*="primary"]:hover,
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"] button[class*="primary"]:hover,
html[data-dsh-liquid-glass] .dshMarketModal [class*="Modal_footer"] button:last-child:not(:first-child):hover,
html[data-dsh-liquid-glass] [class*="dshMarketModal"] [class*="Modal_footer"] button:last-child:not(:first-child):hover {
  background: rgba(255, 255, 255, 0.30) !important;
  border-color: rgba(255, 255, 255, 0.50) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.40), 0 4px 14px rgba(0, 0, 0, 0.40) !important;
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

/* 4. 标题与文字层次 (单色中性层) */
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

/* 7. 标签胶囊与分类按钮 (单色中性层) */
html[data-dsh-liquid-glass] .dshMarketTags span,
html[data-dsh-liquid-glass] [class*="dshMarketTags"] span {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.16) !important;
  color: rgba(255, 255, 255, 0.85) !important;
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
  background: rgba(255, 255, 255, 0.22) !important;
  border-color: rgba(255, 255, 255, 0.40) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.30) !important;
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
  color: #ffffff !important;
}
`

    // 监听关闭动作，触发优雅退场物理动画
    if (!(window as any).__dsh_modal_exit_listener_bound) {
      (window as any).__dsh_modal_exit_listener_bound = true

      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement | null
        if (!target) return
        const closeTrigger = target.closest<HTMLElement>(
          '.dshMarketOverlayMask, .dshMarketOverlayHeader button, .Modal_close, [class*="Modal_close"], .Modal_mask, [class*="Modal_mask"], .dshMarketModalActions button:first-child:not([class*="primary"]), [class*="Modal_footer"] button:first-child:not([class*="primary"])'
        )
        if (closeTrigger) {
          const overlay = closeTrigger.closest<HTMLElement>('.dshMarketOverlay, [class*="Modal_root"], .dshMarketModal, [class*="Modal_dialog"]')
          if (overlay && !overlay.getAttribute('data-dsh-closing')) {
            e.preventDefault()
            e.stopPropagation()
            overlay.setAttribute('data-dsh-closing', 'true')
            const root = overlay.closest<HTMLElement>('.dshMarketOverlay, [class*="Modal_root"]') || overlay
            root.setAttribute('data-dsh-closing', 'true')
            setTimeout(() => {
              closeTrigger.click()
            }, 180)
          }
        }
      }, true)

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const overlays = document.querySelectorAll<HTMLElement>('.dshMarketOverlay, [class*="Modal_root"]')
          if (overlays.length > 0) {
            const topOverlay = overlays[overlays.length - 1]
            if (topOverlay && !topOverlay.getAttribute('data-dsh-closing')) {
              e.preventDefault()
              e.stopPropagation()
              topOverlay.setAttribute('data-dsh-closing', 'true')
              setTimeout(() => {
                const closeBtn = topOverlay.querySelector<HTMLElement>('.Modal_close, [class*="Modal_close"], .dshMarketOverlayHeader button, .dshMarketOverlayMask')
                if (closeBtn) {
                  closeBtn.click()
                }
              }, 180)
            }
          }
        }
      }, true)
    }
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
    key: 'liquid-glass',
    id: 'liquid-glass',
    order: 6,
    store: pluginStore,
    locale: NS,
    inject: pluginInjected,
  } as any, LiquidGlassPluginCard))

  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'liquid-glass',
    order: 12,
    store: appearanceStore,
    locale: NS,
    inject: appearanceInjected,
  }, LiquidGlassAppearanceRow))

  ctx.inject(['slots', 'modelDirectories'], (scope: any) => {
    const models = scope.modelDirectories
    const sessions = scope.sessions
    scope.slots.inject('conversation.input.model', () => scope.slots.register({
      name: 'conversation.input.model',
      priority: -10,
      locale: '@deepseek-ai/dsh-client-ui-model-selection',
      inject: (sessionId: string) => {
        const directory = models.directoryFor(sessionId)
        const available = sessions ? sessions.subagentAddress(sessionId) === void 0 : true
        return {
          available,
          directory: directory.store,
          load: () => {
            if (available) directory.load().catch(() => {})
          },
          select: (selection: any) => (available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)),
        }
      },
    }, AccordionModelSelect))
  })
}
