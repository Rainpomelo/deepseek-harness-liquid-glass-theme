/**
 * High-Performance IndexedDB + LocalStorage Wallpaper Persistence.
 * Integrates Built-in Default Packaged Wallpapers + User Custom Uploads.
 */

import { BUILTIN_WALLPAPERS } from './builtin-wallpapers.ts'

export interface WallpaperItem {
  id: string
  name: string
  type: 'image' | 'video'
  blob?: Blob
  url: string
  poster?: string
  isBuiltin?: boolean
}

export interface WallpaperStoreState {
  customWallpapers: WallpaperItem[]
  activeBuiltinId: string
  activeCustomId: string
}

const DB_NAME = 'dsh_liquid_glass_wallpapers'
const DB_VERSION = 4
const STORE_NAME = 'wallpaper_slots'
const LOCAL_FALLBACK_KEY = 'dsh.ui-liquid-glass.wallpapers'
const ACTIVE_POSTER_KEY = 'dsh.ui-liquid-glass.active_poster'

function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null)
  }
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME)
        }
      }
      req.onsuccess = () => {
        resolve(req.result)
      }
      req.onerror = () => {
        resolve(null)
      }
    } catch {
      resolve(null)
    }
  })
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl.split(',')[1] || ''
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

let memoryStoreCache: WallpaperStoreState | null = null

export async function saveWallpaperStore(state: WallpaperStoreState): Promise<void> {
  memoryStoreCache = { ...state }
  const customList = Array.isArray(state.customWallpapers) ? state.customWallpapers : []

  // 1. Upload custom files (video/image Blobs) to host disk to survive dynamic port switches
  for (const it of customList) {
    if (!it.isBuiltin && it.blob instanceof Blob) {
      try {
        const base64Data = await blobToBase64(it.blob)
        let ext = it.type === 'video' ? 'mp4' : 'png'
        if (it.name && it.name.includes('.')) {
          ext = it.name.split('.').pop() || ext
        }
        let posterBase64 = ''
        if (it.poster && it.poster.startsWith('data:image')) {
          posterBase64 = it.poster.split(',')[1] || ''
        }
        const res = await fetch('/api/liquid-glass/upload-wallpaper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: it.id,
            ext,
            base64Data,
            posterBase64,
          }),
        })
        if (res.ok) {
          const json = await res.json()
          if (json.fileUrl) {
            it.url = json.fileUrl
          }
          if (json.posterUrl) {
            it.poster = json.posterUrl
          }
        }
      } catch {}
    }
  }

  const rawItems = customList.filter(it => !it.isBuiltin).map(it => ({
    id: it.id,
    name: it.name,
    type: it.type,
    blob: it.blob ?? null,
    url: it.url || `/api/liquid-glass/wallpaper-file?id=${it.id}`,
    poster: it.poster ?? '',
  }))

  const payload = {
    customWallpapers: rawItems,
    activeBuiltinId: state.activeBuiltinId,
    activeCustomId: state.activeCustomId,
  }

  try { localStorage.removeItem('dsh.ui-liquid-glass.active_poster') } catch {}

  const db = await openDB()
  if (db) {
    await new Promise<void>((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readwrite')
        const store = tx.objectStore(STORE_NAME)
        store.put(payload, 'current_state_v4')
        tx.oncomplete = () => { resolve() }
        tx.onerror = () => { resolve() }
      } catch {
        resolve()
      }
    })
  }
  try {
    localStorage.setItem(LOCAL_FALLBACK_KEY, JSON.stringify(payload))
  } catch {}

  try {
    await fetch('/api/liquid-glass/wallpapers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        activeBuiltinId: state.activeBuiltinId,
        activeCustomId: state.activeCustomId,
        customWallpapers: rawItems.map(it => ({
          id: it.id,
          name: it.name,
          type: it.type,
          url: it.url,
          poster: it.poster,
        })),
      }),
    }).catch(() => {})
  } catch {}
}

export async function loadWallpaperStore(): Promise<WallpaperStoreState> {
  if (memoryStoreCache) {
    return { ...memoryStoreCache }
  }

  let customWallpapers: WallpaperItem[] = []
  let activeBuiltinId = BUILTIN_WALLPAPERS.find(w => w.id === 'builtin-6')?.id ?? BUILTIN_WALLPAPERS[0]?.id ?? 'builtin-1'
  let activeCustomId = ''

  const db = await openDB()
  if (db) {
    const data = await new Promise<any | null>((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly')
        const store = tx.objectStore(STORE_NAME)
        const req = store.get('current_state_v4')
        req.onsuccess = () => {
          resolve(req.result ?? null)
        }
        req.onerror = () => {
          resolve(null)
        }
      } catch {
        resolve(null)
      }
    })
    if (data) {
      if (data.activeBuiltinId && BUILTIN_WALLPAPERS.some(w => w.id === data.activeBuiltinId)) {
        activeBuiltinId = data.activeBuiltinId
      }
      if (typeof data.activeCustomId === 'string') {
        activeCustomId = data.activeCustomId
      }
      if (Array.isArray(data.customWallpapers)) {
        customWallpapers = data.customWallpapers.filter((it: any) => !it.id?.startsWith('builtin-')).map((it: any) => {
          let url = it.url || `/api/liquid-glass/wallpaper-file?id=${it.id}`
          if (it.blob instanceof Blob) {
            try {
              url = URL.createObjectURL(it.blob)
            } catch {}
          }
          return {
            id: it.id,
            name: it.name,
            type: it.type,
            blob: it.blob instanceof Blob ? it.blob : undefined,
            url,
            poster: typeof it.poster === 'string' ? it.poster : undefined,
            isBuiltin: false,
          }
        })
      }
    }
  }

  // Fallback / sync from disk API (survives dynamic port change and fresh browser state)
  try {
    const res = await fetch('/api/liquid-glass/wallpapers')
    if (res.ok) {
      const disk = await res.json()
      if (disk && typeof disk === 'object') {
        if (disk.activeBuiltinId && BUILTIN_WALLPAPERS.some(w => w.id === disk.activeBuiltinId)) {
          activeBuiltinId = disk.activeBuiltinId
        }
        if (typeof disk.activeCustomId === 'string' && disk.activeCustomId) {
          activeCustomId = disk.activeCustomId
        }
        if (Array.isArray(disk.customWallpapers) && disk.customWallpapers.length > 0) {
          const diskItems: WallpaperItem[] = disk.customWallpapers.map((it: any) => {
            const existing = customWallpapers.find(c => c.id === it.id)
            return {
              id: it.id,
              name: it.name || 'Custom Wallpaper',
              type: it.type || 'image',
              blob: existing?.blob,
              url: existing?.url || it.url || `/api/liquid-glass/wallpaper-file?id=${it.id}`,
              poster: it.poster || existing?.poster,
              isBuiltin: false,
            }
          })
          if (customWallpapers.length === 0) {
            customWallpapers = diskItems
          } else {
            for (const d of diskItems) {
              if (!customWallpapers.some(c => c.id === d.id)) {
                customWallpapers.push(d)
              }
            }
          }
        }
      }
    }
  } catch {}

  const result: WallpaperStoreState = {
    customWallpapers: Array.isArray(customWallpapers) ? customWallpapers : [],
    activeBuiltinId,
    activeCustomId,
  }
  memoryStoreCache = result
  return result
}

