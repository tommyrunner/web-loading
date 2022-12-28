import type { ElementStoreType } from "../../types";
import type { GearOptionsType } from "../types.d";
import { getDefOptions } from '../../utils'
import BaseModel from "./BaseModel";
import html2canvas from 'html2canvas'
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
    overall: HTMLImageElement
    imgData: ImageData | null
    stateData: number
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<GearOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 4.开始动画针并记录状态
        this.run(this.draw)
        this.ctx.translate(-this.w / 2, -this.h / 2)
        this.store.element.style.boxSizing = 'border-box'
        this.imgData = null
        this.overall = new Image()
        this.stateData = 0
        html2canvas(this.store.element, {
            useCORS: true,

        })
            .then((ctx: HTMLCanvasElement) => {
                this.overall.src = ctx.toDataURL();
                this.overall.onload = () => {
                    this.ctx.drawImage(this.overall, 0, 0)
                    this.imgData = this.ctx.getImageData(0, 0, this.w, this.h)
                }
            })
    }

    draw() {
        // this.clearRect()
        if (this.imgData) {
            for (let i = 0; i < this.imgData.data.length; i += 4) {
                let item = this.imgData.data;
                // item[i] = 0; // r
                // item[i + 1] = 0; // g
                // item[i + 2] = 0; // b
                if (i > this.stateData && i <= this.stateData + 50000) {
                    if (item[i + 3] === 0)
                        this.stateData += 50000
                    else item[i + 3] -= 100;
                }
                if (this.stateData + 50000 > this.imgData.data.length) {
                    item[i + 3] -= 100;
                    break
                }
            }
            this.ctx.putImageData(this.imgData, 0, 0)
        }

    }
    controller() {

    }
}