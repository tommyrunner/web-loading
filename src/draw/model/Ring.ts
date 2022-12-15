import type { ElementStoreType } from "../../types";
import type { RingOptionsType } from '../types'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: RingOptionsType = {
    fontSize: 12,
    textGap: 4,
    fontFamily: 'Microsoft YaHei',
    text: '加载中...',
    arcGap: Math.PI / 4,
    lineWidth: 2,
    ringNum: 2,
    radius: 5,
    lineCap: 'round',
    direction: true
}
// 值的限制
const limits = [{
    key: 'ringNum', message: 'ringNum value 1-10', limit: (key: any) => {
        return key >= 1 && key <= 10
    }
}]
export default class Ring extends BaseModel<RingOptionsType> {
    rotate: number // 每次旋转角度(默认每次旋转10)
    constructor(w: number, h: number, ctx: CanvasRenderingContext2D, options: RingOptionsType, store: ElementStoreType) {
        super(w, h, ctx, options, store)
        this.rotate = 10
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
        let rotate = this.rotate * Math.PI / 180 * (op.direction ? 1 : -1)
        this.ctx.rotate(rotate)
        // 画环
        for (let i = 1; i <= op.ringNum!; i++) {
            this.drawRing(op.radius! * i, op.arcGap, Math.PI / i)
        }
        // 绘制文字
        this.ctx.rotate(-rotate)
        this.ctx.beginPath()
        let x = 0, y = op.ringNum! * op.radius! * 2 + op.textGap!
        this.ctx.fillText(op.text!, x, y)
        this.ctx.closePath()
        this.rotate += 10

    }
    drawRing(r: number, arcGap: number = 1, angle: number = 0) {
        // 第一个弧形
        this.ctx.beginPath()
        this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle)
        this.ctx.stroke()
        this.ctx.closePath()
        // 第二个弧形
        this.ctx.beginPath()
        this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle)
        this.ctx.stroke()
        this.ctx.closePath()
    }
}