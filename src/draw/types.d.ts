import { OptionsType } from "../types";

export interface GearOptionsType extends OptionsType {
    // 字体大小
    fontSize?: number
    // 字体
    fontFamily?: string
    // 加载文字
    text?: string
    // 加载文字与加载动画空隙
    textInterval?: number
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
    // 延迟
    delay?: number
}