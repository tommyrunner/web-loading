import type { ElementType } from '../../type'
import type { CircularOptionsType } from '../type'
import { CIRCULAR_ACTION } from '../../utils'
import BaseModel from './BaseModel'
/**
 * @description Circular模型默认配置选项
 */
const modelDefOptions: CircularOptionsType = {
  arcSize: 8,
  arcGap: 2,
  arcColors: ['#ec7546', '#8364a4', '#ff6c6e', '#5bc6ab'],
  action: CIRCULAR_ACTION.COLLISION
}

/**
 * @description 碰撞类型接口
 */
interface CollisionType {
  key: number
  state: boolean
  y: number
  x: number
}
/**
 * @description 圆形模型类
 * @extends BaseModel<CircularOptionsType>
 */
export default class Circular extends BaseModel<CircularOptionsType> {
  collisionPoint: Array<CollisionType>
  turn: number
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<CircularOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<CircularOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions)
    // 初始化数据
    const op = this.options
    const gap = op.arcSize * 2 + op.arcGap
    this.collisionPoint = [
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
  /**
   * @description 绘制圆形
   */
  draw() {
    this.clearRect()
    this.ctx.save()
    const op = this.options
    // 控制进程
    if (op.action === CIRCULAR_ACTION.COLLISION) this.controller()
    // 旋转
    else if (op.action === CIRCULAR_ACTION.ROTATE) {
      this.ctx.rotate((this.turn * Math.PI) / 180)
      this.turn += 10
    }
    this.drawCircular()
    this.ctx.restore()
    this.drawText({ esGap: op.arcSize * 4 + op.arcGap * 2 })
  }
  /**
   * @description 控制圆形动画
   */
  controller() {
    const op = this.options
    this.collisionPoint.forEach((cp: CollisionType) => {
      let key: 'y' | 'x' = 'y'
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
      const gap = op.arcSize * 2 + op.arcGap
      if (cp[key] === -gap) cp.state = true
      if (cp[key] === gap) cp.state = false
      if (cp.state) cp[key]++
      else cp[key]--
    })
  }
  /**
   * @description 绘制圆形元素
   */
  drawCircular() {
    const op = this.options
    this.collisionPoint.forEach((cp: CollisionType, index: number) => {
      this.ctx.save()
      this.ctx.beginPath()
      if (op.arcColors[index]) {
        const color = op.arcColors[index]
        this.setShadow(color)
        this.ctx.fillStyle = color
      }
      this.ctx.arc(cp.x, cp.y, op.arcSize, 0, Math.PI * 2)
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.restore()
    })
  }
  /**
   * @description 设置阴影
   * @param {string} [color] - 阴影颜色
   */
  setShadow(color?: string) {
    const op = this.options
    color && (this.ctx.shadowColor = color)
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
}
