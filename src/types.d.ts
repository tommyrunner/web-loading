import { MODEL_TYPES, LOADING_TYPES, HOOKSCALL_KEY } from './utils'
import BaseModel from './draw/model/BaseModel'
export interface OptionsType {
  // custom model
  custom?: typeof BaseModel | null
  // loading Startup mode (default DEF) [read-only]
  type?: LOADING_TYPES
  // Class of mini mode
  miniClass?: string | null | undefined
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
  // delayColse
  delayColse?: number
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
}
export interface WindowType extends Window {
  BaseModel?: typeof BaseModel
  initLoading?: (options: OptionsType) => LoadingType
  fullLoading?: (options: OptionsType) => LoadingType
  miniLoading?: (options: OptionsType) => LoadingType
}
export interface LoadingType {
  loading: Function
  resize: Function
  close: Function
  update: Function
  getOptions: () => OptionsType
  getLoadingId: () => string | null
}
// The mapping key is enum
export type HooksCallType<T extends string = HOOKSCALL_KEY> = {
  [key in T]: Function
}
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
export interface ElementType extends HTMLElement {
  loadingId?: string | null
  $store: ElementStoreType
}
export interface LimitType {
  key: string
  message: string
  limit: (key: any) => boolean
}
export type LogConfigType = {
  // Text color
  color?: string
  // Hint After all
  bgColor?: string
}
