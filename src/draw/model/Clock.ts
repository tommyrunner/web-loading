import type { ElementStoreType } from '../../types'
import type { ClockOptionsType } from '../types.d'
import BaseModel from './BaseModel'
const defaultOptions: ClockOptionsType = {
  lineCap: 'round',
  lineWidth: 2,
  lineColors: ['#d4d4d4', '#06ab2d', '#8a0303'],
  clockSize: 15,
  clockGap: 4,
  hLine: true,
  mLine: false,
  sLine: true,
  textTime: ''
}

const limits = [
  {
    key: 'lineColors',
    message: 'lineColors.length <= 3',
    limit: (key: any) => {
      return key.length <= 3
    }
  }
]
export default class Clock extends BaseModel<ClockOptionsType> {
  nowTime: number
  nowS: number
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<ClockOptionsType>,
    store: ElementStoreType
  ) {
    super(w, h, canvas, options, store)
    this.initOptions(defaultOptions, limits)
    this.initPoint()
    this.nowTime = -1
    this.nowS = 0
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
    // Draw clock
    this.drawClock()
  }
  drawText(h: number, m: number, s: number) {
    const op = this.options
    this.ctx.save()
    this.ctx.beginPath()
    const y = op.clockSize * 2 + op.textGap
    if (op.textTime === 'time') op.text = `${h} : ${m} : ${s}`
    if (op.textTime === 's') op.text = this.nowTime + 's'
    this.ctx.fillText(op.text, 0, y)
    this.ctx.closePath()
    this.ctx.restore()
  }
  drawClock() {
    const op = this.options
    const s = new Date().getSeconds()
    const m = new Date().getMinutes()
    const h = new Date().getHours()
    // top
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.moveTo(-5, -(op.clockSize + op.clockGap))
    this.ctx.lineTo(5, -(op.clockSize + op.clockGap))
    this.ctx.stroke()
    this.ctx.closePath()
    // Outer circle
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
    // scale
    this.ctx.save()
    for (let i = 0; i < 12; i++) {
      this.ctx.beginPath()
      this.ctx.rotate(((360 / 12) * Math.PI) / 180)
      this.ctx.moveTo(op.clockSize - op.clockGap, 0)
      this.ctx.lineTo(op.clockSize - op.clockGap, 0)
      this.ctx.stroke()
      this.ctx.closePath()
    }
    this.ctx.restore()
    // Clockwise
    if (op.hLine) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.lineWidth = op.lineWidth * 1.6
      if (op.lineColors[0]) this.ctx.strokeStyle = op.lineColors[0]
      // Initialization point
      this.ctx.rotate((-90 * Math.PI) / 180)
      this.ctx.rotate((((h * 360) / 60) * Math.PI) / 180)
      this.ctx.moveTo(-1, 0)
      this.ctx.lineTo(op.clockSize / 2, 0)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
    }
    // minute hand
    if (op.mLine) {
      this.ctx.save()
      this.ctx.beginPath()
      if (op.lineColors[1]) this.ctx.strokeStyle = op.lineColors[1]
      this.ctx.lineWidth = op.lineWidth * 1.2
      // Initialization point
      this.ctx.rotate((-90 * Math.PI) / 180)
      this.ctx.rotate((((m * 360) / 60) * Math.PI) / 180)
      this.ctx.moveTo(-1, 0)
      this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
    }
    // second hand
    if (op.sLine) {
      this.ctx.save()
      this.ctx.beginPath()
      if (op.lineColors[2]) this.ctx.strokeStyle = op.lineColors[2]
      this.ctx.rotate((-90 * Math.PI) / 180)
      this.ctx.rotate((((s * 360) / 60) * Math.PI) / 180)
      this.ctx.moveTo(-1, 0)
      this.ctx.lineTo(op.clockSize - op.clockGap, 0)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
      if (this.nowS !== s) this.nowTime++
      this.nowS = s
    }
    this.drawText(h, m, s)
  }
  setShadow() {
    const op = this.options
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
}
