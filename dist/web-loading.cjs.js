'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Supported loading methods
 */
/** @public */
var LOADING_TYPES;
(function (LOADING_TYPES) {
    LOADING_TYPES["DOM"] = "dom";
    LOADING_TYPES["FULL"] = "full";
    LOADING_TYPES["MINI"] = "mini";
})(LOADING_TYPES || (LOADING_TYPES = {}));
/**
 * Supported models
 */
/** @public */
var MODEL_TYPES;
(function (MODEL_TYPES) {
    // Gear
    MODEL_TYPES["GEAR"] = "Gear";
    // RING
    MODEL_TYPES["RING"] = "Ring";
    // ZOOM
    MODEL_TYPES["ZOOM"] = "Zoom";
    // PATTERN
    MODEL_TYPES["PATTERN"] = "Pattern";
    // CLOCK
    MODEL_TYPES["CLOCK"] = "Clock";
    // BEAN
    MODEL_TYPES["BEAN"] = "Bean";
    // ROLL
    MODEL_TYPES["ROLL"] = "Roll";
    // Circular
    MODEL_TYPES["Circular"] = "Circular";
    // IMG
    MODEL_TYPES["IMG"] = "Img";
    // SKELETON
    MODEL_TYPES["SKELETON"] = "Skeleton";
})(MODEL_TYPES || (MODEL_TYPES = {}));
/**
 *
 * @returns Return to default configuration
 */
