import type { ElementStoreType } from "../../types";
import type { ZoomOptionsType } from '../types'
import { getDefOptions } from '../../utils'
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
    direction: true
}
interface ListType {
    value: number,
    state: number
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
export default class Zoom extends BaseModel<Required<ZoomOptionsType>> {
    list: Array<ListType> // 每次旋转角度(默认每次旋转10)
    zoomIndex: number
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<ZoomOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        this.zoomIndex = defaultOptions.direction ? 0 : defaultOptions.zoomNum - 1
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, limits)
        // 2.初始化画笔
        this.initPoint()
        // 3.开始动画针并记录状态
        this.list = Array.from({ length: this.options.zoomNum }, (_, _index) => Object.assign({
            value: defaultOptions.lineWidth,
            // 0:初始,1:变大,2:变小
            state: 0
        }))
        this.run(this.draw)
    }
    initPoint(): void {
        let op = this.options
        this.ctx.lineCap = op.lineCap;
        this.ctx.lineWidth = op.lineWidth
        // 居中((zoom宽度*个数+1)+(zoom空隙*个数+1))/2,因第一个zoom就移位了所需要个数+1,高度/2
        this.ctx.translate(-(((op.lineWidth) * (op.zoomNum + 1)) + (op.zoomGap * (op.zoomNum + 1))) / 2,
            -(op.zoomHeight) / 2)
        this.ctx.save()

    }
    draw() {
        let op = this.options
        this.clearRect()
        for (let i = 0; i < op.zoomNum; i++) {
            // 流程变化
            if (this.list[i].state === 1) this.list[i].value += 2
            else if (this.list[i].state === 2 && this.list[i].value >= op.lineWidth) this.list[i].value--
            this.ctx.lineWidth = this.list[i].value
            // 状态变化
            if (i === this.zoomIndex) {
                if (this.list[i].value > op.maxSize) {
                    this.list[i].state = 2
                    op.direction ? this.zoomIndex++ : this.zoomIndex--
                }
                if (this.list[i].value <= op.lineWidth) this.list[i].state = 1
            }
            // 根据num绘制
            this.ctx.beginPath()
            this.ctx.moveTo((i + 1) * (op.lineWidth + op.zoomGap), 0)
            this.ctx.lineTo((i + 1) * (op.lineWidth + op.zoomGap), op.zoomHeight)
            this.ctx.stroke()
            this.ctx.closePath()
        }
        if (op.direction && this.zoomIndex >= op.zoomNum) this.zoomIndex = 0
        else if (op.direction && this.zoomIndex < 0) this.zoomIndex = op.zoomNum - 1
    }
}