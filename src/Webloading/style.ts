import type { ElementType, OptionsType } from '../type'
import { LOADING_TYPES, toType, onTransitionEndEvent } from '../utils'
const $window = window
/**
 * @description 初始化内容样式
 * @param {ElementType} element - 容器元素
 * @param {Required<OptionsType>} op - 配置选项
 * @param {string} loadingId - 加载ID
 * @param {HTMLCanvasElement | HTMLDivElement} animaEl - 动画元素
 * @returns {ElementType} 容器元素
 */
export function initContentStyle(
  element: ElementType,
  op: Required<OptionsType>,
  loadingId: string,
  animaEl: HTMLCanvasElement | HTMLDivElement
): ElementType {
  // 客户端获取真实宽高，如果启用穿透则获取滚动宽高
  const elementW = op.pointerEvents ? element.scrollWidth : element.clientWidth,
    elementH = op.pointerEvents ? element.scrollHeight : element.clientHeight,
    readElementStyle = $window.getComputedStyle(element),
    elementStyle = element.style,
    contentStyle = animaEl.style
  if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
    element.style.pointerEvents = 'none'
  }
  if (!readElementStyle.position || readElementStyle.position === 'static') elementStyle.position = 'relative'
  // 初始化canvas样式
  animaEl.id = loadingId
  contentStyle.opacity = '0'
  contentStyle.position = 'absolute'
  contentStyle.left = `${op.pointerEvents ? 0 : element.scrollLeft}px`
  contentStyle.top = `${op.pointerEvents ? 0 : element.scrollTop}px`
  contentStyle.zIndex = op.zIndex
  contentStyle.transition = `${op.delayInto / 1000}s ease-in-out`
  contentStyle.backgroundColor = op.bgColor
  contentStyle.borderRadius = readElementStyle.borderRadius
  // 设置canvas大小
  if (toType(animaEl) === 'htmlcanvaselement') {
    setupCanvas(animaEl as HTMLCanvasElement, elementW, elementH)
  } else if (toType(animaEl) === 'htmldivelement') {
    // 初始化兼容html样式
    contentStyle.width = `${elementW}px`
    contentStyle.height = `${elementH}px`
    // 居中
    contentStyle.display = 'flex'
    contentStyle.alignItems = 'center'
    contentStyle.justifyContent = 'center'
  }
  // 注入
  element.append(animaEl)
  // 触发进入动画
  $window.setTimeout(() => (contentStyle.opacity = '1'), 0)
  onTransitionEndEvent(element, () => {
    // 等待所有元素出现并完成（动画结束）
    element.$store.loadingId = loadingId
  })
  return element
}
/**
 * @description 处理放大失真，同时更改高度和宽度也会重置canvas的所有内容
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {number} w - 宽度
 * @param {number} h - 高度
 */
export function setupCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
  const dpr = $window.devicePixelRatio || 1
  canvas.width = w * dpr
  canvas.height = h * dpr
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
}
/**
 * @description 清除样式
 * @param {ElementType} element - 容器元素
 * @param {OptionsType} op - 配置选项
 * @param {HTMLCanvasElement | HTMLDivElement} canvas - Canvas或DIV元素
 */
export function clearStyle(element: ElementType, op: OptionsType, canvas: HTMLCanvasElement | HTMLDivElement) {
  // 首先视觉过渡
  canvas.style.opacity = '0'
  // 清除扩展
  if (op.type !== LOADING_TYPES.DOM) {
    element.style.boxShadow = 'none'
  }
}
