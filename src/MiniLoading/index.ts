import type { OptionsType } from '../types.d'
let $document: Document = document
export default class MiniLoading {
    position: OptionsType
    miniEl: HTMLElement
    constructor(position: OptionsType) {
        this.position = position
        this.miniEl = this.initStyle()
    }
    private initStyle(): HTMLElement {
        this.miniEl = document.createElement('div')
        this.miniEl.classList.add('wl_' + (this.position.miniClass || 'mini'))
        this.miniEl.style.cssText = `
        position:fixed;
        width:180px;
        height:160px;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        border-radius: 10px;
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
    getElement(): HTMLElement {
        return this.miniEl
    }
    clearStyle() {
        this.miniEl.style.boxShadow = 'none'
    }
}