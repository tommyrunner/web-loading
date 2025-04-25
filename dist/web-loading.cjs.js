'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description 支持的加载方法
 * @public
 */
exports.LOADING_TYPES = void 0;
(function (LOADING_TYPES) {
    LOADING_TYPES["DOM"] = "dom";
    LOADING_TYPES["FULL"] = "full";
    LOADING_TYPES["MINI"] = "mini";
})(exports.LOADING_TYPES || (exports.LOADING_TYPES = {}));
/**
 * @description 支持的模型类型
 * @public
 */
exports.MODEL_TYPES = void 0;
(function (MODEL_TYPES) {
    // 齿轮
    MODEL_TYPES["GEAR"] = "Gear";
    // 环形
    MODEL_TYPES["RING"] = "Ring";
    // 缩放
    MODEL_TYPES["ZOOM"] = "Zoom";
    // 图案
    MODEL_TYPES["PATTERN"] = "Pattern";
    // 时钟
    MODEL_TYPES["CLOCK"] = "Clock";
    // 豆形
    MODEL_TYPES["BEAN"] = "Bean";
    // 滚动
    MODEL_TYPES["ROLL"] = "Roll";
    // 圆形
    MODEL_TYPES["CIRCULAR"] = "Circular";
    // 图片
    MODEL_TYPES["IMG"] = "Img";
    // 骨架屏
    MODEL_TYPES["SKELETON"] = "Skeleton";
})(exports.MODEL_TYPES || (exports.MODEL_TYPES = {}));
/**
 * @description 返回默认配置
 * @returns {Required<OptionsType>} 返回默认配置对象
 * @public
 */
function getDefOptions() {
    return {
        custom: null,
        html: '',
        type: exports.LOADING_TYPES.DOM,
        extendClass: 'extend',
        model: exports.MODEL_TYPES.GEAR,
        text: '加载中...',
        textGap: 8,
        fontSize: 12,
        fontFamily: 'Microsoft YaHei',
        delay: 65,
        notFeel: 0,
        delayInto: 320,
        optimization: false,
        zIndex: '2001',
        themeColor: 'rgba(64,158,255,1)',
        bgColor: 'rgba(0, 0, 0, 0.8)',
        shadowColor: 'rgba(64,158,255,0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 5,
        pointerEvents: false,
        toast: true
    };
}
/**
 * @description 钩子调用键枚举
 * @public
 */
exports.HOOKS_CALL_KEY = void 0;
(function (HOOKS_CALL_KEY) {
    HOOKS_CALL_KEY["BEFORE_CLOSE"] = "beforeClose";
    HOOKS_CALL_KEY["CLOSED"] = "closed";
})(exports.HOOKS_CALL_KEY || (exports.HOOKS_CALL_KEY = {}));
/**
 * @description 日志类型枚举
 * @public
 */
exports.LOG_TYPES = void 0;
(function (LOG_TYPES) {
    LOG_TYPES[LOG_TYPES["INFO"] = 1] = "INFO";
    LOG_TYPES[LOG_TYPES["WARN"] = 2] = "WARN";
    LOG_TYPES[LOG_TYPES["ERROR"] = 3] = "ERROR";
})(exports.LOG_TYPES || (exports.LOG_TYPES = {}));
/**
 * @description 日志输出类
 * @public
 */
var $Log = /*#__PURE__*/ (function () {
    function $Log() {
    }
    /**
     * @description 输出信息日志
     * @param {string} message - 日志内容
     */
    $Log.info = function (message) {
        this.call(message, exports.LOG_TYPES.INFO);
    };
    /**
     * @description 输出警告日志
     * @param {string} message - 日志内容
     */
    $Log.warn = function (message) {
        this.call(message, exports.LOG_TYPES.WARN);
    };
    /**
     * @description 输出错误日志
     * @param {string} message - 日志内容
     */
    $Log.error = function (message) {
        this.call(message, exports.LOG_TYPES.ERROR);
    };
    /**
     * @description 调用日志输出
     * @param {string} message - 日志内容
     * @param {LOG_TYPES} type - 日志类型
     * @param {LogConfigType} config - 日志配置
     */
    $Log.call = function (message, type, config) {
        if (type === void 0) { type = exports.LOG_TYPES.INFO; }
        if (config === void 0) { config = {
            color: getDefOptions().themeColor,
            bgColor: getDefOptions().bgColor
        }; }
        var bgColor = config.bgColor;
        // 警告颜色不能被更改
        if (type === 2)
            bgColor = '#fffbe5';
        // 错误颜色不能被更改
        if (type === 3)
            bgColor = '#fff0f0';
        var style = "\n      background:".concat(bgColor, ";\n      font-size:14px;\n      color:").concat(config.color, ";\n      padding: 4px;\n      border: 1px solid;");
        console.log("%c web-loading:".concat(message, " "), style);
    };
    return $Log;
}());
/**
 * @description 判断值是否为空
 * @param {any} value - 待判断的值
 * @returns {boolean} 返回判断结果
 * @public
 */
function isNull(value) {
    switch (toType(value)) {
        case 'object':
            return Object.keys(value).length > 0;
        case 'array':
            return value.length > 0;
        case 'undefined':
            return value !== undefined;
        case 'null':
            return value !== null;
        default:
            return value !== undefined;
    }
}
/**
 * @description 清除动画帧
 * @param {number} id - 动画帧ID
 * @public
 */
function clearAnimationFrame(id) {
    if (!window.requestAnimationFrame) {
        window.clearInterval(id);
    }
    else {
        window.cancelAnimationFrame(id);
    }
}
/**
 * @description 获取数据类型
 * @param {any} key - 待检测的值
 * @returns {string | 'not-type'} 返回类型字符串
 * @public
 */
function toType(key) {
    try {
        var type = Object.prototype.toString.call(key);
        var t1 = type.split(' ')[1];
        var t2 = t1.split(']')[0];
        return t2.toLowerCase();
    }
    catch (e) {
        return 'not-type';
    }
}
/**
 * @description 监听动画结束事件
 * @param {HTMLElement} el - 元素
 * @param {() => void} fun - 执行函数
 * @public
 */
function onTransitionEndEvent(el, fun) {
    var transitionsName = null;
    var transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd'
    };
    for (var t in transitions) {
        if (el.style[t] !== undefined) {
            transitionsName = transitions[t];
            break;
        }
    }
    if (!transitionsName) {
        fun();
    }
    else {
        var transitionFun_1 = function () {
            fun();
            el.removeEventListener(transitionsName, transitionFun_1);
        };
        el.addEventListener(transitionsName, transitionFun_1);
    }
}
/**
 * @description 创建唯一的loadingID
 * @returns {string} 返回生成的唯一ID
 * @public
 */
function createLoadingId() {
    var id = String(Date.now());
    if (window.crypto && window.crypto.randomUUID)
        id = window.crypto.randomUUID();
    return 'wl_' + id.replace(/-/g, '');
}
/**
 * @description 缩放动作枚举
 * @public
 */
exports.ZOOM_ACTION = void 0;
(function (ZOOM_ACTION) {
    ZOOM_ACTION["SCALE"] = "scale";
    ZOOM_ACTION["WAVE"] = "wave";
    ZOOM_ACTION["HEIGHT"] = "height";
})(exports.ZOOM_ACTION || (exports.ZOOM_ACTION = {}));
/**
 * @description 图案类型枚举
 * @public
 */
exports.PATTERN_CHART = void 0;
(function (PATTERN_CHART) {
    PATTERN_CHART["RECT"] = "rect";
    PATTERN_CHART["ARC"] = "arc";
    PATTERN_CHART["TRIANGLE"] = "triangle";
    PATTERN_CHART["HEART"] = "heart";
    PATTERN_CHART["POLYGON"] = "polygon";
})(exports.PATTERN_CHART || (exports.PATTERN_CHART = {}));
/**
 * @description 滚动图表类型枚举
 * @public
 */
exports.ROLL_CHART = void 0;
(function (ROLL_CHART) {
    ROLL_CHART["RECT"] = "rect";
    ROLL_CHART["WHEEL"] = "wheel";
    ROLL_CHART["WINDMILL"] = "windmill";
})(exports.ROLL_CHART || (exports.ROLL_CHART = {}));
/**
 * @description 圆形动作枚举
 * @public
 */
exports.CIRCULAR_ACTION = void 0;
(function (CIRCULAR_ACTION) {
    CIRCULAR_ACTION["COLLISION"] = "collision";
    CIRCULAR_ACTION["ROTATE"] = "rotate";
})(exports.CIRCULAR_ACTION || (exports.CIRCULAR_ACTION = {}));

/**
 * @description 基础模型类
 * @public
 */
