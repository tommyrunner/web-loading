import WebLoading from './Webloading/index'
import ExtendLoading from './ExtendLoading'
import type { OptionsType } from './types.d'
import { LOADING_TYPES, getDefOptions } from './utils'
export default function initLoading(options?: OptionsType) {
  let webLoading = new WebLoading(options)
  const resize = () => {
    if (webLoading.element && webLoading.canvas) webLoading.resize(webLoading.element, webLoading.canvas)
  }
  const loading = (dom: HTMLElement, options?: OptionsType) => {
    // 保留上次传入参数
    let op = Object.assign(webLoading.options, options)
    // 防止重复注册
    if (!webLoading.loadingId) {
      // 创建扩展dom
      if (op.type !== LOADING_TYPES.DOM) {
        dom = new ExtendLoading(op).getElement()
      }
      webLoading.draw(dom)
    }
  }
  const close = () => {
    if (webLoading.element && webLoading.canvas) webLoading.close(webLoading.element, webLoading.canvas)
  }
  return {
    loading,
    resize,
    close
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
