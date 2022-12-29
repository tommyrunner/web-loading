import type { ElementStoreType, OptionsType } from "../types";
import { $log, LOG_TYPES } from '../utils'
export default function draw(w: number, h: number, canvas: HTMLCanvasElement, options: Required<OptionsType>, store: ElementStoreType): void {
    try {
        if (!options.custom)
            import(`./model/${options.model}.ts`).then(model => {
                new model.default(w, h, canvas, options, store)
            })
        else new options.custom(w, h, canvas, options, store)
    } catch (e) {
        $log('draw error(' + e + ')', { type: LOG_TYPES.ERROR })
    }
}