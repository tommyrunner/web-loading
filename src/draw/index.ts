import type { ElementType, OptionsType } from '../type'
import { $Log } from '../utils'
import models from './model'
import BaseModel from './model/BaseModel'
/**
 * @description 模型控制器：控制显示的模型
 * @param {number} w - 宽度
 * @param {number} h - 高度
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {Required<OptionsType>} options - 配置选项
 * @param {ElementType} element - 元素
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
      // 优化：因为更改高度和宽度后canvas会被重置，需要重新初始化
      storeModel.initContextCall(storeModel.modelDefOptions, storeModel.limits, storeModel.modelDefCall)
    }
  } catch (e) {
    $Log.error('draw error(' + e + ')')
  }
}
