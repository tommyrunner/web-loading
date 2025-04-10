import type { ElementType, LimitType } from '../../type'
import type { RollOptionsType } from '../type'
import { getDefOptions, ROLL_CHART } from '../../utils'
import BaseModel from './BaseModel'
/**
 * @description 滚动模型默认配置选项
 */
const modelDefOptions: RollOptionsType = {
  rollGap: 12,
  childNum: 4,
  rollSize: 16,
  showChild: true,
  chart: ROLL_CHART.WHEEL,
  windmills: ['#1ab3ea', '#de6834', '#30925d', '#f48ea5'],
  windmillPointColor: '#f2c31f',
  fixed: false
}

/**
 * @description 滚动模型限制条件
 */
const limits: Array<LimitType> = [
  {
    key: 'childNum',
    message: 'chartSize value 4-10',
    limit: (key: any) => {
      return key >= 4 && key <= 10
    }
  },
  {
    key: 'delay',
    message: 'Roll.delay not allowed update',
    limit: (key: any) => {
      return key === getDefOptions().delay
    }
  }
]
/**
 * @description 子元素类型接口
 */
interface childType {
  turn: number
  x: number
}
/**
 * @description 滚动类型接口
 */
interface RollType {
  turn: number
  nowX: number
  state: number
  child: Array<childType>
}
/**
 * @description 滚动模型类
 * @extends BaseModel<RollOptionsType>
 */
export default class Roll extends BaseModel<RollOptionsType> {
  Roll: RollType
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<RollOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<RollOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, limits)
    this.Roll = {
      turn: 1,
      nowX: this.options.fixed
        ? 0
        : (this.options.childNum / 2) * (this.options.rollSize + this.options.rollGap) + this.options.rollGap / 2,
      state: 2,
      child: []
    }
    this.run(this.draw)
  }
  /**
   * @description 绘制滚动模型
   */
  draw() {
    this.clearRect()
    // 地面
    this.drawGround()
    // 绘制子元素
    this.drawChild()
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(-this.Roll.nowX, 0)
    this.ctx.rotate((this.Roll.turn * Math.PI) / 180)
    // 绘制图形
    this.selectChart()
    // 控制进程
    this.controller()
    this.ctx.restore()
    // 绘制文本
    const op = this.options
    this.drawText({ esGap: op.rollSize })
  }
  /**
   * @description 选择图形类型
   */
  selectChart() {
    const op = this.options
    switch (op.chart) {
      case ROLL_CHART.RECT:
        this.drawRect()
        break
      case ROLL_CHART.WHEEL:
        this.drawWheel()
        break
      case ROLL_CHART.WINDMILL:
        this.drawWindmill()
        break
    }
  }
  /**
   * @description 控制滚动动画
   */
  controller() {
    const op = this.options
    if (this.Roll.state === 1) {
      this.Roll.turn -= 10
      if (op.delay < 20 && !op.fixed) op.delay += 2
    }
    if (this.Roll.state === 2) {
      this.Roll.turn += 10
      if (op.delay > 10 && !op.fixed) op.delay -= 5
    }
    if (op.fixed) return
    if (this.Roll.nowX <= -(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6)) this.Roll.state = 1
    if (this.Roll.nowX >= (op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2) this.Roll.state = 2
    if (this.Roll.state === 1) this.Roll.nowX++
    if (this.Roll.state === 2) this.Roll.nowX--

    const child = this.Roll.child
    if (this.Roll.nowX % (op.rollSize + op.rollGap) == 0 && this.Roll.state === 2) {
      child.push({ turn: this.Roll.turn, x: this.Roll.nowX })
    }
    if (this.Roll.state === 1 && child[child.length - 1] && child[child.length - 1].x === this.Roll.nowX) {
      this.Roll.child.pop()
    }
  }
  /**
   * @description 绘制矩形
   */
  drawRect() {
    const op = this.options
    this.ctx.save()
    this.setShadow()
    this.ctx.translate(-op.rollSize / 2, -op.rollSize / 2)
    this.ctx.fillRect(0, 0, op.rollSize, op.rollSize)
    this.ctx.restore()
  }
  /**
   * @description 绘制轮子
   */
  drawWheel() {
    const op = this.options
    this.ctx.save()
    this.ctx.lineWidth = 4
    // 内圆1
    this.ctx.beginPath()
    this.ctx.arc(0, 0, op.rollSize / 6, 0, Math.PI * 2)
    this.ctx.stroke()
    this.ctx.closePath()
    // 内圆2
    this.ctx.beginPath()
    this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2)
    this.ctx.stroke()
    this.ctx.closePath()
    // 外圆
    this.ctx.beginPath()
    this.ctx.arc(0, 0, op.rollSize, 0, Math.PI * 2)
    this.ctx.stroke()
    this.ctx.closePath()
    // 轮辐
    for (let i = 0; i < 6; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, op.rollSize / 2)
      this.ctx.lineTo(0, op.rollSize)
      this.ctx.stroke()
      this.ctx.rotate(((360 / 6) * Math.PI) / 180)
      this.ctx.closePath()
    }
    this.ctx.restore()
  }
  /**
   * @description 绘制风车
   */
  drawWindmill() {
    const op = this.options
    this.ctx.save()
    for (let i = 0; i < op.windmills.length; i++) {
      this.ctx.beginPath()
      this.ctx.fillStyle = op.windmills[i]
      this.ctx.arc(-op.rollSize / 2, 0, op.rollSize, 0, Math.PI)
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.rotate(((360 / 4) * Math.PI) / 180)
    }
    // 上层固定点
    this.ctx.beginPath()
    this.ctx.fillStyle = op.windmillPointColor
    this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.restore()
  }
  /**
   * @description 绘制子元素
   */
  drawChild() {
    const op = this.options
    if (!op.showChild) return
    this.Roll.child.forEach((c, index) => {
      this.ctx.save()
      this.ctx.translate(-c.x, 0)
      this.ctx.globalAlpha = (index + 1) / 10
      this.ctx.rotate((c.turn * Math.PI) / 180)
      this.selectChart()
      this.ctx.restore()
    })
  }
  /**
   * @description 绘制地面
   */
  drawGround() {
    const op = this.options
    if (op.chart !== ROLL_CHART.WHEEL) return
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.lineWidth = 3
    this.ctx.globalAlpha = 0.03
    this.ctx.moveTo(-(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6), op.rollSize + 3)
    this.ctx.lineTo((op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2, op.rollSize + 3)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.restore()
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
