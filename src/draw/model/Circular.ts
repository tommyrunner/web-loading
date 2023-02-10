import type { ElementStoreType } from '../../types'
import type { CircularOptionsType } from '../types'
import { CIRCULAR_ACTION } from '../utils'
import BaseModel from './BaseModel'
// 默认值
const defaultOptions: CircularOptionsType = {
  arcSize: 8,
  arcGap: 2,
  action: CIRCULAR_ACTION.COLLISION
}

interface CollsionType {
  key: number
  state: boolean
  y: number
  x: number
  color: string
  delay: number
}
export default class Bean extends BaseModel<CircularOptionsType> {
  collsionPoint: Array<CollsionType>
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<CircularOptionsType>,
    store: ElementStoreType
  ) {
    super(w, h, canvas, options, store)
    // 1.初始化options(防止属性为空)
    this.initOptions(defaultOptions)
    // 初始化数据
    let op = this.options
    let gap = op.arcSize * 2 + op.arcGap
    this.collsionPoint = [
      {
        key: 0,
        state: false,
        y: -gap,
        x: 0,
        color: '#ec7546',
        delay: 1
      },
      {
        key: 1,
        state: false,
        y: gap,
        x: 0,
        color: '#8364a4',
        delay: 1
      },
      {
        key: 2,
        state: false,
        y: 0,
        x: gap,
        color: '#ff6c6e',
        delay: 1
      },
      {
        key: 3,
        state: false,
        y: 0,
        x: -gap,
        color: '#5bc6ab',
        delay: 1
      }
    ]
    this.run(this.draw)
  }
  draw() {
    this.clearRect()
    let op = this.options
    this.collsionPoint.forEach((cp) => {
      this.ctx.save()
      this.ctx.beginPath()
      this.setShadow(cp.color)
      this.ctx.fillStyle = cp.color
      this.ctx.arc(cp.x, cp.y, op.arcSize, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.restore()
    })
    // 流程
    if (op.action === CIRCULAR_ACTION.COLLISION) this.controller()
    // 旋转
    else if (op.action === CIRCULAR_ACTION.ROTATE) {
      this.ctx.rotate((10 / Math.PI) * 2)
    }
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

  setShadow(color?: string) {
    const op = this.options
    color && (this.ctx.shadowColor = color)
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
  drawText() {
    const op = this.options
    this.ctx.save()
    this.ctx.beginPath()
    const y = op.fontSize + op.textGap
    this.ctx.fillText(op.text, 0, y)
    this.ctx.closePath()
    this.ctx.restore()
  }
}
