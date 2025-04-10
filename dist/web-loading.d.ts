/**
 * @packageDocumentation
 * @description 包文档说明
 */

/**
 * @description 日志输出类
 * @public
 */
declare class $Log {
    /**
     * @description 输出信息日志
     * @param {string} message - 日志内容
     */
    static info(message: string): void;
    /**
     * @description 输出警告日志
     * @param {string} message - 日志内容
     */
    static warn(message: string): void;
    /**
     * @description 输出错误日志
     * @param {string} message - 日志内容
     */
    static error(message: string): void;
    /**
     * @description 调用日志输出
     * @param {string} message - 日志内容
     * @param {LOG_TYPES} type - 日志类型
     * @param {LogConfigType} config - 日志配置
     */
    static call(message: string, type?: LOG_TYPES, config?: LogConfigType): void;
}

/**
 * @description 基础模型类
 * @public
 */
export declare class BaseModel<T extends OptionsType> {
    w: number;
    h: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    options: Required<T>;
    element: ElementType;
    modelDefOptions: T | undefined;
    limits: Array<LimitType> | undefined;
    modelDefCall: ((model: BaseModel<T>) => void) | undefined;
    webLog: $Log;
    private stepClear;
    /**
     * @description 自定义基础模型
     * @param {number} w - Canvas宽度
     * @param {number} h - Canvas高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<T>} options - 配置选项
     * @param {ElementType} element - 容器元素
     * @param {T} [modelDefOptions] - 模型默认选项（可选）
     * @param {Array<LimitType>} [limits] - 模型默认限制（可选）
     * @param {Function} [modelDefCall] - 提供模型初始化的回调函数，通常在模型中初始化"canvas"或"画笔"（可选）
     */
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<T>, element: ElementType, modelDefOptions?: T, limits?: Array<LimitType>, modelDefCall?: (model: BaseModel<T>) => void);
    private _$initBaseContext;
    private _$initEvent;
    /**
     * @description 封装requestAnimationFrame触发动画针
     * @param {Function} fun - 触发函数
     * @private
     */
    private _$animationFrame;
    /**
     * @description 初始化画笔属性
     * @param {T} [modelDefOptions] - 提供模型初始化的选项
     * @param {Array<LimitType>} [limits] - 提供模型初始化的限制
     * @param {Function} [modelDefCall] - 提供模型初始化的回调函数
     */
    initContextCall(modelDefOptions?: T, limits?: Array<LimitType>, modelDefCall?: (model: BaseModel<T>) => void): void;
    /**
     * @description 开始动画
     * @param {Function} fun - 动画函数
     */
    run(fun: Function): void;
    /**
     * @description 取消animationFrame动画针
     * @param {number} id - 动画ID
     */
    clearAnimationFrame(id: number): void;
    /**
     * @description 清空画布
     * @param {number} [x] - x坐标
     * @param {number} [y] - y坐标
     * @param {number} [w_r] - 宽度或半径
     * @param {number} [h] - 高度
     */
    clearRect(x?: number, y?: number, w_r?: number, h?: number): void;
    /**
     * @description 绘制圆角矩形
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {number} r - 圆角半径
     */
    drawRadiusRect(x: number, y: number, w: number, h: number, r: number): void;
    /**
     * @description 绘制文本
     * @param {DrawTextParamsType} [params] - 文本参数
     * DrawTextParamsType:
     *    esGap?: 额外空隙
     *    x?: X轴位置
     *    text?: 文本内容
     *    textColor?: 文本颜色
     */
    drawText(params?: DrawTextParamsType): void;
}

/**
 * @description 豆形模型配置类型
 * @public
 */
export declare interface BeanOptionsType extends OptionsType {
    beanSize?: number;
    pointLength?: number;
}

/**
 * @description 圆形动作枚举
 * @public
 */
export declare enum CIRCULAR_ACTION {
    COLLISION = "collision",
    ROTATE = "rotate"
}

/**
 * @description 圆形模型配置类型
 * @public
 */
export declare interface CircularOptionsType extends OptionsType {
    arcSize?: number;
    arcGap?: number;
    arcColors?: Array<string>;
    action?: CIRCULAR_ACTION;
}

/**
 * @description 时钟模型配置类型
 * @public
 */
export declare interface ClockOptionsType extends OptionsType {
    textTime?: 'time' | 's' | '';
    lineColors?: Array<string>;
    lineCap?: CanvasLineCap;
    lineWidth?: number;
    clockSize?: number;
    clockGap?: number;
    hLine?: boolean;
    mLine?: boolean;
    sLine?: boolean;
}

/**
 * @description 绘制文本参数类型
 * @public
 */
export declare interface DrawTextParamsType {
    esGap?: number;
    x?: number;
    text?: string;
    textColor?: string;
}

/**
 * @description 元素存储类型接口
 * @public
 */
export declare interface ElementStoreType {
    options: OptionsType;
    animationId: number | undefined;
    loadingId: string | null;
    hookCall: HooksCallType;
    model: BaseModel<OptionsType> | null;
}

/**
 * @description 元素类型接口
 * @public
 */
export declare interface ElementType extends HTMLElement {
    loadingId?: string | null;
    $store: ElementStoreType;
}

/**
 * @description 全屏加载
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
export declare function fullLoading(options?: OptionsType): LoadingType;

/**
 * @description 齿轮模型配置类型
 * @public
 */
