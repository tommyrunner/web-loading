import type { OptionsType, WindowType } from './types.d'
import _$BaseModel from './draw/model/BaseModel'
import { LOADING_TYPES } from './utils'
import _$initLoading, { _$extendLoading } from './loading'
const $window: WindowType = window
$window.BaseModel = _$BaseModel
// initialization
$window.initLoading = function (options?: OptionsType) {
  return _$initLoading(options)
}
// extend
// Mobile terminal
$window.miniLoading = (options?: OptionsType) => {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
// Full screen
$window.fullLoading = (options?: OptionsType) => {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
// js project separate import method
export default {
  initLoading: $window.initLoading,
  miniLoading: $window.miniLoading,
  fullLoading: $window.fullLoading,
  BaseModel: $window.BaseModel
}
