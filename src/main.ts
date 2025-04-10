import type { OptionsType, WindowType } from './type'
import _$BaseModel from './draw/model/BaseModel'
import { LOADING_TYPES } from './utils'
import _$initLoading, { _$extendLoading } from './loading'
const $window: WindowType = window
$window.BaseModel = _$BaseModel
// 初始化
$window.initLoading = function (options?: OptionsType) {
  return _$initLoading(options)
}
// 扩展加载方法
// 移动端
$window.miniLoading = (options?: OptionsType) => {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
// 全屏
$window.fullLoading = (options?: OptionsType) => {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
/**
 * @description JS项目单独导入方法
 * @public
 */
export default {
  initLoading: $window.initLoading,
  miniLoading: $window.miniLoading,
  fullLoading: $window.fullLoading,
  BaseModel: $window.BaseModel
}