export declare interface GearOptionsType extends OptionsType {
    lineStart?: number;
    lineEnd?: number;
    lineStartSkew?: number;
    lineEndSkew?: number;
    lineWidth?: number;
    lineCap?: CanvasLineCap;
    lineNum?: number;
    direction?: boolean;
}

/**
 * @description 钩子调用键枚举
 * @public
 */
export declare enum HOOKS_CALL_KEY {
    BEFORE_CLOSE = "beforeClose",
    CLOSED = "closed"
}

/**
 * @description 钩子调用类型
 * 映射键是枚举
 */
declare type HooksCallType<T extends string = HOOKS_CALL_KEY> = {
    [key in T]: Function;
};

/**
 * @description 图片模型配置类型
 * @public
 */
export declare interface ImageOptionsType extends OptionsType {
    src?: string;
    width?: number;
    height?: number;
    turn?: boolean;
}

/**
 * @description 初始化加载动画
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
export declare function initLoading(options?: OptionsType): LoadingType;

/**
 * @description 限制类型接口
 * @public
 */
export declare interface LimitType {
    key: string;
    message: string;
    limit: (key: any) => boolean;
}

/**
 * @description 支持的加载方法
 * @public
 */
export declare enum LOADING_TYPES {
    DOM = "dom",
    FULL = "full",
    MINI = "mini"
}

/**
 * @description 加载类型接口
 * @public
 */
export declare interface LoadingType {
    loading: Function;
    resize: Function;
    close: Function;
    update: Function;
    getOptions: () => OptionsType;
    getLoadingId: () => string | null;
}

/**
 * @description 日志类型枚举
 * @public
 */
export declare enum LOG_TYPES {
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

/**
 * @description 日志配置类型
 * @public
 */
export declare type LogConfigType = {
    color?: string;
    bgColor?: string;
};

/**
 * @description 迷你加载
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
export declare function miniLoading(options?: OptionsType): LoadingType;

/**
 * @description 支持的模型类型
 * @public
 */
export declare enum MODEL_TYPES {
    GEAR = "Gear",
    RING = "Ring",
    ZOOM = "Zoom",
    PATTERN = "Pattern",
    CLOCK = "Clock",
    BEAN = "Bean",
    ROLL = "Roll",
    CIRCULAR = "Circular",
    IMG = "Img",
    SKELETON = "Skeleton"
}

/**
 * @description 配置选项接口
 * @public
 */
export declare interface OptionsType {
    custom?: typeof BaseModel | null;
    type?: LOADING_TYPES;
    extendClass?: string | null | undefined;
    model?: MODEL_TYPES;
    html?: string;
    text?: string;
    textGap?: number;
    fontSize?: number;
    fontFamily?: string;
    delay?: number;
    delayInto?: number;
    notFeel?: number;
    optimization?: boolean;
    zIndex?: string;
    themeColor?: string;
    bgColor?: string;
    shadowColor?: string;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowBlur?: number;
    pointerEvents?: boolean;
    toast?: boolean;
}

/**
 * @description 图案类型枚举
 * @public
 */
export declare enum PATTERN_CHART {
    RECT = "rect",
    ARC = "arc",
    TRIANGLE = "triangle",
    HEART = "heart",
    POLYGON = "polygon"
}

/**
 * @description 图案模型配置类型
 * @public
 */
export declare interface PatternOptionsType extends OptionsType {
    charts?: Array<PATTERN_CHART>;
    chartSize?: number;
    chartColors?: Array<string>;
    maxHeight?: number;
}

/**
 * @description 环形模型配置类型
 * @public
 */
export declare interface RingOptionsType extends OptionsType {
    ringGap?: number;
    arcGap?: number;
    lineWidth?: number;
    ringNum?: number;
    radius?: number;
    lineCap?: CanvasLineCap;
    turn?: number;
    ringsTurn?: Array<number>;
    direction?: boolean;
}

/**
 * @description 滚动图表类型枚举
 * @public
 */
export declare enum ROLL_CHART {
    RECT = "rect",
    WHEEL = "wheel",
    WINDMILL = "windmill"
}

/**
 * @description 滚动模型配置类型
 * @public
 */
export declare interface RollOptionsType extends OptionsType {
    rollGap?: number;
    rollSize?: number;
    showChild?: boolean;
    childNum?: number;
    chart?: ROLL_CHART;
    windmills?: Array<string>;
    windmillPointColor?: string;
    fixed?: boolean;
}

/**
 * @description 骨架屏模型配置类型
 * @public
 */
export declare interface SkeletonOptionsType extends OptionsType {
    skeletonColor?: string;
    skeletonAnimationColor?: string;
    radius?: number;
    animation?: boolean;
    deep?: boolean;
    appointElementClass?: Array<string>;
}

/**
 * @description 缩放动作枚举
 * @public
 */
export declare enum ZOOM_ACTION {
    SCALE = "scale",
    WAVE = "wave",
    HEIGHT = "height"
}

/**
 * @description 缩放模型配置类型
 * @public
 */
export declare interface ZoomOptionsType extends OptionsType {
    maxSize?: number;
    zoomGap?: number;
    zoomHeight?: number;
    zoomNum?: number;
    zoomColors?: Array<string>;
    lineCap?: CanvasLineCap;
    lineWidth?: number;
    action: ZOOM_ACTION;
    direction?: boolean;
}

export { }
