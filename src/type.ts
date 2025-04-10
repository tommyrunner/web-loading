import { MODEL_TYPES, LOADING_TYPES, HOOKS_CALL_KEY } from './utils'
import BaseModel from './draw/model/BaseModel'
/**
 * @description 配置选项接口
 * @public
 */
export interface OptionsType {
  // 自定义模型
  custom?: typeof BaseModel | null
  // 加载启动模式（默认DEF）[只读]
  type?: LOADING_TYPES
  // mini模式的类名
  extendClass?: string | null | undefined
  // 模型类型
  model?: MODEL_TYPES
  // Html加载内容
  html?: string
  // 文本内容
  text?: string
  // 文本间距
  textGap?: number
  // 字体大小
  fontSize?: number
  // 字体系列
  fontFamily?: string
  // 延迟时间
  delay?: number
  // 进入延迟
  delayInto?: number
  // 无感刷新
  notFeel?: number
  // 性能优化
  optimization?: boolean
  // 加载层级
  zIndex?: string
  // 主题颜色
  themeColor?: string
  // 背景颜色
  bgColor?: string
  // 阴影颜色
  shadowColor?: string
  // 阴影X偏移
  shadowOffsetX?: number
  // 阴影Y偏移
  shadowOffsetY?: number
  // 阴影模糊度
  shadowBlur?: number
  // 事件穿透（DOM模式）
  pointerEvents?: boolean
  // 显示提示
  toast?: boolean
}
/**
 * @description 扩展Window类型接口
 */
export interface WindowType extends Window {
  BaseModel?: typeof BaseModel
  initLoading?: (options: OptionsType) => LoadingType
  fullLoading?: (options: OptionsType) => LoadingType
  miniLoading?: (options: OptionsType) => LoadingType
}
/**
 * @description 加载类型接口
 * @public
 */
export interface LoadingType {
  loading: Function
  resize: Function
  close: Function
  update: Function
  getOptions: () => OptionsType
  getLoadingId: () => string | null
}
/**
 * @description 钩子调用类型
 * 映射键是枚举
 */
export type HooksCallType<T extends string = HOOKS_CALL_KEY> = {
  [key in T]: Function
}
/**
 * @description 元素存储类型接口
 * @public
 */
export interface ElementStoreType {
  // 保存最终合并的选项参数
  options: OptionsType
  // 用于记录动画状态
  animationId: number | undefined
  // 记录loading元素id
  loadingId: string | null
  // loading的钩子函数
  hookCall: HooksCallType
  // 使用中的模型
  model: BaseModel<OptionsType> | null
}
/**
 * @description 元素类型接口
 * @public
 */
export interface ElementType extends HTMLElement {
  loadingId?: string | null
  $store: ElementStoreType
}
/**
 * @description 限制类型接口
 * @public
 */
export interface LimitType {
  key: string
  message: string
  limit: (key: any) => boolean
}
/**
 * @description 日志配置类型
 * @public
 */
export type LogConfigType = {
  // 文本颜色
  color?: string
  // 背景提示颜色
  bgColor?: string
}
