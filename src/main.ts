import WebLoading from './Webloading/index'
import type { OptionsType, HTMLElementType } from './types.d'
let htmlElement: HTMLElementType = HTMLElement.prototype
htmlElement.loading = function loading(options?: OptionsType) {
  // 默认调用
  let webLoading = new WebLoading(this, options);
  const resize = () => {
    webLoading.resize()
  };
  const reload = (options?: OptionsType) => {
    // 防止重复注册
    if (!webLoading.loadingId) {
      // 保留上次传入参数
      webLoading = new WebLoading(this, Object.assign(webLoading.options, options));
    }
  };
  const close = () => {
    webLoading.close()
  };
  return {
    reload,
    resize,
    close,
  };
};