var BaseModel = /*#__PURE__*/ (function () {
    /**
     * @description 自定义基础模型
     * @param {number} w - Canvas宽度
     * @param {number} h - Canvas高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<T>} options - 配置选项
     * @param {ElementType} element - 容器元素
     * @param {T} [modelDefOptions] - 模型默认选项（可选）
     * @param {Array<LimitType>} [limits] - 模型默认限制（可选）
     * @param {(model: BaseModel<T>) => void} [modelDefCall] - 提供模型初始化的回调函数，通常在模型中初始化"canvas"或"画笔"（可选）
     */
    function BaseModel(w, h, canvas, options, element, modelDefOptions, limits, modelDefCall) {
        // 模型默认选项
        this.modelDefOptions = undefined;
        // 模型限制
        this.limits = undefined;
        // 提供模型初始化的回调函数
        this.modelDefCall = undefined;
        this.webLog = $Log;
        this.stepClear = 1;
        this.w = w;
        this.h = h;
        this.canvas = canvas;
        // 默认获取2d画笔
        this.ctx = canvas.getContext('2d');
        this.options = options;
        this.element = element;
        // 初始化模型
        this.initContextCall(modelDefOptions, limits, modelDefCall);
    }
    // 初始化画笔
    BaseModel.prototype._$initBaseContext = function () {
        this.clearRect();
        this.ctx.resetTransform();
        // 默认主题颜色
        var op = this.options, defW = this.canvas.width, defH = this.canvas.height;
        this.ctx.fillStyle = op.themeColor;
        this.ctx.strokeStyle = op.themeColor;
        this.ctx.shadowColor = op.shadowColor;
        this.ctx.font = "".concat(op.fontSize, "px ").concat(op.fontFamily, " small-caps");
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.translate(defW / 2, defH / 2);
        // 同步大小处理失真
        var dpr = window.devicePixelRatio || 1;
        this.ctx.scale(dpr, dpr);
        this.ctx.save();
    };
    // 初始化默认事件
    BaseModel.prototype._$initEvent = function () {
        var _this = this;
        // 关闭前清空画布
        this.element.$store.hookCall.beforeClose(function () {
            _this.clearRect();
        });
    };
    /**
     * @description 封装requestAnimationFrame触发动画针
     * @param {() => void} fun - 触发函数
     * @private
     */
    BaseModel.prototype._$animationFrame = function (fun) {
        var _this = this;
        // 兼容处理
        if (!window.requestAnimationFrame) {
            this.element.$store.animationId = window.setInterval(fun, this.options.delay);
        }
        // 使用时间轴控制触发时间
        var endTime = Date.now() + this.options.delay;
        fun.call(this);
        var run = function () {
            if (Date.now() > endTime) {
                fun.call(_this);
                endTime = Date.now() + _this.options.delay;
            }
            _this.element.$store.animationId = window.requestAnimationFrame(run);
        };
        this.element.$store.animationId = window.requestAnimationFrame(run);
    };
    /**
     * @description 初始化画笔属性
     * @param {T} [modelDefOptions] - 提供模型初始化的选项
     * @param {Array<LimitType>} [limits] - 提供模型初始化的限制
     * @param {(model: BaseModel<T>) => void} [modelDefCall] - 提供模型初始化的回调函数
     */
    BaseModel.prototype.initContextCall = function (modelDefOptions, limits, modelDefCall) {
        var _this = this;
        // 初始化基础点上下文
        this._$initBaseContext();
        // 初始化基础钩子事件
        this._$initEvent();
        // 初始化模型选项
        if (isNull(modelDefOptions)) {
            // 记录选项
            this.modelDefOptions = modelDefOptions;
            this.options = Object.assign(modelDefOptions, this.options);
            this.element.$store.options = this.options;
            // 判断属性值是否需要限制（仅用于提示）
            if (limits && limits.length && this.options.toast) {
                limits.forEach(function (l) {
                    var mayKey = _this.options[l.key];
                    if (isNull(mayKey) && !l.limit(mayKey))
                        $Log.warn(l.message);
                });
            }
        }
        if (isNull(limits))
            this.limits = limits;
        if (isNull(modelDefCall)) {
            // this.modelDefCall = modelDefCall
            modelDefCall.call(this, this);
        }
    };
    /**
     * @description 开始动画
     * @param {() => void} fun - 动画函数
     */
    BaseModel.prototype.run = function (fun) {
        // 如果已经处于加载状态，无需重新实例化
        if (this.element.$store.animationId)
            this.clearAnimationFrame(this.element.$store.animationId);
        this._$animationFrame(fun);
    };
    /**
     * @description 取消animationFrame动画针
     * @param {number} id - 动画ID
     */
    BaseModel.prototype.clearAnimationFrame = function (id) {
        clearAnimationFrame(id);
    };
    /**
     * @description 清空画布
     * @param {number} [x] - x坐标
     * @param {number} [y] - y坐标
     * @param {number} [w_r] - 宽度或半径
     * @param {number} [h] - 高度
     */
    BaseModel.prototype.clearRect = function (x, y, w_r, h) {
        var defW = this.canvas.width, defH = this.canvas.height;
        // 因为起点已设置为中心，需要扩展
        if (isNull(x) && isNull(y) && isNull(w_r) && isNull(h)) {
            this.ctx.clearRect(x, y, w_r, h);
        }
        // 清空圆形区域
        else if (isNull(x) && isNull(y) && isNull(w_r) && !isNull(h)) {
            var calcWidth = w_r - this.stepClear;
            var calcHeight = Math.sqrt(w_r * w_r - calcWidth * calcWidth);
            var posX = x - calcWidth;
            var posY = y - calcHeight;
            var widthX = 2 * calcWidth;
            var heightY = 2 * calcHeight;
            if (this.stepClear <= w_r) {
                this.ctx.clearRect(posX, posY, widthX, heightY);
                this.stepClear += 1;
                this.clearRect(x, y, w_r);
            }
            else {
                this.stepClear = 1;
            }
        }
        else
            this.ctx.clearRect(-defW, -defH, defW * 2, defH * 2);
    };
    /**
     * @description 绘制圆角矩形
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {number} r - 圆角半径
     */
    BaseModel.prototype.drawRadiusRect = function (x, y, w, h, r) {
        this.ctx.beginPath();
        this.ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI);
        this.ctx.lineTo(x + w - r, y);
        this.ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 0);
        this.ctx.lineTo(x + w, y + h - r);
        this.ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
        this.ctx.lineTo(x + r, y + h);
        this.ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);
        this.ctx.lineTo(x, y + r);
        this.ctx.closePath();
    };
    /**
     * @description 绘制文本
     * @param {DrawTextParamsType} [params] - 文本参数
     * DrawTextParamsType:
     *    esGap?: 额外空隙
     *    x?: X轴位置
     *    text?: 文本内容
     *    textColor?: 文本颜色
     */
    BaseModel.prototype.drawText = function (params) {
        var op = this.options;
        var pm = Object.assign({ esGap: op.textGap || 0, x: 0, text: op.text || '', textColor: op.themeColor || 'rgba(64,158,255,1)' }, params);
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = pm.textColor;
        this.ctx.fillText(pm.text, pm.x, (op.textGap || 0) + (op.fontSize || 0) + pm.esGap);
        this.ctx.closePath();
        this.ctx.restore();
    };
    return BaseModel;
}());

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @description 齿轮模型默认配置选项
 */
var modelDefOptions$9 = {
    lineStart: 10,
    lineEnd: 16,
    lineStartSkew: 0,
    lineEndSkew: 0,
    lineWidth: 4,
    lineCap: 'round',
    lineNum: 10,
    direction: true
};
/**
 * @description 齿轮模型限制条件
 */
var limits$6 = [
    {
        key: 'lineNum',
        message: 'lineNum value 4-18',
        limit: function (key) {
            return key >= 4 && key <= 18;
        }
    }
];
/**
 * @description 齿轮模型类
 * @extends BaseModel<GearOptionsType>
 */
