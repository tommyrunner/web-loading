import type { OptionsType, WindowType } from './types.d'
import BaseModel from './draw/model/BaseModel'
import { LOADING_TYPES } from './utils'
import initLoading, { _$extendLoading } from './loading'
const $window: WindowType = window
$window.BaseModel = BaseModel
// 初始化
$window.initLoading = function (options?: OptionsType) {
  return initLoading(options)
}
// 扩展
// 移动端
$window.miniLoading = (options?: OptionsType) => {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
// 全屏
$window.fullLoading = (options?: OptionsType) => {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
