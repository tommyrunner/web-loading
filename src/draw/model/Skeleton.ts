import type { ElementType } from '../../type'
import type { SkeletonOptionsType } from '../type'
import BaseModel from './BaseModel'
/**
 * @description 骨架屏模型默认配置选项
 */
const modelDefOptions: SkeletonOptionsType = {
  skeletonColor: 'rgb(240, 240, 240)',
  skeletonAnimationColor: 'rgb(226, 226, 226)',
  radius: 5,
  animation: true,
  deep: true,
  appointElementClass: []
}
/**
 * @description 骨架屏元素类型接口
 */
interface SkeletonType {
  element: HTMLElement
  title: string
}
/**
 * @description 骨架屏模型类
 * @extends BaseModel<SkeletonOptionsType>
 */
export default class Skeleton extends BaseModel<SkeletonOptionsType> {
  skeleton: Array<SkeletonType>
  colorFlow: number
  state: number
  /**
   * @description 构造函数
   * @param {number} w - 宽度
   * @param {number} h - 高度
   * @param {HTMLCanvasElement} canvas - Canvas元素
   * @param {Required<SkeletonOptionsType>} options - 配置选项
   * @param {ElementType} element - 容器元素
   */
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<SkeletonOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element, modelDefOptions, [], (model) => {
      const op = model.options
      // 重新初始化canvas
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
  /**
   * @description 绘制骨架屏
   */
  draw() {
    this.clearRect()
    this.drawSkeleton()
  }
  /**
   * @description 将元素添加到骨架屏元素列表中
   * @param {Element} element - 要添加的元素
   */
  addElementToSkeleton(element: Element) {
    const op = this.options
    const filter = op.appointElementClass
    // 如果设置了appointElementClass，只处理具有该类的元素
    if (filter && filter.length > 0) {
      if (filter.some((c) => element.classList.contains(c))) {
        this.skeleton.push({ title: element.nodeName, element: element as HTMLElement })
      }
    } else {
      this.skeleton.push({ title: element.nodeName, element: element as HTMLElement })
    }
  }

  /**
   * @description 控制器函数，处理DOM元素
   * @param {HTMLCollection} els - HTML元素集合
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
  /**
   * @description 绘制骨架元素
   */
  drawSkeleton() {
    const op = this.options
    const linearGradient = this.ctx.createLinearGradient(0, 0, this.w, this.h)
    linearGradient.addColorStop(0, op.skeletonColor)
    linearGradient.addColorStop(this.colorFlow, op.skeletonAnimationColor)
    linearGradient.addColorStop(1, op.skeletonColor)
    if (op.animation) this.ctx.fillStyle = linearGradient
    this.skeleton.forEach((s) => {
      const el = s.element
      // 处理圆角露出问题
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
