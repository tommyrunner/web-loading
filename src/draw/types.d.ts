import { OptionsType } from '../types'
import { PATTERN_CHART, ROLL_CHART, ZOOM_ACTION, CIRCULAR_ACTION } from './utils'

export interface GearOptionsType extends OptionsType {
  // 线端
  lineStart?: number
  // 线末
  lineEnd?: number
  // 线端偏移
  lineStartSkew?: number
  // 线末偏移
  lineEndSkew?: number
  // 线宽度
  lineWidth?: number
  // 线的样式
  lineCap?: CanvasLineCap
  // 线数量
  lineNum?: number
  // 方向:true:顺,则反
  direction?: boolean
}

export interface RingOptionsType extends OptionsType {
  // 环与环空隙
  ringGap?: number
  // 弧线之间间隔
  arcGap?: number
  // 线宽度
  lineWidth?: number
  // 环数量
  ringNum?: number
  // 半径
  radius?: number
  // 线的样式
  lineCap?: CanvasLineCap
  // 旋转角度
  turn?: number
  // 多个环初始角度
  ringsTurn?: Array<number>
  // 方向:true:顺,则反
  direction?: boolean
}

export interface ZoomOptionsType extends OptionsType {
  // zoom变化最大
  maxSize?: number
  // zomm距离
  zoomGap?: number
  // zomm的高度
  zoomHeight?: number
  // zoom数量
  zoomNum?: number
  // zoom的自定义颜色
  zoomColors?: Array<string>
  // 线的样式
  lineCap?: CanvasLineCap
  // 线宽度
  lineWidth?: number
  // 动作
  action: ZOOM_ACTION
  // 方向:true:顺,则反
  direction?: boolean
}
export interface PatternOptionsType extends OptionsType {
  // 支持的图形
  charts?: Array<PATTERN_CHART>
  // 图形大小
  chartSize?: number
  // 动态颜色
  chartColors?: Array<string>
  // 高度
  maxHeight?: number
}
export interface ClockOptionsType extends OptionsType {
  // 文字显示模式:time:年月日，s：秒
  textTime?: 'time' | 's' | ''
  // 指针颜色
  lineColors?: Array<string>
  // 线的样式
  lineCap?: CanvasLineCap
  // 线宽度
  lineWidth?: number
  // clock大小
  clockSize?: number
  // clock 空隙
  clockGap?: number
  // 时分秒指针
  hLine?: boolean
  mLine?: boolean
  sLine?: boolean
}

export interface BeanOptionsType extends OptionsType {
  // bean的大小
  beanSize?: number
  // bean里的point数量
  pointLength?: number
}

export interface RollOptionsType extends OptionsType {
  // Roll直接空隙
  rollGap?: number
  // roll大小
  rollSize?: number
  // 显示影子child
  showChild?: boolean
  // child影子数量
  childNum?: number
  // 显示的图形
  chart?: ROLL_CHART
  // 图形为Windmills时的叶片颜色。
  windmills?: Array<string>
  // windmill 中心颜色
  windmillPointColor?: string
  // 是否中心固定
  fixad?: boolean
}
export interface ImageOptionsType extends OptionsType {
  src?: string
  width?: number
  height?: number
  turn?: boolean
}
export interface SkeletonOptionsType extends OptionsType {
  skeletonColor?: string
  skeletonAnimationColor?: string
  radius?: number
  animation?: boolean
  deep?: boolean
  appoint?: string
  // imgColor: string
  // imgSize: number
}
export interface CircularOptionsType extends OptionsType {
  // arc大小
  arcSize?: number
  // arc空隙
  arcGap?: number
  // 颜色
  arcColors?: Array<string>
  // 动作
  action?: CIRCULAR_ACTION
}
