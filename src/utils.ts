import { LogConfigType, OptionsType } from './type'
/**
 * Supported loading methods
 */
/** @public */
export enum LOADING_TYPES {
  DOM = 'dom',
  FULL = 'full',
  MINI = 'mini'
}
/**
 * Supported models
 */
/** @public */
export enum MODEL_TYPES {
  // Gear
  GEAR = 'Gear',
  // RING
  RING = 'Ring',
  // ZOOM
  ZOOM = 'Zoom',
  // PATTERN
  PATTERN = 'Pattern',
  // CLOCK
  CLOCK = 'Clock',
  // BEAN
  BEAN = 'Bean',
  // ROLL
  ROLL = 'Roll',
  // CIRCULAR
  CIRCULAR = 'Circular',
  // IMG
  IMG = 'Img',
  // SKELETON
  SKELETON = 'Skeleton'
}
/**
 *
 * @returns Return to default configuration
 */
/** @public */
export function getDefOptions(): Required<OptionsType> {
  return {
    custom: null,
    html: '',
    type: LOADING_TYPES.DOM,
    extendClass: 'extend',
    model: MODEL_TYPES.GEAR,
    text: '加载中...',
    textGap: 8,
    fontSize: 12,
    fontFamily: 'Microsoft YaHei',
    delay: 65,
    notFeel: 0,
    delayInto: 320,
    optimization: false,
    zIndex: '2001',
    themeColor: 'rgba(64,158,255,1)',
    bgColor: 'rgba(0, 0, 0, 0.8)',
    shadowColor: 'rgba(64,158,255,0.6)',
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 5,
    pointerEvents: false,
    toast: true
  }
}
/** @public */
export enum HOOKS_CALL_KEY {
  BEFORE_CLOSE = 'beforeClose',
  CLOSED = 'closed'
}
/** @public */
export enum LOG_TYPES {
  INFO = 1,
  WARN = 2,
  ERROR = 3
}
/**
 * Log output
 * @param message - content
 * @param config - to configure
 */
export class $Log {
  static info(message: string) {
    this.call(message, LOG_TYPES.INFO)
  }
  static warn(message: string) {
    this.call(message, LOG_TYPES.WARN)
  }
  static error(message: string) {
    this.call(message, LOG_TYPES.ERROR)
  }
  static call(
    message: string,
    type: LOG_TYPES = LOG_TYPES.INFO,
    config: LogConfigType = {
      color: getDefOptions().themeColor,
      bgColor: getDefOptions().bgColor
    }
  ) {
    let bgColor = config.bgColor
    // Warning color cannot be changed
    if (type === 2) bgColor = '#fffbe5'
    // The wrong color cannot be changed
    if (type === 3) bgColor = '#fff0f0'
    const style = `
      background:${bgColor};
      font-size:14px;
      color:${config.color};
      padding: 4px;
      border: 1px solid;`
    console.log(`%c web-loading:${message} `, style)
  }
}
/**
 * Judge null
 * @param value - Judgment value
 * @returns boolean
 */
/** @function */
export function isNull(value: any): value is boolean | Function {
  switch (toType(value)) {
    case 'object':
      return Object.keys(value).length > 0
    case 'array':
      return value.length > 0
    case 'undefined':
      return value !== undefined
    case 'null':
      return value !== null
    default:
      return value !== undefined
  }
}
/**
 * Empty animation
 * @param id -
 */
/** @function */
export function clearAnimationFrame(id: number) {
  if (!window.requestAnimationFrame) {
    window.clearInterval(id)
  } else {
    window.cancelAnimationFrame(id)
  }
}
/**
 * Type acquisition
 * @param key -
 * @returns
 */
export function toType(key: any): string | 'not-type' {
  try {
    const type = Object.prototype.toString.call(key)
    const t1 = type.split(' ')[1]
    const t2 = t1.split(']')[0]
    return t2.toLowerCase()
  } catch (e) {
    return 'not-type'
  }
}
/**
 * Listening to animation end function
 * @param el - element
 * @param fun - Execute Function
 */
export function onTransitionEndEvent(el: HTMLElement, fun: Function) {
  let transitionsName: string | null = null
  const transitions: { [key in string]: string } = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  }
  for (const t in transitions) {
    if (el.style[t as any] !== undefined) {
      transitionsName = transitions[t]
      break
    }
  }
  if (!transitionsName) {
    fun()
  } else {
    const transitionFun = () => {
      fun()
      el.removeEventListener(transitionsName as string, transitionFun)
    }
    el.addEventListener(transitionsName, transitionFun)
  }
}
/**
 * Create a unique loadingid
 * @returns
 */
export function createLoadingId() {
  let id = String(Date.now())
  if (window.crypto && window.crypto.randomUUID) id = window.crypto.randomUUID()
  return 'wl_' + id.replace(/-/g, '')
}
/** @public */
export enum ZOOM_ACTION {
  SCALE = 'scale',
  WAVE = 'wave',
  HEIGHT = 'height'
}
/** @public */
export enum PATTERN_CHART {
  RECT = 'rect',
  ARC = 'arc',
  TRIANGLE = 'triangle',
  HEART = 'heart',
  POLYGON = 'polygon'
}
/** @public */
export enum ROLL_CHART {
  RECT = 'rect',
  WHEEL = 'wheel',
  WINDMILL = 'windmill'
}
/** @public */
export enum CIRCULAR_ACTION {
  COLLISION = 'collision',
  ROTATE = 'rotate'
}
