import type { ElementStoreType, OptionsType, LimitType, LogConfigType } from "../../types";
import { $log, LOG_TYPES } from '../../utils'
export default class BaseModel<T extends OptionsType> {
    w: number
    h: number
    ctx: CanvasRenderingContext2D
    options: T
    store: ElementStoreType
    constructor(w: number, h: number, ctx: CanvasRenderingContext2D, options: T, store: ElementStoreType) {
        this.w = w
        this.h = h
        this.ctx = ctx
        this.options = options
        this.store = store
        this._$initPoint()
    }
    /**
     * 初始化options默认值
     * @param options 传入默认值
     * @param limits 值的限制
     */
    initOptions(options: T, limits?: Array<LimitType>) {
        // 判断需要限制属性值(只做提示)
        this.options = Object.assign(options, this.options)
        // 记录options
        this.store.options = this.options
        if (limits) {
            limits.forEach((l: LimitType) => {
                let mayKey = this.options[l.key as keyof typeof this.options]
                if (mayKey && !l.limit(mayKey)) this.webLog(l.message, { type: LOG_TYPES.WARN })
            })
        }
    }
    // 初始化画笔
    _$initPoint() {
        if (this.options.themeColor) {
            this.ctx.fillStyle = this.options.themeColor;
            this.ctx.strokeStyle = this.options.themeColor;
        }
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.save()
        this.ctx.translate(this.w / 2, this.h / 2)
    }
    // 日志输出
    webLog(message: string, config?: LogConfigType): void {
        $log(message, config)
    }
    // 开始动画
    run(fun: Function, time?: number) {
        // 如果已经处于加载状态，无须重新实例
        if (!this.store.animationId)
            this.store.animationId = this.animationFrame(fun, time)
    }
    /**
     * 封装 requestAnimationFrame 触发动画针
     * @param fun 触发函数
     * @param time 触发周期
     * @returns 
     */
    animationFrame(fun: Function, time?: number): number | undefined {
        // 兼容
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