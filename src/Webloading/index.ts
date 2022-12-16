import type { ElementType, OptionsType } from "../types";
import { getDefOptions, $log } from "../utils";
import drawController from '../draw/index'
import style from './style'
export default class WebLoading {
    // 动画canvas
    canvas: HTMLCanvasElement;
    // 动画元素id
    loadingId: string | null;
    // 动画元素
    element: ElementType;
    // 配置options
    options: OptionsType;
    constructor(element: HTMLElement, options?: OptionsType) {
        // 初始化默认配置
        this.options = Object.assign(getDefOptions(), options);
        this.canvas = document.createElement("canvas");
        this.loadingId = String('wl_' + Date.now());
        this.element = element;
        // 初始化储存属性
        this.initStore()
        this.init();
    }
    init(): void {
        let elementW = this.element.offsetWidth,
            elementH = this.element.offsetHeight,
            elementStyle = this.element.style,
            canvasStyle = this.canvas.style;
        // 初始化元素的样式
        this.element.loadingId = this.loadingId;
        if (!elementStyle.position || elementStyle.position === 'static')
            elementStyle.position = "relative";
        // 初始化canvas样式
        this.canvas.id = this.loadingId!;
        document.styleSheets[0].insertRule(style)
        this.canvas.style.animation = `wl_show ${this.options.delayColse! / 1000}s linear`
        canvasStyle.position = "absolute";
        canvasStyle.left = "0px";
        canvasStyle.top = "0px";
        canvasStyle.zIndex = this.options.zIndex!
        canvasStyle.transition = `${this.options.delayColse! / 1000}s`;
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
        if (this.element.$store) {
            drawController(w, h, this.canvas, this.options, this.element.$store)
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
        }, this.options.delayColse!);
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
