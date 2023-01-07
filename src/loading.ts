import WebLoading from './Webloading/index'
import type { OptionsType } from './types.d'
import { LOADING_TYPES } from './utils'
export default function loading(dom: HTMLElement, options?: OptionsType) {
  // 默认调用
  let webLoading = new WebLoading(dom, options)
  const resize = () => {
    webLoading.resize()
  }
  const reload = (options?: OptionsType) => {
    // 保留上次传入参数
    let op = Object.assign(webLoading.options, options)
    // 防止重复注册
    if (!webLoading.loadingId) {
      if (op.type !== LOADING_TYPES.DOM) {
        op = Object.assign(op)
      }
      webLoading = new WebLoading(dom, op)
    }
  }
  const close = () => {
    webLoading.close()
  }
  return {
    reload,
    resize,
    close
  }
}
