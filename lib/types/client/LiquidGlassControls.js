import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import css from './LiquidGlassAppearanceRow.module.css';
export function Knob({ label, value, min, max, step, unit, onChange }) {
    const clamp = (n) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
    return (_jsxs("label", { className: css.knob, children: [_jsx("span", { className: css.knobLabel, children: label }), _jsx("input", { type: "range", className: css.slider, min: min, max: max, step: step, value: value, onChange: (e) => { onChange(clamp(Number(e.target.value))); } }), _jsxs("span", { className: css.numberWrap, children: [_jsx("input", { type: "number", className: css.number, min: min, max: max, step: step, value: value, onChange: (e) => { onChange(clamp(Number(e.target.value))); } }), _jsx("span", { className: css.unit, children: unit })] })] }));
}
export function Segmented({ label, value, options, onSelect }) {
    const containerRef = useRef(null);
    const buttonsRef = useRef(new Map());
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        opacity: 0,
    });
    const updateIndicator = () => {
        const btn = buttonsRef.current.get(value);
        if (btn) {
            setIndicatorStyle({
                left: btn.offsetLeft,
                top: btn.offsetTop,
                width: btn.offsetWidth,
                height: btn.offsetHeight,
                opacity: 1,
            });
        }
    };
    useEffect(() => {
        updateIndicator();
        if (containerRef.current && typeof ResizeObserver !== 'undefined') {
            const ro = new ResizeObserver(() => {
                updateIndicator();
            });
            ro.observe(containerRef.current);
            return () => { ro.disconnect(); };
        }
    }, [value, options]);
    return (_jsxs("div", { ref: containerRef, className: css.segmented, role: "group", "aria-label": label, children: [_jsx("div", { className: css.segIndicator, style: {
                    transform: `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`,
                    width: `${indicatorStyle.width}px`,
                    height: `${indicatorStyle.height}px`,
                    opacity: indicatorStyle.opacity,
                } }), options.map((option) => {
                const isActive = option.id === value;
                return (_jsx("button", { ref: (el) => {
                        if (el)
                            buttonsRef.current.set(option.id, el);
                        else
                            buttonsRef.current.delete(option.id);
                    }, type: "button", className: `${css.segItem} ${isActive ? css.segItemActive : ''}`, "aria-pressed": isActive, onClick: () => { onSelect(option.id); }, children: option.label }, option.id));
            })] }));
}
export function extractVideoPoster(fileOrBlob) {
    return new Promise((resolve) => {
        try {
            const v = document.createElement('video');
            v.muted = true;
            v.autoplay = false;
            v.playsInline = true;
            v.preload = 'auto';
            const url = URL.createObjectURL(fileOrBlob);
            v.src = url;
            let resolved = false;
            const finish = (dataUrl) => {
                if (resolved)
                    return;
                resolved = true;
                try {
                    URL.revokeObjectURL(url);
                }
                catch { }
                resolve(dataUrl);
            };
            v.onloadeddata = () => {
                try {
                    const w = Math.min(v.videoWidth || 1280, 1280);
                    const scale = w / (v.videoWidth || 1280);
                    const h = Math.max(1, Math.round((v.videoHeight || 720) * scale));
                    const c = document.createElement('canvas');
                    c.width = w;
                    c.height = h;
                    const ctx = c.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(v, 0, 0, w, h);
                        const dataUrl = c.toDataURL('image/jpeg', 0.85);
                        finish(dataUrl);
                        return;
                    }
                }
                catch { }
                finish('');
            };
            v.onerror = () => { finish(''); };
            v.load();
            setTimeout(() => { finish(''); }, 2500);
        }
        catch {
            resolve('');
        }
    });
}
export async function processWallpaperFile(file) {
    const isVideo = file.type.startsWith('video/') || file.name.match(/\.(mp4|webm|mov|mkv|avi|m4v)$/i) !== null;
    if (isVideo) {
        const url = URL.createObjectURL(file);
        const poster = await extractVideoPoster(file);
        return { type: 'video', blob: file, url, poster };
    }
    // 图片处理：读取为 Blob / DataURL
    try {
        const raw = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => { resolve(String(reader.result)); };
            reader.onerror = () => { reject(reader.error); };
            reader.readAsDataURL(file);
        });
        const image = await new Promise((resolve, reject) => {
            const im = new Image();
            im.onload = () => { resolve(im); };
            im.onerror = () => { reject(new Error('image load failed')); };
            im.src = raw;
        });
        const scale = Math.min(1, 2560 / Math.max(image.width, image.height));
        if (scale >= 1) {
            const url = URL.createObjectURL(file);
            return { type: 'image', blob: file, url, poster: raw };
        }
        const w = Math.max(1, Math.round(image.width * scale));
        const h = Math.max(1, Math.round(image.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(image, 0, 0, w, h);
            const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.90));
            if (blob) {
                return { type: 'image', blob, url: URL.createObjectURL(blob), poster: raw };
            }
        }
        return { type: 'image', blob: file, url: URL.createObjectURL(file), poster: raw };
    }
    catch {
        return { type: 'image', blob: file, url: URL.createObjectURL(file) };
    }
}
export async function fileToDataUrl(file) {
    const res = await processWallpaperFile(file);
    return res.url;
}
//# sourceMappingURL=LiquidGlassControls.js.map