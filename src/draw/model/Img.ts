import type { ElementStoreType } from "../../types";
import type { ImageOptionsType } from "../types";
import { getDefOptions } from '../../utils'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: Required<ImageOptionsType> = {
    ...getDefOptions(),
    src: '',
    width: 52,
    height: 52,
    turn: false
}
export default class Img extends BaseModel<Required<ImageOptionsType>> {
    img: HTMLImageElement
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<ImageOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, [])
        this.img = new Image();
        this.img.src = this.options.src
        // 4.开始动画针并记录状态
        this.img.onload = () => {
            this.run(this.draw)
        }
    }
    draw() {
        this.clearRect()
        let op = this.options
        if (op.turn) this.ctx.rotate(10 * Math.PI / 180)
        this.ctx.drawImage(this.img, -op.width / 2, -op.height / 2, op.width, op.height)
        this.drawText()

    }
    drawText() {
        let op = this.options
        this.ctx.save()
        this.ctx.beginPath()
        let y = op.fontSize + op.textGap + op.height / 2
        this.ctx.fillText(op.text, 0, y)
        this.ctx.closePath()
        this.ctx.restore()
    }
}