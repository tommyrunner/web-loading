import type { ElementType, LimitType } from '../../type'
import type { BeanOptionsType } from '../type'
import BaseModel from './BaseModel'
/**
 * @description Bean模型默认配置选项
 */
const modelDefOptions: BeanOptionsType = {
  beanSize: 15,
  pointLength: 15
}

/**
 * @description Bean模型限制条件
 */
const limits: Array<LimitType> = [
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
/**
 * @description Bean类型接口
 */
interface BeanType {
  turn: number
  state: number
  nowX: number
  beans: Array<number>
  beanState: number
  beanAnimaIndex: number
}
/**
 * @description Bean模型类
 * @extends BaseModel<BeanOptionsType>
 */
export default class Bean extends BaseModel<BeanOptionsType> {
  bean: BeanType
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<BeanOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<BeanOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, limits)
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
  /**
   * @description 绘制豆形
   */
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
    // 绘制过滤器
    this.drawFilter()
    // 绘制文本
    this.drawText({ esGap: op.beanSize })
    // 控制进程
    this.controller()
  }
  /**
   * @description 控制豆形动画
   */
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
  /**
   * @description 绘制点
   */
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
  /**
   * @description 绘制过滤器
   */
  drawFilter() {
    const op = this.options
    // 眼睛
    this.clearRect(-op.beanSize / 3 + this.bean.nowX, -op.beanSize / 2, op.beanSize / 4)
    // 轨迹
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
