import type { OptionsType, LimitType, ElementType } from '../../type'
import { isNull, clearAnimationFrame, $Log } from '../../utils'
import { DrawTextParamsType } from '../type'
/** @public */
export default class BaseModel<T extends OptionsType> {
  w: number
  h: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: Required<T>
  element: ElementType
  // Default Options of Model
  modelDefOptions: T | undefined = undefined
  // Limits of Model
  limits: Array<LimitType> | undefined = undefined
  // Provides Callback function for model initialization
  modelDefCall: ((model: BaseModel<T>) => void) | undefined = undefined
  webLog: $Log = $Log
  private stepClear = 1
  /**
   * Custom BaseModel
   * @param w - Canvas width
   * @param h - Canvas height
   * @param canvas - Canvas
   * @param options - Options
   * @param element - Container element
   * @param modelDefOptions -  Default options of model (Optional)
   * @param limits -  Default limits of model (Optional)
   * @param modelDefCall - Provides Callback function for model initialization，Generally initialize "canvas" or "brush" in model (Optional)
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<T>,
    element: ElementType,
    modelDefOptions?: T,
    limits?: Array<LimitType>,
    modelDefCall?: (model: BaseModel<T>) => void
  ) {
    this.w = w
    this.h = h
    this.canvas = canvas
    // Get a 2d brush by default
    this.ctx = canvas.getContext('2d')!
    this.options = options
    this.element = element
    // Initialize model
    this.initContextCall(modelDefOptions, limits, modelDefCall)
  }
  // Initialize brush
  private _$initBaseContext() {
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
   * @param fun - Trigger function
   * @returns
   */
  private _$animationFrame(fun: Function) {
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
  /**
   * Initialize brush properties
   * @param modelDefOptions - Provides Options for model initialization
   * @param limits - Provides Limits for model initialization
   * @param modelDefCall - Provides Callback function for model initialization
   */
  initContextCall(modelDefOptions?: T, limits?: Array<LimitType>, modelDefCall?: (model: BaseModel<T>) => void) {
    // Initialize the point context of base
    this._$initBaseContext()
    // Initialize the hook event of base
    this._$initEvent()
    // Initialize model options
    if (isNull(modelDefOptions)) {
      // Record options
      this.modelDefOptions = modelDefOptions
      this.options = Object.assign(modelDefOptions, this.options)
      this.element.$store.options = this.options
      // Judge whether the attribute value needs to be limited (only for prompt)
      if (limits && limits.length && this.options.toast) {
        limits.forEach((l: LimitType) => {
          const mayKey = this.options[l.key as keyof typeof this.options]
          if (isNull(mayKey) && !l.limit(mayKey)) $Log.warn(l.message)
        })
      }
    }
    if (isNull(limits)) this.limits = limits
    if (isNull(modelDefCall)) {
      // this.modelDefCall = modelDefCall
      modelDefCall.call(this, this)
    }
  }
  // Start Animation
  run(fun: Function) {
    // If it is already in the loading state, there is no need to re-instance
    if (this.element.$store.animationId) this.clearAnimationFrame(this.element.$store.animationId)
    this._$animationFrame(fun)
  }
  /**
   * Cancel animationFrame animation pin
   * @param id - Animation id
   */
  clearAnimationFrame(id: number) {
    clearAnimationFrame(id)
  }
  // Empty the canvas
  clearRect(x?: number, y?: number, w_r?: number, h?: number) {
    const defW = this.canvas.width,
      defH = this.canvas.height
    // Because the starting point has been set to the center, expansion is needed
    if (isNull(x) && isNull(y) && isNull(w_r) && isNull(h)) {
      this.ctx.clearRect(x, y, w_r, h)
    }
    // Empty circular area
    else if (isNull(x) && isNull(y) && isNull(w_r) && !isNull(h)) {
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
   * @param x - x
   * @param y - y
   * @param w - width
   * @param h - height
   * @param r - radius
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
  /**
   * 
   * @param params - 
   * DrawTextParamsType:
   *    esGap?: Extra void
        x?: X-axis
        text?: text
        textColor?: text color
   */
  drawText(params?: DrawTextParamsType) {
    const op = this.options
    const pm: Required<DrawTextParamsType> = Object.assign(
      { esGap: op.textGap || 0, x: 0, text: op.text || '', textColor: op.themeColor || 'rgba(64,158,255,1)' },
      params
    )
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.fillStyle = pm.textColor
    this.ctx.fillText(pm.text, pm.x, (op.textGap || 0) + (op.fontSize || 0) + pm.esGap)
    this.ctx.closePath()
    this.ctx.restore()
  }
}
