import type { ElementStoreType } from '../../types'
import type { BeanOptionsType } from '../types.d'
import BaseModel from './BaseModel'
// 默认值
const defaultOptions: BeanOptionsType = {
  beanSize: 15,
  pointLength: 15
}

const limits = [
  {
    key: 'pointLength',
    message: 'pointLength value >= 5',
    limit: (key: any) => {
      return key >= 5
    }
  },
  {
    key: 'beanSize',
    message: 'beanSize value >= 5',
    limit: (key: any) => {
      return key >= 5
    }
  }
]
interface BeanType {
  turn: number
  state: number
  nowX: number
  beans: Array<number>
  beanState: number
  beanAnimaIndex: number
}
export default class Bean extends BaseModel<BeanOptionsType> {
  bean: BeanType
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<BeanOptionsType>,
    store: ElementStoreType
  ) {
    super(w, h, canvas, options, store)
    // 1.初始化options(防止属性为空)
    this.initOptions(defaultOptions, limits)
    this.bean = {
      turn: 30,
      state: 1,
      beanState: 1,
      nowX: -(this.options.pointLength * this.options.beanSize) / 2 - this.options.beanSize * 3,
      beans: Array.from({ length: this.options.pointLength }, () => 1),
      beanAnimaIndex: 0
    }
    this.options.delay = 10
    this.run(this.draw)
  }
  draw() {
    const op = this.options
    this.clearRect()
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(this.bean.nowX, 0)
    this.ctx.arc(0, 0, op.beanSize, ((360 - this.bean.turn) * Math.PI) / 180, (this.bean.turn * Math.PI) / 180, true)
    this.ctx.lineTo(0, 0)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
    // 绘制点
    this.drawPoint()
    // 过滤画布
    this.drawFillter()
    // 绘制文字
    this.drawText()
    // 流程
    this.controller()
  }
  controller() {
    const op = this.options
    if (this.bean.nowX >= (op.pointLength * op.beanSize) / 2 + op.beanSize * 2) {
      this.bean.nowX = -(op.pointLength * op.beanSize) / 2 - op.beanSize * 3
      this.bean.beanAnimaIndex = 0
    }
    if (this.bean.nowX <= -(op.pointLength * op.beanSize) / 2) {
      this.bean.beanState = 2
    }
    if (this.bean.turn <= 0) this.bean.state = 2
    if (this.bean.turn >= 30) this.bean.state = 1
    if (this.bean.state === 1) this.bean.turn -= 1
    if (this.bean.state === 2) this.bean.turn += 1
    if (this.bean.beanState === 1) this.bean.nowX -= 1
    if (this.bean.beanState === 2) this.bean.nowX += 1
  }
  drawPoint() {
    const op = this.options
    this.ctx.save()
    this.setShadow()
    this.ctx.translate(-(op.pointLength * op.beanSize) / 2, 0)
    for (let i = 0; i < op.pointLength && i < this.bean.beanAnimaIndex; i++) {
      this.ctx.beginPath()
      if (i < this.bean.beanAnimaIndex) this.ctx.arc(op.beanSize * i, 0, op.beanSize / 4, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.closePath()
    }
    this.bean.beanAnimaIndex += 0.2
    this.ctx.restore()
  }
  // 滤布
  drawFillter() {
    const op = this.options
    // 眼睛
    this.clearRect(-op.beanSize / 3 + this.bean.nowX, -op.beanSize / 2, op.beanSize / 4)
    // 跟随
    this.clearRect(
      -(op.pointLength * op.beanSize) / 2 - op.beanSize / 2 + 0.2,
      -this.h,
      this.bean.nowX + (op.pointLength * op.beanSize) / 2 - op.beanSize / 2,
      this.h * 2
    )
    // 进入
    this.clearRect(-(op.pointLength * op.beanSize) / 2, -this.h, -180, this.h * 2)
    // 离开
    this.clearRect((op.pointLength * op.beanSize) / 2, -this.h, 180, this.h * 2)
  }
  setShadow() {
    const op = this.options
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
  drawText() {
    const op = this.options
    this.ctx.save()
    this.ctx.beginPath()
    const y = op.fontSize + op.textGap + op.beanSize
    this.ctx.fillText(op.text, 0, y)
    this.ctx.closePath()
    this.ctx.restore()
  }
}
