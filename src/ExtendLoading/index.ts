import { OptionsType } from '../type'
import { LOADING_TYPES } from '../utils'
const $window = window
/**
 * @description 扩展加载类
 */
export default class ExtendLoading {
  extendEl: HTMLElement
  options?: OptionsType
  /**
   * @description 构造函数
   * @param {OptionsType} [options] - 配置选项
   */
  constructor(options?: OptionsType) {
    this.options = options
    this.extendEl = this.initStyle()
  }
  /**
   * @description 初始化扩展容器元素样式
   * @returns {HTMLElement} 扩展容器元素
   * @private
   */
  private initStyle(): HTMLElement {
    this.extendEl = $window.document.createElement('div')
    const op = this.options
    let w = '100vw',
      h = '100vh',
      borderRadius = '0px'
    if (op) {
      this.extendEl.classList.add('wl_' + (op.extendClass || 'loading'))
      if (op.type === LOADING_TYPES.MINI) {
        w = '180px'
        h = '160px'
        borderRadius = '10px'
      }
      this.extendEl.style.cssText = `
          position:fixed;
          width:${w};
          height:${h};
          top:50%;
          left:50%;
          transform:translate(-50%, -50%);
          border-radius: ${borderRadius};
          z-index: ${op.zIndex};
          box-shadow:
          2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
          6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
          12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
          22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
          41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
          100px 100px 80px rgba(0, 0, 0, 0.07)
          ;
      `
    }
    $window.document.body.appendChild(this.extendEl)
    return this.extendEl
  }
  /**
   * @description 获取元素
   * @returns {HTMLElement} 扩展容器元素
   */
  getElement(): HTMLElement {
    return this.extendEl
  }
}
