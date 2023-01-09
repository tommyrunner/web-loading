import WebLoading from './Webloading/index'
import ExtendLoading from './ExtendLoading'
import type { OptionsType } from './types.d'
import { LOADING_TYPES, getDefOptions } from './utils'
export default function loading(dom: HTMLElement, options?: OptionsType) {
  // 默认调用
  let webLoading = new WebLoading(dom, options)
  const resize = () => {
    webLoading.resize()
  }
  const reload = (options?: OptionsType) => {
    // 保留上次传入参数
    let op = Object.assign(webLoading.options, options)
    // 防止重复注册
    if (!webLoading.loadingId) {
      if (op.type !== LOADING_TYPES.DOM) {
        op = Object.assign(op)
      }
      webLoading = new WebLoading(dom, op)
    }
  }
  const close = () => {
    webLoading.close()
  }
  return {
    reload,
    resize,
    close
  }
}
// 扩展加载方式
export function _$extendLoading(type: LOADING_TYPES, options?: OptionsType) {
  let op = Object.assign(options || {}, getDefOptions(), { type })
  let extendLoading = new ExtendLoading(op)
  return loading(extendLoading.getElement(), op)
}
export function fullLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
export function miniLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
