import type { ElementStoreType, OptionsType } from "../types";
export default function draw(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType, store: ElementStoreType): void {
    try {
        let Model = require(`./model/${options.model}.ts`).default
        return new Model(w, h, ctx, options, store)
    } catch (e) {
        console.error(e + 'Webloading:draw error')
    }
}