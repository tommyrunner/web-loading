import { MODEL_TYPES } from './utils'
export interface OptionsType {
    // model 模式
    model: MODEL_TYPES
    // 过渡关闭动画时间
    delayColse: number
    // 优化处理
    optimization: boolean
    // 动画层级
    zIndex: string
    // 主题色
    themeColor: string
    // 背景色
    bgColor: string

}
export interface ElementStoreType {
    animationId: number | undefined
}
export interface ElementType extends HTMLElement {
    loadingId?: string | null
    $store?: ElementStoreType
}