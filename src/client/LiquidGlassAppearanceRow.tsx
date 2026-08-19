import { useEffect, useRef, useState } from 'react'
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { Knob, processWallpaperFile, Segmented } from './LiquidGlassControls.tsx'
import { LIQUID_GLASS_DEFAULTS, type createLiquidGlassRowStore, type LiquidGlassSettings } from './settings-store.ts'
import { BUILTIN_WALLPAPERS } from './builtin-wallpapers.ts'
import { loadWallpaperStore, saveWallpaperStore, type WallpaperItem } from './wallpaper-storage.ts'
import css from './LiquidGlassAppearanceRow.module.css'

export const USER_PRESET_KEY = 'dsh.ui-liquid-glass.user-preset'

export interface LiquidGlassAppearanceRowInjected {
  applyPreset: (preset: Partial<LiquidGlassSettings>) => void
  // 一层基底玻璃参数
  setL1Blur: (val: number) => void
  setL1Opacity: (val: number) => void
  setL1Border: (val: number) => void
  // 三层弹窗玻璃参数
  setModalBlur: (val: number) => void
  setL3MaskOpacity: (val: number) => void
  // 二层悬浮透镜参数
  setIor: (val: number) => void
  setBulge: (val: number) => void
  setDispersion: (val: number) => void
  setBevel: (val: number) => void
  setLensBlur: (val: number) => void
  setDarkening: (val: number) => void
  setRimIntensity: (val: number) => void
  setLightAngle: (val: number) => void
  setVibrancy: (val: number) => void
  setRippleAmp: (val: number) => void
  setDropShadowOpacity: (val: number) => void
  setDropShadowBlur: (val: number) => void
  setDropShadowY: (val: number) => void
  // 环境底板与流体参数
  setBackground: (val: 'gradient' | 'wallpaper') => void
  setWallpaper: (val: string) => void
  setBgBlur: (val: number) => void
  setBgLiquidEnabled: (val: boolean) => void
  setBgLiquidAmp: (val: number) => void
  setBgLiquidScale: (val: number) => void
  setBgLiquidSpeed: (val: number) => void
  setBgLiquidDispersion: (val: number) => void
}

export type LiquidGlassAppearanceRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createLiquidGlassRowStore>>
  & PropsLocale<'settings.liquid-glass'> & LiquidGlassAppearanceRowInjected

