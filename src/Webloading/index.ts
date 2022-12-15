import type { ElementType, OptionsType } from "../types";
import { getDefOptions, $log } from "../utils";
import drawController from '../draw/index'
export default class WebLoading {
    // 动画canvas
    canvas: HTMLCanvasElement;
    // 动画元素id
    loadingId: string | null;
    // 画笔
    ctx: CanvasRenderingContext2D | null;
    // 动画元素
    element: ElementType;
    // 配置options
    options: OptionsType;
    constructor(element: HTMLElement, options?: OptionsType) {
        this.canvas = document.createElement("canvas");
        this.loadingId = String(Date.now());
        this.canvas.id = this.loadingId;
        this.ctx = this.canvas.getContext("2d");
        this.element = element;
        this.element.loadingId = this.loadingId;
        // 初始化默认配置
        this.options = Object.assign(getDefOptions(), options);
        // 初始化储存属性
        this.initStore()
        this.init();
    }
    init(): void {
        let elementW = this.element.offsetWidth,
            elementH = this.element.offsetHeight,
            elementStyle = this.element.style,
            canvasStyle = this.canvas.style;
        if (!elementStyle.position || elementStyle.position === 'static')
            elementStyle.position = "relative";
        // 初始化样式
        canvasStyle.position = "absolute";
        canvasStyle.left = "0px";
        canvasStyle.top = "0px";
        canvasStyle.zIndex = this.options.zIndex!
        canvasStyle.transition = `${this.options.delayColse!}s`;
        canvasStyle.backgroundColor = this.options.bgColor!
        // 设置画布大小
        this.canvas.width = elementW;
        this.canvas.height = elementH;
        this.element.append(this.canvas);
        // 默认启动
        this.draw();
    }
    draw(): void {
        let w = this.canvas.offsetWidth,
            h = this.canvas.offsetHeight;
            if (this.ctx && this.element.$store) {
            // 抗锯齿
            if (window.devicePixelRatio) {
                devicePixelRatio = window.devicePixelRatio;
                this.canvas.width = w * devicePixelRatio;
                this.canvas.height = h * devicePixelRatio;
                this.ctx.scale(devicePixelRatio, devicePixelRatio);
            }
            drawController(w, h, this.ctx, this.options, this.element.$store)
        } else {
            $log('WebLoading:canvas or ctx null')
        }
    }
    resize(): void {
        this.canvas.width = this.element.offsetWidth;
        this.canvas.height = this.element.offsetHeight;
        this.draw();
    }
    close(): void {
        // 先视觉过渡
        this.canvas.style.opacity = "0";
        this.canvas.style.zIndex = "-2001";
        this.loadingId = null;
        // 清空dom
        setTimeout(() => {
            this.canvas.remove();
        }, (this.options.delayColse!) * 1000);
    }
    initStore() {
        // 储存状态
        this.element.$store = {
            options: this.options,
            element: this.element,
            animationId: undefined
        }
    }
}
