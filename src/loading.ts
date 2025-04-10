import WebLoading from './WebLoading/index'
import ExtendLoading from './ExtendLoading'
import type { OptionsType, LoadingType, ElementType } from './type'
import { LOADING_TYPES, getDefOptions, $Log } from './utils'
import drawController from './draw/index'
const $window = window
/**
 * @description 初始化加载动画
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
export default function initLoading(options?: OptionsType): LoadingType {
  const webLoading = new WebLoading(options)
  let feelPromiseResolve: ((value: boolean | PromiseLike<boolean>) => void) | null = null
  const resize = () => {
    utlWL('resize')
  }
  const loading = (dom: ElementType, options?: OptionsType) => {
    // 保存最后传入的参数
    const op = Object.assign(webLoading.options, options)
    // 防止重复注册
    if (!webLoading.loadingId && !feelPromiseResolve) {
      // 创建扩展DOM
      if (op.type !== LOADING_TYPES.DOM) {
        dom = new ExtendLoading(op).getElement() as ElementType
      }
      if (!dom) $Log.error('The loading function cannot find an HTMLElement element!')
      else {
        // 通过Promise.race处理无感加载
        const loadingPromise = new Promise<boolean>((res) => {
          // 如果notFeel的时间超过关闭时间，则认为是无感加载
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
            // 处理扩展DOM
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
  // 获取基本信息
  const getLoadingId = () => webLoading.loadingId
  const getOptions = () => webLoading.options
  // WebLoading操作工具函数
  function utlWL(key: 'resize' | 'close') {
    if (webLoading.element) {
      // canvas元素
      let temEl: HTMLCanvasElement | HTMLDivElement | null = webLoading.canvas
      // html元素
      if (webLoading.htmlElement) temEl = webLoading.htmlElement
      // 设置
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
/**
 * @description 扩展加载方法
 * @param {LOADING_TYPES} type - 加载类型
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @private
 */
export function _$extendLoading(type: LOADING_TYPES, options?: OptionsType) {
  return initLoading(Object.assign(getDefOptions(), options || {}, { type }))
}
/**
 * @description 全屏加载
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
export function fullLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.FULL, options)
}
/**
 * @description 迷你加载
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
export function miniLoading(options?: OptionsType) {
  return _$extendLoading(LOADING_TYPES.MINI, options)
}
