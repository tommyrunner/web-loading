import type { ElementType } from '../../types'
import type { SkeletonOptionsType } from '../types'
import BaseModel from './BaseModel'
const defaultOptions: SkeletonOptionsType = {
  skeletonColor: 'rgb(240, 240, 240)',
  skeletonAnimationColor: 'rgb(226, 226, 226)',
  radius: 5,
  animation: true,
  deep: true,
  appoint: ''
}
interface SkeletonType {
  element: HTMLElement
  title: string
}
export default class Skeleton extends BaseModel<SkeletonOptionsType> {
  skeleton: Array<SkeletonType>
  colorFlow: number
  state: number
  WL_IMG: 'wl-img'
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<SkeletonOptionsType>,
    element: ElementType
  ) {
    super(w, h, canvas, options, element)
    this.initOptions(defaultOptions, [])
    this.skeleton = []
    this.colorFlow = 0
    this.state = 1
    this.WL_IMG = 'wl-img'
    this.initPoint()
    this.controller(this.element.children)
    this.run(this.draw)
  }
  initPoint() {
    const op = this.options
    // Reinitialize the canvas
    this.ctx.translate(-this.w / 2, -this.h / 2)
    this.canvas.width = this.element.scrollWidth
    this.canvas.height = this.element.scrollHeight
    this.ctx.fillStyle = op.skeletonColor
  }
  draw() {
    this.clearRect()
    this.drawSkeleton()
  }
  controller(els: HTMLCollection) {
    const op = this.options
    for (const e of Array.from(els)) {
      if (this.element.loadingId === e.id) continue
      if (op.appoint.length > 0 && e.getAttribute(op.appoint) === null) continue
      if (op.deep) {
        if (e.children.length <= 0) {
          this.skeleton.push({ title: e.nodeName, element: e as HTMLElement })
        } else this.controller(e.children)
      } else {
        this.skeleton.push({ title: e.nodeName, element: e as HTMLElement })
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
      this.drowRadiusRect(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight, op.radius)
      this.ctx.fill()
    })
    if (op.animation) {
      if (this.colorFlow >= 0.9) this.state = 2
      if (this.colorFlow <= 0.1) this.state = 1
      if (this.state === 1) this.colorFlow += 0.06
      if (this.state === 2) this.colorFlow -= 0.06
    }
  }
  // Draw a picture Skeleton
  // drawSkeletonImg(x: number, y: number, size: number) {
  //     let op = this.options
  //     this.ctx.save()
  //     this.ctx.fillStyle = op.imgColor
  //     this.ctx.strokeStyle = op.imgColor
  //     this.ctx.beginPath()
  //     this.ctx.lineWidth = 2.8
  //     this.ctx.strokeRect(x, y, size, size)
  //     this.ctx.closePath()

  //     this.ctx.beginPath()
  //     this.ctx.arc(x + size / 3.6, y + size / 3.6, size / 6, 0, Math.PI * 2)
  //     this.ctx.fill()
  //     this.ctx.closePath()

  //     this.ctx.beginPath()
  //     this.ctx.lineWidth = 2
  //     this.ctx.moveTo(x, y + size)
  //     this.ctx.lineTo(x + size / 4, y + size - size / 3)
  //     this.ctx.lineTo(x + size / 2, y + size - size / 6)
  //     this.ctx.lineTo(x + size / 1.5, y + size - size / 2)
  //     this.ctx.lineTo(x + size, y + size)
  //     this.ctx.stroke()
  //     this.ctx.restore()
  // }
}
