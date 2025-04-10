import type { ElementType, LimitType } from '../../type'
import type { PatternOptionsType } from '../type'
import { getDefOptions, PATTERN_CHART } from '../../utils'
import BaseModel from './BaseModel'
/**
 * @description 图案模型默认配置选项
 */
const modelDefOptions: PatternOptionsType = {
  charts: [PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON],
  chartColors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd'],
  maxHeight: 60,
  chartSize: 12
}
/**
 * @description 图案模型限制条件
 */
const limits: Array<LimitType> = [
  {
    key: 'chartSize',
    message: 'chartSize value 5-24',
    limit: (key: any) => {
      return key >= 5 && key <= 24
    }
  },
  {
    key: 'delay',
    message: 'Pattern.delay not allowed update',
    limit: (key: any) => {
      return key === getDefOptions().delay
    }
  }
]
/**
 * @description 图案类型接口
 */
interface PatternType {
  // 当前高度
  nowHeight: number
  // 当前图形
  chart: PATTERN_CHART
  // 当前颜色
  color: string
  // 当前旋转角度
  turn: number
  // 阴影
  shadow: number
  // 0: 初始化, 1: 上升, 2: 下降
  nowState: number
}
/**
 * @description 图案模型类
 * @extends BaseModel<PatternOptionsType>
 */
export default class Pattern extends BaseModel<PatternOptionsType> {
  pattern: PatternType
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<PatternOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<PatternOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, limits, (model) => {
      model.options.delay = 10
    })
    this.pattern = {
      color: this.randomState('chartColors'),
      nowHeight: 10,
      chart: this.randomState('charts'),
      shadow: 0,
      nowState: 1,
      turn: 0
    }
    this.run(this.draw)
  }
  /**
   * @description 绘制图案
   */
  draw() {
    const op = this.options
    this.clearRect()
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(0, this.pattern.nowHeight)
    this.ctx.rotate((this.pattern.turn / Math.PI) * 2)
    this.ctx.fillStyle = this.pattern.color
    this.selectChart(0, 0, op.chartSize)
    this.ctx.closePath()
    this.ctx.restore()
    this.drawShadow()
    // 清空隐藏部分
    this.clearRect(-this.w, 0, this.w * 2, this.h)
    // 控制值变化
    this.controller(op)
    this.drawText({ textColor: this.pattern.color })
  }
  /**
   * @description 控制图案动画
   * @param {Required<PatternOptionsType>} op - 配置选项
   */
  controller(op: Required<PatternOptionsType>) {
    this.pattern.turn += 10 // 角度
    // 高度和阴影
    if (this.pattern.nowState === 1) {
      this.pattern.nowHeight--
      this.pattern.shadow += 0.2
    } else if (this.pattern.nowState === 2) {
      this.pattern.nowHeight++
      this.pattern.shadow -= 0.2
    }
    this.pattern.shadow = Math.floor(this.pattern.shadow * 100) / 100
    // 速度
    if (this.pattern.nowHeight <= -op.chartSize && this.pattern.nowHeight % 8 == 0) {
      op.delay += 0.5
      op.delay = Math.floor(op.delay * 100) / 100
    }
    // 范围
    if (this.pattern.nowHeight <= -op.maxHeight) {
      this.pattern.nowState = 2
    } else if (this.pattern.nowHeight >= op.chartSize) {
      this.pattern.nowState = 1
      op.delay = 10
      // 切换图形
      this.pattern.chart = this.randomState('charts')
      // 切换颜色
      this.pattern.color = this.randomState('chartColors')
    }
  }
  /**
   * @description 选择图形类型
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} size - 尺寸
   */
  selectChart(x: number, y: number, size: number) {
    switch (this.pattern.chart) {
      case PATTERN_CHART.RECT:
        this.drawRect(x, y, size)
        break
      case PATTERN_CHART.ARC:
        this.drawArc(x, y, size)
        break
      case PATTERN_CHART.TRIANGLE:
        this.drawTriangle(x, y, size)
        break
      case PATTERN_CHART.HEART:
        this.drawHeart(x, y, size)
        break
      case PATTERN_CHART.POLYGON:
        this.drawPolygon(x, y, size)
        break
    }
  }
  /**
   * @description 随机选择状态
   * @param {any} key - 键名
   * @returns {PATTERN_CHART} 返回随机选择的图形类型
   */
  randomState(key: any): PATTERN_CHART {
    const op: any = this.options
    return op[key][parseInt(String(Math.random() * op[key].length))]
  }
  /**
   * @description 绘制阴影
   */
  drawShadow() {
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.globalAlpha = 0.2
    this.ctx.strokeStyle = this.pattern.color
    this.ctx.moveTo(-this.pattern.shadow / 2, 0)
    this.ctx.lineTo(this.pattern.shadow, 0)
    this.ctx.stroke()
    this.ctx.beginPath()
    this.ctx.restore()
  }
  /**
   * @description 绘制矩形
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} size - 尺寸
   */
  drawRect(x: number, y: number, size: number) {
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.translate(-size / 2, -size / 2)
    this.ctx.fillRect(x, y, size, size)
    this.ctx.closePath()
    this.ctx.restore()
  }
  /**
   * @description 绘制圆形
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} size - 尺寸
   */
  drawArc(x: number, y: number, size: number) {
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }
  /**
   * @description 绘制三角形
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} size - 尺寸
   */
  drawTriangle(x: number, y: number, size: number) {
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.translate(-size / 2, -((size / 2) * Math.sqrt(3)) / 2)
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(size, 0)
    this.ctx.lineTo(size / 2, (size / 2) * Math.sqrt(3))
    this.ctx.lineTo(x, y)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }
  /**
   * @description 绘制心形
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} size - 尺寸
   */
  drawHeart(x: number, y: number, size: number) {
    size = size / 2
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.translate(0, -(size * 2) / 2)
    this.ctx.moveTo(x, y)
    this.ctx.bezierCurveTo(size / 2, -size, size * 3, -size / 2, y, size * 2)
    this.ctx.moveTo(x, y)
    this.ctx.bezierCurveTo(-size / 2, -size, -size * 3, -size / 2, y, size * 2)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }
  /**
   * @description 绘制多边形
   * @param {number} x - x坐标
   * @param {number} y - y坐标
   * @param {number} size - 尺寸
   */
  drawPolygon(x: number, y: number, size: number) {
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.translate(-size / 2, -size / 2)
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(size, y)
    this.ctx.lineTo(size + size / 2, size / 2)
    this.ctx.lineTo(size, size / 2 + size / 2)
    this.ctx.lineTo(x, size)
    this.ctx.lineTo(x - size / 2, size - size / 2)
    this.ctx.lineTo(x, y)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }

  /**
   * @description 设置阴影
   */
  setShadow() {
    const op = this.options
    this.ctx.shadowColor = this.pattern.color
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
}
