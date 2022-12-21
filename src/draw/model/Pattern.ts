import type { ElementStoreType } from "../../types";
import type { PatternOptionsType } from "../types.d";
import { getDefOptions } from '../../utils'
import { PATTERN_CHART } from '../utils'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: Required<PatternOptionsType> = {
    ...getDefOptions(),
    text: '加载中...',
    textGap: 10,
    charts: [PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON],
    chartColors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd'],
    maxHeight: 60,
    chartSize: 12
}
// 值的限制
const limits = [{
    key: 'chartSize', message: 'chartSize value 5-24', limit: (key: any) => { 
        return key >= 5 && key <= 24
    }
}, {
    key: 'delay', message: 'Pattern.delay not allowed update', limit: (key: any) => {
        return key === getDefOptions().delay
    }
}]
interface PatternType {
    // 当前高度
    nowHeight: number
    // 当前chart
    chart: PATTERN_CHART
    // 当前颜色
    color: string,
    // 当前旋转角度
    turn: number
    // 影子
    shadow: number
    // 0:初始化,1:上升,2:下降
    nowSatate: number
}
export default class Gear extends BaseModel<Required<PatternOptionsType>> {
    pattern: PatternType
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<PatternOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 3.初始化画笔
        this.initPoint()
        this.pattern = { color: getDefOptions().themeColor, nowHeight: 10, chart: PATTERN_CHART.RECT, shadow: 0, nowSatate: 1, turn: 0 }
        this.run(this.draw)
    }
    initPoint(): void {
        this.ctx.save()
        // 初始化速度
        this.options.delay = 10
    }
    draw() {
        let op = this.options
        this.clearRect()
        this.ctx.save();
        this.ctx.beginPath()
        this.ctx.translate(0, this.pattern.nowHeight)
        this.ctx.rotate(this.pattern.turn / Math.PI * 2)
        this.ctx.fillStyle = this.pattern.color
        this.selectChart(0, 0, op.chartSize)
        this.ctx.closePath()
        this.ctx.restore();
        this.drawShadow()
        // 清空隐藏部分
        this.clearRect(-this.w, 0, this.w * 2, this.h)
        // 控制数值变化
        this.controller(op)
        // 绘制文字
        this.drawText(op)

    }
    controller(op: Required<PatternOptionsType>) {
        this.pattern.turn += 10 // 角度
        // 高度与影子
        if (this.pattern.nowSatate === 1) {
            this.pattern.nowHeight--
            this.pattern.shadow += 0.2
        }
        else if (this.pattern.nowSatate === 2) {
            this.pattern.nowHeight++
            this.pattern.shadow -= 0.2
        }
        // 速度
        if (this.pattern.nowHeight <= -op.chartSize && this.pattern.nowHeight % 8 == 0) {
            op.delay++
        }
        // 范围
        if (this.pattern.nowHeight <= -op.maxHeight) {
            this.pattern.nowSatate = 2

        }
        else if (this.pattern.nowHeight >= op.chartSize) {
            this.pattern.nowSatate = 1
            op.delay = 10
            // 切换图形
            this.pattern.chart = op.charts[parseInt(String(Math.random() * op.charts.length))]
            // 切换颜色
            this.pattern.color = op.chartColors[parseInt(String(Math.random() * op.chartColors.length))]
        }
    }
    selectChart(x: number, y: number, size: number) {
        switch (this.pattern.chart) {
            case PATTERN_CHART.RECT:
                this.drawRect(x, y, size)
                break
            case PATTERN_CHART.ARC:
                this.drawArc(x, y, size)
                break
            case PATTERN_CHART.TRIANGLE:
                this.drawTriangle(x, y, size)
                break
            case PATTERN_CHART.HEART:
                this.drawHeart(x, y, size)
                break
            case PATTERN_CHART.POLYGON:
                this.drawPolygon(x, y, size)
                break
        }
    }
    drawText(op: Required<PatternOptionsType>) {
        // 位置+文字+间隔
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.fillStyle = this.pattern.color
        let y = op.fontSize + op.textGap
        this.ctx.fillText(op.text, 0, y)
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawShadow() {
        // 绘制影子
        this.ctx.save()
        this.ctx.beginPath()
        this.setShadow()
        this.ctx.globalAlpha = 0.2
        this.ctx.strokeStyle = this.pattern.color
        this.ctx.moveTo(-this.pattern.shadow / 2, 0)
        this.ctx.lineTo(this.pattern.shadow, 0)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.restore()
    }
    drawRect(x: number, y: number, size: number) {
        this.ctx.save();
        this.ctx.beginPath()
        this.setShadow()
        this.ctx.translate(-size / 2, -size / 2)
        this.ctx.fillRect(x, y, size, size)
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawArc(x: number, y: number, size: number) {
        size = size / 2
        this.ctx.save();
        this.ctx.beginPath()
        this.setShadow()
        this.ctx.arc(x, y, size, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawTriangle(x: number, y: number, size: number) {
        this.ctx.save();
        this.ctx.beginPath()
        this.setShadow()
        this.ctx.translate(-size / 2, -(size / 2 * Math.sqrt(3)) / 2)
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(size / 2, size / 2 * Math.sqrt(3));
        this.ctx.lineTo(x, y);
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawHeart(x: number, y: number, size: number) {
        size = size / 2
        this.ctx.save();
        this.ctx.beginPath()
        this.setShadow()
        this.ctx.translate(0, -(size * 2) / 2)
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(size / 2, -size, size * 3, -size / 2, y, size * 2);
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(-size / 2, -size, -size * 3, -size / 2, y, size * 2);
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawPolygon(x: number, y: number, size: number) {
        this.ctx.save();
        this.ctx.beginPath()
        this.setShadow()
        this.ctx.translate(-size / 2, -size / 2)
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(size, y);
        this.ctx.lineTo(size + size / 2, size / 2);
        this.ctx.lineTo(size, size / 2 + size / 2);
        this.ctx.lineTo(x, size);
        this.ctx.lineTo(x - size / 2, size - size / 2);
        this.ctx.lineTo(x, y);
        this.ctx.fill()
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