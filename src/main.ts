import type { OptionsType, HTMLElementType, WindowType } from './types.d'
import ExtendLoading from './ExtendLoading'
import BaseModel from './draw/model/BaseModel'
import { LOADING_TYPES, getDefOptions } from './utils'
import loading from './loading'
let htmlElement: HTMLElementType = HTMLElement.prototype
let $window: WindowType = window
htmlElement.BaseModel = BaseModel
// 扩展
// dom直接调用
htmlElement.loading = function (options?: OptionsType) {
  return loading(this, options)
}
// 移动端
$window.miniLoading = (options?: OptionsType) => {
  return extendLoading(LOADING_TYPES.MINI, options)
}
// 全屏
$window.loading = (options?: OptionsType) => {
  return extendLoading(LOADING_TYPES.FULL, options)
}
// 扩展加载方式
function extendLoading(type: LOADING_TYPES, options?: OptionsType) {
  let op = Object.assign(options || {}, getDefOptions(), { type })
  let extendLoading = new ExtendLoading(op)
  return loading(extendLoading.getElement(), op)
}
