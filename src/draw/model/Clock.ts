import type { ElementType, LimitType } from '../../type'
import type { ClockOptionsType } from '../type'
import BaseModel from './BaseModel'
/**
 * @description 时钟模型默认配置选项
 */
const modelDefOptions: ClockOptionsType = {
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

/**
 * @description 时钟模型限制条件
 */
const limits: Array<LimitType> = [
  {
    key: 'lineColors',
    message: 'lineColors.length <= 3',
    limit: (key: any) => {
      return key.length <= 3
    }
  }
]
/**
 * @description 时钟模型类
 * @extends BaseModel<ClockOptionsType>
 */
export default class Clock extends BaseModel<ClockOptionsType> {
  nowTime: number
  nowS: number
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<ClockOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<ClockOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, limits, (model) => {
      const op = model.options
      model.ctx.lineCap = op.lineCap
      model.ctx.lineWidth = op.lineWidth
      model.ctx.save()
    })
    this.nowTime = -1
    this.nowS = 0
    this.run(this.draw)
  }
  /**
   * @description 绘制时钟
   */
  draw() {
    this.clearRect()
    // 绘制时钟
    this.drawClock()
  }
  /**
   * @description 绘制时钟元素
   */
  drawClock() {
    const op = this.options
    const s = new Date().getSeconds()
    const m = new Date().getMinutes()
    const h = new Date().getHours()
    // 顶部
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.moveTo(-5, -(op.clockSize + op.clockGap))
    this.ctx.lineTo(5, -(op.clockSize + op.clockGap))
    this.ctx.stroke()
    this.ctx.closePath()
    // 外圆
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
    // 刻度
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
    // 时针
    if (op.hLine) {
      this.ctx.save()
      this.ctx.beginPath()
      this.ctx.lineWidth = op.lineWidth * 1.6
      if (op.lineColors[0]) this.ctx.strokeStyle = op.lineColors[0]
      // 初始化点
      this.ctx.rotate((-90 * Math.PI) / 180)
      this.ctx.rotate((((h * 360) / 60) * Math.PI) / 180)
      this.ctx.moveTo(-1, 0)
      this.ctx.lineTo(op.clockSize / 2, 0)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
    }
    // 分针
    if (op.mLine) {
      this.ctx.save()
      this.ctx.beginPath()
      if (op.lineColors[1]) this.ctx.strokeStyle = op.lineColors[1]
      this.ctx.lineWidth = op.lineWidth * 1.2
      // 初始化点
      this.ctx.rotate((-90 * Math.PI) / 180)
      this.ctx.rotate((((m * 360) / 60) * Math.PI) / 180)
      this.ctx.moveTo(-1, 0)
      this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0)
      this.ctx.stroke()
      this.ctx.closePath()
      this.ctx.restore()
    }
    // 秒针
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
    if (op.textTime === 'time') op.text = `${h} : ${m} : ${s}`
    if (op.textTime === 's') op.text = this.nowTime + 's'
    this.drawText({ esGap: op.clockSize * 2 })
  }
  /**
   * @description 设置阴影
   */
  setShadow() {
    const op = this.options
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
}
