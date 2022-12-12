import { MODEL_TYPES } from './utils'
export interface OptionsType {
    model: MODEL_TYPES
    delay: number
    optimization: boolean
    zIndex: string
    themeColor: string
    bgColor: string

}
export interface ElementStoreType {
    animationId: number | undefined
}
export interface ElementType extends HTMLElement {
    loadingId?: string | null
    $store?: ElementStoreType
}