/** `settings.liquid-glass` namespace dictionaries. */

export const NS = 'settings.liquid-glass'

export const zh = {
  'liquidGlass.title': '分级液态玻璃与动态壁纸',
  'liquidGlass.description': '基于物理光学的分级液态玻璃与动态壁纸系统，支持多层透镜折射、全局模态虚化及视频/流体壁纸。',
  'liquidGlass.enable': '开启',
  'liquidGlass.disable': '关闭',
  
  // 预设管理
  'liquidGlass.presetSection': '预设管理',
  'liquidGlass.saveUserPreset': '保存预设',
  'liquidGlass.loadUserPreset': '加载预设',
  'liquidGlass.restoreDefault': '恢复默认',
  'liquidGlass.savedNotice': '预设已保存',
  'liquidGlass.loadedNotice': '预设已加载',
  'liquidGlass.noUserPreset': '暂无保存的预设',
  'liquidGlass.restoredNotice': '已恢复默认参数',

  // 一层基底雾面玻璃 (Layer 1: 侧边栏/卡片/弹窗)
  'liquidGlass.l1Section': '一层基底玻璃 (侧边栏/面板)',
  'liquidGlass.l1Blur': '基底模糊',
  'liquidGlass.l1Opacity': '基底暗化',
  'liquidGlass.l1Border': '边缘光泽',

  // 三层弹窗玻璃 (Layer 3: 设置弹窗/模态弹窗)
  'liquidGlass.l3Section': '三层弹窗玻璃 (设置/模态弹窗)',
  'liquidGlass.modalBlur': '弹窗虚化',
  'liquidGlass.l3MaskOpacity': '遮罩暗化',

  // 二层悬浮液态透镜 (Layer 2: 输入框/悬浮焦点/气泡卡片)
  'liquidGlass.l2Section': '二层液态透镜 (悬浮输入框/组件)',
  'liquidGlass.ior': '折射率 (IOR)',
  'liquidGlass.bulge': '透镜曲率',
  'liquidGlass.dispersion': '色散分离',
  'liquidGlass.bevel': '倒角厚度',
  'liquidGlass.lensBlur': '透镜模糊',
  'liquidGlass.darkening': '基底暗化',
  'liquidGlass.rimIntensity': '高光强度',
  'liquidGlass.lightAngle': '光源方位',
  'liquidGlass.vibrancy': '色彩鲜艳度',
  'liquidGlass.rippleAmp': '水波张力',
  'liquidGlass.dropShadowOpacity': '投影浓度',
  'liquidGlass.dropShadowBlur': '投影扩散',
  'liquidGlass.dropShadowY': '投影偏移',

  // 环境底板与流体 (Layer 0)
  'liquidGlass.bgSection': '环境底板与流体',
  'liquidGlass.background': '底板类型',
  'liquidGlass.backgroundGradient': '默认推荐',
  'liquidGlass.backgroundWallpaper': '自定义壁纸',
  'liquidGlass.chooseWallpaper': '选择壁纸',
  'liquidGlass.builtinGallery': '推荐壁纸库 (横向滑动选择)',
  'liquidGlass.wallpaperGallery': '自定义壁纸库 (横向滑动选择)',
  'liquidGlass.addWallpaper': '+ 添加壁纸 (图片 / 视频)',
  'liquidGlass.wallpaperFull': '壁纸槽位已满',
  'liquidGlass.imageBadge': '图片',
  'liquidGlass.videoBadge': '视频',
  'liquidGlass.deleteWallpaper': '删除壁纸',
  'liquidGlass.activeWallpaper': '生效中',
  'liquidGlass.wallpaperHint': '支持上传本地图片 (PNG/JPG/WEBP) 或视频 (MP4/WEBM) 作为全局折射底图',
  'liquidGlass.bgBlur': '背景模糊',
  'liquidGlass.bgLiquidEnable': '背景流体',
  'liquidGlass.bgLiquidAmp': '流水张力',
  'liquidGlass.bgLiquidScale': '水波尺度',
  'liquidGlass.bgLiquidSpeed': '流动速度',
  'liquidGlass.bgLiquidDispersion': '背景色散',
} satisfies Record<string, string>

export type LiquidGlassLocaleKey = keyof typeof zh

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    'settings.liquid-glass': LiquidGlassLocaleKey
  }
}

