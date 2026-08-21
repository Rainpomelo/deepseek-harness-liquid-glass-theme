export interface BuiltinWallpaper {
  id: string
  name: string
  type: 'image' | 'video'
  url: string
  poster?: string
  isBuiltin: boolean
}

export const BUILTIN_WALLPAPERS: BuiltinWallpaper[] = [
  {
    "id": "builtin-1",
    "name": "极光之夜",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23030712'/><stop offset='40%' stop-color='%2306283d'/><stop offset='70%' stop-color='%23005b60'/><stop offset='100%' stop-color='%2300dfa2'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-2",
    "name": "深海发光",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><radialGradient id='g' cx='50%' cy='40%' r='65%'><stop offset='0%' stop-color='%23134e5e'/><stop offset='50%' stop-color='%230b1b3a'/><stop offset='100%' stop-color='%23020617'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-3",
    "name": "赛博霓虹",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='1' x2='1' y2='0'><stop offset='0%' stop-color='%23020617'/><stop offset='50%' stop-color='%232e0854'/><stop offset='100%' stop-color='%2300f2fe'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-4",
    "name": "山川破晓",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%231a0b2e'/><stop offset='50%' stop-color='%234a154b'/><stop offset='100%' stop-color='%23ff758c'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-5",
    "name": "极简星云",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%23090d16'/><stop offset='50%' stop-color='%23111f36'/><stop offset='100%' stop-color='%231e3a5f'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-6",
    "name": "暗夜深邃",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><radialGradient id='g' cx='50%' cy='50%' r='70%'><stop offset='0%' stop-color='%230f172a'/><stop offset='70%' stop-color='%23050811'/><stop offset='100%' stop-color='%23020408'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  }
]
