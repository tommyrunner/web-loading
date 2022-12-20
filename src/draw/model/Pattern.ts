import type { ElementStoreType } from "../../types";
import type { GearOptionsType } from "../types.d";
import { getDefOptions } from '../../utils'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: Required<GearOptionsType> = {
    ...getDefOptions(),
    fontSize: 12,
    fontFamily: 'Microsoft YaHei',
    text: '加载中...',
    textGap: 16,
    lineStartSkew: 0,
    lineStart: 10,
    lineEndSkew: 0,
    lineEnd: 16,
    lineWidth: 4,
    lineCap: 'round',
    lineNum: 10,
    direction: true,
}
// 值的限制
const limits = [{
    key: 'lineNum', message: 'lineNum value 4-18', limit: (key: any) => {
        return key >= 4 && key <= 18
    }
}]
interface PatternType {
    nowHeight: number
    turn: number
    // 0:初始化,1:上升,2:下降
    nowSatate: number
}
export default class Gear extends BaseModel<Required<GearOptionsType>> {
    pattern: PatternType
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<GearOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 3.初始化画笔
        this.initPoint()
        this.pattern = { nowHeight: 10, nowSatate: 1, turn: 0 }
        this.run(this.draw)
        // 待优化其他代码
        // this.drawHeart(0, 0, 15)
        // this.ctx.beginPath()
        // this.ctx.fillStyle = 'red'
        // this.ctx.fillRect(0, 0, 5, 5)
        // this.ctx.closePath()
    }
    initPoint(): void {
        let op = this.options
        this.ctx.lineCap = op.lineCap!;
        this.ctx.lineWidth = op.lineWidth!
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = `${op.fontSize!}px ${op.fontFamily!}`;
        this.ctx.save()
        op.delay = 10
    }
    draw() {
        let op = this.options
        this.clearRect()
        this.ctx.save();
        this.ctx.beginPath()
        this.ctx.translate(0, this.pattern.nowHeight)
        this.ctx.rotate(this.pattern.turn / Math.PI * 2)
        this.drawPolygon(0, 0, 10)
        this.ctx.closePath()
        this.ctx.restore();
        // 绘制影子
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.strokeStyle = 'rgb(197 194 194 / 30%)'
        this.ctx.moveTo(-5, 0)
        let h = this.pattern.nowHeight <= 0 ? 0 : this.pattern.nowHeight
        this.ctx.lineTo(h, 0)
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.restore()
        // 清空隐藏部分
        this.clearRect(-40, 0, 80, 40)



        // 流程变化
        this.pattern.turn += 10
        if (this.pattern.nowSatate === 1) this.pattern.nowHeight--
        else if (this.pattern.nowSatate === 2) this.pattern.nowHeight++
        if (this.pattern.nowHeight <= -10 && this.pattern.nowHeight % 8 == 0) {
            op.delay++
        }
        if (this.pattern.nowHeight <= -60) {
            this.pattern.nowSatate = 2
        }
        else if (this.pattern.nowHeight >= 10) {
            this.pattern.nowSatate = 1
            op.delay = 10
        }
    }
    drawRect(x: number, y: number, size: number) {
        this.ctx.save();
        this.ctx.beginPath()
        this.ctx.translate(-size / 2, -size / 2)
        this.ctx.fillRect(x, y, size, size)
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawArc(x: number, y: number, size: number) {
        size = size / 2
        this.ctx.save();
        this.ctx.beginPath()
        this.ctx.arc(x, y, size, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawTriangle(x: number, y: number, size: number) {
        this.ctx.save();
        this.ctx.beginPath()
        this.ctx.translate(-size / 2, -(size / 2 * Math.sqrt(3)) / 2)
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(size / 2, size / 2 * Math.sqrt(3));
        this.ctx.lineTo(x, y);
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
    drawPolygon(x: number, y: number, size: number) {
        this.ctx.save();
        this.ctx.beginPath()
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
    drawHeart(x: number, y: number, size: number) {
        size = size / 2
        this.ctx.save();
        this.ctx.beginPath()
        this.ctx.translate(0, -(size * 2) / 2)
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(size / 2, -size, size * 3, -size / 2, y, size * 2);
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(-size / 2, -size, -size * 3, -size / 2, y, size * 2);
        this.ctx.fill()
        this.ctx.closePath()
        this.ctx.restore()
    }
}