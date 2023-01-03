import type { ElementStoreType } from "../../types";
import type { GearOptionsType } from "../types.d";
import { getDefOptions } from '../../utils'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: Required<GearOptionsType> = {
    ...getDefOptions(),
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
export default class Gear extends BaseModel<Required<GearOptionsType>> {
    aps: Array<number>
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<GearOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 2.根据高宽优化默认值
        this.optimization(this.options.textGap + this.options.lineEnd)
        // 3.初始化画笔
        this.initPoint()
        // 4.开始动画针并记录状态
        this.aps = Array.from({ length: this.options.lineNum }, (_, _index) => _index)
        this.run(this.draw)
    }
    initPoint() {
        let op = this.options
        this.ctx.lineCap = op.lineCap;
        this.ctx.lineWidth = op.lineWidth
        this.ctx.save()
    }
    draw() {
        this.clearRect()
        // 流程
        this.controller()
        // 绘制齿轮
        this.drawGear()
        // 绘制文字
        this.drawText()
    }
    controller() {
        let op = this.options
        if (op.direction)
            this.aps = this.aps.map(a => a - 1 <= 0 ? this.aps.length - 1 : a - 1)
        else
            this.aps = this.aps.map(a => a + 1 > this.aps.length ? 0 : a + 1)
    }
    drawGear() {
        let op = this.options
        this.ctx.save()
        // 设置阴影
        this.ctx.shadowOffsetX = op.shadowOffsetX
        this.ctx.shadowOffsetY = op.shadowOffsetY
        this.ctx.shadowBlur = op.shadowBlur
        // 绘制加载齿轮
        for (let i = 0; i < this.aps.length; i++) {
            this.ctx.beginPath()
            this.ctx.globalAlpha = this.aps[i] / 10
            this.ctx.moveTo(op.lineEndSkew, op.lineStart)
            this.ctx.lineTo(op.lineStartSkew, op.lineEnd)
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.rotate(2 * Math.PI / op.lineNum)
        }
        this.ctx.restore()
    }
    drawText() {
        let op = this.options
        this.ctx.save()
        this.ctx.beginPath()
        // 位置+文字+间隔
        let y = op.lineEnd + op.fontSize + op.textGap
        this.ctx.fillText(op.text, 0, y)
        this.ctx.closePath()
        this.ctx.restore()
    }
    /**
   * 优化处理(主要优化默认文字位置)
   * @param textY 
   */
    optimization(textY: number) {
        // 如果开启优化(优化字体位置)
        if (this.options.optimization) {
            // 根据宽高调整
            if (textY * 4 > this.h) {
                this.options.lineStart = this.h / 6 - 5
                this.options.lineEnd = this.h / 6
                this.options.textGap = 2
            }
        }
    }
}