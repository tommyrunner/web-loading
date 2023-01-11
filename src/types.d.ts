import { MODEL_TYPES, LOADING_TYPES, LOG_TYPES, HOOKSCALL_KEY } from './utils'
import BaseModel from './draw/model/BaseModel'
export interface OptionsType {
  // 自定义model
  custom?: any
  // loading启动方式(默认DEF)[只读]
  type?: LOADING_TYPES
  // mini模式的class
  miniClass?: string | null | undefined
  // model 模块
  model?: MODEL_TYPES
  // 字体内容
  text?: string
  // 字体间距
  textGap?: number
  // 字体大小
  fontSize?: number
  // 字体类型
  fontFamily?: string
  // 动画延迟
  delay?: number
  // 关闭动画延迟
  delayColse?: number
  // 优化处理
  optimization?: boolean
  // loading层级
  zIndex?: string
  // 主题色
  themeColor?: string
  // 背景色
  bgColor?: string
  // 阴影色
  shadowColor?: string
  // 阴影X
  shadowOffsetX?: number
  // 阴影Y
  shadowOffsetY?: number
  // 阴影范围
  shadowBlur?: number
  // 事件穿透(DOM方式)
  pointerEvents?: boolean
}
export interface WindowType extends Window {
  fullLoading?: (options: OptionsType) => LoadingType
  miniLoading?: (options: OptionsType) => LoadingType
}
export interface LoadingType {
  reload: Function
  resize: Function
  close: Function
}
export interface HTMLElementType extends HTMLElement {
  loading?: (options?: OptionsType) => LoadingType
  BaseModel?: any
}
// 映射key为enum
export type HooksCallType<T extends string = HOOKSCALL_KEY> = {
  [key in T]: Function
}
export interface ElementStoreType {
  element: ElementType
  options: OptionsType
  animationId: number | undefined
  loadingId: string | null
  hookCall: HooksCallType
  model: BaseModel<OptionsType> | null
}
export interface ElementType extends HTMLElement {
  loadingId?: string | null
  $store?: ElementStoreType
}
export interface LimitType {
  key: string
  message: string
  limit: (key: any) => boolean
}
export type LogConfigType = {
  // 文字颜色
  color?: string
  // 提示毕竟
  bgColor?: string
}
export interface $LogType {
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
  call: (message: string, type: LOG_TYPES, config: LogConfigType) => void
}
