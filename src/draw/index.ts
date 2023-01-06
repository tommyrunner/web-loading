import type { ElementStoreType, OptionsType } from '../types'
import { $Log } from '../utils'
import models from './model'
export default function drawController(
  w: number,
  h: number,
  canvas: HTMLCanvasElement,
  options: Required<OptionsType>,
  store: ElementStoreType
) {
  try {
    let model = null
    if (!options.custom) model = new (models[options.model] as any)(w, h, canvas, options, store.element.$store)
    else model = new options.custom(w, h, canvas, options, store.element.$store)
    store.model = model
  } catch (e) {
    $Log.error('draw error(' + e + ')')
  }
}
