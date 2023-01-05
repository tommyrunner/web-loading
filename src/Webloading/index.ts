import type { ElementType, OptionsType } from '../types'
import { LOADING_TYPES, getDefOptions, $log, clearAnimationFrame } from '../utils'
import MiniLoading from '../MiniLoading/index'
import drawController from '../draw/index'
import style from './style'
export default class WebLoading {
  // 动画canvas
  canvas: HTMLCanvasElement
  // 动画元素id
  loadingId: string | null
  // 动画元素
  element: ElementType
  // 配置options
  options: Required<OptionsType>
  // miniLoading
  miniLoading: MiniLoading | null
  constructor(element: HTMLElement, options?: OptionsType) {
    // 初始化默认配置
    this.options = Object.assign(getDefOptions(), options)
    this.miniLoading = null
    this.canvas = document.createElement('canvas')
    this.loadingId = String('wl_' + Date.now())
    this.element = element
    // 便捷移动端使用miniLoading
    if (this.options.type === LOADING_TYPES.MINI) {
      this.miniLoading = new MiniLoading(this.options)
      this.element = this.miniLoading.getElement()
    }
    // 初始化储存属性
    this.initStore()
    this.init()
  }
  resize() {
    this.canvas.width = this.element.clientWidth
    this.canvas.height = this.element.clientHeight
    this.draw()
  }
  close() {
    this.clearStyle()
    this.loadingId = null
    if (!this.options.pointerEvents) this.element.style.pointerEvents = 'auto'
    // 清空mini影响样式
    if (this.options.type === LOADING_TYPES.MINI) this.miniLoading?.clearStyle()
    if (this.element.$store) {
      // 清除model
      this.element.$store.model = null
      // 关闭前回调
      this.element.$store.hookCall.beforeColse()
    }
    // 清空dom
    setTimeout(() => {
      // 停止 animationFrame
      if (this.element.$store?.animationId) clearAnimationFrame(this.element.$store?.animationId)
      // 如果是min，清空父元素(父元素是webLoading创建)
      if (this.options.type === LOADING_TYPES.MINI) this.miniLoading?.getElement().remove()
      else this.canvas.remove()
      // 关闭后回调
      if (this.element.$store?.hookCall) this.element.$store.hookCall.colsed()
    }, this.options.delayColse)
  }

  private init() {
    // 初始化样式
    this.initStyle()
    // 默认启动
    this.draw()
  }
  private clearStyle() {
    // 先视觉过渡
    this.canvas.style.opacity = '0'
    this.canvas.style.zIndex = '-2001'
  }
  private initStyle() {
    let op = this.options
    // offset 含有scroll值的 显然client:内容+padding更合理
    let elementW = this.element.clientWidth,
      elementH = this.element.clientHeight,
      readElementStyle = window.getComputedStyle(this.element),
      elementStyle = this.element.style,
      canvasStyle = this.canvas.style
    // 初始化元素的样式
    this.element.loadingId = this.loadingId
    if (!op.pointerEvents) this.element.style.pointerEvents = 'none'
    if (!readElementStyle.position || readElementStyle.position === 'static') elementStyle.position = 'relative'
    // 初始化canvas样式
    this.canvas.id = this.loadingId!
    document.styleSheets[0].insertRule(style)
    this.canvas.style.animation = `wl_show ${op.delayColse / 1000}s linear`
    canvasStyle.position = 'absolute'
    console.log(op.pointerEvents)
    canvasStyle.left = `${op.pointerEvents ? 0 : this.element.scrollLeft}px`
    canvasStyle.top = `${op.pointerEvents ? 0 : this.element.scrollTop}px`
    canvasStyle.zIndex = op.zIndex
    canvasStyle.transition = `${op.delayColse / 1000}s`
    canvasStyle.backgroundColor = op.bgColor
    canvasStyle.borderRadius = readElementStyle.borderRadius
    // 设置画布大小
    console.dir(this.element)
    this.canvas.width = elementW
    this.canvas.height = elementH
    // 注入
    this.element.append(this.canvas)
  }
  private draw() {
    let w = this.canvas.offsetWidth,
      h = this.canvas.offsetHeight
    if (this.element.$store) {
      drawController(w, h, this.canvas, this.options, this.element.$store)
    } else {
      $log('WebLoading:canvas or ctx null')
    }
  }
  private initStore() {
    // 储存状态
    this.element.$store = {
      options: this.options,
      element: this.element,
      animationId: undefined,
      loadingId: this.loadingId,
      model: null,
      hookCall: {
        beforeColse: () => {},
        colsed: () => {}
      }
    }
  }
}
