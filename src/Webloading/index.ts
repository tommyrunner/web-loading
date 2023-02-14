import type { ElementType, HooksCallType, OptionsType } from '../types'
import type { HooksType } from './type'
import { LOADING_TYPES, toType, getDefOptions, clearAnimationFrame, $Log, HOOKSCALL_KEY } from '../utils'
import drawController from '../draw/index'
import style from './style'
export default class WebLoading {
  // 动画canvas
  canvas: HTMLCanvasElement | null
  // 兼容html动画元素
  htmlElement: HTMLDivElement | null
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
    this.htmlElement = null
    this.loadingId = null
    this.element = null
    this.hooks = null
  }
  resize(element: ElementType, contentElement: HTMLCanvasElement | HTMLDivElement) {
    if (this.canvas) {
      let canvas = contentElement as HTMLCanvasElement
      canvas.width = element.clientWidth
      canvas.height = element.clientHeight
      if (element.$store) drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element.$store)
    } else if (this.htmlElement) {
      this.htmlElement.style.width = element.clientWidth + 'px'
      this.htmlElement.style.height = element.clientHeight + 'px'
    }
  }
  close(element: ElementType, contentElement: HTMLCanvasElement | HTMLDivElement) {
    const op = this.options
    const store = element.$store
    // 会触发动画
    this.clearStyle(element, contentElement)
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
      else contentElement.remove()
      // 清除状态
      this.loadingId = null
      // 关闭后回调
      this.callEvent(HOOKSCALL_KEY.COLSED)
      // 清空hooks
      this.hooks = this.initHooksCall()
    }, op.delayColse)
  }

  private initCanvas() {
    this.canvas = document.createElement('canvas')
    this.hooks = this.initHooksCall()
    this.loadingId = String('wl_' + Date.now())
    return {
      canvas: this.canvas,
      hooks: this.hooks,
      loadingId: this.loadingId
    }
  }
  private initHtml() {
    let op = this.options
    // 创建容器
    this.htmlElement = document.createElement('div')
    // 添加内容
    this.htmlElement.innerHTML = op.html
    this.loadingId = String('wl_' + Date.now())
    return {
      content: this.htmlElement,
      loadingId: this.loadingId
    }
  }
  private clearStyle(element: ElementType, canvas: HTMLCanvasElement | HTMLDivElement) {
    // 先视觉过渡
    canvas.style.opacity = '0'
    // 清除扩展
    if (this.options.type !== LOADING_TYPES.DOM) {
      element.style.boxShadow = 'none'
    }
  }
  private initContentStyle(
    element: ElementType,
    loadingId: string,
    contentElement: HTMLCanvasElement | HTMLDivElement
  ) {
    const op = this.options
    // client取真实宽高，如果开启穿透取滚动宽高
    const elementW = op.pointerEvents ? element.scrollWidth : element.clientWidth,
      elementH = op.pointerEvents ? element.scrollHeight : element.clientHeight,
      readElementStyle = window.getComputedStyle(element),
      elementStyle = element.style,
      contentStyle = contentElement.style
    // 初始化元素的样式
    element.loadingId = loadingId
    if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
      element.style.pointerEvents = 'none'
    }
    if (!readElementStyle.position || readElementStyle.position === 'static') elementStyle.position = 'relative'
    // 初始化canvas样式
    contentElement.id = loadingId
    document.styleSheets[0].insertRule(style)
    contentElement.style.animation = `wl_show ${op.delayColse / 1000}s linear`
    contentStyle.position = 'absolute'
    contentStyle.left = `${op.pointerEvents ? 0 : element.scrollLeft}px`
    contentStyle.top = `${op.pointerEvents ? 0 : element.scrollTop}px`
    contentStyle.zIndex = op.zIndex
    contentStyle.transition = `${op.delayColse / 1000}s`
    contentStyle.backgroundColor = op.bgColor
    contentStyle.borderRadius = readElementStyle.borderRadius
    // 设置画布大小
    if (toType(contentElement) === 'htmlcanvaselement') {
      this.setupCanvas(contentElement as HTMLCanvasElement, elementW, elementH)
    } else if (toType(contentElement) === 'htmldivelement') {
      // 初始化兼容html 样式
      contentStyle.width = elementW + 'px'
      contentStyle.height = elementH + 'px'
      // 居中
      contentStyle.display = 'flex'
      contentStyle.alignItems = 'center'
      contentStyle.justifyContent = 'center'
    }
    // 注入
    element.append(contentElement)
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
    let op = this.options
    // 兼容html
    if (op.html) {
      // 初始化基础数据
      const initValue = this.initHtml()
      // 初始化样式
      this.initContentStyle(element, initValue.loadingId, initValue.content)
    } else {
      // 初始化基础数据
      const initValue = this.initCanvas()
      // 初始化样式
      this.initContentStyle(element, initValue.loadingId, initValue.canvas)
      // 初始化store
      this.initStore(element, initValue.hooks)
      if (element.$store) {
        const canvas = initValue.canvas
        drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element.$store)
      } else {
        $Log.error('WebLoading:canvas or ctx null')
      }
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
