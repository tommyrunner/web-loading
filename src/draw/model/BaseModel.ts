import type { ElementStoreType, OptionsType, LimitType, LogConfigType } from "../../types";
import { $log, LOG_TYPES, isNull } from '../../utils'
export default class BaseModel<T extends OptionsType> {
    w: number
    h: number
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    options: T
    store: ElementStoreType
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: T, store: ElementStoreType) {
        this.w = w
        this.h = h
        this.canvas = canvas;
        // 默认获取一个2d画笔
        this.ctx = canvas.getContext("2d")!;
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
        // 记录options
        this.options = Object.assign(options, this.options)
        this.store.options = this.options
        // 判断需要限制属性值(只做提示)
        if (limits && limits.length) {
            limits.forEach((l: LimitType) => {
                let mayKey = this.options[l.key as keyof typeof this.options]
                if (!isNull(mayKey) && !l.limit(mayKey)) this.webLog(l.message, { type: LOG_TYPES.WARN })
            })
        }
    }
    // 初始化画笔
    private _$initPoint() {
        // 像素处理
        if (window.devicePixelRatio) {
            devicePixelRatio = window.devicePixelRatio;
            this.canvas.width = this.w * devicePixelRatio;
            this.canvas.height = this.h * devicePixelRatio;
            this.ctx.scale(devicePixelRatio, devicePixelRatio);
        }
        this.clearRect();
        // 默认主题色
        this.ctx.fillStyle = this.options.themeColor!;
        this.ctx.strokeStyle = this.options.themeColor!;
        this.ctx.translate(this.w / 2, this.h / 2)
        this.ctx.save()
    }
    // 清空画布
    clearRect() {
        // 因为已经把起点设置到中心，所需要扩张
        this.ctx.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
    }
    // 日志输出
    webLog(message: string, config?: LogConfigType): void {
        $log(message, config)
    }
    // 开始动画
    run(fun: Function) {
        // 如果已经处于加载状态，无须重新实例
        if (!this.store.animationId)
            this.store.animationId = this.animationFrame(fun)
    }
    /**
     * 封装 requestAnimationFrame 触发动画针
     * @param fun 触发函数
     * @param time 触发周期
     * @returns 
     */
    animationFrame(fun: Function): number | undefined {
        // 兼容
        if (!window.requestAnimationFrame) {
            return window.setInterval(fun, this.options.delay)
        }
        // 利用时间轴控制触发时间
        let endTime = Date.now() + this.options.delay!
        fun.call(this)
        const run = () => {
            if (Date.now() > endTime) {
                fun.call(this)
                endTime = Date.now() + this.options.delay!
            }
            window.requestAnimationFrame(run)
        }
        return window.requestAnimationFrame(run)
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