/** @public */
function getDefOptions() {
    return {
        custom: null,
        html: '',
        type: LOADING_TYPES.DOM,
        extendClass: 'extend',
        model: MODEL_TYPES.GEAR,
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
/** @public */
var HOOKSCALL_KEY;
(function (HOOKSCALL_KEY) {
    HOOKSCALL_KEY["BEFORE_COLSE"] = "beforeColse";
    HOOKSCALL_KEY["COLSED"] = "colsed";
})(HOOKSCALL_KEY || (HOOKSCALL_KEY = {}));
/** @public */
var LOG_TYPES;
(function (LOG_TYPES) {
    LOG_TYPES[LOG_TYPES["INFO"] = 1] = "INFO";
    LOG_TYPES[LOG_TYPES["WARN"] = 2] = "WARN";
    LOG_TYPES[LOG_TYPES["ERROR"] = 3] = "ERROR";
})(LOG_TYPES || (LOG_TYPES = {}));
/**
 * Log output
 * @param message - content
 * @param config - to configure
 */
/** @public */
var $Log = /*#__PURE__*/ (function () {
    function $Log() {
    }
    $Log.info = function (message) {
        this.call(message, LOG_TYPES.INFO);
    };
    $Log.warn = function (message) {
        this.call(message, LOG_TYPES.WARN);
    };
    $Log.error = function (message) {
        this.call(message, LOG_TYPES.ERROR);
    };
    $Log.call = function (message, type, config) {
        if (type === void 0) { type = LOG_TYPES.INFO; }
        if (config === void 0) { config = {
            color: getDefOptions().themeColor,
            bgColor: getDefOptions().bgColor
        }; }
        var bgColor = config.bgColor;
        // Warning color cannot be changed
        if (type === 2)
            bgColor = '#fffbe5';
        // The wrong color cannot be changed
        if (type === 3)
            bgColor = '#fff0f0';
        var style = "\n      background:".concat(bgColor, ";\n      font-size:14px;\n      color:").concat(config.color, ";\n      padding: 4px;\n      border: 1px solid;");
        console.log("%c web-loading:".concat(message, " "), style);
    };
    return $Log;
}());
/**
 * Judge null
 * @param value - Judgment value
 * @returns boolean
 */
/** @public */
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
 * empty aniamtions
 * @param id -
 */
/** @public */
function clearAnimationFrame(id) {
    if (!window.requestAnimationFrame) {
        window.clearInterval(id);
    }
    else {
        window.cancelAnimationFrame(id);
    }
}
/**
 * Type acquisition
 * @param key -
 * @returns
 */
/** @public */
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
 * Listening to animation end function
 * @param el - element
 * @param fun - Execute Function
 */
/** @public */
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
 * Create a unique loadingid
 * @returns
 */
/** @public */
function createLoadingId() {
    var id = String(Date.now());
    if (window.crypto && window.crypto.randomUUID)
        id = window.crypto.randomUUID();
    return 'wl_' + id.replace(/-/g, '');
}
/** @public */
var ZOOM_ACTION;
(function (ZOOM_ACTION) {
    ZOOM_ACTION["SCALE"] = "scale";
    ZOOM_ACTION["WAVE"] = "wave";
    ZOOM_ACTION["HEIGHT"] = "height";
})(ZOOM_ACTION || (ZOOM_ACTION = {}));
/** @public */
var PATTERN_CHART;
(function (PATTERN_CHART) {
    PATTERN_CHART["RECT"] = "rect";
    PATTERN_CHART["ARC"] = "arc";
    PATTERN_CHART["TRIANGLE"] = "triangle";
    PATTERN_CHART["HEART"] = "heart";
    PATTERN_CHART["POLYGON"] = "polygon";
})(PATTERN_CHART || (PATTERN_CHART = {}));
/** @public */
var ROLL_CHART;
(function (ROLL_CHART) {
    ROLL_CHART["RECT"] = "rect";
    ROLL_CHART["WHEEL"] = "wheel";
    ROLL_CHART["WINDMILL"] = "windmill";
})(ROLL_CHART || (ROLL_CHART = {}));
/** @public */
var CIRCULAR_ACTION;
(function (CIRCULAR_ACTION) {
    CIRCULAR_ACTION["COLLISION"] = "collision";
    CIRCULAR_ACTION["ROTATE"] = "rotate";
})(CIRCULAR_ACTION || (CIRCULAR_ACTION = {}));

/** @public */
var BaseModel = /*#__PURE__*/ (function () {
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
    function BaseModel(w, h, canvas, options, element, modelDefOptions, limits, modelDefCall) {
        // Default Options of Model
        this.modelDefOptions = undefined;
        // Limits of Model
        this.limits = undefined;
        // Provides Callback function for model initialization
        this.modelDefCall = undefined;
        this.webLog = $Log;
        this.stepClear = 1;
        this.w = w;
        this.h = h;
        this.canvas = canvas;
        // Get a 2d brush by default
        this.ctx = canvas.getContext('2d');
        this.options = options;
        this.element = element;
        // Initialize model
        this.initContextCall(modelDefOptions, limits, modelDefCall);
    }
    // Initialize brush
    BaseModel.prototype._$initBaseContext = function () {
        this.clearRect();
        this.ctx.resetTransform();
        // Default theme color
        var op = this.options, defW = this.canvas.width, defH = this.canvas.height;
        this.ctx.fillStyle = op.themeColor;
        this.ctx.strokeStyle = op.themeColor;
        this.ctx.shadowColor = op.shadowColor;
        this.ctx.font = "".concat(op.fontSize, "px ").concat(op.fontFamily, " small-caps");
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.translate(defW / 2, defH / 2);
        // Synchronous size processing distortion
        var dpr = window.devicePixelRatio || 1;
        this.ctx.scale(dpr, dpr);
        this.ctx.save();
    };
    // Initialize default events
    BaseModel.prototype._$initEvent = function () {
        var _this = this;
        // Empty canvas before closing
        this.element.$store.hookCall.beforeColse(function () {
            _this.clearRect();
        });
    };
    /**
     * Encapsulate requestAnimationFrame to trigger the animation pin
     * @param fun - Trigger function
     * @returns
     */
    BaseModel.prototype._$animationFrame = function (fun) {
        var _this = this;
        // compatible
        if (!window.requestAnimationFrame) {
            this.element.$store.animationId = window.setInterval(fun, this.options.delay);
        }
        // Use the time axis to control the trigger time
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
     * Initialize brush properties
     * @param modelDefOptions - Provides Options for model initialization
     * @param limits - Provides Limits for model initialization
     * @param modelDefCall - Provides Callback function for model initialization
     */
    BaseModel.prototype.initContextCall = function (modelDefOptions, limits, modelDefCall) {
        var _this = this;
        // Initialize the point context of base
        this._$initBaseContext();
        // Initialize the hook event of base
        this._$initEvent();
        // Initialize model options
        if (isNull(modelDefOptions)) {
            // Record options
            this.modelDefOptions = modelDefOptions;
            this.options = Object.assign(modelDefOptions, this.options);
            this.element.$store.options = this.options;
            // Judge whether the attribute value needs to be limited (only for prompt)
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
    // Start Animation
    BaseModel.prototype.run = function (fun) {
        // If it is already in the loading state, there is no need to re-instance
        if (this.element.$store.animationId)
            this.clearAnimationFrame(this.element.$store.animationId);
        this._$animationFrame(fun);
    };
    /**
     * Cancel animationFrame animation pin
     * @param id - Animation id
     */
    BaseModel.prototype.clearAnimationFrame = function (id) {
        clearAnimationFrame(id);
    };
    // Empty the canvas
    BaseModel.prototype.clearRect = function (x, y, w_r, h) {
        var defW = this.canvas.width, defH = this.canvas.height;
        // Because the starting point has been set to the center, expansion is needed
        if (isNull(x) && isNull(y) && isNull(w_r) && isNull(h)) {
            this.ctx.clearRect(x, y, w_r, h);
        }
        // Empty circular area
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
     * Draw a rounded rectangle
     * @param x - x
     * @param y - y
     * @param w - width
     * @param h - height
     * @param r - radius
     */
    BaseModel.prototype.drowRadiusRect = function (x, y, w, h, r) {
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
     *
     * @param params -
     * DrawTextParamsType:
     *    esGap?: Extra void
          x?: X-axis
          text?: text
          textColor?: text color
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

// Default Options of model
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
// Warning value
var limits$6 = [
    {
        key: 'lineNum',
        message: 'lineNum value 4-18',
        limit: function (key) {
            return key >= 4 && key <= 18;
        }
    }
];
var Gear = /*#__PURE__*/ (function (_super) {
    __extends(Gear, _super);
    function Gear(w, h, canvas, options, element) {
        var _this = 
        // 1.Initialize
        _super.call(this, w, h, canvas, options, element, modelDefOptions$9, limits$6, function (model) {
            // Model extra initial callback function
            var op = model.options;
            model.ctx.lineCap = op.lineCap;
            model.ctx.lineWidth = op.lineWidth;
            model.ctx.save();
        }) || this;
        _this.optimization(_this.options.textGap + _this.options.lineEnd);
        // 2.Start the animation needle and record the status
        _this.aps = Array.from({ length: _this.options.lineNum }, function (_, _index) { return _index; });
        _this.run(_this.draw);
        return _this;
    }
    Gear.prototype.draw = function () {
        this.clearRect();
        // technological process
        this.controller();
        // Draw gear
        this.drawGear();
        // Draw text
        var op = this.options;
        this.drawText({ esGap: op.lineEnd });
    };
    Gear.prototype.controller = function () {
        var _this = this;
        var op = this.options;
        if (op.direction)
            this.aps = this.aps.map(function (a) { return (a - 1 <= 0 ? _this.aps.length - 1 : a - 1); });
        else
            this.aps = this.aps.map(function (a) { return (a + 1 > _this.aps.length ? 0 : a + 1); });
    };
    Gear.prototype.drawGear = function () {
        var op = this.options;
        this.ctx.save();
        // Set Shadow
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
        // Draw loading gear
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
     * Optimize processing (mainly optimize the default text position)
     * @param textY
     */
    Gear.prototype.optimization = function (textY) {
        // If optimization is turned on (optimize font position)
        if (this.options.optimization) {
            // Adjust according to width and height
            if (textY * 4 > this.h) {
                this.options.lineStart = this.h / 6 - 5;
                this.options.lineEnd = this.h / 6;
                this.options.textGap = 2;
            }
        }
    };
    return Gear;
}(BaseModel));

var modelDefOptions$8 = {
    zoomGap: 10,
    maxSize: 16,
    zoomNum: 5,
    lineWidth: 10,
    zoomHeight: 2,
    lineCap: 'round',
    action: ZOOM_ACTION.SCALE,
    direction: true,
    zoomColors: []
};
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
var Zoom = /*#__PURE__*/ (function (_super) {
    __extends(Zoom, _super);
    function Zoom(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$8, limits$5, function (model) {
            var op = model.options;
            model.ctx.lineCap = op.lineCap;
            model.ctx.lineWidth = op.lineWidth;
            // Center ((zoom width * number+1)+(zoom gap * number+1))/2, because the first zoom shifts the required number+1, height/2
            model.ctx.translate(-(op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2, -op.zoomHeight / 2);
            model.ctx.save();
        }) || this;
        _this.zoomIndex = _this.options.direction ? 0 : _this.options.zoomNum - 1;
        _this.list = Array.from({ length: _this.options.zoomNum }, function (_, _index) {
            return Object.assign({
                value: _this.options.lineWidth,
                // 0: initial, 1: bigger, 2: smaller
                state: 0
            });
        });
        _this.run(_this.draw);
        return _this;
    }
    Zoom.prototype.draw = function () {
        this.clearRect();
        // Draw zoom
        this.drawZoom();
        var op = this.options;
        this.drawText({ esGap: op.maxSize, x: (op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2 });
        // technological process
        this.controller();
    };
    Zoom.prototype.controller = function () {
        var op = this.options;
        if (op.direction && this.zoomIndex >= op.zoomNum)
            this.zoomIndex = 0;
        else if (op.direction && this.zoomIndex < 0)
            this.zoomIndex = op.zoomNum - 1;
    };
    Zoom.prototype.drawZoom = function () {
        var op = this.options;
        for (var i = 0; i < op.zoomNum; i++) {
            // Process change
            if (this.list[i].state === 1)
                this.list[i].value += 2;
            else if (this.list[i].state === 2 && this.list[i].value >= op.lineWidth)
                this.list[i].value--;
            if (op.action === ZOOM_ACTION.SCALE)
                this.ctx.lineWidth = this.list[i].value;
            // State change
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
            // Draw according to num
            this.ctx.beginPath();
            if (op.zoomColors.length > 0 && op.zoomColors[i])
                this.ctx.strokeStyle = op.zoomColors[i];
            else
                this.ctx.strokeStyle = op.themeColor;
            var sH = 0, eH = op.zoomHeight;
            if (op.action === ZOOM_ACTION.HEIGHT || op.action === ZOOM_ACTION.WAVE) {
                sH = -this.list[i].value;
            }
            if (op.action === ZOOM_ACTION.WAVE) {
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
var Ring = /*#__PURE__*/ (function (_super) {
    __extends(Ring, _super);
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
    Ring.prototype.draw = function () {
        this.clearRect();
        this.controller();
        var op = this.options;
        this.drawText({ esGap: op.ringNum * (op.radius + op.ringGap / 2) });
    };
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
    Ring.prototype.drawRing = function (r, arcGap, angle) {
        if (arcGap === void 0) { arcGap = 1; }
        if (angle === void 0) { angle = 0; }
        // First arc
        this.ctx.beginPath();
        this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle);
        this.ctx.stroke();
        this.ctx.closePath();
        // Second arc
        this.ctx.beginPath();
        this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle);
        this.ctx.stroke();
        this.ctx.closePath();
    };
    return Ring;
}(BaseModel));

var modelDefOptions$6 = {
    beanSize: 15,
    pointLength: 15
};
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
var Bean$1 = /*#__PURE__*/ (function (_super) {
    __extends(Bean, _super);
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
        // Draw points
        this.drawPoint();
        // Filter Canvas
        this.drawFillter();
        // Draw text
        this.drawText({ esGap: op.beanSize });
        // technological process
        this.controller();
    };
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
    Bean.prototype.drawFillter = function () {
        var op = this.options;
        // eye
        this.clearRect(-op.beanSize / 3 + this.bean.nowX, -op.beanSize / 2, op.beanSize / 4);
        // follow
        this.clearRect(-(op.pointLength * op.beanSize) / 2 - op.beanSize / 2 + 0.2, -this.h, this.bean.nowX + (op.pointLength * op.beanSize) / 2 - op.beanSize / 2, this.h * 2);
        // get into
        this.clearRect(-(op.pointLength * op.beanSize) / 2, -this.h, -180, this.h * 2);
        // leave
        this.clearRect((op.pointLength * op.beanSize) / 2, -this.h, 180, this.h * 2);
    };
    Bean.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Bean;
}(BaseModel));

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
var limits$2 = [
    {
        key: 'lineColors',
        message: 'lineColors.length <= 3',
        limit: function (key) {
            return key.length <= 3;
        }
    }
];
var Clock = /*#__PURE__*/ (function (_super) {
    __extends(Clock, _super);
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
    Clock.prototype.draw = function () {
        this.clearRect();
        // Draw clock
        this.drawClock();
    };
    // drawText(h: number, m: number, s: number) {
    //   const op = this.options
    //   this.ctx.save()
    //   this.ctx.beginPath()
    //   this.ctx.fillText(op.text, 0, y)
    //   this.ctx.closePath()
    //   this.ctx.restore()
    // }
    Clock.prototype.drawClock = function () {
        var op = this.options;
        var s = new Date().getSeconds();
        var m = new Date().getMinutes();
        var h = new Date().getHours();
        // top
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.moveTo(-5, -(op.clockSize + op.clockGap));
        this.ctx.lineTo(5, -(op.clockSize + op.clockGap));
        this.ctx.stroke();
        this.ctx.closePath();
        // Outer circle
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
        // scale
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
        // Clockwise
        if (op.hLine) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineWidth = op.lineWidth * 1.6;
            if (op.lineColors[0])
                this.ctx.strokeStyle = op.lineColors[0];
            // Initialization point
            this.ctx.rotate((-90 * Math.PI) / 180);
            this.ctx.rotate((((h * 360) / 60) * Math.PI) / 180);
            this.ctx.moveTo(-1, 0);
            this.ctx.lineTo(op.clockSize / 2, 0);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        }
        // minute hand
        if (op.mLine) {
            this.ctx.save();
            this.ctx.beginPath();
            if (op.lineColors[1])
                this.ctx.strokeStyle = op.lineColors[1];
            this.ctx.lineWidth = op.lineWidth * 1.2;
            // Initialization point
            this.ctx.rotate((-90 * Math.PI) / 180);
            this.ctx.rotate((((m * 360) / 60) * Math.PI) / 180);
            this.ctx.moveTo(-1, 0);
            this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0);
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
        }
        // second hand
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
    Clock.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Clock;
}(BaseModel));

var modelDefOptions$4 = {
    charts: [PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON],
    chartColors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd'],
    maxHeight: 60,
    chartSize: 12
};
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
var Pattern = /*#__PURE__*/ (function (_super) {
    __extends(Pattern, _super);
    function Pattern(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$4, limits$1, function (model) {
            model.options.delay = 10;
        }) || this;
        _this.pattern = {
            color: _this.randomState('chartColors'),
            nowHeight: 10,
            chart: _this.randomState('charts'),
            shadow: 0,
            nowSatate: 1,
            turn: 0
        };
        _this.run(_this.draw);
        return _this;
    }
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
        // Empty hidden part
        this.clearRect(-this.w, 0, this.w * 2, this.h);
        // Control value change
        this.controller(op);
        this.drawText({ textColor: this.pattern.color });
    };
    Pattern.prototype.controller = function (op) {
        this.pattern.turn += 10; // angle
        // Height and shadow
        if (this.pattern.nowSatate === 1) {
            this.pattern.nowHeight--;
            this.pattern.shadow += 0.2;
        }
        else if (this.pattern.nowSatate === 2) {
            this.pattern.nowHeight++;
            this.pattern.shadow -= 0.2;
        }
        this.pattern.shadow = Math.floor(this.pattern.shadow * 100) / 100;
        // speed
        if (this.pattern.nowHeight <= -op.chartSize && this.pattern.nowHeight % 8 == 0) {
            op.delay += 0.5;
            op.delay = Math.floor(op.delay * 100) / 100;
        }
        // Range
        if (this.pattern.nowHeight <= -op.maxHeight) {
            this.pattern.nowSatate = 2;
        }
        else if (this.pattern.nowHeight >= op.chartSize) {
            this.pattern.nowSatate = 1;
            op.delay = 10;
            // Toggle Graphics
            this.pattern.chart = this.randomState('charts');
            // Toggle Color
            this.pattern.color = this.randomState('chartColors');
        }
    };
    Pattern.prototype.selectChart = function (x, y, size) {
        switch (this.pattern.chart) {
            case PATTERN_CHART.RECT:
                this.drawRect(x, y, size);
                break;
            case PATTERN_CHART.ARC:
                this.drawArc(x, y, size);
                break;
            case PATTERN_CHART.TRIANGLE:
                this.drawTriangle(x, y, size);
                break;
            case PATTERN_CHART.HEART:
                this.drawHeart(x, y, size);
                break;
            case PATTERN_CHART.POLYGON:
                this.drawPolygon(x, y, size);
                break;
        }
    };
    Pattern.prototype.randomState = function (key) {
        var op = this.options;
        return op[key][parseInt(String(Math.random() * op[key].length))];
    };
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
    Pattern.prototype.drawRect = function (x, y, size) {
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.translate(-size / 2, -size / 2);
        this.ctx.fillRect(x, y, size, size);
        this.ctx.closePath();
        this.ctx.restore();
    };
    Pattern.prototype.drawArc = function (x, y, size) {
        this.ctx.save();
        this.ctx.beginPath();
        this.setShadow();
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    };
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
    Pattern.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowColor = this.pattern.color;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Pattern;
}(BaseModel));

var modelDefOptions$3 = {
    rollGap: 12,
    childNum: 4,
    rollSize: 16,
    showChild: true,
    chart: ROLL_CHART.WHEEL,
    windmills: ['#1ab3ea', '#de6834', '#30925d', '#f48ea5'],
    windmillPointColor: '#f2c31f',
    fixad: false
};
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
var Roll = /*#__PURE__*/ (function (_super) {
    __extends(Roll, _super);
    function Roll(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$3, limits) || this;
        _this.Roll = {
            turn: 1,
            nowX: _this.options.fixad
                ? 0
                : (_this.options.childNum / 2) * (_this.options.rollSize + _this.options.rollGap) + _this.options.rollGap / 2,
            state: 2,
            child: []
        };
        _this.run(_this.draw);
        return _this;
    }
    Roll.prototype.draw = function () {
        this.clearRect();
        // ground
        this.drawGround();
        // Draw child
        this.drawChild();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(-this.Roll.nowX, 0);
        this.ctx.rotate((this.Roll.turn * Math.PI) / 180);
        // Draw Graph
        this.selectChart();
        // technological process
        this.controller();
        this.ctx.restore();
        // Draw text
        var op = this.options;
        this.drawText({ esGap: op.rollSize });
    };
    Roll.prototype.selectChart = function () {
        var op = this.options;
        switch (op.chart) {
            case ROLL_CHART.RECT:
                this.drawRect();
                break;
            case ROLL_CHART.WHEEL:
                this.drawWheel();
                break;
            case ROLL_CHART.WINDMILL:
                this.drawWindmill();
                break;
        }
    };
    Roll.prototype.controller = function () {
        var op = this.options;
        if (this.Roll.state === 1) {
            this.Roll.turn -= 10;
            if (op.delay < 20 && !op.fixad)
                op.delay += 2;
        }
        if (this.Roll.state === 2) {
            this.Roll.turn += 10;
            if (op.delay > 10 && !op.fixad)
                op.delay -= 5;
        }
        if (op.fixad)
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
    // square
    Roll.prototype.drawRect = function () {
        var op = this.options;
        this.ctx.save();
        this.setShadow();
        this.ctx.translate(-op.rollSize / 2, -op.rollSize / 2);
        this.ctx.fillRect(0, 0, op.rollSize, op.rollSize);
        this.ctx.restore();
    };
    // wheel
    Roll.prototype.drawWheel = function () {
        var op = this.options;
        this.ctx.save();
        this.ctx.lineWidth = 4;
        // Inner circle 1
        this.ctx.beginPath();
        this.ctx.arc(0, 0, op.rollSize / 6, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        // Inner circle 2
        this.ctx.beginPath();
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        // Outer circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, op.rollSize, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        // hub
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
    // windmill
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
        // Upper level consolidation
        this.ctx.beginPath();
        this.ctx.fillStyle = op.windmillPointColor;
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    };
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
    Roll.prototype.drawGround = function () {
        var op = this.options;
        if (op.chart !== ROLL_CHART.WHEEL)
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
    Roll.prototype.setShadow = function () {
        var op = this.options;
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Roll;
}(BaseModel));

var modelDefOptions$2 = {
    arcSize: 8,
    arcGap: 2,
    arcColors: ['#ec7546', '#8364a4', '#ff6c6e', '#5bc6ab'],
    action: CIRCULAR_ACTION.COLLISION
};
var Bean = /*#__PURE__*/ (function (_super) {
    __extends(Bean, _super);
    function Bean(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions$2) || this;
        // Initialize data
        var op = _this.options;
        var gap = op.arcSize * 2 + op.arcGap;
        _this.collsionPoint = [
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
    Bean.prototype.draw = function () {
        this.clearRect();
        this.ctx.save();
        var op = this.options;
        // technological process
        if (op.action === CIRCULAR_ACTION.COLLISION)
            this.controller();
        // rotate
        else if (op.action === CIRCULAR_ACTION.ROTATE) {
            this.ctx.rotate((this.turn * Math.PI) / 180);
            this.turn += 10;
        }
        this.drawCircular();
        this.ctx.restore();
        this.drawText({ esGap: op.arcSize * 4 + op.arcGap * 2 });
    };
    Bean.prototype.controller = function () {
        var op = this.options;
        this.collsionPoint.forEach(function (cp) {
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
    Bean.prototype.drawCircular = function () {
        var _this = this;
        var op = this.options;
        this.collsionPoint.forEach(function (cp, index) {
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
    Bean.prototype.setShadow = function (color) {
        var op = this.options;
        color && (this.ctx.shadowColor = color);
        this.ctx.shadowOffsetX = op.shadowOffsetX;
        this.ctx.shadowOffsetY = op.shadowOffsetY;
        this.ctx.shadowBlur = op.shadowBlur;
    };
    return Bean;
}(BaseModel));

var modelDefOptions$1 = {
    src: 'data:image/png;base64,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',
    width: 52,
    height: 52,
    turn: true
};
var Img = /*#__PURE__*/ (function (_super) {
    __extends(Img, _super);
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
    Img.prototype.draw = function () {
        this.clearRect();
        this.drawImg();
        var op = this.options;
        this.drawText({ esGap: op.height / 2 });
    };
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

var modelDefOptions = {
    skeletonColor: 'rgb(240, 240, 240)',
    skeletonAnimationColor: 'rgb(226, 226, 226)',
    radius: 5,
    animation: true,
    deep: true,
    appoint: ''
};
var Skeleton = /*#__PURE__*/ (function (_super) {
    __extends(Skeleton, _super);
    function Skeleton(w, h, canvas, options, element) {
        var _this = _super.call(this, w, h, canvas, options, element, modelDefOptions, [], function (model) {
            var op = model.options;
            // Reinitialize the canvas
            model.ctx.translate(-model.w / 2, -model.h / 2);
            model.canvas.width = model.element.scrollWidth;
            model.canvas.height = model.element.scrollHeight;
            model.ctx.fillStyle = op.skeletonColor;
        }) || this;
        _this.skeleton = [];
        _this.colorFlow = 0;
        _this.state = 1;
        _this.WL_IMG = 'wl-img';
        _this.controller(_this.element.children);
        _this.run(_this.draw);
        return _this;
    }
    Skeleton.prototype.draw = function () {
        this.clearRect();
        this.drawSkeleton();
    };
    Skeleton.prototype.controller = function (els) {
        var op = this.options;
        for (var _i = 0, _a = Array.from(els); _i < _a.length; _i++) {
            var e = _a[_i];
            if (this.element.loadingId === e.id)
                continue;
            if (op.appoint.length > 0 && e.getAttribute(op.appoint) === null)
                continue;
            if (op.deep) {
                if (e.children.length <= 0) {
                    this.skeleton.push({ title: e.nodeName, element: e });
                }
                else
                    this.controller(e.children);
            }
            else {
                this.skeleton.push({ title: e.nodeName, element: e });
            }
        }
    };
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
            // Handle the problem of fillet exposure
            _this.drowRadiusRect(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight, op.radius);
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

// 动态引入会导致404
var models = { Gear: Gear, Zoom: Zoom, Ring: Ring, Bean: Bean$1, Clock: Clock, Pattern: Pattern, Roll: Roll, Circular: Bean, Img: Img, Skeleton: Skeleton };

/**
 * Model controller: which controls the displayed model
 * @param w
 * @param h
 * @param canvas
 * @param options
 * @param element
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
            // Optimize:Because canvas will be reset after changing height and width, initialization is required
            storeModel.initContextCall(storeModel.modelDefOptions, storeModel.limits, storeModel.modelDefCall);
        }
    }
    catch (e) {
        $Log.error('draw error(' + e + ')');
    }
}

var $window$5 = window;
/**
 * Initialize $store
 * @param element Container element
 * @param hooks Hook function
 */
function initStore(element, options, hooks) {
    // Storage status
    element.$store = {
        options: options,
        animationId: undefined,
        loadingId: null,
        model: null,
        hookCall: initStoreHooksCall(hooks)
    };
}
function initHooksCall() {
    var _a;
    return _a = {},
        _a[HOOKSCALL_KEY.BEFORE_COLSE] = [],
        _a[HOOKSCALL_KEY.COLSED] = [],
        _a;
}
// Initialize hooks
function initStoreHooksCall(hooks) {
    var _a;
    return _a = {},
        _a[HOOKSCALL_KEY.BEFORE_COLSE] = function (fun) {
            hooks[HOOKSCALL_KEY.BEFORE_COLSE].push(fun);
        },
        _a[HOOKSCALL_KEY.COLSED] = function (fun) {
            hooks[HOOKSCALL_KEY.COLSED].push(fun);
        },
        _a;
}
function initCanvas() {
    return {
        canvas: $window$5.document.createElement('canvas'),
        hooks: initHooksCall(),
        loadingId: createLoadingId()
    };
}
function initHtml() {
    return {
        content: $window$5.document.createElement('div'),
        loadingId: createLoadingId()
    };
}

var $window$4 = window;
function initContentStyle(element, op, loadingId, animaEl) {
    // The client takes the true width and height. If penetration is enabled, the rolling width and height are taken
    var elementW = op.pointerEvents ? element.scrollWidth : element.clientWidth, elementH = op.pointerEvents ? element.scrollHeight : element.clientHeight, readElementStyle = $window$4.getComputedStyle(element), elementStyle = element.style, contentStyle = animaEl.style;
    if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
        element.style.pointerEvents = 'none';
    }
    if (!readElementStyle.position || readElementStyle.position === 'static')
        elementStyle.position = 'relative';
    // Initialize canvas style
    animaEl.id = loadingId;
    contentStyle.opacity = '0';
    contentStyle.position = 'absolute';
    contentStyle.left = "".concat(op.pointerEvents ? 0 : element.scrollLeft, "px");
    contentStyle.top = "".concat(op.pointerEvents ? 0 : element.scrollTop, "px");
    contentStyle.zIndex = op.zIndex;
    contentStyle.transition = "".concat(op.delayInto / 1000, "s ease-in-out");
    contentStyle.backgroundColor = op.bgColor;
    contentStyle.borderRadius = readElementStyle.borderRadius;
    // Set canvas size
    if (toType(animaEl) === 'htmlcanvaselement') {
        setupCanvas(animaEl, elementW, elementH);
    }
    else if (toType(animaEl) === 'htmldivelement') {
        // Initialize compatible html styles
        contentStyle.width = "".concat(elementW, "px");
        contentStyle.height = "".concat(elementH, "px");
        // Center
        contentStyle.display = 'flex';
        contentStyle.alignItems = 'center';
        contentStyle.justifyContent = 'center';
    }
    // injection
    element.append(animaEl);
    // Trigger to enter animation
    $window$4.setTimeout(function () { return (contentStyle.opacity = '1'); }, 0);
    onTransitionEndEvent(element, function () {
        // Wait for all elements to appear and complete (animation ends)
        element.$store.loadingId = loadingId;
    });
    return element;
}
/**
 * Handle the amplification distortion. At the same time,
 * changing the height and width will also reset all contents of the canvas.
 * @param canvas
 * @param w
 * @param h
 */
function setupCanvas(canvas, w, h) {
    var dpr = $window$4.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = "".concat(w, "px");
    canvas.style.height = "".concat(h, "px");
}
function clearStyle(element, op, canvas) {
    // First visual transition
    canvas.style.opacity = '0';
    // Clear Extension
    if (op.type !== LOADING_TYPES.DOM) {
        element.style.boxShadow = 'none';
    }
}

var $window$3 = window;
var WebLoading = /*#__PURE__*/ (function () {
    function WebLoading(options) {
        // canvas animation elements
        this.canvas = null;
        // Html animation elements
        this.htmlElement = null;
        // Animation element id
        this.loadingId = null;
        // Container element
        this.element = null;
        // hooks
        this.hooks = null;
        // Resize control
        this.resizeTimeId = null;
        // Initialize default configuration
        this.options = Object.assign(getDefOptions(), options);
    }
    /**
     * Reset Animation Container Size
     * @param element Container element
     * @param animaEl animation elements
     */
    WebLoading.prototype.resize = function (element, animaEl) {
        var _this = this;
        if (!this.resizeTimeId)
            this.resizeTimeId = $window$3.setTimeout(function () {
                var canvas = animaEl;
                var w = element.clientWidth, h = element.clientHeight;
                if (canvas.width > element.clientWidth) {
                    // The scroll bar needs to be calculated when shrinking
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
     * Turn off animation
     * @param element Container element
     * @param animaEl animation elements
     */
    WebLoading.prototype.close = function (element, animaEl) {
        var _this = this;
        var op = this.options;
        var store = element.$store;
        $window$3.setTimeout(function () {
            // Trigger Close Animation
            clearStyle(element, op, animaEl);
            if (op.type === LOADING_TYPES.DOM && !op.pointerEvents) {
                element.style.pointerEvents = 'auto';
            }
            // Prevent seconds from closing. If seconds are closed,
            // it is necessary to wait for the previous animation to end before clearing the cache
            onTransitionEndEvent(element, function () {
                // Need to end the style before ending the canvas animation
                if (store) {
                    // Clear model
                    store.model = null;
                    // Callback before closing
                    _this.callEvent(HOOKSCALL_KEY.BEFORE_COLSE);
                    // stop it animationFrame
                    if (store.animationId)
                        clearAnimationFrame(store.animationId);
                }
                // If the dom is extended, clear the parent element (the parent element is created by webLoading)
                if (op.type !== LOADING_TYPES.DOM)
                    element.remove();
                else
                    animaEl.remove();
                // erase status
                _this.loadingId = null;
                // Callback after closing
                _this.callEvent(HOOKSCALL_KEY.COLSED);
                // Callback after closing
                _this.hooks = initHooksCall();
            });
        }, 
        // If the seconds are off, it is necessary to actively add a delay
        !store.loadingId ? op.delayInto : 0);
    };
    /**
     * Draw animation
     * @param element Container element
     */
    WebLoading.prototype.draw = function (element) {
        var op = this.options;
        // Compatible with html
        if (op.html) {
            // Initialize basic data
            var _a = initHtml(), content = _a.content, loadingId = _a.loadingId;
            this.htmlElement = content;
            this.htmlElement.innerHTML = op.html;
            this.loadingId = loadingId;
            // Initialize style
            this.element = initContentStyle(element, op, loadingId, content);
        }
        else {
            // Initialize basic data
            var _b = initCanvas(), canvas = _b.canvas, hooks = _b.hooks, loadingId = _b.loadingId;
            this.canvas = canvas;
            this.hooks = hooks;
            this.loadingId = loadingId;
            // Initialize store
            initStore(element, op, hooks);
            // Initialize style
            this.element = initContentStyle(element, op, loadingId, canvas);
            if (element.$store) {
                drawController(canvas.offsetWidth, canvas.offsetHeight, canvas, this.options, element);
            }
            else {
                $Log.error('WebLoading:canvas or ctx null');
            }
        }
    };
    // Trigger hooks
    WebLoading.prototype.callEvent = function (hooksKey) {
        if (this.hooks)
            this.hooks[hooksKey].forEach(function (event) {
                event();
            });
    };
    return WebLoading;
}());

var $window$2 = window;
var ExtendLoading = /*#__PURE__*/ (function () {
    function ExtendLoading(options) {
        this.options = options;
        this.extendEl = this.initStyle();
    }
    /**
     * Initialize extension container element style
     * @returns extension container element
     */
    ExtendLoading.prototype.initStyle = function () {
        this.extendEl = $window$2.document.createElement('div');
        var op = this.options;
        var w = '100vw', h = '100vh', borderRadius = '0px';
        if (op) {
            this.extendEl.classList.add('wl_' + (op.extendClass || 'loading'));
            if (op.type === LOADING_TYPES.MINI) {
                w = '180px';
                h = '160px';
                borderRadius = '10px';
            }
            this.extendEl.style.cssText = "\n          position:fixed;\n          width:".concat(w, ";\n          height:").concat(h, ";\n          top:50%;\n          left:50%;\n          transform:translate(-50%, -50%);\n          border-radius: ").concat(borderRadius, ";\n          z-index: ").concat(op.zIndex, ";\n          box-shadow:\n          2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),\n          6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),\n          12.5px 12.5px 10px rgba(0, 0, 0, 0.035),\n          22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),\n          41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),\n          100px 100px 80px rgba(0, 0, 0, 0.07)\n          ;\n      ");
        }
        $window$2.document.body.appendChild(this.extendEl);
        return this.extendEl;
    };
    ExtendLoading.prototype.getElement = function () {
        return this.extendEl;
    };
    return ExtendLoading;
}());

var $window$1 = window;
/** @public */
function initLoading(options) {
    var webLoading = new WebLoading(options);
    var feelPromiseResolve = null;
    var resize = function () {
        utlWL('resize');
    };
    var loading = function (dom, options) {
        // Keep the last passed in parameter
        var op = Object.assign(webLoading.options, options);
        // Prevent duplicate registration
        if (!webLoading.loadingId && !feelPromiseResolve) {
            // Create extended dom
            if (op.type !== LOADING_TYPES.DOM) {
                dom = new ExtendLoading(op).getElement();
            }
            if (!dom)
                $Log.error('The loading function cannot find an HTMLElement element!');
            else {
                // Processing Senseless Loading through rece
                var loadingPromise = new Promise(function (res) {
                    // If the time of notFeed exceeds the close time, it is considered as an insensitive load
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
                        // Process extended dom
                        if (op.type !== LOADING_TYPES.DOM)
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
    // Throw basic information
    var getLoadingId = function () { return webLoading.loadingId; };
    var getOptions = function () { return webLoading.options; };
    // WebLoading operation
    function utlWL(key) {
        if (webLoading.element) {
            // canvas
            var temEl = webLoading.canvas;
            // html
            if (webLoading.htmlElement)
                temEl = webLoading.htmlElement;
            // set up
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
// Extended Load Method
function _$extendLoading(type, options) {
    return initLoading(Object.assign(getDefOptions(), options || {}, { type: type }));
}

var $window = window;
$window.BaseModel = BaseModel;
// initialization
$window.initLoading = function (options) {
    return initLoading(options);
};
// extend
// Mobile terminal
$window.miniLoading = function (options) {
    return _$extendLoading(LOADING_TYPES.MINI, options);
};
// Full screen
$window.fullLoading = function (options) {
    return _$extendLoading(LOADING_TYPES.FULL, options);
};
// js project separate import method
var main = {
    initLoading: $window.initLoading,
    miniLoading: $window.miniLoading,
    fullLoading: $window.fullLoading,
    BaseModel: $window.BaseModel
};

exports["default"] = main;
