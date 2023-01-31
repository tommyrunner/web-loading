import type { ElementStoreType } from '../../types'
import type { RingOptionsType } from '../types'
import BaseModel from './BaseModel'
// 默认值
const defaultOptions: RingOptionsType = {
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

const limits = [
  {
    key: 'ringNum',
    message: 'ringNum value 1-10',
    limit: (key: any) => {
      return key >= 1 && key <= 10
    }
  },
  {
    key: 'ringsTurn',
    message: `ringsTurn size ${defaultOptions.ringNum}`,
    limit: (key: any) => {
      return key.length <= defaultOptions.ringNum!
    }
  }
]
export default class Ring extends BaseModel<RingOptionsType> {
  rotate: number // 每次旋转角度(默认每次旋转10)
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<RingOptionsType>,
    store: ElementStoreType
  ) {
    super(w, h, canvas, options, store)
    this.rotate = 10
    // 1.初始化options(防止属性为空)
    this.initOptions(defaultOptions, limits)
    // 2.初始化画笔
    this.initPoint()
    // 3.开始动画针并记录状态
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
    // 流程
    this.controller()
    // 绘制文字
    this.drawText()
  }
  controller() {
    this.ctx.save()
    const op = this.options
    const rotate = ((this.rotate * Math.PI) / 180) * (op.direction ? 1 : -1)
    this.ctx.rotate(rotate)
    // 画环
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
    // 数量*(半径+环空隙)+文字空隙
    const y = op.ringNum * (op.radius + op.ringGap) + op.textGap
    this.ctx.fillText(op.text, 0, y)
    this.ctx.closePath()
    this.ctx.restore()
  }
  drawRing(r: number, arcGap = 1, angle = 0) {
    // 第一个弧形
    this.ctx.beginPath()
    this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle)
    this.ctx.stroke()
    this.ctx.closePath()
    // 第二个弧形
    this.ctx.beginPath()
    this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle)
    this.ctx.stroke()
    this.ctx.closePath()
  }
}
