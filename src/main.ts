import type { OptionsType, WindowType } from './types.d'
import BaseModel from './draw/model/BaseModel'
import { LOADING_TYPES } from './utils'
import initLoading, { _$extendLoading } from './loading'
const $window: WindowType = window
$window.BaseModel = BaseModel
// initialization
$window.initLoading = function (options?: OptionsType) {
  return initLoading(options)
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
