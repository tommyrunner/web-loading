import type { ElementType, LimitType } from '../../type'
import type { PatternOptionsType } from '../type'
import { getDefOptions, PATTERN_CHART } from '../../utils'
import BaseModel from './BaseModel'
const modelDefOptions: PatternOptionsType = {
  charts: [PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON],
  chartColors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd'],
  maxHeight: 60,
  chartSize: 12
}
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
interface PatternType {
  // Current height
  nowHeight: number
  // Current chart
  chart: PATTERN_CHART
  // Current color
  color: string
  // Current rotation angle
  turn: number
  // shadow
  shadow: number
  // 0: initialization, 1: rise, 2: fall
  nowState: number
}
export default class Pattern extends BaseModel<PatternOptionsType> {
  pattern: PatternType
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
    // Empty hidden part
    this.clearRect(-this.w, 0, this.w * 2, this.h)
    // Control value change
    this.controller(op)
    this.drawText({ textColor: this.pattern.color })
  }
  controller(op: Required<PatternOptionsType>) {
    this.pattern.turn += 10 // angle
    // Height and shadow
    if (this.pattern.nowState === 1) {
      this.pattern.nowHeight--
      this.pattern.shadow += 0.2
    } else if (this.pattern.nowState === 2) {
      this.pattern.nowHeight++
      this.pattern.shadow -= 0.2
    }
    this.pattern.shadow = Math.floor(this.pattern.shadow * 100) / 100
    // speed
    if (this.pattern.nowHeight <= -op.chartSize && this.pattern.nowHeight % 8 == 0) {
      op.delay += 0.5
      op.delay = Math.floor(op.delay * 100) / 100
    }
    // Range
    if (this.pattern.nowHeight <= -op.maxHeight) {
      this.pattern.nowState = 2
    } else if (this.pattern.nowHeight >= op.chartSize) {
      this.pattern.nowState = 1
      op.delay = 10
      // Toggle Graphics
      this.pattern.chart = this.randomState('charts')
      // Toggle Color
      this.pattern.color = this.randomState('chartColors')
    }
  }
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
  randomState(key: any): PATTERN_CHART {
    const op: any = this.options
    return op[key][parseInt(String(Math.random() * op[key].length))]
  }
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
  drawRect(x: number, y: number, size: number) {
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.translate(-size / 2, -size / 2)
    this.ctx.fillRect(x, y, size, size)
    this.ctx.closePath()
    this.ctx.restore()
  }
  drawArc(x: number, y: number, size: number) {
    this.ctx.save()
    this.ctx.beginPath()
    this.setShadow()
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
    this.ctx.restore()
  }
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

  setShadow() {
    const op = this.options
    this.ctx.shadowColor = this.pattern.color
    this.ctx.shadowOffsetX = op.shadowOffsetX
    this.ctx.shadowOffsetY = op.shadowOffsetY
    this.ctx.shadowBlur = op.shadowBlur
  }
}
