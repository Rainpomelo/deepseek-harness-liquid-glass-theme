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
  const [expandedSection, setExpandedSection] = useState<'model' | 'effort' | null>(null)
  const lastActionRef = useRef('load')
  const [toast, setToast] = useState<{ seq: number; text: string } | null>(null)
  const toastSeq = useRef(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const id = useId()

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
  const effortLabel =
    reasoning === void 0
      ? void 0
      : effectiveEffort === void 0
      ? t ? t('effort.providerDefault') : 'Default'
      : reasoning.efforts?.find((level: any) => level.id === effectiveEffort)?.name ?? effectiveEffort

  const effortChoices = useMemo(() => {
    if (reasoning === void 0) return []
    const defaultList =
      reasoning.defaultEffort === void 0
        ? [
            {
              key: 'provider-default',
              effort: void 0,
              label: t ? t('effort.providerDefault') : 'Default',
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
        setExpandedSection(null)
      }
    }
    document.addEventListener('mousedown', closeOutside)
    return () => {
      document.removeEventListener('mousedown', closeOutside)
    }
  }, [open])

  if (!available) return null

  const show = () => {
    setExpandedSection(null)
    setOpen(true)
    reload()
  }

  const close = (restoreFocus = false) => {
    setOpen(false)
    setExpandedSection(null)
    if (restoreFocus) {
      queueMicrotask(() => {
        triggerRef.current?.focus()
      })
    }
  }

  const settleSelection = (accepted: boolean) => {
    if (accepted) {
      if (rootRef.current !== null) close(true)
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
    if (state?.current?.provider === selection.provider && state?.current?.model === selection.model) {
      close(true)
      return
    }
    lastActionRef.current = 'select'
    select(selection).then(settleSelection)
  }

  const chooseEffort = (effort: any) => {
    if (!state?.current) return
    if (effectiveEffort === effort) {
      close(true)
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
            className={`dsh-model-select-cell ${expandedSection === 'model' ? 'dsh-cell-active' : ''}`}
            onClick={() => setExpandedSection((prev) => (prev === 'model' ? null : 'model'))}
          >
            <span className="dsh-model-select-cell-label">{t ? t('menu.model') : '模型'}</span>
            <span className="dsh-model-select-cell-value">{modelLabel}</span>
            <svg
              className={`dsh-model-select-cell-chevron ${
                expandedSection === 'model' ? 'dsh-chevron-expanded' : ''
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

          {/* 模型列表展开内容 */}
          {expandedSection === 'model' && (
            <div className="dsh-model-collapse-wrap">
              <div className="dsh-model-inline-panel">
                {state?.status === 'loading' && (
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
                            disabled={busy}
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
                  expandedSection === 'effort' ? 'dsh-cell-active' : ''
                }`}
                onClick={() => setExpandedSection((prev) => (prev === 'effort' ? null : 'effort'))}
              >
                <span className="dsh-model-select-cell-label">
                  {t ? t('menu.effort') : '推理等级'}
                </span>
                <span className="dsh-model-select-cell-value">{effortLabel}</span>
                <svg
                  className={`dsh-model-select-cell-chevron ${
                    expandedSection === 'effort' ? 'dsh-chevron-expanded' : ''
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
              {expandedSection === 'effort' && (
                <div className="dsh-effort-collapse-wrap">
                  <div className="dsh-effort-inline-panel">
                    <div className="dsh-effort-header-row">
                      <span className="dsh-effort-glow-dot" />
                      <span className="dsh-effort-current-label">{effortLabel}</span>
                    </div>
                    <div className="dsh-segmented-slider-track">
                      {effortChoices.map((level: any) => {
                        const isSelected = effectiveEffort === level.effort
                        return (
                          <button
                            key={level.key}
                            type="button"
                            role="menuitemradio"
                            aria-checked={isSelected}
                            className={`dsh-segmented-option ${
                              isSelected ? 'dsh-segmented-active' : ''
                            }`}
                            disabled={busy}
                            onClick={() => chooseEffort(level.effort)}
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
