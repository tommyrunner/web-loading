import type { ElementStoreType, OptionsType } from "../../types";
import BaseModel from "./BaseModel";

export default class Gear extends BaseModel {
    aps: Array<number>
    constructor(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType, store: ElementStoreType) {
        super(w, h, ctx, options, store)
        // 开始动画针并记录状态
        this.aps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        this.store.animationId = this.animationFrame(this.run, 80)
    }
    run() {
        this.ctx.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
        this.aps = this.aps.map(a => a - 1 <= 0 ? this.aps.length - 1 : a - 1)
        for (let i = 0; i < this.aps.length; i++) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = `rgba(64,158,255,0.${this.aps[i]})`
            this.ctx.moveTo(0, 10)
            this.ctx.lineCap = "round";
            this.ctx.lineTo(0, 16)
            this.ctx.lineWidth = 3
            this.ctx.stroke()
            this.ctx.rotate(2 * Math.PI / 10)
        }
        this.ctx.beginPath()
        this.ctx.font = "14px Microsoft YaHei";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText('加载中...', 0, 16 + 14 + 6)// 20位置+14文字+6间隔
        this.ctx.closePath()
    }
}