import { LogConfigType, OptionsType } from './type'
/**
 * @description 支持的加载方法
 * @public
 */
export enum LOADING_TYPES {
  DOM = 'dom',
  FULL = 'full',
  MINI = 'mini'
}
/**
 * @description 支持的模型类型
 * @public
 */
export enum MODEL_TYPES {
  // 齿轮
  GEAR = 'Gear',
  // 环形
  RING = 'Ring',
  // 缩放
  ZOOM = 'Zoom',
  // 图案
  PATTERN = 'Pattern',
  // 时钟
  CLOCK = 'Clock',
  // 豆形
  BEAN = 'Bean',
  // 滚动
  ROLL = 'Roll',
  // 圆形
  CIRCULAR = 'Circular',
  // 图片
  IMG = 'Img',
  // 骨架屏
  SKELETON = 'Skeleton'
}
/**
 * @description 返回默认配置
 * @returns {Required<OptionsType>} 返回默认配置对象
 * @public
 */
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
/**
 * @description 钩子调用键枚举
 * @public
 */
export enum HOOKS_CALL_KEY {
  BEFORE_CLOSE = 'beforeClose',
  CLOSED = 'closed'
}
/**
 * @description 日志类型枚举
 * @public
 */
export enum LOG_TYPES {
  INFO = 1,
  WARN = 2,
  ERROR = 3
}
/**
 * @description 日志输出类
 * @public
 */
export class $Log {
  /**
   * @description 输出信息日志
   * @param {string} message - 日志内容
   */
  static info(message: string) {
    this.call(message, LOG_TYPES.INFO)
  }
  /**
   * @description 输出警告日志
   * @param {string} message - 日志内容
   */
  static warn(message: string) {
    this.call(message, LOG_TYPES.WARN)
  }
  /**
   * @description 输出错误日志
   * @param {string} message - 日志内容
   */
  static error(message: string) {
    this.call(message, LOG_TYPES.ERROR)
  }
  /**
   * @description 调用日志输出
   * @param {string} message - 日志内容
   * @param {LOG_TYPES} type - 日志类型
   * @param {LogConfigType} config - 日志配置
   */
  static call(
    message: string,
    type: LOG_TYPES = LOG_TYPES.INFO,
    config: LogConfigType = {
      color: getDefOptions().themeColor,
      bgColor: getDefOptions().bgColor
    }
  ) {
    let bgColor = config.bgColor
    // 警告颜色不能被更改
    if (type === 2) bgColor = '#fffbe5'
    // 错误颜色不能被更改
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
 * @description 判断值是否为空
 * @param {any} value - 待判断的值
 * @returns {boolean} 返回判断结果
 * @public
 */
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
 * @description 清除动画帧
 * @param {number} id - 动画帧ID
 * @public
 */
export function clearAnimationFrame(id: number) {
  if (!window.requestAnimationFrame) {
    window.clearInterval(id)
  } else {
    window.cancelAnimationFrame(id)
  }
}
/**
 * @description 获取数据类型
 * @param {any} key - 待检测的值
 * @returns {string | 'not-type'} 返回类型字符串
 * @public
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
 * @description 监听动画结束事件
 * @param {HTMLElement} el - 元素
 * @param {Function} fun - 执行函数
 * @public
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
 * @description 创建唯一的loadingID
 * @returns {string} 返回生成的唯一ID
 * @public
 */
export function createLoadingId() {
  let id = String(Date.now())
  if (window.crypto && window.crypto.randomUUID) id = window.crypto.randomUUID()
  return 'wl_' + id.replace(/-/g, '')
}
/**
 * @description 缩放动作枚举
 * @public
 */
export enum ZOOM_ACTION {
  SCALE = 'scale',
  WAVE = 'wave',
  HEIGHT = 'height'
}
/**
 * @description 图案类型枚举
 * @public
 */
export enum PATTERN_CHART {
  RECT = 'rect',
  ARC = 'arc',
  TRIANGLE = 'triangle',
  HEART = 'heart',
  POLYGON = 'polygon'
}
/**
 * @description 滚动图表类型枚举
 * @public
 */
export enum ROLL_CHART {
  RECT = 'rect',
  WHEEL = 'wheel',
  WINDMILL = 'windmill'
}
/**
 * @description 圆形动作枚举
 * @public
 */
export enum CIRCULAR_ACTION {
  COLLISION = 'collision',
  ROTATE = 'rotate'
}
