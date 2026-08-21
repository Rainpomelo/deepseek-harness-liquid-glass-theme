window.__ModuleLoader__.load({
	id: "@deepseek-ai/dsh-client-ui-liquid-glass",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region \0dsh-css:C:\Agent code\deepseek-harness-插件\deepseek-harness-Liquid glass-Live Wallpaper\src\client\LiquidGlassPluginCard.module.css.mjs
		const css$2 = ".YQXauG_card{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff1f 0%, #ffffff05 100%));background-color:var(--dsh-l2-bg,transparent);-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px)) saturate(140%);border:1px solid var(--dsh-l2-border,#ffffff38);box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff59, 0 4px 16px #0000002e);border-radius:16px;flex-direction:column;padding:16px;transition:all .18s cubic-bezier(.16,1,.3,1);display:flex;overflow:hidden}.YQXauG_card:hover{border-color:var(--dsh-l2-rim,#ffffff61);transform:translateY(-2px);box-shadow:inset 0 1px #ffffff73,0 8px 24px #00000040}.YQXauG_head{justify-content:space-between;align-items:center;gap:16px;display:flex}.YQXauG_text{flex-direction:column;gap:2px;min-width:0;display:flex}.YQXauG_title{color:#fff;text-shadow:0 1px 2px #0006;font-size:14px;font-weight:500;line-height:22px}.YQXauG_description{color:#ffffffa6;font-size:12px;line-height:18px}.YQXauG_toggle{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff1f 0%, #ffffff05 100%));background-color:var(--dsh-l2-bg,transparent);border:1px solid var(--dsh-l2-border,#fff3);color:#ffffffd9;cursor:pointer;border-radius:14px;flex:none;align-items:center;gap:6px;height:28px;padding:0 10px 0 6px;font-size:12px;line-height:18px;transition:all .14s;display:inline-flex;box-shadow:inset 0 1px #ffffff4d}.YQXauG_toggle:hover{border-color:var(--dsh-l2-rim,#ffffff59);color:#fff;background:linear-gradient(135deg,#ffffff2e 0%,#38bdf814 100%);transform:translateY(-1px)}.YQXauG_toggle[aria-pressed=true]{background:linear-gradient(135deg,#38bdf859 0%,#6366f133 100%);background-color:var(--dsh-l2-bg,#ffffff26);color:#fff;border:1px solid #ffffff59;font-weight:600;box-shadow:inset 0 1px #ffffff80,0 4px 12px #38bdf840}.YQXauG_check{justify-content:center;align-items:center;width:16px;height:16px;display:inline-flex}";
		const tagId$2 = "@deepseek-ai/dsh-client-ui-liquid-glass/LiquidGlassPluginCard.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-liquid-glass";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var LiquidGlassPluginCard_module_css_default = {
			"toggle": "YQXauG_toggle",
			"check": "YQXauG_check",
			"card": "YQXauG_card",
			"head": "YQXauG_head",
			"text": "YQXauG_text",
			"title": "YQXauG_title",
			"description": "YQXauG_description"
		};
		//#endregion
		//#region src/client/LiquidGlassPluginCard.tsx
		function LiquidGlassPluginCard(props) {
			const { t, setEnabled, useStore } = props;
			const enabled = useStore((s) => s.enabled);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
				className: LiquidGlassPluginCard_module_css_default.card,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: LiquidGlassPluginCard_module_css_default.head,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: LiquidGlassPluginCard_module_css_default.text,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: LiquidGlassPluginCard_module_css_default.title,
							children: t("liquidGlass.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: LiquidGlassPluginCard_module_css_default.description,
							children: t("liquidGlass.description")
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
						type: "button",
						className: LiquidGlassPluginCard_module_css_default.toggle,
						"aria-pressed": enabled,
						onClick: () => {
							setEnabled(!enabled);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: LiquidGlassPluginCard_module_css_default.check,
							children: enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, {})
						}), enabled ? t("liquidGlass.enable") : t("liquidGlass.disable")]
					})]
				})
			});
		}
		//#endregion
		//#region \0dsh-css:C:\Agent code\deepseek-harness-插件\deepseek-harness-Liquid glass-Live Wallpaper\src\client\LiquidGlassAppearanceRow.module.css.mjs
		const css$1 = ".eOmHQG_group{border-top:1px solid var(--dsh-l1-border,#ffffff1a);flex-direction:column;gap:20px;padding:16px 0;display:flex}.eOmHQG_cardAccordion{border:1px solid var(--dsh-l2-border,#ffffff38);background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff1f 0%, #ffffff05 100%)), var(--dsh-l2-bg,transparent);-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px)) saturate(140%);box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff59, 0 4px 16px #0003);border-radius:12px;transition:border-color .16s,box-shadow .16s;overflow:hidden}.eOmHQG_cardAccordion:hover{border-color:var(--dsh-l2-rim,#ffffff59);box-shadow:inset 0 1px #ffffff73,0 6px 20px #00000040}.eOmHQG_accordionHeader{cursor:pointer;user-select:none;background:0 0;justify-content:space-between;align-items:center;padding:10px 14px;transition:background .14s;display:flex}.eOmHQG_accordionHeader:hover{background:#ffffff14}.eOmHQG_accordionTitle{color:#fff;text-shadow:0 1px 2px #0006;align-items:center;gap:8px;font-size:13px;font-weight:600;display:flex}.eOmHQG_accordionTitle:before{content:\"\";background:#38bdf8;border-radius:2px;width:4px;height:12px;display:inline-block;box-shadow:0 0 8px #38bdf899}.eOmHQG_chevron{color:#ffffffbf;font-size:10px;transition:transform .26s cubic-bezier(.16,1,.3,1);transform:rotate(0)}.eOmHQG_chevronExpanded{transform:rotate(180deg)}.eOmHQG_accordionCollapse{grid-template-rows:0fr;transition:grid-template-rows .24s cubic-bezier(.25,1,.5,1);display:grid}.eOmHQG_accordionCollapseExpanded{grid-template-rows:1fr;transition:grid-template-rows .3s cubic-bezier(.16,1,.3,1)}.eOmHQG_accordionInner{min-height:0;overflow:hidden}.eOmHQG_accordionBody{border-top:1px solid var(--dsh-l2-border,#ffffff26);background:var(--dsh-l2-bg,transparent);opacity:0;flex-direction:column;gap:10px;padding:12px 14px;transition:opacity .2s cubic-bezier(.25,1,.5,1),transform .24s cubic-bezier(.25,1,.5,1);display:flex;transform:translateY(-4px)}.eOmHQG_accordionBodyExpanded{opacity:1;transition:opacity .28s cubic-bezier(.16,1,.3,1),transform .3s cubic-bezier(.16,1,.3,1);transform:translateY(0)}.eOmHQG_presetActions{flex-wrap:wrap;gap:10px;display:flex}.eOmHQG_actionBtn{border:1px solid var(--dsh-l2-border,#ffffff3d);background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff26 0%, #ffffff08 100%)), var(--dsh-l2-bg,transparent);-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px));box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff59, 0 2px 8px #00000026);color:#fff;text-shadow:0 1px 2px #0006;cursor:pointer;border-radius:10px;align-items:center;gap:6px;padding:6px 14px;font-size:12px;font-weight:500;transition:all .14s cubic-bezier(.16,1,.3,1);display:inline-flex}.eOmHQG_actionBtn:hover{background:linear-gradient(135deg, #ffffff38 0%, #38bdf824 100%), var(--dsh-l2-bg,transparent);border-color:var(--dsh-l2-rim,#fff6);transform:translateY(-1px);box-shadow:inset 0 1px #ffffff80,0 4px 14px #00000040}.eOmHQG_actionBtn:active{transform:scale(.97)translateY(0)}.eOmHQG_notice{color:#38bdf8;font-size:12px;animation:.2s eOmHQG_fadeIn}@keyframes eOmHQG_fadeIn{0%{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:translateY(0)}}.eOmHQG_rowSectionHeader{color:#fff!important;text-shadow:0 1px 2px #0006!important;white-space:nowrap!important;box-sizing:border-box!important;align-items:center!important;gap:8px!important;width:100%!important;max-width:100%!important;margin:14px 0 6px!important;padding:0!important;font-size:13px!important;font-weight:600!important;display:flex!important}.eOmHQG_rowSectionHeader:before{content:\"\";background:#38bdf8;border-radius:2px;flex-shrink:0;width:4px;height:12px;display:inline-block;box-shadow:0 0 8px #38bdf899}.eOmHQG_controls{flex-direction:column;gap:14px;display:flex}.eOmHQG_row{justify-content:space-between;align-items:center;gap:16px;display:flex}.eOmHQG_rowLabel{color:#fffffff2;font-size:13px;font-weight:500}.eOmHQG_rowHint{color:#ffffff8c;margin-top:-6px;font-size:12px;line-height:18px}.eOmHQG_knob{cursor:pointer;justify-content:space-between;align-items:center;gap:14px;display:flex}.eOmHQG_knobLabel{color:#ffffffd9;flex:1;min-width:140px;font-size:13px}.eOmHQG_slider{accent-color:#38bdf8;cursor:pointer;background:#fff3;border-radius:2px;flex:2;height:4px}.eOmHQG_numberWrap{border:1px solid var(--dsh-l2-border,#ffffff40);background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff29 0%, #ffffff08 100%)), var(--dsh-l2-bg,transparent);-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px)) saturate(140%);box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff61, 0 2px 8px #0000002e);border-radius:8px;align-items:center;gap:4px;padding:3px 8px;transition:border-color .14s,box-shadow .14s;display:inline-flex}.eOmHQG_numberWrap:hover,.eOmHQG_numberWrap:focus-within{border-color:var(--dsh-l2-rim,#ffffff73);box-shadow:inset 0 1px #ffffff80,0 4px 12px #00000040}.eOmHQG_number{text-align:right;text-shadow:0 1px 2px #0006;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield;width:48px;font-family:monospace;font-size:12px;font-weight:500;box-shadow:none!important;color:#fff!important;background:0 0!important;border:none!important;border-radius:0!important;outline:none!important;margin:0!important;padding:0!important}.eOmHQG_number::-webkit-inner-spin-button,.eOmHQG_number::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.eOmHQG_unit{color:#ffffffb3;user-select:none;font-size:11px}.eOmHQG_segmented{background:var(--dsh-l1-bg,#0a101c73);border:1px solid var(--dsh-l1-border,#ffffff29);-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px)) saturate(150%);user-select:none;border-radius:10px;align-items:center;padding:3px;display:inline-flex;position:relative;box-shadow:inset 0 1px 1px #0003}.eOmHQG_segIndicator{box-sizing:border-box;pointer-events:none;background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff38 0%, #38bdf82e 100%)), var(--dsh-l2-bg,transparent);-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px)) saturate(160%);border:1px solid var(--dsh-l2-border,#ffffff52);box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff80, 0 4px 12px #38bdf840);will-change:transform, width, height;border-radius:7px;transition:transform .26s cubic-bezier(.16,1,.3,1),width .26s cubic-bezier(.16,1,.3,1),height .26s cubic-bezier(.16,1,.3,1),opacity .18s cubic-bezier(.16,1,.3,1);position:absolute;top:0;left:0}.eOmHQG_segItem{z-index:1;cursor:pointer;user-select:none;border-radius:7px;outline:none;padding:5px 14px;font-size:12px;transition:color .18s cubic-bezier(.16,1,.3,1);position:relative;box-shadow:none!important;color:#ffffffb3!important;background:0 0!important;border:none!important}.eOmHQG_segItem:hover{color:#fff!important;box-shadow:none!important;background:0 0!important;border:none!important}.eOmHQG_segItemActive{text-shadow:0 1px 2px #0006;font-weight:600;color:#fff!important}.eOmHQG_galleryContainer{border:1px solid var(--dsh-l2-border,#ffffff26);background:#ffffff09;border-radius:14px;flex-direction:column;gap:10px;padding:12px;display:flex;box-shadow:inset 0 1px #ffffff26}.eOmHQG_galleryHeader{justify-content:space-between;align-items:center;display:flex}.eOmHQG_galleryTitle{color:#fff;font-size:13px;font-weight:500}.eOmHQG_galleryBadge{color:#ffffffd9;background:#ffffff1a;border:1px solid #ffffff2e;border-radius:999px;padding:2px 8px;font-size:11px;font-weight:500}.eOmHQG_galleryTrack{cursor:grab;-webkit-user-select:none;user-select:none;touch-action:pan-y;align-items:center;gap:12px;padding:4px 2px 8px;display:flex;overflow:auto hidden;scrollbar-width:none!important;-ms-overflow-style:none!important}.eOmHQG_galleryTrack:active{cursor:grabbing}.eOmHQG_galleryTrack::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}.eOmHQG_slotCard{border:1.5px solid var(--dsh-l2-border,#fff3);cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-user-drag:none;background:#0006;border-radius:10px;flex:0 0 140px;height:96px;transition:transform .16s cubic-bezier(.16,1,.3,1),border-color .16s,box-shadow .16s;position:relative;overflow:hidden;box-shadow:0 4px 12px #00000040}.eOmHQG_slotCard:hover{border-color:var(--dsh-l2-rim,#ffffff80);transform:translateY(-2px);box-shadow:0 6px 16px #00000059}.eOmHQG_slotCardActive{border-color:#38bdf8!important;box-shadow:0 0 14px #38bdf873,inset 0 0 0 1px #38bdf8!important}.eOmHQG_slotThumb{object-fit:cover;pointer-events:none;-webkit-user-drag:none;width:100%;height:100%;display:block}.eOmHQG_slotOverlay{pointer-events:none;z-index:2;justify-content:space-between;align-items:center;display:flex;position:absolute;top:4px;left:4px;right:4px}.eOmHQG_slotTypeBadge{backdrop-filter:blur(6px);color:#fff;background:#000000a6;border:1px solid #ffffff40;border-radius:4px;padding:1px 5px;font-size:10px;font-weight:500}.eOmHQG_slotDeleteBtn{pointer-events:auto;backdrop-filter:blur(6px);color:#fff;cursor:pointer;background:#000000a6;border:1px solid #ffffff4d;border-radius:50%;justify-content:center;align-items:center;width:20px;height:20px;padding:0;font-size:11px;transition:all .12s;display:inline-flex}.eOmHQG_slotDeleteBtn:hover{background:#ef4444;border-color:#ef4444;transform:scale(1.1)}.eOmHQG_slotActiveBadge{color:#000;z-index:2;background:#38bdf8;border-radius:50%;justify-content:center;align-items:center;width:18px;height:18px;font-size:11px;font-weight:700;display:flex;position:absolute;bottom:22px;right:6px;box-shadow:0 2px 6px #0006}.eOmHQG_slotFooter{z-index:1;background:linear-gradient(#0000 0%,#000000d9 100%);padding:3px 6px;position:absolute;bottom:0;left:0;right:0}.eOmHQG_slotName{color:#ffffffe6;white-space:nowrap;text-overflow:ellipsis;font-size:11px;display:block;overflow:hidden}.eOmHQG_slotAddCard{border:1.5px dashed var(--dsh-l2-border,#ffffff40);background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff14 0%, #ffffff03 100%));color:#ffffffbf;cursor:pointer;text-align:center;user-select:none;border-radius:10px;flex-direction:column;flex:0 0 120px;justify-content:center;align-items:center;gap:4px;height:96px;padding:8px;transition:all .16s;display:flex}.eOmHQG_slotAddCard:hover{border-color:var(--dsh-l2-rim,#ffffff80);color:#fff;background:linear-gradient(135deg,#ffffff24 0%,#38bdf80f 100%);transform:translateY(-2px)}.eOmHQG_addIcon{color:#38bdf8;font-size:20px;font-weight:300;line-height:1}.eOmHQG_addLabel{font-size:11px;font-weight:500}.eOmHQG_addHint{color:#ffffff73;font-size:9px}";
		const tagId$1 = "@deepseek-ai/dsh-client-ui-liquid-glass/LiquidGlassAppearanceRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-liquid-glass";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var LiquidGlassAppearanceRow_module_css_default = {
			"accordionBody": "eOmHQG_accordionBody",
			"slider": "eOmHQG_slider",
			"accordionTitle": "eOmHQG_accordionTitle",
			"group": "eOmHQG_group",
			"addLabel": "eOmHQG_addLabel",
			"row": "eOmHQG_row",
			"knob": "eOmHQG_knob",
			"unit": "eOmHQG_unit",
			"galleryTitle": "eOmHQG_galleryTitle",
			"slotName": "eOmHQG_slotName",
			"number": "eOmHQG_number",
			"slotActiveBadge": "eOmHQG_slotActiveBadge",
			"chevronExpanded": "eOmHQG_chevronExpanded",
			"actionBtn": "eOmHQG_actionBtn",
			"galleryHeader": "eOmHQG_galleryHeader",
			"rowLabel": "eOmHQG_rowLabel",
			"slotCardActive": "eOmHQG_slotCardActive",
			"cardAccordion": "eOmHQG_cardAccordion",
			"galleryTrack": "eOmHQG_galleryTrack",
			"slotFooter": "eOmHQG_slotFooter",
			"slotTypeBadge": "eOmHQG_slotTypeBadge",
			"accordionCollapse": "eOmHQG_accordionCollapse",
			"knobLabel": "eOmHQG_knobLabel",
			"presetActions": "eOmHQG_presetActions",
			"accordionBodyExpanded": "eOmHQG_accordionBodyExpanded",
			"accordionInner": "eOmHQG_accordionInner",
			"numberWrap": "eOmHQG_numberWrap",
			"segIndicator": "eOmHQG_segIndicator",
			"addHint": "eOmHQG_addHint",
			"rowSectionHeader": "eOmHQG_rowSectionHeader",
			"segItem": "eOmHQG_segItem",
			"slotThumb": "eOmHQG_slotThumb",
			"slotOverlay": "eOmHQG_slotOverlay",
			"galleryContainer": "eOmHQG_galleryContainer",
			"accordionCollapseExpanded": "eOmHQG_accordionCollapseExpanded",
			"accordionHeader": "eOmHQG_accordionHeader",
			"controls": "eOmHQG_controls",
			"segItemActive": "eOmHQG_segItemActive",
			"fadeIn": "eOmHQG_fadeIn",
			"galleryBadge": "eOmHQG_galleryBadge",
			"slotDeleteBtn": "eOmHQG_slotDeleteBtn",
			"segmented": "eOmHQG_segmented",
			"slotCard": "eOmHQG_slotCard",
			"rowHint": "eOmHQG_rowHint",
			"slotAddCard": "eOmHQG_slotAddCard",
			"addIcon": "eOmHQG_addIcon",
			"chevron": "eOmHQG_chevron",
			"notice": "eOmHQG_notice"
		};
		//#endregion
		//#region src/client/LiquidGlassControls.tsx
		function Knob({ label, value, min, max, step, unit, onChange }) {
			const clamp = (n) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: LiquidGlassAppearanceRow_module_css_default.knob,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: LiquidGlassAppearanceRow_module_css_default.knobLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						className: LiquidGlassAppearanceRow_module_css_default.slider,
						min,
						max,
						step,
						value,
						onChange: (e) => {
							onChange(clamp(Number(e.target.value)));
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: LiquidGlassAppearanceRow_module_css_default.numberWrap,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "number",
							className: LiquidGlassAppearanceRow_module_css_default.number,
							min,
							max,
							step,
							value,
							onChange: (e) => {
								onChange(clamp(Number(e.target.value)));
							}
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: LiquidGlassAppearanceRow_module_css_default.unit,
							children: unit
						})]
					})
				]
			});
		}
		function Segmented({ label, value, options, onSelect }) {
			const containerRef = (0, react.useRef)(null);
			const buttonsRef = (0, react.useRef)(/* @__PURE__ */ new Map());
			const [indicatorStyle, setIndicatorStyle] = (0, react.useState)({
				left: 0,
				top: 0,
				width: 0,
				height: 0,
				opacity: 0
			});
			const updateIndicator = () => {
				const btn = buttonsRef.current.get(value);
				if (btn) setIndicatorStyle({
					left: btn.offsetLeft,
					top: btn.offsetTop,
					width: btn.offsetWidth,
					height: btn.offsetHeight,
					opacity: 1
				});
			};
			(0, react.useEffect)(() => {
				updateIndicator();
				if (containerRef.current && typeof ResizeObserver !== "undefined") {
					const ro = new ResizeObserver(() => {
						updateIndicator();
					});
					ro.observe(containerRef.current);
					return () => {
						ro.disconnect();
					};
				}
			}, [value, options]);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: containerRef,
				className: LiquidGlassAppearanceRow_module_css_default.segmented,
				role: "group",
				"aria-label": label,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: LiquidGlassAppearanceRow_module_css_default.segIndicator,
					style: {
						transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
						width: `${indicatorStyle.width}px`,
						height: `${indicatorStyle.height}px`,
						opacity: indicatorStyle.opacity
					}
				}), options.map((option) => {
					const isActive = option.id === value;
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						ref: (el) => {
							if (el) buttonsRef.current.set(option.id, el);
							else buttonsRef.current.delete(option.id);
						},
						type: "button",
						className: `${LiquidGlassAppearanceRow_module_css_default.segItem} ${isActive ? LiquidGlassAppearanceRow_module_css_default.segItemActive : ""}`,
						"aria-pressed": isActive,
						onClick: () => {
							onSelect(option.id);
						},
						children: option.label
					}, option.id);
				})]
			});
		}
		function extractVideoPoster(fileOrBlob) {
			return new Promise((resolve) => {
				try {
					const v = document.createElement("video");
					v.muted = true;
					v.autoplay = false;
					v.playsInline = true;
					v.preload = "auto";
					const url = URL.createObjectURL(fileOrBlob);
					v.src = url;
					let resolved = false;
					const finish = (dataUrl) => {
						if (resolved) return;
						resolved = true;
						try {
							URL.revokeObjectURL(url);
						} catch {}
						resolve(dataUrl);
					};
					const capture = () => {
						try {
							const vw = v.videoWidth || 1280;
							const vh = v.videoHeight || 720;
							const w = Math.min(vw, 1280);
							const scale = w / vw;
							const h = Math.max(1, Math.round(vh * scale));
							const c = document.createElement("canvas");
							c.width = w;
							c.height = h;
							const ctx = c.getContext("2d");
							if (ctx && vw > 0 && vh > 0) {
								ctx.drawImage(v, 0, 0, w, h);
								finish(c.toDataURL("image/jpeg", .85));
								return;
							}
						} catch {}
						finish("");
					};
					v.onloadedmetadata = () => {
						try {
							v.currentTime = Math.min(1, (v.duration || 10) * .05 || .5);
						} catch {
							capture();
						}
					};
					v.onseeked = () => {
						capture();
					};
					v.onloadeddata = () => {
						setTimeout(() => {
							if (!resolved) capture();
						}, 200);
					};
					v.onerror = () => {
						finish("");
					};
					v.load();
					setTimeout(() => {
						capture();
					}, 3e3);
				} catch {
					resolve("");
				}
			});
		}
		async function processWallpaperFile(file) {
			if (file.type.startsWith("video/") || file.name.match(/\.(mp4|webm|mov|mkv|avi|m4v)$/i) !== null) return {
				type: "video",
				blob: file,
				url: URL.createObjectURL(file),
				poster: await extractVideoPoster(file)
			};
			try {
				const raw = await new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = () => {
						resolve(String(reader.result));
					};
					reader.onerror = () => {
						reject(reader.error);
					};
					reader.readAsDataURL(file);
				});
				const image = await new Promise((resolve, reject) => {
					const im = new Image();
					im.onload = () => {
						resolve(im);
					};
					im.onerror = () => {
						reject(/* @__PURE__ */ new Error("image load failed"));
					};
					im.src = raw;
				});
				const scale = Math.min(1, 2560 / Math.max(image.width, image.height));
				if (scale >= 1) return {
					type: "image",
					blob: file,
					url: URL.createObjectURL(file),
					poster: raw
				};
				const w = Math.max(1, Math.round(image.width * scale));
				const h = Math.max(1, Math.round(image.height * scale));
				const canvas = document.createElement("canvas");
				canvas.width = w;
				canvas.height = h;
				const ctx = canvas.getContext("2d");
				if (ctx) {
					ctx.drawImage(image, 0, 0, w, h);
					const blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", .9));
					if (blob) return {
						type: "image",
						blob,
						url: URL.createObjectURL(blob),
						poster: raw
					};
				}
				return {
					type: "image",
					blob: file,
					url: URL.createObjectURL(file),
					poster: raw
				};
			} catch {
				return {
					type: "image",
					blob: file,
					url: URL.createObjectURL(file)
				};
			}
		}
		//#endregion
		//#region src/client/settings-store.ts
		const LIQUID_GLASS_DEFAULTS = {
			enabled: true,
			l1Blur: 2,
			l1Opacity: 0.1,
			l1Border: 0.14,
			modalBlur: 5,
			l3MaskOpacity: 0,
			ior: 1.3,
			bulge: 0.4,
			dispersion: 0,
			bevel: 0.01,
			lensBlur: 0,
			darkening: 0.1,
			rimIntensity: 0,
			lightAngle: 105,
			vibrancy: 1.2,
			rippleAmp: 0.5,
			dropShadowOpacity: 0.05,
			dropShadowBlur: 48,
			dropShadowY: 16,
			background: "gradient",
			wallpaper: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23030712'/><stop offset='40%' stop-color='%2306283d'/><stop offset='70%' stop-color='%23005b60'/><stop offset='100%' stop-color='%2300dfa2'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
			bgBlur: 0,
			bgLiquidEnabled: true,
			bgLiquidAmp: 0.55,
			bgLiquidScale: 0.4,
			bgLiquidSpeed: 0.1,
			bgLiquidDispersion: 0.025
		};
		function createLiquidGlassRowStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					...LIQUID_GLASS_DEFAULTS,
					revision: -1
				}),
				actions: { sync: (d, next, revision) => {
					if (revision <= d.revision) return;
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
				} }
			});
		}
		//#endregion
		//#region src/client/builtin-wallpapers.ts
		var BUILTIN_WALLPAPERS = [
	{
		id: "builtin-1",
		name: "极光之夜",
		type: "image",
		url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJhdXJvcmEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDIwODEzIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMzUlIiBzdG9wLWNvbG9yPSIjMDUyYzM4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iNzAlIiBzdG9wLWNvbG9yPSIjMDA2YjViIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwZTVhMyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhdXJvcmEpIi8+Cjwvc3ZnPg==",
		isBuiltin: true
	},
	{
		id: "builtin-2",
		name: "深海发光",
		type: "image",
		url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiPgogIDxkZWZzPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJkZWVwc2VhIiBjeD0iNTAlIiBjeT0iNDAlIiByPSI2NSUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMTQ1Mzc0Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iNDUlIiBzdG9wLWNvbG9yPSIjMDAzMzRlIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iODUlIiBzdG9wLWNvbG9yPSIjMDUxOTIzIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMDgxNCIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkZWVwc2VhKSIvPgo8L3N2Zz4=",
		isBuiltin: true
	},
	{
		id: "builtin-3",
		name: "赛博霓虹",
		type: "image",
		url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJjeWJlciIgeDE9IjAlIiB5MT0iMTAwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwYjAwMWEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI0MCUiIHN0b3AtY29sb3I9IiMyZDAwNGQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI3NSUiIHN0b3AtY29sb3I9IiM2YTAwODAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDBmMGZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2N5YmVyKSIvPgo8L3N2Zz4=",
		isBuiltin: true
	},
	{
		id: "builtin-4",
		name: "山川破晓",
		type: "image",
		url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXduIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFhMDAyYyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjQ1JSIgc3RvcC1jb2xvcj0iIzRlMDA0YSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjgwJSIgc3RvcC1jb2xvcj0iIzlhMDA0ZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZjZiNmIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZGF3bikiLz4KPC9zdmc+",
		isBuiltin: true
	},
	{
		id: "builtin-5",
		name: "极简星云",
		type: "image",
		url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJuZWJ1bGEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMDgwZDFhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNDAlIiBzdG9wLWNvbG9yPSIjMTQyMTNkIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNzUlIiBzdG9wLWNvbG9yPSIjMjgzZTY4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzRhNjk5OSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNuZWJ1bGEpIi8+Cjwvc3ZnPg==",
		isBuiltin: true
	},
	{
		id: "builtin-6",
		name: "暗夜深邃",
		type: "image",
		url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTIwIiBoZWlnaHQ9IjEwODAiPgogIDxkZWZzPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJuaWdodCIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNzAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFlMjkzYiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzBmMTcyYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjgwJSIgc3RvcC1jb2xvcj0iIzA1MDgxMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMjA0MDgiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbmlnaHQpIi8+Cjwvc3ZnPg==",
		isBuiltin: true
	}
];
		//#endregion
		//#region src/client/wallpaper-storage.ts
		/**
		* High-Performance IndexedDB + LocalStorage Wallpaper Persistence.
		* Integrates Built-in Default Packaged Wallpapers + User Custom Uploads.
		*/
		const DB_NAME = "dsh_liquid_glass_wallpapers";
		const DB_VERSION = 4;
		const STORE_NAME = "wallpaper_slots";
		const LOCAL_FALLBACK_KEY = "dsh.ui-liquid-glass.wallpapers";
		function openDB() {
			if (typeof window === "undefined" || !window.indexedDB) return Promise.resolve(null);
			return new Promise((resolve) => {
				try {
					const req = indexedDB.open(DB_NAME, DB_VERSION);
					req.onupgradeneeded = () => {
						const db = req.result;
						if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME);
					};
					req.onsuccess = () => {
						resolve(req.result);
					};
					req.onerror = () => {
						resolve(null);
					};
				} catch {
					resolve(null);
				}
			});
		}
		function blobToBase64(blob) {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result.split(",")[1] || "");
				};
				reader.onerror = reject;
				reader.readAsDataURL(blob);
			});
		}
		let memoryStoreCache = null;
		async function saveWallpaperStore(state) {
			memoryStoreCache = { ...state };
			const customList = Array.isArray(state.customWallpapers) ? state.customWallpapers : [];
			for (const it of customList) if (!it.isBuiltin) {
				let ext = it.type === "video" ? "mp4" : "png";
				if (it.name && it.name.includes(".")) ext = it.name.split(".").pop() || ext;
				if (it.localPath) try {
					const res = await fetch("/api/liquid-glass/copy-local-file", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							sourcePath: it.localPath,
							id: it.id,
							ext
						})
					});
					if (res.ok) {
						const json = await res.json();
						if (json.fileUrl) it.url = json.fileUrl;
					}
				} catch {}
				if (it.blob instanceof Blob) {
					try {
						const uploadUrl = `/api/liquid-glass/upload-raw?id=${encodeURIComponent(it.id)}&ext=${encodeURIComponent(ext)}`;
						const res = await fetch(uploadUrl, {
							method: "POST",
							body: it.blob
						});
						if (res.ok) {
							const json = await res.json();
							if (json.fileUrl) it.url = json.fileUrl;
						}
					} catch {}
					if (!it.url || it.url.startsWith("blob:")) try {
						const base64Data = await blobToBase64(it.blob);
						let posterBase64 = "";
						if (it.poster && it.poster.startsWith("data:image")) posterBase64 = it.poster.split(",")[1] || "";
						const res = await fetch("/api/liquid-glass/upload-wallpaper", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								id: it.id,
								ext,
								base64Data,
								posterBase64
							})
						});
						if (res.ok) {
							const json = await res.json();
							if (json.fileUrl) it.url = json.fileUrl;
							if (json.posterUrl) it.poster = json.posterUrl;
						}
					} catch {}
				}
				if (!it.url || it.url === "") it.url = `/api/liquid-glass/wallpaper-file?id=${it.id}&ext=${ext}`;
			}
			const rawItems = customList.filter((it) => !it.isBuiltin).map((it) => ({
				id: it.id,
				name: it.name,
				type: it.type,
				localPath: it.localPath || "",
				blob: it.blob ?? null,
				url: it.url,
				poster: it.poster ?? ""
			}));
			const payload = {
				customWallpapers: rawItems,
				activeBuiltinId: state.activeBuiltinId,
				activeCustomId: state.activeCustomId
			};
			try {
				localStorage.removeItem("dsh.ui-liquid-glass.active_poster");
			} catch {}
			const db = await openDB();
			if (db) await new Promise((resolve) => {
				try {
					const tx = db.transaction(STORE_NAME, "readwrite");
					tx.objectStore(STORE_NAME).put(payload, "current_state_v4");
					tx.oncomplete = () => {
						resolve();
					};
					tx.onerror = () => {
						resolve();
					};
				} catch {
					resolve();
				}
			});
			try {
				localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(payload));
			} catch {}
			try {
				await fetch("/api/liquid-glass/wallpapers", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						activeBuiltinId: state.activeBuiltinId,
						activeCustomId: state.activeCustomId,
						customWallpapers: rawItems.map((it) => ({
							id: it.id,
							name: it.name,
							type: it.type,
							url: it.url,
							poster: it.poster
						}))
					})
				}).catch(() => {});
			} catch {}
		}
		async function loadWallpaperStore() {
			if (memoryStoreCache) return { ...memoryStoreCache };
			let customWallpapers = [];
			let activeBuiltinId = "builtin-1";
			let activeCustomId = "";
			const db = await openDB();
			if (db) {
				const data = await new Promise((resolve) => {
					try {
						const req = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).get("current_state_v4");
						req.onsuccess = () => {
							resolve(req.result ?? null);
						};
						req.onerror = () => {
							resolve(null);
						};
					} catch {
						resolve(null);
					}
				});
				if (data) {
					if (data.activeBuiltinId && BUILTIN_WALLPAPERS.some((w) => w.id === data.activeBuiltinId)) activeBuiltinId = data.activeBuiltinId;
					if (typeof data.activeCustomId === "string") activeCustomId = data.activeCustomId;
					if (Array.isArray(data.customWallpapers)) customWallpapers = data.customWallpapers.filter((it) => !it.id?.startsWith("builtin-")).map((it) => {
						let url = it.url || `/api/liquid-glass/wallpaper-file?id=${it.id}`;
						if (it.blob instanceof Blob) try {
							url = URL.createObjectURL(it.blob);
						} catch {}
						return {
							id: it.id,
							name: it.name,
							type: it.type,
							blob: it.blob instanceof Blob ? it.blob : void 0,
							url,
							poster: typeof it.poster === "string" ? it.poster : void 0,
							isBuiltin: false
						};
					});
				}
			}
			try {
				const res = await fetch("/api/liquid-glass/wallpapers");
				if (res.ok) {
					const disk = await res.json();
					if (disk && typeof disk === "object") {
						if (disk.activeBuiltinId && BUILTIN_WALLPAPERS.some((w) => w.id === disk.activeBuiltinId)) activeBuiltinId = disk.activeBuiltinId;
						if (typeof disk.activeCustomId === "string" && disk.activeCustomId) activeCustomId = disk.activeCustomId;
						if (Array.isArray(disk.customWallpapers) && disk.customWallpapers.length > 0) {
							const diskItems = disk.customWallpapers.map((it) => {
								const existing = customWallpapers.find((c) => c.id === it.id);
								return {
									id: it.id,
									name: it.name || "Custom Wallpaper",
									type: it.type || "image",
									blob: existing?.blob,
									url: existing?.url || it.url || `/api/liquid-glass/wallpaper-file?id=${it.id}`,
									poster: it.poster || existing?.poster,
									isBuiltin: false
								};
							});
							if (customWallpapers.length === 0) customWallpapers = diskItems;
							else for (const d of diskItems) if (!customWallpapers.some((c) => c.id === d.id)) customWallpapers.push(d);
						}
					}
				}
			} catch {}
			const result = {
				customWallpapers: Array.isArray(customWallpapers) ? customWallpapers : [],
				activeBuiltinId,
				activeCustomId
			};
			memoryStoreCache = result;
			return result;
		}
		//#endregion
		//#region src/client/LiquidGlassAppearanceRow.tsx
		const USER_PRESET_KEY = "dsh.ui-liquid-glass.user-preset";
		function LiquidGlassAppearanceRow(props) {
			const { t, applyPreset, setL1Blur, setL1Opacity, setL1Border, setModalBlur, setL3MaskOpacity, setIor, setBulge, setDispersion, setBevel, setLensBlur, setDarkening, setRimIntensity, setLightAngle, setVibrancy, setRippleAmp, setDropShadowOpacity, setDropShadowBlur, setDropShadowY, setBackground, setWallpaper, setBgBlur, setBgLiquidEnabled, setBgLiquidAmp, setBgLiquidScale, setBgLiquidSpeed, setBgLiquidDispersion, useStore } = props;
			useStore((s) => s.enabled);
			const l1Blur = useStore((s) => s.l1Blur);
			const l1Opacity = useStore((s) => s.l1Opacity);
			const l1Border = useStore((s) => s.l1Border);
			const modalBlur = useStore((s) => typeof s.modalBlur === "number" && !isNaN(s.modalBlur) ? s.modalBlur : 24);
			const l3MaskOpacity = useStore((s) => typeof s.l3MaskOpacity === "number" && !isNaN(s.l3MaskOpacity) ? s.l3MaskOpacity : .45);
			const ior = useStore((s) => s.ior);
			const bulge = useStore((s) => s.bulge);
			const dispersion = useStore((s) => s.dispersion);
			const bevel = useStore((s) => s.bevel);
			const lensBlur = useStore((s) => s.lensBlur);
			const darkening = useStore((s) => s.darkening);
			const rimIntensity = useStore((s) => s.rimIntensity);
			const lightAngle = useStore((s) => s.lightAngle);
			const vibrancy = useStore((s) => s.vibrancy);
			const rippleAmp = useStore((s) => s.rippleAmp);
			const dropShadowOpacity = useStore((s) => s.dropShadowOpacity);
			const dropShadowBlur = useStore((s) => s.dropShadowBlur);
			const dropShadowY = useStore((s) => s.dropShadowY);
			const background = useStore((s) => s.background);
			const wallpaper = useStore((s) => s.wallpaper);
			const bgBlur = useStore((s) => s.bgBlur);
			const bgLiquidEnabled = useStore((s) => s.bgLiquidEnabled);
			const bgLiquidAmp = useStore((s) => s.bgLiquidAmp);
			const bgLiquidScale = useStore((s) => s.bgLiquidScale);
			const bgLiquidSpeed = useStore((s) => s.bgLiquidSpeed);
			const bgLiquidDispersion = useStore((s) => s.bgLiquidDispersion);
			const [expanded, setExpanded] = (0, react.useState)(false);
			const [notice, setNotice] = (0, react.useState)("");
			const fileRef = (0, react.useRef)(null);
			const [customWallpapers, setCustomWallpapers] = (0, react.useState)([]);
			const [activeBuiltinId, setActiveBuiltinId] = (0, react.useState)(BUILTIN_WALLPAPERS[0]?.id || "builtin-1");
			const [activeCustomId, setActiveCustomId] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				loadWallpaperStore().then(({ customWallpapers: custom, activeBuiltinId: builtinId, activeCustomId: custId }) => {
					setCustomWallpapers(custom);
					setActiveBuiltinId(builtinId);
					setActiveCustomId(custId);
					if (!wallpaper) if (background === "gradient") {
						const cur = BUILTIN_WALLPAPERS.find((it) => it.id === builtinId) || BUILTIN_WALLPAPERS[0];
						if (cur) setWallpaper(cur.type === "video" ? `video:${cur.url}` : cur.url);
					} else {
						const cur = custom.find((it) => it.id === custId) || custom[0];
						if (cur) setWallpaper(cur.type === "video" ? `video:${cur.url}` : cur.url);
					}
				});
			}, []);
			const showNotice = (msg) => {
				setNotice(msg);
				setTimeout(() => {
					setNotice("");
				}, 2500);
			};
			const handleSaveUserPreset = async () => {
				try {
					const current = {
						l1Blur,
						l1Opacity,
						l1Border,
						modalBlur,
						l3MaskOpacity,
						ior,
						bulge,
						dispersion,
						bevel,
						lensBlur,
						darkening,
						rimIntensity,
						lightAngle,
						vibrancy,
						rippleAmp,
						dropShadowOpacity,
						dropShadowBlur,
						dropShadowY,
						bgBlur,
						bgLiquidEnabled,
						bgLiquidAmp,
						bgLiquidScale,
						bgLiquidSpeed,
						bgLiquidDispersion
					};
					try {
						localStorage.setItem(USER_PRESET_KEY, JSON.stringify(current));
					} catch {}
					await fetch("/api/liquid-glass/user-preset", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(current)
					}).catch(() => {});
					showNotice(t("liquidGlass.savedNotice") || "预设已保存");
				} catch {
					showNotice("保存失败");
				}
			};
			const handleLoadUserPreset = async () => {
				try {
					let parsed = null;
					try {
						const res = await fetch("/api/liquid-glass/user-preset");
						if (res.ok) {
							const diskPreset = await res.json();
							if (diskPreset && typeof diskPreset === "object" && Object.keys(diskPreset).length > 0) {
								parsed = diskPreset;
							}
						}
					} catch {}
					if (!parsed) {
						const raw = localStorage.getItem(USER_PRESET_KEY);
						if (raw) parsed = JSON.parse(raw);
					}
					if (parsed) {
						delete parsed.background;
						delete parsed.wallpaper;
						delete parsed.wallpapers;
						applyPreset(parsed);
						showNotice(t("liquidGlass.loadedNotice") || "预设已加载");
					} else {
						showNotice(t("liquidGlass.noUserPreset") || "未找到已保存预设");
					}
				} catch {
					showNotice(t("liquidGlass.noUserPreset") || "未找到已保存预设");
				}
			};
			const handleRestoreDefault = () => {
				const { background: _bg, wallpaper: _wp, ...cleanDefaults } = LIQUID_GLASS_DEFAULTS;
				applyPreset(cleanDefaults);
				showNotice(t("liquidGlass.restoredNotice"));
			};
			const handleAddCustomWallpaper = async (file) => {
				try {
					const localPath = file.path || "";
					const { type, blob, url, poster } = await processWallpaperFile(file);
					const newItem = {
						id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
						name: file.name,
						type,
						localPath,
						blob,
						url,
						poster,
						isBuiltin: false
					};
					const next = [...customWallpapers, newItem];
					setCustomWallpapers(next);
					setActiveCustomId(newItem.id);
					setWallpaper(type === "video" ? `video:${url}|${poster || ""}` : url);
					setBackground("wallpaper");
					await saveWallpaperStore({
						customWallpapers: next,
						activeBuiltinId,
						activeCustomId: newItem.id
					});
					showNotice(type === "video" ? "视频壁纸已添加并生效" : "图片壁纸已添加并生效");
				} catch {
					showNotice("添加壁纸失败");
				}
			};
			const handleDeleteCustomWallpaper = async (id) => {
				const target = customWallpapers.find((w) => w.id === id);
				if (target?.url.startsWith("blob:")) try {
					URL.revokeObjectURL(target.url);
				} catch {}
				const next = customWallpapers.filter((w) => w.id !== id);
				setCustomWallpapers(next);
				if (activeCustomId === id) if (next.length > 0) {
					setActiveCustomId(next[0].id);
					setWallpaper(next[0].type === "video" ? `video:${next[0].url}|${next[0].poster || ""}` : next[0].url);
					await saveWallpaperStore({
						customWallpapers: next,
						activeBuiltinId,
						activeCustomId: next[0].id
					});
				} else {
					setActiveCustomId("");
					const cur = BUILTIN_WALLPAPERS.find((it) => it.id === activeBuiltinId) || BUILTIN_WALLPAPERS[0];
					if (cur) setWallpaper(cur.type === "video" ? `video:${cur.url}` : cur.url);
					setBackground("gradient");
					await saveWallpaperStore({
						customWallpapers: [],
						activeBuiltinId,
						activeCustomId: ""
					});
				}
				else await saveWallpaperStore({
					customWallpapers: next,
					activeBuiltinId,
					activeCustomId
				});
				showNotice("壁纸已删除");
			};
			const trackRef = (0, react.useRef)(null);
			const dragInfo = (0, react.useRef)({
				isDown: false,
				startX: 0,
				scrollLeft: 0,
				isDragging: false,
				hasMoved: false,
				pointerId: -1,
				velocity: 0,
				lastX: 0,
				lastTime: 0,
				rafId: 0
			});
			const handleWheel = (e) => {
				if (e.deltaY !== 0 && trackRef.current) trackRef.current.scrollLeft += e.deltaY * .9;
			};
			const handlePointerDown = (e) => {
				if (e.button !== 0) return;
				if (e.target?.closest("button, [data-no-drag], input")) return;
				const track = trackRef.current;
				if (!track) return;
				cancelAnimationFrame(dragInfo.current.rafId);
				dragInfo.current.isDown = true;
				dragInfo.current.startX = e.clientX;
				dragInfo.current.scrollLeft = track.scrollLeft;
				dragInfo.current.isDragging = false;
				dragInfo.current.hasMoved = false;
				dragInfo.current.pointerId = e.pointerId;
				dragInfo.current.lastX = e.clientX;
				dragInfo.current.lastTime = performance.now();
				dragInfo.current.velocity = 0;
			};
			const handlePointerMove = (e) => {
				if (!dragInfo.current.isDown) return;
				const track = trackRef.current;
				if (!track) return;
				const deltaX = e.clientX - dragInfo.current.startX;
				if (!dragInfo.current.isDragging && Math.abs(deltaX) > 8) {
					dragInfo.current.isDragging = true;
					dragInfo.current.hasMoved = true;
					try {
						track.setPointerCapture(dragInfo.current.pointerId);
					} catch {}
				}
				if (dragInfo.current.isDragging) {
					const now = performance.now();
					const dt = now - dragInfo.current.lastTime;
					if (dt > 0) {
						dragInfo.current.velocity = (e.clientX - dragInfo.current.lastX) / dt;
						dragInfo.current.lastX = e.clientX;
						dragInfo.current.lastTime = now;
					}
					track.scrollLeft = dragInfo.current.scrollLeft - deltaX;
				}
			};
			const handlePointerUp = (e) => {
				if (!dragInfo.current.isDown) return;
				const wasDragging = dragInfo.current.isDragging;
				dragInfo.current.isDown = false;
				dragInfo.current.isDragging = false;
				const track = trackRef.current;
				if (track && wasDragging) {
					try {
						track.releasePointerCapture(e.pointerId);
					} catch {}
					let v = dragInfo.current.velocity * 14;
					if (Math.abs(v) > 1.2) {
						const stepInertia = () => {
							if (!trackRef.current || Math.abs(v) < .2) return;
							trackRef.current.scrollLeft -= v;
							v *= .92;
							dragInfo.current.rafId = requestAnimationFrame(stepInertia);
						};
						dragInfo.current.rafId = requestAnimationFrame(stepInertia);
					}
					setTimeout(() => {
						dragInfo.current.hasMoved = false;
					}, 100);
				} else dragInfo.current.hasMoved = false;
			};
			const handlePointerCancel = (e) => {
				dragInfo.current.isDown = false;
				dragInfo.current.isDragging = false;
				dragInfo.current.hasMoved = false;
				const track = trackRef.current;
				if (track) try {
					track.releasePointerCapture(e.pointerId);
				} catch {}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: LiquidGlassAppearanceRow_module_css_default.group,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.cardAccordion,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: LiquidGlassAppearanceRow_module_css_default.accordionHeader,
							role: "button",
							tabIndex: 0,
							onClick: () => {
								setExpanded(!expanded);
							},
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") setExpanded(!expanded);
							},
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: LiquidGlassAppearanceRow_module_css_default.accordionTitle,
								children: t("liquidGlass.presetSection")
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: `${LiquidGlassAppearanceRow_module_css_default.chevron} ${expanded ? LiquidGlassAppearanceRow_module_css_default.chevronExpanded : ""}`,
								children: "▼"
							})]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: `${LiquidGlassAppearanceRow_module_css_default.accordionCollapse} ${expanded ? LiquidGlassAppearanceRow_module_css_default.accordionCollapseExpanded : ""}`,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: LiquidGlassAppearanceRow_module_css_default.accordionInner,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: `${LiquidGlassAppearanceRow_module_css_default.accordionBody} ${expanded ? LiquidGlassAppearanceRow_module_css_default.accordionBodyExpanded : ""}`,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: LiquidGlassAppearanceRow_module_css_default.presetActions,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: LiquidGlassAppearanceRow_module_css_default.actionBtn,
												onClick: handleSaveUserPreset,
												children: t("liquidGlass.saveUserPreset")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: LiquidGlassAppearanceRow_module_css_default.actionBtn,
												onClick: handleLoadUserPreset,
												children: t("liquidGlass.loadUserPreset")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: LiquidGlassAppearanceRow_module_css_default.actionBtn,
												onClick: handleRestoreDefault,
												children: t("liquidGlass.restoreDefault")
											})
										]
									}), notice && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: LiquidGlassAppearanceRow_module_css_default.notice,
										children: notice
									})]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.rowSectionHeader,
						children: t("liquidGlass.l1Section")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.controls,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.l1Blur"),
								value: l1Blur,
								min: 0,
								max: 60,
								step: 1,
								unit: "px",
								onChange: setL1Blur
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.l1Opacity"),
								value: l1Opacity,
								min: 0,
								max: .9,
								step: .05,
								unit: "",
								onChange: setL1Opacity
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.l1Border"),
								value: l1Border,
								min: 0,
								max: 1,
								step: .02,
								unit: "",
								onChange: setL1Border
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.rowSectionHeader,
						children: t("liquidGlass.l2Section")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.controls,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.ior"),
								value: ior,
								min: .8,
								max: 2.4,
								step: .02,
								unit: "",
								onChange: setIor
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.bulge"),
								value: bulge,
								min: -1.5,
								max: 2.5,
								step: .05,
								unit: "",
								onChange: setBulge
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.dispersion"),
								value: dispersion,
								min: 0,
								max: .1,
								step: .005,
								unit: "",
								onChange: setDispersion
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.bevel"),
								value: bevel,
								min: .005,
								max: .1,
								step: .005,
								unit: "",
								onChange: setBevel
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.lensBlur"),
								value: lensBlur,
								min: 0,
								max: 40,
								step: 1,
								unit: "px",
								onChange: setLensBlur
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.darkening"),
								value: darkening,
								min: 0,
								max: .8,
								step: .05,
								unit: "",
								onChange: setDarkening
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.rimIntensity"),
								value: rimIntensity,
								min: 0,
								max: 1,
								step: .05,
								unit: "",
								onChange: setRimIntensity
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.lightAngle"),
								value: lightAngle,
								min: 0,
								max: 360,
								step: 5,
								unit: "°",
								onChange: setLightAngle
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.vibrancy"),
								value: vibrancy,
								min: .5,
								max: 2,
								step: .05,
								unit: "x",
								onChange: setVibrancy
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.rippleAmp"),
								value: rippleAmp,
								min: 0,
								max: 1,
								step: .05,
								unit: "",
								onChange: setRippleAmp
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.dropShadowOpacity"),
								value: dropShadowOpacity,
								min: 0,
								max: 1,
								step: .05,
								unit: "",
								onChange: setDropShadowOpacity
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.dropShadowBlur"),
								value: dropShadowBlur,
								min: 0,
								max: 120,
								step: 2,
								unit: "px",
								onChange: setDropShadowBlur
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.dropShadowY"),
								value: dropShadowY,
								min: 0,
								max: 60,
								step: 2,
								unit: "px",
								onChange: setDropShadowY
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.rowSectionHeader,
						children: t("liquidGlass.l3Section")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.controls,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
							label: t("liquidGlass.modalBlur"),
							value: modalBlur,
							min: 0,
							max: 60,
							step: 1,
							unit: "px",
							onChange: setModalBlur
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
							label: t("liquidGlass.l3MaskOpacity"),
							value: l3MaskOpacity,
							min: 0,
							max: .9,
							step: .05,
							unit: "",
							onChange: setL3MaskOpacity
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.rowSectionHeader,
						children: t("liquidGlass.bgSection")
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: LiquidGlassAppearanceRow_module_css_default.controls,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: LiquidGlassAppearanceRow_module_css_default.row,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: LiquidGlassAppearanceRow_module_css_default.rowLabel,
									children: t("liquidGlass.background")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
									label: t("liquidGlass.background"),
									value: background,
									options: [{
										id: "gradient",
										label: t("liquidGlass.backgroundGradient")
									}, {
										id: "wallpaper",
										label: t("liquidGlass.backgroundWallpaper")
									}],
									onSelect: (val) => {
										setBackground(val);
										if (val === "gradient") {
											const cur = BUILTIN_WALLPAPERS.find((it) => it.id === activeBuiltinId) || BUILTIN_WALLPAPERS[0];
											if (cur) setWallpaper(cur.type === "video" ? `video:${cur.url}` : cur.url);
										} else {
											const cur = customWallpapers.find((it) => it.id === activeCustomId) || customWallpapers[0];
											if (cur) setWallpaper(cur.type === "video" ? `video:${cur.url}` : cur.url);
										}
									}
								})]
							}),
							background === "gradient" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: LiquidGlassAppearanceRow_module_css_default.galleryContainer,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: LiquidGlassAppearanceRow_module_css_default.galleryHeader,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: LiquidGlassAppearanceRow_module_css_default.galleryTitle,
										children: t("liquidGlass.builtinGallery")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
										className: LiquidGlassAppearanceRow_module_css_default.galleryBadge,
										children: [BUILTIN_WALLPAPERS.length, " 张推荐"]
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									ref: trackRef,
									className: LiquidGlassAppearanceRow_module_css_default.galleryTrack,
									onWheel: handleWheel,
									onPointerDown: handlePointerDown,
									onPointerMove: handlePointerMove,
									onPointerUp: handlePointerUp,
									onPointerCancel: handlePointerCancel,
									children: BUILTIN_WALLPAPERS.map((wp, idx) => {
										const isActive = wp.id === activeBuiltinId;
										return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: `${LiquidGlassAppearanceRow_module_css_default.slotCard} ${isActive ? LiquidGlassAppearanceRow_module_css_default.slotCardActive : ""}`,
											onClick: () => {
												if (!dragInfo.current.hasMoved) {
													setActiveBuiltinId(wp.id);
													setWallpaper(wp.type === 'video' ? `video:${wp.url}` : wp.url);
													saveWallpaperStore({
														customWallpapers,
														activeBuiltinId: wp.id,
														activeCustomId
													});
												}
											},
											title: wp.name,
											children: [
												wp.type === "video" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("video", {
													src: wp.url.replace(/^(video:)+/, ""),
													autoPlay: true,
													loop: true,
													muted: true,
													playsInline: true,
													className: LiquidGlassAppearanceRow_module_css_default.slotThumb
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
													src: wp.url,
													alt: wp.name,
													className: LiquidGlassAppearanceRow_module_css_default.slotThumb
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: LiquidGlassAppearanceRow_module_css_default.slotOverlay,
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: LiquidGlassAppearanceRow_module_css_default.slotTypeBadge,
														children: wp.type === "video" ? "视频" : "内置"
													})
												}),
												isActive && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: LiquidGlassAppearanceRow_module_css_default.slotActiveBadge,
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "✓" })
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: LiquidGlassAppearanceRow_module_css_default.slotFooter,
													children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: LiquidGlassAppearanceRow_module_css_default.slotName,
														children: wp.name || `推荐 ${idx + 1}`
													})
												})
											]
										}, wp.id);
									})
								})]
							}),
							background === "wallpaper" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: LiquidGlassAppearanceRow_module_css_default.galleryContainer,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: LiquidGlassAppearanceRow_module_css_default.galleryHeader,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: LiquidGlassAppearanceRow_module_css_default.galleryTitle,
											children: t("liquidGlass.wallpaperGallery")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
											className: LiquidGlassAppearanceRow_module_css_default.galleryBadge,
											children: [customWallpapers.length, " 张已存"]
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										ref: trackRef,
										className: LiquidGlassAppearanceRow_module_css_default.galleryTrack,
										onWheel: handleWheel,
										onPointerDown: handlePointerDown,
										onPointerMove: handlePointerMove,
										onPointerUp: handlePointerUp,
										onPointerCancel: handlePointerCancel,
										children: [customWallpapers.map((wp, idx) => {
											const isActive = wp.id === activeCustomId;
											return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: `${LiquidGlassAppearanceRow_module_css_default.slotCard} ${isActive ? LiquidGlassAppearanceRow_module_css_default.slotCardActive : ""}`,
												onClick: () => {
													if (!dragInfo.current.hasMoved) {
														setActiveCustomId(wp.id);
														setWallpaper(wp.type === "video" ? `video:${wp.url}|${wp.poster || ""}` : wp.url);
														saveWallpaperStore({
															customWallpapers,
															activeBuiltinId,
															activeCustomId: wp.id
														});
													}
												},
												title: wp.name,
												children: [
													wp.poster ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
														src: wp.poster,
														alt: wp.name,
														className: LiquidGlassAppearanceRow_module_css_default.slotThumb
													}) : wp.type === "video" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("video", {
														src: wp.url,
														autoPlay: true,
														loop: true,
														muted: true,
														playsInline: true,
														className: LiquidGlassAppearanceRow_module_css_default.slotThumb
													}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
														src: wp.url,
														alt: wp.name,
														className: LiquidGlassAppearanceRow_module_css_default.slotThumb
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
														className: LiquidGlassAppearanceRow_module_css_default.slotOverlay,
														children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: LiquidGlassAppearanceRow_module_css_default.slotTypeBadge,
															children: wp.type === "video" ? t("liquidGlass.videoBadge") : t("liquidGlass.imageBadge")
														}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: LiquidGlassAppearanceRow_module_css_default.slotDeleteBtn,
															"data-no-drag": "true",
															title: t("liquidGlass.deleteWallpaper"),
															onPointerDown: (e) => {
																e.stopPropagation();
															},
															onClick: (e) => {
																e.stopPropagation();
																handleDeleteCustomWallpaper(wp.id);
															},
															children: "✕"
														})]
													}),
													isActive && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: LiquidGlassAppearanceRow_module_css_default.slotActiveBadge,
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "✓" })
													}),
													/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
														className: LiquidGlassAppearanceRow_module_css_default.slotFooter,
														children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
															className: LiquidGlassAppearanceRow_module_css_default.slotName,
															children: wp.name || `自定义 ${idx + 1}`
														})
													})
												]
											}, wp.id);
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											type: "button",
											className: LiquidGlassAppearanceRow_module_css_default.slotAddCard,
											"data-no-drag": "true",
											onPointerDown: (e) => {
												e.stopPropagation();
											},
											onClick: (e) => {
												e.stopPropagation();
												fileRef.current?.click();
											},
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: LiquidGlassAppearanceRow_module_css_default.addIcon,
													children: "+"
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: LiquidGlassAppearanceRow_module_css_default.addLabel,
													children: t("liquidGlass.addWallpaper")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: LiquidGlassAppearanceRow_module_css_default.addHint,
													children: "图片 / 视频"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*,video/*",
										style: { display: "none" },
										onChange: async (e) => {
											const file = e.target.files?.[0];
											if (file) {
												await handleAddCustomWallpaper(file);
												e.target.value = "";
											}
										}
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
								label: t("liquidGlass.bgBlur"),
								value: bgBlur,
								min: 0,
								max: 60,
								step: 1,
								unit: "px",
								onChange: setBgBlur
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: LiquidGlassAppearanceRow_module_css_default.row,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: LiquidGlassAppearanceRow_module_css_default.rowLabel,
									children: t("liquidGlass.bgLiquidEnable")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Segmented, {
									label: t("liquidGlass.bgLiquidEnable"),
									value: bgLiquidEnabled ? "on" : "off",
									options: [{
										id: "off",
										label: t("liquidGlass.disable")
									}, {
										id: "on",
										label: t("liquidGlass.enable")
									}],
									onSelect: (val) => {
										setBgLiquidEnabled(val === "on");
									}
								})]
							}),
							bgLiquidEnabled && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
									label: t("liquidGlass.bgLiquidAmp"),
									value: bgLiquidAmp,
									min: 0,
									max: 2,
									step: .05,
									unit: "",
									onChange: setBgLiquidAmp
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
									label: t("liquidGlass.bgLiquidScale"),
									value: bgLiquidScale,
									min: .2,
									max: 2.5,
									step: .05,
									unit: "x",
									onChange: setBgLiquidScale
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
									label: t("liquidGlass.bgLiquidSpeed"),
									value: bgLiquidSpeed,
									min: .1,
									max: 3,
									step: .1,
									unit: "x",
									onChange: setBgLiquidSpeed
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Knob, {
									label: t("liquidGlass.bgLiquidDispersion"),
									value: bgLiquidDispersion,
									min: 0,
									max: .08,
									step: .005,
									unit: "",
									onChange: setBgLiquidDispersion
								})
							] })
						]
					})
				]
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.liquid-glass` namespace dictionaries. */
		const NS = "settings.liquid-glass";
		const zh = {
			"liquidGlass.title": "分级液态玻璃与动态壁纸",
			"liquidGlass.description": "基于物理光学的分级液态玻璃与动态壁纸系统，支持多层透镜折射、全局模态虚化及视频/流体壁纸。",
			"liquidGlass.enable": "开启",
			"liquidGlass.disable": "关闭",
			"liquidGlass.presetSection": "预设管理",
			"liquidGlass.saveUserPreset": "保存预设",
			"liquidGlass.loadUserPreset": "加载预设",
			"liquidGlass.restoreDefault": "恢复默认",
			"liquidGlass.savedNotice": "预设已保存",
			"liquidGlass.loadedNotice": "预设已加载",
			"liquidGlass.noUserPreset": "暂无保存的预设",
			"liquidGlass.restoredNotice": "已恢复默认参数",
			"liquidGlass.l1Section": "一层基底玻璃 (侧边栏/面板)",
			"liquidGlass.l1Blur": "基底模糊",
			"liquidGlass.l1Opacity": "基底暗化",
			"liquidGlass.l1Border": "边缘光泽",
			"liquidGlass.l3Section": "三层弹窗玻璃 (设置/模态弹窗)",
			"liquidGlass.modalBlur": "弹窗虚化",
			"liquidGlass.l3MaskOpacity": "遮罩暗化",
			"liquidGlass.l2Section": "二层液态透镜 (悬浮输入框/组件)",
			"liquidGlass.ior": "折射率 (IOR)",
			"liquidGlass.bulge": "透镜曲率",
			"liquidGlass.dispersion": "色散分离",
			"liquidGlass.bevel": "倒角厚度",
			"liquidGlass.lensBlur": "透镜模糊",
			"liquidGlass.darkening": "基底暗化",
			"liquidGlass.rimIntensity": "高光强度",
			"liquidGlass.lightAngle": "光源方位",
			"liquidGlass.vibrancy": "色彩鲜艳度",
			"liquidGlass.rippleAmp": "水波张力",
			"liquidGlass.dropShadowOpacity": "投影浓度",
			"liquidGlass.dropShadowBlur": "投影扩散",
			"liquidGlass.dropShadowY": "投影偏移",
			"liquidGlass.bgSection": "环境底板与流体",
			"liquidGlass.background": "底板类型",
			"liquidGlass.backgroundGradient": "默认推荐",
			"liquidGlass.backgroundWallpaper": "自定义壁纸",
			"liquidGlass.chooseWallpaper": "选择壁纸",
			"liquidGlass.builtinGallery": "推荐壁纸库 (横向滑动选择)",
			"liquidGlass.wallpaperGallery": "自定义壁纸库 (横向滑动选择)",
			"liquidGlass.addWallpaper": "+ 添加壁纸 (图片 / 视频)",
			"liquidGlass.wallpaperFull": "壁纸槽位已满",
			"liquidGlass.imageBadge": "图片",
			"liquidGlass.videoBadge": "视频",
			"liquidGlass.deleteWallpaper": "删除壁纸",
			"liquidGlass.activeWallpaper": "生效中",
			"liquidGlass.wallpaperHint": "支持上传本地图片 (PNG/JPG/WEBP) 或视频 (MP4/WEBM) 作为全局折射底图",
			"liquidGlass.bgBlur": "背景模糊",
			"liquidGlass.bgLiquidEnable": "背景流体",
			"liquidGlass.bgLiquidAmp": "流水张力",
			"liquidGlass.bgLiquidScale": "水波尺度",
			"liquidGlass.bgLiquidSpeed": "流动速度",
			"liquidGlass.bgLiquidDispersion": "背景色散"
		};
		const en = {
			"liquidGlass.title": "Tiered Liquid Glass & Live Wallpaper",
			"liquidGlass.description": "Tiered physical optics and live wallpaper system: multi-layer liquid lens refraction, global modal blur, and video/fluid wallpaper.",
			"liquidGlass.enable": "Enable",
			"liquidGlass.disable": "Disable",
			"liquidGlass.presetSection": "Presets",
			"liquidGlass.saveUserPreset": "Save Preset",
			"liquidGlass.loadUserPreset": "Load Preset",
			"liquidGlass.restoreDefault": "Restore Defaults",
			"liquidGlass.savedNotice": "Preset saved",
			"liquidGlass.loadedNotice": "Preset loaded",
			"liquidGlass.noUserPreset": "No saved preset found",
			"liquidGlass.restoredNotice": "Default optical parameters restored",
			"liquidGlass.l1Section": "Layer 1 Base Glass (Sidebar / Panels)",
			"liquidGlass.l1Blur": "Base Blur",
			"liquidGlass.l1Opacity": "Base Darkening",
			"liquidGlass.l1Border": "Border Sheen",
			"liquidGlass.l3Section": "Layer 3 Modal Glass (Settings / Dialogs)",
			"liquidGlass.modalBlur": "Modal Blur",
			"liquidGlass.l3MaskOpacity": "Mask Darkening",
			"liquidGlass.l2Section": "Layer 2 Floating Lenses (Composer / Modals)",
			"liquidGlass.ior": "Refractive Index (IOR)",
			"liquidGlass.bulge": "Lens Bulge",
			"liquidGlass.dispersion": "Chromatic Dispersion",
			"liquidGlass.bevel": "Bevel Thickness",
			"liquidGlass.lensBlur": "Lens Blur",
			"liquidGlass.darkening": "Base Darkening",
			"liquidGlass.rimIntensity": "Rim Highlight",
			"liquidGlass.lightAngle": "Light Angle",
			"liquidGlass.vibrancy": "Vibrancy",
			"liquidGlass.rippleAmp": "Ripple Tension",
			"liquidGlass.dropShadowOpacity": "Shadow Opacity",
			"liquidGlass.dropShadowBlur": "Shadow Blur",
			"liquidGlass.dropShadowY": "Shadow Offset",
			"liquidGlass.bgSection": "Backdrop & Fluid Dynamics",
			"liquidGlass.background": "Backdrop Type",
			"liquidGlass.backgroundGradient": "Recommended Default",
			"liquidGlass.backgroundWallpaper": "Custom Wallpaper",
			"liquidGlass.chooseWallpaper": "Choose Wallpaper",
			"liquidGlass.builtinGallery": "Recommended Wallpapers (Scroll to Preview)",
			"liquidGlass.wallpaperGallery": "Custom Wallpapers (Scroll to Preview)",
			"liquidGlass.addWallpaper": "+ Add Wallpaper (Image / Video)",
			"liquidGlass.wallpaperFull": "Wallpaper slots full",
			"liquidGlass.imageBadge": "Image",
			"liquidGlass.videoBadge": "Video",
			"liquidGlass.deleteWallpaper": "Delete",
			"liquidGlass.activeWallpaper": "Active",
			"liquidGlass.wallpaperHint": "Upload local image (PNG/JPG/WEBP) or video (MP4/WEBM) as the physical refractive backdrop",
			"liquidGlass.bgBlur": "Backdrop Blur",
			"liquidGlass.bgLiquidEnable": "Fluid Dynamics",
			"liquidGlass.bgLiquidAmp": "Flow Amplitude",
			"liquidGlass.bgLiquidScale": "Fluid Scale",
			"liquidGlass.bgLiquidSpeed": "Flow Speed",
			"liquidGlass.bgLiquidDispersion": "Backdrop Dispersion"
		};
		//#endregion
		//#region src/client/glass-shader.ts
		const VS_SRC = `
  attribute vec2 a_pos;
  void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;
		const FS_SRC = `
  precision mediump float;

  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  
  // Layer 1: 侧边栏、模态弹窗与气泡弹出菜单几何材质
  uniform float u_sidebar_width_px;
  uniform vec4 u_modal_rect; // xy: centerPx, zw: halfPx
  uniform float u_modal_radius;
  uniform float u_modal_progress;
  uniform int u_has_modal;
  uniform int u_has_chat;
  uniform vec4 u_chat_rect;
  uniform float u_chat_radius;
  #define MAX_POPOVERS 16
  uniform vec4 u_popovers[MAX_POPOVERS]; // xy: centerPx, zw: halfPx
  uniform float u_popover_radii[MAX_POPOVERS];
  uniform int u_popover_count;
  uniform float u_l1_blur;
  uniform float u_modal_blur;
  uniform float u_l1_opacity;
  uniform float u_l1_border;

  // Layer 2: 多透镜物理液态阵列 (所有 L2 层级元素: 0=背景透镜, 1=弹窗前台透镜)
  #define MAX_LENSES 64
  uniform vec4 u_lenses[MAX_LENSES]; // xy: centerPx, zw: halfPx
  uniform float u_lens_radii[MAX_LENSES];
  uniform float u_lens_layers[MAX_LENSES];
  uniform int u_lens_count;

  uniform float u_time;
  uniform float u_ior;
  uniform float u_bulge;
  uniform float u_dispersion;
  uniform float u_bevel_width;
  uniform float u_lens_blur;
  uniform float u_darkening;
  uniform float u_rim_intensity;
  uniform float u_light_angle;
  uniform float u_vibrancy;
  uniform float u_ripple_amp;

  uniform float u_shadow_opacity;
  uniform float u_shadow_blur;
  uniform float u_shadow_offset_y;

  // Layer 0: 背景流体
  uniform int u_bg_liquid_enabled;
  uniform float u_bg_amp;
  uniform float u_bg_scale;
  uniform float u_bg_speed;
  uniform float u_bg_dispersion;

  uniform vec4 u_ripple0;
  uniform vec4 u_ripple1;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float snoise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = step(a.yx, a.xy);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash22(i)), dot(b, hash22(i + o)), dot(c, hash22(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  // 大尺度低频稀疏流水域翘曲
  vec2 waterStreamTurbulence(vec2 uv, float t) {
    if (u_bg_amp <= 0.0001) return vec2(0.0);
    vec2 p = uv * max(u_bg_scale, 0.1) * 1.6;
    vec2 q = vec2(
      snoise(p * 0.85 + vec2(t * 0.35, t * 0.20)),
      snoise(p * 0.85 + vec2(-t * 0.25, t * 0.30))
    );
    vec2 r = vec2(
      snoise((p + q * 0.85) * 1.5 + vec2(t * 0.45, -t * 0.40)),
      snoise((p + q * 0.85) * 1.5 + vec2(-t * 0.35, t * 0.50))
    );
    vec2 s = vec2(
      snoise((p + r * 0.60) * 2.6 + vec2(-t * 0.65, t * 0.70)),
      snoise((p + r * 0.60) * 2.6 + vec2(t * 0.70, -t * 0.60))
    );
    return (q * 0.55 + r * 0.35 + s * 0.10) * 0.055 * u_bg_amp;
  }

  // 16-Tap 真实高斯雾面毛玻璃模糊函数 (Gaussian Frosted Matte Blur)
  vec3 sampleGaussianFrosted(vec2 baseUv, float blurPx, vec2 fragCoord) {
    if (blurPx <= 0.2) {
      return texture2D(u_texture, vec2(baseUv.x, 1.0 - baseUv.y)).rgb;
    }
    vec2 step = vec2((blurPx * 3.5) / u_resolution.x, (blurPx * 3.5) / u_resolution.y);
    
    // 微表面毛玻璃微观漫散射微扰 (Micro-Roughness Diffusion)
    vec2 noise = hash22(fragCoord * 0.8) * step * 0.50;
    vec2 centerUv = baseUv + noise;

    vec3 acc = vec3(0.0);
    float totalW = 0.0;

    // 中心权重
    acc += texture2D(u_texture, vec2(centerUv.x, 1.0 - centerUv.y)).rgb * 0.2270;
    totalW += 0.2270;

    // 第 1 环 (0.38 * radius, 4 采样)
    vec2 s1 = step * 0.38;
    acc += texture2D(u_texture, vec2(centerUv.x + s1.x, 1.0 - (centerUv.y))).rgb * 0.0790;
    acc += texture2D(u_texture, vec2(centerUv.x - s1.x, 1.0 - (centerUv.y))).rgb * 0.0790;
    acc += texture2D(u_texture, vec2(centerUv.x, 1.0 - (centerUv.y + s1.y))).rgb * 0.0790;
    acc += texture2D(u_texture, vec2(centerUv.x, 1.0 - (centerUv.y - s1.y))).rgb * 0.0790;
    totalW += 0.3160;

    // 第 2 环对角 (0.75 * radius, 4 采样)
    vec2 s2 = step * 0.53;
    acc += texture2D(u_texture, vec2(centerUv.x + s2.x, 1.0 - (centerUv.y + s2.y))).rgb * 0.0700;
    acc += texture2D(u_texture, vec2(centerUv.x - s2.x, 1.0 - (centerUv.y + s2.y))).rgb * 0.0700;
    acc += texture2D(u_texture, vec2(centerUv.x - s2.x, 1.0 - (centerUv.y - s2.y))).rgb * 0.0700;
    acc += texture2D(u_texture, vec2(centerUv.x + s2.x, 1.0 - (centerUv.y - s2.y))).rgb * 0.0700;
    totalW += 0.2800;

    // 第 3 环外沿 (1.00 * radius, 4 采样)
    vec2 s3 = step * 0.92;
    acc += texture2D(u_texture, vec2(centerUv.x + s3.x * 0.924, 1.0 - (centerUv.y + s3.y * 0.383))).rgb * 0.0442;
    acc += texture2D(u_texture, vec2(centerUv.x - s3.x * 0.924, 1.0 - (centerUv.y + s3.y * 0.383))).rgb * 0.0442;
    acc += texture2D(u_texture, vec2(centerUv.x - s3.x * 0.383, 1.0 - (centerUv.y - s3.y * 0.924))).rgb * 0.0442;
    acc += texture2D(u_texture, vec2(centerUv.x + s3.x * 0.383, 1.0 - (centerUv.y - s3.y * 0.924))).rgb * 0.0442;
    totalW += 0.1770;

    return acc / totalW;
  }

  vec3 getBaseColor(vec2 uvSample, vec2 fragPxSample, int isOverModal, float blurPx) {
          float chatDist = 10000.0;
      if (u_has_chat == 1) {
        chatDist = sdRoundedBox(fragPx - u_chat_rect.xy, u_chat_rect.zw, u_chat_radius);
      }
      float headerDist = 10000.0;
      if (u_has_header == 1) {
        headerDist = sdRoundedBox(fragPx - u_header_rect.xy, u_header_rect.zw, 0.0);
      }

      if (u_sidebar_width_px > 10.0 && fragPx.x <= u_sidebar_width_px) {
        vec3 sidebarBg = sampleGaussianFrosted(finalBgUv, u_l1_blur, fragPx);
        if (u_l1_opacity > 0.001) {
          sidebarBg = mix(sidebarBg, vec3(0.04, 0.07, 0.12), clamp(u_l1_opacity, 0.0, 0.95));
        }
        if (u_l1_border > 0.001) {
          float distToEdge = abs(fragPx.x - u_sidebar_width_px);
          if (distToEdge <= 2.0) {
            float glint = smoothstep(2.0, 0.0, distToEdge) * u_l1_border;
            sidebarBg = mix(sidebarBg, vec3(0.92, 0.96, 1.0), glint);
          }
        }
        underlyingColor = sidebarBg * (1.0 - shadow);
      } else if (u_has_header == 1 && headerDist <= 0.0) {
        vec3 headerBg = sampleGaussianFrosted(finalBgUv, u_l1_blur, fragPx);
        if (u_l1_opacity > 0.001) {
          headerBg = mix(headerBg, vec3(0.04, 0.07, 0.12), clamp(u_l1_opacity, 0.0, 0.95));
        }
        if (u_l1_border > 0.001) {
          float distToBottom = abs(fragPx.y - (u_header_rect.y - u_header_rect.w));
          if (distToBottom <= 1.5) {
            float glint = smoothstep(1.5, 0.0, distToBottom) * u_l1_border;
            headerBg = mix(headerBg, vec3(0.92, 0.96, 1.0), glint);
          }
        }
        underlyingColor = headerBg * (1.0 - shadow);
      } else if (u_has_chat == 1 && chatDist <= 0.0) {
        vec3 chatBg = sampleGaussianFrosted(finalBgUv, u_l1_blur, fragPx);
        if (u_l1_opacity > 0.001) {
          chatBg = mix(chatBg, vec3(0.04, 0.07, 0.12), clamp(u_l1_opacity, 0.0, 0.95));
        }
        if (u_l1_border > 0.001 && abs(chatDist) <= 1.5) {
          float glint = smoothstep(1.5, 0.0, abs(chatDist)) * u_l1_border;
          chatBg = mix(chatBg, vec3(0.92, 0.96, 1.0), glint);
        }
        underlyingColor = chatBg * (1.0 - shadow);
      } else {
        vec3 bg;
        if (u_bg_liquid_enabled == 1 && u_bg_dispersion > 0.0001 && u_bg_amp > 0.0001) {
          vec2 uvR = clamp(finalBgUv - bgFlowOffset * u_bg_dispersion * 10.0, 0.001, 0.999);
          vec2 uvG = clamp(finalBgUv, 0.001, 0.999);
          vec2 uvB = clamp(finalBgUv + bgFlowOffset * u_bg_dispersion * 10.0, 0.001, 0.999);
          bg = vec3(
            texture2D(u_texture, vec2(uvR.x, 1.0 - uvR.y)).r,
            texture2D(u_texture, vec2(uvG.x, 1.0 - uvG.y)).g,
            texture2D(u_texture, vec2(uvB.x, 1.0 - uvB.y)).b
          );
        } else {
          bg = texture2D(u_texture, vec2(finalBgUv.x, 1.0 - finalBgUv.y)).rgb;
        }
        underlyingColor = bg * (1.0 - shadow);
      }
    }

    // =========================================================================
    // 2. 模态对话框 (Layer 3): 纯正 DOM 物理高斯模糊已由 CSS 在 DOM 层级执行
    // Shader 仅保持底层纯净自然渲染，彻底消除着色器伪模糊噪点与色斑
    // =========================================================================

    // 3. 输出最终合成画面
    gl_FragColor = vec4(underlyingColor, 1.0);
  }
`;
		function attachLiquidGlassShader(canvas, currentOpts) {
			let opts = { ...currentOpts };
			let disposed = false;
			let animId = 0;
			const sceneCanvas = document.createElement("canvas");
			sceneCanvas.width = 1920;
			sceneCanvas.height = 1080;
			const sceneCtx = sceneCanvas.getContext("2d");
			const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			if (!gl || !sceneCtx) return {
				update: (n) => {
					opts = {
						...opts,
						...n
					};
				},
				dispose: () => {}
			};
			function compileShader(type, src) {
				const s = gl.createShader(type);
				if (!s) return null;
				gl.shaderSource(s, src);
				gl.compileShader(s);
				return s;
			}
			const vs = compileShader(gl.VERTEX_SHADER, VS_SRC);
			const fs = compileShader(gl.FRAGMENT_SHADER, FS_SRC);
			if (!vs || !fs) return {
				update: () => {},
				dispose: () => {}
			};
			const prog = gl.createProgram();
			if (!prog) return {
				update: () => {},
				dispose: () => {}
			};
			gl.attachShader(prog, vs);
			gl.attachShader(prog, fs);
			gl.linkProgram(prog);
			gl.useProgram(prog);
			const buf = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buf);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
				-1,
				-1,
				1,
				-1,
				-1,
				1,
				-1,
				1,
				1,
				-1,
				1,
				1
			]), gl.STATIC_DRAW);
			const aPos = gl.getAttribLocation(prog, "a_pos");
			gl.enableVertexAttribArray(aPos);
			gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
			const tex = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			const uRes = gl.getUniformLocation(prog, "u_resolution");
			const uSidebarWidthPx = gl.getUniformLocation(prog, "u_sidebar_width_px");
			const uModalRectLoc = gl.getUniformLocation(prog, "u_modal_rect");
			const uModalRadiusLoc = gl.getUniformLocation(prog, "u_modal_radius");
			const uModalProgressLoc = gl.getUniformLocation(prog, "u_modal_progress");
			const uHasModalLoc = gl.getUniformLocation(prog, "u_has_modal");
			gl.getUniformLocation(prog, "u_popovers[0]") || gl.getUniformLocation(prog, "u_popovers");
			gl.getUniformLocation(prog, "u_popover_radii[0]") || gl.getUniformLocation(prog, "u_popover_radii");
			const uPopoverCountLoc = gl.getUniformLocation(prog, "u_popover_count");
			const uL1Blur = gl.getUniformLocation(prog, "u_l1_blur");
			const uModalBlurLoc = gl.getUniformLocation(prog, "u_modal_blur");
			const uL1Opacity = gl.getUniformLocation(prog, "u_l1_opacity");
			const uL1Border = gl.getUniformLocation(prog, "u_l1_border");
			const uHasChatLoc = gl.getUniformLocation(prog, "u_has_chat");
			const uChatRectLoc = gl.getUniformLocation(prog, "u_chat_rect");
			const uChatRadiusLoc = gl.getUniformLocation(prog, "u_chat_radius");
			const uHasHeaderLoc = gl.getUniformLocation(prog, "u_has_header");
			const uHeaderRectLoc = gl.getUniformLocation(prog, "u_header_rect");
			const uLensesLoc = gl.getUniformLocation(prog, "u_lenses[0]") || gl.getUniformLocation(prog, "u_lenses");
			const uLensRadiiLoc = gl.getUniformLocation(prog, "u_lens_radii[0]") || gl.getUniformLocation(prog, "u_lens_radii");
			const uLensLayersLoc = gl.getUniformLocation(prog, "u_lens_layers[0]") || gl.getUniformLocation(prog, "u_lens_layers");
			const uLensCountLoc = gl.getUniformLocation(prog, "u_lens_count");
			const uTime = gl.getUniformLocation(prog, "u_time");
			const uIor = gl.getUniformLocation(prog, "u_ior");
			const uBulge = gl.getUniformLocation(prog, "u_bulge");
			const uDispersion = gl.getUniformLocation(prog, "u_dispersion");
			const uBevel = gl.getUniformLocation(prog, "u_bevel_width");
			const uLensBlur = gl.getUniformLocation(prog, "u_lens_blur");
			const uDarkening = gl.getUniformLocation(prog, "u_darkening");
			const uRimIntensity = gl.getUniformLocation(prog, "u_rim_intensity");
			const uLightAngle = gl.getUniformLocation(prog, "u_light_angle");
			const uVibrancy = gl.getUniformLocation(prog, "u_vibrancy");
			const uRippleAmp = gl.getUniformLocation(prog, "u_ripple_amp");
			const uShadowOpacity = gl.getUniformLocation(prog, "u_shadow_opacity");
			const uShadowBlur = gl.getUniformLocation(prog, "u_shadow_blur");
			const uShadowOffsetY = gl.getUniformLocation(prog, "u_shadow_offset_y");
			const uBgLiquidEnabled = gl.getUniformLocation(prog, "u_bg_liquid_enabled");
			const uBgAmp = gl.getUniformLocation(prog, "u_bg_amp");
			const uBgScale = gl.getUniformLocation(prog, "u_bg_scale");
			const uBgSpeed = gl.getUniformLocation(prog, "u_bg_speed");
			const uBgDispersion = gl.getUniformLocation(prog, "u_bg_dispersion");
			const uRip0 = gl.getUniformLocation(prog, "u_ripple0");
			const uRip1 = gl.getUniformLocation(prog, "u_ripple1");
			let customImg = null;
			let customVideo = null;
			let currentWallpaperUrl = "";
			function loadWallpaper(url) {
				if (url === currentWallpaperUrl && (customImg || customVideo)) return;
				currentWallpaperUrl = url;
				if (!url) {
					if (customVideo) {
						customVideo.pause();
						customVideo.removeAttribute("src");
						customVideo.load();
						customVideo = null;
					}
					customImg = null;
					return;
				}
				const isVideo = url.startsWith("video:") || url.startsWith("data:video/") || url.includes("ext=mp4") || url.includes("ext=webm") || url.includes(".mp4") || url.includes("default_");
				let cleanUrl = url.replace(/^(video:)+/, "");
				let posterUrl = "";
				if (isVideo && cleanUrl.includes("|")) {
					const parts = cleanUrl.split("|");
					cleanUrl = parts[0];
					posterUrl = parts[1] || "";
				}
				if (isVideo) {
					if (customVideo && customVideo.src !== cleanUrl && !customVideo.src.endsWith(cleanUrl) && !cleanUrl.endsWith(customVideo.src)) {
						customVideo.pause();
						customVideo.removeAttribute("src");
						customVideo.load();
						customVideo = null;
					}
					if (posterUrl) {
						const pImg = new Image();
						pImg.onload = () => {
							if (currentWallpaperUrl.includes(cleanUrl)) customImg = pImg;
						};
						pImg.src = posterUrl;
					} else customImg = null;
					if (cleanUrl) {
						if (customVideo && (customVideo.src === cleanUrl || customVideo.src.endsWith(cleanUrl) || cleanUrl.endsWith(customVideo.src))) {
							if (customVideo.paused) customVideo.play().catch(() => {});
							return;
						}
						const nextVideo = document.createElement("video");
						nextVideo.crossOrigin = "anonymous";
						nextVideo.autoplay = true;
						nextVideo.loop = true;
						nextVideo.muted = true;
						nextVideo.defaultMuted = true;
						nextVideo.playsInline = true;
						nextVideo.setAttribute("playsinline", "");
						nextVideo.setAttribute("webkit-playsinline", "");
						nextVideo.setAttribute("muted", "");
						nextVideo.setAttribute("autoplay", "");
						nextVideo.setAttribute("loop", "");
						nextVideo.src = cleanUrl;
						const tryPlay = () => {
							if (nextVideo.paused) nextVideo.play().catch(() => {});
						};
						nextVideo.onloadeddata = () => {
							if (customVideo && customVideo !== nextVideo) {
								customVideo.pause();
								customVideo.removeAttribute("src");
								customVideo.load();
							}
							if (currentWallpaperUrl.includes(cleanUrl)) {
								customVideo = nextVideo;
								tryPlay();
							}
						};
						nextVideo.oncanplay = () => {
							if (!customVideo && currentWallpaperUrl.includes(cleanUrl)) customVideo = nextVideo;
							tryPlay();
						};
						nextVideo.load();
						tryPlay();
					}
				} else {
					if (customVideo) {
						customVideo.pause();
						customVideo.removeAttribute("src");
						customVideo.load();
						customVideo = null;
					}
					customImg = null;
					const img = new Image();
					img.crossOrigin = "anonymous";
					img.onload = () => {
						if (currentWallpaperUrl === url || currentWallpaperUrl === cleanUrl) customImg = img;
					};
					img.src = cleanUrl;
				}
			}
			if (opts.wallpaper) loadWallpaper(opts.wallpaper);
			const ripples = [{
				x: 0,
				y: 0,
				time: -10,
				amp: 0
			}, {
				x: 0,
				y: 0,
				time: -10,
				amp: 0
			}];
			let ripIdx = 0;
			const onPointerDown = (e) => {
				ripples[ripIdx] = {
					x: (e.clientX / window.innerWidth - .5) * (window.innerWidth / window.innerHeight),
					y: .5 - e.clientY / window.innerHeight,
					time: performance.now() * .001,
					amp: 1
				};
				ripIdx = (ripIdx + 1) % 2;
			};
			window.addEventListener("pointerdown", onPointerDown, { passive: true });
			function resize() {
				const dpr = window.devicePixelRatio || 1;
				canvas.width = window.innerWidth * dpr;
				canvas.height = window.innerHeight * dpr;
				gl.viewport(0, 0, canvas.width, canvas.height);
			}
			window.addEventListener("resize", resize);
			resize();
			function drawCover(media, w, h) {
				const mw = media instanceof HTMLVideoElement ? media.videoWidth : media.naturalWidth;
				const mh = media instanceof HTMLVideoElement ? media.videoHeight : media.naturalHeight;
				if (mw <= 0 || mh <= 0) return;
				const sRatio = w / h;
				const mRatio = mw / mh;
				let dw = w;
				let dh = h;
				let dx = 0;
				let dy = 0;
				if (sRatio > mRatio) {
					dh = w / mRatio;
					dy = (h - dh) * .5;
				} else {
					dw = h * mRatio;
					dx = (w - dw) * .5;
				}
				sceneCtx.drawImage(media, dx, dy, dw, dh);
			}
			function drawScene() {
				const w = sceneCanvas.width;
				const h = sceneCanvas.height;
				sceneCtx.filter = opts.bgBlur > 0 ? `blur(${opts.bgBlur}px)` : "none";
				if (customVideo && (customVideo.readyState >= 1 || customVideo.videoWidth > 0)) {
					if (customVideo.paused) customVideo.play().catch(() => {});
					sceneCtx.clearRect(0, 0, w, h);
					drawCover(customVideo, w, h);
					return;
				}
				if (customImg && customImg.complete && customImg.naturalWidth > 0) {
					sceneCtx.clearRect(0, 0, w, h);
					drawCover(customImg, w, h);
					return;
				}
				sceneCtx.clearRect(0, 0, w, h);
				const bg = sceneCtx.createLinearGradient(0, 0, w, h);
				bg.addColorStop(0, '#020813');
		bg.addColorStop(0.35, '#052c38');
		bg.addColorStop(0.7, '#006b5b');
		bg.addColorStop(1, '#00e5a3');
				sceneCtx.fillStyle = bg;
				sceneCtx.fillRect(0, 0, w, h);
			}
			const lensBuffer = new Float32Array(256);
			const radiiBuffer = new Float32Array(64);
			const layersBuffer = new Float32Array(64);
			new Float32Array(64);
			new Float32Array(16);
			let currentModalProgress = 0;
			let modalOpenStartTime = 0;
			let modalCloseStartTime = 0;
			let lensScanFrameCounter = 0;
			let lastModalState = -1;
			let cachedLensElements = [];
			function frame(now) {
				if (disposed) return;
				try {
					const time = now * .001;
					lensScanFrameCounter++;
					drawScene();
					gl.bindTexture(gl.TEXTURE_2D, tex);
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sceneCanvas);
					const dpr = window.devicePixelRatio || 1;
					const screenH = window.innerHeight;
					gl.uniform1i(uPopoverCountLoc, 0);
					const sidebarEl = document.querySelector("[class*=\"sidebarCol\"], [data-dsh-sidebar-root], [class*=\"SidebarRoot_root\"]");
					let sidebarWidthPx = 0;
					let sidebarRight = 0;
					let isSidebarCollapsed = false;
					let isSidebarFading = false;
					if (sidebarEl) {
						const sRect = sidebarEl.getBoundingClientRect();
						if (sRect.width > 0) {
							sidebarWidthPx = (sRect.left + sRect.width) * dpr;
							sidebarRight = sRect.right;
							if (sRect.width < 140) isSidebarCollapsed = true;
						}
						const rootEl = sidebarEl.querySelector("[class*=\"root\"]") || sidebarEl;
						const classStr = typeof rootEl.className === "string" ? rootEl.className : typeof rootEl.className?.baseVal === "string" ? rootEl.className.baseVal : "";
						if (classStr.includes("fading") || classStr.includes("collapsed")) isSidebarFading = true;
					}
					let chatEl = null;
					const isHero = document.querySelector('[data-phase="hero"], [data-phase="settling"], [class*="composerHero"], [class*="wSkVaW_composerHero"]');
					if (!isHero) {
						chatEl = document.querySelector('[data-phase="active"] [class*="ConversationRoot_scrollBody"], [data-phase="active"] [class*="wSkVaW_scrollBody"], [data-phase="active"] [data-conversation-scroll], [data-dsh-chat-scroll], [class*="ChatView_scroll"]') || document.querySelector('[class*="ConversationRoot_scrollBody"]:not(:has([class*="composerHero"])), [class*="wSkVaW_scrollBody"]:not(:has([class*="composerHero"]))');
					}
					let hasChat = 0;
					let chatCenterX = 0;
					let chatCenterY = 0;
					let chatHalfW = 0;
					let chatHalfH = 0;
					let chatRadius = 0;
					if (chatEl && chatEl.offsetWidth > 0 && chatEl.offsetHeight > 0) {
						const cRect = chatEl.getBoundingClientRect();
						if (cRect.width > 20 && cRect.height > 20 && cRect.bottom > 0 && cRect.top < screenH) {
							hasChat = 1;
							chatCenterX = (cRect.left + cRect.width * 0.5) * dpr;
							chatCenterY = (screenH - (cRect.top + cRect.height * 0.5)) * dpr;
							chatHalfW = cRect.width * 0.5 * dpr;
							chatHalfH = cRect.height * 0.5 * dpr;
							chatRadius = 18 * dpr;
						}
					}
					gl.uniform1i(uHasChatLoc, hasChat);
					gl.uniform4f(uChatRectLoc, chatCenterX, chatCenterY, chatHalfW, chatHalfH);
					gl.uniform1f(uChatRadiusLoc, chatRadius);
			let headerEl = null;
			if (!isHero) {
				headerEl = document.querySelector('[data-phase="active"] [class*="header"]:has([class*="title"]), [data-phase="active"] [class*="wSkVaW_header"], [class*="ConversationRoot_header"]') || document.querySelector('[class*="wSkVaW_header"]');
			}
			let hasHeader = 0;
			let headerCenterX = 0;
			let headerCenterY = 0;
			let headerHalfW = 0;
			let headerHalfH = 0;
			if (headerEl && headerEl.offsetWidth > 0 && headerEl.offsetHeight > 0) {
				const hRect = headerEl.getBoundingClientRect();
				if (hRect.width > 20 && hRect.height > 10 && hRect.top < screenH) {
					hasHeader = 1;
					headerCenterX = (hRect.left + hRect.width * 0.5) * dpr;
					headerCenterY = (screenH - (hRect.top + hRect.height * 0.5)) * dpr;
					headerHalfW = (hRect.width * 0.5) * dpr;
					headerHalfH = (hRect.height * 0.5) * dpr;
				}
			}
			gl.uniform1i(uHasHeaderLoc, hasHeader);
			gl.uniform4f(uHeaderRectLoc, headerCenterX, headerCenterY, headerHalfW, headerHalfH);
					const candidates = document.querySelectorAll("[data-dsh-settings-modal], [data-dsh-modal-panel], [class*=\"dshMarketOverlayPanel\"], [class*=\"SettingsRoot_panel\"], [class*=\"Modal_dialog\"]");
					let modalEl = null;
					let maxArea = 0;
					for (let i = 0; i < candidates.length; i++) {
						const el = candidates[i];
						const rect = el.getBoundingClientRect();
						if (rect.width > 100 && rect.height > 100 && rect.bottom > 0 && rect.top < screenH) {
							const area = rect.width * rect.height;
							if (el.hasAttribute("data-dsh-settings-modal") || el.hasAttribute("data-dsh-modal-panel") || area > maxArea) {
								maxArea = area;
								modalEl = el;
								if (el.hasAttribute("data-dsh-settings-modal") || el.hasAttribute("data-dsh-modal-panel")) break;
							}
						}
					}
					const isModalOpenAttr = (document.documentElement.getAttribute("data-dsh-modal-open") === "true" || document.documentElement.getAttribute("data-dsh-settings-open") === "true") && modalEl !== null;
					let hasModal = isModalOpenAttr ? 1 : 0;
					let modalCenterX = 0;
					let modalCenterY = 0;
					let modalHalfW = 0;
					let modalHalfH = 0;
					let modalRadius = 24 * dpr;
					if (modalEl && modalEl.offsetWidth > 0 && modalEl.offsetHeight > 0) {
						const mRect = modalEl.getBoundingClientRect();
						const classStr = typeof modalEl.className === "string" ? modalEl.className : typeof modalEl.className?.baseVal === "string" ? modalEl.className.baseVal : "";
						const isClosing = modalEl.getAttribute("data-closing") === "true" || classStr.includes("closing") || classStr.includes("Closing") || modalEl.parentElement?.getAttribute?.("data-closing") === "true" || modalEl.parentElement?.className?.includes?.("closing") || modalEl.parentElement?.className?.includes?.("Closing");
						if (mRect.width > 20 && mRect.height > 20) {
							modalCenterX = (mRect.left + mRect.width * .5) * dpr;
							modalCenterY = (screenH - (mRect.top + mRect.height * .5)) * dpr;
							modalHalfW = mRect.width * .5 * dpr;
							modalHalfH = mRect.height * .5 * dpr;
							modalRadius = 20 * dpr;
							if (isClosing) {
								if (modalCloseStartTime === 0) modalCloseStartTime = now;
								modalOpenStartTime = 0;
								const elapsed = (now - modalCloseStartTime) / 240;
								currentModalProgress = Math.pow(1 - Math.min(Math.max(elapsed, 0), 1), 2);
								hasModal = currentModalProgress > .01 ? 1 : 0;
							} else {
								if (modalOpenStartTime === 0) modalOpenStartTime = now;
								modalCloseStartTime = 0;
								const elapsed = (now - modalOpenStartTime) / 320;
								currentModalProgress = 1 - Math.pow(1 - Math.min(Math.max(elapsed, 0), 1), 3.5);
								hasModal = 1;
							}
						}
					} else if (isModalOpenAttr) {
						hasModal = 1;
						currentModalProgress = 1;
					} else {
						modalOpenStartTime = 0;
						modalCloseStartTime = 0;
						currentModalProgress = 0;
						hasModal = 0;
					}
					gl.uniform1i(uHasModalLoc, hasModal);
					gl.uniform4f(uModalRectLoc, modalCenterX, modalCenterY, modalHalfW, modalHalfH);
					gl.uniform1f(uModalRadiusLoc, modalRadius);
					gl.uniform1f(uModalProgressLoc, currentModalProgress);
					gl.uniform1f(uL1Blur, opts.l1Blur * dpr);
					gl.uniform1f(uModalBlurLoc, (opts.modalBlur ?? 24) * dpr);
					gl.uniform1f(uL1Opacity, opts.l1Opacity);
					gl.uniform1f(uL1Border, opts.l1Border);
					if (hasModal !== lastModalState || !(hasModal === 1 && (currentModalProgress < .999 || modalCloseStartTime > 0)) && lensScanFrameCounter % 15 === 0) {
						lastModalState = hasModal;
						cachedLensElements = Array.from(document.querySelectorAll("[data-composer-card], [class*=\"InputTrigger_box\"], [class*=\"ChatInput_container\"], [data-dsh-inputbar] > div, [data-conversation-composer], [class*=\"composerCard\"], button[class*=\"newSession\"], [class*=\"groupSection\"], [data-dsh-surface]"));
					}
					let count = 0;
					lensBuffer.fill(0);
					radiiBuffer.fill(0);
					layersBuffer.fill(0);
					for (let i = 0; i < cachedLensElements.length && count < 64; i++) {
						const el = cachedLensElements[i];
						if (!el || el.offsetWidth === 0 && el.offsetHeight === 0) continue;
						if (el.closest("[role=\"dialog\"], [class*=\"SettingsRoot_panel\"], [class*=\"Modal_panel\"], [class*=\"dshMarketOverlay\"], [class*=\"RemotePanel_panel\"]") !== null) continue;
						if (!el.matches("[class*=\"groupSection\"]") && el.closest("[class*=\"groupSection\"]") !== null) continue;
						const rect = el.getBoundingClientRect();
						if (rect.width < 14 || rect.height < 14 || rect.bottom <= 0 || rect.top >= screenH) continue;
						const classStr = typeof el.className === "string" ? el.className : typeof el.className?.baseVal === "string" ? el.className.baseVal : "";
						const isInsideModal = hasModal === 1 && modalEl !== null && (modalEl === el || modalEl.contains(el));
						const isInsideSidebar = sidebarEl !== null && sidebarEl.contains(el);
						const isNewSessionBtn = classStr.includes("newSession");
						if (el.getAttribute("role") === "menu" || classStr.includes("menu") || classStr.includes("Menu") || classStr.includes("popover") || classStr.includes("Popover") || el.closest("[role=\"menu\"], [class*=\"Menu_list\"], [class*=\"ModelSelect_menu\"], [class*=\"modelSelect_menu\"], [class*=\"PopupSelectView\"], [class*=\"popover\"], [class*=\"Popover\"], [data-radix-popper-content-wrapper]") !== null) continue;
						if (isInsideSidebar && !isInsideModal) {
							if (isSidebarCollapsed || isSidebarFading) continue;
							const maxRight = sidebarRight - 4;
							if (rect.left >= maxRight) continue;
							const effectiveW = Math.min(rect.right, maxRight) - rect.left;
							if (isNewSessionBtn && effectiveW < 32) continue;
						}
						let left = rect.left;
						let right = rect.right;
						const top = rect.top;
						const bottom = rect.bottom;
						if (isInsideSidebar && !isInsideModal) right = Math.min(right, sidebarRight - 4);
						const w = right - left;
						const h = bottom - top;
						if (w > 14 && h > 14) {
							const rPx = classStr.includes("trigger") || classStr.includes("selector") || classStr.includes("choice") || classStr.includes("newSession") ? 999 : 14;
							const centerX = (left + w * .5) * dpr;
							const centerY = (screenH - (top + h * .5)) * dpr;
							const halfW = w * .5 * dpr;
							const halfH = h * .5 * dpr;
							const radius = Math.min(rPx * dpr, halfH, halfW);
							lensBuffer[count * 4 + 0] = centerX;
							lensBuffer[count * 4 + 1] = centerY;
							lensBuffer[count * 4 + 2] = halfW;
							lensBuffer[count * 4 + 3] = halfH;
							radiiBuffer[count] = radius;
							layersBuffer[count] = isInsideModal ? 1 : 0;
							count++;
						}
					}
					gl.uniform4fv(uLensesLoc, lensBuffer);
					gl.uniform1fv(uLensRadiiLoc, radiiBuffer);
					gl.uniform1fv(uLensLayersLoc, layersBuffer);
					gl.uniform1i(uLensCountLoc, count);
					gl.uniform2f(uRes, canvas.width, canvas.height);
					gl.uniform1f(uTime, time);
					gl.uniform1f(uIor, opts.ior);
					gl.uniform1f(uBulge, opts.bulge);
					gl.uniform1f(uDispersion, opts.dispersion);
					gl.uniform1f(uBevel, opts.bevel);
					gl.uniform1f(uLensBlur, opts.lensBlur * dpr);
					gl.uniform1f(uDarkening, opts.darkening);
					gl.uniform1f(uRimIntensity, opts.rimIntensity);
					gl.uniform1f(uLightAngle, opts.lightAngle);
					gl.uniform1f(uVibrancy, opts.vibrancy);
					gl.uniform1f(uRippleAmp, opts.rippleAmp);
					gl.uniform1f(uShadowOpacity, opts.dropShadowOpacity);
					gl.uniform1f(uShadowBlur, opts.dropShadowBlur * dpr);
					gl.uniform1f(uShadowOffsetY, opts.dropShadowY * dpr);
					gl.uniform1i(uBgLiquidEnabled, opts.bgLiquidEnabled ? 1 : 0);
					gl.uniform1f(uBgAmp, opts.bgLiquidAmp);
					gl.uniform1f(uBgScale, opts.bgLiquidScale);
					gl.uniform1f(uBgSpeed, opts.bgLiquidSpeed);
					gl.uniform1f(uBgDispersion, opts.bgLiquidDispersion);
					gl.uniform4f(uRip0, ripples[0].x, ripples[0].y, ripples[0].time, ripples[0].amp);
					gl.uniform4f(uRip1, ripples[1].x, ripples[1].y, ripples[1].time, ripples[1].amp);
					gl.drawArrays(gl.TRIANGLES, 0, 6);
				} catch (err) {
					console.error("[LiquidGlass] frame render exception:", err);
				} finally {
					if (!disposed) animId = requestAnimationFrame(frame);
				}
			}
			animId = requestAnimationFrame(frame);
			return {
				update: (next) => {
					opts = {
						...opts,
						...next
					};
					if (next.wallpaper !== void 0) loadWallpaper(next.wallpaper);
				},
				dispose: () => {
					disposed = true;
					cancelAnimationFrame(animId);
					window.removeEventListener("pointerdown", onPointerDown);
					window.removeEventListener("resize", resize);
				}
			};
		}
		//#endregion
		//#region src/client/glass-ambient.ts
		/**
		* Ambient Scene for Liquid Glass Theme.
		*/
		const AMBIENT_MARKUP = `
  <canvas data-dsh-glass-canvas style="position: absolute; inset: 0; width: 100%; height: 100%; display: block;"></canvas>
  <div data-dsh-glass-wallpaper style="position: absolute; inset: 0; display: none; overflow: hidden;">
    <img data-dsh-glass-wallpaper-img alt="" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.90;" />
  </div>
`;
		function ensureGlassAmbientScene() {
			const existing = document.querySelector("[data-dsh-glass-ambient]");
			if (existing !== null) return existing;
			const holder = document.createElement("div");
			holder.innerHTML = `<div data-dsh-glass-ambient aria-hidden="true">${AMBIENT_MARKUP}</div>`;
			const node = holder.firstElementChild;
			if (!(node instanceof HTMLElement)) throw new Error("ui-liquid-glass: ambient scene failed to parse");
			document.body.prepend(node);
			return node;
		}
		
		

		function removeGlassAmbientScene() {
			for (const node of document.querySelectorAll("[data-dsh-glass-ambient]")) node.remove();
		}
		//#endregion
		//#region src/client/seam-stamper.ts
		const SEAMS = [
			{
				attribute: "data-dsh-frame",
				selector: ":has(> [class*=\"sidebarCol\"])"
			},
			{
				attribute: "data-dsh-sidebar-root",
				selector: "[class*=\"sidebarCol\"] [class*=\"root\"]",
				first: true
			},
			{
				attribute: "data-dsh-surface",
				selector: "button[class*=\"newSession\"]"
			},
			{
				attribute: "data-dsh-trajectory",
				selector: "[data-conversation-composer-overlay]"
			},
			{
				attribute: "data-dsh-details",
				selector: "[class*=\"detailsCol\"] [class*=\"root\"]",
				first: true
			},
			{
				attribute: "data-dsh-inputbar",
				selector: ":has(> [data-composer-card])"
			},
			{
				attribute: "data-dsh-add",
				selector: "[data-composer-card] [class*=\"add\"]"
			},
			{
				attribute: "data-dsh-stats",
				selector: "[data-slot=\"conversation.composer.dock\"] [class*=\"root\"]"
			},
			{
				attribute: "data-dsh-wordmark",
				selector: "[class*=\"sidebarCol\"] [class*=\"brand\"]",
				first: true
			}
		];
		function stamp(seam) {
			if (seam.first) {
				const el = document.querySelector(seam.selector);
				if (el !== null && !el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, "");
				return;
			}
			for (const el of document.querySelectorAll(seam.selector)) if (!el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, "");
		}
		function stampAll() {
			for (const seam of SEAMS) stamp(seam);
		}
		function startSeamStamper() {
			stampAll();
			const observer = new MutationObserver(() => {
				stampAll();
			});
			observer.observe(document.documentElement, {
				childList: true,
				subtree: true
			});
			return () => {
				observer.disconnect();
			};
		}
		//#endregion
		//#region src/client/theme-layer.ts
		const LIQUID_GLASS_ATTRIBUTE = "data-dsh-liquid-glass";
		const LIQUID_GLASS_ENABLED_KEY = "dsh.ui-liquid-glass.enabled";
		const OVERRIDE_SOURCE = "@deepseek-ai/dsh-client-ui-liquid-glass";
		const LIQUID_GLASS_TOKEN_OVERRIDES = {
			"--dsw-alias-bg-base": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-alias-bg-layer-1": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-alias-bg-layer-2": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-alias-bg-layer-3": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-alias-bg-overlay": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-alias-bg-module-platform": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-alias-bg-multi-select": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-specific-sidebar-fill": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-specific-input-major": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-specific-bubble": {
				light: "transparent",
				dark: "transparent"
			},
			"--dsw-specific-menu": {
				light: "var(--dsh-l3-mask-bg)",
				dark: "var(--dsh-l3-mask-bg)"
			},
			"--dsw-alias-border-l1": {
				light: "rgba(255, 255, 255, 0.25)",
				dark: "rgba(255, 255, 255, 0.18)"
			},
			"--dsw-alias-bg-mask-drop": {
				light: "var(--dsh-l3-mask-bg)",
				dark: "var(--dsh-l3-mask-bg)"
			},
			"--dsw-alias-bg-mask-1": {
				light: "var(--dsh-l3-mask-bg)",
				dark: "var(--dsh-l3-mask-bg)"
			},
			"--dsw-mask-blur": {
				light: "blur(var(--dsh-modal-blur, 24px))",
				dark: "blur(var(--dsh-modal-blur, 24px))"
			}
		};
		
		function ensureSidebarUnderlay() {
			if (typeof document === "undefined") return null;
			let el = document.getElementById("dsh-sidebar-underlay");
			if (!el) {
				el = document.createElement("div");
				el.id = "dsh-sidebar-underlay";
				el.setAttribute("data-dsh-sidebar-underlay", "");
				el.setAttribute("aria-hidden", "true");
				document.body.prepend(el);
			}
			return el;
		}
		function removeSidebarUnderlay() {
			if (typeof document === "undefined") return;
			const el = document.getElementById("dsh-sidebar-underlay");
			if (el) el.remove();
		}
										function syncSidebarWidth(underlay) {
			if (typeof document === "undefined") return;
			const el = underlay || document.getElementById("dsh-sidebar-underlay");
			if (!el) return;
			const frameEl = document.querySelector("[data-sidebar-collapsed], [class*=\"frame\"]");
			const isFrameCollapsed = frameEl ? frameEl.hasAttribute("data-sidebar-collapsed") : false;
			const collapsedEl = document.querySelector('[class*="hHd-Xa_collapsed"], [class*="SidebarRoot_collapsed"], [class*="sidebarCol"] [class*="collapsed"]');
			const isCollapsed = isFrameCollapsed || collapsedEl !== null;
			let targetWidth = 56;
			if (!isCollapsed) {
				const sidebarEl = document.querySelector('[class*="hHd-Xa_root"], [class*="SidebarRoot_root"], [class*="sidebarCol"]');
				if (sidebarEl) {
					const rect = sidebarEl.getBoundingClientRect();
					targetWidth = rect.width > 100 ? rect.width : 260;
				} else {
					targetWidth = 260;
				}
			}
			el.style.display = "block";
			el.style.width = targetWidth + "px";
			document.documentElement.style.setProperty("--dsh-sidebar-width", targetWidth + "px");
		}

		
		function startChatFadeMaskDriver() {
			if (typeof document === "undefined") return () => {};
			let scroller = null;
			let viewArea = null;
			let rafId = 0;
			function update() {
				if (!scroller || !viewArea) return;
				const s = scroller.scrollTop;
				const h = scroller.clientHeight;
				if (h <= 0) return;
				const composerEl = scroller.querySelector('[class*="composerSeat"], [data-conversation-composer], [data-composer-card]');
				const composerH = composerEl && composerEl.offsetHeight > 0 ? composerEl.offsetHeight : 120;
				const fadeStart = Math.max(0, s + h - composerH - 60);
				const fadeMid1 = Math.max(0, s + h - composerH - 30);
				const fadeMid2 = Math.max(0, s + h - composerH - 10);
				const fadeEnd = Math.max(0, s + h - composerH + 15);
				const maskStr = "linear-gradient(to bottom, #000 0px, #000 " + fadeStart + "px, rgba(0, 0, 0, 0.75) " + fadeMid1 + "px, rgba(0, 0, 0, 0.25) " + fadeMid2 + "px, transparent " + fadeEnd + "px, transparent 100%)";
				viewArea.style.setProperty("-webkit-mask-image", maskStr, "important");
				viewArea.style.setProperty("mask-image", maskStr, "important");
			}
			function onScroll() {
				cancelAnimationFrame(rafId);
				rafId = requestAnimationFrame(update);
			}
			function bind() {
				const nextScroller = document.querySelector('[data-phase="active"] [class*="scrollBody"], [data-phase="active"] [data-conversation-scroll]');
				const nextViewArea = nextScroller ? (nextScroller.querySelector('[class*="viewArea"], [class*="ChatView_root"], [class*="Md3f7G_root"]') || nextScroller.firstElementChild) : null;
				if (nextScroller !== scroller) {
					if (scroller) scroller.removeEventListener("scroll", onScroll);
					scroller = nextScroller;
					if (scroller) scroller.addEventListener("scroll", onScroll, { passive: true });
				}
				viewArea = nextViewArea;
				if (scroller && viewArea) update();
			}
			bind();
			const obs = new MutationObserver(() => { bind(); });
			obs.observe(document.documentElement, { childList: true, subtree: true });
			return () => {
				cancelAnimationFrame(rafId);
				obs.disconnect();
				if (scroller) scroller.removeEventListener("scroll", onScroll);
				if (viewArea) {
					viewArea.style.removeProperty("-webkit-mask-image");
					viewArea.style.removeProperty("mask-image");
				}
			};
		}

		var LiquidGlassLayer = class {
			enabled = true;
			settings = { ...LIQUID_GLASS_DEFAULTS };
			shaderHandle = null;
			tokenDisposer;
			seamDisposer;
			ctx;
			saveDebounceTimer = null;
			constructor(ctx) {
				this.ctx = ctx;
				this.loadState();
				this.sync();
				this.initBootSequence();
			}
			async initBootSequence() {
				try {
					await this.hydrateSettingsFromDisk();
					await this.hydrateWallpaperOnBoot();
					if (this.enabled) this.chatMaskDisposer?.();
			this.chatMaskDisposer = startChatFadeMaskDriver();
			this.applySettings();
					this.sync();
				} catch {}
			}
			async hydrateSettingsFromDisk() {
				try {
					const res = await fetch("/api/liquid-glass/settings");
					if (res.ok) {
						const disk = await res.json();
						if (disk && typeof disk === "object" && Object.keys(disk).length > 0) {
							if (typeof disk.enabled === "boolean") this.enabled = disk.enabled;
							const { enabled: _en, wallpaper: _wp, ...restSettings } = disk;
							this.settings = {
								...this.settings,
								...restSettings
							};
							if (this.enabled) this.applySettings();
						}
					}
				} catch {}
			}
			async hydrateWallpaperOnBoot() {
				try {
					const store = await loadWallpaperStore();
					if (this.settings.background === "wallpaper") {
						const cur = store.customWallpapers.find((it) => it.id === store.activeCustomId) || store.customWallpapers[0];
						if (cur && (cur.url || cur.poster)) {
							const freshUrl = cur.type === "video" ? `video:${cur.url || ""}|${cur.poster || ""}` : cur.url || cur.poster || "";
							this.settings.wallpaper = freshUrl;
							if (this.enabled) this.applySettings();
						}
					} else if (this.settings.background === "gradient") {
						const cur = BUILTIN_WALLPAPERS.find((it) => it.id === store.activeBuiltinId) || BUILTIN_WALLPAPERS[0];
						if (cur && cur.url) {
							const freshUrl = (cur.type === "video" && !cur.url.startsWith("video:")) ? `video:${cur.url}` : cur.url;
						this.settings.wallpaper = freshUrl;
							if (this.enabled) this.applySettings();
						}
					}
				} catch {}
			}
			loadState() {
				try {
					const en = localStorage.getItem(LIQUID_GLASS_ENABLED_KEY);
					this.enabled = en === null ? true : en === "true";
					const raw = localStorage.getItem("dsh.ui-liquid-glass.settings");
					if (raw) {
						const parsed = JSON.parse(raw);
						this.settings = { ...LIQUID_GLASS_DEFAULTS, ...parsed };
						if (!this.settings.wallpaper) this.settings.wallpaper = LIQUID_GLASS_DEFAULTS.wallpaper;
						if (typeof this.settings.modalBlur !== "number" || isNaN(this.settings.modalBlur)) this.settings.modalBlur = LIQUID_GLASS_DEFAULTS.modalBlur;
						if (typeof this.settings.l3MaskOpacity !== "number" || isNaN(this.settings.l3MaskOpacity)) this.settings.l3MaskOpacity = LIQUID_GLASS_DEFAULTS.l3MaskOpacity;
					}
				} catch {
					this.enabled = true;
				}
			}
			saveState() {
				try {
					localStorage.setItem(LIQUID_GLASS_ENABLED_KEY, String(this.enabled));
					const cleanSettings = {
						...this.settings,
						wallpaper: ""
					};
					localStorage.setItem("dsh.ui-liquid-glass.settings", JSON.stringify(cleanSettings));
				} catch {}
				if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
				this.saveDebounceTimer = setTimeout(() => {
					try {
						const payload = { enabled: this.enabled, ...this.settings };
						fetch("/api/liquid-glass/settings", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify(payload)
						}).catch(() => {});
					} catch {}
				}, 150);
			}
			sync() {
				if (this.enabled) this.mount();
				else this.unmount();
			}
			updateLayerCssVariables() {
				const root = document.documentElement;
				root.style.setProperty("--dsh-l1-blur", `${this.settings.l1Blur}px`);
				root.style.setProperty("--dsh-l1-opacity", `${this.settings.l1Opacity}`);
				root.style.setProperty("--dsh-l1-bg", `rgba(10, 16, 28, ${Math.max(.001, this.settings.l1Opacity)})`);
				root.style.setProperty("--dsh-l1-border", this.settings.l1Border > .001 ? `rgba(255, 255, 255, ${this.settings.l1Border})` : "transparent");
				root.style.setProperty("--dsh-l1-border-raw", `${this.settings.l1Border}`);
				root.style.setProperty("--dsh-l1-rim", this.settings.l1Border > .001 ? `rgba(255, 255, 255, ${Math.min(1, this.settings.l1Border * 1.6)})` : "transparent");
				root.style.setProperty("--dsh-l1-shadow", "0 20px 48px rgba(0, 0, 0, 0.50)");
				root.style.setProperty("--dsh-modal-blur", `${this.settings.modalBlur}px`);
				root.style.setProperty("--dsw-mask-blur", `blur(${this.settings.modalBlur}px)`);
				const l3Opacity = typeof this.settings.l3MaskOpacity === "number" && !isNaN(this.settings.l3MaskOpacity) ? this.settings.l3MaskOpacity : .45;
				root.style.setProperty("--dsh-l3-mask-opacity", `${l3Opacity}`);
				root.style.setProperty("--dsh-l3-mask-bg", `rgba(10, 16, 28, ${Math.max(.001, l3Opacity)})`);
				root.style.setProperty("--dsh-l2-darkening", `${this.settings.darkening}`);
				const darkeningVal = typeof this.settings.darkening === "number" && !isNaN(this.settings.darkening) ? this.settings.darkening : 0;
				root.style.setProperty("--dsh-l2-bg", darkeningVal > .005 ? `rgba(10, 16, 28, ${darkeningVal})` : "rgba(255, 255, 255, 0.03)");
				root.style.setProperty("--dsh-l2-glass-tint", `linear-gradient(135deg, rgba(255, 255, 255, ${Math.min(.28, .06 + (this.settings.rimIntensity || 0) * .18)}) 0%, rgba(255, 255, 255, 0.01) 100%)`);
				const lensBlurVal = typeof this.settings.lensBlur === "number" && !isNaN(this.settings.lensBlur) ? this.settings.lensBlur : 0;
				root.style.setProperty("--dsh-l2-blur", `${Math.max(0, lensBlurVal)}px`);
				const rimIntensityVal = typeof this.settings.rimIntensity === "number" && !isNaN(this.settings.rimIntensity) ? this.settings.rimIntensity : .2;
				const borderAlpha = Math.max(.06, rimIntensityVal * .45);
				root.style.setProperty("--dsh-l2-border", `rgba(255, 255, 255, ${borderAlpha})`);
				root.style.setProperty("--dsh-l2-rim", `rgba(255, 255, 255, ${Math.min(1, borderAlpha * 2)})`);
				const shadowOpacity = typeof this.settings.dropShadowOpacity === "number" && !isNaN(this.settings.dropShadowOpacity) ? this.settings.dropShadowOpacity : .15;
				const shadowBlur = typeof this.settings.dropShadowBlur === "number" && !isNaN(this.settings.dropShadowBlur) ? this.settings.dropShadowBlur : 16;
				const shadowY = typeof this.settings.dropShadowY === "number" && !isNaN(this.settings.dropShadowY) ? this.settings.dropShadowY : 4;
				root.style.setProperty("--dsh-l2-shadow", `inset 0 1px 0 rgba(255, 255, 255, ${Math.max(.1, rimIntensityVal * .4)}), 0 ${shadowY * .35}px ${shadowBlur * .45}px rgba(0, 0, 0, ${shadowOpacity})`);
			}
			popoverObserver = null;
			mount() {
				document.documentElement.setAttribute(LIQUID_GLASS_ATTRIBUTE, "true");
				this.updateLayerCssVariables();
				ensureGlassAmbientScene();
			const sidebarUnderlay = ensureSidebarUnderlay();
			syncSidebarWidth(sidebarUnderlay);
			if (this.sidebarObserver === null) {
				this.sidebarObserver = new MutationObserver(() => {
					this.syncSidebarWidth(sidebarUnderlay);
				});
				this.sidebarObserver.observe(document.documentElement, { childList: true, subtree: true, attributes: true,  });
			}
				const canvas = document.querySelector("[data-dsh-glass-canvas]");
				if (canvas !== null) if (this.shaderHandle === null) this.shaderHandle = attachLiquidGlassShader(canvas, this.settings);
				else this.shaderHandle.update(this.settings);
				this.applyPopoverBlur();
				this.popoverObserver = new MutationObserver(() => {
					this.applyPopoverBlur();
				});
				this.popoverObserver.observe(document.body, {
					childList: true,
					subtree: true
				});
				this.tokenDisposer?.();
				if (this.ctx.theme?.overrideTokens) this.tokenDisposer = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, LIQUID_GLASS_TOKEN_OVERRIDES);
				if (this.seamDisposer === void 0) this.seamDisposer = startSeamStamper();
				this.applySettings();
			}
			applySettings() {
				this.updateLayerCssVariables();
				if (this.shaderHandle) this.shaderHandle.update(this.settings);
			}
			applyPopoverBlur() {
				const root = document.getElementById("root");
				if (root && root.style.filter) root.style.removeProperty("filter");
				for (const el of document.querySelectorAll("div[role=\"menu\"], div[role=\"listbox\"], [class*=\"Menu_list\"], [class*=\"MenuView_menu\"], [class*=\"PopupSelectView_card\"], div[aria-label*=\"suggestions\"], div[aria-label*=\"建议\"], div[aria-label*=\"命令\"], [data-dsh-model-menu], [class*=\"ModelSelect_menu\"], [class*=\"PermissionSelect_menu\"], [class*=\"Select_menu\"], [class*=\"CustomSelect_menu\"], [class*=\"Dropdown_menu\"], [class*=\"NxU6UG_panel\"], [class*=\"RemotePanel_panel\"], [data-dsh-context-panel], [class*=\"H57FiG_panel\"], [class*=\"ContextMeter_panel\"], div[role=\"dialog\"][aria-label*=\"移动端\"], div[role=\"dialog\"][aria-label*=\"远程控制\"], div[role=\"dialog\"][aria-label*=\"Remote\"], .dshMarketOverlayMask, [class*=\"dshMarketOverlayMask\"], .dshMarketOverlayPanel, [class*=\"dshMarketOverlayPanel\"], .dshMarketModal, [class*=\"dshMarketModal\"], [class*=\"SettingsRoot_mask\"], [class*=\"VOzbGW_mask\"], [class*=\"_mask\"], [class*=\"mask\"], [role=\"presentation\"] > div[aria-hidden=\"true\"]")) {
					if (el.dataset.dshPopoverBlurred === "true") continue;
					el.style.setProperty("background", "var(--dsh-l3-mask-bg)", "important");
					el.style.setProperty("backdrop-filter", "blur(var(--dsh-modal-blur, 24px))", "important");
					el.style.setProperty("-webkit-backdrop-filter", "blur(var(--dsh-modal-blur, 24px))", "important");
					el.dataset.dshPopoverBlurred = "true";
				}
			}
			unmount() {
				if (this.popoverObserver) {
					this.popoverObserver.disconnect();
					this.popoverObserver = null;
				}
				for (const el of document.querySelectorAll("[data-dsh-popover-blurred]")) {
					el.style.removeProperty("backdrop-filter");
					el.style.removeProperty("-webkit-backdrop-filter");
					el.style.removeProperty("background");
					el.style.removeProperty("border");
					el.style.removeProperty("border-radius");
					delete el.dataset.dshPopoverBlurred;
				}
				document.documentElement.removeAttribute(LIQUID_GLASS_ATTRIBUTE);
				document.documentElement.style.removeProperty("--dsh-l1-blur");
				document.documentElement.style.removeProperty("--dsh-l1-bg");
				document.documentElement.style.removeProperty("--dsh-l1-border");
				document.documentElement.style.removeProperty("--dsh-l1-opacity");
				document.documentElement.style.removeProperty("--dsh-modal-blur");
				document.documentElement.style.removeProperty("--dsh-l3-mask-opacity");
				document.documentElement.style.removeProperty("--dsh-l3-mask-bg");
				document.documentElement.style.removeProperty("--dsh-l2-darkening");
				document.documentElement.style.removeProperty("--dsh-l2-bg");
				document.documentElement.style.removeProperty("--dsh-l2-glass-tint");
				document.documentElement.style.removeProperty("--dsh-l2-blur");
				document.documentElement.style.removeProperty("--dsh-l2-border");
				document.documentElement.style.removeProperty("--dsh-l2-rim");
				document.documentElement.style.removeProperty("--dsh-l2-shadow");
				this.tokenDisposer?.();
				this.tokenDisposer = void 0;
				if (this.shaderHandle) {
					this.shaderHandle.dispose();
					this.shaderHandle = null;
				}
				if (this.chatMaskDisposer) { this.chatMaskDisposer(); this.chatMaskDisposer = null; }
			if (this.sidebarObserver) { this.sidebarObserver.disconnect(); this.sidebarObserver = null;
			chatMaskDisposer = null; } removeSidebarUnderlay(); removeGlassAmbientScene();
				this.seamDisposer?.();
				this.seamDisposer = void 0;
			}
			getEnabled() {
				return this.enabled;
			}
			setEnabled(val) {
				if (this.enabled === val) return;
				this.enabled = val;
				this.saveState();
				this.sync();
			}
			getSettings() {
				return { ...this.settings };
			}
			updateSettings(partial) {
				this.settings = {
					...this.settings,
					...partial
				};
				this.saveState();
				if (this.enabled) this.applySettings();
			}
		};
		//#endregion
		//#region \0dsh-css:C:\Agent code\deepseek-harness-插件\deepseek-harness-Liquid glass-Live Wallpaper\src\client\liquid-glass.module.css.mjs
		const css = "[data-dsh-liquid-glass] body{background:0 0!important}#root,html #root,body #root,[data-dsh-frame],[class*=AppFrame_frame],[class*=AppFrame_centerCol],[class*=AppFrame_sidebarCol],[class*=AppFrame_detailsCol],[data-shell-overlay],[class*=overlayLayer],[class*=dshMarket]{-webkit-filter:none!important}[data-dsh-liquid-glass]:has([data-sidebar-collapsed]) #dsh-sidebar-underlay,[data-dsh-liquid-glass]:has([class*=hHd-Xa_collapsed]) #dsh-sidebar-underlay{width:56px!important}[data-dsh-liquid-glass] #dsh-sidebar-underlay,[data-dsh-liquid-glass] [data-dsh-sidebar-underlay]{position:fixed!important;top:0!important;left:0!important;bottom:0!important;width:var(--dsh-sidebar-width,260px)!important;z-index:0!important;pointer-events:none!important;background:var(--dsh-l1-bg,rgba(10,16,28,0.35))!important;backdrop-filter:blur(var(--dsh-l1-blur,20px))!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,20px))!important;border-right:1px solid var(--dsh-l1-border,rgba(255,255,255,0.16))!important;box-shadow:inset -1px 0 0 rgba(255,255,255,0.08)!important;transition:width 160ms ease,opacity 160ms ease!important}[data-dsh-liquid-glass] [data-dsh-glass-ambient]{z-index:-1;pointer-events:none;background:#060b18;position:fixed;inset:0;overflow:hidden}[data-dsh-liquid-glass] [data-dsh-frame],[data-dsh-liquid-glass] [class*=AppFrame_frame],[data-dsh-liquid-glass] [class*=frame],[data-dsh-liquid-glass] [class*=AppFrame_centerCol],[data-dsh-liquid-glass] [class*=centerCol],[data-dsh-liquid-glass] [class*=centerSurface],[data-dsh-liquid-glass] [data-phase],[data-dsh-liquid-glass] [data-primary-page],[data-dsh-liquid-glass] [data-primary-page]>div{background:0 0!important}[data-dsh-liquid-glass] [data-phase=active] [class*=ConversationRoot_scrollBody],[data-dsh-liquid-glass] [data-phase=active] [class*=wSkVaW_scrollBody],[data-dsh-liquid-glass] [data-phase=active] [data-conversation-scroll],[data-dsh-liquid-glass] [data-phase=active] [data-dsh-chat-scroll]{background:0 0!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;margin:6px auto 10px auto!important;width:min(calc(100% - 64px),840px)!important;max-width:840px!important;align-self:center!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;border-radius:18px!important;box-shadow:inset 0 1px 0 #ffffff1f,0 8px 32px #00000059!important;overflow:hidden auto!important}[data-dsh-liquid-glass] [class*=composerSeat],[data-dsh-liquid-glass] [class*=wSkVaW_composerSeat],[data-dsh-liquid-glass] [class*=ConversationRoot_composerSeat]{position:sticky!important;bottom:0!important;z-index:10!important;background:0 0!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;box-shadow:none!important;padding-top:0!important;margin-top:0!important}[data-dsh-liquid-glass] [data-phase=active] [class*=viewArea],[data-dsh-liquid-glass] [data-phase=active] [class*=wSkVaW_viewArea],[data-dsh-liquid-glass] [data-phase=active] [class*=ChatView_scroll],[data-dsh-liquid-glass] [data-phase=active] [class*=Md3f7G_scroll]{padding-bottom:32px!important}[data-dsh-liquid-glass] [data-phase=hero] [data-dsh-chat-view],[data-dsh-liquid-glass] [data-phase=settling] [data-dsh-chat-view],[data-dsh-liquid-glass] [class*=ConversationRoot_scrollBody]:has([class*=composerHero])>div:first-child,[data-dsh-liquid-glass] [class*=wSkVaW_scrollBody]:has([class*=wSkVaW_composerHero])>div:first-child{-webkit-mask-image:none!important;mask-image:none!important}[data-dsh-liquid-glass] [data-phase=hero] [class*=ConversationRoot_scrollBody],[data-dsh-liquid-glass] [data-phase=hero] [class*=wSkVaW_scrollBody],[data-dsh-liquid-glass] [data-phase=hero] [data-conversation-scroll],[data-dsh-liquid-glass] [data-phase=settling] [class*=ConversationRoot_scrollBody],[data-dsh-liquid-glass] [data-phase=settling] [class*=wSkVaW_scrollBody],[data-dsh-liquid-glass] [data-phase=settling] [data-conversation-scroll],[data-dsh-liquid-glass] [class*=ConversationRoot_scrollBody]:has([class*=composerHero]),[data-dsh-liquid-glass] [class*=wSkVaW_scrollBody]:has([class*=wSkVaW_composerHero]){background:0 0!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;margin:0!important;width:100%!important;max-width:none!important;border:none!important;box-shadow:none!important}[data-dsh-liquid-glass] [class*=ChatView_root],[data-dsh-liquid-glass] [class*=Md3f7G_root],[data-dsh-liquid-glass] [class*=ChatView_scroll],[data-dsh-liquid-glass] [class*=Md3f7G_scroll],[data-dsh-liquid-glass] [data-conversation-body],[data-dsh-liquid-glass] [class*=ChatView_column],[data-dsh-liquid-glass] [class*=Md3f7G_column],[data-dsh-liquid-glass] [class*=ConversationRoot_viewArea],[data-dsh-liquid-glass] [class*=wSkVaW_viewArea]{background:0 0!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:none!important}[data-dsh-liquid-glass] [class*=ConversationRoot_header],[data-dsh-liquid-glass] [class*=wSkVaW_header]{background:0 0!important;border-bottom:1px solid var(--dsh-l1-border,#ffffff1f)!important}[data-dsh-liquid-glass] [class*=AppFrame_detailsCol],[data-dsh-liquid-glass] [class*=detailsCol],[data-dsh-liquid-glass] [data-dsh-details],[data-dsh-liquid-glass] [class*=DetailsPanel_root]{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border-left:1px solid var(--dsh-l1-border,#ffffff29)!important}[data-dsh-liquid-glass] [class*=AppFrame_sidebarCol],[data-dsh-liquid-glass] [class*=sidebarCol],[data-dsh-liquid-glass] [class*=SidebarRoot_root],[data-dsh-liquid-glass] [class*=SidebarRoot],[data-dsh-liquid-glass] [data-dsh-sidebar-root]{background:transparent!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:none!important;border-right:none!important;box-shadow:none!important}[data-dsh-liquid-glass] [class*=sidebarCol]>div,[data-dsh-liquid-glass] [class*=SidebarRoot_root]>div,[data-dsh-liquid-glass] [class*=SidebarRoot] [class*=regionArea],[data-dsh-liquid-glass] [class*=SidebarRoot] [class*=listArea],[data-dsh-liquid-glass] [class*=SidebarRoot] [class*=treeBody],[data-dsh-liquid-glass] [class*=sidebarCol] [class*=listArea],[data-dsh-liquid-glass] [class*=sidebarCol] [class*=treeBody]{background:0 0!important}[data-dsh-liquid-glass] [data-dsh-surface],[data-dsh-liquid-glass] [class*=SidebarRoot]>div:first-child button[class*=newSession],[data-dsh-liquid-glass] [class*=sidebarCol]>div:first-child button[class*=newSession]{-webkit-backdrop-filter:none!important;border:1px solid var(--dsh-l2-border,#ffffff29)!important;box-shadow:none!important;background:0 0!important;border-radius:10px!important;transition:transform .16s cubic-bezier(.16,1,.3,1),border-color .16s!important}[data-dsh-liquid-glass] [class*=SidebarRoot]>div:first-child button[class*=newSession]:hover,[data-dsh-liquid-glass] [class*=sidebarCol]>div:first-child button[class*=newSession]:hover{transform:translateY(-1px);border-color:var(--dsh-l2-rim,#ffffff52)!important}[data-dsh-liquid-glass] [class*=groupSection] button[class*=newSession],[data-dsh-liquid-glass] [class*=groupSection] [class*=newSession],[data-dsh-liquid-glass] [class*=groupSection] [class*=projectRow]{-webkit-backdrop-filter:none!important;box-shadow:none!important;background:0 0!important;border:none!important;transform:none!important}[data-dsh-liquid-glass] [class*=primaryActions] button,[data-dsh-liquid-glass] [class*=primaryActions] a{border-radius:10px!important;transition:all .14s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [class*=primaryActions] button:hover,[data-dsh-liquid-glass] [class*=primaryActions] a:hover{background:var(--dsh-l2-bg,#ffffff14)!important;border:1px solid var(--dsh-l2-border,#ffffff1f)!important}[data-dsh-liquid-glass] [class*=groupSection]{-webkit-backdrop-filter:none!important;border:1px solid var(--dsh-l2-border,#ffffff29)!important;box-shadow:none!important;background:0 0!important;border-radius:14px!important;margin-bottom:8px!important;padding:4px 6px!important;transition:border-color .18s!important}[data-dsh-liquid-glass] [class*=groupSection]:hover{border-color:var(--dsh-l2-rim,#ffffff52)!important}[data-dsh-liquid-glass] [class*=sessionRow]{cursor:pointer!important;pointer-events:auto!important;border-radius:8px!important;transition:all .12s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [class*=sessionRow]:hover{background:#ffffff14!important}[data-dsh-liquid-glass] [class*=sessionRow][class*=selected],[data-dsh-liquid-glass] [class*=_sessionRow][class*=_selected],[data-dsh-liquid-glass] [class*=projectRow][class*=selected],[data-dsh-liquid-glass] [class*=_projectRow][class*=_selected],[data-dsh-liquid-glass] [class*=searchResultRow][class*=selected],[data-dsh-liquid-glass] [class*=_searchResultRow][class*=_selected],html[data-dsh-liquid-glass] [class*=sessionRow][class*=selected],html[data-dsh-liquid-glass] [class*=projectRow][class*=selected],html[data-dsh-liquid-glass] [class*=searchResultRow][class*=selected]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff29 0%, #38bdf81a 100%)), var(--dsh-l2-bg,#0f172aa6)!important;border:1px solid var(--dsh-l2-border,#ffffff3d)!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff59, 0 3px 10px #0000002e)!important;border-radius:8px!important}[data-dsh-liquid-glass] [data-phase] [class*=composerSeat][class*=composerSeat]{background:0 0!important}[data-dsh-liquid-card],[data-dsh-liquid-glass] [class*=InputTrigger_box],[data-dsh-liquid-glass] [class*=ChatInput_container],[data-dsh-liquid-glass] [data-dsh-inputbar]>div,[data-dsh-liquid-glass] [data-composer-card],[data-dsh-liquid-glass] [data-conversation-composer],[data-dsh-liquid-glass] [class*=InputBar_card],[data-dsh-liquid-glass] [class*=uV2eYG_card],[data-dsh-liquid-glass] [class*=Composer_card]{background:0 0!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;border:1px solid var(--dsh-l2-border,#ffffff2e)!important;box-shadow:none!important;border-radius:20px!important}[data-dsh-liquid-glass] [data-composer-card] textarea,[data-dsh-liquid-glass] [class*=InputTrigger_box] textarea{text-shadow:0 1px 2px #00000073;color:#fff!important}[data-dsh-liquid-glass] [class*=Modal_mask],[data-dsh-liquid-glass] [class*=SettingsRoot_mask],[data-dsh-liquid-glass] [class*=mask],[data-dsh-liquid-glass] [class*=overlay]>[class*=mask],[data-dsh-liquid-glass] [data-radix-portal] [class*=mask],html[data-dsh-liquid-glass] [class*=mask],html[data-dsh-liquid-glass] [class*=overlay]>[class*=mask]{background:var(--dsh-l3-mask-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;transition:opacity .24s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [role=dialog][aria-modal=true],[data-dsh-liquid-glass] [aria-modal=true],[data-dsh-liquid-glass] [class*=SettingsRoot_panel],[data-dsh-liquid-glass] [class*=Modal_dialog],html[data-dsh-liquid-glass] [role=dialog][aria-modal=true],html[data-dsh-liquid-glass] [aria-modal=true],html[data-dsh-liquid-glass] [class*=SettingsRoot_panel],html[data-dsh-liquid-glass] [class*=Modal_dialog],html[data-dsh-liquid-glass] [class*=Modal_panel]{-webkit-backdrop-filter:none!important;border:1px solid var(--dsh-l1-border,#ffffff2e)!important;box-shadow:inset 0 1px 1px var(--dsh-l1-rim,#ffffff47), 0 24px 64px #0000008c!important;background:0 0!important;border-radius:24px!important}[data-dsh-liquid-glass] [class*=nav],[data-dsh-liquid-glass] [class*=content],[data-dsh-liquid-glass] [class*=nav],[data-dsh-liquid-glass] [class*=content],[data-dsh-liquid-glass] [class*=options],[data-dsh-liquid-glass] [class*=SettingsRoot_nav],[data-dsh-liquid-glass] [class*=SettingsRoot_content],[data-dsh-liquid-glass] [class*=SettingsRoot_options],[data-dsh-liquid-glass] [class*=Modal_content],[data-dsh-liquid-glass] [class*=Modal_body],[data-dsh-liquid-glass] [class*=SettingsDocumentAction_root],[data-dsh-liquid-glass] [class*=PluginsSettingsSection_section],[data-dsh-liquid-glass] [class*=PluginsSettingsSection_panel],[data-dsh-liquid-glass] [class*=PluginsSettingsSection_cards],[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_section],[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_catalog],[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_cards],[data-dsh-liquid-glass] [class*=GeneralSection_section],[data-dsh-liquid-glass] [class*=GeneralSection_panel],[data-dsh-liquid-glass] [class*=ModelsSection_section],[data-dsh-liquid-glass] [class*=ModelsSection_panel],[data-dsh-liquid-glass] [class*=ModelsSection_cards],[data-dsh-liquid-glass] [class*=options] [data-slot],[data-dsh-liquid-glass] [class*=SettingsRoot_options] [data-slot],html[data-dsh-liquid-glass] [class*=PluginsSettingsSection_section],html[data-dsh-liquid-glass] [class*=PluginsSettingsSection_panel],html[data-dsh-liquid-glass] [class*=PluginsSettingsSection_cards],html[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_section],html[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_catalog],html[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_cards],html[data-dsh-liquid-glass] [class*=GeneralSection_section],html[data-dsh-liquid-glass] [class*=GeneralSection_panel],html[data-dsh-liquid-glass] [class*=ModelsSection_section],html[data-dsh-liquid-glass] [class*=ModelsSection_panel],html[data-dsh-liquid-glass] [class*=ModelsSection_cards],html[data-dsh-liquid-glass] [class*=SettingsRoot_content],html[data-dsh-liquid-glass] [class*=SettingsRoot_options]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important}[data-dsh-liquid-glass] nav,[data-dsh-liquid-glass] nav[class*=_nav],[data-dsh-liquid-glass] nav[class*=SettingsRoot_nav]{border-right:1px solid var(--dsh-l1-border,#ffffff1f)!important;background:0 0!important}[data-dsh-liquid-glass] [class*=_navIcon],[data-dsh-liquid-glass] [class*=SettingsRoot_navTitle],[data-dsh-liquid-glass] [class*=SettingsRoot_navList],[data-dsh-liquid-glass] [class*=SettingsRoot_navLabel],[data-dsh-liquid-glass] [class*=SettingsRoot_navIcon]{border:none!important}[data-dsh-liquid-glass] [class*=_header],[data-dsh-liquid-glass] [class*=SettingsRoot_header]{border-bottom:1px solid var(--dsh-l1-border,#ffffff14)!important;background:0 0!important}[data-dsh-liquid-glass] [class*=_navCell],[data-dsh-liquid-glass] [class*=SettingsRoot_navCell],[data-dsh-liquid-glass] [class*=navCell]{color:#ffffffbf!important;background:0 0!important;border:1px solid #0000!important;border-radius:12px!important;transition:all .16s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [class*=_navCell]:hover:not([class*=_active]):not([class*=active]):not([aria-current=true]),[data-dsh-liquid-glass] [class*=SettingsRoot_navCell]:hover:not([class*=_active]):not([class*=active]):not([aria-current=true]),[data-dsh-liquid-glass] [class*=navCell]:hover:not([class*=_active]):not([class*=active]):not([aria-current=true]){color:#fff!important;background:#ffffff14!important;border-color:#ffffff1f!important}[data-dsh-liquid-glass] [class*=_navCell][class*=_active],[data-dsh-liquid-glass] [class*=_navCell][class*=active],[data-dsh-liquid-glass] [class*=_navCell][aria-current=true],[data-dsh-liquid-glass] [class*=SettingsRoot_navCell][class*=_active],[data-dsh-liquid-glass] [class*=SettingsRoot_navCell][class*=active],[data-dsh-liquid-glass] [class*=SettingsRoot_navCell][aria-current=true],[data-dsh-liquid-glass] [class*=navCell][class*=_active],[data-dsh-liquid-glass] [class*=navCell][class*=active],[data-dsh-liquid-glass] [class*=navCell][aria-current=true]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff29 0%, #ffffff0a 100%)), var(--dsh-l2-bg,#0a101c8c)!important;-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px))!important;border:1px solid var(--dsh-l2-border,#ffffff42)!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #fff6, 0 4px 14px #0003)!important;color:#fff!important;text-shadow:0 1px 2px #00000059!important;font-weight:600!important}[data-dsh-liquid-glass] [class*=Menu_list],[data-dsh-liquid-glass] [class*=Menu_submenu],[data-dsh-liquid-glass] [class*=AgentPresetSeat_menu],[data-dsh-liquid-glass] [class*=AgentPresetSeat_popover],[data-dsh-liquid-glass] [class*=PresetMenu_menu]{-webkit-backdrop-filter:none!important;border:1px solid var(--dsh-l1-border,#ffffff2e)!important;box-shadow:inset 0 1px 1px var(--dsh-l1-rim,#ffffff47), 0 24px 64px #0000008c!important;background:0 0!important;border-radius:18px!important;padding:8px!important}[data-dsh-liquid-glass] [class*=Menu_viewport]{background:0 0!important}[data-dsh-liquid-glass] [class*=Menu_item],[data-dsh-liquid-glass] [class*=MenuView_item],[data-dsh-liquid-glass] [role=menuitem]{color:#ffffffe6!important;border-radius:12px!important;transition:all .12s!important}[data-dsh-liquid-glass] [class*=Menu_item]:hover,[data-dsh-liquid-glass] [class*=MenuView_item]:hover,[data-dsh-liquid-glass] [role=menuitem]:hover{color:#fff!important;background:#ffffff14!important}[data-dsh-liquid-glass] [class*=ModelSelect_modelInlinePanel],[data-dsh-liquid-glass] [class*=ModelSelect_effortInlinePanel],[data-dsh-liquid-glass] [class*=modelInlinePanel],[data-dsh-liquid-glass] [class*=effortInlinePanel]{background:var(--dsh-l3-mask-bg,#0a101c66)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;border-radius:14px!important;box-shadow:inset 0 1px #ffffff1f,0 4px 12px #00000026!important}[data-dsh-liquid-glass] [class*=ModelSelect_cell]{color:#fff!important;border-radius:14px!important;transition:background .14s!important}[data-dsh-liquid-glass] [class*=ModelSelect_cell]:hover,[data-dsh-liquid-glass] [class*=ModelSelect_cell][aria-expanded=true],[data-dsh-liquid-glass] [class*=ModelSelect_cellActive]{background:#ffffff14!important}[data-dsh-liquid-glass] [class*=ModelSelect_option]{color:#ffffffe6!important;border-radius:12px!important;transition:all .12s!important}[data-dsh-liquid-glass] [class*=ModelSelect_option]:hover{transform:translate(2px);color:#fff!important;background:#ffffff14!important}[data-dsh-liquid-glass] [class*=ModelSelect_option][class*=selected],[data-dsh-liquid-glass] [class*=ModelSelect_selected]{color:#fff!important;background:linear-gradient(135deg,#38bdf838 0%,#6366f11f 100%),#ffffff14!important;border:1px solid #fff3!important}[data-dsh-liquid-glass] [class*=ModelSelect_groupTitle]{color:#38bdf8!important;letter-spacing:.05em!important;font-size:11px!important;font-weight:600!important}[data-dsh-liquid-glass] [class*=ModelSelect_segmentedSliderTrack],[data-dsh-liquid-glass] [class*=segmentedSliderTrack]{background:var(--dsh-l3-mask-bg,#0a101c8c)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff2e)!important;border-radius:12px!important;box-shadow:inset 0 1px 3px #00000059!important}[data-dsh-liquid-glass] [class*=ModelSelect_slidingIndicator]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff2e 0%, #ffffff0f 100%)), var(--dsh-l2-bg,transparent)!important;border:1px solid var(--dsh-l2-border,#ffffff47)!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff73, 0 2px 8px #00000040)!important;-webkit-backdrop-filter:blur(var(--dsh-l2-blur,12px))!important;border-radius:9px!important}[data-dsh-liquid-glass] [class*=ModelSelect_effortCurrentLabel]{color:#fff!important}[data-dsh-liquid-glass] [class*=ModelSelect_effortGlowDot]{background:#ffffffd9!important;box-shadow:0 0 6px #fff9!important}[data-dsh-liquid-glass] [class*=ModelSelect_segmentButton]{color:#ffffffa6!important;transition:color .14s!important}[data-dsh-liquid-glass] [class*=ModelSelect_segmentButton]:hover{color:#fff!important}[data-dsh-liquid-glass] [class*=ModelSelect_segmentButtonActive]{color:#fff!important;text-shadow:none!important;font-weight:600!important}[data-dsh-liquid-glass] [class*=SettingsRoot_options]>div,[data-dsh-liquid-glass] [class*=SettingsRoot_options] section,[data-dsh-liquid-glass] [class*=SettingsRoot_options] [role=tabpanel],[data-dsh-liquid-glass] [class*=SettingsRoot_options] ul,[data-dsh-liquid-glass] [class*=SettingsRoot_options] [data-slot],html[data-dsh-liquid-glass] [class*=SettingsRoot_options]>div,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] section,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [role=tabpanel],html[data-dsh-liquid-glass] [class*=SettingsRoot_options] ul,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [data-slot]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important}html[data-dsh-liquid-glass] [class*=SettingsRoot_options] ul>li,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [data-slot]>*,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=card]:not([class*=cards]),html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Card]:not([class*=cards]),html[data-dsh-liquid-glass] [class*=PluginsSettingsSection_cards]>li,html[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_cards]>li,html[data-dsh-liquid-glass] [class*=ModelsSection_rowCard],html[data-dsh-liquid-glass] [class*=ModelsSection_addCard],html[data-dsh-liquid-glass] [class*=ModelsSection_setupCard],html[data-dsh-liquid-glass] [class*=ModelsSection_editor],html[data-dsh-liquid-glass] [class*=AgentPresetSection_card],html[data-dsh-liquid-glass] [class*=settings-card],html[data-dsh-liquid-glass] [class*=RemoteSettingsCard],html[data-dsh-liquid-glass] ._LPEPa_qwen-vision-card,html[data-dsh-liquid-glass] [class*=qwen-vision-card],[data-dsh-liquid-glass] [class*=SettingsRoot_options] ul>li,[data-dsh-liquid-glass] [class*=SettingsRoot_options] [data-slot]>*,[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=card]:not([class*=cards]),[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Card]:not([class*=cards]),[data-dsh-liquid-glass] [class*=PluginsSettingsSection_cards]>li,[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_cards]>li,[data-dsh-liquid-glass] [class*=ModelsSection_rowCard],[data-dsh-liquid-glass] [class*=ModelsSection_addCard],[data-dsh-liquid-glass] [class*=ModelsSection_setupCard],[data-dsh-liquid-glass] [class*=ModelsSection_editor],[data-dsh-liquid-glass] [class*=AgentPresetSection_card],[data-dsh-liquid-glass] [class*=settings-card],[data-dsh-liquid-glass] [class*=RemoteSettingsCard],[data-dsh-liquid-glass] ._LPEPa_qwen-vision-card,[data-dsh-liquid-glass] [class*=qwen-vision-card]{box-sizing:border-box!important;border:1px solid var(--dsh-l2-border,#ffffff38)!important;-webkit-backdrop-filter:none!important;background:0 0!important;border-radius:16px!important;width:100%!important;list-style:none!important;transition:all .18s cubic-bezier(.16,1,.3,1)!important;display:block!important;overflow:hidden!important;box-shadow:inset 0 1px #ffffff59,0 4px 16px #0000002e!important}html[data-dsh-liquid-glass] [class*=SettingsRoot_options] ul>li:hover,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [data-slot]>:hover,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=card]:not([class*=cards]):hover,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Card]:not([class*=cards]):hover,html[data-dsh-liquid-glass] [class*=PluginsSettingsSection_cards]>li:hover,html[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_cards]>li:hover,html[data-dsh-liquid-glass] [class*=ModelsSection_rowCard]:hover,html[data-dsh-liquid-glass] [class*=AgentPresetSection_card]:hover,html[data-dsh-liquid-glass] ._LPEPa_qwen-vision-card:hover,[data-dsh-liquid-glass] [class*=SettingsRoot_options] ul>li:hover,[data-dsh-liquid-glass] [class*=SettingsRoot_options] [data-slot]>:hover,[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=card]:not([class*=cards]):hover,[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Card]:not([class*=cards]):hover,[data-dsh-liquid-glass] [class*=PluginsSettingsSection_cards]>li:hover,[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_cards]>li:hover,[data-dsh-liquid-glass] [class*=ModelsSection_rowCard]:hover,[data-dsh-liquid-glass] [class*=AgentPresetSection_card]:hover,[data-dsh-liquid-glass] ._LPEPa_qwen-vision-card:hover{transform:translateY(-2px);border-color:var(--dsh-l2-rim,#ffffff61)!important;box-shadow:inset 0 1px #ffffff73,0 8px 24px #00000040!important}html[data-dsh-liquid-glass] [class*=PluginCard_cardOpen],html[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_card][data-open=true],html[data-dsh-liquid-glass] [class*=AgentPresetSection_cardActive],html[data-dsh-liquid-glass] [class*=cardActive],[data-dsh-liquid-glass] [class*=PluginCard_cardOpen],[data-dsh-liquid-glass] [class*=PluginInventorySettingsTab_card][data-open=true],[data-dsh-liquid-glass] [class*=AgentPresetSection_cardActive],[data-dsh-liquid-glass] [class*=cardActive]{-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px)) saturate(140%)!important;border-color:var(--dsh-l2-rim,#ffffff7a)!important;background:#ffffff14!important;box-shadow:inset 0 1px #ffffff80,0 12px 32px #00000047!important}html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=card]>button:first-child,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=card]>div:first-child,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Card]>button:first-child,html[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Card]>div:first-child,html[data-dsh-liquid-glass] ._LPEPa_qwen-vision-header,[data-dsh-liquid-glass] ._LPEPa_qwen-vision-header{box-sizing:border-box!important;padding:14px 16px!important}[data-dsh-liquid-glass] [class*=cardMain],[data-dsh-liquid-glass] [class*=cardHead],[data-dsh-liquid-glass] [class*=cardName],[data-dsh-liquid-glass] [class*=cardDesc],[data-dsh-liquid-glass] [class*=cardId],[data-dsh-liquid-glass] [class*=cardFoot],[data-dsh-liquid-glass] [class*=cardContent],[data-dsh-liquid-glass] [class*=cardDetails],[data-dsh-liquid-glass] [class*=cardHeader],[data-dsh-liquid-glass] [class*=cardTrailing],[data-dsh-liquid-glass] [class*=cardBrokenReason],[data-dsh-liquid-glass] [class*=head]:not([class*=groupHead]),[data-dsh-liquid-glass] [class*=text],[data-dsh-liquid-glass] [class*=body]:not([class*=Modal_body]),[data-dsh-liquid-glass] ._LPEPa_qwen-vision-header,[data-dsh-liquid-glass] ._LPEPa_qwen-vision-body{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important}[data-dsh-liquid-glass] [class*=cardFoot],[data-dsh-liquid-glass] [class*=cardDetails],[data-dsh-liquid-glass] [class*=PluginCard_body]{border-top:1px solid var(--dsh-l2-border,#ffffff1f)!important}[data-dsh-liquid-glass] [class*=SettingsRoot_options] input:not([class*=number]):not([class*=slider]),[data-dsh-liquid-glass] [class*=SettingsRoot_options] select,[data-dsh-liquid-glass] [class*=SettingsRoot_options] textarea,[data-dsh-liquid-glass] [class*=options] input:not([class*=number]):not([class*=slider]),[data-dsh-liquid-glass] [class*=options] select,[data-dsh-liquid-glass] [class*=options] textarea,[data-dsh-liquid-glass] [class*=ModelsSection] input,[data-dsh-liquid-glass] [class*=ModelsSection] select,[data-dsh-liquid-glass] [class*=ModelsSection] textarea,[data-dsh-liquid-glass] [class*=ModelsSection_input],[data-dsh-liquid-glass] [class*=ModelsSection_selectInput],[data-dsh-liquid-glass] ._LPEPa_qwen-vision-input{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;color:#fff!important;border-radius:10px!important;font-size:13px!important;transition:all .16s cubic-bezier(.16,1,.3,1)!important;box-shadow:inset 0 1px 1px #0003!important}[data-dsh-liquid-glass] [class*=SettingsRoot_options] input:not([class*=number]):not([class*=slider]):focus,[data-dsh-liquid-glass] [class*=SettingsRoot_options] select:focus,[data-dsh-liquid-glass] [class*=SettingsRoot_options] textarea:focus,[data-dsh-liquid-glass] [class*=options] input:not([class*=number]):not([class*=slider]):focus,[data-dsh-liquid-glass] [class*=options] select:focus,[data-dsh-liquid-glass] [class*=options] textarea:focus,[data-dsh-liquid-glass] [class*=ModelsSection] input:focus,[data-dsh-liquid-glass] [class*=ModelsSection] select:focus,[data-dsh-liquid-glass] [class*=ModelsSection] textarea:focus,[data-dsh-liquid-glass] [class*=ModelsSection_input]:focus,[data-dsh-liquid-glass] [class*=ModelsSection_selectInput]:focus,[data-dsh-liquid-glass] ._LPEPa_qwen-vision-input:focus{border-color:#38bdf8!important;outline:none!important;box-shadow:inset 0 1px 1px #0003,0 0 12px #38bdf859!important}[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=badge],[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Badge],[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=tag],[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=Tag],[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=configTag],[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=pending],[data-dsh-liquid-glass] [class*=SettingsRoot_options] [class*=inUse],[data-dsh-liquid-glass] [class*=options] [class*=badge],[data-dsh-liquid-glass] [class*=options] [class*=Badge],[data-dsh-liquid-glass] [class*=options] [class*=tag],[data-dsh-liquid-glass] [class*=options] [class*=Tag],[data-dsh-liquid-glass] [class*=options] [class*=configTag],[data-dsh-liquid-glass] [class*=options] [class*=pending],[data-dsh-liquid-glass] [class*=options] [class*=inUse],[data-dsh-liquid-glass] [class*=AgentPresetSection_inUse],[data-dsh-liquid-glass] [class*=inUse],html[data-dsh-liquid-glass] [class*=AgentPresetSection_inUse],html[data-dsh-liquid-glass] [class*=inUse]{-webkit-backdrop-filter:blur(var(--dsh-l1-blur,16px)) saturate(140%)!important;border:1px solid var(--dsh-l2-rim,#ffffff52)!important;color:#fff!important;text-shadow:0 1px 2px #0006!important;background:#ffffff1f!important;border-radius:999px!important;padding:1px 8px!important;font-size:11px!important;font-weight:500!important;line-height:17px!important;box-shadow:inset 0 1px #fff6,0 2px 8px #00000040!important}[data-dsh-liquid-glass] [class*=SettingsRoot_options] button:not([class*=trigger]):not([class*=close]):not([class*=tab]):not([class*=SegmentedControl_item]):not([class*=seg]),[data-dsh-liquid-glass] [class*=options] button:not([class*=trigger]):not([class*=close]):not([class*=tab]):not([class*=SegmentedControl_item]):not([class*=seg]),[data-dsh-liquid-glass] [class*=selector],[data-dsh-liquid-glass] button[class*=selector]{-webkit-backdrop-filter:none!important;border:1px solid var(--dsh-l2-border,#fff3)!important;color:#ffffffe6!important;background:0 0!important;border-radius:12px!important;transition:all .14s cubic-bezier(.16,1,.3,1)!important;box-shadow:inset 0 1px #ffffff4d!important}[data-dsh-liquid-glass] [class*=SettingsRoot_options] button:not([class*=trigger]):not([class*=close]):not([class*=tab]):not([class*=SegmentedControl_item]):not([class*=seg]):hover:not(:disabled),[data-dsh-liquid-glass] [class*=options] button:not([class*=trigger]):not([class*=close]):not([class*=tab]):not([class*=SegmentedControl_item]):not([class*=seg]):hover:not(:disabled),[data-dsh-liquid-glass] [class*=selector]:hover:not(:disabled),[data-dsh-liquid-glass] button[class*=selector]:hover:not(:disabled){transform:translateY(-1px);border-color:var(--dsh-l2-rim,#ffffff73)!important;box-shadow:inset 0 1px #ffffff80,0 4px 12px #0003!important}[data-dsh-liquid-glass] [class*=SettingsRoot_options] button[class*=enable]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=SettingsRoot_options] button[class*=primary]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=SettingsRoot_options] button[class*=save]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=options] button[class*=enable]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=options] button[class*=primary]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=options] button[class*=save]:hover:not(:disabled),[data-dsh-liquid-glass] ._LPEPa_qwen-vision-btn-primary:hover:not(:disabled){background:linear-gradient(135deg, #ffffff5c 0%, #ffffff24 100%), var(--dsh-l2-bg,#0f172abf)!important;border-color:var(--dsh-l2-rim,#ffffff8c)!important;transform:translateY(-1px)scale(1.02)!important;box-shadow:inset 0 1px #ffffffb3,0 6px 18px #00000059!important}[data-dsh-liquid-glass] [class*=_addCard],[data-dsh-liquid-glass] [class*=_setupCard],[data-dsh-liquid-glass] [class*=_rowCard],[data-dsh-liquid-glass] [class*=addCard],[data-dsh-liquid-glass] [class*=setupCard],[data-dsh-liquid-glass] [class*=rowCard]{-webkit-backdrop-filter:none!important;border:1px solid var(--dsh-l2-border,#ffffff3d)!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff61, 0 6px 20px #0003)!important;background:0 0!important;border-radius:16px!important;transition:all .18s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [class*=_addCard]:hover,[data-dsh-liquid-glass] [class*=_setupCard]:hover,[data-dsh-liquid-glass] [class*=_rowCard]:hover{border-color:var(--dsh-l2-rim,#ffffff61)!important;box-shadow:inset 0 1px #ffffff73,0 8px 24px #00000040!important}[data-dsh-liquid-glass] [class*=_rowCard] [class*=_editor],[data-dsh-liquid-glass] [class*=_addCard] [class*=_editor],[data-dsh-liquid-glass] [class*=_setupCard] [class*=_editor],[data-dsh-liquid-glass] [class*=rowCard] [class*=editor],[data-dsh-liquid-glass] [class*=addCard] [class*=editor],[data-dsh-liquid-glass] [class*=setupCard] [class*=editor]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important;padding:10px 0 0!important}[data-dsh-liquid-glass] [class*=_editor]:not([class*=_rowCard] [class*=_editor]):not([class*=_addCard] [class*=_editor]):not([class*=_setupCard] [class*=_editor]){background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff24 0%, #ffffff08 100%)), var(--dsh-l2-bg,#0a101c8c)!important;-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px))!important;border:1px solid var(--dsh-l2-border,#ffffff3d)!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff61, 0 6px 20px #0003)!important;border-radius:16px!important}[data-dsh-liquid-glass] [class*=_rowName],[data-dsh-liquid-glass] [class*=rowName]{color:#fff!important;text-shadow:0 1px 2px #00000059!important;font-size:14px!important;font-weight:600!important}[data-dsh-liquid-glass] [class*=_rowTag],[data-dsh-liquid-glass] [class*=rowTag]{border:1px solid var(--dsh-l1-border,#ffffff29)!important;color:#ffffffbf!important;background:#ffffff14!important;border-radius:999px!important;padding:1px 8px!important;font-size:11px!important}[data-dsh-liquid-glass] [class*=_credentialDotConfigured],[data-dsh-liquid-glass] [class*=credentialDotConfigured]{background:#22c55e!important;box-shadow:0 0 8px #22c55eb3!important}[data-dsh-liquid-glass] [class*=_credentialDotMissing],[data-dsh-liquid-glass] [class*=credentialDotMissing]{background:#eab308!important;box-shadow:0 0 6px #eab30880!important}[data-dsh-liquid-glass] [class*=_rowCard] [class*=_iconButton],[data-dsh-liquid-glass] [class*=_rowHead] [class*=_iconButton],[data-dsh-liquid-glass] [class*=_rowCard] [class*=_rowActions] button,[data-dsh-liquid-glass] [class*=rowCard] [class*=iconButton],[data-dsh-liquid-glass] [class*=rowHead] [class*=iconButton],[data-dsh-liquid-glass] [class*=rowCard] [class*=rowActions] button{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;color:#ffffffd9!important;border-radius:8px!important;padding:3px 10px!important;font-size:12px!important;transition:all .14s cubic-bezier(.16,1,.3,1)!important;box-shadow:inset 0 1px 1px #00000026!important}[data-dsh-liquid-glass] [class*=_rowCard] [class*=_iconButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=_rowHead] [class*=_iconButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=_rowCard] [class*=_rowActions] button:hover:not(:disabled),[data-dsh-liquid-glass] [class*=rowCard] [class*=iconButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=rowHead] [class*=iconButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=rowCard] [class*=rowActions] button:hover:not(:disabled){color:#fff!important;background:#ffffff1a!important;border-color:#ffffff4d!important;transform:translateY(-1px)!important}[data-dsh-liquid-glass] [class*=sessionRow] [class*=rowActions] button,[data-dsh-liquid-glass] [class*=_sessionRow] [class*=_rowActions] button,[data-dsh-liquid-glass] [class*=projectRow] [class*=rowActions] button,[data-dsh-liquid-glass] [class*=_projectRow] [class*=_rowActions] button{-webkit-backdrop-filter:none!important;color:#ffffffb3!important;width:20px!important;min-width:20px!important;height:20px!important;box-shadow:none!important;background:0 0!important;border:none!important;border-radius:4px!important;justify-content:center!important;align-items:center!important;padding:2px!important;display:inline-flex!important}[data-dsh-liquid-glass] [class*=sessionRow] [class*=rowActions] button:hover,[data-dsh-liquid-glass] [class*=_sessionRow] [class*=_rowActions] button:hover,[data-dsh-liquid-glass] [class*=projectRow] [class*=rowActions] button:hover,[data-dsh-liquid-glass] [class*=_projectRow] [class*=_rowActions] button:hover{color:#fff!important;background:#ffffff26!important}[data-dsh-liquid-glass] [class*=sessionRow] [class*=rowActions] button svg,[data-dsh-liquid-glass] [class*=_sessionRow] [class*=_rowActions] button svg,[data-dsh-liquid-glass] [class*=projectRow] [class*=rowActions] button svg,[data-dsh-liquid-glass] [class*=_projectRow] [class*=_rowActions] button svg{width:16px!important;height:16px!important;color:inherit!important;fill:currentColor!important;display:block!important}[data-dsh-liquid-glass] [class*=_rowCard] [class*=_iconButtonDanger]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=_rowHead] [class*=_iconButtonDanger]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=_rowCard] [class*=_dangerButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=rowCard] [class*=iconButtonDanger]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=rowCard] [class*=dangerButton]:hover:not(:disabled){color:#f87171!important;background:#ef44441f!important;border-color:#ef444473!important;box-shadow:0 0 10px #ef444440!important}[data-dsh-liquid-glass] [class*=WorkspaceBrowser] [class*=iconButton],[data-dsh-liquid-glass] [class*=WorkspaceBrowser] [class*=_iconButton],[data-dsh-liquid-glass] [class*=sectionHeader] [class*=iconButton],[data-dsh-liquid-glass] [class*=sectionHeader] [class*=_iconButton],[data-dsh-liquid-glass] [class*=SidebarRoot] [class*=iconButton],[data-dsh-liquid-glass] [class*=SidebarRoot] [class*=_iconButton]{box-shadow:none!important;width:28px!important;height:28px!important;color:var(--dsw-alias-label-secondary,#ffffffb3)!important;background:0 0!important;border:none!important;border-radius:50%!important;padding:0!important}[data-dsh-liquid-glass] [class*=WorkspaceBrowser] [class*=iconButton]:hover,[data-dsh-liquid-glass] [class*=WorkspaceBrowser] [class*=_iconButton]:hover,[data-dsh-liquid-glass] [class*=sectionHeader] [class*=iconButton]:hover,[data-dsh-liquid-glass] [class*=sectionHeader] [class*=_iconButton]:hover,[data-dsh-liquid-glass] [class*=SidebarRoot] [class*=iconButton]:hover,[data-dsh-liquid-glass] [class*=SidebarRoot] [class*=_iconButton]:hover{color:#fff!important;background:#ffffff1a!important}[data-dsh-liquid-glass] [class*=SidebarRoot][class*=collapsed] [class*=primaryActions],[data-dsh-liquid-glass] [class*=SidebarRoot][class*=_collapsed] [class*=_primaryActions]{gap:12px!important;margin-bottom:12px!important}[data-dsh-liquid-glass] [class*=collapsed] [class*=regionArea] [class*=sectionHeader],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_regionArea] [class*=_sectionHeader],[data-dsh-liquid-glass] [class*=rail] [class*=sectionHeader],[data-dsh-liquid-glass] [class*=_rail] [class*=_sectionHeader],[data-dsh-liquid-glass] [class*=collapsed] [class*=regionArea] [class*=search],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_regionArea] [class*=_search],[data-dsh-liquid-glass] [class*=rail] [class*=search],[data-dsh-liquid-glass] [class*=_rail] [class*=_search]{box-sizing:border-box!important;justify-content:center!important;align-items:center!important;width:36px!important;max-width:36px!important;height:36px!important;margin:0 auto 12px!important;padding:0!important}[data-dsh-liquid-glass] [class*=collapsed] [class*=regionArea] [class*=headerActions],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_regionArea] [class*=_headerActions],[data-dsh-liquid-glass] [class*=rail] [class*=headerActions],[data-dsh-liquid-glass] [class*=_rail] [class*=_headerActions],[data-dsh-liquid-glass] [class*=collapsed] [class*=regionArea] [class*=iconButton],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_regionArea] [class*=_iconButton],[data-dsh-liquid-glass] [class*=rail] [class*=iconButton],[data-dsh-liquid-glass] [class*=_rail] [class*=_iconButton],[data-dsh-liquid-glass] [class*=collapsed] [class*=regionArea] [class*=searchButton],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_regionArea] [class*=_searchButton],[data-dsh-liquid-glass] [class*=rail] [class*=searchButton],[data-dsh-liquid-glass] [class*=_rail] [class*=_searchButton]{width:36px!important;max-width:36px!important;height:36px!important;color:var(--dsw-alias-label-primary)!important;box-sizing:border-box!important;justify-content:center!important;align-items:center!important;margin:0!important;padding:0!important;line-height:0!important;display:inline-flex!important}[data-dsh-liquid-glass] [class*=collapsed] [class*=toggle] [class*=panelIcon],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_toggle] [class*=_panelIcon]{display:none!important}[data-dsh-liquid-glass] [class*=collapsed] [class*=toggle]:hover [class*=panelIcon],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_toggle]:hover [class*=_panelIcon]{display:block!important}[data-dsh-liquid-glass] [class*=collapsed] [class*=toggle]:hover [class*=railFish],[data-dsh-liquid-glass] [class*=_collapsed] [class*=_toggle]:hover [class*=_railFish]{display:none!important}[data-dsh-liquid-glass] [class*=_rowCard] [class*=_input],[data-dsh-liquid-glass] [class*=_addCard] [class*=_input],[data-dsh-liquid-glass] [class*=_setupCard] [class*=_input],[data-dsh-liquid-glass] [class*=_editor] [class*=_input],[data-dsh-liquid-glass] [class*=_selectInput],[data-dsh-liquid-glass] [class*=_field] input,[data-dsh-liquid-glass] [class*=_field] select,[data-dsh-liquid-glass] [class*=_field] textarea{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;color:#fff!important;border-radius:10px!important;font-size:13px!important;transition:all .16s cubic-bezier(.16,1,.3,1)!important;box-shadow:inset 0 1px 1px #0003!important}[data-dsh-liquid-glass] [class*=_rowCard] [class*=_input]:focus,[data-dsh-liquid-glass] [class*=_addCard] [class*=_input]:focus,[data-dsh-liquid-glass] [class*=_setupCard] [class*=_input]:focus,[data-dsh-liquid-glass] [class*=_editor] [class*=_input]:focus,[data-dsh-liquid-glass] [class*=_selectInput]:focus,[data-dsh-liquid-glass] [class*=_field] input:focus,[data-dsh-liquid-glass] [class*=_field] select:focus,[data-dsh-liquid-glass] [class*=_field] textarea:focus{border-color:#38bdf8!important;outline:none!important;box-shadow:inset 0 1px 1px #0003,0 0 12px #38bdf859!important}[data-dsh-liquid-glass] [class*=Composer] textarea,[data-dsh-liquid-glass] [class*=composer] textarea,[data-dsh-liquid-glass] [class*=Composer] [class*=_input],[data-dsh-liquid-glass] [class*=composer] [class*=_input],[data-dsh-liquid-glass] [class*=Composer_input],[data-dsh-liquid-glass] [class*=Composer_editor],[data-dsh-liquid-glass] textarea[placeholder*=描述你想要构建的内容],[data-dsh-liquid-glass] textarea[class*=input]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important;outline:none!important}[data-dsh-liquid-glass] [class*=_selectInput] option,[data-dsh-liquid-glass] [class*=_field] select option{color:#fff!important;background:#0f172a!important}[data-dsh-liquid-glass] [class*=_modelEmpty],[data-dsh-liquid-glass] [class*=modelEmpty]{background:var(--dsh-l1-bg,#0a101c59)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px dashed var(--dsh-l1-border,#ffffff2e)!important;color:#ffffffb3!important;border-radius:10px!important;padding:12px 16px!important;box-shadow:inset 0 1px 1px #00000026!important}[data-dsh-liquid-glass] [class*=_addButton],[data-dsh-liquid-glass] [class*=addButton]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff14 0%, #ffffff03 100%)), var(--dsh-l2-bg,transparent)!important;border:1px dashed var(--dsh-l2-border,#ffffff47)!important;color:#ffffffd9!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff40, 0 3px 10px #00000026)!important;border-radius:14px!important;transition:all .16s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [class*=_addButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=addButton]:hover:not(:disabled){color:#fff!important;background:#38bdf814!important;border-color:#38bdf8!important;transform:translateY(-1px)!important;box-shadow:inset 0 1px #fff6,0 6px 18px #38bdf833!important}[data-dsh-liquid-glass] [class*=_secondaryButton],[data-dsh-liquid-glass] [class*=_linkButton],[data-dsh-liquid-glass] [class*=_addModelButton]{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;color:#ffffffd9!important;border-radius:10px!important;transition:all .14s cubic-bezier(.16,1,.3,1)!important;box-shadow:inset 0 1px 1px #00000026!important}[data-dsh-liquid-glass] [class*=_secondaryButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=_linkButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=_addModelButton]:hover:not(:disabled){color:#fff!important;background:#ffffff14!important;border-color:#ffffff4d!important;transform:translateY(-1px)!important}[data-dsh-liquid-glass] [class*=_primaryButton],[data-dsh-liquid-glass] [class*=primaryButton]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff3d 0%, #ffffff14 100%)), var(--dsh-l2-bg,#0f172aa6)!important;-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px))!important;border:1px solid var(--dsh-l2-border,#ffffff52)!important;color:#fff!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff8c, 0 4px 14px #00000040)!important;border-radius:10px!important;font-weight:600!important;transition:all .16s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [class*=_primaryButton]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=primaryButton]:hover:not(:disabled){background:linear-gradient(135deg, #ffffff5c 0%, #ffffff24 100%), var(--dsh-l2-bg,#0f172abf)!important;border-color:var(--dsh-l2-rim,#ffffff8c)!important;transform:translateY(-1px)scale(1.02)!important;box-shadow:inset 0 1px #ffffffb3,0 6px 18px #00000059!important}[data-dsh-liquid-glass] [class*=_editorActions],[data-dsh-liquid-glass] [class*=editorActions]{box-shadow:none!important;background:0 0!important;border:none!important}[data-dsh-liquid-glass] [class*=_customized],[data-dsh-liquid-glass] [class*=customized]{border-top:1px solid var(--dsh-l1-border,#ffffff1f)!important}[data-dsh-liquid-glass] [class*=_customizedSummary],[data-dsh-liquid-glass] [class*=customizedSummary]{color:#ffffffe6!important;font-weight:500!important}[data-dsh-liquid-glass] [class*=_customizedSummary]:hover,[data-dsh-liquid-glass] [class*=customizedSummary]:hover{color:#38bdf8!important}[data-dsh-liquid-glass] [class*=_fieldLabel],[data-dsh-liquid-glass] [class*=_editorTitle],[data-dsh-liquid-glass] [class*=_modelCatalogTitle],[data-dsh-liquid-glass] [class*=fieldLabel],[data-dsh-liquid-glass] [class*=editorTitle],[data-dsh-liquid-glass] [class*=modelCatalogTitle]{color:#fffffff2!important;text-shadow:0 1px 2px #00000059!important;font-weight:600!important}[data-dsh-liquid-glass] [role=dialog] button[class*=trigger],[data-dsh-liquid-glass] [role=dialog] button[class*=select],[data-dsh-liquid-glass] [role=dialog] button[class*=Select],[data-dsh-liquid-glass] [role=dialog] [class*=CustomSelect_trigger],[data-dsh-liquid-glass] [role=dialog] [class*=customSelect_trigger],[data-dsh-liquid-glass] [role=dialog] [class*=SelectTrigger],[data-dsh-liquid-glass] [role=dialog] button[aria-haspopup=listbox],[data-dsh-liquid-glass] [role=dialog] button[aria-haspopup=menu],[data-dsh-liquid-glass] button[aria-haspopup=listbox],[data-dsh-liquid-glass] button[aria-haspopup=menu]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff26 0%, #ffffff08 100%)), var(--dsh-l2-bg,transparent)!important;-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px))!important;border:1px solid var(--dsh-l2-border,#ffffff40)!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff61, 0 4px 14px #0003)!important;color:#fff!important;text-shadow:0 1px 2px #0006!important;border-radius:12px!important;font-weight:500!important;transition:all .16s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [role=dialog] button[class*=trigger]:hover,[data-dsh-liquid-glass] [role=dialog] button[class*=select]:hover,[data-dsh-liquid-glass] [role=dialog] [class*=CustomSelect_trigger]:hover,[data-dsh-liquid-glass] [role=dialog] button[aria-haspopup=listbox]:hover{background:linear-gradient(135deg, #ffffff38 0%, #38bdf81f 100%), var(--dsh-l2-bg,transparent)!important;border-color:var(--dsh-l2-rim,#ffffff73)!important;transform:translateY(-1px)!important;box-shadow:inset 0 1px #ffffff80,0 6px 18px #00000040!important}[data-dsh-liquid-glass] [class*=SettingsDocumentAction_root] button,[data-dsh-liquid-glass] [class*=SettingsRoot_header] button,[data-dsh-liquid-glass] [class*=SettingsRoot_header] button[class*=action],[data-dsh-liquid-glass] [role=dialog] button[class*=actionBtn],[data-dsh-liquid-glass] [role=dialog] button[class*=chooseBtn],[data-dsh-liquid-glass] button[class*=chooseBtn]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff26 0%, #ffffff08 100%)), var(--dsh-l2-bg,transparent)!important;-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px))!important;border:1px solid var(--dsh-l2-border,#ffffff3d)!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff59, 0 3px 10px #0000002e)!important;color:#fff!important;text-shadow:0 1px 2px #0006!important;border-radius:10px!important;font-weight:500!important;transition:all .14s!important}[data-dsh-liquid-glass] [class*=SettingsDocumentAction_root] button:hover,[data-dsh-liquid-glass] [class*=SettingsRoot_header] button:hover,[data-dsh-liquid-glass] [role=dialog] button[class*=actionBtn]:hover,[data-dsh-liquid-glass] [role=dialog] button[class*=chooseBtn]:hover{background:linear-gradient(135deg, #ffffff38 0%, #38bdf81f 100%), var(--dsh-l2-bg,transparent)!important;border-color:var(--dsh-l2-rim,#fff6)!important;transform:translateY(-1px)!important;box-shadow:inset 0 1px #ffffff80,0 5px 14px #00000040!important}[data-dsh-liquid-glass] [role=dialog] [class*=SegmentedControl_root],[data-dsh-liquid-glass] [class*=SegmentedControl_root]{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;border-radius:12px!important;padding:3px!important;box-shadow:inset 0 1px 1px #0003!important}[data-dsh-liquid-glass] [role=dialog] [class*=AppearanceChoice_choice],[data-dsh-liquid-glass] [role=dialog] [class*=appearanceOption],[data-dsh-liquid-glass] [role=dialog] [class*=SegmentedControl_item],[data-dsh-liquid-glass] [class*=SegmentedControl_item]{color:#ffffffb3!important;box-shadow:none!important;background:0 0!important;border:1px solid #0000!important;border-radius:10px!important;transition:all .16s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] [role=dialog] [class*=AppearanceChoice_choice]:hover,[data-dsh-liquid-glass] [role=dialog] [class*=appearanceOption]:hover,[data-dsh-liquid-glass] [class*=SegmentedControl_item]:hover{color:#fff!important;background:#ffffff14!important}[data-dsh-liquid-glass] [role=dialog] [class*=AppearanceChoice_choice][class*=selected],[data-dsh-liquid-glass] [role=dialog] [class*=appearanceOption][class*=selected],[data-dsh-liquid-glass] [role=dialog] [class*=SegmentedControl_item][class*=selected],[data-dsh-liquid-glass] [role=dialog] [class*=SegmentedControl_item][class*=active],[data-dsh-liquid-glass] [class*=SegmentedControl_item][class*=selected],[data-dsh-liquid-glass] [class*=SegmentedControl_item][class*=active]{background:var(--dsh-l2-glass-tint,linear-gradient(135deg, #ffffff38 0%, #38bdf82e 100%)), var(--dsh-l2-bg,transparent)!important;-webkit-backdrop-filter:blur(var(--dsh-l2-blur,0px))!important;border:1px solid var(--dsh-l2-border,#ffffff52)!important;color:#fff!important;box-shadow:var(--dsh-l2-shadow,inset 0 1px 0 #ffffff80, 0 4px 12px #38bdf840)!important;text-shadow:0 1px 2px #0006!important;font-weight:600!important}[data-dsh-liquid-glass] div[role=listbox],[data-dsh-liquid-glass] [class*=Menu_list],[data-dsh-liquid-glass] [class*=Menu_submenu],[data-dsh-liquid-glass] [class*=CustomSelect_menu],[data-dsh-liquid-glass] [class*=Dropdown_menu],html[data-dsh-liquid-glass][data-dsh-liquid-glass] div[role=menu],html[data-dsh-liquid-glass][data-dsh-liquid-glass] [data-dsh-model-menu],html[data-dsh-model-open] [data-dsh-model-menu]{background:var(--dsh-l3-mask-bg,#0a101ca6)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;border:1px solid var(--dsh-l1-border,#fff3)!important;box-shadow:var(--dsh-l1-shadow,0 20px 48px #00000080), inset 0 1.5px 1px var(--dsh-l1-rim,#ffffff73)!important;border-radius:20px!important;padding:8px!important}[data-dsh-liquid-glass] [class*=NxU6UG_overlay],[data-dsh-liquid-glass] [class*=RemotePanel_overlay],html[data-dsh-liquid-glass] [class*=NxU6UG_overlay],html[data-dsh-liquid-glass] [class*=RemotePanel_overlay]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important}[data-dsh-liquid-glass] [class*=NxU6UG_panel],[data-dsh-liquid-glass] [class*=RemotePanel_panel],html[data-dsh-liquid-glass] [class*=NxU6UG_panel],html[data-dsh-liquid-glass] [class*=RemotePanel_panel]{background:var(--dsh-l3-mask-bg,#0a101cbf)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff2e)!important;box-shadow:var(--dsh-l1-shadow,0 28px 72px #0009), inset 0 1.5px 1px var(--dsh-l1-rim,#fff6)!important;color:var(--dsw-alias-label-primary)!important;border-radius:24px!important;gap:14px!important;width:560px!important;max-width:calc(100vw - 48px)!important;max-height:calc(100vh - 48px)!important;padding:24px!important;overflow:hidden!important}[data-dsh-liquid-glass] [class*=NxU6UG_mask],[data-dsh-liquid-glass] [class*=RemotePanel_mask],html[data-dsh-liquid-glass][data-dsh-liquid-glass] [class*=NxU6UG_mask],html[data-dsh-liquid-glass][data-dsh-liquid-glass] [class*=RemotePanel_mask]{background:var(--dsh-l3-mask-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;box-shadow:none!important;border:none!important}[data-dsh-liquid-glass] [class*=NxU6UG_header],[data-dsh-liquid-glass] [class*=RemotePanel_header]{align-items:center!important;margin-bottom:2px!important}[data-dsh-liquid-glass] [class*=NxU6UG_title],[data-dsh-liquid-glass] [class*=RemotePanel_title]{color:#fff!important;letter-spacing:-.01em!important;font-size:17px!important;font-weight:600!important}[data-dsh-liquid-glass] [class*=NxU6UG_subtitle],[data-dsh-liquid-glass] [class*=RemotePanel_subtitle]{color:#ffffff8c!important;margin-top:2px!important;font-size:13px!important}[data-dsh-liquid-glass] [class*=NxU6UG_close],[data-dsh-liquid-glass] [class*=RemotePanel_close]{color:#ffffffa6!important;background:#ffffff0d!important;border:1px solid #ffffff1a!important;border-radius:50%!important;width:30px!important;height:30px!important;transition:all .14s!important}[data-dsh-liquid-glass] [class*=NxU6UG_close]:hover,[data-dsh-liquid-glass] [class*=RemotePanel_close]:hover{color:#fff!important;background:#ffffff26!important;transform:scale(1.05)!important}[data-dsh-liquid-glass] [class*=NxU6UG_card],[data-dsh-liquid-glass] [class*=RemotePanel_card],[data-dsh-liquid-glass] [class*=NxU6UG_cardHeader],[data-dsh-liquid-glass] [class*=RemotePanel_cardHeader],[data-dsh-liquid-glass] [class*=NxU6UG_cardTitle],[data-dsh-liquid-glass] [class*=RemotePanel_cardTitle],[data-dsh-liquid-glass] [class*=NxU6UG_badges],[data-dsh-liquid-glass] [class*=RemotePanel_badges],[data-dsh-liquid-glass] [class*=NxU6UG_banner],[data-dsh-liquid-glass] [class*=RemotePanel_banner],html[data-dsh-liquid-glass] [class*=NxU6UG_card],html[data-dsh-liquid-glass] [class*=RemotePanel_card],html[data-dsh-liquid-glass] [class*=NxU6UG_cardHeader],html[data-dsh-liquid-glass] [class*=RemotePanel_cardHeader],html[data-dsh-liquid-glass] [class*=NxU6UG_badges],html[data-dsh-liquid-glass] [class*=RemotePanel_badges]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important;border-radius:0!important;padding:0!important}[data-dsh-liquid-glass] [class*=NxU6UG_cardHeader],[data-dsh-liquid-glass] [class*=RemotePanel_cardHeader]{justify-content:space-between!important;align-items:center!important;width:100%!important;display:flex!important}[data-dsh-liquid-glass] [class*=NxU6UG_cardTitle],[data-dsh-liquid-glass] [class*=RemotePanel_cardTitle]{color:#ffffffe6!important;font-size:13px!important;font-weight:600!important}[data-dsh-liquid-glass] [class*=NxU6UG_badge],[data-dsh-liquid-glass] [class*=RemotePanel_badge]{color:#ffffffbf!important;background:#ffffff0f!important;border:1px solid #ffffff1a!important;border-radius:999px!important;padding:2px 8px!important;font-size:11px!important;font-weight:500!important}[data-dsh-liquid-glass] [class*=NxU6UG_badge-waiting],[data-dsh-liquid-glass] [class*=RemotePanel_badge-waiting]{color:#fbbf24!important;background:#f59e0b1a!important;border:1px solid #f59e0b40!important}[data-dsh-liquid-glass] [class*=NxU6UG_badge-connected],[data-dsh-liquid-glass] [class*=RemotePanel_badge-connected]{color:#34d399!important;background:#10b9811a!important;border:1px solid #10b98140!important}[data-dsh-liquid-glass] [class*=NxU6UG_badge-stopped],[data-dsh-liquid-glass] [class*=RemotePanel_badge-stopped]{color:#f87171!important;background:#ef44441a!important;border:1px solid #ef444440!important}[data-dsh-liquid-glass] [class*=NxU6UG_qrWrap],[data-dsh-liquid-glass] [class*=RemotePanel_qrWrap]{background:#fff!important;border:none!important;border-radius:14px!important;margin:6px auto!important;padding:12px!important;box-shadow:0 4px 16px #0000004d!important}[data-dsh-liquid-glass] [class*=NxU6UG_expiry],[data-dsh-liquid-glass] [class*=RemotePanel_expiry]{color:#ffffff73!important;text-align:center!important;margin:0!important;font-size:11px!important}[data-dsh-liquid-glass] [class*=NxU6UG_hint],[data-dsh-liquid-glass] [class*=RemotePanel_hint]{color:#ffffffa6!important;margin:4px 0 2px!important;font-size:12px!important;font-weight:500!important}[data-dsh-liquid-glass] [class*=NxU6UG_link],[data-dsh-liquid-glass] [class*=RemotePanel_link]{box-sizing:border-box!important;width:100%!important;font-family:var(--dsw-font-mono,ui-monospace, monospace)!important;color:#38bdf8!important;white-space:normal!important;word-break:break-all!important;text-overflow:clip!important;user-select:all!important;background:#00000059!important;border:1px solid #ffffff1a!important;border-radius:8px!important;margin:2px 0 4px!important;padding:8px 12px!important;font-size:12px!important;line-height:1.5!important;display:block!important;overflow:visible!important}[data-dsh-liquid-glass] fieldset[class*=NxU6UG_addresses],[data-dsh-liquid-glass] fieldset[class*=RemotePanel_addresses]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important;margin:8px 0 0!important;padding:0!important}[data-dsh-liquid-glass] [class*=NxU6UG_addresses] legend,[data-dsh-liquid-glass] [class*=RemotePanel_addresses] legend{color:#fffc!important;margin-bottom:4px!important;padding:0!important;font-size:12px!important;font-weight:600!important}[data-dsh-liquid-glass] label[class*=NxU6UG_address],[data-dsh-liquid-glass] label[class*=RemotePanel_address]{cursor:pointer!important;background:0 0!important;border:1px solid #0000!important;border-radius:6px!important;align-items:baseline!important;gap:8px!important;margin-top:2px!important;padding:5px 8px!important;transition:all .12s!important;display:flex!important}[data-dsh-liquid-glass] label[class*=NxU6UG_address]:hover,[data-dsh-liquid-glass] label[class*=RemotePanel_address]:hover{background:#ffffff0d!important}[data-dsh-liquid-glass] [class*=NxU6UG_address] input[type=radio],[data-dsh-liquid-glass] [class*=RemotePanel_address] input[type=radio]{accent-color:#38bdf8!important;cursor:pointer!important;width:14px!important;height:14px!important;margin:0!important;position:relative!important;top:2px!important}[data-dsh-liquid-glass] [class*=NxU6UG_address] span,[data-dsh-liquid-glass] [class*=RemotePanel_address] span{color:#ffffffe6!important;white-space:nowrap!important;font-size:12px!important;font-weight:500!important}[data-dsh-liquid-glass] [class*=NxU6UG_addressValue],[data-dsh-liquid-glass] [class*=RemotePanel_addressValue]{font-family:var(--dsw-font-mono,ui-monospace, monospace)!important;color:#ffffffa6!important;white-space:normal!important;word-break:break-all!important;text-overflow:clip!important;flex:1!important;font-size:12px!important;line-height:1.4!important;overflow:visible!important}[data-dsh-liquid-glass] [class*=NxU6UG_addressHint],[data-dsh-liquid-glass] [class*=RemotePanel_addressHint]{color:#fff6!important;margin:6px 0 0!important;font-size:11px!important;line-height:16px!important}html[data-dsh-liquid-glass] [data-dsh-context-panel],html[data-dsh-liquid-glass] [class*=H57FiG_panel],html[data-dsh-liquid-glass] [class*=ContextMeter_panel],[data-dsh-liquid-glass] [data-dsh-context-panel],[data-dsh-liquid-glass] [class*=H57FiG_panel],[data-dsh-liquid-glass] [class*=ContextMeter_panel]{background:var(--dsh-l3-mask-bg,#0a101cbf)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;border:1px solid var(--dsh-l1-border,#fff3)!important;box-shadow:var(--dsh-l1-shadow,0 28px 72px #0009), inset 0 1.5px 1px var(--dsh-l1-rim,#fff6)!important;color:var(--dsw-alias-label-primary)!important;border-radius:18px!important;overflow:hidden!important}html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=headline],html[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=headline],html[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=headline],[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=headline],[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=headline],[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=headline]{color:#ffffffa6!important}html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=percent],html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=figures],html[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=percent],html[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=figures],html[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=percent],html[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=figures],[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=percent],[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=figures],[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=percent],[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=figures],[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=percent],[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=figures]{color:#fff!important;font-weight:600!important}html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=bar],html[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=bar],html[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=bar],[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=bar],[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=bar],[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=bar]{background:#ffffff1a!important}html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=row] dt,html[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=row] dt,html[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=row] dt,[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=row] dt,[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=row] dt,[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=row] dt{color:#ffffffbf!important}html[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=row] dd,html[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=row] dd,html[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=row] dd,[data-dsh-liquid-glass] [data-dsh-context-panel] [class*=row] dd,[data-dsh-liquid-glass] [class*=H57FiG_panel] [class*=row] dd,[data-dsh-liquid-glass] [class*=ContextMeter_panel] [class*=row] dd{color:#fff!important}[data-dsh-liquid-glass] [class*=NxU6UG_actions],[data-dsh-liquid-glass] [class*=RemotePanel_actions],html[data-dsh-liquid-glass] [class*=NxU6UG_actions],html[data-dsh-liquid-glass] [class*=RemotePanel_actions]{box-shadow:none!important;-webkit-backdrop-filter:none!important;background:0 0!important;border:none!important;align-items:center!important;gap:8px!important;margin-top:10px!important;padding:0!important;display:flex!important}[data-dsh-liquid-glass] [class*=NxU6UG_action],[data-dsh-liquid-glass] [class*=RemotePanel_action],html[data-dsh-liquid-glass] [class*=NxU6UG_action],html[data-dsh-liquid-glass] [class*=RemotePanel_action]{white-space:nowrap!important;cursor:pointer!important;height:34px!important;box-shadow:none!important;-webkit-backdrop-filter:none!important;color:#fff!important;background:#ffffff0f!important;border:1px solid #ffffff1f!important;border-radius:8px!important;justify-content:center!important;align-items:center!important;gap:6px!important;padding:0 14px!important;font-size:13px!important;font-weight:500!important;transition:all .14s!important;display:inline-flex!important}[data-dsh-liquid-glass] [class*=NxU6UG_action]:first-child,[data-dsh-liquid-glass] [class*=RemotePanel_action]:first-child,html[data-dsh-liquid-glass] [class*=NxU6UG_action]:first-child,html[data-dsh-liquid-glass] [class*=RemotePanel_action]:first-child{color:#fca5a5!important;box-shadow:none!important;background:#ef444426!important;border:1px solid #ef444447!important;margin-right:auto!important}[data-dsh-liquid-glass] [class*=NxU6UG_action]:first-child:hover:not(:disabled),[data-dsh-liquid-glass] [class*=RemotePanel_action]:first-child:hover:not(:disabled),html[data-dsh-liquid-glass] [class*=NxU6UG_action]:first-child:hover:not(:disabled),html[data-dsh-liquid-glass] [class*=RemotePanel_action]:first-child:hover:not(:disabled){color:#fff!important;background:#ef444440!important;border-color:#ef444480!important;transform:translateY(-1px)!important;box-shadow:0 4px 12px #ef444440!important}[data-dsh-liquid-glass] [class*=NxU6UG_action]:not(:first-child):hover:not(:disabled),[data-dsh-liquid-glass] [class*=RemotePanel_action]:not(:first-child):hover:not(:disabled),html[data-dsh-liquid-glass] [class*=NxU6UG_action]:not(:first-child):hover:not(:disabled),html[data-dsh-liquid-glass] [class*=RemotePanel_action]:not(:first-child):hover:not(:disabled){color:#fff!important;box-shadow:none!important;background:#ffffff1f!important;border-color:#ffffff40!important;transform:translateY(-1px)!important}[data-dsh-liquid-glass] [class*=NxU6UG_updateActions],[data-dsh-liquid-glass] [class*=RemotePanel_updateActions]{background:0 0!important;border:none!important;justify-content:flex-end!important;margin-top:14px!important;padding:0!important;display:flex!important}[data-dsh-liquid-glass] [class*=NxU6UG_updateRetry],[data-dsh-liquid-glass] [class*=RemotePanel_updateRetry]{cursor:pointer!important;color:#fff!important;background:#ffffff14!important;border:1px solid #ffffff29!important;border-radius:10px!important;justify-content:center!important;align-items:center!important;gap:6px!important;height:34px!important;padding:0 16px!important;font-size:13px!important;font-weight:500!important;transition:all .14s cubic-bezier(.16,1,.3,1)!important;display:inline-flex!important;box-shadow:inset 0 1px #fff3,0 2px 6px #0003!important}[data-dsh-liquid-glass] [class*=NxU6UG_updateRetry]:hover{background:#ffffff29!important;border-color:#ffffff4d!important;transform:translateY(-1px)!important;box-shadow:inset 0 1px #ffffff59,0 4px 12px #0000004d!important}[data-dsh-liquid-glass] [class*=NxU6UG_updateOutput],[data-dsh-liquid-glass] [class*=RemotePanel_updateOutput]{font-family:var(--dsw-font-mono,ui-monospace, monospace)!important;color:#ffffffb3!important;white-space:pre-wrap!important;word-break:break-all!important;background:#0006!important;border:1px solid #ffffff1a!important;border-radius:10px!important;padding:10px 12px!important;font-size:12px!important}[data-dsh-liquid-glass][data-dsh-liquid-glass] [data-radix-popper-content-wrapper],[data-dsh-liquid-glass][data-dsh-liquid-glass] [id^=popover-content],[data-dsh-liquid-glass][data-dsh-liquid-glass] [id^=popover-content]>div{background:var(--dsh-l1-bg,#0a101cb3)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff2e)!important}[data-dsh-liquid-glass] button[role=menuitem],[data-dsh-liquid-glass] [role=option],[data-dsh-liquid-glass] [class*=Menu_item],[data-dsh-liquid-glass] [class*=CustomSelect_option]{color:#ffffffe6!important;text-shadow:0 1px 2px #0006!important;background:0 0!important;border-radius:9px!important;margin:1px 0!important;padding:8px 10px!important;font-size:13px!important;transition:all .12s cubic-bezier(.16,1,.3,1)!important}[data-dsh-liquid-glass] button[role=menuitem]:hover:not(:disabled),[data-dsh-liquid-glass] [role=option]:hover,[data-dsh-liquid-glass] [class*=Menu_item]:hover:not(:disabled),[data-dsh-liquid-glass] [class*=CustomSelect_option]:hover{color:#fff!important;background:linear-gradient(135deg,#ffffff2e 0%,#38bdf81a 100%),#ffffff14!important;transform:translate(2px)!important}[data-dsh-liquid-glass] [class*=Menu_item][class*=selected],[data-dsh-liquid-glass] [role=option][class*=selected],[data-dsh-liquid-glass] [class*=CustomSelect_option][class*=selected]{color:#fff!important;background:linear-gradient(135deg,#38bdf847 0%,#6366f129 100%),#ffffff14!important;border:1px solid #ffffff3d!important;font-weight:500!important;box-shadow:inset 0 1px #ffffff59,0 2px 8px #38bdf833!important}[data-dsh-liquid-glass] [class*=Menu_check],[data-dsh-liquid-glass] [class*=check]{color:#38bdf8!important;filter:drop-shadow(0 0 6px #38bdf899)!important}[data-dsh-liquid-glass] [class*=Menu_separator],[data-dsh-liquid-glass] [role=separator]{background:#ffffff1f!important;height:1px!important;margin:4px 2px!important}[data-dsh-liquid-glass] [class*=Menu_label]{color:#ffffff8c!important;font-size:11px!important}[data-dsh-liquid-glass] input[type=checkbox]{cursor:pointer;transition:transform .12s;transform:scale(1.1);accent-color:#38bdf8!important}[data-dsh-liquid-glass] input[type=checkbox]:hover{transform:scale(1.2)}[data-dsh-liquid-glass] [class*=MessageItem_bubble],[data-dsh-liquid-glass] [class*=userStack] [class*=bubble],[data-dsh-liquid-glass] [class*=bubble][class*=bubble],[data-dsh-liquid-glass] [class*=MessageBubble_bubble],[data-dsh-liquid-glass] [class*=bubble_content]{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff2e)!important;border-radius:20px!important;box-shadow:inset 0 1px #fff3,0 8px 24px #00000040!important}[data-dsh-liquid-glass] [class*=TaskBoard],[data-dsh-liquid-glass] [class*=taskBoard],[data-dsh-liquid-glass] [class*=SSH],[data-dsh-liquid-glass] [class*=ssh],[data-dsh-liquid-glass] [class*=aionui],[data-dsh-liquid-glass] [class*=ApprovalPanel_root],[data-dsh-liquid-glass] [class*=TodoPanel_root],[data-dsh-liquid-glass] [class*=QueueDock_root],[data-dsh-liquid-glass] [class*=StatsLine_root],[data-dsh-liquid-glass] [class*=TurnTailNodeView_root]{background:var(--dsh-l1-bg,#0a101c73)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff29)!important;border-radius:16px!important}[data-dsh-liquid-glass] [class*=ReasoningRow_root],[data-dsh-liquid-glass] [class*=ContextInjectionRow_root]{background:var(--dsh-l1-bg,#0a101c59)!important;-webkit-backdrop-filter:blur(var(--dsh-l1-blur,18px))!important;border:1px solid var(--dsh-l1-border,#ffffff1f)!important;border-radius:12px!important}[data-dsh-liquid-glass] div[role=listbox],[data-dsh-liquid-glass] [class*=MenuView_menu],[data-dsh-liquid-glass] [class*=PopupSelectView_card],[data-dsh-liquid-glass] div[aria-label*=suggestions],[data-dsh-liquid-glass] div[aria-label*=建议],[data-dsh-liquid-glass] div[aria-label*=命令],html[data-dsh-liquid-glass] [class*=MenuView_menu],html[data-dsh-liquid-glass] [class*=PopupSelectView_card]{background:var(--dsh-l3-mask-bg,#0a101cbf)!important;-webkit-backdrop-filter:blur(var(--dsh-modal-blur,24px))!important;border:1px solid var(--dsh-l1-border,#ffffff2e)!important;box-shadow:var(--dsh-l1-shadow,0 28px 72px #0009), inset 0 1.5px 1px var(--dsh-l1-rim,#fff6)!important;border-radius:16px!important;padding:6px!important}[data-dsh-liquid-glass] [class*=MenuView_item],[data-dsh-liquid-glass] [class*=PopupSelectView_row],html[data-dsh-liquid-glass] [class*=MenuView_item],html[data-dsh-liquid-glass] [class*=PopupSelectView_row]{border-radius:10px!important;transition:all .12s cubic-bezier(.16,1,.3,1)!important}";
		const tagId = "@deepseek-ai/dsh-client-ui-liquid-glass/liquid-glass.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@deepseek-ai/dsh-client-ui-liquid-glass";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/AccordionModelSelect.tsx
		function AccordionModelSelect({ locked, available, directory, load, select, t }) {
			const state = (0, react.useSyncExternalStore)((fn) => directory.subscribe(fn), () => directory.getSnapshot());
			const [open, setOpen] = (0, react.useState)(false);
			const [modelExpanded, setModelExpanded] = (0, react.useState)(false);
			const [effortExpanded, setEffortExpanded] = (0, react.useState)(false);
			const lastActionRef = (0, react.useRef)("load");
			const [toast, setToast] = (0, react.useState)(null);
			const toastSeq = (0, react.useRef)(0);
			const rootRef = (0, react.useRef)(null);
			const triggerRef = (0, react.useRef)(null);
			const id = (0, react.useId)();

			const [indicatorStyle, setIndicatorStyle] = (0, react.useState)({ left: 0, width: 0, opacity: 0 });
			const [isDragging, setIsDragging] = (0, react.useState)(false);
			const [dragPreviewEffort, setDragPreviewEffort] = (0, react.useState)(void 0);
			const isDraggingRef = (0, react.useRef)(false);
			const dragStartRef = (0, react.useRef)(null);
			const optionRefs = (0, react.useRef)(new Map());
			const trackRef = (0, react.useRef)(null);

			const choices = (0, react.useMemo)(() => {
				if (!state?.groups) return [];
				return state.groups.flatMap((group) =>
					(group.models || []).map((model) => ({
						group,
						model,
						selection: {
							provider: group.id,
							model: model.id,
							...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
						}
					}))
				);
			}, [state?.groups]);

			const currentChoice = choices[
				state?.current === null || !state?.current
					? -1
					: choices.findIndex(
						(c) =>
							c.selection.provider === state.current?.provider &&
							c.selection.model === state.current.model
					)
			];

			const reasoning = currentChoice?.model?.reasoning;
			const effectiveEffort = state?.current?.reasoningEffort ?? reasoning?.defaultEffort;
			const displayedEffort = isDragging && dragPreviewEffort !== void 0 ? dragPreviewEffort : effectiveEffort;
			const effortLabel =
				reasoning === void 0
					? void 0
					: displayedEffort === void 0
					? t ? t("effort.providerDefault") : "Default"
					: reasoning.efforts?.find((level) => level.id === displayedEffort)?.name ?? displayedEffort;

			const effortChoices = (0, react.useMemo)(() => {
				if (reasoning === void 0) return [];
				const defaultList =
					reasoning.defaultEffort === void 0
						? [
							{
								key: "provider-default",
								effort: void 0,
								label: t ? t("effort.providerDefault") : "Default"
							}
						]
						: [];
				const list = (reasoning.efforts || []).map((effort) => ({
					key: `effort:${effort.id}`,
					effort: effort.id,
					label: effort.name,
					...effort.description === void 0 ? {} : { description: effort.description }
				}));
				return [...defaultList, ...list];
			}, [reasoning, t]);

			const busy = state?.status === "selecting";

			const reload = () => {
				lastActionRef.current = "load";
				load?.();
			};

			(0, react.useEffect)(() => {
				if (available) {
					lastActionRef.current = "load";
					load?.();
				}
			}, [available, load]);

			(0, react.useEffect)(() => {
				if (!open) return;
				const closeOutside = (event) => {
					if (!rootRef.current?.contains(event.target)) {
						setOpen(false);
						setModelExpanded(false);
						setEffortExpanded(false);
					}
				};
				document.addEventListener("mousedown", closeOutside);
				return () => {
					document.removeEventListener("mousedown", closeOutside);
				};
			}, [open]);

			(0, react.useEffect)(() => {
				if (!effortExpanded) {
					setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
					return;
				}
				if (isDraggingRef.current) return;

				const activeLevel = effortChoices.find((level) => level.effort === effectiveEffort) ?? effortChoices[0];
				if (!activeLevel) return;
				const update = () => {
					if (isDraggingRef.current) return;
					const activeEl = optionRefs.current.get(activeLevel.key);
					if (activeEl && trackRef.current) {
						setIndicatorStyle({
							left: activeEl.offsetLeft,
							width: activeEl.offsetWidth,
							opacity: 1
						});
					}
				};
				update();
				const rafId = requestAnimationFrame(update);
				const ro = typeof ResizeObserver !== "undefined" && trackRef.current
					? new ResizeObserver(update)
					: null;
				if (ro && trackRef.current) {
					ro.observe(trackRef.current);
				}
				return () => {
					cancelAnimationFrame(rafId);
					ro?.disconnect();
				};
			}, [effectiveEffort, effortExpanded, effortChoices]);

			const getClosestOption = (clientX) => {
				if (!trackRef.current) return null;
				const rect = trackRef.current.getBoundingClientRect();
				const pointerX = clientX - rect.left;
				let closestLevel = null;
				let minDistance = Infinity;
				for (const level of effortChoices) {
					const el = optionRefs.current.get(level.key);
					if (el) {
						const elCenter = el.offsetLeft + el.offsetWidth / 2;
						const dist = Math.abs(pointerX - elCenter);
						if (dist < minDistance) {
							minDistance = dist;
							closestLevel = level;
						}
					}
				}
				return closestLevel;
			};

			const handleTrackPointerDown = (e) => {
				if (e.button !== 0) return;
				dragStartRef.current = { x: e.clientX, hasMoved: false, pointerId: e.pointerId };
			};

			const handleTrackPointerMove = (e) => {
				if (!dragStartRef.current || dragStartRef.current.pointerId !== e.pointerId) return;
				const dx = e.clientX - dragStartRef.current.x;
				if (!dragStartRef.current.hasMoved && Math.abs(dx) > 3) {
					dragStartRef.current.hasMoved = true;
					isDraggingRef.current = true;
					setIsDragging(true);
					try {
						e.currentTarget.setPointerCapture(e.pointerId);
					} catch {}
				}
				if (dragStartRef.current.hasMoved && trackRef.current) {
					const rect = trackRef.current.getBoundingClientRect();
					const pointerX = e.clientX - rect.left;
					const currentEffortVal = dragPreviewEffort !== void 0 ? dragPreviewEffort : effectiveEffort;
					const activeLevel = effortChoices.find((l) => l.effort === currentEffortVal) ?? effortChoices[0];
					const activeEl = activeLevel ? optionRefs.current.get(activeLevel.key) : null;
					const capsuleWidth = activeEl ? activeEl.offsetWidth : (indicatorStyle.width || 50);
					const minLeft = 3;
					const maxLeft = Math.max(3, rect.width - 3 - capsuleWidth);
					const targetLeft = Math.max(minLeft, Math.min(maxLeft, pointerX - capsuleWidth / 2));
					const closest = getClosestOption(e.clientX);
					if (closest) {
						setDragPreviewEffort(closest.effort);
					}
					setIndicatorStyle({
						left: targetLeft,
						width: capsuleWidth,
						opacity: 1
					});
				}
			};

			const handleTrackPointerUp = (e) => {
				if (!dragStartRef.current || dragStartRef.current.pointerId !== e.pointerId) return;
				const hadMoved = dragStartRef.current.hasMoved;
				dragStartRef.current = null;
				isDraggingRef.current = false;
				setIsDragging(false);
				if (hadMoved) {
					try {
						e.currentTarget.releasePointerCapture(e.pointerId);
					} catch {}
					const closest = getClosestOption(e.clientX);
					setDragPreviewEffort(void 0);
					if (closest && closest.effort !== effectiveEffort) {
						chooseEffort(closest.effort);
					} else {
						const activeLevel = effortChoices.find((l) => l.effort === effectiveEffort) ?? effortChoices[0];
						const activeEl = activeLevel ? optionRefs.current.get(activeLevel.key) : null;
						if (activeEl) {
							setIndicatorStyle({
								left: activeEl.offsetLeft,
								width: activeEl.offsetWidth,
								opacity: 1
							});
						}
					}
				} else {
					setDragPreviewEffort(void 0);
				}
			};

			const handleTrackPointerCancel = (e) => {
				if (dragStartRef.current && dragStartRef.current.pointerId === e.pointerId) {
					dragStartRef.current = null;
					isDraggingRef.current = false;
					setIsDragging(false);
					setDragPreviewEffort(void 0);
					const activeLevel = effortChoices.find((l) => l.effort === effectiveEffort) ?? effortChoices[0];
					const activeEl = activeLevel ? optionRefs.current.get(activeLevel.key) : null;
					if (activeEl) {
						setIndicatorStyle({
							left: activeEl.offsetLeft,
							width: activeEl.offsetWidth,
							opacity: 1
						});
					}
				}
			};

			if (!available) return null;

			const show = () => {
				setModelExpanded(false);
				setEffortExpanded(false);
				setOpen(true);
				reload();
			};

			const close = (restoreFocus = false) => {
				setOpen(false);
				setModelExpanded(false);
				setEffortExpanded(false);
				if (restoreFocus) {
					queueMicrotask(() => {
						triggerRef.current?.focus();
					});
				}
			};

			const settleSelection = (accepted) => {
				if (accepted) {
					return;
				}
				const message = directory.getSnapshot()?.error;
				if (message) {
					toastSeq.current += 1;
					setToast({
						seq: toastSeq.current,
						text: t ? t("error.action", { message }) : `模型操作失败：${message}`
					});
				}
			};

			const choose = (selection) => {
				if (busy) return;
				if (state?.current?.provider === selection.provider && state?.current?.model === selection.model) {
					return;
				}
				lastActionRef.current = "select";
				select(selection).then(settleSelection);
			};

			const chooseEffort = (effort) => {
				if (busy) return;
				if (!state?.current) return;
				if (effectiveEffort === effort) {
					return;
				}
				const selection = {
					provider: state.current.provider,
					model: state.current.model,
					...effort === void 0 ? {} : { reasoningEffort: effort }
				};
				lastActionRef.current = "select";
				select(selection).then(settleSelection);
			};

			const modelLabel = currentChoice?.model?.name ?? (t ? t("trigger.fallback") : "选择模型");
			const triggerLabel = effortLabel === void 0 ? modelLabel : `${modelLabel} · ${effortLabel}`;

			return (0, react_jsx_runtime.jsxs)("div", {
				ref: rootRef,
				className: "dsh-model-select-root",
				style: { position: "relative", minWidth: 0, display: "inline-flex", alignItems: "center" },
				children: [
					(0, react_jsx_runtime.jsxs)("button", {
						ref: triggerRef,
						type: "button",
						className: "dsh-model-select-trigger",
						"aria-haspopup": "menu",
						"aria-expanded": open,
						title: triggerLabel,
						disabled: locked,
						onClick: () => {
							if (open) close();
							else show();
						},
						children: [
							(0, react_jsx_runtime.jsx)("span", {
								className: "dsh-model-select-trigger-label",
								children: modelLabel
							}),
							effortLabel !== void 0 && (0, react_jsx_runtime.jsx)("span", {
								className: "dsh-model-select-trigger-effort",
								children: effortLabel
							}),
							(0, react_jsx_runtime.jsx)("svg", {
								className: `dsh-model-select-chevron ${open ? "dsh-chevron-open" : ""}`,
								width: "14",
								height: "14",
								viewBox: "0 0 14 14",
								fill: "none",
								children: (0, react_jsx_runtime.jsx)("path", {
									d: "M3.5 5.25L7 8.75L10.5 5.25",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})
						]
					}),
					open && (0, react_jsx_runtime.jsxs)("div", {
						id: `${id}-menu`,
						className: "dsh-model-select-menu",
						role: "menu",
						"aria-busy": state?.status === "loading" || busy,
						children: [
							(0, react_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "menuitem",
								className: `dsh-model-select-cell ${modelExpanded ? "dsh-cell-active" : ""}`,
								onClick: () => setModelExpanded((prev) => !prev),
								children: [
									(0, react_jsx_runtime.jsx)("span", {
										className: "dsh-model-select-cell-label",
										children: t ? t("menu.model") : "模型"
									}),
									(0, react_jsx_runtime.jsx)("span", {
										className: "dsh-model-select-cell-value",
										children: modelLabel
									}),
									(0, react_jsx_runtime.jsx)("svg", {
										className: `dsh-model-select-cell-chevron ${modelExpanded ? "dsh-chevron-expanded" : ""}`,
										width: "14",
										height: "14",
										viewBox: "0 0 14 14",
										fill: "none",
										children: (0, react_jsx_runtime.jsx)("path", {
											d: "M5.25 3.5L8.75 7L5.25 10.5",
											stroke: "currentColor",
											strokeWidth: "1.5",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									})
								]
							}),
							modelExpanded && (0, react_jsx_runtime.jsx)("div", {
								className: "dsh-model-collapse-wrap",
								children: (0, react_jsx_runtime.jsxs)("div", {
									className: "dsh-model-inline-panel",
									children: [
										state?.status === "loading" && (!state?.groups || state.groups.length === 0) && (0, react_jsx_runtime.jsx)("div", {
											className: "dsh-model-select-status",
											children: t ? t("status.loading") : "正在刷新模型列表…"
										}),
										state?.error !== null && lastActionRef.current === "load" && (0, react_jsx_runtime.jsxs)("div", {
											className: "dsh-model-select-error",
											children: [
												(0, react_jsx_runtime.jsx)("span", {
													children: t ? t("error.action", { message: state.error }) : state.error
												}),
												(0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: "dsh-model-select-retry",
													onClick: reload,
													children: "重试"
												})
											]
										}),
										state?.failures?.map((failure) => (0, react_jsx_runtime.jsxs)("div", {
											className: "dsh-model-select-warning",
											children: [
												(0, react_jsx_runtime.jsxs)("span", {
													children: [failure.name, " 加载失败：", failure.message]
												}),
												(0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: "dsh-model-select-retry",
													onClick: reload,
													children: "重试"
												})
											]
										}, failure.id)),
										(0, react_jsx_runtime.jsx)("div", {
											className: "dsh-model-select-groups scrollable",
											children: state?.groups?.map((group) => (0, react_jsx_runtime.jsxs)("section", {
												role: "group",
												className: "dsh-model-select-group",
												children: [
													(0, react_jsx_runtime.jsx)("div", {
														className: "dsh-model-select-group-title",
														children: group.name
													}),
													group.models?.map((m) => {
														const isSelected = state?.current?.provider === group.id && state?.current?.model === m.id;
														return (0, react_jsx_runtime.jsxs)("button", {
															type: "button",
															role: "menuitemradio",
															"aria-checked": isSelected,
															className: `dsh-model-select-option ${isSelected ? "dsh-option-selected" : ""}`,
															title: m.name,
															onClick: () => choose({ provider: group.id, model: m.id }),
															children: [
																(0, react_jsx_runtime.jsxs)("span", {
																	className: "dsh-model-select-option-copy",
																	children: [
																		(0, react_jsx_runtime.jsx)("span", {
																			className: "dsh-model-select-model-name",
																			children: m.name
																		}),
																		m.description && (0, react_jsx_runtime.jsx)("span", {
																			className: "dsh-model-select-description",
																			children: m.description
																		})
																	]
																}),
																isSelected && (0, react_jsx_runtime.jsx)("span", {
																	className: "dsh-model-select-check",
																	children: (0, react_jsx_runtime.jsx)("svg", {
																		width: "14",
																		height: "14",
																		viewBox: "0 0 14 14",
																		fill: "none",
																		children: (0, react_jsx_runtime.jsx)("path", {
																			d: "M2.5 7.5L5.5 10.5L11.5 3.5",
																			stroke: "currentColor",
																			strokeWidth: "1.75",
																			strokeLinecap: "round",
																			strokeLinejoin: "round"
																		})
																	})
																})
															]
														}, m.id);
													})
												]
											}, group.id))
										}),
										state?.status === "ready" && choices.length === 0 && (0, react_jsx_runtime.jsx)("div", {
											className: "dsh-model-select-empty",
											children: t ? t("empty.models") : "没有可用的模型。"
										})
									]
								})
							}),
							reasoning !== void 0 && (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
								children: [
									(0, react_jsx_runtime.jsxs)("button", {
										type: "button",
										role: "menuitem",
										className: `dsh-model-select-cell ${effortExpanded ? "dsh-cell-active" : ""}`,
										onClick: () => setEffortExpanded((prev) => !prev),
										children: [
											(0, react_jsx_runtime.jsx)("span", {
												className: "dsh-model-select-cell-label",
												children: t ? t("menu.effort") : "推理等级"
											}),
											(0, react_jsx_runtime.jsx)("span", {
												className: "dsh-model-select-cell-value",
												children: effortLabel
											}),
											(0, react_jsx_runtime.jsx)("svg", {
												className: `dsh-model-select-cell-chevron ${effortExpanded ? "dsh-chevron-expanded" : ""}`,
												width: "14",
												height: "14",
												viewBox: "0 0 14 14",
												fill: "none",
												children: (0, react_jsx_runtime.jsx)("path", {
													d: "M5.25 3.5L8.75 7L5.25 10.5",
													stroke: "currentColor",
													strokeWidth: "1.5",
													strokeLinecap: "round",
													strokeLinejoin: "round"
												})
											})
										]
									}),
									effortExpanded && (0, react_jsx_runtime.jsx)("div", {
										className: "dsh-effort-collapse-wrap",
										children: (0, react_jsx_runtime.jsxs)("div", {
											className: "dsh-effort-inline-panel",
											children: [
												(0, react_jsx_runtime.jsxs)("div", {
													className: "dsh-effort-header-row",
													children: [
														(0, react_jsx_runtime.jsx)("span", {
															className: "dsh-effort-glow-dot"
														}),
														(0, react_jsx_runtime.jsx)("span", {
															className: "dsh-effort-current-label",
															children: effortLabel
														})
													]
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													ref: trackRef,
													className: `dsh-segmented-slider-track ${isDragging ? "dsh-is-dragging" : ""}`,
													onPointerDown: handleTrackPointerDown,
													onPointerMove: handleTrackPointerMove,
													onPointerUp: handleTrackPointerUp,
													onPointerCancel: handleTrackPointerCancel,
													children: [
														(0, react_jsx_runtime.jsx)("div", {
															className: "dsh-segmented-sliding-indicator",
															style: {
																left: `${indicatorStyle.left}px`,
																width: `${indicatorStyle.width}px`,
																opacity: indicatorStyle.opacity
															}
														}),
														effortChoices.map((level) => {
															const isSelected = displayedEffort === level.effort;
															return (0, react_jsx_runtime.jsx)("button", {
																key: level.key,
																ref: (el) => {
																	if (el) optionRefs.current.set(level.key, el);
																	else optionRefs.current.delete(level.key);
																},
																type: "button",
																role: "menuitemradio",
																"aria-checked": isSelected,
																className: `dsh-segmented-option ${isSelected ? "dsh-segmented-active" : ""}`,
																onClick: () => {
																	if (!isDraggingRef.current) {
																		chooseEffort(level.effort);
																	}
																},
																children: level.label
															});
														})
													]
												})
											]
										})
									})
								]
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region src/client/index.ts
		const inject = [
			"theme",
			"slots",
			"locale"
		];
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "ui-liquid-glass: locale dictionaries");
			if (typeof document !== "undefined") {
				const POPOVER_STYLE_ID = "dsh-popover-l3-blur";
				let tag = document.getElementById(POPOVER_STYLE_ID);
				if (!tag) {
					tag = document.createElement("style");
					tag.id = POPOVER_STYLE_ID;
					document.head.appendChild(tag);
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
  position: relative !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 2px !important;
  background: rgba(0, 0, 0, 0.28) !important;
  border: 1px solid rgba(255, 255, 255, 0.10) !important;
  border-radius: 10px !important;
  padding: 3px !important;
  overflow-x: auto;
  box-sizing: border-box !important;
}

html[data-dsh-liquid-glass] .dsh-segmented-sliding-indicator,
html[data-dsh-liquid-glass] [class*="slidingIndicator"] {
  position: absolute !important;
  top: 3px !important;
  height: 26px !important;
  border-radius: 7px !important;
  background: var(--dsh-l2-glass-tint, linear-gradient(135deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.10) 100%)), var(--dsh-l2-bg, rgba(255, 255, 255, 0.14)) !important;
  border: 1px solid var(--dsh-l2-border, rgba(255, 255, 255, 0.38)) !important;
  box-shadow: var(--dsh-l2-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.50), 0 2px 8px rgba(0, 0, 0, 0.30)) !important;
  pointer-events: none !important;
  z-index: 0 !important;
  box-sizing: border-box !important;
  transition: left 0.24s cubic-bezier(0.16, 1, 0.3, 1), width 0.24s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease !important;
}

html[data-dsh-liquid-glass] .dsh-segmented-option,
html[data-dsh-liquid-glass] [class*="segmentedOption"] {
  position: relative !important;
  z-index: 1 !important;
  flex: 1 1 0px !important;
  min-width: 44px !important;
  height: 26px !important;
  padding: 0 6px !important;
  border-radius: 7px !important;
  background: transparent !important;
  border: 1px solid transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
  font-size: 12px !important;
  font-weight: 500 !important;
  line-height: 24px !important;
  cursor: pointer !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  white-space: nowrap !important;
  box-sizing: border-box !important;
  transition: color 0.16s ease !important;
}

html[data-dsh-liquid-glass] .dsh-segmented-option:hover:not(:disabled),
html[data-dsh-liquid-glass] [class*="segmentedOption"]:hover:not(:disabled) {
  color: #ffffff !important;
}

html[data-dsh-liquid-glass] .dsh-segmented-active,
html[data-dsh-liquid-glass] [class*="segmentedOption"][class*="active"],
html[data-dsh-liquid-glass] [class*="segmentedOption"][class*="selected"] {
  color: #ffffff !important;
  font-weight: 600 !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.50) !important;
  background: transparent !important;
  border: 1px solid transparent !important;
  box-shadow: none !important;
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

/* ============================================================================
 * Layer 3: 全局与会话区滚动条 (L3 液态毛玻璃滚条效果，受设置中 modalBlur 与 l3MaskOpacity 控制)
 * ========================================================================== */
[data-dsh-liquid-glass] ::-webkit-scrollbar,
html[data-dsh-liquid-glass] ::-webkit-scrollbar {
  width: 7px !important;
  height: 7px !important;
}

[data-dsh-liquid-glass] ::-webkit-scrollbar-track,
html[data-dsh-liquid-glass] ::-webkit-scrollbar-track {
  background: transparent !important;
  margin: 6px 0 !important;
}

[data-dsh-liquid-glass] ::-webkit-scrollbar-corner,
html[data-dsh-liquid-glass] ::-webkit-scrollbar-corner {
  background: transparent !important;
}

[data-dsh-liquid-glass] ::-webkit-scrollbar-thumb,
html[data-dsh-liquid-glass] ::-webkit-scrollbar-thumb {
  background: var(--dsh-l3-mask-bg, rgba(10, 16, 28, 0.65)) !important;
  backdrop-filter: blur(var(--dsh-modal-blur, 24px)) saturate(140%) !important;
  -webkit-backdrop-filter: blur(var(--dsh-modal-blur, 24px)) saturate(140%) !important;
  border: 1px solid var(--dsh-l1-border, rgba(255, 255, 255, 0.22)) !important;
  border-radius: 999px !important;
  box-shadow: inset 0 1px 1px var(--dsh-l1-rim, rgba(255, 255, 255, 0.35)), 0 2px 8px rgba(0, 0, 0, 0.35) !important;
  min-height: 36px !important;
  transition: all 0.16s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

[data-dsh-liquid-glass] ::-webkit-scrollbar-thumb:hover,
html[data-dsh-liquid-glass] ::-webkit-scrollbar-thumb:hover {
  background: var(--dsh-l2-glass-tint, linear-gradient(135deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.10) 100%)), var(--dsh-l3-mask-bg, rgba(15, 23, 42, 0.85)) !important;
  border-color: var(--dsh-l2-rim, rgba(255, 255, 255, 0.60)) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.60), 0 4px 16px rgba(0, 0, 0, 0.50) !important;
}

[data-dsh-liquid-glass] ::-webkit-scrollbar-thumb:active,
html[data-dsh-liquid-glass] ::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.20) 100%), var(--dsh-l3-mask-bg, rgba(15, 23, 42, 0.95)) !important;
  border-color: var(--dsh-l2-rim, rgba(255, 255, 255, 0.80)) !important;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.80), 0 6px 20px rgba(0, 0, 0, 0.60) !important;
}
`;
				if (!window.__dsh_modal_exit_listener_bound) {
					window.__dsh_modal_exit_listener_bound = true;
					document.addEventListener("click", (e) => {
						const target = e.target;
						if (!target) return;
						const closeTrigger = target.closest(
							'.dshMarketOverlayMask, .dshMarketOverlayHeader button, .Modal_close, [class*="Modal_close"], .Modal_mask, [class*="Modal_mask"], .dshMarketModalActions button:first-child:not([class*="primary"]), [class*="Modal_footer"] button:first-child:not([class*="primary"])'
						);
						if (closeTrigger) {
							const overlay = closeTrigger.closest('.dshMarketOverlay, [class*="Modal_root"], .dshMarketModal, [class*="Modal_dialog"]');
							if (overlay && !overlay.getAttribute("data-dsh-closing")) {
								e.preventDefault();
								e.stopPropagation();
								overlay.setAttribute("data-dsh-closing", "true");
								const root = overlay.closest('.dshMarketOverlay, [class*="Modal_root"]') || overlay;
								root.setAttribute("data-dsh-closing", "true");
								setTimeout(() => {
									closeTrigger.click();
								}, 180);
							}
						}
					}, true);
					document.addEventListener("keydown", (e) => {
						if (e.key === "Escape") {
							const overlays = document.querySelectorAll('.dshMarketOverlay, [class*="Modal_root"]');
							if (overlays.length > 0) {
								const topOverlay = overlays[overlays.length - 1];
								if (topOverlay && !topOverlay.getAttribute("data-dsh-closing")) {
									e.preventDefault();
									e.stopPropagation();
									topOverlay.setAttribute("data-dsh-closing", "true");
									setTimeout(() => {
										const closeBtn = topOverlay.querySelector('.Modal_close, [class*="Modal_close"], .dshMarketOverlayHeader button, .dshMarketOverlayMask');
										if (closeBtn) {
											closeBtn.click();
										}
									}, 180);
								}
							}
						}
					}, true);
				}
			}
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
					modalBlur: typeof s.modalBlur === "number" && !isNaN(s.modalBlur) ? s.modalBlur : 24,
					l3MaskOpacity: typeof s.l3MaskOpacity === "number" && !isNaN(s.l3MaskOpacity) ? s.l3MaskOpacity : .45,
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
					bgLiquidDispersion: s.bgLiquidDispersion
				};
			};
			const sync = () => {
				const next = payload();
				pluginBound?.sync(next, revision);
				appearanceBound?.sync(next, revision);
				revision += 1;
				updateDomPluginCard();
			};
			ctx.effect(() => ctx.on("theme/change", () => {
				sync();
			}), "ui-liquid-glass: appearance sync");
			const pluginInjected = (actions) => {
				pluginBound = actions;
				sync();
				return { setEnabled: (enabled) => {
					layer.setEnabled(enabled);
					sync();
				} };
			};
			const appearanceInjected = (actions) => {
				appearanceBound = actions;
				sync();
				return {
					applyPreset: (preset) => {
						layer.updateSettings(preset);
						sync();
					},
					setL1Blur: (val) => {
						layer.updateSettings({ l1Blur: val });
						sync();
					},
					setL1Opacity: (val) => {
						layer.updateSettings({ l1Opacity: val });
						sync();
					},
					setL1Border: (val) => {
						layer.updateSettings({ l1Border: val });
						sync();
					},
					setModalBlur: (val) => {
						layer.updateSettings({ modalBlur: val });
						sync();
					},
					setL3MaskOpacity: (val) => {
						layer.updateSettings({ l3MaskOpacity: val });
						sync();
					},
					setIor: (val) => {
						layer.updateSettings({ ior: val });
						sync();
					},
					setBulge: (val) => {
						layer.updateSettings({ bulge: val });
						sync();
					},
					setDispersion: (val) => {
						layer.updateSettings({ dispersion: val });
						sync();
					},
					setBevel: (val) => {
						layer.updateSettings({ bevel: val });
						sync();
					},
					setLensBlur: (val) => {
						layer.updateSettings({ lensBlur: val });
						sync();
					},
					setDarkening: (val) => {
						layer.updateSettings({ darkening: val });
						sync();
					},
					setRimIntensity: (val) => {
						layer.updateSettings({ rimIntensity: val });
						sync();
					},
					setLightAngle: (val) => {
						layer.updateSettings({ lightAngle: val });
						sync();
					},
					setVibrancy: (val) => {
						layer.updateSettings({ vibrancy: val });
						sync();
					},
					setRippleAmp: (val) => {
						layer.updateSettings({ rippleAmp: val });
						sync();
					},
					setDropShadowOpacity: (val) => {
						layer.updateSettings({ dropShadowOpacity: val });
						sync();
					},
					setDropShadowBlur: (val) => {
						layer.updateSettings({ dropShadowBlur: val });
						sync();
					},
					setDropShadowY: (val) => {
						layer.updateSettings({ dropShadowY: val });
						sync();
					},
					setBackground: (val) => {
						layer.updateSettings({ background: val });
						sync();
					},
					setWallpaper: (val) => {
						layer.updateSettings({ wallpaper: val });
						sync();
					},
					setBgBlur: (val) => {
						layer.updateSettings({ bgBlur: val });
						sync();
					},
					setBgLiquidEnabled: (val) => {
						layer.updateSettings({ bgLiquidEnabled: val });
						sync();
					},
					setBgLiquidAmp: (val) => {
						layer.updateSettings({ bgLiquidAmp: val });
						sync();
					},
					setBgLiquidScale: (val) => {
						layer.updateSettings({ bgLiquidScale: val });
						sync();
					},
					setBgLiquidSpeed: (val) => {
						layer.updateSettings({ bgLiquidSpeed: val });
						sync();
					},
					setBgLiquidDispersion: (val) => {
						layer.updateSettings({ bgLiquidDispersion: val });
						sync();
					}
				};
			};
			const updateDomPluginCard = () => {
				const card = document.querySelector('[data-dsh-liquid-glass-card="true"]');
				if (!card) return;
				const isEnabled = layer.getEnabled();
				const switchBtn = card.querySelector('.dsh-liquid-glass-switch, button[class*="toggle"]');
				if (switchBtn) {
					switchBtn.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
					switchBtn.style.background = isEnabled ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.30) 0%, rgba(99, 102, 241, 0.18) 100%), rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.08)';
					switchBtn.style.borderColor = isEnabled ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.18)';
					const track = switchBtn.querySelector('.dsh-switch-track, [class*="switchTrack"]');
					if (track) {
						track.style.background = isEnabled ? '#38bdf8' : 'rgba(0, 0, 0, 0.40)';
						track.style.borderColor = isEnabled ? '#7dd3fc' : 'rgba(255, 255, 255, 0.15)';
					}
					const thumb = switchBtn.querySelector('.dsh-switch-thumb, [class*="switchThumb"]');
					if (thumb) {
						thumb.style.transform = isEnabled ? 'translateX(12px)' : 'translateX(0)';
					}
					const label = switchBtn.querySelector('[class*="switchLabel"], .dsh-switch-text');
					if (label) {
						label.textContent = isEnabled ? '已开启' : '已关闭';
					}
				}
			};
			const injectPluginCardIfMissing = () => {
				if (typeof document === 'undefined') return;
				const cardLists = document.querySelectorAll(
					'[id*="panel-configurable"] ul, [class*="PluginsSettingsSection_cards"], [class*="PluginInventorySettingsTab_cards"]'
				);
				for (const list of cardLists) {
					if (list.querySelector('[data-dsh-liquid-glass-card="true"]')) continue;

					const isEnabled = layer.getEnabled();
					const li = document.createElement('li');
					li.className = 'liquid-glass-plugin-card';
					li.setAttribute('data-dsh-liquid-glass-card', 'true');
					li.style.cssText = `
						display: flex;
						flex-direction: column;
						padding: 16px 20px;
						background: var(--dsh-l2-glass-tint, linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%));
						background-color: var(--dsh-l2-bg, rgba(255, 255, 255, 0.04));
						border: 1px solid var(--dsh-l2-border, rgba(255, 255, 255, 0.22));
						border-radius: 16px;
						box-shadow: var(--dsh-l2-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 4px 16px rgba(0, 0, 0, 0.18));
						transition: all 180ms cubic-bezier(0.16, 1, 0.3, 1);
						box-sizing: border-box;
						width: 100%;
						margin-bottom: 12px;
					`;

					li.innerHTML = `
						<div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
							<div style="display: flex; flex-direction: column; gap: 4px; min-width: 0; flex: 1;">
								<div style="display: flex; align-items: center; gap: 8px;">
									<span style="font-size: 15px; line-height: 22px; font-weight: 600; color: #ffffff; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.40);">分级液态玻璃与动态壁纸</span>
									<span style="display: inline-flex; align-items: center; padding: 1px 7px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.04em; color: #38bdf8; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.30); border-radius: 999px; text-shadow: 0 0 8px rgba(56, 189, 248, 0.40);">VisionOS</span>
								</div>
								<span style="font-size: 12.5px; line-height: 18px; color: rgba(255, 255, 255, 0.65);">基于物理光学的分级液态玻璃与动态壁纸系统，支持多层透镜折射、全局模态虚化及视频/流体壁纸。</span>
							</div>
							<div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0;">
								<button type="button" class="dsh-liquid-glass-switch" aria-pressed="${isEnabled ? 'true' : 'false'}" style="
									display: inline-flex;
									align-items: center;
									gap: 8px;
									height: 32px;
									padding: 0 12px 0 6px;
									background: ${isEnabled ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.30) 0%, rgba(99, 102, 241, 0.18) 100%), rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.08)'};
									border: 1px solid ${isEnabled ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.18)'};
									border-radius: 16px;
									font-size: 12.5px;
									font-weight: 500;
									color: #ffffff;
									cursor: pointer;
									box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.20);
									transition: all 160ms cubic-bezier(0.16, 1, 0.3, 1);
								" title="${isEnabled ? '点击关闭液态玻璃效果' : '点击开启液态玻璃效果'}">
									<span class="dsh-switch-track" style="
										position: relative;
										width: 28px;
										height: 16px;
										background: ${isEnabled ? '#38bdf8' : 'rgba(0, 0, 0, 0.40)'};
										border-radius: 999px;
										border: 1px solid ${isEnabled ? '#7dd3fc' : 'rgba(255, 255, 255, 0.15)'};
										transition: background 0.18s ease, border-color 0.18s ease;
										display: inline-block;
									">
										<span class="dsh-switch-thumb" style="
											position: absolute;
											top: 1px;
											left: 1px;
											width: 12px;
											height: 12px;
											background: #ffffff;
											border-radius: 50%;
											box-shadow: 0 1px 3px rgba(0, 0, 0, 0.40);
											transform: ${isEnabled ? 'translateX(12px)' : 'translateX(0)'};
											transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
											display: block;
										"></span>
									</span>
									<span class="dsh-switch-text" style="font-size: 12px; letter-spacing: 0.02em;">${isEnabled ? '已开启' : '已关闭'}</span>
								</button>
								<button type="button" class="dsh-liquid-glass-jump-btn" style="
									display: inline-flex;
									align-items: center;
									justify-content: center;
									height: 32px;
									padding: 0 12px;
									font-size: 12px;
									font-weight: 500;
									color: rgba(255, 255, 255, 0.85);
									background: rgba(255, 255, 255, 0.06);
									border: 1px solid rgba(255, 255, 255, 0.18);
									border-radius: 10px;
									cursor: pointer;
									transition: all 140ms ease;
								" title="前往通用设置调整参数与壁纸">调节参数</button>
							</div>
						</div>
					`;

					const switchBtn = li.querySelector('.dsh-liquid-glass-switch');
					if (switchBtn) {
						switchBtn.addEventListener('click', (e) => {
							e.preventDefault();
							e.stopPropagation();
							const next = !layer.getEnabled();
							layer.setEnabled(next);
							sync();
							updateDomPluginCard();
						});
					}

					const jumpBtn = li.querySelector('.dsh-liquid-glass-jump-btn');
					if (jumpBtn) {
						jumpBtn.addEventListener('click', (e) => {
							e.preventDefault();
							e.stopPropagation();
							const navItems = document.querySelectorAll(
								'[class*="SettingsRoot_navCell"], [class*="VOzbGW_navCell"], [class*="navCell"]'
							);
							for (const item of navItems) {
								if (item.textContent?.includes('通用') || item.textContent?.includes('General')) {
									item.click();
									break;
								}
							}
						});
					}

					list.prepend(li);
				}
			};

			if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
				const observer = new MutationObserver(() => {
					injectPluginCardIfMissing();
				});
				observer.observe(document.body, { childList: true, subtree: true });
				setTimeout(() => { injectPluginCardIfMissing(); }, 100);
			}

			ctx.slots.inject("settings.plugin.item", () => ctx.slots.register({
				name: "settings.plugin.item",
				key: "liquid-glass",
				id: "liquid-glass",
				order: 6,
				store: pluginStore,
				locale: NS,
				inject: pluginInjected
			}, LiquidGlassPluginCard));
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "liquid-glass",
				order: 12,
				store: appearanceStore,
				locale: NS,
				inject: appearanceInjected
			}, LiquidGlassAppearanceRow));
			ctx.inject(["slots", "modelDirectories"], (scope) => {
				const models = scope.modelDirectories;
				const sessions = scope.sessions;
				scope.slots.inject("conversation.input.model", () => scope.slots.register({
					name: "conversation.input.model",
					priority: -10,
					locale: "@deepseek-ai/dsh-client-ui-model-selection",
					inject: (sessionId) => {
						const directory = models.directoryFor(sessionId);
						const available = sessions ? sessions.subagentAddress(sessionId) === void 0 : true;
						return {
							available,
							directory: directory.store,
							load: () => {
								if (available) directory.load().catch(() => {});
							},
							select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
						};
					}
				}, AccordionModelSelect));
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map