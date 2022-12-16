import type { ElementStoreType, OptionsType } from "../types";
import { $log, LOG_TYPES } from '../utils'
export default function draw(w: number, h: number, canvas: HTMLCanvasElement, options: OptionsType, store: ElementStoreType): void {
    try {
        let Model = require(`./model/${options.model}.ts`).default
        new Model(w, h, canvas, options, store)
    } catch (e) {
        $log('draw error(' + e + ')', { type: LOG_TYPES.ERROR })
    }
}