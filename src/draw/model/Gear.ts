import type { ElementStoreType } from '../../types'
import type { GearOptionsType } from '../types.d'
import BaseModel from './BaseModel'
// Default
const defaultOptions: GearOptionsType = {
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
const limits = [
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
    store: ElementStoreType
  ) {
    super(w, h, canvas, options, store)
    // 1.Initialize options (prevent attribute from being empty)
    this.initOptions(defaultOptions, limits)
    // 2.Optimize default values based on height and width
    this.optimization(this.options.textGap + this.options.lineEnd)
    // 3.Initialize brush
    this.initPoint()
    // 4.Start the animation needle and record the status
    this.aps = Array.from({ length: this.options.lineNum }, (_, _index) => _index)
    this.run(this.draw)
  }
  initPoint() {
    const op = this.options
    this.ctx.lineCap = op.lineCap
    this.ctx.lineWidth = op.lineWidth
    this.ctx.save()
  }
  draw() {
    this.clearRect()
    // technological process
    this.controller()
    // Draw gear
    this.drawGear()
    // Draw text
    this.drawText()
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
  drawText() {
    const op = this.options
    this.ctx.save()
    this.ctx.beginPath()
    // Position+text+spacing
    const y = op.lineEnd + op.fontSize + op.textGap
    this.ctx.fillText(op.text, 0, y)
    this.ctx.closePath()
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
