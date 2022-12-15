import { LogConfigType } from "./types"

/**
 * 支持的 model
 */
export enum MODEL_TYPES {
    GEAR = 'Gear',
    RING = 'Ring'
}
/**
 * 
 * @returns 返回默认配置
 */
export function getDefOptions() {
    return {
        model: MODEL_TYPES.RING,
        delayColse: 0.26,
        optimization: false,
        zIndex: "2001",
        themeColor: "rgba(64,158,255,1)",
        bgColor: "rgba(0, 0, 0, 0.8)",
        delay: 80
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
}): void {
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