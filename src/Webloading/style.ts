import type { ElementType, OptionsType } from '../types'
import { LOADING_TYPES, toType, onTransitionEndEvent } from '../utils'
const $window = window
export function initContentStyle(
  element: ElementType,
  op: Required<OptionsType>,
  loadingId: string,
  animaEl: HTMLCanvasElement | HTMLDivElement
): ElementType {
  // The client takes the true width and height. If penetration is enabled, the rolling width and height are taken
  const elementW = op.pointerEvents ? element.scrollWidth : element.clientWidth,
    elementH = op.pointerEvents ? element.scrollHeight : element.clientHeight,
    readElementStyle = $window.getComputedStyle(element),
    elementStyle = element.style,
    contentStyle = animaEl.style
  if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
    element.style.pointerEvents = 'none'
  }
  if (!readElementStyle.position || readElementStyle.position === 'static') elementStyle.position = 'relative'
  // Initialize canvas style
  animaEl.id = loadingId
  contentStyle.opacity = '0'
  contentStyle.position = 'absolute'
  contentStyle.left = `${op.pointerEvents ? 0 : element.scrollLeft}px`
  contentStyle.top = `${op.pointerEvents ? 0 : element.scrollTop}px`
  contentStyle.zIndex = op.zIndex
  contentStyle.transition = `${op.delayInto / 1000}s ease-in-out`
  contentStyle.backgroundColor = op.bgColor
  contentStyle.borderRadius = readElementStyle.borderRadius
  // Set canvas size
  if (toType(animaEl) === 'htmlcanvaselement') {
    setupCanvas(animaEl as HTMLCanvasElement, elementW, elementH)
  } else if (toType(animaEl) === 'htmldivelement') {
    // Initialize compatible html styles
    contentStyle.width = `${elementW}px`
    contentStyle.height = `${elementH}px`
    // Center
    contentStyle.display = 'flex'
    contentStyle.alignItems = 'center'
    contentStyle.justifyContent = 'center'
  }
  // injection
  element.append(animaEl)
  // Trigger to enter animation
  $window.setTimeout(() => (contentStyle.opacity = '1'), 0)
  onTransitionEndEvent(element, () => {
    // Wait for all elements to appear and complete (animation ends)
    element.$store.loadingId = loadingId
  })
  return element
}
/**
 * Handle the amplification distortion. At the same time,
 * changing the height and width will also reset all contents of the canvas.
 * @param canvas
 * @param w
 * @param h
 */
export function setupCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
  const dpr = $window.devicePixelRatio || 1
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
}
export function clearStyle(element: ElementType, op: OptionsType, canvas: HTMLCanvasElement | HTMLDivElement) {
  // First visual transition
  canvas.style.opacity = '0'
  // Clear Extension
  if (op.type !== LOADING_TYPES.DOM) {
    element.style.boxShadow = 'none'
  }
}
