import type { ElementStoreType } from "../../types";
import type { RingOptionsType } from '../types'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: RingOptionsType = {
    fontSize: 12,
    fontFamily: 'Microsoft YaHei',
    text: '加载中...',
    textInterval: 16,
    lineStartSkew: 0,
    lineStart: 10,
    lineEndSkew: 0,
    lineEnd: 16,
    lineWidth: 4,
    lineCap: 'round',
    lineNum: 10,
    direction: true
}
// 值的限制
const limits = [{
    key: 'lineNum', message: 'lineNum value 4-18', limit: (key: any) => {
        return key >= 4 && key <= 18
    }
}]
export default class Ring extends BaseModel<RingOptionsType> {
    constructor(w: number, h: number, ctx: CanvasRenderingContext2D, options: RingOptionsType, store: ElementStoreType) {
        super(w, h, ctx, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 2.初始化画笔
        this.initPoint()
        // 3.开始动画针并记录状态
        this.run(this.draw)
    }
    initPoint(): void {
        let op = this.options
        this.ctx.lineCap = op.lineCap!;
        this.ctx.lineWidth = op.lineWidth!
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = `${op.fontSize!}px ${op.fontFamily!}`;
    }
    draw() {
        let op = this.options
        this.clearRect()
        this.ctx.beginPath()
        this.ctx.rotate(10 * Math.PI / 180)
        this.ctx.arc(0, 0, 10, 0, Math.PI, true)
        this.ctx.lineWidth = 2
        this.ctx.stroke()
        this.ctx.closePath()
    }
}