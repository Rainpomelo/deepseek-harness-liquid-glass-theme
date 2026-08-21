import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { Knob, processWallpaperFile, Segmented } from "./LiquidGlassControls.js";
import { LIQUID_GLASS_DEFAULTS } from "./settings-store.js";
import { BUILTIN_WALLPAPERS } from "./builtin-wallpapers.js";
import { loadWallpaperStore, saveWallpaperStore } from "./wallpaper-storage.js";
import css from './LiquidGlassAppearanceRow.module.css';
export const USER_PRESET_KEY = 'dsh.ui-liquid-glass.user-preset';
export function LiquidGlassAppearanceRow(props) {
    const { t, applyPreset, setL1Blur, setL1Opacity, setL1Border, setModalBlur, setL3MaskOpacity, setIor, setBulge, setDispersion, setBevel, setLensBlur, setDarkening, setRimIntensity, setLightAngle, setVibrancy, setRippleAmp, setDropShadowOpacity, setDropShadowBlur, setDropShadowY, setBackground, setWallpaper, setBgBlur, setBgLiquidEnabled, setBgLiquidAmp, setBgLiquidScale, setBgLiquidSpeed, setBgLiquidDispersion, useStore, } = props;
    const enabled = useStore(s => s.enabled);
    const l1Blur = useStore(s => s.l1Blur);
    const l1Opacity = useStore(s => s.l1Opacity);
    const l1Border = useStore(s => s.l1Border);
    const modalBlur = useStore(s => typeof s.modalBlur === 'number' && !isNaN(s.modalBlur) ? s.modalBlur : 24);
    const l3MaskOpacity = useStore(s => typeof s.l3MaskOpacity === 'number' && !isNaN(s.l3MaskOpacity) ? s.l3MaskOpacity : 0.45);
    const ior = useStore(s => s.ior);
    const bulge = useStore(s => s.bulge);
    const dispersion = useStore(s => s.dispersion);
    const bevel = useStore(s => s.bevel);
    const lensBlur = useStore(s => s.lensBlur);
    const darkening = useStore(s => s.darkening);
    const rimIntensity = useStore(s => s.rimIntensity);
    const lightAngle = useStore(s => s.lightAngle);
    const vibrancy = useStore(s => s.vibrancy);
    const rippleAmp = useStore(s => s.rippleAmp);
    const dropShadowOpacity = useStore(s => s.dropShadowOpacity);
    const dropShadowBlur = useStore(s => s.dropShadowBlur);
    const dropShadowY = useStore(s => s.dropShadowY);
    const background = useStore(s => s.background);
    const wallpaper = useStore(s => s.wallpaper);
    const bgBlur = useStore(s => s.bgBlur);
    const bgLiquidEnabled = useStore(s => s.bgLiquidEnabled);
    const bgLiquidAmp = useStore(s => s.bgLiquidAmp);
    const bgLiquidScale = useStore(s => s.bgLiquidScale);
    const bgLiquidSpeed = useStore(s => s.bgLiquidSpeed);
    const bgLiquidDispersion = useStore(s => s.bgLiquidDispersion);
    const [expanded, setExpanded] = useState(false);
    const [notice, setNotice] = useState('');
    const fileRef = useRef(null);
    // 1. 推荐壁纸（内置）与自定义壁纸（用户上传）分别独立管理
    const [customWallpapers, setCustomWallpapers] = useState([]);
    const [activeBuiltinId, setActiveBuiltinId] = useState(BUILTIN_WALLPAPERS[0]?.id || 'builtin-1');
    const [activeCustomId, setActiveCustomId] = useState('');
    useEffect(() => {
        loadWallpaperStore().then(({ customWallpapers: custom, activeBuiltinId: builtinId, activeCustomId: custId }) => {
            setCustomWallpapers(custom);
            setActiveBuiltinId(builtinId);
            setActiveCustomId(custId);
            // 仅当当前全局壁纸未初始化时才进行保底设置，避免每次打开设置弹窗时重复生成 Blob URL 导致视频壁纸闪烁
            if (!wallpaper) {
                if (background === 'gradient') {
                    const cur = BUILTIN_WALLPAPERS.find(it => it.id === builtinId) || BUILTIN_WALLPAPERS[0];
                    if (cur)
                        setWallpaper(cur.url);
                }
                else {
                    const cur = custom.find(it => it.id === custId) || custom[0];
                    if (cur)
                        setWallpaper(cur.type === 'video' ? `video:${cur.url}` : cur.url);
                }
            }
        });
    }, []);
    const showNotice = (msg) => {
        setNotice(msg);
        setTimeout(() => { setNotice(''); }, 2500);
    };
    // 1. 预设保存：严格只保存光学与玻璃参数，杜绝保存壁纸
    const handleSaveUserPreset = () => {
        try {
            const current = {
                l1Blur, l1Opacity, l1Border, modalBlur, l3MaskOpacity,
                ior, bulge, dispersion, bevel, lensBlur, darkening, rimIntensity,
                lightAngle, vibrancy, rippleAmp, dropShadowOpacity, dropShadowBlur, dropShadowY,
                bgBlur, bgLiquidEnabled, bgLiquidAmp, bgLiquidScale, bgLiquidSpeed, bgLiquidDispersion,
            };
            localStorage.setItem(USER_PRESET_KEY, JSON.stringify(current));
            showNotice(t('liquidGlass.savedNotice'));
        }
        catch {
            showNotice('保存失败');
        }
    };
    // 2. 预设加载：严格剔除壁纸属性，保留用户当前的壁纸库与底板
    const handleLoadUserPreset = () => {
        try {
            const raw = localStorage.getItem(USER_PRESET_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                delete parsed.background;
                delete parsed.wallpaper;
                delete parsed.wallpapers;
                applyPreset(parsed);
                showNotice(t('liquidGlass.loadedNotice'));
            }
            else {
                showNotice(t('liquidGlass.noUserPreset'));
            }
        }
        catch {
            showNotice(t('liquidGlass.noUserPreset'));
        }
    };
    // 3. 恢复默认：仅恢复参数默认值，保留用户当前壁纸
    const handleRestoreDefault = () => {
        const { background: _bg, wallpaper: _wp, ...cleanDefaults } = LIQUID_GLASS_DEFAULTS;
        applyPreset(cleanDefaults);
        showNotice(t('liquidGlass.restoredNotice'));
    };
    // 4. 自定义壁纸增删交互
    const handleAddCustomWallpaper = async (file) => {
        try {
            const { type, blob, url, poster } = await processWallpaperFile(file);
            const newItem = {
                id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                name: file.name,
                type,
                blob,
                url,
                poster,
                isBuiltin: false,
            };
            const next = [...customWallpapers, newItem];
            setCustomWallpapers(next);
            setActiveCustomId(newItem.id);
            setWallpaper(type === 'video' ? `video:${url}|${poster || ''}` : url);
            setBackground('wallpaper');
            await saveWallpaperStore({ customWallpapers: next, activeBuiltinId, activeCustomId: newItem.id });
            showNotice(type === 'video' ? '视频壁纸已添加并生效' : '图片壁纸已添加并生效');
        }
        catch {
            showNotice('添加壁纸失败');
        }
    };
    const handleDeleteCustomWallpaper = async (id) => {
        const target = customWallpapers.find(w => w.id === id);
        if (target?.url.startsWith('blob:')) {
            try {
                URL.revokeObjectURL(target.url);
            }
            catch { }
        }
        const next = customWallpapers.filter(w => w.id !== id);
        setCustomWallpapers(next);
        if (activeCustomId === id) {
            if (next.length > 0) {
                setActiveCustomId(next[0].id);
                setWallpaper(next[0].type === 'video' ? `video:${next[0].url}|${next[0].poster || ''}` : next[0].url);
                await saveWallpaperStore({ customWallpapers: next, activeBuiltinId, activeCustomId: next[0].id });
            }
            else {
                setActiveCustomId('');
                // 若自定义已删空，平滑切换到默认推荐
                const cur = BUILTIN_WALLPAPERS.find(it => it.id === activeBuiltinId) || BUILTIN_WALLPAPERS[0];
                if (cur)
                    setWallpaper(cur.url);
                setBackground('gradient');
                await saveWallpaperStore({ customWallpapers: [], activeBuiltinId, activeCustomId: '' });
            }
        }
        else {
            await saveWallpaperStore({ customWallpapers: next, activeBuiltinId, activeCustomId });
        }
        showNotice('壁纸已删除');
    };
    const trackRef = useRef(null);
    const dragInfo = useRef({
        isDown: false,
        startX: 0,
        scrollLeft: 0,
        isDragging: false,
        hasMoved: false,
        pointerId: -1,
        velocity: 0,
        lastX: 0,
        lastTime: 0,
        rafId: 0,
    });
    const handleWheel = (e) => {
        if (e.deltaY !== 0 && trackRef.current) {
            trackRef.current.scrollLeft += e.deltaY * 0.9;
        }
    };
    const handlePointerDown = (e) => {
        if (e.button !== 0)
            return;
        const target = e.target;
        if (target?.closest('button, [data-no-drag], input')) {
            return;
        }
        const track = trackRef.current;
        if (!track)
            return;
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
        if (!dragInfo.current.isDown)
            return;
        const track = trackRef.current;
        if (!track)
            return;
        const deltaX = e.clientX - dragInfo.current.startX;
        // 当且仅当单次滑动位移超过 8px 时才正式判定为拖拽滑动并捕获指针
        if (!dragInfo.current.isDragging && Math.abs(deltaX) > 8) {
            dragInfo.current.isDragging = true;
            dragInfo.current.hasMoved = true;
            try {
                track.setPointerCapture(dragInfo.current.pointerId);
            }
            catch { }
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
        if (!dragInfo.current.isDown)
            return;
        const wasDragging = dragInfo.current.isDragging;
        dragInfo.current.isDown = false;
        dragInfo.current.isDragging = false;
        const track = trackRef.current;
        if (track && wasDragging) {
            try {
                track.releasePointerCapture(e.pointerId);
            }
            catch { }
            // 物理阻尼惯性滑动
            let v = dragInfo.current.velocity * 14;
            if (Math.abs(v) > 1.2) {
                const stepInertia = () => {
                    if (!trackRef.current || Math.abs(v) < 0.2)
                        return;
                    trackRef.current.scrollLeft -= v;
                    v *= 0.92;
                    dragInfo.current.rafId = requestAnimationFrame(stepInertia);
                };
                dragInfo.current.rafId = requestAnimationFrame(stepInertia);
            }
            // 延迟重置 hasMoved 标志以抑制拖拽释放瞬间触发的 onClick
            setTimeout(() => {
                dragInfo.current.hasMoved = false;
            }, 100);
        }
        else {
            dragInfo.current.hasMoved = false;
        }
    };
    const handlePointerCancel = (e) => {
        dragInfo.current.isDown = false;
        dragInfo.current.isDragging = false;
        dragInfo.current.hasMoved = false;
        const track = trackRef.current;
        if (track) {
            try {
                track.releasePointerCapture(e.pointerId);
            }
            catch { }
        }
    };
    return (_jsxs("div", { className: css.group, children: [_jsxs("div", { className: css.cardAccordion, children: [_jsxs("div", { className: css.accordionHeader, role: "button", tabIndex: 0, onClick: () => { setExpanded(!expanded); }, onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ')
                            setExpanded(!expanded); }, children: [_jsx("span", { className: css.accordionTitle, children: t('liquidGlass.presetSection') }), _jsx("span", { className: `${css.chevron} ${expanded ? css.chevronExpanded : ''}`, children: "\u25BC" })] }), _jsx("div", { className: `${css.accordionCollapse} ${expanded ? css.accordionCollapseExpanded : ''}`, children: _jsx("div", { className: css.accordionInner, children: _jsxs("div", { className: `${css.accordionBody} ${expanded ? css.accordionBodyExpanded : ''}`, children: [_jsxs("div", { className: css.presetActions, children: [_jsx("button", { type: "button", className: css.actionBtn, onClick: handleSaveUserPreset, children: t('liquidGlass.saveUserPreset') }), _jsx("button", { type: "button", className: css.actionBtn, onClick: handleLoadUserPreset, children: t('liquidGlass.loadUserPreset') }), _jsx("button", { type: "button", className: css.actionBtn, onClick: handleRestoreDefault, children: t('liquidGlass.restoreDefault') })] }), notice && _jsx("div", { className: css.notice, children: notice })] }) }) })] }), _jsx("div", { className: css.rowSectionHeader, children: t('liquidGlass.l1Section') }), _jsxs("div", { className: css.controls, children: [_jsx(Knob, { label: t('liquidGlass.l1Blur'), value: l1Blur, min: 0, max: 60, step: 1, unit: "px", onChange: setL1Blur }), _jsx(Knob, { label: t('liquidGlass.l1Opacity'), value: l1Opacity, min: 0.00, max: 0.90, step: 0.05, unit: "", onChange: setL1Opacity }), _jsx(Knob, { label: t('liquidGlass.l1Border'), value: l1Border, min: 0.00, max: 1.00, step: 0.02, unit: "", onChange: setL1Border })] }), _jsx("div", { className: css.rowSectionHeader, children: t('liquidGlass.l2Section') }), _jsxs("div", { className: css.controls, children: [_jsx(Knob, { label: t('liquidGlass.ior'), value: ior, min: 0.80, max: 2.40, step: 0.02, unit: "", onChange: setIor }), _jsx(Knob, { label: t('liquidGlass.bulge'), value: bulge, min: -1.50, max: 2.50, step: 0.05, unit: "", onChange: setBulge }), _jsx(Knob, { label: t('liquidGlass.dispersion'), value: dispersion, min: 0.00, max: 0.10, step: 0.005, unit: "", onChange: setDispersion }), _jsx(Knob, { label: t('liquidGlass.bevel'), value: bevel, min: 0.005, max: 0.10, step: 0.005, unit: "", onChange: setBevel }), _jsx(Knob, { label: t('liquidGlass.lensBlur'), value: lensBlur, min: 0, max: 40, step: 1, unit: "px", onChange: setLensBlur }), _jsx(Knob, { label: t('liquidGlass.darkening'), value: darkening, min: 0.00, max: 0.80, step: 0.05, unit: "", onChange: setDarkening }), _jsx(Knob, { label: t('liquidGlass.rimIntensity'), value: rimIntensity, min: 0.00, max: 1.00, step: 0.05, unit: "", onChange: setRimIntensity }), _jsx(Knob, { label: t('liquidGlass.lightAngle'), value: lightAngle, min: 0, max: 360, step: 5, unit: "\u00B0", onChange: setLightAngle }), _jsx(Knob, { label: t('liquidGlass.vibrancy'), value: vibrancy, min: 0.50, max: 2.00, step: 0.05, unit: "x", onChange: setVibrancy }), _jsx(Knob, { label: t('liquidGlass.rippleAmp'), value: rippleAmp, min: 0.00, max: 1.00, step: 0.05, unit: "", onChange: setRippleAmp }), _jsx(Knob, { label: t('liquidGlass.dropShadowOpacity'), value: dropShadowOpacity, min: 0.00, max: 1.00, step: 0.05, unit: "", onChange: setDropShadowOpacity }), _jsx(Knob, { label: t('liquidGlass.dropShadowBlur'), value: dropShadowBlur, min: 0, max: 120, step: 2, unit: "px", onChange: setDropShadowBlur }), _jsx(Knob, { label: t('liquidGlass.dropShadowY'), value: dropShadowY, min: 0, max: 60, step: 2, unit: "px", onChange: setDropShadowY })] }), _jsx("div", { className: css.rowSectionHeader, children: t('liquidGlass.l3Section') }), _jsxs("div", { className: css.controls, children: [_jsx(Knob, { label: t('liquidGlass.modalBlur'), value: modalBlur, min: 0, max: 60, step: 1, unit: "px", onChange: setModalBlur }), _jsx(Knob, { label: t('liquidGlass.l3MaskOpacity'), value: l3MaskOpacity, min: 0.00, max: 0.90, step: 0.05, unit: "", onChange: setL3MaskOpacity })] }), _jsx("div", { className: css.rowSectionHeader, children: t('liquidGlass.bgSection') }), _jsxs("div", { className: css.controls, children: [_jsxs("div", { className: css.row, children: [_jsx("span", { className: css.rowLabel, children: t('liquidGlass.background') }), _jsx(Segmented, { label: t('liquidGlass.background'), value: background, options: [
                                    { id: 'gradient', label: t('liquidGlass.backgroundGradient') },
                                    { id: 'wallpaper', label: t('liquidGlass.backgroundWallpaper') },
                                ], onSelect: (val) => {
                                    setBackground(val);
                                    if (val === 'gradient') {
                                        const cur = BUILTIN_WALLPAPERS.find(it => it.id === activeBuiltinId) || BUILTIN_WALLPAPERS[0];
                                        if (cur)
                                            setWallpaper(cur.url);
                                    }
                                    else {
                                        const cur = customWallpapers.find(it => it.id === activeCustomId) || customWallpapers[0];
                                        if (cur) {
                                            setWallpaper(cur.type === 'video' ? `video:${cur.url}` : cur.url);
                                        }
                                    }
                                } })] }), background === 'gradient' && (_jsxs("div", { className: css.galleryContainer, children: [_jsxs("div", { className: css.galleryHeader, children: [_jsx("span", { className: css.galleryTitle, children: t('liquidGlass.builtinGallery') }), _jsxs("span", { className: css.galleryBadge, children: [BUILTIN_WALLPAPERS.length, " \u5F20\u63A8\u8350"] })] }), _jsx("div", { ref: trackRef, className: css.galleryTrack, onWheel: handleWheel, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, onPointerCancel: handlePointerCancel, children: BUILTIN_WALLPAPERS.map((wp, idx) => {
                                    const isActive = wp.id === activeBuiltinId;
                                    return (_jsxs("div", { className: `${css.slotCard} ${isActive ? css.slotCardActive : ''}`, onClick: () => {
                                            if (!dragInfo.current.hasMoved) {
                                                setActiveBuiltinId(wp.id);
                                                setWallpaper(wp.url);
                                                void saveWallpaperStore({ customWallpapers, activeBuiltinId: wp.id, activeCustomId });
                                            }
                                        }, title: wp.name, children: [_jsx("img", { src: wp.url, alt: wp.name, className: css.slotThumb }), _jsx("div", { className: css.slotOverlay, children: _jsx("span", { className: css.slotTypeBadge, children: "\u5185\u7F6E" }) }), isActive && (_jsx("div", { className: css.slotActiveBadge, children: _jsx("span", { children: "\u2713" }) })), _jsx("div", { className: css.slotFooter, children: _jsx("span", { className: css.slotName, children: wp.name || `推荐 ${idx + 1}` }) })] }, wp.id));
                                }) })] })), background === 'wallpaper' && (_jsxs("div", { className: css.galleryContainer, children: [_jsxs("div", { className: css.galleryHeader, children: [_jsx("span", { className: css.galleryTitle, children: t('liquidGlass.wallpaperGallery') }), _jsxs("span", { className: css.galleryBadge, children: [customWallpapers.length, " \u5F20\u5DF2\u5B58"] })] }), _jsxs("div", { ref: trackRef, className: css.galleryTrack, onWheel: handleWheel, onPointerDown: handlePointerDown, onPointerMove: handlePointerMove, onPointerUp: handlePointerUp, onPointerCancel: handlePointerCancel, children: [customWallpapers.map((wp, idx) => {
                                        const isActive = wp.id === activeCustomId;
                                        return (_jsxs("div", { className: `${css.slotCard} ${isActive ? css.slotCardActive : ''}`, onClick: () => {
                                                if (!dragInfo.current.hasMoved) {
                                                    setActiveCustomId(wp.id);
                                                    setWallpaper(wp.type === 'video' ? `video:${wp.url}` : wp.url);
                                                    void saveWallpaperStore({ customWallpapers, activeBuiltinId, activeCustomId: wp.id });
                                                }
                                            }, title: wp.name, children: [wp.type === 'video' ? (_jsx("video", { src: wp.url, autoPlay: true, loop: true, muted: true, playsInline: true, className: css.slotThumb })) : (_jsx("img", { src: wp.url, alt: wp.name, className: css.slotThumb })), _jsxs("div", { className: css.slotOverlay, children: [_jsx("span", { className: css.slotTypeBadge, children: wp.type === 'video' ? t('liquidGlass.videoBadge') : t('liquidGlass.imageBadge') }), _jsx("button", { type: "button", className: css.slotDeleteBtn, "data-no-drag": "true", title: t('liquidGlass.deleteWallpaper'), onPointerDown: (e) => { e.stopPropagation(); }, onClick: (e) => {
                                                                e.stopPropagation();
                                                                void handleDeleteCustomWallpaper(wp.id);
                                                            }, children: "\u2715" })] }), isActive && (_jsx("div", { className: css.slotActiveBadge, children: _jsx("span", { children: "\u2713" }) })), _jsx("div", { className: css.slotFooter, children: _jsx("span", { className: css.slotName, children: wp.name || `自定义 ${idx + 1}` }) })] }, wp.id));
                                    }), _jsxs("button", { type: "button", className: css.slotAddCard, "data-no-drag": "true", onPointerDown: (e) => { e.stopPropagation(); }, onClick: (e) => {
                                            e.stopPropagation();
                                            fileRef.current?.click();
                                        }, children: [_jsx("span", { className: css.addIcon, children: "+" }), _jsx("span", { className: css.addLabel, children: t('liquidGlass.addWallpaper') }), _jsx("span", { className: css.addHint, children: "\u56FE\u7247 / \u89C6\u9891" })] })] }), _jsx("input", { ref: fileRef, type: "file", accept: "image/*,video/*", style: { display: 'none' }, onChange: async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        await handleAddCustomWallpaper(file);
                                        e.target.value = '';
                                    }
                                } })] })), _jsx(Knob, { label: t('liquidGlass.bgBlur'), value: bgBlur, min: 0, max: 60, step: 1, unit: "px", onChange: setBgBlur }), _jsxs("div", { className: css.row, children: [_jsx("span", { className: css.rowLabel, children: t('liquidGlass.bgLiquidEnable') }), _jsx(Segmented, { label: t('liquidGlass.bgLiquidEnable'), value: bgLiquidEnabled ? 'on' : 'off', options: [
                                    { id: 'off', label: t('liquidGlass.disable') },
                                    { id: 'on', label: t('liquidGlass.enable') },
                                ], onSelect: (val) => { setBgLiquidEnabled(val === 'on'); } })] }), bgLiquidEnabled && (_jsxs(_Fragment, { children: [_jsx(Knob, { label: t('liquidGlass.bgLiquidAmp'), value: bgLiquidAmp, min: 0.00, max: 2.00, step: 0.05, unit: "", onChange: setBgLiquidAmp }), _jsx(Knob, { label: t('liquidGlass.bgLiquidScale'), value: bgLiquidScale, min: 0.2, max: 2.5, step: 0.05, unit: "x", onChange: setBgLiquidScale }), _jsx(Knob, { label: t('liquidGlass.bgLiquidSpeed'), value: bgLiquidSpeed, min: 0.1, max: 3.0, step: 0.1, unit: "x", onChange: setBgLiquidSpeed }), _jsx(Knob, { label: t('liquidGlass.bgLiquidDispersion'), value: bgLiquidDispersion, min: 0.00, max: 0.08, step: 0.005, unit: "", onChange: setBgLiquidDispersion })] }))] })] }));
}
//# sourceMappingURL=LiquidGlassAppearanceRow.js.map