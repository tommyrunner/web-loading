import type { ElementType, OptionsType } from '../types'
import { $Log } from '../utils'
import models from './model'
export default function drawController(
  w: number,
  h: number,
  canvas: HTMLCanvasElement,
  options: Required<OptionsType>,
  element: ElementType
) {
  try {
    let model = null
    if (!options.custom) model = new (models[options.model] as any)(w, h, canvas, options, element)
    else model = new options.custom(w, h, canvas, options, element)
    element.$store.model = model
  } catch (e) {
    $Log.error('draw error(' + e + ')')
  }
}