var Gear = /*#__PURE__*/ (function (_super) {
    __extends(Gear, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<GearOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Gear(w, h, canvas, options, element) {
        var _this = 
        // 1.初始化
        _super.call(this, w, h, canvas, options, element, modelDefOptions$9, limits$6, function (model) {
            // 模型额外初始化回调函数
            var op = model.options;
            model.ctx.lineCap = op.lineCap;
            model.ctx.lineWidth = op.lineWidth;
            model.ctx.save();
        }) || this;
        _this.optimization(_this.options.textGap + _this.options.lineEnd);
        // 2.启动动画针并记录状态
        _this.aps = Array.from({ length: _this.options.lineNum }, function (_, _index) { return _index; });
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制齿轮
     */
    Gear.prototype.draw = function () {
        this.clearRect();
        // 控制进程
        this.controller();
        // 绘制齿轮
        this.drawGear();
        // 绘制文本
        var op = this.options;
        this.drawText({ esGap: op.lineEnd });
    };
    /**
     * @description 控制齿轮动画
     */
    Gear.prototype.controller = function () {
        var _this = this;
        var op = this.options;
        if (op.direction)
            this.aps = this.aps.map(function (a) { return (a - 1 <= 0 ? _this.aps.length - 1 : a - 1); });
        else
            this.aps = this.aps.map(function (a) { return (a + 1 > _this.aps.length ? 0 : a + 1); });
    };
    /**
     * @description 绘制齿轮元素
     */
    Gear.prototype.drawGear = function () {
        var op = this.options;
        this.ctx.save();
        // 设置阴影
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
        // 绘制加载齿轮
        for (var i = 0; i < this.aps.length; i++) {
            this.ctx.beginPath();
            this.ctx.globalAlpha = this.aps[i] / 10;
            this.ctx.moveTo(op.lineEndSkew, op.lineStart);
            this.ctx.lineTo(op.lineStartSkew, op.lineEnd);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.rotate((2 * Math.PI) / op.lineNum);
        }
        this.ctx.restore();
    };
    /**
     * @description 优化处理（主要优化默认文本位置）
     * @param {number} textY - 文本Y坐标
     */
    Gear.prototype.optimization = function (textY) {
        // 如果开启优化（优化字体位置）
        if (this.options.optimization) {
            // 根据宽高调整
            if (textY * 4 > this.h) {
                this.options.lineStart = this.h / 6 - 5;
                this.options.lineEnd = this.h / 6;
                this.options.textGap = 2;
            }
        }
    };
    return Gear;
}(BaseModel));

/**
 * @description 缩放模型默认配置选项
 */
var modelDefOptions$8 = {
    zoomGap: 10,
    maxSize: 16,
    zoomNum: 5,
    lineWidth: 10,
    zoomHeight: 2,
    lineCap: 'round',
    action: exports.ZOOM_ACTION.SCALE,
    direction: true,
    zoomColors: []
};
/**
 * @description 缩放模型限制条件
 */
var limits$5 = [
    {
        key: 'lineWidth',
        message: 'lineWidth(default:10) <=  maxSize(default:16)',
        limit: function (key) {
            return key <= modelDefOptions$8.maxSize;
        }
    },
    {
        key: 'maxSize',
        message: 'lineWidth(default:10) <=  maxSize(default:16)',
        limit: function (key) {
            return modelDefOptions$8.lineWidth <= key;
        }
    }
];
/**
 * @description 缩放模型类
 * @extends BaseModel<ZoomOptionsType>
 */
var Zoom = /*#__PURE__*/ (function (_super) {
    __extends(Zoom, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<ZoomOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Zoom(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$8, limits$5, function (model) {
            var op = model.options;
            model.ctx.lineCap = op.lineCap;
            model.ctx.lineWidth = op.lineWidth;
            // 居中 ((缩放宽度 * 数量+1)+(缩放间隙 * 数量+1))/2, 因为第一个缩放会移动所需的数量+1, 高度/2
            model.ctx.translate(-(op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2, -op.zoomHeight / 2);
            model.ctx.save();
        }) || this;
        _this.zoomIndex = _this.options.direction ? 0 : _this.options.zoomNum - 1;
        _this.list = Array.from({ length: _this.options.zoomNum }, function (_, _index) {
            return Object.assign({
                value: _this.options.lineWidth,
                // 0: 初始, 1: 变大, 2: 变小
                state: 0
            });
        });
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制缩放模型
     */
    Zoom.prototype.draw = function () {
        this.clearRect();
        // 绘制缩放
        this.drawZoom();
        var op = this.options;
        this.drawText({ esGap: op.maxSize, x: (op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2 });
        // 控制进程
        this.controller();
    };
    /**
     * @description 控制缩放动画
     */
    Zoom.prototype.controller = function () {
        var op = this.options;
        if (op.direction && this.zoomIndex >= op.zoomNum)
            this.zoomIndex = 0;
        else if (op.direction && this.zoomIndex < 0)
            this.zoomIndex = op.zoomNum - 1;
    };
    /**
     * @description 绘制缩放元素
     */
    Zoom.prototype.drawZoom = function () {
        var op = this.options;
        for (var i = 0; i < op.zoomNum; i++) {
            // 处理变化
            if (this.list[i].state === 1)
                this.list[i].value += 2;
            else if (this.list[i].state === 2 && this.list[i].value >= op.lineWidth)
                this.list[i].value--;
            if (op.action === exports.ZOOM_ACTION.SCALE)
                this.ctx.lineWidth = this.list[i].value;
            // 状态变化
            if (i === this.zoomIndex) {
                if (this.list[i].value > op.maxSize) {
                    this.list[i].state = 2;
                    op.direction
                        ? this.zoomIndex++
                        : this.zoomIndex - 1 >= 0
                            ? this.zoomIndex--
                            : (this.zoomIndex = op.zoomNum - 1);
                }
                if (this.list[i].value <= op.lineWidth)
                    this.list[i].state = 1;
            }
            // 根据数量绘制
            this.ctx.beginPath();
            if (op.zoomColors.length > 0 && op.zoomColors[i])
                this.ctx.strokeStyle = op.zoomColors[i];
            else
                this.ctx.strokeStyle = op.themeColor;
            var sH = 0, eH = op.zoomHeight;
            if (op.action === exports.ZOOM_ACTION.HEIGHT || op.action === exports.ZOOM_ACTION.WAVE) {
                sH = -this.list[i].value;
            }
            if (op.action === exports.ZOOM_ACTION.WAVE) {
                eH = -this.list[i].value;
            }
            this.ctx.moveTo((i + 1) * (op.lineWidth + op.zoomGap), sH);
            this.ctx.lineTo((i + 1) * (op.lineWidth + op.zoomGap), eH);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    };
    return Zoom;
}(BaseModel));

/**
 * @description 环形模型默认配置选项
 */
var modelDefOptions$7 = {
    arcGap: Math.PI / 4,
    ringGap: 10,
    lineWidth: 2,
    ringNum: 2,
    radius: 6,
    lineCap: 'round',
    turn: 10,
    ringsTurn: [Math.PI, Math.PI / 4],
    direction: true
};
/**
 * @description 环形模型限制条件
 */
var limits$4 = [
    {
        key: 'ringNum',
        message: 'ringNum value 1-10',
        limit: function (key) {
            return key >= 1 && key <= 10;
        }
    },
    {
        key: 'ringsTurn',
        message: "ringsTurn size ".concat(modelDefOptions$7.ringNum),
        limit: function (key) {
            return key.length <= modelDefOptions$7.ringNum;
        }
    }
];
/**
 * @description 环形模型类
 * @extends BaseModel<RingOptionsType>
 */
var Ring = /*#__PURE__*/ (function (_super) {
    __extends(Ring, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<RingOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Ring(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$7, limits$4, function (model) {
            var op = model.options;
            model.ctx.lineCap = op.lineCap;
            model.ctx.lineWidth = op.lineWidth;
            model.ctx.save();
        }) || this;
        _this.rotate = 10;
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制环形
     */
    Ring.prototype.draw = function () {
        this.clearRect();
        this.controller();
        var op = this.options;
        this.drawText({ esGap: op.ringNum * (op.radius + op.ringGap / 2) });
    };
    /**
     * @description 控制环形动画
     */
    Ring.prototype.controller = function () {
        this.ctx.save();
        var op = this.options;
        var rotate = ((this.rotate * Math.PI) / 180) * (op.direction ? 1 : -1);
        this.ctx.rotate(rotate);
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
        for (var i = 1; i <= op.ringNum; i++) {
            this.drawRing(op.radius + (i - 1) * op.ringGap, op.arcGap, op.ringsTurn && op.ringsTurn.length > 0 ? op.ringsTurn[i - 1] : Math.PI / i);
        }
        this.rotate += op.turn;
        this.ctx.restore();
    };
    /**
     * @description 绘制单个环形
     * @param {number} r - 半径
     * @param {number} [arcGap=1] - 弧线间隔
     * @param {number} [angle=0] - 角度
     */
    Ring.prototype.drawRing = function (r, arcGap, angle) {
        if (arcGap === void 0) { arcGap = 1; }
        if (angle === void 0) { angle = 0; }
        // 第一个弧
        this.ctx.beginPath();
        this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle);
        this.ctx.stroke();
        this.ctx.closePath();
        // 第二个弧
        this.ctx.beginPath();
        this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    return Ring;
}(BaseModel));

/**
 * @description Bean模型默认配置选项
 */
var modelDefOptions$6 = {
    beanSize: 15,
    pointLength: 15
};
/**
 * @description Bean模型限制条件
 */
var limits$3 = [
    {
        key: 'pointLength',
        message: 'pointLength value >= 5',
        limit: function (key) {
            return key >= 5;
        }
    },
    {
        key: 'beanSize',
        message: 'beanSize value >= 5',
        limit: function (key) {
            return key >= 5;
        }
    }
];
/**
 * @description Bean模型类
 * @extends BaseModel<BeanOptionsType>
 */
var Bean = /*#__PURE__*/ (function (_super) {
    __extends(Bean, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<BeanOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Bean(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$6, limits$3) || this;
        _this.bean = {
            turn: 30,
            state: 1,
            beanState: 1,
            nowX: -(_this.options.pointLength * _this.options.beanSize) / 2 - _this.options.beanSize * 3,
            beans: Array.from({ length: _this.options.pointLength }, function () { return 1; }),
            beanAnimaIndex: 0
        };
        _this.options.delay = 10;
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制豆形
     */
    Bean.prototype.draw = function () {
        var op = this.options;
        this.clearRect();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.bean.nowX, 0);
        this.ctx.arc(0, 0, op.beanSize, ((360 - this.bean.turn) * Math.PI) / 180, (this.bean.turn * Math.PI) / 180, true);
        this.ctx.lineTo(0, 0);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
        // 绘制点
        this.drawPoint();
        // 绘制过滤器
        this.drawFilter();
        // 绘制文本
        this.drawText({ esGap: op.beanSize });
        // 控制进程
        this.controller();
    };
    /**
     * @description 控制豆形动画
     */
    Bean.prototype.controller = function () {
        var op = this.options;
        if (this.bean.nowX >= (op.pointLength * op.beanSize) / 2 + op.beanSize * 2) {
            this.bean.nowX = -(op.pointLength * op.beanSize) / 2 - op.beanSize * 3;
            this.bean.beanAnimaIndex = 0;
        }
        if (this.bean.nowX <= -(op.pointLength * op.beanSize) / 2) {
            this.bean.beanState = 2;
        }
        if (this.bean.turn <= 0)
            this.bean.state = 2;
        if (this.bean.turn >= 30)
            this.bean.state = 1;
        if (this.bean.state === 1)
            this.bean.turn -= 1;
        if (this.bean.state === 2)
            this.bean.turn += 1;
        if (this.bean.beanState === 1)
            this.bean.nowX -= 1;
        if (this.bean.beanState === 2)
            this.bean.nowX += 1;
    };
    /**
     * @description 绘制点
     */
    Bean.prototype.drawPoint = function () {
        var op = this.options;
        this.ctx.save();
        this.setShadow();
        this.ctx.translate(-(op.pointLength * op.beanSize) / 2, 0);
        for (var i = 0; i < op.pointLength && i < this.bean.beanAnimaIndex; i++) {
            this.ctx.beginPath();
            if (i < this.bean.beanAnimaIndex)
                this.ctx.arc(op.beanSize * i, 0, op.beanSize / 4, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        }
        this.bean.beanAnimaIndex += 0.2;
        this.ctx.restore();
    };
    /**
     * @description 绘制过滤器
     */
    Bean.prototype.drawFilter = function () {
        var op = this.options;
        // 眼睛
        this.clearRect(-op.beanSize / 3 + this.bean.nowX, -op.beanSize / 2, op.beanSize / 4);
        // 轨迹
        this.clearRect(-(op.pointLength * op.beanSize) / 2 - op.beanSize / 2 + 0.2, -this.h, this.bean.nowX + (op.pointLength * op.beanSize) / 2 - op.beanSize / 2, this.h * 2);
        // 进入
        this.clearRect(-(op.pointLength * op.beanSize) / 2, -this.h, -180, this.h * 2);
        // 离开
        this.clearRect((op.pointLength * op.beanSize) / 2, -this.h, 180, this.h * 2);
    };
    /**
     * @description 设置阴影
     */
    Bean.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Bean;
}(BaseModel));

/**
 * @description 时钟模型默认配置选项
 */
var modelDefOptions$5 = {
    lineCap: 'round',
    lineWidth: 2,
    lineColors: ['#d4d4d4', '#06ab2d', '#8a0303'],
    clockSize: 15,
    clockGap: 4,
    hLine: true,
    mLine: false,
    sLine: true,
    textTime: ''
};
/**
 * @description 时钟模型限制条件
 */
var limits$2 = [
    {
        key: 'lineColors',
        message: 'lineColors.length <= 3',
        limit: function (key) {
            return key.length <= 3;
        }
    }
];
/**
 * @description 时钟模型类
 * @extends BaseModel<ClockOptionsType>
 */
var Clock = /*#__PURE__*/ (function (_super) {
    __extends(Clock, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<ClockOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Clock(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$5, limits$2, function (model) {
            var op = model.options;
            model.ctx.lineCap = op.lineCap;
            model.ctx.lineWidth = op.lineWidth;
            model.ctx.save();
        }) || this;
        _this.nowTime = -1;
        _this.nowS = 0;
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制时钟
     */
    Clock.prototype.draw = function () {
        this.clearRect();
        // 绘制时钟
        this.drawClock();
    };
    /**
     * @description 绘制时钟元素
     */
    Clock.prototype.drawClock = function () {
        var op = this.options;
        var s = new Date().getSeconds();
        var m = new Date().getMinutes();
        var h = new Date().getHours();
        // 顶部
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.moveTo(-5, -(op.clockSize + op.clockGap));
        this.ctx.lineTo(5, -(op.clockSize + op.clockGap));
        this.ctx.stroke();
        this.ctx.closePath();
        // 外圆
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        // 刻度
        this.ctx.save();
        for (var i = 0; i < 12; i++) {
            this.ctx.beginPath();
            this.ctx.rotate(((360 / 12) * Math.PI) / 180);
            this.ctx.moveTo(op.clockSize - op.clockGap, 0);
            this.ctx.lineTo(op.clockSize - op.clockGap, 0);
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.restore();
        // 时针
        if (op.hLine) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineWidth = op.lineWidth * 1.6;
            if (op.lineColors[0])
                this.ctx.strokeStyle = op.lineColors[0];
            // 初始化点
            this.ctx.rotate((-90 * Math.PI) / 180);
            this.ctx.rotate((((h * 360) / 60) * Math.PI) / 180);
            this.ctx.moveTo(-1, 0);
            this.ctx.lineTo(op.clockSize / 2, 0);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        }
        // 分针
        if (op.mLine) {
            this.ctx.save();
            this.ctx.beginPath();
            if (op.lineColors[1])
                this.ctx.strokeStyle = op.lineColors[1];
            this.ctx.lineWidth = op.lineWidth * 1.2;
            // 初始化点
            this.ctx.rotate((-90 * Math.PI) / 180);
            this.ctx.rotate((((m * 360) / 60) * Math.PI) / 180);
            this.ctx.moveTo(-1, 0);
            this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        }
        // 秒针
        if (op.sLine) {
            this.ctx.save();
            this.ctx.beginPath();
            if (op.lineColors[2])
                this.ctx.strokeStyle = op.lineColors[2];
            this.ctx.rotate((-90 * Math.PI) / 180);
            this.ctx.rotate((((s * 360) / 60) * Math.PI) / 180);
            this.ctx.moveTo(-1, 0);
            this.ctx.lineTo(op.clockSize - op.clockGap, 0);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            if (this.nowS !== s)
                this.nowTime++;
            this.nowS = s;
        }
        if (op.textTime === 'time')
            op.text = "".concat(h, " : ").concat(m, " : ").concat(s);
        if (op.textTime === 's')
            op.text = this.nowTime + 's';
        this.drawText({ esGap: op.clockSize * 2 });
    };
    /**
     * @description 设置阴影
     */
    Clock.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Clock;
}(BaseModel));

/**
 * @description 图案模型默认配置选项
 */
var modelDefOptions$4 = {
    charts: [exports.PATTERN_CHART.ARC, exports.PATTERN_CHART.RECT, exports.PATTERN_CHART.TRIANGLE, exports.PATTERN_CHART.HEART, exports.PATTERN_CHART.POLYGON],
    chartColors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd'],
    maxHeight: 60,
    chartSize: 12
};
/**
 * @description 图案模型限制条件
 */
var limits$1 = [
    {
        key: 'chartSize',
        message: 'chartSize value 5-24',
        limit: function (key) {
            return key >= 5 && key <= 24;
        }
    },
    {
        key: 'delay',
        message: 'Pattern.delay not allowed update',
        limit: function (key) {
            return key === getDefOptions().delay;
        }
    }
];
/**
 * @description 图案模型类
 * @extends BaseModel<PatternOptionsType>
 */
var Pattern = /*#__PURE__*/ (function (_super) {
    __extends(Pattern, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<PatternOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Pattern(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$4, limits$1, function (model) {
            model.options.delay = 10;
        }) || this;
        _this.pattern = {
            color: _this.randomState('chartColors'),
            nowHeight: 10,
            chart: _this.randomState('charts'),
            shadow: 0,
            nowState: 1,
            turn: 0
        };
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制图案
     */
    Pattern.prototype.draw = function () {
        var op = this.options;
        this.clearRect();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(0, this.pattern.nowHeight);
        this.ctx.rotate((this.pattern.turn / Math.PI) * 2);
        this.ctx.fillStyle = this.pattern.color;
        this.selectChart(0, 0, op.chartSize);
        this.ctx.closePath();
        this.ctx.restore();
        this.drawShadow();
        // 清空隐藏部分
        this.clearRect(-this.w, 0, this.w * 2, this.h);
        // 控制值变化
        this.controller(op);
        this.drawText({ textColor: this.pattern.color });
    };
    /**
     * @description 控制图案动画
     * @param {Required<PatternOptionsType>} op - 配置选项
     */
    Pattern.prototype.controller = function (op) {
        this.pattern.turn += 10; // 角度
        // 高度和阴影
        if (this.pattern.nowState === 1) {
            this.pattern.nowHeight--;
            this.pattern.shadow += 0.2;
        }
        else if (this.pattern.nowState === 2) {
            this.pattern.nowHeight++;
            this.pattern.shadow -= 0.2;
        }
        this.pattern.shadow = Math.floor(this.pattern.shadow * 100) / 100;
        // 速度
        if (this.pattern.nowHeight <= -op.chartSize && this.pattern.nowHeight % 8 == 0) {
            op.delay += 0.5;
            op.delay = Math.floor(op.delay * 100) / 100;
        }
        // 范围
        if (this.pattern.nowHeight <= -op.maxHeight) {
            this.pattern.nowState = 2;
        }
        else if (this.pattern.nowHeight >= op.chartSize) {
            this.pattern.nowState = 1;
            op.delay = 10;
            // 切换图形
            this.pattern.chart = this.randomState('charts');
            // 切换颜色
            this.pattern.color = this.randomState('chartColors');
        }
    };
    /**
     * @description 选择图形类型
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} size - 尺寸
     */
    Pattern.prototype.selectChart = function (x, y, size) {
        switch (this.pattern.chart) {
            case exports.PATTERN_CHART.RECT:
                this.drawRect(x, y, size);
                break;
            case exports.PATTERN_CHART.ARC:
                this.drawArc(x, y, size);
                break;
            case exports.PATTERN_CHART.TRIANGLE:
                this.drawTriangle(x, y, size);
                break;
            case exports.PATTERN_CHART.HEART:
                this.drawHeart(x, y, size);
                break;
            case exports.PATTERN_CHART.POLYGON:
                this.drawPolygon(x, y, size);
                break;
        }
    };
    /**
     * @description 随机选择状态
     * @param {any} key - 键名
     * @returns {PATTERN_CHART} 返回随机选择的图形类型
     */
    Pattern.prototype.randomState = function (key) {
        var op = this.options;
        return op[key][parseInt(String(Math.random() * op[key].length))];
    };
    /**
     * @description 绘制阴影
     */
    Pattern.prototype.drawShadow = function () {
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.globalAlpha = 0.2;
        this.ctx.strokeStyle = this.pattern.color;
        this.ctx.moveTo(-this.pattern.shadow / 2, 0);
        this.ctx.lineTo(this.pattern.shadow, 0);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.restore();
    };
    /**
     * @description 绘制矩形
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} size - 尺寸
     */
    Pattern.prototype.drawRect = function (x, y, size) {
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.translate(-size / 2, -size / 2);
        this.ctx.fillRect(x, y, size, size);
        this.ctx.closePath();
        this.ctx.restore();
    };
    /**
     * @description 绘制圆形
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} size - 尺寸
     */
    Pattern.prototype.drawArc = function (x, y, size) {
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    };
    /**
     * @description 绘制三角形
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} size - 尺寸
     */
    Pattern.prototype.drawTriangle = function (x, y, size) {
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.translate(-size / 2, -((size / 2) * Math.sqrt(3)) / 2);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(size, 0);
        this.ctx.lineTo(size / 2, (size / 2) * Math.sqrt(3));
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    };
    /**
     * @description 绘制心形
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} size - 尺寸
     */
    Pattern.prototype.drawHeart = function (x, y, size) {
        size = size / 2;
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.translate(0, -(size * 2) / 2);
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(size / 2, -size, size * 3, -size / 2, y, size * 2);
        this.ctx.moveTo(x, y);
        this.ctx.bezierCurveTo(-size / 2, -size, -size * 3, -size / 2, y, size * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    };
    /**
     * @description 绘制多边形
     * @param {number} x - x坐标
     * @param {number} y - y坐标
     * @param {number} size - 尺寸
     */
    Pattern.prototype.drawPolygon = function (x, y, size) {
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.translate(-size / 2, -size / 2);
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(size, y);
        this.ctx.lineTo(size + size / 2, size / 2);
        this.ctx.lineTo(size, size / 2 + size / 2);
        this.ctx.lineTo(x, size);
        this.ctx.lineTo(x - size / 2, size - size / 2);
        this.ctx.lineTo(x, y);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    };
    /**
     * @description 设置阴影
     */
    Pattern.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowColor = this.pattern.color;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Pattern;
}(BaseModel));

/**
 * @description 滚动模型默认配置选项
 */
var modelDefOptions$3 = {
    rollGap: 12,
    childNum: 4,
    rollSize: 16,
    showChild: true,
    chart: exports.ROLL_CHART.WHEEL,
    windmills: ['#1ab3ea', '#de6834', '#30925d', '#f48ea5'],
    windmillPointColor: '#f2c31f',
    fixed: false
};
/**
 * @description 滚动模型限制条件
 */
var limits = [
    {
        key: 'childNum',
        message: 'chartSize value 4-10',
        limit: function (key) {
            return key >= 4 && key <= 10;
        }
    },
    {
        key: 'delay',
        message: 'Roll.delay not allowed update',
        limit: function (key) {
            return key === getDefOptions().delay;
        }
    }
];
/**
 * @description 滚动模型类
 * @extends BaseModel<RollOptionsType>
 */
var Roll = /*#__PURE__*/ (function (_super) {
    __extends(Roll, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<RollOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Roll(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$3, limits) || this;
        _this.Roll = {
            turn: 1,
            nowX: _this.options.fixed
                ? 0
                : (_this.options.childNum / 2) * (_this.options.rollSize + _this.options.rollGap) + _this.options.rollGap / 2,
            state: 2,
            child: []
        };
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制滚动模型
     */
    Roll.prototype.draw = function () {
        this.clearRect();
        // 地面
        this.drawGround();
        // 绘制子元素
        this.drawChild();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(-this.Roll.nowX, 0);
        this.ctx.rotate((this.Roll.turn * Math.PI) / 180);
        // 绘制图形
        this.selectChart();
        // 控制进程
        this.controller();
        this.ctx.restore();
        // 绘制文本
        var op = this.options;
        this.drawText({ esGap: op.rollSize });
    };
    /**
     * @description 选择图形类型
     */
    Roll.prototype.selectChart = function () {
        var op = this.options;
        switch (op.chart) {
            case exports.ROLL_CHART.RECT:
                this.drawRect();
                break;
            case exports.ROLL_CHART.WHEEL:
                this.drawWheel();
                break;
            case exports.ROLL_CHART.WINDMILL:
                this.drawWindmill();
                break;
        }
    };
    /**
     * @description 控制滚动动画
     */
    Roll.prototype.controller = function () {
        var op = this.options;
        if (this.Roll.state === 1) {
            this.Roll.turn -= 10;
            if (op.delay < 20 && !op.fixed)
                op.delay += 2;
        }
        if (this.Roll.state === 2) {
            this.Roll.turn += 10;
            if (op.delay > 10 && !op.fixed)
                op.delay -= 5;
        }
        if (op.fixed)
            return;
        if (this.Roll.nowX <= -(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6))
            this.Roll.state = 1;
        if (this.Roll.nowX >= (op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2)
            this.Roll.state = 2;
        if (this.Roll.state === 1)
            this.Roll.nowX++;
        if (this.Roll.state === 2)
            this.Roll.nowX--;
        var child = this.Roll.child;
        if (this.Roll.nowX % (op.rollSize + op.rollGap) == 0 && this.Roll.state === 2) {
            child.push({ turn: this.Roll.turn, x: this.Roll.nowX });
        }
        if (this.Roll.state === 1 && child[child.length - 1] && child[child.length - 1].x === this.Roll.nowX) {
            this.Roll.child.pop();
        }
    };
    /**
     * @description 绘制矩形
     */
    Roll.prototype.drawRect = function () {
        var op = this.options;
        this.ctx.save();
        this.setShadow();
        this.ctx.translate(-op.rollSize / 2, -op.rollSize / 2);
        this.ctx.fillRect(0, 0, op.rollSize, op.rollSize);
        this.ctx.restore();
    };
    /**
     * @description 绘制轮子
     */
    Roll.prototype.drawWheel = function () {
        var op = this.options;
        this.ctx.save();
        this.ctx.lineWidth = 4;
        // 内圆1
        this.ctx.beginPath();
        this.ctx.arc(0, 0, op.rollSize / 6, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        // 内圆2
        this.ctx.beginPath();
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        // 外圆
        this.ctx.beginPath();
        this.ctx.arc(0, 0, op.rollSize, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        // 轮辐
        for (var i = 0; i < 6; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, op.rollSize / 2);
            this.ctx.lineTo(0, op.rollSize);
            this.ctx.stroke();
            this.ctx.rotate(((360 / 6) * Math.PI) / 180);
            this.ctx.closePath();
        }
        this.ctx.restore();
    };
    /**
     * @description 绘制风车
     */
    Roll.prototype.drawWindmill = function () {
        var op = this.options;
        this.ctx.save();
        for (var i = 0; i < op.windmills.length; i++) {
            this.ctx.beginPath();
            this.ctx.fillStyle = op.windmills[i];
            this.ctx.arc(-op.rollSize / 2, 0, op.rollSize, 0, Math.PI);
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.rotate(((360 / 4) * Math.PI) / 180);
        }
        // 上层固定点
        this.ctx.beginPath();
        this.ctx.fillStyle = op.windmillPointColor;
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    };
    /**
     * @description 绘制子元素
     */
    Roll.prototype.drawChild = function () {
        var _this = this;
        var op = this.options;
        if (!op.showChild)
            return;
        this.Roll.child.forEach(function (c, index) {
            _this.ctx.save();
            _this.ctx.translate(-c.x, 0);
            _this.ctx.globalAlpha = (index + 1) / 10;
            _this.ctx.rotate((c.turn * Math.PI) / 180);
            _this.selectChart();
            _this.ctx.restore();
        });
    };
    /**
     * @description 绘制地面
     */
    Roll.prototype.drawGround = function () {
        var op = this.options;
        if (op.chart !== exports.ROLL_CHART.WHEEL)
            return;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.03;
        this.ctx.moveTo(-(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6), op.rollSize + 3);
        this.ctx.lineTo((op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2, op.rollSize + 3);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    };
    /**
     * @description 设置阴影
     */
    Roll.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Roll;
}(BaseModel));

/**
 * @description Circular模型默认配置选项
 */
var modelDefOptions$2 = {
    arcSize: 8,
    arcGap: 2,
    arcColors: ['#ec7546', '#8364a4', '#ff6c6e', '#5bc6ab'],
    action: exports.CIRCULAR_ACTION.COLLISION
};
/**
 * @description 圆形模型类
 * @extends BaseModel<CircularOptionsType>
 */
var Circular = /*#__PURE__*/ (function (_super) {
    __extends(Circular, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<CircularOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Circular(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$2) || this;
        // 初始化数据
        var op = _this.options;
        var gap = op.arcSize * 2 + op.arcGap;
        _this.collisionPoint = [
            {
                key: 0,
                state: false,
                y: -gap,
                x: 0
            },
            {
                key: 1,
                state: false,
                y: gap,
                x: 0
            },
            {
                key: 2,
                state: false,
                y: 0,
                x: gap
            },
            {
                key: 3,
                state: false,
                y: 0,
                x: -gap
            }
        ];
        _this.turn = 0;
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制圆形
     */
    Circular.prototype.draw = function () {
        this.clearRect();
        this.ctx.save();
        var op = this.options;
        // 控制进程
        if (op.action === exports.CIRCULAR_ACTION.COLLISION)
            this.controller();
        // 旋转
        else if (op.action === exports.CIRCULAR_ACTION.ROTATE) {
            this.ctx.rotate((this.turn * Math.PI) / 180);
            this.turn += 10;
        }
        this.drawCircular();
        this.ctx.restore();
        this.drawText({ esGap: op.arcSize * 4 + op.arcGap * 2 });
    };
    /**
     * @description 控制圆形动画
     */
    Circular.prototype.controller = function () {
        var op = this.options;
        this.collisionPoint.forEach(function (cp) {
            var key = 'y';
            switch (cp.key) {
                case 0:
                    key = 'y';
                    break;
                case 1:
                    key = 'y';
                    break;
                case 2:
                    key = 'x';
                    break;
                case 3:
                    key = 'x';
                    break;
            }
            var gap = op.arcSize * 2 + op.arcGap;
            if (cp[key] === -gap)
                cp.state = true;
            if (cp[key] === gap)
                cp.state = false;
            if (cp.state)
                cp[key]++;
            else
                cp[key]--;
        });
    };
    /**
     * @description 绘制圆形元素
     */
    Circular.prototype.drawCircular = function () {
        var _this = this;
        var op = this.options;
        this.collisionPoint.forEach(function (cp, index) {
            _this.ctx.save();
            _this.ctx.beginPath();
            if (op.arcColors[index]) {
                var color = op.arcColors[index];
                _this.setShadow(color);
                _this.ctx.fillStyle = color;
            }
            _this.ctx.arc(cp.x, cp.y, op.arcSize, 0, Math.PI * 2);
            _this.ctx.fill();
            _this.ctx.closePath();
            _this.ctx.restore();
        });
    };
    /**
     * @description 设置阴影
     * @param {string} [color] - 阴影颜色
     */
    Circular.prototype.setShadow = function (color) {
        var op = this.options;
        color && (this.ctx.shadowColor = color);
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Circular;
}(BaseModel));

/**
 * @description 图片模型默认配置选项
 */
var modelDefOptions$1 = {
    src: 'https://tommyrunner.github.io/web-loading/images/logo.png',
    width: 52,
    height: 52,
    turn: true
};
/**
 * @description 图片模型类
 * @extends BaseModel<ImageOptionsType>
 */
var Img = /*#__PURE__*/ (function (_super) {
    __extends(Img, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<ImageOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Img(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$1) || this;
        _this.img = new Image();
        _this.img.src = _this.options.src;
        _this.turn = 10;
        _this.img.onload = function () {
            _this.run(_this.draw);
        };
        return _this;
    }
    /**
     * @description 绘制图片
     */
    Img.prototype.draw = function () {
        this.clearRect();
        this.drawImg();
        var op = this.options;
        this.drawText({ esGap: op.height / 2 });
    };
    /**
     * @description 绘制图片元素
     */
    Img.prototype.drawImg = function () {
        var op = this.options;
        this.ctx.save();
        if (op.turn)
            this.ctx.rotate((this.turn * Math.PI) / 180);
        this.ctx.drawImage(this.img, -op.width / 2, -op.height / 2, op.width, op.height);
        this.ctx.closePath();
        this.ctx.restore();
        this.turn += 10;
    };
    return Img;
}(BaseModel));

/**
 * @description 骨架屏模型默认配置选项
 */
var modelDefOptions = {
    skeletonColor: 'rgb(240, 240, 240)',
    skeletonAnimationColor: 'rgb(226, 226, 226)',
    radius: 5,
    animation: true,
    deep: true,
    appointElementClass: []
};
/**
 * @description 骨架屏模型类
 * @extends BaseModel<SkeletonOptionsType>
 */
var Skeleton = /*#__PURE__*/ (function (_super) {
    __extends(Skeleton, _super);
    /**
     * @description 构造函数
     * @param {number} w - 宽度
     * @param {number} h - 高度
     * @param {HTMLCanvasElement} canvas - Canvas元素
     * @param {Required<SkeletonOptionsType>} options - 配置选项
     * @param {ElementType} element - 容器元素
     */
    function Skeleton(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions, [], function (model) {
            var op = model.options;
            // 重新初始化canvas
            model.ctx.translate(-model.w / 2, -model.h / 2);
            model.canvas.width = model.element.scrollWidth;
            model.canvas.height = model.element.scrollHeight;
            model.ctx.fillStyle = op.skeletonColor;
        }) || this;
        _this.skeleton = [];
        _this.colorFlow = 0;
        _this.state = 1;
        _this.controller(_this.element.children);
        _this.run(_this.draw);
        return _this;
    }
    /**
     * @description 绘制骨架屏
     */
    Skeleton.prototype.draw = function () {
        this.clearRect();
        this.drawSkeleton();
    };
    /**
     * @description 将元素添加到骨架屏元素列表中
     * @param {Element} element - 要添加的元素
     */
    Skeleton.prototype.addElementToSkeleton = function (element) {
        var op = this.options;
        var filter = op.appointElementClass;
        // 如果设置了appointElementClass，只处理具有该类的元素
        if (filter && filter.length > 0) {
            if (filter.some(function (c) { return element.classList.contains(c); })) {
                this.skeleton.push({ title: element.nodeName, element: element });
            }
        }
        else {
            this.skeleton.push({ title: element.nodeName, element: element });
        }
    };
    /**
     * @description 控制器函数，处理DOM元素
     * @param {HTMLCollection} els - HTML元素集合
     */
    Skeleton.prototype.controller = function (els) {
        var op = this.options;
        for (var _i = 0, _a = Array.from(els); _i < _a.length; _i++) {
            var e = _a[_i];
            // 排除绘制canvas元素
            if (this.canvas === e)
                continue;
            if (op.deep) {
                if (e.children.length <= 0) {
                    this.addElementToSkeleton(e);
                }
                else {
                    // 如果指定了appointElementClass，则包含父元素，否则只包含所有根元素
                    if (op.appointElementClass && op.appointElementClass.length)
                        this.addElementToSkeleton(e);
                    this.controller(e.children);
                }
            }
            else {
                this.addElementToSkeleton(e);
            }
        }
    };
    /**
     * @description 绘制骨架元素
     */
    Skeleton.prototype.drawSkeleton = function () {
        var _this = this;
        var op = this.options;
        var linearGradient = this.ctx.createLinearGradient(0, 0, this.w, this.h);
        linearGradient.addColorStop(0, op.skeletonColor);
        linearGradient.addColorStop(this.colorFlow, op.skeletonAnimationColor);
        linearGradient.addColorStop(1, op.skeletonColor);
        if (op.animation)
            this.ctx.fillStyle = linearGradient;
        this.skeleton.forEach(function (s) {
            var el = s.element;
            // 处理圆角露出问题
            _this.drawRadiusRect(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight, op.radius);
            _this.ctx.fill();
        });
        if (op.animation) {
            if (this.colorFlow >= 0.9)
                this.state = 2;
            if (this.colorFlow <= 0.1)
                this.state = 1;
            if (this.state === 1)
                this.colorFlow += 0.06;
            if (this.state === 2)
                this.colorFlow -= 0.06;
        }
    };
    return Skeleton;
}(BaseModel));

/**
 * @description 动态导入所有模型
 * @note 动态引入会导致404，因此使用静态导入
 */
var models = { Gear: Gear, Zoom: Zoom, Ring: Ring, Bean: Bean, Clock: Clock, Pattern: Pattern, Roll: Roll, Circular: Circular, Img: Img, Skeleton: Skeleton };

/**
 * @description 模型控制器：控制显示的模型
 * @param {number} w - 宽度
 * @param {number} h - 高度
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {Required<OptionsType>} options - 配置选项
 * @param {ElementType} element - 元素
 */
function drawController(w, h, canvas, options, element) {
    try {
        var storeModel = element.$store.model;
        if (!storeModel) {
            var model = null;
            if (!options.custom)
                model = new models[options.model](w, h, canvas, options, element);
            else
                model = new options.custom(w, h, canvas, options, element);
            storeModel = model;
        }
        else {
            // 优化：因为更改高度和宽度后canvas会被重置，需要重新初始化
            storeModel.initContextCall(storeModel.modelDefOptions, storeModel.limits, storeModel.modelDefCall);
        }
    }
    catch (e) {
        $Log.error('draw error(' + e + ')');
    }
}

var $window$5 = window;
/**
 * @description 初始化$store
 * @param {ElementType} element - 容器元素
 * @param {OptionsType} options - 配置选项
 * @param {HooksType} hooks - 钩子函数
 */
function initStore(element, options, hooks) {
    // 存储状态
    element.$store = {
        options: options,
        animationId: undefined,
        loadingId: null,
        model: null,
        hookCall: initStoreHooksCall(hooks)
    };
}
/**
 * @description 初始化钩子调用
 * @returns {HooksType} 钩子类型对象
 */
function initHooksCall() {
    var _a;
    return _a = {},
        _a[exports.HOOKS_CALL_KEY.BEFORE_CLOSE] = [],
        _a[exports.HOOKS_CALL_KEY.CLOSED] = [],
        _a;
}
/**
 * @description 初始化存储钩子调用
 * @param {HooksType} hooks - 钩子
 * @returns {HooksCallType} 钩子调用类型
 */
function initStoreHooksCall(hooks) {
    var _a;
    return _a = {},
        _a[exports.HOOKS_CALL_KEY.BEFORE_CLOSE] = function (fun) {
            hooks[exports.HOOKS_CALL_KEY.BEFORE_CLOSE].push(fun);
        },
        _a[exports.HOOKS_CALL_KEY.CLOSED] = function (fun) {
            hooks[exports.HOOKS_CALL_KEY.CLOSED].push(fun);
        },
        _a;
}
/**
 * @description 初始化Canvas
 * @returns {{canvas: HTMLCanvasElement, hooks: HooksType, loadingId: string}} Canvas初始化对象
 */
function initCanvas() {
    return {
        canvas: $window$5.document.createElement('canvas'),
        hooks: initHooksCall(),
        loadingId: createLoadingId()
    };
}
/**
 * @description 初始化HTML
 * @returns {{content: HTMLDivElement, loadingId: string}} HTML初始化对象
 */
function initHtml() {
    return {
        content: $window$5.document.createElement('div'),
        loadingId: createLoadingId()
    };
}

var $window$4 = window;
/**
 * @description 初始化内容样式
 * @param {ElementType} element - 容器元素
 * @param {Required<OptionsType>} op - 配置选项
 * @param {string} loadingId - 加载ID
 * @param {HTMLCanvasElement | HTMLDivElement} animaEl - 动画元素
 * @returns {ElementType} 容器元素
 */
function initContentStyle(element, op, loadingId, animaEl) {
    // 客户端获取真实宽高，如果启用穿透则获取滚动宽高
    var elementW = op.pointerEvents ? element.scrollWidth : element.clientWidth, elementH = op.pointerEvents ? element.scrollHeight : element.clientHeight, readElementStyle = $window$4.getComputedStyle(element), elementStyle = element.style, contentStyle = animaEl.style;
    if (op.type === exports.LOADING_TYPES.DOM && !op.pointerEvents) {
        element.style.pointerEvents = 'none';
    }
    if (!readElementStyle.position || readElementStyle.position === 'static')
        elementStyle.position = 'relative';
    // 初始化canvas样式
    animaEl.id = loadingId;
    contentStyle.opacity = '0';
    contentStyle.position = 'absolute';
    contentStyle.left = "".concat(op.pointerEvents ? 0 : element.scrollLeft, "px");
    contentStyle.top = "".concat(op.pointerEvents ? 0 : element.scrollTop, "px");
    contentStyle.zIndex = op.zIndex;
    contentStyle.transition = "".concat(op.delayInto / 1000, "s ease-in-out");
    contentStyle.backgroundColor = op.bgColor;
    contentStyle.borderRadius = readElementStyle.borderRadius;
    // 设置canvas大小
    if (toType(animaEl) === 'htmlcanvaselement') {
        setupCanvas(animaEl, elementW, elementH);
    }
    else if (toType(animaEl) === 'htmldivelement') {
        // 初始化兼容html样式
        contentStyle.width = "".concat(elementW, "px");
        contentStyle.height = "".concat(elementH, "px");
        // 居中
        contentStyle.display = 'flex';
        contentStyle.alignItems = 'center';
        contentStyle.justifyContent = 'center';
    }
    // 注入
    element.append(animaEl);
    // 触发进入动画
    $window$4.setTimeout(function () { return (contentStyle.opacity = '1'); }, 0);
    onTransitionEndEvent(element, function () {
        // 等待所有元素出现并完成（动画结束）
        element.$store.loadingId = loadingId;
    });
    return element;
}
/**
 * @description 处理放大失真，同时更改高度和宽度也会重置canvas的所有内容
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {number} w - 宽度
 * @param {number} h - 高度
 */
function setupCanvas(canvas, w, h) {
    var dpr = $window$4.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "".concat(w, "px");
    canvas.style.height = "".concat(h, "px");
}
/**
 * @description 清除样式
 * @param {ElementType} element - 容器元素
 * @param {OptionsType} op - 配置选项
 * @param {HTMLCanvasElement | HTMLDivElement} canvas - Canvas或DIV元素
 */
function clearStyle(element, op, canvas) {
    // 首先视觉过渡
    canvas.style.opacity = '0';
    // 清除扩展
    if (op.type !== exports.LOADING_TYPES.DOM) {
        element.style.boxShadow = 'none';
    }
}

var $window$3 = window;
/**
 * @description Web加载类
 */
var WebLoading = /*#__PURE__*/ (function () {
    /**
     * @description 构造函数
     * @param {OptionsType} [options] - 配置选项
     */
    function WebLoading(options) {
        // canvas动画元素
        this.canvas = null;
        // Html动画元素
        this.htmlElement = null;
        // 动画元素ID
        this.loadingId = null;
        // 容器元素
        this.element = null;
        // 钩子
        this.hooks = null;
        // 大小调整控制
        this.resizeTimeId = null;
        // 初始化默认配置
        this.options = Object.assign(getDefOptions(), options);
    }
    /**
     * @description 重置动画容器大小
     * @param {ElementType} element - 容器元素
     * @param {HTMLCanvasElement | HTMLDivElement} animaEl - 动画元素
     */
    WebLoading.prototype.resize = function (element, animaEl) {
        var _this = this;
        if (!this.resizeTimeId)
            this.resizeTimeId = $window$3.setTimeout(function () {
                var canvas = animaEl;
                var w = element.clientWidth, h = element.clientHeight;
                if (canvas.width > element.clientWidth) {
                    // 收缩时需要计算滚动条
                    w = element.offsetWidth;
                    h = element.offsetHeight;
                }
                if (_this.canvas) {
                    setupCanvas(canvas, w, h);
                    if (element.$store)
                        drawController(w, h, canvas, _this.options, element);
                }
                else if (_this.htmlElement) {
                    _this.htmlElement.style.width = "".concat(w, "px");
                    _this.htmlElement.style.height = "".concat(h, "px");
                }
                _this.resizeTimeId = null;
            }, this.options.delayInto);
    };
    /**
     * @description 关闭动画
     * @param {ElementType} element - 容器元素
     * @param {HTMLCanvasElement | HTMLDivElement} animaEl - 动画元素
     */
    WebLoading.prototype.close = function (element, animaEl) {
        var _this = this;
        var op = this.options;
        var store = element.$store;
        $window$3.setTimeout(function () {
            // 触发关闭动画
            clearStyle(element, op, animaEl);
            if (op.type === exports.LOADING_TYPES.DOM && !op.pointerEvents) {
                element.style.pointerEvents = 'auto';
            }
            // 防止二次关闭，如果二次关闭，需要等待上一个动画结束后再清除缓存
            onTransitionEndEvent(element, function () {
                // 结束canvas动画前需要结束样式
                if (store) {
                    // 清除模型
                    store.model = null;
                    // 关闭前回调
                    _this.callEvent(exports.HOOKS_CALL_KEY.BEFORE_CLOSE);
                    // 停止animationFrame
                    if (store.animationId)
                        clearAnimationFrame(store.animationId);
                }
                // 如果dom是扩展的，清除父元素（父元素由webLoading创建）
                if (op.type !== exports.LOADING_TYPES.DOM)
                    element.remove();
                else
                    animaEl.remove();
                // 擦除状态
                _this.loadingId = null;
                // 关闭后回调
                _this.callEvent(exports.HOOKS_CALL_KEY.CLOSED);
                // 重置钩子
                _this.hooks = initHooksCall();
            });
        }, 
        // 如果是二次关闭，需要主动添加延迟
        !store.loadingId ? op.delayInto : 0);
    };
    /**
     * @description 绘制动画
     * @param {ElementType} element - 容器元素
     */
    WebLoading.prototype.draw = function (element) {
        var op = this.options;
        // 兼容html
        if (op.html) {
            // 初始化基础数据
            var _a = initHtml(), content = _a.content, loadingId = _a.loadingId;
            this.htmlElement = content;
            this.htmlElement.innerHTML = op.html;
            this.loadingId = loadingId;
            // 初始化样式
            this.element = initContentStyle(element, op, loadingId, content);
        }
        else {
            // 初始化基础数据
            var _b = initCanvas(), canvas = _b.canvas, hooks = _b.hooks, loadingId = _b.loadingId;
            this.canvas = canvas;
            this.hooks = hooks;
            this.loadingId = loadingId;
            // 初始化存储
            initStore(element, op, hooks);
            // 初始化样式
            this.element = initContentStyle(element, op, loadingId, canvas);
            if (element.$store) {
                drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element);
            }
            else {
                $Log.error('WebLoading:canvas or ctx null');
            }
        }
    };
    /**
     * @description 触发钩子
     * @param {HOOKS_CALL_KEY} hooksKey - 钩子键
     * @private
     */
    WebLoading.prototype.callEvent = function (hooksKey) {
        if (this.hooks)
            this.hooks[hooksKey].forEach(function (event) {
                event();
            });
    };
    return WebLoading;
}());

var $window$2 = window;
/**
 * @description 扩展加载类
 */
var ExtendLoading = /*#__PURE__*/ (function () {
    /**
     * @description 构造函数
     * @param {OptionsType} [options] - 配置选项
     */
    function ExtendLoading(options) {
        this.options = options;
        this.extendEl = this.initStyle();
    }
    /**
     * @description 初始化扩展容器元素样式
     * @returns {HTMLElement} 扩展容器元素
     * @private
     */
    ExtendLoading.prototype.initStyle = function () {
        this.extendEl = $window$2.document.createElement('div');
        var op = this.options;
        var w = '100vw', h = '100vh', borderRadius = '0px';
        if (op) {
            this.extendEl.classList.add('wl_' + (op.extendClass || 'loading'));
            if (op.type === exports.LOADING_TYPES.MINI) {
                w = '180px';
                h = '160px';
                borderRadius = '10px';
            }
            this.extendEl.style.cssText = "\n          position:fixed;\n          width:".concat(w, ";\n          height:").concat(h, ";\n          top:50%;\n          left:50%;\n          transform:translate(-50%, -50%);\n          border-radius: ").concat(borderRadius, ";\n          z-index: ").concat(op.zIndex, ";\n          box-shadow:\n          2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),\n          6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),\n          12.5px 12.5px 10px rgba(0, 0, 0, 0.035),\n          22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),\n          41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),\n          100px 100px 80px rgba(0, 0, 0, 0.07)\n          ;\n      ");
        }
        $window$2.document.body.appendChild(this.extendEl);
        return this.extendEl;
    };
    /**
     * @description 获取元素
     * @returns {HTMLElement} 扩展容器元素
     */
    ExtendLoading.prototype.getElement = function () {
        return this.extendEl;
    };
    return ExtendLoading;
}());

var $window$1 = window;
/**
 * @description 初始化加载动画
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
function initLoading(options) {
    var webLoading = new WebLoading(options);
    var feelPromiseResolve = null;
    var resize = function () {
        utlWL('resize');
    };
    var loading = function (dom, options) {
        // 保存最后传入的参数
        var op = Object.assign(webLoading.options, options);
        // 防止重复注册
        if (!webLoading.loadingId && !feelPromiseResolve) {
            // 创建扩展DOM
            if (op.type !== exports.LOADING_TYPES.DOM) {
                dom = new ExtendLoading(op).getElement();
            }
            if (!dom)
                $Log.error('The loading function cannot find an HTMLElement element!');
            else {
                // 通过Promise.race处理无感加载
                var loadingPromise = new Promise(function (res) {
                    // 如果notFeel的时间超过关闭时间，则认为是无感加载
                    $window$1.setTimeout(function () {
                        res(true);
                    }, op.notFeel);
                });
                var feelPromise = new Promise(function (res) {
                    feelPromiseResolve = res;
                });
                Promise.race([loadingPromise, feelPromise]).then(function (res) {
                    if (res)
                        webLoading.draw(dom);
                    else {
                        // 处理扩展DOM
                        if (op.type !== exports.LOADING_TYPES.DOM)
                            dom.remove();
                    }
                    feelPromiseResolve = null;
                });
            }
        }
    };
    var update = function (options) {
        var canvas = webLoading.canvas;
        var op = Object.assign(webLoading.options, options);
        var element = webLoading.element;
        if (canvas && op && element && element.$store)
            drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, op, element);
    };
    var close = function () {
        feelPromiseResolve && feelPromiseResolve(false);
        utlWL('close');
    };
    // 获取基本信息
    var getLoadingId = function () { return webLoading.loadingId; };
    var getOptions = function () { return webLoading.options; };
    // WebLoading操作工具函数
    function utlWL(key) {
        if (webLoading.element) {
            // canvas元素
            var temEl = webLoading.canvas;
            // html元素
            if (webLoading.htmlElement)
                temEl = webLoading.htmlElement;
            // 设置
            if (temEl)
                webLoading[key](webLoading.element, temEl);
            else
                $Log.warn('Animation element not found!');
        }
    }
    return {
        loading: loading,
        resize: resize,
        close: close,
        update: update,
        getOptions: getOptions,
        getLoadingId: getLoadingId
    };
}
/**
 * @description 扩展加载方法
 * @param {LOADING_TYPES} type - 加载类型
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @private
 */
function _$extendLoading(type, options) {
    return initLoading(Object.assign(getDefOptions(), options || {}, { type: type }));
}
/**
 * @description 全屏加载
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
function fullLoading(options) {
    return _$extendLoading(exports.LOADING_TYPES.FULL, options);
}
/**
 * @description 迷你加载
 * @param {OptionsType} options - 配置选项
 * @returns {LoadingType} 返回加载操作对象
 * @public
 */
function miniLoading(options) {
    return _$extendLoading(exports.LOADING_TYPES.MINI, options);
}

var $window = window;
$window.BaseModel = BaseModel;
// 初始化
$window.initLoading = function (options) {
    return initLoading(options);
};
// 扩展加载方法
// 移动端
$window.miniLoading = function (options) {
    return _$extendLoading(exports.LOADING_TYPES.MINI, options);
};
// 全屏
$window.fullLoading = function (options) {
    return _$extendLoading(exports.LOADING_TYPES.FULL, options);
};

exports.BaseModel = BaseModel;
exports.fullLoading = fullLoading;
exports.initLoading = initLoading;
exports.miniLoading = miniLoading;
