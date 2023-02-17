import type { ElementType, HooksCallType, OptionsType } from '../types'
import type { HooksType } from './type'
import { LOADING_TYPES, toType, getDefOptions, clearAnimationFrame, $Log, HOOKSCALL_KEY } from '../utils'
import drawController from '../draw/index'
import style from './style'
export default class WebLoading {
  // canvas
  canvas: HTMLCanvasElement | null
  // Compatible with html animation elements
  htmlElement: HTMLDivElement | null
  // Animation element id
  loadingId: string | null
  // Animation Elements
  element: ElementType | null
  // Configure options
  options: Required<OptionsType>
  // hooks
  hooks: HooksType | null
  constructor(options?: OptionsType) {
    // Initialize default configuration
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
      if (element.$store) drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element)
    } else if (this.htmlElement) {
      this.htmlElement.style.width = element.clientWidth + 'px'
      this.htmlElement.style.height = element.clientHeight + 'px'
    }
  }
  close(element: ElementType, contentElement: HTMLCanvasElement | HTMLDivElement) {
    const op = this.options
    const store = element.$store
    // Will trigger animation
    this.clearStyle(element, contentElement)
    if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
      element.style.pointerEvents = 'auto'
    }
    if (store) {
      // Clear model
      store.model = null
      // Callback before closing
      this.callEvent(HOOKSCALL_KEY.BEFORE_COLSE)
      // stop it animationFrame
      if (store.animationId) clearAnimationFrame(store.animationId)
    }
    // empty dom
    window.setTimeout(() => {
      // If the dom is extended, clear the parent element (the parent element is created by webLoading)
      if (op.type !== LOADING_TYPES.DOM) element.remove()
      else contentElement.remove()
      // erase status
      this.loadingId = null
      // Callback after closing
      this.callEvent(HOOKSCALL_KEY.COLSED)
      // Callback after closing
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
    // Create container
    this.htmlElement = document.createElement('div')
    // Add content
    this.htmlElement.innerHTML = op.html
    this.loadingId = String('wl_' + Date.now())
    return {
      content: this.htmlElement,
      loadingId: this.loadingId
    }
  }
  private clearStyle(element: ElementType, canvas: HTMLCanvasElement | HTMLDivElement) {
    // First visual transition
    canvas.style.opacity = '0'
    // Clear Extension
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
    // The client takes the true width and height. If penetration is enabled, the rolling width and height are taken
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
    // Initialize canvas style
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
    // Set canvas size
    if (toType(contentElement) === 'htmlcanvaselement') {
      this.setupCanvas(contentElement as HTMLCanvasElement, elementW, elementH)
    } else if (toType(contentElement) === 'htmldivelement') {
      // Initialize compatible html styles
      contentStyle.width = elementW + 'px'
      contentStyle.height = elementH + 'px'
      // Center
      contentStyle.display = 'flex'
      contentStyle.alignItems = 'center'
      contentStyle.justifyContent = 'center'
    }
    // injection
    element.append(contentElement)
    this.element = element
  }
  private setupCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
    // Processing amplification distortion
    const dpr = window.devicePixelRatio || 1
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    return canvas
  }
  draw(element: ElementType) {
    let op = this.options
    // Compatible with html
    if (op.html) {
      // Initialize basic data
      const initValue = this.initHtml()
      // Initialize style
      this.initContentStyle(element, initValue.loadingId, initValue.content)
    } else {
      // Initialize basic data
      const initValue = this.initCanvas()
      // Initialize style
      this.initContentStyle(element, initValue.loadingId, initValue.canvas)
      // Initialize store
      this.initStore(element, initValue.hooks)
      if (element.$store) {
        const canvas = initValue.canvas
        drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element)
      } else {
        $Log.error('WebLoading:canvas or ctx null')
      }
    }
  }
  private initStore(element: ElementType, hooks: HooksType) {
    // Storage status
    element.$store = {
      options: this.options,
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
  // Initialize hooks
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
  // Trigger hooks
  private callEvent(hooksKey: HOOKSCALL_KEY) {
    if (this.hooks)
      this.hooks[hooksKey].forEach((event: Function) => {
        event()
      })
  }
}
