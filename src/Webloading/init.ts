import type { ElementType, HooksCallType, OptionsType } from '../type'
import type { HooksType } from './type'
import { HOOKS_CALL_KEY, createLoadingId } from '../utils'
const $window = window
/**
 * @description 初始化$store
 * @param {ElementType} element - 容器元素
 * @param {OptionsType} options - 配置选项
 * @param {HooksType} hooks - 钩子函数
 */
export function initStore(element: ElementType, options: OptionsType, hooks: HooksType) {
  // 存储状态
  element.$store = {
    options,
    animationId: undefined,
    loadingId: null,
    model: null,
    hookCall: initStoreHooksCall(hooks)
  }
}
/**
 * @description 初始化钩子调用
 * @returns {HooksType} 钩子类型对象
 */
export function initHooksCall(): HooksType {
  return {
    [HOOKS_CALL_KEY.BEFORE_CLOSE]: [],
    [HOOKS_CALL_KEY.CLOSED]: []
  }
}
/**
 * @description 初始化存储钩子调用
 * @param {HooksType} hooks - 钩子
 * @returns {HooksCallType} 钩子调用类型
 */
export function initStoreHooksCall(hooks: HooksType): HooksCallType {
  return {
    [HOOKS_CALL_KEY.BEFORE_CLOSE]: (fun: (params?: any) => any) => {
      hooks[HOOKS_CALL_KEY.BEFORE_CLOSE].push(fun)
    },
    [HOOKS_CALL_KEY.CLOSED]: (fun: (params?: any) => any) => {
      hooks[HOOKS_CALL_KEY.CLOSED].push(fun)
    }
  }
}
/**
 * @description 初始化Canvas
 * @returns {{canvas: HTMLCanvasElement, hooks: HooksType, loadingId: string}} Canvas初始化对象
 */
export function initCanvas() {
  return {
    canvas: $window.document.createElement('canvas'),
    hooks: initHooksCall(),
    loadingId: createLoadingId()
  }
}
/**
 * @description 初始化HTML
 * @returns {{content: HTMLDivElement, loadingId: string}} HTML初始化对象
 */
export function initHtml() {
  return {
    content: $window.document.createElement('div'),
    loadingId: createLoadingId()
  }
}
