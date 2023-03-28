import type { ElementType } from '../../types'
import type { ZoomOptionsType } from '../types'
import { ZOOM_ACTION } from '../../utils'
import BaseModel from './BaseModel'
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
interface ListType {
  value: number
  state: number
}
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
export default class Zoom extends BaseModel<ZoomOptionsType> {
  list: Array<ListType>
  zoomIndex: number
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
      // Center ((zoom width * number+1)+(zoom gap * number+1))/2, because the first zoom shifts the required number+1, height/2
      model.ctx.translate(-(op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2, -op.zoomHeight / 2)
      model.ctx.save()
    })
    this.zoomIndex = this.options.direction ? 0 : this.options.zoomNum - 1
    this.list = Array.from({ length: this.options.zoomNum }, (_, _index) =>
      Object.assign({
        value: this.options.lineWidth,
        // 0: initial, 1: bigger, 2: smaller
        state: 0
      })
    )
    this.run(this.draw)
  }
  draw() {
    this.clearRect()
    // Draw zoom
    this.drawZoom()
    const op = this.options
    this.drawText({ esGap: op.maxSize, x: (op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2 })
    // technological process
    this.controller()
  }
  controller() {
    const op = this.options
    if (op.direction && this.zoomIndex >= op.zoomNum) this.zoomIndex = 0
    else if (op.direction && this.zoomIndex < 0) this.zoomIndex = op.zoomNum - 1
  }
  drawZoom() {
    const op = this.options
    for (let i = 0; i < op.zoomNum; i++) {
      // Process change
      if (this.list[i].state === 1) this.list[i].value += 2
      else if (this.list[i].state === 2 && this.list[i].value >= op.lineWidth) this.list[i].value--
      if (op.action === ZOOM_ACTION.SCALE) this.ctx.lineWidth = this.list[i].value
      // State change
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
      // Draw according to num
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
