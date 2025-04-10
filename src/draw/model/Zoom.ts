import type { ElementType } from '../../type'
import type { ZoomOptionsType } from '../type'
import { ZOOM_ACTION } from '../../utils'
import BaseModel from './BaseModel'
/**
 * @description 缩放模型默认配置选项
 */
const modelDefOptions: ZoomOptionsType = {
  zoomGap: 10,
  maxSize: 16,
  zoomNum: 5,
  lineWidth: 10,
  zoomHeight: 2,
  lineCap: 'round',
  action: ZOOM_ACTION.SCALE,
  direction: true,
  zoomColors: []
}
/**
 * @description 列表类型接口
 */
interface ListType {
  value: number
  state: number
}
/**
 * @description 缩放模型限制条件
 */
const limits = [
  {
    key: 'lineWidth',
    message: 'lineWidth(default:10) <=  maxSize(default:16)',
    limit: (key: any) => {
      return key <= modelDefOptions.maxSize!
    }
  },
  {
    key: 'maxSize',
    message: 'lineWidth(default:10) <=  maxSize(default:16)',
    limit: (key: any) => {
      return modelDefOptions.lineWidth! <= key
    }
  }
]
/**
 * @description 缩放模型类
 * @extends BaseModel<ZoomOptionsType>
 */
export default class Zoom extends BaseModel<ZoomOptionsType> {
  list: Array<ListType>
  zoomIndex: number
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<ZoomOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<ZoomOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, limits, (model) => {
      const op = model.options
      model.ctx.lineCap = op.lineCap
      model.ctx.lineWidth = op.lineWidth
      // 居中 ((缩放宽度 * 数量+1)+(缩放间隙 * 数量+1))/2, 因为第一个缩放会移动所需的数量+1, 高度/2
      model.ctx.translate(-(op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2, -op.zoomHeight / 2)
      model.ctx.save()
    })
    this.zoomIndex = this.options.direction ? 0 : this.options.zoomNum - 1
    this.list = Array.from({ length: this.options.zoomNum }, (_, _index) =>
      Object.assign({
        value: this.options.lineWidth,
        // 0: 初始, 1: 变大, 2: 变小
        state: 0
      })
    )
    this.run(this.draw)
  }
  /**
   * @description 绘制缩放模型
   */
  draw() {
    this.clearRect()
    // 绘制缩放
    this.drawZoom()
    const op = this.options
    this.drawText({ esGap: op.maxSize, x: (op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2 })
    // 控制进程
    this.controller()
  }
  /**
   * @description 控制缩放动画
   */
  controller() {
    const op = this.options
    if (op.direction && this.zoomIndex >= op.zoomNum) this.zoomIndex = 0
    else if (op.direction && this.zoomIndex < 0) this.zoomIndex = op.zoomNum - 1
  }
  /**
   * @description 绘制缩放元素
   */
  drawZoom() {
    const op = this.options
    for (let i = 0; i < op.zoomNum; i++) {
      // 处理变化
      if (this.list[i].state === 1) this.list[i].value += 2
      else if (this.list[i].state === 2 && this.list[i].value >= op.lineWidth) this.list[i].value--
      if (op.action === ZOOM_ACTION.SCALE) this.ctx.lineWidth = this.list[i].value
      // 状态变化
      if (i === this.zoomIndex) {
        if (this.list[i].value > op.maxSize) {
          this.list[i].state = 2
          op.direction
            ? this.zoomIndex++
            : this.zoomIndex - 1 >= 0
            ? this.zoomIndex--
            : (this.zoomIndex = op.zoomNum - 1)
        }
        if (this.list[i].value <= op.lineWidth) this.list[i].state = 1
      }
      // 根据数量绘制
      this.ctx.beginPath()
      if (op.zoomColors.length > 0 && op.zoomColors[i]) this.ctx.strokeStyle = op.zoomColors[i]
      else this.ctx.strokeStyle = op.themeColor
      let sH = 0,
        eH = op.zoomHeight
      if (op.action === ZOOM_ACTION.HEIGHT || op.action === ZOOM_ACTION.WAVE) {
        sH = -this.list[i].value
      }
      if (op.action === ZOOM_ACTION.WAVE) {
        eH = -this.list[i].value
      }
      this.ctx.moveTo((i + 1) * (op.lineWidth + op.zoomGap), sH)
      this.ctx.lineTo((i + 1) * (op.lineWidth + op.zoomGap), eH)
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }
}
