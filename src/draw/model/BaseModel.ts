import type { OptionsType, LimitType, ElementType } from '../../type'
import { isNull, clearAnimationFrame, $Log } from '../../utils'
import { DrawTextParamsType } from '../type'
/**
 * @description 基础模型类
 * @public
 */
export default class BaseModel<T extends OptionsType> {
  w: number
  h: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: Required<T>
  element: ElementType
  // 模型默认选项
  modelDefOptions: T | undefined = undefined
  // 模型限制
  limits: Array<LimitType> | undefined = undefined
  // 提供模型初始化的回调函数
  modelDefCall: ((model: BaseModel<T>) => void) | undefined = undefined
  webLog: $Log = $Log
  private stepClear = 1
  /**
   * @description 自定义基础模型
   * @param {number} w - Canvas宽度
   * @param {number} h - Canvas高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<T>} options - 配置选项
   * @param {ElementType} element - 容器元素
   * @param {T} [modelDefOptions] - 模型默认选项（可选）
   * @param {Array<LimitType>} [limits] - 模型默认限制（可选）
   * @param {Function} [modelDefCall] - 提供模型初始化的回调函数，通常在模型中初始化"canvas"或"画笔"（可选）
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
    // 默认获取2d画笔
    this.ctx = canvas.getContext('2d')!
    this.options = options
    this.element = element
    // 初始化模型
    this.initContextCall(modelDefOptions, limits, modelDefCall)
  }
  // 初始化画笔
  private _$initBaseContext() {
    this.clearRect()
    this.ctx.resetTransform()
    // 默认主题颜色
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
    // 同步大小处理失真
    const dpr = window.devicePixelRatio || 1
    this.ctx.scale(dpr, dpr)
    this.ctx.save()
  }
  // 初始化默认事件
  private _$initEvent() {
    // 关闭前清空画布
    this.element.$store.hookCall.beforeClose(() => {
      this.clearRect()
    })
  }
  /**
   * @description 封装requestAnimationFrame触发动画针
   * @param {Function} fun - 触发函数
   * @private
   */
  private _$animationFrame(fun: Function) {
    // 兼容处理
    if (!window.requestAnimationFrame) {
      this.element.$store.animationId = window.setInterval(fun, this.options.delay)
    }
    // 使用时间轴控制触发时间
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
   * @description 初始化画笔属性
   * @param {T} [modelDefOptions] - 提供模型初始化的选项
   * @param {Array<LimitType>} [limits] - 提供模型初始化的限制
   * @param {Function} [modelDefCall] - 提供模型初始化的回调函数
   */
  initContextCall(modelDefOptions?: T, limits?: Array<LimitType>, modelDefCall?: (model: BaseModel<T>) => void) {
    // 初始化基础点上下文
    this._$initBaseContext()
    // 初始化基础钩子事件
    this._$initEvent()
    // 初始化模型选项
    if (isNull(modelDefOptions)) {
      // 记录选项
      this.modelDefOptions = modelDefOptions
      this.options = Object.assign(modelDefOptions, this.options)
      this.element.$store.options = this.options
      // 判断属性值是否需要限制（仅用于提示）
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
  /**
   * @description 开始动画
   * @param {Function} fun - 动画函数
   */
  run(fun: Function) {
    // 如果已经处于加载状态，无需重新实例化
    if (this.element.$store.animationId) this.clearAnimationFrame(this.element.$store.animationId)
    this._$animationFrame(fun)
  }
  /**
   * @description 取消animationFrame动画针
   * @param {number} id - 动画ID
   */
  clearAnimationFrame(id: number) {
    clearAnimationFrame(id)
  }
  /**
   * @description 清空画布
   * @param {number} [x] - x坐标
   * @param {number} [y] - y坐标
   * @param {number} [w_r] - 宽度或半径
   * @param {number} [h] - 高度
   */
  clearRect(x?: number, y?: number, w_r?: number, h?: number) {
    const defW = this.canvas.width,
      defH = this.canvas.height
    // 因为起点已设置为中心，需要扩展
    if (isNull(x) && isNull(y) && isNull(w_r) && isNull(h)) {
      this.ctx.clearRect(x, y, w_r, h)
    }
    // 清空圆形区域
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
   * @description 绘制圆角矩形
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {number} r - 圆角半径
   */
  drawRadiusRect(x: number, y: number, w: number, h: number, r: number) {
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
   * @description 绘制文本
   * @param {DrawTextParamsType} [params] - 文本参数
   * DrawTextParamsType:
   *    esGap?: 额外空隙
   *    x?: X轴位置
   *    text?: 文本内容
   *    textColor?: 文本颜色
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
