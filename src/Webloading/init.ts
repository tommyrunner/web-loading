import type { ElementType, HooksCallType, OptionsType } from '../type'
import type { HooksType } from './type'
import { HOOKS_CALL_KEY, createLoadingId } from '../utils'
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
    [HOOKS_CALL_KEY.BEFORE_CLOSE]: [],
    [HOOKS_CALL_KEY.CLOSED]: []
  }
}
// Initialize hooks
export function initStoreHooksCall(hooks: HooksType): HooksCallType {
  return {
    [HOOKS_CALL_KEY.BEFORE_CLOSE]: (fun: Function) => {
      hooks[HOOKS_CALL_KEY.BEFORE_CLOSE].push(fun)
    },
    [HOOKS_CALL_KEY.CLOSED]: (fun: (params?: any) => any) => {
      hooks[HOOKS_CALL_KEY.CLOSED].push(fun)
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
