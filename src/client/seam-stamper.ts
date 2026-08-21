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
  stampAll()
  const observer = new MutationObserver(() => { stampAll() })
  observer.observe(document.documentElement, { childList: true, subtree: true })
  return () => { observer.disconnect() }
}
