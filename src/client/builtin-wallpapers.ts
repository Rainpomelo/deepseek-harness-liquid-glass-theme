import { DEFAULT_DEEPSEEK_VIDEO, DEFAULT_ELDEN_RING_VIDEO, DEFAULT_THUNDERSTORM_VIDEO } from './default-videos-data'

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
    "id": "builtin-video-1",
    "name": "DeepSeek",
    "type": "video",
    "url": DEFAULT_DEEPSEEK_VIDEO,
    "isBuiltin": true
  },
  {
    "id": "builtin-video-2",
    "name": "ELDEN RING™",
    "type": "video",
    "url": DEFAULT_ELDEN_RING_VIDEO,
    "isBuiltin": true
  },
  {
    "id": "builtin-video-3",
    "name": "雷暴预感 1080p",
    "type": "video",
    "url": DEFAULT_THUNDERSTORM_VIDEO,
    "isBuiltin": true
  },
  {
    "id": "builtin-1",
    "name": "绫波丽",
    "type": "image",
    "url": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAAEAAYDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCLQA//2Q==",
    "isBuiltin": true
  },
  {
    "id": "builtin-2",
    "name": "山川破晓",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%231a102f'/><stop offset='50%' stop-color='%23422057'/><stop offset='100%' stop-color='%23ee596f'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-3",
    "name": "赛博霓虹",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='1' x2='1' y2='0'><stop offset='0%' stop-color='%23050505'/><stop offset='60%' stop-color='%230b3b49'/><stop offset='100%' stop-color='%2300ffcc'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-4",
    "name": "深海发光",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><radialGradient id='g' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%230052d4'/><stop offset='50%' stop-color='%234364f7'/><stop offset='100%' stop-color='%2306101e'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-5",
    "name": "极简星云",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='%230f2027'/><stop offset='50%' stop-color='%23203a43'/><stop offset='100%' stop-color='%232c5364'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  },
  {
    "id": "builtin-6",
    "name": "极光之夜",
    "type": "image",
    "url": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stop-color='%23020024'/><stop offset='40%' stop-color='%2309797d'/><stop offset='100%' stop-color='%2300d4ff'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/></svg>",
    "isBuiltin": true
  }
]
