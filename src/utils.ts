import { LogConfigType, OptionsType } from "./types"

/**
 * 支持的 loading 方式
 */
export enum LOADING_TYPES {
    DEF = 'def',
    MINI = 'mini',
}
/**
 * 支持的 model
 */
export enum MODEL_TYPES {
    GEAR = 'Gear',
    RING = 'Ring',
    Zoom = 'Zoom',
    PATTERN = 'Pattern',
    CLOCK = 'Clock',
    BEAN = 'Bean',
    ROLL = 'Roll',
    IMG = 'Img',
    SKELETON = 'Skeleton',
}
/**
 * 
 * @returns 返回默认配置
 */
export function getDefOptions(): Required<OptionsType> {
    return {
        custom: null,
        type: LOADING_TYPES.DEF,
        model: MODEL_TYPES.RING,
        miniClass: 'mini',
        delayColse: 520,
        optimization: false,
        zIndex: "2001",
        themeColor: "rgba(64,158,255,1)",
        bgColor: "rgba(0, 0, 0, 0.8)",
        shadowColor: 'rgba(64,158,255,0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 5,
        delay: 65,
        text: '加载中...',
        textGap: 8,
        fontSize: 12,
        fontFamily: 'Microsoft YaHei'
    }
}
export enum LOG_TYPES {
    INFO = 1, WARN = 2, ERROR = 3
}
/**
 * 日志输出
 * @param message 内容
 * @param config 配置
 */
export function $log(message: string, config: LogConfigType = {
    type: LOG_TYPES.INFO, color: getDefOptions().themeColor, bgColor: getDefOptions().bgColor
}) {
    let bgColor = config.bgColor
    // 警告色不能改变
    if (config.type === 2) bgColor = '#fffbe5'
    // 错误色不能改变
    if (config.type === 3) bgColor = '#fff0f0'
    let style = `
    background:${bgColor};
    font-size:14px;
    color:${config.color};
    border: 1px solid;`;
    console.log(`%c web-loading:${message} `, style);

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