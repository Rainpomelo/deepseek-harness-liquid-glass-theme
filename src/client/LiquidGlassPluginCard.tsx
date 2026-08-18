import { IconCheckOutline16 } from '@deepseek-ai/dsh-client-ui-primitives'
import type { InjectFace, PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings-plugins/client'
import type { createLiquidGlassRowStore } from './settings-store.ts'
import css from './LiquidGlassPluginCard.module.css'

export interface LiquidGlassPluginCardInjected {
  setEnabled: (enabled: boolean) => void
}

export type LiquidGlassPluginCardComponentProps =
  PropsRuntime<'settings.plugin.item'> & PropsStore<ReturnType<typeof createLiquidGlassRowStore>>
  & PropsLocale<'settings.liquid-glass'> & InjectFace<LiquidGlassPluginCardInjected>

export function LiquidGlassPluginCard(props: LiquidGlassPluginCardComponentProps) {
  const { t, setEnabled, useStore } = props
  const enabled = useStore(s => s.enabled)
  return (
    <li className={css.card}>
      <div className={css.head}>
        <div className={css.text}>
          <div className={css.title}>{t('liquidGlass.title')}</div>
          <div className={css.description}>{t('liquidGlass.description')}</div>
        </div>
        <button
          type="button"
          className={css.toggle}
          aria-pressed={enabled}
          onClick={() => { setEnabled(!enabled) }}
        >
          <span className={css.check}>
            {enabled && <IconCheckOutline16 />}
          </span>
          {enabled ? t('liquidGlass.enable') : t('liquidGlass.disable')}
        </button>
      </div>
    </li>
  )
}
