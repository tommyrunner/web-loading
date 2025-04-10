import { OptionsType } from '../type'
import { PATTERN_CHART, ROLL_CHART, ZOOM_ACTION, CIRCULAR_ACTION } from '../utils'
/**
 * @description 绘制文本参数类型
 * @public
 */
export interface DrawTextParamsType {
  esGap?: number
  x?: number
  text?: string
  textColor?: string
}
/**
 * @description 齿轮模型配置类型
 * @public
 */
export interface GearOptionsType extends OptionsType {
  // 线条起始
  lineStart?: number
  // 线条结束
  lineEnd?: number
  // 线条起始倾斜度
  lineStartSkew?: number
  // 线条结束倾斜度
  lineEndSkew?: number
  // 线条宽度
  lineWidth?: number
  // 线条样式
  lineCap?: CanvasLineCap
  // 线条数量
  lineNum?: number
  // 方向：true-正向，然后逆向
  direction?: boolean
}
/**
 * @description 环形模型配置类型
 * @public
 */
export interface RingOptionsType extends OptionsType {
  // 环形间隔
  ringGap?: number
  // 弧线间隔
  arcGap?: number
  // 线条宽度
  lineWidth?: number
  // 环形数量
  ringNum?: number
  // 半径
  radius?: number
  // 线条样式
  lineCap?: CanvasLineCap
  // 旋转角度
  turn?: number
  // 多个环形的初始角度
  ringsTurn?: Array<number>
  // 方向：true-正向，然后逆向
  direction?: boolean
}
/**
 * @description 缩放模型配置类型
 * @public
 */
export interface ZoomOptionsType extends OptionsType {
  // 缩放最大尺寸
  maxSize?: number
  // 缩放间距
  zoomGap?: number
  // 缩放高度
  zoomHeight?: number
  // 缩放数量
  zoomNum?: number
  // 自定义缩放颜色
  zoomColors?: Array<string>
  // 线条样式
  lineCap?: CanvasLineCap
  // 线条宽度
  lineWidth?: number
  // 动作类型
  action: ZOOM_ACTION
  // 方向：true-正向，然后逆向
  direction?: boolean
}
/**
 * @description 图案模型配置类型
 * @public
 */
export interface PatternOptionsType extends OptionsType {
  // 支持的图形
  charts?: Array<PATTERN_CHART>
  // 图形尺寸大小
  chartSize?: number
  // 动态颜色
  chartColors?: Array<string>
  // 最大高度
  maxHeight?: number
}
/**
 * @description 时钟模型配置类型
 * @public
 */
export interface ClockOptionsType extends OptionsType {
  // 文本显示模式：time-日期时间，s-秒
  textTime?: 'time' | 's' | ''
  // 线条颜色
  lineColors?: Array<string>
  // 线条样式
  lineCap?: CanvasLineCap
  // 线条宽度
  lineWidth?: number
  // 时钟尺寸
  clockSize?: number
  // 时钟间隔
  clockGap?: number
  // 时分秒指针
  hLine?: boolean
  mLine?: boolean
  sLine?: boolean
}
/**
 * @description 豆形模型配置类型
 * @public
 */
export interface BeanOptionsType extends OptionsType {
  // 豆形尺寸
  beanSize?: number
  // 豆形中的点数量
  pointLength?: number
}
/**
 * @description 滚动模型配置类型
 * @public
 */
export interface RollOptionsType extends OptionsType {
  // 滚动间隔
  rollGap?: number
  // 滚动尺寸
  rollSize?: number
  // 显示子元素
  showChild?: boolean
  // 子元素数量
  childNum?: number
  // 显示的图形
  chart?: ROLL_CHART
  // 风车图形时的叶片颜色
  windmills?: Array<string>
  // 风车中心颜色
  windmillPointColor?: string
  // 中心是否固定
  fixed?: boolean
}
/**
 * @description 图片模型配置类型
 * @public
 */
export interface ImageOptionsType extends OptionsType {
  src?: string
  width?: number
  height?: number
  turn?: boolean
}
/**
 * @description 骨架屏模型配置类型
 * @public
 */
export interface SkeletonOptionsType extends OptionsType {
  skeletonColor?: string
  skeletonAnimationColor?: string
  radius?: number
  animation?: boolean
  deep?: boolean
  appointElementClass?: Array<string>
}
/**
 * @description 圆形模型配置类型
 * @public
 */
export interface CircularOptionsType extends OptionsType {
  // 弧线尺寸
  arcSize?: number
  // 弧线间隔
  arcGap?: number
  // 弧线颜色
  arcColors?: Array<string>
  // 动作类型
  action?: CIRCULAR_ACTION
}
