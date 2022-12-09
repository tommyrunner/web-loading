import WebLoading from './loading/index'
import type { OptionsType } from './types.d'
interface HTMLElementType extends HTMLElement {
  loading?: Function
}
let htmlElement: HTMLElementType = HTMLElement.prototype

htmlElement.loading = function loading(options?: OptionsType) {
  // 默认调用
  let webLoading = new WebLoading(this, options);
  const resize = () => {
    webLoading.resize()
  };
  const reload = () => {
    // 防止重复注册
    if (!webLoading.loadingId) webLoading = new WebLoading(this);
  };
  const close = () => {
    webLoading.close();
  };
  return {
    reload,
    resize,
    close,
  };
};