/**
 * High-Performance IndexedDB + LocalStorage Wallpaper Persistence.
 * Integrates Built-in Default Packaged Wallpapers + User Custom Uploads.
 */
export interface WallpaperItem {
    id: string;
    name: string;
    type: 'image' | 'video';
    blob?: Blob;
    url: string;
    poster?: string;
    isBuiltin?: boolean;
}
export interface WallpaperStoreState {
    customWallpapers: WallpaperItem[];
    activeBuiltinId: string;
    activeCustomId: string;
}
export declare function saveWallpaperStore(state: WallpaperStoreState): Promise<void>;
export declare function loadWallpaperStore(): Promise<WallpaperStoreState>;
//# sourceMappingURL=wallpaper-storage.d.ts.map