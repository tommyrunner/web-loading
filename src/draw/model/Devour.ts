import type { ElementStoreType } from "../../types";
import type { ZoomOptionsType } from '../types'
import { getDefOptions } from '../../utils'
import { ZOOM_ACTION } from '../utils'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: Required<ZoomOptionsType> = {
    ...getDefOptions(),
    zoomGap: 10,
    maxSize: 16,
    zoomNum: 5,
    lineWidth: 10,
    zoomHeight: 2,
    lineCap: 'round',
    action: ZOOM_ACTION.SCALE,
    direction: true,
    zoomColors: []
}
// 值的限制
const limits = [{
    key: 'lineWidth', message: 'lineWidth(default:10) <=  maxSize(default:16)', limit: (key: any) => {
        return defaultOptions.lineWidth <= defaultOptions.maxSize
    },
}, {
    key: 'maxSize', message: 'lineWidth(default:10) <=  maxSize(default:16)', limit: (key: any) => {
        return defaultOptions.lineWidth <= defaultOptions.maxSize
    },
}]
export default class Devour extends BaseModel<Required<ZoomOptionsType>> {
    turn: number
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<ZoomOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 2.初始化画笔
        this.turn = 10
        this.initPoint()
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
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.rotate(this.turn * Math.PI / 180)
        this.ctx.translate(-10, -10)
        this.ctx.fillRect(0, 0, 20, 20)
        this.ctx.closePath()
        this.ctx.restore()
        this.turn += 10

    }
    controller() {

    }

}