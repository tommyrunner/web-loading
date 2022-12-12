import { OptionsType } from "./types"

/**
 * 支持的 model
 */
export enum MODEL_TYPES {
    GEAR = 'gear'
}
/**
 * 
 * @returns 返回默认配置
 */
export function getDefOptions(): OptionsType {
    return {
        model: MODEL_TYPES.GEAR,
        delayColse: 0.26,
        optimization: false,
        zIndex: "2001",
        themeColor: "rgba(64,158,255,1)",
        bgColor: "rgba(0, 0, 0, 0.8)",
    }
}