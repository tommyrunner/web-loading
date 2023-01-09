import type { ElementStoreType } from '../../types'
import type { ImageOptionsType } from '../types'
import { getDefOptions } from '../../utils'
import BaseModel from './BaseModel'
// 默认值
const defaultOptions: Required<ImageOptionsType> = {
  ...getDefOptions(),
  src: 'data:image/png;base64,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',
  width: 52,
  height: 52,
  turn: true
}
export default class Img extends BaseModel<Required<ImageOptionsType>> {
  img: HTMLImageElement
  turn: number
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<ImageOptionsType>,
    store: ElementStoreType
  ) {
    super(w, h, canvas, options, store)
    // 1.初始化options(防止属性为空)
    this.initOptions(defaultOptions, [])
    this.img = new Image()
    this.img.src = this.options.src
    this.turn = 10
    // 4.开始动画针并记录状态
    this.img.onload = () => {
      this.run(this.draw)
    }
  }
  draw() {
    this.clearRect()
    this.drawImg()
    this.drawText()
  }
  drawImg() {
    let op = this.options
    this.ctx.save()
    if (op.turn) this.ctx.rotate((this.turn * Math.PI) / 180)
    this.ctx.drawImage(this.img, -op.width / 2, -op.height / 2, op.width, op.height)
    this.ctx.closePath()
    this.ctx.restore()
    this.turn += 10
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
