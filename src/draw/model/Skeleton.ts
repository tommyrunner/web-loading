import type { ElementType } from '../../type'
import type { SkeletonOptionsType } from '../type'
import BaseModel from './BaseModel'
const modelDefOptions: SkeletonOptionsType = {
  skeletonColor: 'rgb(240, 240, 240)',
  skeletonAnimationColor: 'rgb(226, 226, 226)',
  radius: 5,
  animation: true,
  deep: true,
  appointElementClass: []
}
interface SkeletonType {
  element: HTMLElement
  title: string
}
export default class Skeleton extends BaseModel<SkeletonOptionsType> {
  skeleton: Array<SkeletonType>
  colorFlow: number
  state: number
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<SkeletonOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, [], (model) => {
      const op = model.options
      // Reinitialize the canvas
      model.ctx.translate(-model.w / 2, -model.h / 2)
      model.canvas.width = model.element.scrollWidth
      model.canvas.height = model.element.scrollHeight
      model.ctx.fillStyle = op.skeletonColor
    })
    this.skeleton = []
    this.colorFlow = 0
    this.state = 1
    this.controller(this.element.children)
    this.run(this.draw)
  }
  draw() {
    this.clearRect()
    this.drawSkeleton()
  }
  /**
   * 将元素添加到骨架屏元素列表中
   * @param element - 要添加的元素
   */
  addElementToSkeleton(element: Element) {
    const op = this.options
    const filter = op.appointElementClass
    // 如果设置了appointElementClass，只处理具有该类的元素
    if (filter && filter.length > 0) {
      console.log(element.classList)
      if (filter.some((c) => element.classList.contains(c))) {
        this.skeleton.push({ title: element.nodeName, element: element as HTMLElement })
      }
    } else {
      this.skeleton.push({ title: element.nodeName, element: element as HTMLElement })
    }
  }

  /**
   * 控制器函数，处理DOM元素
   * @param els - HTML元素集合
   */
  controller(els: HTMLCollection) {
    const op = this.options
    for (const e of Array.from<Element>(els)) {
      // 排除绘制canvas元素
      if (this.canvas === e) continue
      if (op.deep) {
        if (e.children.length <= 0) {
          this.addElementToSkeleton(e)
        } else {
          // 如果指定了appointElementClass，则包含父元素，否则只包含所有根元素
          if (op.appointElementClass && op.appointElementClass.length) this.addElementToSkeleton(e)
          this.controller(e.children)
        }
      } else {
        this.addElementToSkeleton(e)
      }
    }
  }
  drawSkeleton() {
    const op = this.options
    const linearGradient = this.ctx.createLinearGradient(0, 0, this.w, this.h)
    linearGradient.addColorStop(0, op.skeletonColor)
    linearGradient.addColorStop(this.colorFlow, op.skeletonAnimationColor)
    linearGradient.addColorStop(1, op.skeletonColor)
    if (op.animation) this.ctx.fillStyle = linearGradient
    this.skeleton.forEach((s) => {
      const el = s.element
      // Handle the problem of fillet exposure
      this.drawRadiusRect(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight, op.radius)
      this.ctx.fill()
    })
    if (op.animation) {
      if (this.colorFlow >= 0.9) this.state = 2
      if (this.colorFlow <= 0.1) this.state = 1
      if (this.state === 1) this.colorFlow += 0.06
      if (this.state === 2) this.colorFlow -= 0.06
    }
  }
}
