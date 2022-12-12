import { OptionsType } from "./types"

/**
 * 支持的 model
 */
export enum MODEL_TYPES {
    GEAR = 'gear'
}
/**
 * 封装 requestAnimationFrame 触发动画针
 * @param fun 触发函数
 * @param time 触发周期
 * @returns 
 */
export function animationFrame(fun: Function, time?: number): number | undefined {
    // 兼容
    if (!time) time = 65
    if (!window.requestAnimationFrame) {
        return window.setInterval(fun, time)
    }
    // 利用时间轴控制触发时间
    let endTime = Date.now() + time
    let animationId = null
    fun()
    const run = () => {
        if (Date.now() > endTime) {
            fun()
            time && (endTime = Date.now() + time)
        }
        window.requestAnimationFrame(run)
    }
    animationId = window.requestAnimationFrame(run)
    return animationId
}
/**
 * 取消 animationFrame 动画针
 * @param id 动画id
 */
export function clearAnimationFrame(id: number): void {
    if (!window.requestAnimationFrame) {
        window.clearInterval(id)
    } else {
        window.cancelAnimationFrame(id)
    }
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