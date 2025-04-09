import type { ElementType, OptionsType } from '../type'
import type { HooksType } from './type'
import { LOADING_TYPES, getDefOptions, clearAnimationFrame, $Log, HOOKS_CALL_KEY, onTransitionEndEvent } from '../utils'
import drawController from '../draw/index'
import { initStore, initHooksCall, initCanvas, initHtml } from './init'
import { initContentStyle, setupCanvas, clearStyle } from './style'
const $window = window
export default class WebLoading {
  // canvas animation elements
  canvas: HTMLCanvasElement | null = null
  // Html animation elements
  htmlElement: HTMLDivElement | null = null
  // Animation element id
  loadingId: string | null = null
  // Container element
  element: ElementType | null = null
  // Configure options
  options: Required<OptionsType>
  // hooks
  hooks: HooksType | null = null
  // Resize control
  resizeTimeId: number | null = null
  constructor(options?: OptionsType) {
    // Initialize default configuration
    this.options = Object.assign(getDefOptions(), options)
  }
  /**
   * Reset Animation Container Size
   * @param element Container element
   * @param animaEl animation elements
   */
  resize(element: ElementType, animaEl: HTMLCanvasElement | HTMLDivElement) {
    if (!this.resizeTimeId)
      this.resizeTimeId = $window.setTimeout(() => {
        const canvas = animaEl as HTMLCanvasElement
        let w = element.clientWidth,
          h = element.clientHeight
        if (canvas.width > element.clientWidth) {
          // The scroll bar needs to be calculated when shrinking
          w = element.offsetWidth
          h = element.offsetHeight
        }
        if (this.canvas) {
          setupCanvas(canvas, w, h)
          if (element.$store) drawController(w, h, canvas, this.options, element)
        } else if (this.htmlElement) {
          this.htmlElement.style.width = `${w}px`
          this.htmlElement.style.height = `${h}px`
        }
        this.resizeTimeId = null
      }, this.options.delayInto)
  }
  /**
   * Turn off animation
   * @param element Container element
   * @param animaEl animation elements
   */
  close(element: ElementType, animaEl: HTMLCanvasElement | HTMLDivElement) {
    const op = this.options
    const store = element.$store
    $window.setTimeout(
      () => {
        // Trigger Close Animation
        clearStyle(element, op, animaEl)
        if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
          element.style.pointerEvents = 'auto'
        }
        // Prevent seconds from closing. If seconds are closed,
        // it is necessary to wait for the previous animation to end before clearing the cache
        onTransitionEndEvent(element, () => {
          // Need to end the style before ending the canvas animation
          if (store) {
            // Clear model
            store.model = null
            // Callback before closing
            this.callEvent(HOOKS_CALL_KEY.BEFORE_CLOSE)
            // stop it animationFrame
            if (store.animationId) clearAnimationFrame(store.animationId)
          }
          // If the dom is extended, clear the parent element (the parent element is created by webLoading)
          if (op.type !== LOADING_TYPES.DOM) element.remove()
          else animaEl.remove()
          // erase status
          this.loadingId = null
          // Callback after closing
          this.callEvent(HOOKS_CALL_KEY.CLOSED)
          // Callback after closing
          this.hooks = initHooksCall()
        })
      },
      // If the seconds are off, it is necessary to actively add a delay
      !store.loadingId ? op.delayInto : 0
    )
  }

  /**
   * Draw animation
   * @param element Container element
   */
  draw(element: ElementType) {
    const op = this.options
    // Compatible with html
    if (op.html) {
      // Initialize basic data
      const { content, loadingId } = initHtml()
      this.htmlElement = content
      this.htmlElement.innerHTML = op.html
      this.loadingId = loadingId
      // Initialize style
      this.element = initContentStyle(element, op, loadingId, content)
    } else {
      // Initialize basic data
      const { canvas, hooks, loadingId } = initCanvas()
      this.canvas = canvas
      this.hooks = hooks
      this.loadingId = loadingId
      // Initialize store
      initStore(element, op, hooks)
      // Initialize style
      this.element = initContentStyle(element, op, loadingId, canvas)
      if (element.$store) {
        drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element)
      } else {
        $Log.error('WebLoading:canvas or ctx null')
      }
    }
  }
  // Trigger hooks
  private callEvent(hooksKey: HOOKS_CALL_KEY) {
    if (this.hooks)
      this.hooks[hooksKey].forEach((event: Function) => {
        event()
      })
  }
}
