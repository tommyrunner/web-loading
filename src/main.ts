import type { OptionsType, HTMLElementType, WindowType } from './types.d'
import WebLoading from './Webloading/index'
import ExtendLoading from './ExtendLoading'
import BaseModel from './draw/model/BaseModel'
import { LOADING_TYPES, $Log } from './utils'
let htmlElement: HTMLElementType = HTMLElement.prototype
let $window: WindowType = window
// 方便web使用
htmlElement.BaseModel = BaseModel
htmlElement.loading = function loading(options?: OptionsType, extendLoading?: ExtendLoading) {
  // 默认调用
  let webLoading = new WebLoading(this, options, extendLoading)
  const resize = () => {
    webLoading.resize()
  }
  const reload = (options?: OptionsType) => {
    let op = Object.assign(webLoading.options, options)
    let el = this
    let loading = extendLoading
    // 防止重复注册
    if (!webLoading.loadingId) {
      // 保留上次传入参数
      if ($window.miniLoading && op.type !== LOADING_TYPES.DOM) {
        loading = new ExtendLoading(op)
        el = loading.getElement()
        op = Object.assign(op)
      }
      webLoading = new WebLoading(el, op, loading)
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
// 扩展移动端
$window.miniLoading = (options?: OptionsType) => {
  return extendLoading(LOADING_TYPES.MINI, options)
}
// 扩展全屏
$window.loading = (options?: OptionsType) => {
  return extendLoading(LOADING_TYPES.FULL, options)
}
// 扩展加载方式
function extendLoading(type: LOADING_TYPES, options?: OptionsType) {
  let op = Object.assign(options || {}, { type })
  let extendLoading = new ExtendLoading(op)
  let el = extendLoading.getElement()
  if (el.loading) return el.loading(op, extendLoading)
  else {
    $Log.warn('element is not supported')
    return {
      reload: () => {},
      resize: () => {},
      close: () => {}
    }
  }
}
