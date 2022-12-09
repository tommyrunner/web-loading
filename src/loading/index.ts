import type { ElementType, OptionsType } from '../types.d'
export default class WebLoading {
    canvas: HTMLCanvasElement
    loadingId: string | null
    ctx: CanvasRenderingContext2D | null
    element: ElementType
    constructor(element: HTMLElement, options?: OptionsType) {
        // 动画canvas
        this.canvas = document.createElement("canvas");
        this.loadingId = String(Date.now());
        this.canvas.id = this.loadingId;
        // 画笔
        this.ctx = this.canvas.getContext("2d");
        // 动画元素
        this.element = element;
        this.element.loadingId = this.loadingId;
        this.element.append(this.canvas);
        this.init();
    }
    init(): void {
        let elementW = this.element.offsetWidth,
            elementH = this.element.offsetHeight;
        this.element.style.position = "relative";
        // 初始化样式
        this.canvas.style.cssText = `
        position: absolute;
        left:0px;
        top:0px;
        zIndex:2001;
        transition: 0.26s;
        background-color: rgb(0 0 0 / 42%);
    `;
        this.canvas.width = elementW;
        this.canvas.height = elementH;
        // 默认画
        this.draw();
    }
    draw(): void {
        let w = this.canvas.offsetWidth,
            h = this.canvas.offsetHeight;
        if (this.ctx) {
            this.ctx.clearRect(0, 0, w, h);
            // 设置画布颜色
            this.ctx.arc(w / 2, h / 2, 10, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    resize(): void {
        this.canvas.width = this.element.offsetWidth;
        this.canvas.height = this.element.offsetHeight;
        this.draw();
    }
    close(): void {
        this.canvas.style.opacity = '0';
        this.canvas.style.zIndex = '-2001';
        this.loadingId = null;
        setTimeout(() => {
            // 清空dom
            this.canvas.remove();
        }, 0.26 * 1000);
    }
}