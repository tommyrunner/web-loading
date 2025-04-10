import type { ElementType, LimitType } from '../../type'
import type { RingOptionsType } from '../type'
import BaseModel from './BaseModel'
/**
 * @description 环形模型默认配置选项
 */
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
/**
 * @description 环形模型限制条件
 */
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
/**
 * @description 环形模型类
 * @extends BaseModel<RingOptionsType>
 */
export default class Ring extends BaseModel<RingOptionsType> {
  /** 每次旋转的角度（默认每次旋转10） */
  rotate: number
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<RingOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
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
  /**
   * @description 绘制环形
   */
  draw() {
    this.clearRect()
    this.controller()
    const op = this.options
    this.drawText({ esGap: op.ringNum * (op.radius + op.ringGap / 2) })
  }
  /**
   * @description 控制环形动画
   */
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
  /**
   * @description 绘制单个环形
   * @param {number} r - 半径
   * @param {number} [arcGap=1] - 弧线间隔
   * @param {number} [angle=0] - 角度
   */
  drawRing(r: number, arcGap = 1, angle = 0) {
    // 第一个弧
    this.ctx.beginPath()
    this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle)
    this.ctx.stroke()
    this.ctx.closePath()
    // 第二个弧
    this.ctx.beginPath()
    this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle)
    this.ctx.stroke()
    this.ctx.closePath()
  }
}
