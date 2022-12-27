import type { ElementStoreType } from "../../types";
import type { RollOptionsType } from '../types'
import { getDefOptions } from '../../utils'
import BaseModel from "./BaseModel";
import { ROLL_CHART } from "../utils";
// 默认值
const defaultOptions: Required<RollOptionsType> = {
    ...getDefOptions(),
    text: '加载中...',
    textGap: 8,
    rollGap: 12,
    childNum: 4,
    rollSize: 16,
    showChild: true,
    chart: ROLL_CHART.WINDMILL,
    windmills: ['#1ab3ea', '#de6834', '#30925d', '#f48ea5'],
    windmillPointColor: '#f2c31f',
    fixad: true
}
// 值的限制
const limits = [{
    key: 'childNum', message: 'chartSize value 4-10', limit: (key: any) => {
        return key >= 4 && key <= 10
    }
}, {
    key: 'delay', message: 'Roll.delay not allowed update', limit: (key: any) => {
        return key === getDefOptions().delay
    }
}]
interface childType {
    turn: number
    x: number
}
interface RollType {
    turn: number
    nowX: number
    state: number
    child: Array<childType>
}
export default class Roll extends BaseModel<Required<RollOptionsType>> {
    Roll: RollType
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<RollOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 2.初始化画笔
        this.Roll = {
            turn: 1,
            nowX: this.options.fixad ? 0 : (this.options.childNum / 2) * (this.options.rollSize + this.options.rollGap) + this.options.rollGap / 2,
            state: 2,
            child: []
        }
        this.initPoint()
        this.run(this.draw)
    }
    initPoint() {


    }
    draw() {
        this.clearRect()
        // 地面
        this.drawGround()
        // 绘制child
        this.drawChild()
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.translate(-this.Roll.nowX, 0)
        this.ctx.rotate(this.Roll.turn * Math.PI / 180)
        // 绘制图形
        this.selectChart()
        // 流程
        this.controller()
        this.ctx.restore()
        // 绘制文字
        this.drawText()

    }
    selectChart() {
        let op = this.options
        switch (op.chart) {
            case ROLL_CHART.RECT:
                this.drawRect()
                break
            case ROLL_CHART.WHEEL:
                this.drawWheel()
                break
            case ROLL_CHART.WINDMILL:
                this.drawWindmill()
                break
        }
    }
    controller() {
        let op = this.options
        if (this.Roll.state === 1) {
            this.Roll.turn -= 10
            if (op.delay < 20 && !op.fixad) op.delay += 2
        }
        if (this.Roll.state === 2) {
            this.Roll.turn += 10
            if (op.delay > 10 && !op.fixad) op.delay -= 5
        }
        if (op.fixad) return
        if (this.Roll.nowX <= -(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6)) this.Roll.state = 1
        if (this.Roll.nowX >= (op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2) this.Roll.state = 2
        if (this.Roll.state === 1) this.Roll.nowX++
        if (this.Roll.state === 2) this.Roll.nowX--


        let child = this.Roll.child
        if (this.Roll.nowX % (op.rollSize + op.rollGap) == 0 && this.Roll.state === 2) {
            child.push({ turn: this.Roll.turn, x: this.Roll.nowX })
        }
        if (this.Roll.state === 1 && child[child.length - 1] && child[child.length - 1].x === this.Roll.nowX) {
            this.Roll.child.pop()
        }
    }
    // 正方形
    drawRect() {
        let op = this.options
        this.ctx.save()
        this.ctx.translate(-op.rollSize / 2, -op.rollSize / 2)
        this.ctx.fillRect(0, 0, op.rollSize, op.rollSize)
        this.ctx.restore()

    }
    // 轮子
    drawWheel() {
        let op = this.options
        this.ctx.save()
        this.ctx.lineWidth = 4
        // 内圆1
        this.ctx.beginPath()
        this.ctx.arc(0, 0, op.rollSize / 6, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.closePath()
        // 内圆2
        this.ctx.beginPath()
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.closePath()
        // 外圆
        this.ctx.beginPath()
        this.ctx.arc(0, 0, op.rollSize, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.closePath()
        // 轮毂
        for (let i = 0; i < 6; i++) {
            this.ctx.beginPath()
            this.ctx.moveTo(0, op.rollSize / 2)
            this.ctx.lineTo(0, op.rollSize)
            this.ctx.stroke()
            this.ctx.rotate((360 / 6) * Math.PI / 180)
            this.ctx.closePath()
        }
        this.ctx.restore()
    }
    // 风车
    drawWindmill() {
        let op = this.options
        this.ctx.save()
        for (let i = 0; i < op.windmills.length; i++) {
            this.ctx.beginPath()
            this.ctx.fillStyle = op.windmills[i]
            this.ctx.arc(-op.rollSize / 2, 0, op.rollSize, 0, Math.PI)
            this.ctx.fill()
            this.ctx.closePath()
            this.ctx.rotate((360 / 4) * Math.PI / 180)
        }
        // 上层合并
        this.ctx.beginPath()
        this.ctx.fillStyle = op.windmillPointColor
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.restore()
    }
    drawChild() {
        let op = this.options
        if (!op.showChild) return
        this.Roll.child.forEach((c, index) => {
            this.ctx.save()
            this.ctx.translate(-c.x, 0)
            this.ctx.globalAlpha = (index + 1) / 10
            this.ctx.rotate(c.turn * Math.PI / 180)
            this.selectChart()
            this.ctx.restore()
        })
    }
    drawGround() {
        let op = this.options
        if (op.chart !== ROLL_CHART.WHEEL) return
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.lineWidth = 3
        this.ctx.globalAlpha = 0.03
        this.ctx.moveTo(-(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6), op.rollSize + 3)
        this.ctx.lineTo((op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2, op.rollSize + 3)
        this.ctx.stroke()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawText() {
        let op = this.options
        this.ctx.save()
        this.ctx.beginPath()
        let y = op.fontSize + op.textGap + op.rollSize
        this.ctx.fillText(op.text, 0, y)
        this.ctx.closePath()
        this.ctx.restore()
    }
    setShadow() {
        let op = this.options
        this.ctx.shadowOffsetX = op.shadowOffsetX
        this.ctx.shadowOffsetY = op.shadowOffsetY
        this.ctx.shadowBlur = op.shadowBlur
    }

}