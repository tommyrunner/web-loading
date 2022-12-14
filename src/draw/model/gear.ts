import type { ElementStoreType } from "../../types";
import type { GearOptionsType } from "../types.d";
import BaseModel from "./BaseModel";

export default class Gear extends BaseModel<GearOptionsType> {
    aps: Array<number>
    constructor(w: number, h: number, ctx: CanvasRenderingContext2D, options: GearOptionsType, store: ElementStoreType) {
        super(w, h, ctx, options, store)
        // 初始化options(防止属性为空)
        this.initOptions({
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
            delay: 62
        }, [{
            key: 'lineNum', message: 'lineNum value 4-18', limit: (key) => {
                return key >= 4 && key <= 18
            }
        }])
        // 开始动画针并记录状态
        this.aps = Array.from({ length: this.options.lineNum! }, (o, _index) => _index)
        this.run(this.draw, this.options.delay!)
    }
    draw() {
        let op = this.options
        this.ctx.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
        this.aps = this.aps.map(a => a - 1 <= 0 ? this.aps.length - 1 : a - 1)
        for (let i = 0; i < this.aps.length; i++) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = `rgba(64,158,255,0.${this.aps[i]})`
            this.ctx.moveTo(op.lineEndSkew!, op.lineStart!)
            this.ctx.lineCap = op.lineCap!;
            this.ctx.lineTo(op.lineStartSkew!, op.lineEnd!)
            this.ctx.lineWidth = op.lineWidth!
            this.ctx.stroke()
            this.ctx.rotate(2 * Math.PI / op.lineNum!)
        }
        this.ctx.beginPath()
        this.ctx.font = `${op.fontSize!}px ${op.fontFamily!}`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        // 位置+文字+间隔
        let x = 0, y = op.lineEnd! + op.fontSize! + op.textInterval!
        this.ctx.fillText(op.text!, x, y)
        this.ctx.closePath()
    }
}