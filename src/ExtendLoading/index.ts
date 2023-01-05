import { HTMLElementType, OptionsType } from '../types'
import { LOADING_TYPES } from '../utils'

let $document: Document = document
export default class ExtendLoading {
  miniEl: HTMLElement
  options?: OptionsType
  constructor(options?: OptionsType) {
    this.options = options
    this.miniEl = this.initStyle()
  }
  private initStyle(): HTMLElementType {
    this.miniEl = document.createElement('div')
    let op = this.options
    let w = '100vw',
      h = '100vh',
      borderRadius = '0px'
    if (op) {
      this.miniEl.classList.add('wl_' + (op.miniClass || 'mini'))
      if (op.type === LOADING_TYPES.MINI) {
        w = '180px'
        h = '160px'
        borderRadius = '10px'
      }
    }
    this.miniEl.style.cssText = `
        position:fixed;
        width:${w};
        height:${h};
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        border-radius: ${borderRadius};
        box-shadow:
        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07)
        ;
    `
    $document.body.appendChild(this.miniEl)
    return this.miniEl
  }
  getElement(): HTMLElementType {
    return this.miniEl
  }
  clearStyle() {
    this.miniEl.style.boxShadow = 'none'
  }
}
