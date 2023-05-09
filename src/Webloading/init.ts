import type { ElementType, HooksCallType, OptionsType } from '../types'
import type { HooksType } from './type'
import { HOOKSCALL_KEY, createLoadingId } from '../utils'
const $window = window
/**
 * Initialize $store
 * @param element Container element
 * @param hooks Hook function
 */
export function initStore(element: ElementType, options: OptionsType, hooks: HooksType) {
  // Storage status
  element.$store = {
    options,
    animationId: undefined,
    loadingId: null,
    model: null,
    hookCall: initStoreHooksCall(hooks)
  }
}
export function initHooksCall(): HooksType {
  return {
    [HOOKSCALL_KEY.BEFORE_COLSE]: [],
    [HOOKSCALL_KEY.COLSED]: []
  }
}
// Initialize hooks
export function initStoreHooksCall(hooks: HooksType): HooksCallType {
  return {
    [HOOKSCALL_KEY.BEFORE_COLSE]: (fun: Function) => {
      hooks[HOOKSCALL_KEY.BEFORE_COLSE].push(fun)
    },
    [HOOKSCALL_KEY.COLSED]: (fun: (params?: any) => any) => {
      hooks[HOOKSCALL_KEY.COLSED].push(fun)
    }
  }
}
export function initCanvas() {
  return {
    canvas: $window.document.createElement('canvas'),
    hooks: initHooksCall(),
    loadingId: createLoadingId()
  }
}

export function initHtml() {
  return {
    content: $window.document.createElement('div'),
    loadingId: createLoadingId()
  }
}
