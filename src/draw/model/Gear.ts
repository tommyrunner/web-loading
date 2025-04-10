import type { ElementType, LimitType } from '../../type'
import type { GearOptionsType } from '../type'
import BaseModel from './BaseModel'
/**
 * @description 齿轮模型默认配置选项
 */
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
/**
 * @description 齿轮模型限制条件
 */
const limits: Array<LimitType> = [
  {
    key: 'lineNum',
    message: 'lineNum value 4-18',
    limit: (key: any) => {
      return key >= 4 && key <= 18
    }
  }
]
/**
 * @description 齿轮模型类
 * @extends BaseModel<GearOptionsType>
 */
export default class Gear extends BaseModel<GearOptionsType> {
  aps: Array<number>
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<GearOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<GearOptionsType>,
    element: ElementType
  ) {
    // 1.初始化
    super(w, h, canvas, options, element, modelDefOptions, limits, (model) => {
      // 模型额外初始化回调函数
      const op = model.options
      model.ctx.lineCap = op.lineCap
      model.ctx.lineWidth = op.lineWidth
      model.ctx.save()
    })
    this.optimization(this.options.textGap + this.options.lineEnd)
    // 2.启动动画针并记录状态
    this.aps = Array.from({ length: this.options.lineNum }, (_, _index) => _index)
    this.run(this.draw)
  }

  /**
   * @description 绘制齿轮
   */
  draw() {
    this.clearRect()
    // 控制进程
    this.controller()
    // 绘制齿轮
    this.drawGear()
    // 绘制文本
    const op = this.options
    this.drawText({ esGap: op.lineEnd })
  }
  /**
   * @description 控制齿轮动画
   */
  controller() {
    const op = this.options
    if (op.direction) this.aps = this.aps.map((a) => (a - 1 <= 0 ? this.aps.length - 1 : a - 1))
    else this.aps = this.aps.map((a) => (a + 1 > this.aps.length ? 0 : a + 1))
  }
  /**
   * @description 绘制齿轮元素
   */
  drawGear() {
    const op = this.options
    this.ctx.save()
    // 设置阴影
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
    // 绘制加载齿轮
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
   * @description 优化处理（主要优化默认文本位置）
   * @param {number} textY - 文本Y坐标
   */
  optimization(textY: number) {
    // 如果开启优化（优化字体位置）
    if (this.options.optimization) {
      // 根据宽高调整
      if (textY * 4 > this.h) {
        this.options.lineStart = this.h / 6 - 5
        this.options.lineEnd = this.h / 6
        this.options.textGap = 2
      }
    }
  }
}
