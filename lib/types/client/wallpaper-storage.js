/**
 * High-Performance IndexedDB + LocalStorage Wallpaper Persistence.
 * Integrates Built-in Default Packaged Wallpapers + User Custom Uploads.
 */
import { BUILTIN_WALLPAPERS } from "./builtin-wallpapers.js";
const DB_NAME = 'dsh_liquid_glass_wallpapers';
const DB_VERSION = 4;
const STORE_NAME = 'wallpaper_slots';
const LOCAL_FALLBACK_KEY = 'dsh.ui-liquid-glass.wallpapers';
const ACTIVE_POSTER_KEY = 'dsh.ui-liquid-glass.active_poster';
function openDB() {
    if (typeof window === 'undefined' || !window.indexedDB) {
        return Promise.resolve(null);
    }
    return new Promise((resolve) => {
        try {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
            req.onsuccess = () => {
                resolve(req.result);
            };
            req.onerror = () => {
                resolve(null);
            };
        }
        catch {
            resolve(null);
        }
    });
}
let memoryStoreCache = null;
export async function saveWallpaperStore(state) {
    memoryStoreCache = { ...state };
    const customList = Array.isArray(state.customWallpapers) ? state.customWallpapers : [];
    const rawItems = customList.filter(it => !it.isBuiltin).map(it => ({
        id: it.id,
        name: it.name,
        type: it.type,
        blob: it.blob ?? null,
        url: it.blob ? '' : it.url,
        poster: it.poster ?? '',
    }));
    const payload = {
        customWallpapers: rawItems,
        activeBuiltinId: state.activeBuiltinId,
        activeCustomId: state.activeCustomId,
    };
    // 同步缓存当前活跃壁纸的首帧海报，实现冷启动 0ms 瞬间秒开
    const activeCustom = customList.find(it => it.id === state.activeCustomId);
    if (activeCustom?.poster) {
        try {
            localStorage.setItem(ACTIVE_POSTER_KEY, activeCustom.poster);
        }
        catch { }
    }
    else if (!state.activeCustomId) {
        try {
            localStorage.removeItem(ACTIVE_POSTER_KEY);
        }
        catch { }
    }
    const db = await openDB();
    if (db) {
        await new Promise((resolve) => {
            try {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                store.put(payload, 'current_state_v4');
                tx.oncomplete = () => { resolve(); };
                tx.onerror = () => { resolve(); };
            }
            catch {
                resolve();
            }
        });
    }
    try {
        localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(payload));
    }
    catch { }
}
export async function loadWallpaperStore() {
    if (memoryStoreCache) {
        return { ...memoryStoreCache };
    }
    let customWallpapers = [];
    let activeBuiltinId = BUILTIN_WALLPAPERS[0]?.id ?? 'builtin-1';
    let activeCustomId = '';
    const db = await openDB();
    if (db) {
        const data = await new Promise((resolve) => {
            try {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const req = store.get('current_state_v4');
                req.onsuccess = () => {
                    resolve(req.result ?? null);
                };
                req.onerror = () => {
                    resolve(null);
                };
            }
            catch {
                resolve(null);
            }
        });
        if (data) {
            if (data.activeBuiltinId && BUILTIN_WALLPAPERS.some(w => w.id === data.activeBuiltinId)) {
                activeBuiltinId = data.activeBuiltinId;
            }
            if (typeof data.activeCustomId === 'string') {
                activeCustomId = data.activeCustomId;
            }
            if (Array.isArray(data.customWallpapers)) {
                customWallpapers = data.customWallpapers.filter((it) => !it.id?.startsWith('builtin-')).map((it) => {
                    let url = it.url || '';
                    if (it.blob instanceof Blob) {
                        try {
                            url = URL.createObjectURL(it.blob);
                        }
                        catch { }
                    }
                    return {
                        id: it.id,
                        name: it.name,
                        type: it.type,
                        blob: it.blob instanceof Blob ? it.blob : undefined,
                        url,
                        poster: typeof it.poster === 'string' ? it.poster : undefined,
                        isBuiltin: false,
                    };
                });
            }
        }
    }
    const result = {
        customWallpapers: Array.isArray(customWallpapers) ? customWallpapers : [],
        activeBuiltinId,
        activeCustomId,
    };
    memoryStoreCache = result;
    return result;
}
//# sourceMappingURL=wallpaper-storage.js.map