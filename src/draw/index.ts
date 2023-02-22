import type { ElementType, OptionsType } from '../types'
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
    // if (!element.$store.model) {
      // 已经存在model，优化缓存
      let model = null
      if (!options.custom) model = new (models[options.model] as typeof BaseModel)(w, h, canvas, options, element)
      else model = new options.custom(w, h, canvas, options, element)
      element.$store.model = model
    // } else {
    //   // Because canvas will be reset after changing height and width, initialization is required
    //   // element.$store.model.$initBase(void 0, void 0, void 0, w, h, canvas, options, element)
    // }
  } catch (e) {
    $Log.error('draw error(' + e + ')')
  }
}
