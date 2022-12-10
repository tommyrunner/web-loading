import type { OptionsType } from "../types";
export default function draw(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType) {
    try {
        const model = require(`./model/${options.model}.ts`)
        model.default(w, h, ctx, options)
    } catch (e) {
        console.error('Webloading:use Model_TYPES')
    }
}