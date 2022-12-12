import type { ElementStoreType, OptionsType } from "../../types";
import { animationFrame } from '../../utils'
export default function gear(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType, store: ElementStoreType) {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = options.themeColor;
    ctx.save()
    ctx.translate(w / 2, h / 2)
    // 设置画布颜色
    let aps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    function run() {
        ctx.clearRect(-w, -h, w * 2, h * 2);
        aps = aps.map(a => a - 1 <= 0 ? aps.length - 1 : a - 1)
        for (let i = 0; i < aps.length; i++) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(64,158,255,0.${aps[i]})`
            ctx.moveTo(0, 10)
            ctx.lineCap = "round";
            ctx.lineTo(0, 20)
            ctx.lineWidth = 3
            ctx.stroke()
            ctx.rotate(2 * Math.PI / 10)
        }
    }
    // 动画针 判断如果正在run，就无需重新实例
    if (!store.animationId)
        store.animationId = animationFrame(run, 80)
}