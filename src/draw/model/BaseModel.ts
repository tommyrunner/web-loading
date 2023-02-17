import type { OptionsType, LimitType, ElementType } from '../../types'
import { isNull, clearAnimationFrame, $Log } from '../../utils'
export default class BaseModel<T extends OptionsType> {
  w: number
  h: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: Required<T>
  element: ElementType
  webLog: $Log
  private stepClear: number
  constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<T>, element: ElementType) {
    this.w = w
    this.h = h
    this.canvas = canvas
    // Get a 2d brush by default
    this.ctx = canvas.getContext('2d')!
    this.options = options
    this.element = element
    this.webLog = $Log
    this.stepClear = 1
    this._$initPoint()
    this._$initEvent()
  }
  // Initialize brush
  private _$initPoint() {
    this.clearRect()
    this.ctx.resetTransform()
    // Default theme color
    const op = this.options,
      defW = this.canvas.width,
      defH = this.canvas.height
    this.ctx.fillStyle = op.themeColor!
    this.ctx.strokeStyle = op.themeColor!
    this.ctx.shadowColor = op.shadowColor!
    this.ctx.font = `${op.fontSize}px ${op.fontFamily} small-caps`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.translate(defW / 2, defH / 2)
    // Synchronous size processing distortion
    const dpr = window.devicePixelRatio || 1
    this.ctx.scale(dpr, dpr)
    this.ctx.save()
  }
  // Initialize default events
  private _$initEvent() {
    // Empty canvas before closing
    this.element.$store.hookCall.beforeColse(() => {
      this.clearRect()
    })
  }
  /**
   * Encapsulate requestAnimationFrame to trigger the animation pin
   * @param fun Trigger function
   * @returns
   */
  private animationFrame(fun: Function) {
    // compatible
    if (!window.requestAnimationFrame) {
      this.element.$store.animationId = window.setInterval(fun, this.options.delay)
    }
    // Use the time axis to control the trigger time
    let endTime = Date.now() + this.options.delay!
    fun.call(this)
    const run = () => {
      if (Date.now() > endTime) {
        fun.call(this)
        endTime = Date.now() + this.options.delay!
      }
      this.element.$store.animationId = window.requestAnimationFrame(run)
    }
    this.element.$store.animationId = window.requestAnimationFrame(run)
  }

  // Start Animation
  run(fun: Function) {
    // If it is already in the loading state, there is no need to re-instance
    if (this.element.$store.animationId) this.clearAnimationFrame(this.element.$store.animationId)
    this.animationFrame(fun)
  }
  /**
   * Cancel animationFrame animation pin
   * @param id Animation id
   */
  clearAnimationFrame(id: number) {
    clearAnimationFrame(id)
  }
  /**
   * Initialize options defaults
   * @param options Incoming default
   * @param limits Limit of value
   */
  initOptions(options: T, limits?: Array<LimitType>) {
    // Record options
    this.options = Object.assign(options, this.options)
    this.element.$store.options = this.options
    // Judge whether the attribute value needs to be limited (only for prompt)
    if (limits && limits.length) {
      limits.forEach((l: LimitType) => {
        const mayKey = this.options[l.key as keyof typeof this.options]
        if (!isNull(mayKey) && !l.limit(mayKey)) $Log.warn(l.message)
      })
    }
  }
  // Empty the canvas
  clearRect(x?: number, y?: number, w_r?: number, h?: number) {
    const defW = this.canvas.width,
      defH = this.canvas.height
    // Because the starting point has been set to the center, expansion is needed
    if (!isNull(x) && !isNull(y) && !isNull(w_r) && !isNull(h)) {
      this.ctx.clearRect(x, y, w_r, h)
    }
    // Empty circular area
    else if (!isNull(x) && !isNull(y) && !isNull(w_r) && isNull(h)) {
      const calcWidth = w_r - this.stepClear
      const calcHeight = Math.sqrt(w_r * w_r - calcWidth * calcWidth)
      const posX = x - calcWidth
      const posY = y - calcHeight
      const widthX = 2 * calcWidth
      const heightY = 2 * calcHeight
      if (this.stepClear <= w_r) {
        this.ctx.clearRect(posX, posY, widthX, heightY)
        this.stepClear += 1
        this.clearRect(x, y, w_r)
      } else {
        this.stepClear = 1
      }
    } else this.ctx.clearRect(-defW, -defH, defW * 2, defH * 2)
  }
  /**
   * Draw a rounded rectangle
   * @param x
   * @param y
   * @param w
   * @param h
   * @param r
   */
  drowRadiusRect(x: number, y: number, w: number, h: number, r: number) {
    this.ctx.beginPath()
    this.ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI)
    this.ctx.lineTo(x + w - r, y)
    this.ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 0)
    this.ctx.lineTo(x + w, y + h - r)
    this.ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI)
    this.ctx.lineTo(x + r, y + h)
    this.ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI)
    this.ctx.lineTo(x, y + r)
    this.ctx.closePath()
  }
}
