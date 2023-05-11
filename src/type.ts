import { MODEL_TYPES, LOADING_TYPES, HOOKSCALL_KEY } from './utils'
import BaseModel from './draw/model/BaseModel'
/** @public */
export interface OptionsType {
  // custom model
  custom?: typeof BaseModel | null
  // loading Startup mode (default DEF) [read-only]
  type?: LOADING_TYPES
  // Class of mini mode
  extendClass?: string | null | undefined
  // models
  model?: MODEL_TYPES
  // Html load content
  html?: string
  // text
  text?: string
  // textGap
  textGap?: number
  // fontSize
  fontSize?: number
  // fontFamily
  fontFamily?: string
  // delay
  delay?: number
  // delayInto
  delayInto?: number
  // Senseless refresh
  notFeel?: number
  // optimization
  optimization?: boolean
  // loading Hierarchy
  zIndex?: string
  // Theme color
  themeColor?: string
  // Background color
  bgColor?: string
  // shadowColor
  shadowColor?: string
  // shadowOffsetX
  shadowOffsetX?: number
  // shadowOffsetY
  shadowOffsetY?: number
  // shadowBlur
  shadowBlur?: number
  // Event penetration (DOM mode)
  pointerEvents?: boolean
  // show toast
  toast?: boolean
}
/** @public */
export interface WindowType extends Window {
  BaseModel?: typeof BaseModel
  initLoading?: (options: OptionsType) => LoadingType
  fullLoading?: (options: OptionsType) => LoadingType
  miniLoading?: (options: OptionsType) => LoadingType
}
/** @public */
export interface LoadingType {
  loading: Function
  resize: Function
  close: Function
  update: Function
  getOptions: () => OptionsType
  getLoadingId: () => string | null
}
// The mapping key is enum
/** @public */
export type HooksCallType<T extends string = HOOKSCALL_KEY> = {
  [key in T]: Function
}
/** @public */
export interface ElementStoreType {
  // Save the options parameter of the final merge
  options: OptionsType
  // Used to record the animation status
  animationId: number | undefined
  // Record the loading element id
  loadingId: string | null
  // `Hook function of loading `
  hookCall: HooksCallType
  // Model in use
  model: BaseModel<OptionsType> | null
}
/** @public */
export interface ElementType extends HTMLElement {
  loadingId?: string | null
  $store: ElementStoreType
}
/** @public */
export interface LimitType {
  key: string
  message: string
  limit: (key: any) => boolean
}
/** @public */
export type LogConfigType = {
  // Text color
  color?: string
  // Hint After all
  bgColor?: string
}
