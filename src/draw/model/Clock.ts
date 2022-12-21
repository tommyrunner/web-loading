import type { ElementStoreType } from "../../types";
import type { ClockOptionsType } from "../types.d";
import { getDefOptions } from '../../utils'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: Required<ClockOptionsType> = {
    ...getDefOptions(),
    text: '',
    textGap: 4,
    lineCap: 'round',
    lineWidth: 2,
    lineColors: ['#d4d4d4', '#06ab2d', '#930808'],
    clockSize: 15,
    clockGap: 4,
    hLine: true,
    mLine: false,
    sLine: true,
    textTime: true
}
// 值的限制
export default class Gear extends BaseModel<Required<ClockOptionsType>> {
    // 记录
    nowTime: number
    nowS: number
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<ClockOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, [])
        // 3.初始化画笔
        this.initPoint()
        this.nowTime = -1
        this.nowS = 0
        this.run(this.draw)
    }
    initPoint(): void {
        let op = this.options
        this.ctx.lineCap = op.lineCap;
        this.ctx.lineWidth = op.lineWidth
        this.ctx.save()
    }
    draw() {
        this.clearRect()
        // 绘制clock
        this.drawClock()
    }
    controller(op: Required<ClockOptionsType>) {

    }
    drawText(h: number, m: number, s: number) {
        let op = this.options
        this.ctx.save()
        this.ctx.beginPath()
        let y = op.clockSize * 2 + op.textGap
        let text = !op.text ? `${h} : ${m} : ${s}` : op.text
        if (op.textTime && !op.text) text = this.nowTime + 's'
        this.ctx.fillText(text, 0, y)
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawClock() {
        let op = this.options
        let s = new Date().getSeconds()
        let m = new Date().getMinutes()
        let h = new Date().getHours()
        // 顶
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.moveTo(-5, -(op.clockSize + op.clockGap))
        this.ctx.lineTo(5, -(op.clockSize + op.clockGap))
        this.ctx.stroke()
        this.ctx.closePath()
        // 外圆
        this.ctx.beginPath()
        this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.closePath()
        this.ctx.restore()
        // 刻度
        this.ctx.save()
        for (let i = 0; i < 12; i++) {
            this.ctx.beginPath()
            this.ctx.rotate((360 / 12) * Math.PI / 180)
            this.ctx.moveTo(op.clockSize - op.clockGap, 0)
            this.ctx.lineTo(op.clockSize - op.clockGap, 0)
            this.ctx.stroke()
            this.ctx.closePath()
        }
        this.ctx.restore()
        // 时针
        if (op.hLine) {
            this.ctx.save()
            this.ctx.beginPath()
            this.ctx.lineWidth = op.lineWidth * 1.6
            if (op.lineColors[0]) this.ctx.strokeStyle = op.lineColors[0]
            // 初始化点
            this.ctx.rotate((-90 * Math.PI) / 180)
            this.ctx.rotate(((h * 360 / 60) * Math.PI) / 180)
            this.ctx.moveTo(-1, 0)
            this.ctx.lineTo(op.clockSize / 2, 0)
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.restore()
        }
        // 分针
        if (op.mLine) {
            this.ctx.save()
            this.ctx.beginPath()
            if (op.lineColors[1]) this.ctx.strokeStyle = op.lineColors[1]
            this.ctx.lineWidth = op.lineWidth * 1.2
            // 初始化点
            this.ctx.rotate((-90 * Math.PI) / 180)
            this.ctx.rotate(((m * 360 / 60) * Math.PI) / 180)
            this.ctx.moveTo(-1, 0)
            this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0)
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.restore()
        }
        // 秒针
        if (op.sLine) {
            this.ctx.save()
            this.ctx.beginPath()
            if (op.lineColors[2]) this.ctx.strokeStyle = op.lineColors[2]
            // 初始化点
            this.ctx.rotate((-90 * Math.PI) / 180)
            this.ctx.rotate(((s * 360 / 60) * Math.PI) / 180)
            this.ctx.moveTo(-1, 0)
            this.ctx.lineTo(op.clockSize - op.clockGap, 0)
            this.ctx.stroke()
            this.ctx.closePath()
            this.ctx.restore()
            if (this.nowS !== s) this.nowTime++
            this.nowS = s
        }
        // 绘制文字
        this.drawText(h, m, s)

    }

}