export function LiquidGlassAppearanceRow(props: LiquidGlassAppearanceRowComponentProps) {
  const {
    t, applyPreset, setL1Blur, setL1Opacity, setL1Border, setModalBlur, setL3MaskOpacity,
    setIor, setBulge, setDispersion,
    setBevel, setLensBlur, setDarkening, setRimIntensity, setLightAngle, setVibrancy,
    setRippleAmp, setDropShadowOpacity, setDropShadowBlur, setDropShadowY, setBackground,
    setWallpaper, setBgBlur, setBgLiquidEnabled, setBgLiquidAmp, setBgLiquidScale,
    setBgLiquidSpeed, setBgLiquidDispersion, useStore,
  } = props

  const enabled = useStore(s => s.enabled)
  const l1Blur = useStore(s => s.l1Blur)
  const l1Opacity = useStore(s => s.l1Opacity)
  const l1Border = useStore(s => s.l1Border)
  const modalBlur = useStore(s => typeof s.modalBlur === 'number' && !isNaN(s.modalBlur) ? s.modalBlur : 24)
  const l3MaskOpacity = useStore(s => typeof s.l3MaskOpacity === 'number' && !isNaN(s.l3MaskOpacity) ? s.l3MaskOpacity : 0.45)

  const ior = useStore(s => s.ior)
  const bulge = useStore(s => s.bulge)
  const dispersion = useStore(s => s.dispersion)
  const bevel = useStore(s => s.bevel)
  const lensBlur = useStore(s => s.lensBlur)
  const darkening = useStore(s => s.darkening)
  const rimIntensity = useStore(s => s.rimIntensity)
  const lightAngle = useStore(s => s.lightAngle)
  const vibrancy = useStore(s => s.vibrancy)
  const rippleAmp = useStore(s => s.rippleAmp)
  const dropShadowOpacity = useStore(s => s.dropShadowOpacity)
  const dropShadowBlur = useStore(s => s.dropShadowBlur)
  const dropShadowY = useStore(s => s.dropShadowY)

  const background = useStore(s => s.background)
  const wallpaper = useStore(s => s.wallpaper)
  const bgBlur = useStore(s => s.bgBlur)
  const bgLiquidEnabled = useStore(s => s.bgLiquidEnabled)
  const bgLiquidAmp = useStore(s => s.bgLiquidAmp)
  const bgLiquidScale = useStore(s => s.bgLiquidScale)
  const bgLiquidSpeed = useStore(s => s.bgLiquidSpeed)
  const bgLiquidDispersion = useStore(s => s.bgLiquidDispersion)

  const [expanded, setExpanded] = useState<boolean>(false)
  const [notice, setNotice] = useState<string>('')
  const fileRef = useRef<HTMLInputElement | null>(null)

  // 1. 推荐壁纸（内置）与自定义壁纸（用户上传）分别独立管理
  const [customWallpapers, setCustomWallpapers] = useState<WallpaperItem[]>([])
  const [activeBuiltinId, setActiveBuiltinId] = useState<string>(BUILTIN_WALLPAPERS[0]?.id || 'builtin-1')
  const [activeCustomId, setActiveCustomId] = useState<string>('')

  useEffect(() => {
    loadWallpaperStore().then(({ customWallpapers: custom, activeBuiltinId: builtinId, activeCustomId: custId }) => {
      setCustomWallpapers(custom)
      setActiveBuiltinId(builtinId)
      setActiveCustomId(custId)

      // 仅当当前全局壁纸未初始化时才进行保底设置，避免每次打开设置弹窗时重复生成 Blob URL 导致视频壁纸闪烁
      if (!wallpaper) {
        if (background === 'gradient') {
          const cur = BUILTIN_WALLPAPERS.find(it => it.id === builtinId) || BUILTIN_WALLPAPERS[0]
          if (cur) setWallpaper(cur.url)
        } else {
          const cur = custom.find(it => it.id === custId) || custom[0]
          if (cur) setWallpaper(cur.type === 'video' ? `video:${cur.url}` : cur.url)
        }
      }
    })
  }, [])

  const showNotice = (msg: string) => {
    setNotice(msg)
    setTimeout(() => { setNotice('') }, 2500)
  }

  // 1. 预设保存：严格只保存光学与玻璃参数，杜绝保存壁纸
  const handleSaveUserPreset = () => {
    try {
      const current = {
        l1Blur, l1Opacity, l1Border, modalBlur, l3MaskOpacity,
        ior, bulge, dispersion, bevel, lensBlur, darkening, rimIntensity,
        lightAngle, vibrancy, rippleAmp, dropShadowOpacity, dropShadowBlur, dropShadowY,
        bgBlur, bgLiquidEnabled, bgLiquidAmp, bgLiquidScale, bgLiquidSpeed, bgLiquidDispersion,
      }
      localStorage.setItem(USER_PRESET_KEY, JSON.stringify(current))
      showNotice(t('liquidGlass.savedNotice'))
    } catch {
      showNotice('保存失败')
    }
  }

  // 2. 预设加载：严格剔除壁纸属性，保留用户当前的壁纸库与底板
  const handleLoadUserPreset = () => {
    try {
      const raw = localStorage.getItem(USER_PRESET_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        delete parsed.background
        delete parsed.wallpaper
        delete parsed.wallpapers
        applyPreset(parsed)
        showNotice(t('liquidGlass.loadedNotice'))
      } else {
        showNotice(t('liquidGlass.noUserPreset'))
      }
    } catch {
      showNotice(t('liquidGlass.noUserPreset'))
    }
  }

  // 3. 恢复默认：仅恢复参数默认值，保留用户当前壁纸
  const handleRestoreDefault = () => {
    const { background: _bg, wallpaper: _wp, ...cleanDefaults } = LIQUID_GLASS_DEFAULTS
    applyPreset(cleanDefaults)
    showNotice(t('liquidGlass.restoredNotice'))
  }

  // 4. 自定义壁纸增删交互
  const handleAddCustomWallpaper = async (file: File) => {
    try {
      const { type, blob, url, poster } = await processWallpaperFile(file)
      const newItem: WallpaperItem = {
        id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        type,
        blob,
        url,
        poster,
        isBuiltin: false,
      }
      const next = [...customWallpapers, newItem]
      setCustomWallpapers(next)
      setActiveCustomId(newItem.id)
      setWallpaper(type === 'video' ? `video:${url}|${poster || ''}` : url)
      setBackground('wallpaper')
      await saveWallpaperStore({ customWallpapers: next, activeBuiltinId, activeCustomId: newItem.id })
      showNotice(type === 'video' ? '视频壁纸已添加并生效' : '图片壁纸已添加并生效')
    } catch {
      showNotice('添加壁纸失败')
    }
  }

  const handleDeleteCustomWallpaper = async (id: string) => {
    const target = customWallpapers.find(w => w.id === id)
    if (target?.url.startsWith('blob:')) {
      try { URL.revokeObjectURL(target.url) } catch {}
    }
    const next = customWallpapers.filter(w => w.id !== id)
    setCustomWallpapers(next)
    if (activeCustomId === id) {
      if (next.length > 0) {
        setActiveCustomId(next[0].id)
        setWallpaper(next[0].type === 'video' ? `video:${next[0].url}|${next[0].poster || ''}` : next[0].url)
        await saveWallpaperStore({ customWallpapers: next, activeBuiltinId, activeCustomId: next[0].id })
      } else {
        setActiveCustomId('')
        // 若自定义已删空，平滑切换到默认推荐
        const cur = BUILTIN_WALLPAPERS.find(it => it.id === activeBuiltinId) || BUILTIN_WALLPAPERS[0]
        if (cur) setWallpaper(cur.url)
        setBackground('gradient')
        await saveWallpaperStore({ customWallpapers: [], activeBuiltinId, activeCustomId: '' })
      }
    } else {
      await saveWallpaperStore({ customWallpapers: next, activeBuiltinId, activeCustomId })
    }
    showNotice('壁纸已删除')
  }

  const trackRef = useRef<HTMLDivElement | null>(null)
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
  })

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && trackRef.current) {
      trackRef.current.scrollLeft += e.deltaY * 0.9
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const target = e.target as HTMLElement | null
    if (target?.closest('button, [data-no-drag], input')) {
      return
    }
    const track = trackRef.current
    if (!track) return

    cancelAnimationFrame(dragInfo.current.rafId)
    dragInfo.current.isDown = true
    dragInfo.current.startX = e.clientX
    dragInfo.current.scrollLeft = track.scrollLeft
    dragInfo.current.isDragging = false
    dragInfo.current.hasMoved = false
    dragInfo.current.pointerId = e.pointerId
    dragInfo.current.lastX = e.clientX
    dragInfo.current.lastTime = performance.now()
    dragInfo.current.velocity = 0
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown) return
    const track = trackRef.current
    if (!track) return

    const deltaX = e.clientX - dragInfo.current.startX

    // 当且仅当单次滑动位移超过 8px 时才正式判定为拖拽滑动并捕获指针
    if (!dragInfo.current.isDragging && Math.abs(deltaX) > 8) {
      dragInfo.current.isDragging = true
      dragInfo.current.hasMoved = true
      try {
        track.setPointerCapture(dragInfo.current.pointerId)
      } catch {}
    }

    if (dragInfo.current.isDragging) {
      const now = performance.now()
      const dt = now - dragInfo.current.lastTime
      if (dt > 0) {
        dragInfo.current.velocity = (e.clientX - dragInfo.current.lastX) / dt
        dragInfo.current.lastX = e.clientX
        dragInfo.current.lastTime = now
      }
      track.scrollLeft = dragInfo.current.scrollLeft - deltaX
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragInfo.current.isDown) return
    const wasDragging = dragInfo.current.isDragging
    dragInfo.current.isDown = false
    dragInfo.current.isDragging = false

    const track = trackRef.current
    if (track && wasDragging) {
      try {
        track.releasePointerCapture(e.pointerId)
      } catch {}

      // 物理阻尼惯性滑动
      let v = dragInfo.current.velocity * 14
      if (Math.abs(v) > 1.2) {
        const stepInertia = () => {
          if (!trackRef.current || Math.abs(v) < 0.2) return
          trackRef.current.scrollLeft -= v
          v *= 0.92
          dragInfo.current.rafId = requestAnimationFrame(stepInertia)
        }
        dragInfo.current.rafId = requestAnimationFrame(stepInertia)
      }

      // 延迟重置 hasMoved 标志以抑制拖拽释放瞬间触发的 onClick
      setTimeout(() => {
        dragInfo.current.hasMoved = false
      }, 100)
    } else {
      dragInfo.current.hasMoved = false
    }
  }

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    dragInfo.current.isDown = false
    dragInfo.current.isDragging = false
    dragInfo.current.hasMoved = false
    const track = trackRef.current
    if (track) {
      try {
        track.releasePointerCapture(e.pointerId)
      } catch {}
    }
  }

  return (
    <div className={css.group}>
      {/* 0. 预设管理 (默认折叠) */}
      <div className={css.cardAccordion}>
        <div
          className={css.accordionHeader}
          role="button"
          tabIndex={0}
          onClick={() => { setExpanded(!expanded) }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setExpanded(!expanded) }}
        >
          <span className={css.accordionTitle}>{t('liquidGlass.presetSection')}</span>
          <span className={`${css.chevron} ${expanded ? css.chevronExpanded : ''}`}>▼</span>
        </div>

        <div className={`${css.accordionCollapse} ${expanded ? css.accordionCollapseExpanded : ''}`}>
          <div className={css.accordionInner}>
            <div className={`${css.accordionBody} ${expanded ? css.accordionBodyExpanded : ''}`}>
              <div className={css.presetActions}>
                <button type="button" className={css.actionBtn} onClick={handleSaveUserPreset}>
                  {t('liquidGlass.saveUserPreset')}
                </button>
                <button type="button" className={css.actionBtn} onClick={handleLoadUserPreset}>
                  {t('liquidGlass.loadUserPreset')}
                </button>
                <button type="button" className={css.actionBtn} onClick={handleRestoreDefault}>
                  {t('liquidGlass.restoreDefault')}
                </button>
              </div>
              {notice && <div className={css.notice}>{notice}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* 1. 一层基底玻璃 (Layer 1: 侧边栏/消息气泡/面板) */}
      <div className={css.rowSectionHeader}>{t('liquidGlass.l1Section')}</div>
      <div className={css.controls}>
        <Knob
          label={t('liquidGlass.l1Blur')}
          value={l1Blur}
          min={0}
          max={60}
          step={1}
          unit="px"
          onChange={setL1Blur}
        />

        <Knob
          label={t('liquidGlass.l1Opacity')}
          value={l1Opacity}
          min={0.00}
          max={0.90}
          step={0.05}
          unit=""
          onChange={setL1Opacity}
        />

        <Knob
          label={t('liquidGlass.l1Border')}
          value={l1Border}
          min={0.00}
          max={1.00}
          step={0.02}
          unit=""
          onChange={setL1Border}
        />
      </div>

      {/* 2. 二层液态透镜 (Layer 2: 悬浮输入框) */}
      <div className={css.rowSectionHeader}>{t('liquidGlass.l2Section')}</div>
      <div className={css.controls}>
        <Knob
          label={t('liquidGlass.ior')}
          value={ior}
          min={0.80}
          max={2.40}
          step={0.02}
          unit=""
          onChange={setIor}
        />

        <Knob
          label={t('liquidGlass.bulge')}
          value={bulge}
          min={-1.50}
          max={2.50}
          step={0.05}
          unit=""
          onChange={setBulge}
        />

        <Knob
          label={t('liquidGlass.dispersion')}
          value={dispersion}
          min={0.00}
          max={0.10}
          step={0.005}
          unit=""
          onChange={setDispersion}
        />

        <Knob
          label={t('liquidGlass.bevel')}
          value={bevel}
          min={0.005}
          max={0.10}
          step={0.005}
          unit=""
          onChange={setBevel}
        />

        <Knob
          label={t('liquidGlass.lensBlur')}
          value={lensBlur}
          min={0}
          max={40}
          step={1}
          unit="px"
          onChange={setLensBlur}
        />

        <Knob
          label={t('liquidGlass.darkening')}
          value={darkening}
          min={0.00}
          max={0.80}
          step={0.05}
          unit=""
          onChange={setDarkening}
        />

        <Knob
          label={t('liquidGlass.rimIntensity')}
          value={rimIntensity}
          min={0.00}
          max={1.00}
          step={0.05}
          unit=""
          onChange={setRimIntensity}
        />

        <Knob
          label={t('liquidGlass.lightAngle')}
          value={lightAngle}
          min={0}
          max={360}
          step={5}
          unit="°"
          onChange={setLightAngle}
        />

        <Knob
          label={t('liquidGlass.vibrancy')}
          value={vibrancy}
          min={0.50}
          max={2.00}
          step={0.05}
          unit="x"
          onChange={setVibrancy}
        />

        <Knob
          label={t('liquidGlass.rippleAmp')}
          value={rippleAmp}
          min={0.00}
          max={1.00}
          step={0.05}
          unit=""
          onChange={setRippleAmp}
        />

        <Knob
          label={t('liquidGlass.dropShadowOpacity')}
          value={dropShadowOpacity}
          min={0.00}
          max={1.00}
          step={0.05}
          unit=""
          onChange={setDropShadowOpacity}
        />

        <Knob
          label={t('liquidGlass.dropShadowBlur')}
          value={dropShadowBlur}
          min={0}
          max={120}
          step={2}
          unit="px"
          onChange={setDropShadowBlur}
        />

        <Knob
          label={t('liquidGlass.dropShadowY')}
          value={dropShadowY}
          min={0}
          max={60}
          step={2}
          unit="px"
          onChange={setDropShadowY}
        />
      </div>

      {/* 3. 三层弹窗玻璃 (Layer 3: 设置弹窗/模态弹窗) */}
      <div className={css.rowSectionHeader}>{t('liquidGlass.l3Section')}</div>
      <div className={css.controls}>
        <Knob
          label={t('liquidGlass.modalBlur')}
          value={modalBlur}
          min={0}
          max={60}
          step={1}
          unit="px"
          onChange={setModalBlur}
        />

        <Knob
          label={t('liquidGlass.l3MaskOpacity')}
          value={l3MaskOpacity}
          min={0.00}
          max={0.90}
          step={0.05}
          unit=""
          onChange={setL3MaskOpacity}
        />
      </div>

      {/* 3. 环境底板与流体 (Layer 0) */}
      <div className={css.rowSectionHeader}>{t('liquidGlass.bgSection')}</div>
      <div className={css.controls}>
        <div className={css.row}>
          <span className={css.rowLabel}>{t('liquidGlass.background')}</span>
          <Segmented
            label={t('liquidGlass.background')}
            value={background}
            options={[
              { id: 'gradient', label: t('liquidGlass.backgroundGradient') },
              { id: 'wallpaper', label: t('liquidGlass.backgroundWallpaper') },
            ]}
            onSelect={(val) => {
              setBackground(val)
              if (val === 'gradient') {
                const cur = BUILTIN_WALLPAPERS.find(it => it.id === activeBuiltinId) || BUILTIN_WALLPAPERS[0]
                if (cur) setWallpaper(cur.url)
              } else {
                const cur = customWallpapers.find(it => it.id === activeCustomId) || customWallpapers[0]
                if (cur) {
                  setWallpaper(cur.type === 'video' ? `video:${cur.url}` : cur.url)
                }
              }
            }}
          />
        </div>

        {/* 1. 默认推荐壁纸库 (出厂内置 6 款高质感壁纸，支持横向滑动与即选即切) */}
        {background === 'gradient' && (
          <div className={css.galleryContainer}>
            <div className={css.galleryHeader}>
              <span className={css.galleryTitle}>{t('liquidGlass.builtinGallery')}</span>
              <span className={css.galleryBadge}>{BUILTIN_WALLPAPERS.length} 张推荐</span>
            </div>
            
            <div
              ref={trackRef}
              className={css.galleryTrack}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              {BUILTIN_WALLPAPERS.map((wp, idx) => {
                const isActive = wp.id === activeBuiltinId
                return (
                  <div
                    key={wp.id}
                    className={`${css.slotCard} ${isActive ? css.slotCardActive : ''}`}
                    onClick={() => {
                      if (!dragInfo.current.hasMoved) {
                        setActiveBuiltinId(wp.id)
                        setWallpaper(wp.url)
                        void saveWallpaperStore({ customWallpapers, activeBuiltinId: wp.id, activeCustomId })
                      }
                    }}
                    title={wp.name}
                  >
                    <img
                      src={wp.url}
                      alt={wp.name}
                      className={css.slotThumb}
                    />
                    <div className={css.slotOverlay}>
                      <span className={css.slotTypeBadge}>内置</span>
                    </div>
                    {isActive && (
                      <div className={css.slotActiveBadge}>
                        <span>✓</span>
                      </div>
                    )}
                    <div className={css.slotFooter}>
                      <span className={css.slotName}>{wp.name || `推荐 ${idx + 1}`}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 2. 用户自定义壁纸库 (支持任意数量图片与视频上传、预览与删除) */}
        {background === 'wallpaper' && (
          <div className={css.galleryContainer}>
            <div className={css.galleryHeader}>
              <span className={css.galleryTitle}>{t('liquidGlass.wallpaperGallery')}</span>
              <span className={css.galleryBadge}>{customWallpapers.length} 张已存</span>
            </div>
            
            <div
              ref={trackRef}
              className={css.galleryTrack}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              {customWallpapers.map((wp, idx) => {
                const isActive = wp.id === activeCustomId
                return (
                  <div
                    key={wp.id}
                    className={`${css.slotCard} ${isActive ? css.slotCardActive : ''}`}
                    onClick={() => {
                      if (!dragInfo.current.hasMoved) {
                        setActiveCustomId(wp.id)
                        setWallpaper(wp.type === 'video' ? `video:${wp.url}|${wp.poster || ''}` : wp.url)
                        void saveWallpaperStore({ customWallpapers, activeBuiltinId, activeCustomId: wp.id })
                      }
                    }}
                    title={wp.name}
                  >
                    {wp.poster ? (
                      <img
                        src={wp.poster}
                        alt={wp.name}
                        className={css.slotThumb}
                      />
                    ) : wp.type === 'video' ? (
                      <video
                        src={wp.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={css.slotThumb}
                      />
                    ) : (
                      <img
                        src={wp.url}
                        alt={wp.name}
                        className={css.slotThumb}
                      />
                    )}
                    <div className={css.slotOverlay}>
                      <span className={css.slotTypeBadge}>
                        {wp.type === 'video' ? t('liquidGlass.videoBadge') : t('liquidGlass.imageBadge')}
                      </span>
                      <button
                        type="button"
                        className={css.slotDeleteBtn}
                        data-no-drag="true"
                        title={t('liquidGlass.deleteWallpaper')}
                        onPointerDown={(e) => { e.stopPropagation() }}
                        onClick={(e) => {
                          e.stopPropagation()
                          void handleDeleteCustomWallpaper(wp.id)
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    {isActive && (
                      <div className={css.slotActiveBadge}>
                        <span>✓</span>
                      </div>
                    )}
                    <div className={css.slotFooter}>
                      <span className={css.slotName}>{wp.name || `自定义 ${idx + 1}`}</span>
                    </div>
                  </div>
                )
              })}

              <button
                type="button"
                className={css.slotAddCard}
                data-no-drag="true"
                onPointerDown={(e) => { e.stopPropagation() }}
                onClick={(e) => {
                  e.stopPropagation()
                  fileRef.current?.click()
                }}
              >
                <span className={css.addIcon}>+</span>
                <span className={css.addLabel}>{t('liquidGlass.addWallpaper')}</span>
                <span className={css.addHint}>图片 / 视频</span>
              </button>
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*,video/*"
              style={{ display: 'none' }}
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (file) {
                  await handleAddCustomWallpaper(file)
                  e.target.value = ''
                }
              }}
            />
          </div>
        )}

        <Knob
          label={t('liquidGlass.bgBlur')}
          value={bgBlur}
          min={0}
          max={60}
          step={1}
          unit="px"
          onChange={setBgBlur}
        />

        <div className={css.row}>
          <span className={css.rowLabel}>{t('liquidGlass.bgLiquidEnable')}</span>
          <Segmented
            label={t('liquidGlass.bgLiquidEnable')}
            value={bgLiquidEnabled ? 'on' : 'off'}
            options={[
              { id: 'off', label: t('liquidGlass.disable') },
              { id: 'on', label: t('liquidGlass.enable') },
            ]}
            onSelect={(val) => { setBgLiquidEnabled(val === 'on') }}
          />
        </div>

        {bgLiquidEnabled && (
          <>
            <Knob
              label={t('liquidGlass.bgLiquidAmp')}
              value={bgLiquidAmp}
              min={0.00}
              max={2.00}
              step={0.05}
              unit=""
              onChange={setBgLiquidAmp}
            />

            <Knob
              label={t('liquidGlass.bgLiquidScale')}
              value={bgLiquidScale}
              min={0.2}
              max={2.5}
              step={0.05}
              unit="x"
              onChange={setBgLiquidScale}
            />

            <Knob
              label={t('liquidGlass.bgLiquidSpeed')}
              value={bgLiquidSpeed}
              min={0.1}
              max={3.0}
              step={0.1}
              unit="x"
              onChange={setBgLiquidSpeed}
            />

            <Knob
              label={t('liquidGlass.bgLiquidDispersion')}
              value={bgLiquidDispersion}
              min={0.00}
              max={0.08}
              step={0.005}
              unit=""
              onChange={setBgLiquidDispersion}
            />
          </>
        )}
      </div>
    </div>
  )
}
