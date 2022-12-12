import type { ElementStoreType, OptionsType } from "../types";
export default function draw(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType, store: ElementStoreType): void {
    try {
        return require(`./model/${options.model}.ts`).default(w, h, ctx, options, store)
    } catch (e) {
        console.error('Webloading:use Model_TYPES')
    }
}