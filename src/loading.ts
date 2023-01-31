import WebLoading from './Webloading/index'
import ExtendLoading from './ExtendLoading'
import type { OptionsType, LoadingType } from './types.d'
import { LOADING_TYPES, getDefOptions, $Log } from './utils'
import drawController from './draw/index'
export default function initLoading(options?: OptionsType): LoadingType {
  const webLoading = new WebLoading(options)
  const resize = () => {
    if (webLoading.element && webLoading.canvas) webLoading.resize(webLoading.element, webLoading.canvas)
  }
  const loading = (dom: HTMLElement, options?: OptionsType) => {
    // 保留上次传入参数
    const op = Object.assign(webLoading.options, options)
    // 防止重复注册
    if (!webLoading.loadingId) {
      // 创建扩展dom
      if (op.type !== LOADING_TYPES.DOM) {
        dom = new ExtendLoading(op).getElement()
      }
      if (!dom) $Log.error('loading函数未找到HTMLElement元素!')
      else webLoading.draw(dom)
    }
  }
  const update = (options?: OptionsType) => {
    const canvas = webLoading.canvas
    const op = Object.assign(webLoading.options, options)
    const element = webLoading.element
    if (canvas && op && element && element.$store)
      drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, op, element.$store)
  }
  const close = () => {
    if (webLoading.element && webLoading.canvas) webLoading.close(webLoading.element, webLoading.canvas)
  }
  // 抛出基础信息
  const getLoadingId = () => webLoading.loadingId
  const getOptions = () => webLoading.options
  return {
    loading,
    resize,
    close,
    update,
    getOptions,
    getLoadingId
  }
}
// 扩展加载方式
export function _$extendLoading(type: LOADING_TYPES, options?: OptionsType) {
  return initLoading(Object.assign(getDefOptions(), options || {}, { type }))
}
export function fullLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
export function miniLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
