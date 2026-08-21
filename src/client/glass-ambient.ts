/**
 * Ambient Scene for Liquid Glass Theme.
 */

export const AMBIENT_MARKUP = `
  <canvas data-dsh-glass-canvas style="position: absolute; inset: 0; width: 100%; height: 100%; display: block;"></canvas>
  <div data-dsh-glass-video-holder style="position: absolute; width: 1px; height: 1px; opacity: 0.001; pointer-events: none; overflow: hidden;"></div>
`

export function ensureGlassAmbientScene(): HTMLElement {
  const existing = document.querySelector<HTMLElement>('[data-dsh-glass-ambient]')
  if (existing !== null) return existing
  const holder = document.createElement('div')
  holder.innerHTML = `<div data-dsh-glass-ambient aria-hidden="true" style="position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; background: #060b18;">${AMBIENT_MARKUP}</div>`
  const node = holder.firstElementChild
  if (!(node instanceof HTMLElement)) throw new Error('ui-liquid-glass: ambient scene failed to parse')
  document.body.prepend(node)
  return node
}

export function removeGlassAmbientScene(): void {
  for (const node of document.querySelectorAll('[data-dsh-glass-ambient]')) {
    node.remove()
  }
}
