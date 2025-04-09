import { OptionsType } from '../type'
import { PATTERN_CHART, ROLL_CHART, ZOOM_ACTION, CIRCULAR_ACTION } from '../utils'
/** @public */
export interface DrawTextParamsType {
  esGap?: number
  x?: number
  text?: string
  textColor?: string
}
/** @public */
export interface GearOptionsType extends OptionsType {
  // lineStart
  lineStart?: number
  // lineEnd
  lineEnd?: number
  // lineStartSkew
  lineStartSkew?: number
  // lineEndSkew
  lineEndSkew?: number
  // lineWidth
  lineWidth?: number
  // 线的样式
  lineCap?: CanvasLineCap
  // lineNum
  lineNum?: number
  // Direction: true: positive, then negative
  direction?: boolean
}
/** @public */
export interface RingOptionsType extends OptionsType {
  // Annular space
  ringGap?: number
  // Interval between arcs
  arcGap?: number
  // lineWidth
  lineWidth?: number
  // ringNum
  ringNum?: number
  // radius
  radius?: number
  // lineCap
  lineCap?: CanvasLineCap
  // Rotation angle
  turn?: number
  // Initial angle of multiple rings
  ringsTurn?: Array<number>
  // Direction: true: positive, then negative
  direction?: boolean
}
/** @public */
export interface ZoomOptionsType extends OptionsType {
  // Zoom changes the most
  maxSize?: number
  // Zoom distance
  zoomGap?: number
  // Height of zomm
  zoomHeight?: number
  // zoomNum
  zoomNum?: number
  // Custom colors for zoom
  zoomColors?: Array<string>
  // lineCap
  lineCap?: CanvasLineCap
  // lineWidth
  lineWidth?: number
  // action
  action: ZOOM_ACTION
  // Direction: true: positive, then negative
  direction?: boolean
}
/** @public */
export interface PatternOptionsType extends OptionsType {
  // Supported graphics
  charts?: Array<PATTERN_CHART>
  // largeness of the shape of the figure
  chartSize?: number
  // Dynamic color
  chartColors?: Array<string>
  // maxHeight
  maxHeight?: number
}
/** @public */
export interface ClockOptionsType extends OptionsType {
  // Text display mode: time: mm/dd/yy, s: sec
  textTime?: 'time' | 's' | ''
  // lineColors
  lineColors?: Array<string>
  // lineCap
  lineCap?: CanvasLineCap
  // lineWidth
  lineWidth?: number
  // clockSize
  clockSize?: number
  // clockGap
  clockGap?: number
  // Hour minute second pointer
  hLine?: boolean
  mLine?: boolean
  sLine?: boolean
}
/** @public */
export interface BeanOptionsType extends OptionsType {
  // beanSize
  beanSize?: number
  // The number of points in the bean
  pointLength?: number
}
/** @public */
export interface RollOptionsType extends OptionsType {
  // rollGap
  rollGap?: number
  // rollSize
  rollSize?: number
  // showChild
  showChild?: boolean
  // childNum
  childNum?: number
  // Displayed graphics
  chart?: ROLL_CHART
  // The blade color when the graph is Windmills.
  windmills?: Array<string>
  // Windmill center color
  windmillPointColor?: string
  // Center fixed or not
  fixed?: boolean
}
/** @public */
export interface ImageOptionsType extends OptionsType {
  src?: string
  width?: number
  height?: number
  turn?: boolean
}
/** @public */
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
/** @public */
export interface CircularOptionsType extends OptionsType {
  // arcSize
  arcSize?: number
  // arcGap
  arcGap?: number
  // arcColors
  arcColors?: Array<string>
  // action
  action?: CIRCULAR_ACTION
}
