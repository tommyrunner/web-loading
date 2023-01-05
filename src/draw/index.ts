import type { ElementStoreType, OptionsType } from '../types'
import { $log, LOG_TYPES } from '../utils'
export default function drawController(
  w: number,
  h: number,
  canvas: HTMLCanvasElement,
  options: Required<OptionsType>,
  store: ElementStoreType
) {
  try {
    let model = null
    if (!options.custom)
      import(`./model/${options.model}.ts`).then((model) => {
        model = new model.default(w, h, canvas, options, store.element.$store)
      })
    else model = new options.custom(w, h, canvas, options, store.element.$store)
    store.model = model
  } catch (e) {
    $log('draw error(' + e + ')', { type: LOG_TYPES.ERROR })
  }
}
