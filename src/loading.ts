import WebLoading from './Webloading/index'
import ExtendLoading from './ExtendLoading'
import type { OptionsType, LoadingType, ElementType } from './types.d'
import { LOADING_TYPES, getDefOptions, $Log } from './utils'
import drawController from './draw/index'
export default function initLoading(options?: OptionsType): LoadingType {
  const webLoading = new WebLoading(options)
  const resize = () => {
    // canvas
    if (webLoading.element && webLoading.canvas) webLoading.resize(webLoading.element, webLoading.canvas)
    // html
    if (webLoading.element && webLoading.htmlElement) webLoading.resize(webLoading.element, webLoading.htmlElement)
  }
  const loading = (dom: ElementType, options?: OptionsType) => {
    // Keep the last passed in parameter
    const op = Object.assign(webLoading.options, options)
    // Prevent duplicate registration
    if (!webLoading.loadingId) {
      // Create extended dom
      if (op.type !== LOADING_TYPES.DOM) {
        dom = new ExtendLoading(op).getElement() as ElementType
      }
      if (!dom) $Log.error('The loading function cannot find an HTMLElement element!')
      else webLoading.draw(dom)
    }
  }
  const update = (options?: OptionsType) => {
    const canvas = webLoading.canvas
    const op = Object.assign(webLoading.options, options)
    const element = webLoading.element
    if (canvas && op && element && element.$store)
      drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, op, element)
  }
  const close = () => {
    // canvas
    if (webLoading.element && webLoading.canvas) webLoading.close(webLoading.element, webLoading.canvas)
    // html
    if (webLoading.element && webLoading.htmlElement) webLoading.close(webLoading.element, webLoading.htmlElement)
  }
  // Throw basic information
  const getLoadingId = () => webLoading.loadingId
  const getOptions = () => webLoading.options
  return {
    loading,
    resize,
    close,
    update,
    getOptions,
    getLoadingId
  }
}
// Extended Load Method
export function _$extendLoading(type: LOADING_TYPES, options?: OptionsType) {
  return initLoading(Object.assign(getDefOptions(), options || {}, { type }))
}
export function fullLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
export function miniLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
