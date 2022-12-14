import type { ElementStoreType, OptionsType } from "../types";
import { $log, LOG_TYPES } from '../utils'
export default function draw(w: number, h: number, ctx: CanvasRenderingContext2D, options: OptionsType, store: ElementStoreType): void {
    try {
        let Model = require(`./model/${options.model}.ts`).default
        return new Model(w, h, ctx, options, store)
    } catch (e) {
        $log('draw error(' + e + ')', { type: LOG_TYPES.ERROR })
    }
}