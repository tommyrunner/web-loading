import type { ElementType, OptionsType } from '../type'
import { $Log } from '../utils'
import models from './model'
import BaseModel from './model/BaseModel'
/**
 * Model controller: which controls the displayed model
 * @param w
 * @param h
 * @param canvas
 * @param options
 * @param element
 */
export default function drawController(
  w: number,
  h: number,
  canvas: HTMLCanvasElement,
  options: Required<OptionsType>,
  element: ElementType
) {
  try {
    let storeModel = element.$store.model
    if (!storeModel) {
      let model = null
      if (!options.custom) model = new (models[options.model] as typeof BaseModel)(w, h, canvas, options, element)
      else model = new options.custom(w, h, canvas, options, element)
      storeModel = model
    } else {
      // Optimize:Because canvas will be reset after changing height and width, initialization is required
      storeModel.initContextCall(storeModel.modelDefOptions, storeModel.limits, storeModel.modelDefCall)
    }
  } catch (e) {
    $Log.error('draw error(' + e + ')')
  }
}
