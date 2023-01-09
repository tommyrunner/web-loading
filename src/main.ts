import type { OptionsType, HTMLElementType, WindowType } from './types.d'
import BaseModel from './draw/model/BaseModel'
import { LOADING_TYPES } from './utils'
import loading, { _$extendLoading } from './loading'
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
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
// 全屏
$window.fullLoading = (options?: OptionsType) => {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
