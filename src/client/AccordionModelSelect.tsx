import React, { useState, useRef, useEffect, useMemo, useId, useSyncExternalStore } from 'react'

export interface AccordionModelSelectProps {
  locked?: boolean
  available: boolean
  directory: {
    subscribe: (fn: () => void) => () => void
    getSnapshot: () => any
  }
  load: () => void
  select: (selection: any) => Promise<boolean>
  t?: (key: string, params?: any) => string
}

export function AccordionModelSelect({
  locked,
  available,
  directory,
  load,
  select,
  t,
}: AccordionModelSelectProps) {
  const state = useSyncExternalStore(
    (fn) => directory.subscribe(fn),
    () => directory.getSnapshot()
  )
  const [open, setOpen] = useState(false)
  const [modelExpanded, setModelExpanded] = useState(false)
  const [effortExpanded, setEffortExpanded] = useState(false)
  const lastActionRef = useRef('load')
  const [toast, setToast] = useState<{ seq: number; text: string } | null>(null)
  const toastSeq = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const id = useId()

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragPreviewEffort, setDragPreviewEffort] = useState<any>(undefined)
  const isDraggingRef = useRef(false)
  const dragStartRef = useRef<{ x: number; hasMoved: boolean; pointerId: number } | null>(null)
  const optionRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const trackRef = useRef<HTMLDivElement | null>(null)

  const choices = useMemo(() => {
    if (!state?.groups) return []
    return state.groups.flatMap((group: any) =>
      (group.models || []).map((model: any) => ({
        group,
        model,
        selection: {
          provider: group.id,
          model: model.id,
          ...(model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }),
        },
      }))
    )
  }, [state?.groups])

  const currentChoice = choices[
    state?.current === null || !state?.current
      ? -1
      : choices.findIndex(
          (c: any) =>
            c.selection.provider === state.current?.provider &&
            c.selection.model === state.current.model
        )
  ]

  const reasoning = currentChoice?.model?.reasoning
  const effectiveEffort = state?.current?.reasoningEffort ?? reasoning?.defaultEffort
  const displayedEffort = isDragging && dragPreviewEffort !== undefined ? dragPreviewEffort : effectiveEffort
  const providerDefaultLabel = '默认'
  const effortLabel =
    reasoning === void 0
      ? void 0
      : displayedEffort === void 0
      ? providerDefaultLabel
      : reasoning.efforts?.find((level: any) => level.id === displayedEffort)?.name ?? displayedEffort

  const effortChoices = useMemo(() => {
    if (reasoning === void 0) return []
    const defaultList =
      reasoning.defaultEffort === void 0
        ? [
            {
              key: 'provider-default',
              effort: void 0,
              label: providerDefaultLabel,
            },
          ]
        : []
    const list = (reasoning.efforts || []).map((effort: any) => ({
      key: `effort:${effort.id}`,
      effort: effort.id,
      label: effort.name,
      ...(effort.description === void 0 ? {} : { description: effort.description }),
    }))
    return [...defaultList, ...list]
  }, [reasoning, t])

  const busy = state?.status === 'selecting'

  const reload = () => {
    lastActionRef.current = 'load'
    load?.()
  }

  useEffect(() => {
    if (available) {
      lastActionRef.current = 'load'
      load?.()
    }
  }, [available, load])

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setModelExpanded(false)
        setEffortExpanded(false)
      }
    }
    document.addEventListener('mousedown', closeOutside)
    return () => {
      document.removeEventListener('mousedown', closeOutside)
    }
  }, [open])

  useEffect(() => {
    if (!effortExpanded) {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
      return
    }
    if (isDraggingRef.current) return

    const activeLevel = effortChoices.find((level: any) => level.effort === effectiveEffort) ?? effortChoices[0]
    if (!activeLevel) return
    const update = () => {
      if (isDraggingRef.current) return
      const activeEl = optionRefs.current.get(activeLevel.key)
      if (activeEl && trackRef.current) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        })
      }
    }
    update()
    const rafId = requestAnimationFrame(update)
    const ro = typeof ResizeObserver !== 'undefined' && trackRef.current
      ? new ResizeObserver(update)
      : null
    if (ro && trackRef.current) {
      ro.observe(trackRef.current)
    }
    return () => {
      cancelAnimationFrame(rafId)
      ro?.disconnect()
    }
  }, [effectiveEffort, effortExpanded, effortChoices])

  const getClosestOption = (clientX: number) => {
    if (!trackRef.current) return null
    const rect = trackRef.current.getBoundingClientRect()
    const pointerX = clientX - rect.left

    let closestLevel = null
    let minDistance = Infinity

    for (const level of effortChoices) {
      const el = optionRefs.current.get(level.key)
      if (el) {
        const elCenter = el.offsetLeft + el.offsetWidth / 2
        const dist = Math.abs(pointerX - elCenter)
        if (dist < minDistance) {
          minDistance = dist
          closestLevel = level
        }
      }
    }
    return closestLevel
  }

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    dragStartRef.current = { x: e.clientX, hasMoved: false, pointerId: e.pointerId }
  }

  const handleTrackPointerMove = (e: React.PointerEvent) => {
    if (!dragStartRef.current || dragStartRef.current.pointerId !== e.pointerId) return
    const dx = e.clientX - dragStartRef.current.x
    if (!dragStartRef.current.hasMoved && Math.abs(dx) > 3) {
      dragStartRef.current.hasMoved = true
      isDraggingRef.current = true
      setIsDragging(true)
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch {}
    }

    if (dragStartRef.current.hasMoved && trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect()
      const pointerX = e.clientX - rect.left
      const currentEffortVal = dragPreviewEffort !== undefined ? dragPreviewEffort : effectiveEffort
      const activeLevel = effortChoices.find((l: any) => l.effort === currentEffortVal) ?? effortChoices[0]
      const activeEl = activeLevel ? optionRefs.current.get(activeLevel.key) : null
      const capsuleWidth = activeEl ? activeEl.offsetWidth : (indicatorStyle.width || 50)

      const minLeft = 3
      const maxLeft = Math.max(3, rect.width - 3 - capsuleWidth)
      const targetLeft = Math.max(minLeft, Math.min(maxLeft, pointerX - capsuleWidth / 2))

      const closest = getClosestOption(e.clientX)
      if (closest) {
        setDragPreviewEffort(closest.effort)
      }
      setIndicatorStyle({
        left: targetLeft,
        width: capsuleWidth,
        opacity: 1,
      })
    }
  }

  const handleTrackPointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current || dragStartRef.current.pointerId !== e.pointerId) return
    const hadMoved = dragStartRef.current.hasMoved
    dragStartRef.current = null
    isDraggingRef.current = false
    setIsDragging(false)

    if (hadMoved) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {}
      const closest = getClosestOption(e.clientX)
      setDragPreviewEffort(undefined)
      if (closest && closest.effort !== effectiveEffort) {
        chooseEffort(closest.effort)
      } else {
        const activeLevel = effortChoices.find((l: any) => l.effort === effectiveEffort) ?? effortChoices[0]
        const activeEl = activeLevel ? optionRefs.current.get(activeLevel.key) : null
        if (activeEl) {
          setIndicatorStyle({
            left: activeEl.offsetLeft,
            width: activeEl.offsetWidth,
            opacity: 1,
          })
        }
      }
    } else {
      setDragPreviewEffort(undefined)
    }
  }

  const handleTrackPointerCancel = (e: React.PointerEvent) => {
    if (dragStartRef.current && dragStartRef.current.pointerId === e.pointerId) {
      dragStartRef.current = null
      isDraggingRef.current = false
      setIsDragging(false)
      setDragPreviewEffort(undefined)
      const activeLevel = effortChoices.find((l: any) => l.effort === effectiveEffort) ?? effortChoices[0]
      const activeEl = activeLevel ? optionRefs.current.get(activeLevel.key) : null
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        })
      }
    }
  }

  if (!available) return null

  const show = () => {
    setModelExpanded(false)
    setEffortExpanded(false)
    setOpen(true)
    reload()
  }

  const close = (restoreFocus = false) => {
    setOpen(false)
    setModelExpanded(false)
    setEffortExpanded(false)
    if (restoreFocus) {
      queueMicrotask(() => {
        triggerRef.current?.focus()
      })
    }
  }

  const settleSelection = (accepted: boolean) => {
    if (accepted) {
      return
    }
    const message = directory.getSnapshot()?.error
    if (message) {
      toastSeq.current += 1
      setToast({
        seq: toastSeq.current,
        text: t ? t('error.action', { message }) : `模型操作失败：${message}`,
      })
    }
  }

  const choose = (selection: any) => {
    if (busy) return
    if (
      state?.current?.provider === selection.provider &&
      state?.current?.model === selection.model
    ) {
      return
    }
    lastActionRef.current = 'select'
    select(selection).then(settleSelection)
  }

  const chooseEffort = (effort: any) => {
    if (busy) return
    if (!state?.current) return
    if (effectiveEffort === effort) {
      return
    }
    const selection = {
      provider: state.current.provider,
      model: state.current.model,
      ...(effort === void 0 ? {} : { reasoningEffort: effort }),
    }
    lastActionRef.current = 'select'
    select(selection).then(settleSelection)
  }

  const modelLabel = currentChoice?.model?.name ?? (t ? t('trigger.fallback') : '选择模型')
  const triggerLabel = effortLabel === void 0 ? modelLabel : `${modelLabel} · ${effortLabel}`

  return (
    <div
      ref={rootRef}
      className="dsh-model-select-root"
      style={{ position: 'relative', minWidth: 0, display: 'inline-flex', alignItems: 'center' }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="dsh-model-select-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        title={triggerLabel}
        disabled={locked}
        onClick={() => {
          if (open) close()
          else show()
        }}
      >
        <span className="dsh-model-select-trigger-label">{modelLabel}</span>
        {effortLabel !== void 0 && (
          <span className="dsh-model-select-trigger-effort">{effortLabel}</span>
        )}
        <svg
          className={`dsh-model-select-chevron ${open ? 'dsh-chevron-open' : ''}`}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          id={`${id}-menu`}
          className="dsh-model-select-menu"
          role="menu"
          aria-busy={state?.status === 'loading' || busy}
        >
          {/* 1. 模型折叠行 */}
          <button
            type="button"
            role="menuitem"
            className={`dsh-model-select-cell ${modelExpanded ? 'dsh-cell-active' : ''}`}
            onClick={() => setModelExpanded((prev) => !prev)}
          >
            <span className="dsh-model-select-cell-label">{t ? t('menu.model') : '模型'}</span>
            <span className="dsh-model-select-cell-value">{modelLabel}</span>
            <svg
              className={`dsh-model-select-cell-chevron ${
                modelExpanded ? 'dsh-chevron-expanded' : ''
              }`}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M5.25 3.5L8.75 7L5.25 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* 模型展开内容 (多 Provider 分组列表卡片) */}
          {modelExpanded && (
            <div className="dsh-model-collapse-wrap">
              <div className="dsh-model-inline-panel">
                {state?.status === 'loading' && (!state?.groups || state.groups.length === 0) && (
                  <div className="dsh-model-select-status">
                    {t ? t('status.loading') : '正在刷新模型列表…'}
                  </div>
                )}
                {state?.error !== null && lastActionRef.current === 'load' && (
                  <div className="dsh-model-select-error">
                    <span>{t ? t('error.action', { message: state.error }) : state.error}</span>
                    <button type="button" className="dsh-model-select-retry" onClick={reload}>
                      重试
                    </button>
                  </div>
                )}
                {state?.failures?.map((failure: any) => (
                  <div key={failure.id} className="dsh-model-select-warning">
                    <span>
                      {failure.name} 加载失败：{failure.message}
                    </span>
                    <button type="button" className="dsh-model-select-retry" onClick={reload}>
                      重试
                    </button>
                  </div>
                ))}
                <div className="dsh-model-select-groups scrollable">
                  {state?.groups?.map((group: any) => (
                    <section key={group.id} role="group" className="dsh-model-select-group">
                      <div className="dsh-model-select-group-title">{group.name}</div>
                      {group.models?.map((m: any) => {
                        const isSelected =
                          state?.current?.provider === group.id && state?.current?.model === m.id
                        return (
                          <button
                            key={m.id}
                            type="button"
                            role="menuitemradio"
                            aria-checked={isSelected}
                            className={`dsh-model-select-option ${
                              isSelected ? 'dsh-option-selected' : ''
                            }`}
                            title={m.name}
                            onClick={() => choose({ provider: group.id, model: m.id })}
                          >
                            <span className="dsh-model-select-option-copy">
                              <span className="dsh-model-select-model-name">{m.name}</span>
                              {m.description && (
                                <span className="dsh-model-select-description">
                                  {m.description}
                                </span>
                              )}
                            </span>
                            {isSelected && (
                              <span className="dsh-model-select-check">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path
                                    d="M2.5 7.5L5.5 10.5L11.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </section>
                  ))}
                </div>
                {state?.status === 'ready' && choices.length === 0 && (
                  <div className="dsh-model-select-empty">
                    {t ? t('empty.models') : '没有可用的模型。'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. 推理等级折叠行 (若当前模型支持推理) */}
          {reasoning !== void 0 && (
            <>
              <button
                type="button"
                role="menuitem"
                className={`dsh-model-select-cell ${
                  effortExpanded ? 'dsh-cell-active' : ''
                }`}
                onClick={() => setEffortExpanded((prev) => !prev)}
              >
                <span className="dsh-model-select-cell-label">
                  {t ? t('menu.effort') : '推理等级'}
                </span>
                <span className="dsh-model-select-cell-value">{effortLabel}</span>
                <svg
                  className={`dsh-model-select-cell-chevron ${
                    effortExpanded ? 'dsh-chevron-expanded' : ''
                  }`}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M5.25 3.5L8.75 7L5.25 10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* 推理等级展开内容 (横向分段胶囊滑块卡片) */}
              {effortExpanded && (
                <div className="dsh-effort-collapse-wrap">
                  <div className="dsh-effort-inline-panel">
                    <div className="dsh-effort-header-row">
                      <span className="dsh-effort-glow-dot" />
                      <span className="dsh-effort-current-label">{effortLabel}</span>
                    </div>
                    <div
                      ref={trackRef}
                      className={`dsh-segmented-slider-track ${isDragging ? 'dsh-is-dragging' : ''}`}
                      onPointerDown={handleTrackPointerDown}
                      onPointerMove={handleTrackPointerMove}
                      onPointerUp={handleTrackPointerUp}
                      onPointerCancel={handleTrackPointerCancel}
                    >
                      <div
                        className="dsh-segmented-sliding-indicator"
                        style={{
                          left: `${indicatorStyle.left}px`,
                          width: `${indicatorStyle.width}px`,
                          opacity: indicatorStyle.opacity,
                        }}
                      />
                      {effortChoices.map((level: any) => {
                        const isSelected = displayedEffort === level.effort
                        return (
                          <button
                            key={level.key}
                            ref={(el) => {
                              if (el) optionRefs.current.set(level.key, el)
                              else optionRefs.current.delete(level.key)
                            }}
                            type="button"
                            role="menuitemradio"
                            aria-checked={isSelected}
                            className={`dsh-segmented-option ${
                              isSelected ? 'dsh-segmented-active' : ''
                            }`}
                            onClick={() => {
                              if (!isDraggingRef.current) {
                                chooseEffort(level.effort)
                              }
                            }}
                          >
                            {level.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
