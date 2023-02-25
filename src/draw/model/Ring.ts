import type { ElementType, LimitType } from '../../types'
import type { RingOptionsType } from '../types'
import BaseModel from './BaseModel'
const modelDefOptions: RingOptionsType = {
  arcGap: Math.PI / 4,
  ringGap: 10,
  lineWidth: 2,
  ringNum: 2,
  radius: 6,
  lineCap: 'round',
  turn: 10,
  ringsTurn: [Math.PI, Math.PI / 4],
  direction: true
}
const limits: Array<LimitType> = [
  {
    key: 'ringNum',
    message: 'ringNum value 1-10',
    limit: (key: any) => {
      return key >= 1 && key <= 10
    }
  },
  {
    key: 'ringsTurn',
    message: `ringsTurn size ${modelDefOptions.ringNum}`,
    limit: (key: any) => {
      return key.length <= modelDefOptions.ringNum!
    }
  }
]
export default class Ring extends BaseModel<RingOptionsType> {
  rotate: number // Angle per rotation (default 10 per rotation)
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<RingOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, limits, (model) => {
      const op = model.options
      model.ctx.lineCap = op.lineCap
      model.ctx.lineWidth = op.lineWidth
      model.ctx.save()
    })
    this.rotate = 10
    this.run(this.draw)
  }
  draw() {
    this.clearRect()
    this.controller()
    this.drawText()
  }
  controller() {
    this.ctx.save()
    const op = this.options
    const rotate = ((this.rotate * Math.PI) / 180) * (op.direction ? 1 : -1)
    this.ctx.rotate(rotate)
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
    for (let i = 1; i <= op.ringNum; i++) {
      this.drawRing(
        op.radius + (i - 1) * op.ringGap,
        op.arcGap,
        op.ringsTurn && op.ringsTurn.length > 0 ? op.ringsTurn[i - 1] : Math.PI / i
      )
    }
    this.rotate += op.turn
    this.ctx.restore()
  }
  drawText() {
    const op = this.options
    this.ctx.save()
    this.ctx.beginPath()
    const y = op.ringNum * (op.radius + op.ringGap) + op.textGap
    this.ctx.fillText(op.text, 0, y)
    this.ctx.closePath()
    this.ctx.restore()
  }
  drawRing(r: number, arcGap = 1, angle = 0) {
    // First arc
    this.ctx.beginPath()
    this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle)
    this.ctx.stroke()
    this.ctx.closePath()
    // Second arc
    this.ctx.beginPath()
    this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle)
    this.ctx.stroke()
    this.ctx.closePath()
  }
}
