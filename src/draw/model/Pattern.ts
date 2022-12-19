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
    // 0:初始化,1:上升,2:下降
    nowSatate: number
}
export default class Gear extends BaseModel<GearOptionsType> {
    pattern: PatternType
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<GearOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 3.初始化画笔
        this.initPoint()
        this.pattern = { nowHeight: 10, nowSatate: 0 }
        this.run(this.draw)
    }
    initPoint(): void {
        let op = this.options
        this.ctx.lineCap = op.lineCap!;
        this.ctx.lineWidth = op.lineWidth!
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = `${op.fontSize!}px ${op.fontFamily!}`;
        this.ctx.translate(-15, -15)
        this.ctx.save()

    }
    draw() {
        let op = this.options
        this.clearRect()
        this.ctx.rotate(180 / Math.PI)
        this.ctx.fillRect(0, 0, 30, 30)
        if (this.pattern.nowSatate === 1) this.pattern.nowHeight--
        else if (this.pattern.nowSatate === 2) this.pattern.nowHeight++
        if (this.pattern.nowHeight <= -100) {
            // op.delay = 10
            // this.pattern.nowSatate = 2
        }
        else if (this.pattern.nowHeight >= 10) {
            // op.delay = 30
            // this.pattern.nowSatate = 1
        }

    }
}