import type { ElementType, OptionsType } from '../type'
import type { HooksType } from './type'
import { LOADING_TYPES, getDefOptions, clearAnimationFrame, $Log, HOOKS_CALL_KEY, onTransitionEndEvent } from '../utils'
import drawController from '../draw/index'
import { initStore, initHooksCall, initCanvas, initHtml } from './init'
import { initContentStyle, setupCanvas, clearStyle } from './style'
const $window = window
/**
 * @description Web加载类
 */
export default class WebLoading {
  // canvas动画元素
  canvas: HTMLCanvasElement | null = null
  // Html动画元素
  htmlElement: HTMLDivElement | null = null
  // 动画元素ID
  loadingId: string | null = null
  // 容器元素
  element: ElementType | null = null
  // 配置选项
  options: Required<OptionsType>
  // 钩子
  hooks: HooksType | null = null
  // 大小调整控制
  resizeTimeId: number | null = null
  /**
   * @description 构造函数
   * @param {OptionsType} [options] - 配置选项
   */
  constructor(options?: OptionsType) {
    // 初始化默认配置
    this.options = Object.assign(getDefOptions(), options)
  }
  /**
   * @description 重置动画容器大小
   * @param {ElementType} element - 容器元素
   * @param {HTMLCanvasElement | HTMLDivElement} animaEl - 动画元素
   */
  resize(element: ElementType, animaEl: HTMLCanvasElement | HTMLDivElement) {
    if (!this.resizeTimeId)
      this.resizeTimeId = $window.setTimeout(() => {
        const canvas = animaEl as HTMLCanvasElement
        let w = element.clientWidth,
          h = element.clientHeight
        if (canvas.width > element.clientWidth) {
          // 收缩时需要计算滚动条
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
   * @description 关闭动画
   * @param {ElementType} element - 容器元素
   * @param {HTMLCanvasElement | HTMLDivElement} animaEl - 动画元素
   */
  close(element: ElementType, animaEl: HTMLCanvasElement | HTMLDivElement) {
    const op = this.options
    const store = element.$store
    $window.setTimeout(
      () => {
        // 触发关闭动画
        clearStyle(element, op, animaEl)
        if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
          element.style.pointerEvents = 'auto'
        }
        // 防止二次关闭，如果二次关闭，需要等待上一个动画结束后再清除缓存
        onTransitionEndEvent(element, () => {
          // 结束canvas动画前需要结束样式
          if (store) {
            // 清除模型
            store.model = null
            // 关闭前回调
            this.callEvent(HOOKS_CALL_KEY.BEFORE_CLOSE)
            // 停止animationFrame
            if (store.animationId) clearAnimationFrame(store.animationId)
          }
          // 如果dom是扩展的，清除父元素（父元素由webLoading创建）
          if (op.type !== LOADING_TYPES.DOM) element.remove()
          else animaEl.remove()
          // 擦除状态
          this.loadingId = null
          // 关闭后回调
          this.callEvent(HOOKS_CALL_KEY.CLOSED)
          // 重置钩子
          this.hooks = initHooksCall()
        })
      },
      // 如果是二次关闭，需要主动添加延迟
      !store.loadingId ? op.delayInto : 0
    )
  }

  /**
   * @description 绘制动画
   * @param {ElementType} element - 容器元素
   */
  draw(element: ElementType) {
    const op = this.options
    // 兼容html
    if (op.html) {
      // 初始化基础数据
      const { content, loadingId } = initHtml()
      this.htmlElement = content
      this.htmlElement.innerHTML = op.html
      this.loadingId = loadingId
      // 初始化样式
      this.element = initContentStyle(element, op, loadingId, content)
    } else {
      // 初始化基础数据
      const { canvas, hooks, loadingId } = initCanvas()
      this.canvas = canvas
      this.hooks = hooks
      this.loadingId = loadingId
      // 初始化存储
      initStore(element, op, hooks)
      // 初始化样式
      this.element = initContentStyle(element, op, loadingId, canvas)
      if (element.$store) {
        drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element)
      } else {
        $Log.error('WebLoading:canvas or ctx null')
      }
    }
  }
  /**
   * @description 触发钩子
   * @param {HOOKS_CALL_KEY} hooksKey - 钩子键
   * @private
   */
  private callEvent(hooksKey: HOOKS_CALL_KEY) {
    if (this.hooks)
      this.hooks[hooksKey].forEach((event: Function) => {
        event()
      })
  }
}
