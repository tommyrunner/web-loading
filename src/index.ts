/**
 * @packageDocumentation
 * @description 包文档说明
 */
export { OptionsType, LoadingType, ElementStoreType, ElementType, LimitType, LogConfigType } from './type'
import './main'
export * from './draw/type'
export {
  LOADING_TYPES,
  LOG_TYPES,
  MODEL_TYPES,
  HOOKS_CALL_KEY,
  ZOOM_ACTION,
  PATTERN_CHART,
  ROLL_CHART,
  CIRCULAR_ACTION
} from './utils'
import BaseModel from './draw/model/BaseModel'
import initLoading, { fullLoading, miniLoading } from './loading'
export { BaseModel, initLoading, fullLoading, miniLoading }
