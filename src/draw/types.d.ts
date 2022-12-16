import { OptionsType } from "../types";

export interface GearOptionsType extends OptionsType {
    // 字体大小
    fontSize?: number
    // 字体
    fontFamily?: string
    // 加载文字
    text?: string
    // 加载文字与加载动画空隙
    textGap?: number
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
    // 字体大小
    fontSize?: number
    // 字体
    fontFamily?: string
    // 加载文字
    text?: string
    // 加载文字与加载动画空隙
    textGap?: number
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
    // 字体大小
    fontSize?: number
    // 字体
    fontFamily?: string
    // 加载文字
    text?: string
    // 加载文字与加载动画空隙
    textGap?: number
    // 环与环空隙
    ringGap?: number
    // 弧线之间间隔
    arcGap?: number
    // 环个数
    zoomNum?: number
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