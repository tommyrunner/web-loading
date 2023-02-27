import type { ElementType } from '../../types'
import type { CircularOptionsType } from '../types'
import { CIRCULAR_ACTION } from '../utils'
import BaseModel from './BaseModel'
const modelDefOptions: CircularOptionsType = {
  arcSize: 8,
  arcGap: 2,
  arcColors: ['#ec7546', '#8364a4', '#ff6c6e', '#5bc6ab'],
  action: CIRCULAR_ACTION.COLLISION
}

interface CollsionType {
  key: number
  state: boolean
  y: number
  x: number
}
export default class Bean extends BaseModel<CircularOptionsType> {
  collsionPoint: Array<CollsionType>
  turn: number
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<CircularOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions)
    // Initialize data
    let op = this.options
    let gap = op.arcSize * 2 + op.arcGap
    this.collsionPoint = [
      {
        key: 0,
        state: false,
        y: -gap,
        x: 0
      },
      {
        key: 1,
        state: false,
        y: gap,
        x: 0
      },
      {
        key: 2,
        state: false,
        y: 0,
        x: gap
      },
      {
        key: 3,
        state: false,
        y: 0,
        x: -gap
      }
    ]
    this.turn = 0
    this.run(this.draw)
  }
  draw() {
    this.clearRect()
    this.ctx.save()
    let op = this.options
    // technological process
    if (op.action === CIRCULAR_ACTION.COLLISION) this.controller()
    // rotate
    else if (op.action === CIRCULAR_ACTION.ROTATE) {
      this.ctx.rotate((this.turn * Math.PI) / 180)
      this.turn += 10
    }
    this.drawCircular()
    this.ctx.restore()
    this.drawText({ esGap: op.arcSize * 4 + op.arcGap * 2 })
  }
  controller() {
    let op = this.options
    this.collsionPoint.forEach((cp: any) => {
      let key = 'y'
      switch (cp.key) {
        case 0:
          key = 'y'
          break
        case 1:
          key = 'y'
          break
        case 2:
          key = 'x'
          break
        case 3:
          key = 'x'
          break
      }
      let gap = op.arcSize * 2 + op.arcGap
      if (cp[key] === -gap) cp.state = true
      if (cp[key] === gap) cp.state = false
      if (cp.state) cp[key]++
      else cp[key]--
    })
  }
  drawCircular() {
    let op = this.options
    this.collsionPoint.forEach((cp, index) => {
      this.ctx.save()
      this.ctx.beginPath()
      if (op.arcColors[index]) {
        let color = op.arcColors[index]
        this.setShadow(color)
        this.ctx.fillStyle = color
      }
      this.ctx.arc(cp.x, cp.y, op.arcSize, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.restore()
    })
  }
  setShadow(color?: string) {
    const op = this.options
    color && (this.ctx.shadowColor = color)
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
}
