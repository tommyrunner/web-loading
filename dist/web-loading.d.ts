/**
 * @packageDocumentation
 */

/**
 * Log output
 * @param message - content
 * @param config - to configure
 */
/** @public */
export declare class $Log {
    static info(message: string): void;
    static warn(message: string): void;
    static error(message: string): void;
    static call(message: string, type?: LOG_TYPES, config?: LogConfigType): void;
}

/** @public */
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
     * Custom BaseModel
     * @param w - Canvas width
     * @param h - Canvas height
     * @param canvas - Canvas
     * @param options - Options
     * @param element - Container element
     * @param modelDefOptions -  Default options of model (Optional)
     * @param limits -  Default limits of model (Optional)
     * @param modelDefCall - Provides Callback function for model initialization，Generally initialize "canvas" or "brush" in model (Optional)
     */
    constructor(w: number, h: number, canvas: HTMLCanvasElement, options: Required<T>, element: ElementType, modelDefOptions?: T, limits?: Array<LimitType>, modelDefCall?: (model: BaseModel<T>) => void);
    private _$initBaseContext;
    private _$initEvent;
    /**
     * Encapsulate requestAnimationFrame to trigger the animation pin
     * @param fun - Trigger function
     * @returns
     */
    private _$animationFrame;
    /**
     * Initialize brush properties
     * @param modelDefOptions - Provides Options for model initialization
     * @param limits - Provides Limits for model initialization
     * @param modelDefCall - Provides Callback function for model initialization
     */
    initContextCall(modelDefOptions?: T, limits?: Array<LimitType>, modelDefCall?: (model: BaseModel<T>) => void): void;
    run(fun: Function): void;
    /**
     * Cancel animationFrame animation pin
     * @param id - Animation id
     */
    clearAnimationFrame(id: number): void;
    clearRect(x?: number, y?: number, w_r?: number, h?: number): void;
    /**
     * Draw a rounded rectangle
     * @param x - x
     * @param y - y
     * @param w - width
     * @param h - height
     * @param r - radius
     */
    drowRadiusRect(x: number, y: number, w: number, h: number, r: number): void;
    /**
     *
     * @param params -
     * DrawTextParamsType:
     *    esGap?: Extra void
     x?: X-axis
     text?: text
     textColor?: text color
     */
    drawText(params?: DrawTextParamsType): void;
}

/** @public */
export declare interface BeanOptionsType extends OptionsType {
    beanSize?: number;
    pointLength?: number;
}

/** @public */
export declare enum CIRCULAR_ACTION {
    COLLISION = "collision",
    ROTATE = "rotate"
}

/** @public */
export declare interface CircularOptionsType extends OptionsType {
    arcSize?: number;
    arcGap?: number;
    arcColors?: Array<string>;
    action?: CIRCULAR_ACTION;
}

/**
 * empty aniamtions
 * @param id -
 */
/** @public */
export declare function clearAnimationFrame(id: number): void;

/** @public */
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
 * Create a unique loadingid
 * @returns
 */
/** @public */
export declare function createLoadingId(): string;

/** @public */
export declare interface DrawTextParamsType {
    esGap?: number;
    x?: number;
    text?: string;
    textColor?: string;
}

/** @public */
export declare interface ElementStoreType {
    options: OptionsType;
    animationId: number | undefined;
    loadingId: string | null;
    hookCall: HooksCallType;
    model: BaseModel<OptionsType> | null;
}

/** @public */
export declare interface ElementType extends HTMLElement {
    loadingId?: string | null;
    $store: ElementStoreType;
}

/** @public */
export declare function fullLoading(options?: OptionsType): LoadingType;

/** @public */
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
 *
 * @returns Return to default configuration
 */
/** @public */
export declare function getDefOptions(): Required<OptionsType>;

/** @public */
export declare enum HOOKSCALL_KEY {
    BEFORE_COLSE = "beforeColse",
    COLSED = "colsed"
}

/** @public */
export declare type HooksCallType<T extends string = HOOKSCALL_KEY> = {
    [key in T]: Function;
};

/** @public */
export declare interface ImageOptionsType extends OptionsType {
    src?: string;
    width?: number;
    height?: number;
    turn?: boolean;
}

/** @public */
export declare function initLoading(options?: OptionsType): LoadingType;

/**
 * Judge null
 * @param value - Judgment value
 * @returns boolean
 */
/** @public */
export declare function isNull(value: any): value is boolean | Function;

/** @public */
export declare interface LimitType {
    key: string;
    message: string;
    limit: (key: any) => boolean;
}

/**
 * Supported loading methods
 */
/** @public */
export declare enum LOADING_TYPES {
    DOM = "dom",
    FULL = "full",
    MINI = "mini"
}

/** @public */
export declare interface LoadingType {
    loading: Function;
    resize: Function;
    close: Function;
    update: Function;
    getOptions: () => OptionsType;
    getLoadingId: () => string | null;
}

/** @public */
export declare enum LOG_TYPES {
    INFO = 1,
    WARN = 2,
    ERROR = 3
}

/** @public */
export declare type LogConfigType = {
    color?: string;
    bgColor?: string;
};

/** @public */
export declare function miniLoading(options?: OptionsType): LoadingType;

/**
 * Supported models
 */
/** @public */
export declare enum MODEL_TYPES {
    GEAR = "Gear",
    RING = "Ring",
    ZOOM = "Zoom",
    PATTERN = "Pattern",
    CLOCK = "Clock",
    BEAN = "Bean",
    ROLL = "Roll",
    Circular = "Circular",
    IMG = "Img",
    SKELETON = "Skeleton"
}

/**
 * Listening to animation end function
 * @param el - element
 * @param fun - Execute Function
 */
/** @public */
export declare function onTransitionEndEvent(el: HTMLElement, fun: Function): void;

/** @public */
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

/** @public */
export declare enum PATTERN_CHART {
    RECT = "rect",
    ARC = "arc",
    TRIANGLE = "triangle",
    HEART = "heart",
    POLYGON = "polygon"
}

/** @public */
export declare interface PatternOptionsType extends OptionsType {
    charts?: Array<PATTERN_CHART>;
    chartSize?: number;
    chartColors?: Array<string>;
    maxHeight?: number;
}

/** @public */
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

/** @public */
export declare enum ROLL_CHART {
    RECT = "rect",
    WHEEL = "wheel",
    WINDMILL = "windmill"
}

/** @public */
export declare interface RollOptionsType extends OptionsType {
    rollGap?: number;
    rollSize?: number;
    showChild?: boolean;
    childNum?: number;
    chart?: ROLL_CHART;
    windmills?: Array<string>;
    windmillPointColor?: string;
    fixad?: boolean;
}

/** @public */
export declare interface SkeletonOptionsType extends OptionsType {
    skeletonColor?: string;
    skeletonAnimationColor?: string;
    radius?: number;
    animation?: boolean;
    deep?: boolean;
    appoint?: string;
}

/**
 * Type acquisition
 * @param key -
 * @returns
 */
/** @public */
export declare function toType(key: any): string | 'not-type';

/** @public */
export declare interface WindowType extends Window {
    BaseModel?: typeof BaseModel;
    initLoading?: (options: OptionsType) => LoadingType;
    fullLoading?: (options: OptionsType) => LoadingType;
    miniLoading?: (options: OptionsType) => LoadingType;
}

/** @public */
export declare enum ZOOM_ACTION {
    SCALE = "scale",
    WAVE = "wave",
    HEIGHT = "height"
}

/** @public */
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
