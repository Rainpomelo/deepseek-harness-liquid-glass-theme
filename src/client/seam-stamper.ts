/**
 * Runtime seam stamper for Liquid Glass.
 * Stamps stable data-* hooks onto DSH layout elements so CSS rules can pierce
 * through opaque base frames safely without relying on hashed class names.
 */

interface Seam {
  readonly attribute: string
  readonly selector: string
  readonly first?: boolean
}

const TRANSPARENT_FRAME_SELECTORS = [
  '#root',
  '.pI_x6G_frame',
  '[data-dsh-frame]',
  '[data-shell-overlay]',
  '[data-primary-page]',
  '[class*="AppFrame_frame"]',
  '[class*="AppFrame_centerCol"]',
  '[class*="AppFrame_sidebarCol"]',
  '[class*="AppFrame_detailsCol"]',
  '[class*="centerCol"]',
  '[class*="centerSurface"]',
  '[class*="sidebarCol"]',
  '[class*="detailsCol"]',
] as const

const TRANSPARENT_TOKENS = [
  '--dsw-alias-bg-base',
  '--dsw-alias-bg-layer-1',
  '--dsw-alias-bg-layer-2',
  '--dsw-alias-bg-layer-3',
  '--dsw-alias-bg-overlay',
  '--dsw-alias-bg-module-platform',
  '--dsw-alias-bg-multi-select',
] as const

interface SavedStyle {
  readonly value: string
  readonly priority: string
}

const FRAME_STYLE_PROPERTIES = ['background', 'background-color', 'background-image'] as const

const SEAMS: readonly Seam[] = [
  { attribute: 'data-dsh-frame', selector: ':has(> [class*="sidebarCol"])' },
  { attribute: 'data-dsh-sidebar-root', selector: '[class*="sidebarCol"] [class*="root"]', first: true },
  { attribute: 'data-dsh-surface', selector: 'button[class*="newSession"]' },
  { attribute: 'data-dsh-trajectory', selector: '[data-conversation-composer-overlay]' },
  { attribute: 'data-dsh-details', selector: '[class*="detailsCol"] [class*="root"]', first: true },
  { attribute: 'data-dsh-inputbar', selector: ':has(> [data-composer-card])' },
  { attribute: 'data-dsh-add', selector: '[data-composer-card] [class*="add"]' },
  { attribute: 'data-dsh-stats', selector: '[data-slot="conversation.composer.dock"] [class*="root"]' },
  { attribute: 'data-dsh-wordmark', selector: '[class*="sidebarCol"] [class*="brand"]', first: true },
  { attribute: 'data-dsh-chat-view', selector: '[class*="scrollBody"] > div:first-child, [class*="viewArea"], [class*="ChatView_root"], [class*="Md3f7G_root"]' },
  { attribute: 'data-dsh-chat-scroll', selector: '[class*="ConversationRoot_scrollBody"], [class*="wSkVaW_scrollBody"], [data-conversation-scroll]' },
]

function stamp(seam: Seam): void {
  if (seam.first) {
    const el = document.querySelector(seam.selector)
    if (el !== null && !el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, '')
    return
  }
  for (const el of document.querySelectorAll(seam.selector)) {
    if (!el.hasAttribute(seam.attribute)) el.setAttribute(seam.attribute, '')
  }
}

function stampAll(): void {
  for (const seam of SEAMS) stamp(seam)
}

export function startSeamStamper(): () => void {
  const savedTokens = new Map<string, SavedStyle>()
  const savedFrameStyles = new Map<HTMLElement, Map<string, SavedStyle>>()

  for (const token of TRANSPARENT_TOKENS) {
    savedTokens.set(token, {
      value: document.documentElement.style.getPropertyValue(token),
      priority: document.documentElement.style.getPropertyPriority(token),
    })
  }

  const saveFrameStyles = (el: HTMLElement) => {
    if (savedFrameStyles.has(el)) return
    const styles = new Map<string, SavedStyle>()
    for (const property of FRAME_STYLE_PROPERTIES) {
      styles.set(property, {
        value: el.style.getPropertyValue(property),
        priority: el.style.getPropertyPriority(property),
      })
    }
    savedFrameStyles.set(el, styles)
  }

  const stampRuntimeTransparency = () => {
    for (const token of TRANSPARENT_TOKENS) {
      document.documentElement.style.setProperty(token, 'transparent', 'important')
    }
    for (const selector of TRANSPARENT_FRAME_SELECTORS) {
      for (const el of document.querySelectorAll<HTMLElement>(selector)) {
        if (el === document.body || el === document.documentElement) continue
        saveFrameStyles(el)
        el.style.setProperty('background', 'transparent', 'important')
        el.style.setProperty('background-color', 'transparent', 'important')
        el.style.setProperty('background-image', 'none', 'important')
      }
    }
  }

  stampAll()
  stampRuntimeTransparency()
  const observer = new MutationObserver(() => {
    stampAll()
    stampRuntimeTransparency()
  })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  return () => {
    observer.disconnect()
    for (const [token, saved] of savedTokens) {
      if (saved.value) document.documentElement.style.setProperty(token, saved.value, saved.priority)
      else document.documentElement.style.removeProperty(token)
    }
    for (const [el, styles] of savedFrameStyles) {
      if (!el.isConnected) continue
      for (const [property, saved] of styles) {
        if (saved.value) el.style.setProperty(property, saved.value, saved.priority)
        else el.style.removeProperty(property)
      }
    }
  }
}
