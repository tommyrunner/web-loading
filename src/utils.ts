import { LogConfigType, OptionsType } from './types'

/**
 * 支持的 loading 方式
 */
export enum LOADING_TYPES {
  DOM = 'dom',
  FULL = 'full',
  MINI = 'mini'
}
/**
 * 支持的 model
 */
export enum MODEL_TYPES {
  // 齿轮旋转
  GEAR = 'Gear',
  // 环形旋转
  RING = 'Ring',
  // 图形变形
  ZOOM = 'Zoom',
  // 多图形
  PATTERN = 'Pattern',
  // 时钟
  CLOCK = 'Clock',
  // 吃豆人
  BEAN = 'Bean',
  // 翻滚
  ROLL = 'Roll',
  // 撞击球
  Circular = 'Circular',
  // 图片
  IMG = 'Img',
  // 骨架屏
  SKELETON = 'Skeleton'
}
/**
 *
 * @returns 返回默认配置
 */
export function getDefOptions(): Required<OptionsType> {
  return {
    custom: null,
    html: '',
    type: LOADING_TYPES.DOM,
    miniClass: 'mini',
    model: MODEL_TYPES.GEAR,
    text: '加载中...',
    textGap: 8,
    fontSize: 12,
    fontFamily: 'Microsoft YaHei',
    delay: 65,
    delayColse: 520,
    optimization: false,
    zIndex: '2001',
    themeColor: 'rgba(64,158,255,1)',
    bgColor: 'rgba(0, 0, 0, 0.8)',
    shadowColor: 'rgba(64,158,255,0.6)',
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 5,
    pointerEvents: false
  }
}
export enum HOOKSCALL_KEY {
  BEFORE_COLSE = 'beforeColse',
  COLSED = 'colsed'
}

export enum LOG_TYPES {
  INFO = 1,
  WARN = 2,
  ERROR = 3
}
/**
 * 日志输出
 * @param message 内容
 * @param config 配置
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
    // 警告色不能改变
    if (type === 2) bgColor = '#fffbe5'
    // 错误色不能改变
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
 * 判空
 * @param value 判断值
 * @returns boolean
 */
export function isNull(value: any): value is null | undefined {
  return value === undefined || value === null
}
/**
 * 清空 aniamtions
 * @param id
 */
export function clearAnimationFrame(id: number) {
  if (!window.requestAnimationFrame) {
    window.clearInterval(id)
  } else {
    window.cancelAnimationFrame(id)
  }
}
export function toType(key: any): String | 'not-type' {
  try {
    let type = Object.prototype.toString.call(key)
    let t1 = type.split(' ')[1]
    let t2 = t1.split(']')[0]
    return t2.toLowerCase()
  } catch (e) {
    return 'not-type'
  }
}
