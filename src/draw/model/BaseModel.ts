import type { ElementStoreType, OptionsType, LimitType } from '../../types'
import { isNull, clearAnimationFrame, $Log } from '../../utils'
export default class BaseModel<T extends OptionsType> {
  w: number
  h: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: Required<T>
  store: ElementStoreType
  webLog: $Log
  private stepClear: number
  constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<T>, store: ElementStoreType) {
    this.w = w
    this.h = h
    this.canvas = canvas
    // 默认获取一个2d画笔
    this.ctx = canvas.getContext('2d')!
    this.options = options
    this.store = store
    this.webLog = $Log
    this.stepClear = 1
    this._$initPoint()
    this._$initEvent()
  }
  /**
   * 初始化options默认值
   * @param options 传入默认值
   * @param limits 值的限制
   */
  initOptions(options: T, limits?: Array<LimitType>) {
    // 记录options
    this.options = Object.assign(options, this.options)
    this.store.options = this.options
    // 判断需要限制属性值(只做提示)
    if (limits && limits.length) {
      limits.forEach((l: LimitType) => {
        let mayKey = this.options[l.key as keyof typeof this.options]
        if (!isNull(mayKey) && !l.limit(mayKey)) $Log.warn(l.message)
      })
    }
  }
  // 初始化画笔
  private _$initPoint() {
    this.clearRect()
    this.ctx.resetTransform()
    // 默认主题色
    let op = this.options,
      defW = this.canvas.width,
      defH = this.canvas.height
    this.ctx.fillStyle = op.themeColor!
    this.ctx.strokeStyle = op.themeColor!
    this.ctx.shadowColor = op.shadowColor!
    this.ctx.font = `${op.fontSize}px ${op.fontFamily}`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.translate(defW / 2, defH / 2)
    this.ctx.save()
  }
  // 初始化默认事件
  private _$initEvent() {
    // 关闭前清空画布
    this.store.hookCall.beforeColse(() => {
      this.clearRect()
    })
  }
  // 清空画布
  clearRect(x?: number, y?: number, w_r?: number, h?: number) {
    let defW = this.canvas.width,
      defH = this.canvas.height
    // 因为已经把起点设置到中心，所需要扩张
    if (!isNull(x) && !isNull(y) && !isNull(w_r) && !isNull(h)) {
      this.ctx.clearRect(x, y, w_r, h)
    }
    // 圆形区域清空
    else if (!isNull(x) && !isNull(y) && !isNull(w_r) && isNull(h)) {
      let calcWidth = w_r - this.stepClear
      let calcHeight = Math.sqrt(w_r * w_r - calcWidth * calcWidth)
      let posX = x - calcWidth
      let posY = y - calcHeight
      let widthX = 2 * calcWidth
      let heightY = 2 * calcHeight
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
   * 绘制圆角矩形
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
  // 开始动画
  run(fun: Function) {
    // 如果已经处于加载状态，无须重新实例
    if (this.store.animationId) this.clearAnimationFrame(this.store.animationId)
    this.animationFrame(fun)
  }
  /**
   * 封装 requestAnimationFrame 触发动画针
   * @param fun 触发函数
   * @returns
   */
  private animationFrame(fun: Function) {
    // 兼容
    if (!window.requestAnimationFrame) {
      this.store.animationId = window.setInterval(fun, this.options.delay)
    }
    // 利用时间轴控制触发时间
    let endTime = Date.now() + this.options.delay!
    fun.call(this)
    const run = () => {
      if (Date.now() > endTime) {
        fun.call(this)
        endTime = Date.now() + this.options.delay!
      }
      this.store.animationId = window.requestAnimationFrame(run)
    }
    this.store.animationId = window.requestAnimationFrame(run)
  }
  /**
   * 取消 animationFrame 动画针
   * @param id 动画id
   */
  clearAnimationFrame(id: number) {
    clearAnimationFrame(id)
  }
}
