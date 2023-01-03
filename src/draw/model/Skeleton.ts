import type { ElementStoreType } from "../../types";
import type { SkeletonOptionsType } from "../types";
import { getDefOptions } from '../../utils'
import BaseModel from "./BaseModel";
// 默认值
const defaultOptions: Required<SkeletonOptionsType> = {
    ...getDefOptions(),
    skeletonColor: 'rgb(240, 240, 240)',
    skeletonAnimationColor: 'rgb(206, 206, 206)',
    animation: true
}
interface SkeletonType {
    element: HTMLElement
    title: string
}
export default class Skeleton extends BaseModel<Required<SkeletonOptionsType>> {
    skeleton: Array<SkeletonType>
    colorFlow: number
    state: number
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<SkeletonOptionsType>, store: ElementStoreType) {
        super(w, h, canvas, options, store)
        // 1.初始化options(防止属性为空)
        this.initOptions(defaultOptions, [])
        this.skeleton = []
        this.colorFlow = 0
        this.state = 1
        this.initPoint()
        this.controller(this.store.element.children)
        this.run(this.draw)
    }
    initPoint() {
        let op = this.options
        this.ctx.translate(-this.w / 2, -this.h / 2)
        this.ctx.fillStyle = op.skeletonColor
    }
    draw() {
        this.clearRect()
        this.drawSkeleton()
    }
    controller(els: HTMLCollection) {
        Array.from(els).forEach(e => {
            if (e.children.length <= 0 && this.store.loadingId !== e.id) {
                this.skeleton.push({ title: e.nodeName, element: e as HTMLElement })
            }
            else
                this.controller(e.children)
        })
    }
    drawSkeleton() {
        let op = this.options
        let linearGradient = this.ctx.createLinearGradient(0, 0, this.w, this.h);
        linearGradient.addColorStop(0, op.skeletonColor);
        linearGradient.addColorStop(this.colorFlow, op.skeletonAnimationColor);
        linearGradient.addColorStop(1, op.skeletonColor);
        if (op.animation) this.ctx.fillStyle = linearGradient
        this.skeleton.forEach(s => {
            let el = s.element
            if (this.store.element.$store?.animationId) {
                let w = s.element.getAttribute('wl-w'), h = s.element.getAttribute('wl-h');
                s.element.style.cssText = `
                display:inline-block;
                width:${w}px;
                height:${h}px
                `
            } else {
                s.element.style.cssText = ''
            }
            this.drowRadiusRect(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight, 5)
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