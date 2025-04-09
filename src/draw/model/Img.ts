import type { ElementType } from '../../type'
import type { ImageOptionsType } from '../type'
import BaseModel from './BaseModel'
const modelDefOptions: ImageOptionsType = {
  src: 'https://tommyrunner.github.io/web-loading/images/logo.png',
  width: 52,
  height: 52,
  turn: true
}
export default class Img extends BaseModel<ImageOptionsType> {
  img: HTMLImageElement
  turn: number
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<ImageOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions)
    this.img = new Image()
    this.img.src = this.options.src
    this.turn = 10
    this.img.onload = () => {
      this.run(this.draw)
    }
  }
  draw() {
    this.clearRect()
    this.drawImg()
    const op = this.options
    this.drawText({ esGap: op.height / 2 })
  }
  drawImg() {
    const op = this.options
    this.ctx.save()
    if (op.turn) this.ctx.rotate((this.turn * Math.PI) / 180)
    this.ctx.drawImage(this.img, -op.width / 2, -op.height / 2, op.width, op.height)
    this.ctx.closePath()
    this.ctx.restore()
    this.turn += 10
  }
}