export const en = {
  'liquidGlass.title': 'Tiered Liquid Glass & Live Wallpaper',
  'liquidGlass.description': 'Tiered physical optics and live wallpaper system: multi-layer liquid lens refraction, global modal blur, and video/fluid wallpaper.',
  'liquidGlass.enable': 'Enable',
  'liquidGlass.disable': 'Disable',

  // Preset management
  'liquidGlass.presetSection': 'Presets',
  'liquidGlass.saveUserPreset': 'Save Preset',
  'liquidGlass.loadUserPreset': 'Load Preset',
  'liquidGlass.restoreDefault': 'Restore Defaults',
  'liquidGlass.savedNotice': 'Preset saved',
  'liquidGlass.loadedNotice': 'Preset loaded',
  'liquidGlass.noUserPreset': 'No saved preset found',
  'liquidGlass.restoredNotice': 'Default optical parameters restored',

  // Layer 1 Base Glass
  'liquidGlass.l1Section': 'Layer 1 Base Glass (Sidebar / Panels)',
  'liquidGlass.l1Blur': 'Base Blur',
  'liquidGlass.l1Opacity': 'Base Darkening',
  'liquidGlass.l1Border': 'Border Sheen',

  // Layer 3 Modal Glass
  'liquidGlass.l3Section': 'Layer 3 Modal Glass (Settings / Dialogs)',
  'liquidGlass.modalBlur': 'Modal Blur',
  'liquidGlass.l3MaskOpacity': 'Mask Darkening',

  // Layer 2 Floating Lenses
  'liquidGlass.l2Section': 'Layer 2 Floating Lenses (Composer / Modals)',
  'liquidGlass.ior': 'Refractive Index (IOR)',
  'liquidGlass.bulge': 'Lens Bulge',
  'liquidGlass.dispersion': 'Chromatic Dispersion',
  'liquidGlass.bevel': 'Bevel Thickness',
  'liquidGlass.lensBlur': 'Lens Blur',
  'liquidGlass.darkening': 'Base Darkening',
  'liquidGlass.rimIntensity': 'Rim Highlight',
  'liquidGlass.lightAngle': 'Light Angle',
  'liquidGlass.vibrancy': 'Vibrancy',
  'liquidGlass.rippleAmp': 'Ripple Tension',
  'liquidGlass.dropShadowOpacity': 'Shadow Opacity',
  'liquidGlass.dropShadowBlur': 'Shadow Blur',
  'liquidGlass.dropShadowY': 'Shadow Offset',

  // Layer 0 Environment Backdrop
  'liquidGlass.bgSection': 'Backdrop & Fluid Dynamics',
  'liquidGlass.background': 'Backdrop Type',
  'liquidGlass.backgroundGradient': 'Recommended Default',
  'liquidGlass.backgroundWallpaper': 'Custom Wallpaper',
  'liquidGlass.chooseWallpaper': 'Choose Wallpaper',
  'liquidGlass.builtinGallery': 'Recommended Wallpapers (Scroll to Preview)',
  'liquidGlass.wallpaperGallery': 'Custom Wallpapers (Scroll to Preview)',
  'liquidGlass.addWallpaper': '+ Add Wallpaper (Image / Video)',
  'liquidGlass.wallpaperFull': 'Wallpaper slots full',
  'liquidGlass.imageBadge': 'Image',
  'liquidGlass.videoBadge': 'Video',
  'liquidGlass.deleteWallpaper': 'Delete',
  'liquidGlass.activeWallpaper': 'Active',
  'liquidGlass.wallpaperHint': 'Upload local image (PNG/JPG/WEBP) or video (MP4/WEBM) as the physical refractive backdrop',
  'liquidGlass.bgBlur': 'Backdrop Blur',
  'liquidGlass.bgLiquidEnable': 'Fluid Dynamics',
  'liquidGlass.bgLiquidAmp': 'Flow Amplitude',
  'liquidGlass.bgLiquidScale': 'Fluid Scale',
  'liquidGlass.bgLiquidSpeed': 'Flow Speed',
  'liquidGlass.bgLiquidDispersion': 'Backdrop Dispersion',
} satisfies Record<LiquidGlassLocaleKey, string>
