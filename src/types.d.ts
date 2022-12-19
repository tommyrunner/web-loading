import { MODEL_TYPES, LOADING_TYPES, LOG_TYPES } from './utils'
export interface OptionsType {
    // loading显示方式(默认DEF)
    type?: LOADING_TYPES
    // mini模式的class
    miniClass?: string,
    // model 模式
    model?: MODEL_TYPES
    // 初始延迟
    delay?: number
    // 过渡关闭动画时间
    delayColse?: number
    // 优化处理
    optimization?: boolean
    // 动画层级
    zIndex?: string
    // 主题色
    themeColor?: string
    // 背景色
    bgColor?: string

}
export interface LoadingType {
    reload: Function
    resize: Function
    close: Function
}
export interface HTMLElementType extends HTMLElement {
    loading?: (options: OptionsType) => LoadingType
}
export interface ElementStoreType {
    element: HTMLElement
    options: OptionsType
    animationId: number | undefined
}
export interface ElementType extends HTMLElement {
    loadingId?: string | null
    $store?: ElementStoreType
}
export interface LimitType {
    key: string,
    message: string,
    limit: (key: any) => boolean
}
export type LogConfigType = {
    // 日志类型
    type?: LOG_TYPES
    // 文字颜色
    color?: string
    // 提示毕竟
    bgColor?: string
}