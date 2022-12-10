import type { ElementType, OptionsType } from "../types";
import { MODEL_TYPES } from "../utils";
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
        this.options = this.defOptions(options);
        this.init();
    }
    // 初始options参数
    defOptions(options?: OptionsType): OptionsType {
        return Object.assign(
            {
                model: MODEL_TYPES.GEAR,
                delay: 0.26,
                optimization: false,
                zIndex: "2001",
                themeColor: "#13C2C2",
                bgColor: "rgba(0, 0, 0, 0.26)",
            },
            options
        );
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
        canvasStyle.zIndex = this.options.zIndex;
        canvasStyle.transition = `${this.options.delay}s`;
        canvasStyle.backgroundColor = this.options.bgColor
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
        if (this.ctx) {
            drawController(w, h, this.ctx, this.options)
        } else {
            console.warn('WebLoading:canvas or ctx null')
        }
    }
    resize(): void {
        this.canvas.width = this.element.offsetWidth;
        this.canvas.height = this.element.offsetHeight;
        this.draw();
    }
    close(): void {
        this.canvas.style.opacity = "0";
        this.canvas.style.zIndex = "-2001";
        this.loadingId = null;
        setTimeout(() => {
            // 清空dom
            this.canvas.remove();
        }, this.options.delay * 1000);
    }
}
