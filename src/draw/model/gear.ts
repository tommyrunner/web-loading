import type { OptionsType } from "../../types";
export default function gear(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = options.themeColor;
    // 设置画布颜色
    ctx.arc(w / 2, h / 2, 10, 0, Math.PI * 2);
    ctx.fill();
}