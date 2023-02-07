import type { ElementType, HooksCallType, OptionsType } from '../types'
import type { HooksType } from './type'
import { LOADING_TYPES, getDefOptions, clearAnimationFrame, $Log, HOOKSCALL_KEY } from '../utils'
import drawController from '../draw/index'
import style from './style'
export default class WebLoading {
  // 动画canvas
  canvas: HTMLCanvasElement | null
  // 动画元素id
  loadingId: string | null
  // 动画元素
  element: ElementType | null
  // 配置options
  options: Required<OptionsType>
  // hooks
  hooks: HooksType | null
  constructor(options?: OptionsType) {
    // 初始化默认配置
    this.options = Object.assign(getDefOptions(), options)
    this.canvas = null
    this.loadingId = null
    this.element = null
    this.hooks = null
  }
  resize(element: ElementType, canvas: HTMLCanvasElement) {
    canvas.width = element.clientWidth
    canvas.height = element.clientHeight
    if (element.$store) drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element.$store)
  }
  close(element: ElementType, canvas: HTMLCanvasElement) {
    const op = this.options
    const store = element.$store
    // 会触发动画
    this.clearStyle(element, canvas)
    if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
      element.style.pointerEvents = 'auto'
    }
    if (store) {
      // 清除model
      store.model = null
      // 关闭前回调
      this.callEvent(HOOKSCALL_KEY.BEFORE_COLSE)
      // 停止 animationFrame
      if (store.animationId) clearAnimationFrame(store.animationId)
    }
    // 清空dom
    window.setTimeout(() => {
      // 如果是扩展dom，清空父元素(父元素是webLoading创建)
      if (op.type !== LOADING_TYPES.DOM) element.remove()
      else canvas.remove()
      // 清除状态
      this.loadingId = null
      // 关闭后回调
      this.callEvent(HOOKSCALL_KEY.COLSED)
      // 清空hooks
      this.hooks = this.initHooksCall()
    }, op.delayColse)
  }

  private init() {
    this.canvas = document.createElement('canvas')
    this.hooks = this.initHooksCall()
    this.loadingId = String('wl_' + Date.now())
    return {
      canvas: this.canvas,
      hooks: this.hooks,
      loadingId: this.loadingId
    }
  }
  private clearStyle(element: ElementType, canvas: HTMLCanvasElement) {
    // 先视觉过渡
    canvas.style.opacity = '0'
    // 清除扩展
    if (this.options.type !== LOADING_TYPES.DOM) {
      element.style.boxShadow = 'none'
    }
  }
  private initCanvasStyle(element: ElementType, loadingId: string, canvas: HTMLCanvasElement) {
    const op = this.options
    // offset 含有scroll值的 显然client:内容+padding更合理
    const elementW = element.clientWidth,
      elementH = element.clientHeight,
      readElementStyle = window.getComputedStyle(element),
      elementStyle = element.style,
      canvasStyle = canvas.style
    // 初始化元素的样式
    element.loadingId = loadingId
    if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
      element.style.pointerEvents = 'none'
    }
    if (!readElementStyle.position || readElementStyle.position === 'static') elementStyle.position = 'relative'
    // 初始化canvas样式
    canvas.id = loadingId
    document.styleSheets[0].insertRule(style)
    canvas.style.animation = `wl_show ${op.delayColse / 1000}s linear`
    canvasStyle.position = 'absolute'
    canvasStyle.left = `${op.pointerEvents ? 0 : element.scrollLeft}px`
    canvasStyle.top = `${op.pointerEvents ? 0 : element.scrollTop}px`
    canvasStyle.zIndex = op.zIndex
    canvasStyle.transition = `${op.delayColse / 1000}s`
    canvasStyle.backgroundColor = op.bgColor
    canvasStyle.borderRadius = readElementStyle.borderRadius
    // 设置画布大小
    // canvas.width = elementW
    // canvas.height = elementH
    this.setupCanvas(canvas, elementW, elementH)
    // 注入
    element.append(canvas)
    this.element = element
  }
  private setupCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
    // 处理放大失真
    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    return canvas
  }
  draw(element: ElementType) {
    // 初始化基础数据
    const initValue = this.init()
    // 初始化样式
    this.initCanvasStyle(element, initValue.loadingId, initValue.canvas)
    // 初始化store
    this.initStore(element, initValue.hooks)
    if (element.$store) {
      const canvas = initValue.canvas
      drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element.$store)
    } else {
      $Log.error('WebLoading:canvas or ctx null')
    }
  }
  private initStore(element: ElementType, hooks: HooksType) {
    // 储存状态
    element.$store = {
      options: this.options,
      element: element,
      animationId: undefined,
      loadingId: this.loadingId,
      model: null,
      hookCall: this.initStoreHooksCall(hooks)
    }
  }
  private initHooksCall(): HooksType {
    return {
      [HOOKSCALL_KEY.BEFORE_COLSE]: [],
      [HOOKSCALL_KEY.COLSED]: []
    }
  }
  // 初始化hooks
  private initStoreHooksCall(hooks: HooksType): HooksCallType {
    return {
      [HOOKSCALL_KEY.BEFORE_COLSE]: (fun: Function) => {
        hooks[HOOKSCALL_KEY.BEFORE_COLSE].push(fun)
      },
      [HOOKSCALL_KEY.COLSED]: (fun: (params?: any) => any) => {
        hooks[HOOKSCALL_KEY.COLSED].push(fun)
      }
    }
  }
  // 触发hooks
  private callEvent(hooksKey: HOOKSCALL_KEY) {
    if (this.hooks)
      this.hooks[hooksKey].forEach((event: Function) => {
        event()
      })
  }
}
