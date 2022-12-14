import { MODEL_TYPES, LOG_TYPES } from './utils'
export interface OptionsType {
    // model 模式
    model?: MODEL_TYPES
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