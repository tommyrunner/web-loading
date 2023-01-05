import type { ElementStoreType } from '../../types'
import type { SkeletonOptionsType } from '../types'
import { getDefOptions } from '../../utils'
import BaseModel from './BaseModel'
// 默认值
const defaultOptions: Required<SkeletonOptionsType> = {
  ...getDefOptions(),
  skeletonColor: 'rgb(240, 240, 240)',
  skeletonAnimationColor: 'rgb(226, 226, 226)',
  radius: 5,
  animation: true,
  skeletonMax: true,
  deep: true,
  appoint: 'wl-show'
}
interface SkeletonType {
  element: HTMLElement
  title: string
}
export default class Skeleton extends BaseModel<Required<SkeletonOptionsType>> {
  skeleton: Array<SkeletonType>
  colorFlow: number
  state: number
  WL_KEY: '__wl-key'
  WL_W: 'wl-w'
  WL_H: 'wl-h'
  WL_IMG: 'wl-img'
  constructor(
    w: number,
    h: number,
    canvas: HTMLCanvasElement,
    options: Required<SkeletonOptionsType>,
    store: ElementStoreType
  ) {
    super(w, h, canvas, options, store)
    // 1.初始化options(防止属性为空)
    this.initOptions(defaultOptions, [])
    this.skeleton = []
    this.colorFlow = 0
    this.state = 1
    this.WL_KEY = '__wl-key'
    this.WL_W = 'wl-w'
    this.WL_H = 'wl-h'
    this.WL_IMG = 'wl-img'
    this.initPoint()
    this.controller(this.store.element.children)
    this.run(this.draw)
    console.dir(store.element)
  }
  initPoint() {
    let op = this.options
    // 重新初始化画布
    this.ctx.translate(-this.w / 2, -this.h / 2)
    this.canvas.width = this.store.element.scrollWidth
    this.canvas.height = this.store.element.scrollHeight
    this.ctx.fillStyle = op.skeletonColor
    // 动画结束回调(还原样式)
    this.store.hookCall.beforeColse = () => {
      this.skeleton.forEach((s) => {
        let el = s.element
        el.style.cssText = el.getAttribute(this.WL_KEY) || ''
      })
    }
    this.store.hookCall.colsed = () => {
      this.skeleton.forEach((s) => {
        let el = s.element
        el.removeAttribute(this.WL_KEY)
      })
    }
  }
  draw() {
    this.clearRect()
    this.drawSkeleton()
  }
  controller(els: HTMLCollection) {
    let op = this.options
    for (let e of Array.from(els)) {
      if (this.store.loadingId === e.id) continue
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
    let op = this.options
    let linearGradient = this.ctx.createLinearGradient(0, 0, this.w, this.h)
    linearGradient.addColorStop(0, op.skeletonColor)
    linearGradient.addColorStop(this.colorFlow, op.skeletonAnimationColor)
    linearGradient.addColorStop(1, op.skeletonColor)
    if (op.animation) this.ctx.fillStyle = linearGradient
    this.skeleton.forEach((s) => {
      let el = s.element
      if (this.store.element.$store?.animationId) {
        let w = el.getAttribute(this.WL_W),
          h = el.getAttribute(this.WL_H)
        if (w || h) {
          if (el.getAttribute(this.WL_KEY) === null) {
            el.setAttribute(this.WL_KEY, el.style.cssText)
          }
          // 选择最大值
          if (op.skeletonMax) {
            if (w && el.offsetWidth > parseInt(w)) w = String(el.offsetWidth)
            if (h && el.offsetHeight > parseInt(h)) h = String(el.offsetHeight)
          }
          el.style.cssText = `
                            ${el.style.cssText}
                            display:inline-block;
                            width:${w}px;
                            height:${h}px;
                    `
        }
      }
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
  // 绘制图片skeleton
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
