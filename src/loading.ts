import WebLoading from './Webloading/index'
import ExtendLoading from './ExtendLoading'
import type { OptionsType, LoadingType, ElementType } from './type'
import { LOADING_TYPES, getDefOptions, $Log } from './utils'
import drawController from './draw/index'
const $window = window
/** @public */
export default function initLoading(options?: OptionsType): LoadingType {
  const webLoading = new WebLoading(options)
  let feelPromiseResolve: ((value: boolean | PromiseLike<boolean>) => void) | null = null
  const resize = () => {
    utlWL('resize')
  }
  const loading = (dom: ElementType, options?: OptionsType) => {
    // Keep the last passed in parameter
    const op = Object.assign(webLoading.options, options)
    // Prevent duplicate registration
    if (!webLoading.loadingId && !feelPromiseResolve) {
      // Create extended dom
      if (op.type !== LOADING_TYPES.DOM) {
        dom = new ExtendLoading(op).getElement() as ElementType
      }
      if (!dom) $Log.error('The loading function cannot find an HTMLElement element!')
      else {
        // Processing Senseless Loading through rece
        const loadingPromise = new Promise<boolean>((res) => {
          // If the time of notFeed exceeds the close time, it is considered as an insensitive load
          $window.setTimeout(() => {
            res(true)
          }, op.notFeel)
        })
        const feelPromise = new Promise<boolean>((res) => {
          feelPromiseResolve = res
        })
        Promise.race([loadingPromise, feelPromise]).then((res) => {
          if (res) webLoading.draw(dom)
          else {
            // Process extended dom
            if (op.type !== LOADING_TYPES.DOM) dom.remove()
          }
          feelPromiseResolve = null
        })
      }
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
    feelPromiseResolve && feelPromiseResolve(false)
    utlWL('close')
  }
  // Throw basic information
  const getLoadingId = () => webLoading.loadingId
  const getOptions = () => webLoading.options
  // WebLoading operation
  function utlWL(key: 'resize' | 'close') {
    if (webLoading.element) {
      // canvas
      let temEl: HTMLCanvasElement | HTMLDivElement | null = webLoading.canvas
      // html
      if (webLoading.htmlElement) temEl = webLoading.htmlElement
      // set up
      if (temEl) webLoading[key](webLoading.element, temEl)
      else $Log.warn('Animation element not found!')
    }
  }
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
/** @public */
export function fullLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
/** @public */
export function miniLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
