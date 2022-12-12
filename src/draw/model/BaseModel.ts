import type { ElementStoreType, OptionsType } from "../../types";
export default class BaseModel {
    w: number
    h: number
    ctx: CanvasRenderingContext2D
    options: OptionsType
    store: ElementStoreType
    constructor(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType, store: ElementStoreType) {
        this.w = w
        this.h = h
        this.ctx = ctx
        this.options = options
        this.store = store
        // 初始化位置
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.strokeStyle = this.options.themeColor;
        this.ctx.save()
        this.ctx.translate(this.w / 2, this.h / 2)
    }
    /**
     * 封装 requestAnimationFrame 触发动画针
     * @param fun 触发函数
     * @param time 触发周期
     * @returns 
     */
    animationFrame(fun: Function, time?: number): number | undefined {
        // 兼容
        if (this.store.animationId) return undefined
        if (!time) time = 65
        if (!window.requestAnimationFrame) {
            return window.setInterval(fun, time)
        }
        // 利用时间轴控制触发时间
        let endTime = Date.now() + time
        let animationId: number | undefined = undefined
        fun.call(this)
        const run = () => {
            if (Date.now() > endTime) {
                fun.call(this)
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
    clearAnimationFrame(id: number): void {
        if (!window.requestAnimationFrame) {
            window.clearInterval(id)
        } else {
            window.cancelAnimationFrame(id)
        }
    }
}