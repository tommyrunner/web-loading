import type { ElementType, LimitType } from '../../type'
import type { GearOptionsType } from '../type'
import BaseModel from './BaseModel'
// Default Options of model
const modelDefOptions: GearOptionsType = {
  lineStart: 10,
  lineEnd: 16,
  lineStartSkew: 0,
  lineEndSkew: 0,
  lineWidth: 4,
  lineCap: 'round',
  lineNum: 10,
  direction: true
}
// Warning value
const limits: Array<LimitType> = [
  {
    key: 'lineNum',
    message: 'lineNum value 4-18',
    limit: (key: any) => {
      return key >= 4 && key <= 18
    }
  }
]
export default class Gear extends BaseModel<GearOptionsType> {
  aps: Array<number>
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<GearOptionsType>,
    element: ElementType
  ) {
    // 1.Initialize
    super(w, h, canvas, options, element, modelDefOptions, limits, (model) => {
      // Model extra initial callback function
      const op = model.options
      model.ctx.lineCap = op.lineCap
      model.ctx.lineWidth = op.lineWidth
      model.ctx.save()
    })
    this.optimization(this.options.textGap + this.options.lineEnd)
    // 2.Start the animation needle and record the status
    this.aps = Array.from({ length: this.options.lineNum }, (_, _index) => _index)
    this.run(this.draw)
  }

  draw() {
    this.clearRect()
    // technological process
    this.controller()
    // Draw gear
    this.drawGear()
    // Draw text
    const op = this.options
    this.drawText({ esGap: op.lineEnd })
  }
  controller() {
    const op = this.options
    if (op.direction) this.aps = this.aps.map((a) => (a - 1 <= 0 ? this.aps.length - 1 : a - 1))
    else this.aps = this.aps.map((a) => (a + 1 > this.aps.length ? 0 : a + 1))
  }
  drawGear() {
    const op = this.options
    this.ctx.save()
    // Set Shadow
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
    // Draw loading gear
    for (let i = 0; i < this.aps.length; i++) {
      this.ctx.beginPath()
      this.ctx.globalAlpha = this.aps[i] / 10
      this.ctx.moveTo(op.lineEndSkew, op.lineStart)
      this.ctx.lineTo(op.lineStartSkew, op.lineEnd)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.rotate((2 * Math.PI) / op.lineNum)
    }
    this.ctx.restore()
  }
  /**
   * Optimize processing (mainly optimize the default text position)
   * @param textY
   */
  optimization(textY: number) {
    // If optimization is turned on (optimize font position)
    if (this.options.optimization) {
      // Adjust according to width and height
      if (textY * 4 > this.h) {
        this.options.lineStart = this.h / 6 - 5
        this.options.lineEnd = this.h / 6
        this.options.textGap = 2
      }
    }
  }
}
