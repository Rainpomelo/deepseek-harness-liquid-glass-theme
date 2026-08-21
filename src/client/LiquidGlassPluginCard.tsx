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

  const handleJumpToGeneral = () => {
    const navItems = document.querySelectorAll<HTMLElement>(
      '[class*="SettingsRoot_navCell"], [class*="VOzbGW_navCell"], [class*="navCell"]'
    )
    for (const item of navItems) {
      if (item.textContent?.includes('通用') || item.textContent?.includes('General')) {
        item.click()
        break
      }
    }
  }

  return (
    <li className={css.card} data-dsh-liquid-glass-card="true">
      <div className={css.head}>
        <div className={css.text}>
          <div className={css.titleRow}>
            <span className={css.title}>{t('liquidGlass.title')}</span>
            <span className={css.badge}>VisionOS</span>
          </div>
          <div className={css.description}>{t('liquidGlass.description')}</div>
        </div>
        <div className={css.actions}>
          <button
            type="button"
            className={css.toggle}
            aria-pressed={enabled}
            onClick={() => { setEnabled(!enabled) }}
            title={enabled ? '点击关闭液态玻璃效果' : '点击开启液态玻璃效果'}
          >
            <span className={css.switchTrack}>
              <span className={css.switchThumb} />
            </span>
            <span className={css.switchLabel}>
              {enabled ? t('liquidGlass.enable') : t('liquidGlass.disable')}
            </span>
          </button>
          <button
            type="button"
            className={css.configBtn}
            onClick={handleJumpToGeneral}
            title="前往通用设置调整参数与壁纸"
          >
            调节参数
          </button>
        </div>
      </div>
    </li>
  )
}

