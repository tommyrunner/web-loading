import type { ElementStoreType } from "../../types";
import type { ZoomOptionsType } from '../types'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: ZoomOptionsType = {
    fontSize: 12,
    textGap: 4,
    fontFamily: 'Microsoft YaHei',
    text: '加载中...',
    arcGap: Math.PI / 4,
    ringGap: 10,
    lineWidth: 6,
    zoomNum: 5,
    radius: 6,
    lineCap: 'round',
    turn: 10,
    ringsTurn: [Math.PI, Math.PI / 4],
    direction: true
}
interface ListType {
    value: number,
    state: boolean
}
export default class Zoom extends BaseModel<ZoomOptionsType> {
    list: Array<number> // 每次旋转角度(默认每次旋转10)
    zoomIndex: number
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: ZoomOptionsType, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        this.zoomIndex = 0
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, [])
        // 2.初始化画笔
        this.initPoint()
        // 3.开始动画针并记录状态
        this.list = Array.from({ length: this.options.zoomNum! }, (_, _index) => 10)
        this.run(this.draw)
    }
    initPoint(): void {
        let op = this.options
        this.ctx.lineCap = op.lineCap!;
        this.ctx.lineWidth = op.lineWidth!
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = `${op.fontSize!}px ${op.fontFamily!}`;
        // 居中
        this.ctx.translate(-(16 * op.zoomNum!) / 2, 0)
        this.ctx.save()

    }
    draw() {
        let op = this.options
        this.clearRect()
        for (let i = 1; i <= op.zoomNum!; i++) {
            if ((i - 1) === this.zoomIndex) {
                this.ctx.lineWidth = this.list[i]
                this.list[i]++
                if (this.list[i] > 16) {
                    this.zoomIndex++
                    this.list[i] = 10
                }
            }
            else this.ctx.lineWidth = op.lineWidth!
            this.ctx.beginPath()
            this.ctx.moveTo(i * 16, 0)
            this.ctx.lineTo(i * 16, 4)
            this.ctx.stroke()
            this.ctx.closePath()
        }
        if (this.zoomIndex + 1 >= op.zoomNum!) this.zoomIndex = 0
    }
}