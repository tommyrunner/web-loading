import { OptionsType } from "../types";
import { PATTERN_CHART, ROLL_CHART, ZOOM_ACTION } from './utils'

export interface GearOptionsType extends OptionsType {
    // 线端
    lineStart?: number
    // 线端偏移
    lineStartSkew?: number
    // 线末
    lineEnd?: number
    // 线末偏移
    lineEndSkew?: number
    // 线宽度
    lineWidth?: number
    // 线的样式
    lineCap?: CanvasLineCap
    // 线个数
    lineNum?: number
    // 方向:true:顺,则反
    direction?: boolean
}


export interface RingOptionsType extends OptionsType {
    // 环与环空隙
    ringGap?: number
    // 弧线之间间隔
    arcGap?: number
    // 环个数
    ringNum?: number
    // 半径
    radius?: number
    // 线的样式
    lineCap?: CanvasLineCap
    // 线宽度
    lineWidth?: number
    // 每次旋转角度
    turn?: number
    // 每个环不同角度
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
    // 环个数
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
    // 颜色
    chartColors?: Array<string>
    // 高度
    maxHeight?: number

}
export interface ClockOptionsType extends OptionsType {
    // 计时
    textTime: boolean
    // 颜色
    lineColors?: Array<string>
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
    beanSize?: number
    pointLength?: number
}

export interface RollOptionsType extends OptionsType {
    // Roll直接空隙
    rollGap?: number
    // roll大小
    rollSize?: number
    // 是否现实child
    showChild?: boolean
    // child 个数
    childNum?: number
    // chart 
    chart?: ROLL_CHART
    // Windmills 颜色并增加
    windmills?: Array<string>
    // windmill 中心颜色
    windmillPointColor?: string
    // 是否固定
    fixad?: boolean
}
export interface ImageOptionsType extends OptionsType {
    src?: string
    width?: number
    height?: number
    turn?: boolean
}