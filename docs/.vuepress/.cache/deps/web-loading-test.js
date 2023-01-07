import {
  __commonJS
} from "./chunk-RSJERJUL.js";

// node_modules/web-loading-test/dist/main.js
var require_main = __commonJS({
  "node_modules/web-loading-test/dist/main.js"(exports, module) {
    (() => {
      "use strict";
      var __webpack_modules__ = {
        "./src/ExtendLoading/index.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ExtendLoading)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\n\r\nlet $document = document;\r\nclass ExtendLoading {\r\n    constructor(options) {\r\n        this.options = options;\r\n        this.miniEl = this.initStyle();\r\n    }\r\n    initStyle() {\r\n        this.miniEl = document.createElement('div');\r\n        let op = this.options;\r\n        let w = '100vw', h = '100vh', borderRadius = '0px';\r\n        if (op) {\r\n            this.miniEl.classList.add('wl_' + (op.miniClass || 'loading'));\r\n            if (op.type === _utils__WEBPACK_IMPORTED_MODULE_0__.LOADING_TYPES.MINI) {\r\n                w = '180px';\r\n                h = '160px';\r\n                borderRadius = '10px';\r\n            }\r\n        }\r\n        this.miniEl.style.cssText = `\r\n        position:fixed;\r\n        width:${w};\r\n        height:${h};\r\n        top:50%;\r\n        left:50%;\r\n        transform:translate(-50%, -50%);\r\n        border-radius: ${borderRadius};\r\n        box-shadow:\r\n        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),\r\n        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),\r\n        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),\r\n        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),\r\n        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),\r\n        100px 100px 80px rgba(0, 0, 0, 0.07)\r\n        ;\r\n    `;\r\n        $document.body.appendChild(this.miniEl);\r\n        return this.miniEl;\r\n    }\r\n    getElement() {\r\n        return this.miniEl;\r\n    }\r\n    clearStyle() {\r\n        this.miniEl.style.boxShadow = 'none';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web-loading/./src/ExtendLoading/index.ts?");
        },
        "./src/Webloading/index.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WebLoading)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./src/utils.ts\");\n/* harmony import */ var _draw_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../draw/index */ \"./src/draw/index.ts\");\n/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ \"./src/Webloading/style.ts\");\n\r\n\r\n\r\nclass WebLoading {\r\n    constructor(element, options, extendLoading) {\r\n        this.options = Object.assign((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(), options);\r\n        this.extendLoading = extendLoading;\r\n        this.canvas = document.createElement('canvas');\r\n        this.loadingId = String('wl_' + Date.now());\r\n        this.element = element;\r\n        this.initStore();\r\n        this.init();\r\n    }\r\n    resize() {\r\n        this.canvas.width = this.element.clientWidth;\r\n        this.canvas.height = this.element.clientHeight;\r\n        this.draw();\r\n    }\r\n    close() {\r\n        let op = this.options;\r\n        this.clearStyle();\r\n        this.loadingId = null;\r\n        if (!op.pointerEvents) {\r\n            if (op.type === _utils__WEBPACK_IMPORTED_MODULE_0__.LOADING_TYPES.DOM)\r\n                this.element.style.pointerEvents = 'auto';\r\n            else\r\n                document.body.style.pointerEvents = 'auto';\r\n        }\r\n        if (op.type !== _utils__WEBPACK_IMPORTED_MODULE_0__.LOADING_TYPES.DOM)\r\n            this.extendLoading?.clearStyle();\r\n        if (this.element.$store) {\r\n            this.element.$store.model = null;\r\n            this.element.$store.hookCall.beforeColse();\r\n        }\r\n        setTimeout(() => {\r\n            if (this.element.$store?.animationId)\r\n                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clearAnimationFrame)(this.element.$store?.animationId);\r\n            if (op.type !== _utils__WEBPACK_IMPORTED_MODULE_0__.LOADING_TYPES.DOM)\r\n                this.extendLoading?.getElement().remove();\r\n            else\r\n                this.canvas.remove();\r\n            if (this.element.$store?.hookCall)\r\n                this.element.$store.hookCall.colsed();\r\n        }, op.delayColse);\r\n    }\r\n    init() {\r\n        this.initStyle();\r\n        this.draw();\r\n    }\r\n    clearStyle() {\r\n        this.canvas.style.opacity = '0';\r\n        this.canvas.style.zIndex = '-2001';\r\n    }\r\n    initStyle() {\r\n        let op = this.options;\r\n        let elementW = this.element.clientWidth, elementH = this.element.clientHeight, readElementStyle = window.getComputedStyle(this.element), elementStyle = this.element.style, canvasStyle = this.canvas.style;\r\n        this.element.loadingId = this.loadingId;\r\n        if (!op.pointerEvents) {\r\n            if (op.type === _utils__WEBPACK_IMPORTED_MODULE_0__.LOADING_TYPES.DOM)\r\n                this.element.style.pointerEvents = 'none';\r\n            else\r\n                document.body.style.pointerEvents = 'none';\r\n        }\r\n        if (!readElementStyle.position || readElementStyle.position === 'static')\r\n            elementStyle.position = 'relative';\r\n        this.canvas.id = this.loadingId;\r\n        document.styleSheets[0].insertRule(_style__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n        this.canvas.style.animation = `wl_show ${op.delayColse / 1000}s linear`;\r\n        canvasStyle.position = 'absolute';\r\n        canvasStyle.left = `${op.pointerEvents ? 0 : this.element.scrollLeft}px`;\r\n        canvasStyle.top = `${op.pointerEvents ? 0 : this.element.scrollTop}px`;\r\n        canvasStyle.zIndex = op.zIndex;\r\n        canvasStyle.transition = `${op.delayColse / 1000}s`;\r\n        canvasStyle.backgroundColor = op.bgColor;\r\n        canvasStyle.borderRadius = readElementStyle.borderRadius;\r\n        this.canvas.width = elementW;\r\n        this.canvas.height = elementH;\r\n        this.element.append(this.canvas);\r\n    }\r\n    draw() {\r\n        let w = this.canvas.offsetWidth, h = this.canvas.offsetHeight;\r\n        if (this.element.$store) {\r\n            (0,_draw_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(w, h, this.canvas, this.options, this.element.$store);\r\n        }\r\n        else {\r\n            _utils__WEBPACK_IMPORTED_MODULE_0__.$Log.error('WebLoading:canvas or ctx null');\r\n        }\r\n    }\r\n    initStore() {\r\n        this.element.$store = {\r\n            options: this.options,\r\n            element: this.element,\r\n            animationId: undefined,\r\n            loadingId: this.loadingId,\r\n            model: null,\r\n            hookCall: {\r\n                beforeColse: () => { },\r\n                colsed: () => { }\r\n            }\r\n        };\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web-loading/./src/Webloading/index.ts?");
        },
        "./src/Webloading/style.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (`\r\n@keyframes wl_show {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n  }\r\n}\r\n`);\r\n\n\n//# sourceURL=webpack://web-loading/./src/Webloading/style.ts?');
        },
        "./src/draw/index.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ drawController)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/draw/model/index.ts");
\r
\r
function drawController(w, h, canvas, options, store) {\r
    try {\r
        let model = null;\r
        if (!options.custom)\r
            model = new _model__WEBPACK_IMPORTED_MODULE_1__["default"][options.model](w, h, canvas, options, store.element.$store);\r
        else\r
            model = new options.custom(w, h, canvas, options, store.element.$store);\r
        store.model = model;\r
    }\r
    catch (e) {\r
        _utils__WEBPACK_IMPORTED_MODULE_0__.$Log.error('draw error(' + e + ')');\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/index.ts?`);
        },
        "./src/draw/model/BaseModel.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BaseModel)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/utils.ts\");\n\r\nclass BaseModel {\r\n    constructor(w, h, canvas, options, store) {\r\n        this.w = w;\r\n        this.h = h;\r\n        this.canvas = canvas;\r\n        this.ctx = canvas.getContext('2d');\r\n        this.options = options;\r\n        this.store = store;\r\n        this.webLog = _utils__WEBPACK_IMPORTED_MODULE_0__.$Log;\r\n        this.stepClear = 1;\r\n        this._$initPoint();\r\n    }\r\n    initOptions(options, limits) {\r\n        this.options = Object.assign(options, this.options);\r\n        this.store.options = this.options;\r\n        if (limits && limits.length) {\r\n            limits.forEach((l) => {\r\n                let mayKey = this.options[l.key];\r\n                if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(mayKey) && !l.limit(mayKey))\r\n                    _utils__WEBPACK_IMPORTED_MODULE_0__.$Log.warn(l.message);\r\n            });\r\n        }\r\n    }\r\n    _$initPoint() {\r\n        this.clearRect();\r\n        let op = this.options;\r\n        this.ctx.fillStyle = op.themeColor;\r\n        this.ctx.strokeStyle = op.themeColor;\r\n        this.ctx.shadowColor = op.shadowColor;\r\n        this.ctx.font = `${op.fontSize}px ${op.fontFamily}`;\r\n        this.ctx.textAlign = 'center';\r\n        this.ctx.textBaseline = 'middle';\r\n        this.ctx.translate(this.w / 2, this.h / 2);\r\n        this.ctx.save();\r\n    }\r\n    clearRect(x, y, w_r, h) {\r\n        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(x) && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(y) && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(w_r) && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(h)) {\r\n            this.ctx.clearRect(x, y, w_r, h);\r\n        }\r\n        else if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(x) && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(y) && !(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(w_r) && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isNull)(h)) {\r\n            let calcWidth = w_r - this.stepClear;\r\n            let calcHeight = Math.sqrt(w_r * w_r - calcWidth * calcWidth);\r\n            let posX = x - calcWidth;\r\n            let posY = y - calcHeight;\r\n            let widthX = 2 * calcWidth;\r\n            let heightY = 2 * calcHeight;\r\n            if (this.stepClear <= w_r) {\r\n                this.ctx.clearRect(posX, posY, widthX, heightY);\r\n                this.stepClear += 1;\r\n                this.clearRect(x, y, w_r);\r\n            }\r\n            else {\r\n                this.stepClear = 1;\r\n            }\r\n        }\r\n        else\r\n            this.ctx.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);\r\n    }\r\n    drowRadiusRect(x, y, w, h, r) {\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI);\r\n        this.ctx.lineTo(x + w - r, y);\r\n        this.ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 0);\r\n        this.ctx.lineTo(x + w, y + h - r);\r\n        this.ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);\r\n        this.ctx.lineTo(x + r, y + h);\r\n        this.ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);\r\n        this.ctx.lineTo(x, y + r);\r\n        this.ctx.closePath();\r\n    }\r\n    run(fun) {\r\n        if (this.store.animationId)\r\n            this.clearAnimationFrame(this.store.animationId);\r\n        this.animationFrame(fun);\r\n    }\r\n    animationFrame(fun) {\r\n        if (!window.requestAnimationFrame) {\r\n            this.store.animationId = window.setInterval(fun, this.options.delay);\r\n        }\r\n        let endTime = Date.now() + this.options.delay;\r\n        fun.call(this);\r\n        const run = () => {\r\n            if (Date.now() > endTime) {\r\n                fun.call(this);\r\n                endTime = Date.now() + this.options.delay;\r\n            }\r\n            this.store.animationId = window.requestAnimationFrame(run);\r\n        };\r\n        this.store.animationId = window.requestAnimationFrame(run);\r\n    }\r\n    clearAnimationFrame(id) {\r\n        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.clearAnimationFrame)(id);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web-loading/./src/draw/model/BaseModel.ts?");
        },
        "./src/draw/model/Bean.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bean)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    beanSize: 15,\r
    pointLength: 15,\r
};\r
const limits = [{\r
        key: 'pointLength', message: 'pointLength value >= 5', limit: (key) => {\r
            return key >= 5;\r
        }\r
    }, {\r
        key: 'beanSize', message: 'beanSize value >= 5', limit: (key) => {\r
            return key >= 5;\r
        }\r
    }];\r
class Bean extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.initOptions(defaultOptions, limits);\r
        this.bean = {\r
            turn: 30,\r
            state: 1,\r
            beanState: 1,\r
            nowX: -(this.options.pointLength * this.options.beanSize) / 2 - this.options.beanSize * 3,\r
            beans: Array.from({ length: this.options.pointLength }, () => 1),\r
            beanAnimaIndex: 0\r
        };\r
        this.run(this.draw);\r
    }\r
    draw() {\r
        let op = this.options;\r
        this.clearRect();\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.ctx.translate(this.bean.nowX, 0);\r
        this.ctx.arc(0, 0, op.beanSize, (360 - this.bean.turn) * Math.PI / 180, this.bean.turn * Math.PI / 180, true);\r
        this.ctx.lineTo(0, 0);\r
        this.ctx.fill();\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
        this.drawPoint();\r
        this.drawFillter();\r
        this.drawText();\r
        this.controller();\r
    }\r
    controller() {\r
        let op = this.options;\r
        if (this.bean.nowX >= (op.pointLength * op.beanSize) / 2 + op.beanSize * 2) {\r
            this.bean.nowX = -(op.pointLength * op.beanSize) / 2 - op.beanSize * 3;\r
            this.bean.beanAnimaIndex = 0;\r
        }\r
        if (this.bean.nowX <= -(op.pointLength * op.beanSize) / 2) {\r
            this.bean.beanState = 2;\r
        }\r
        if (this.bean.turn <= 0)\r
            this.bean.state = 2;\r
        if (this.bean.turn >= 30)\r
            this.bean.state = 1;\r
        if (this.bean.state === 1)\r
            this.bean.turn -= 8;\r
        if (this.bean.state === 2)\r
            this.bean.turn += 8;\r
        if (this.bean.beanState === 1)\r
            this.bean.nowX -= op.beanSize / 3;\r
        if (this.bean.beanState === 2)\r
            this.bean.nowX += op.beanSize / 3;\r
    }\r
    drawPoint() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.setShadow();\r
        this.ctx.translate(-(op.pointLength * op.beanSize) / 2, 0);\r
        for (let i = 0; i < op.pointLength && i < this.bean.beanAnimaIndex; i++) {\r
            this.ctx.beginPath();\r
            if (i < this.bean.beanAnimaIndex)\r
                this.ctx.arc(op.beanSize * i, 0, op.beanSize / 4, 0, Math.PI * 2);\r
            this.ctx.fill();\r
            this.ctx.closePath();\r
        }\r
        this.bean.beanAnimaIndex++;\r
        this.ctx.restore();\r
    }\r
    drawFillter() {\r
        let op = this.options;\r
        this.clearRect(-op.beanSize / 3 + this.bean.nowX, -op.beanSize / 2, op.beanSize / 4);\r
        this.clearRect(-(op.pointLength * op.beanSize) / 2 - op.beanSize / 2, -this.h, this.bean.nowX + (op.pointLength * op.beanSize) / 2 - op.beanSize / 2, this.h * 2);\r
        this.clearRect(-(op.pointLength * op.beanSize) / 2, -this.h, -180, this.h * 2);\r
        this.clearRect((op.pointLength * op.beanSize) / 2, -this.h, 180, this.h * 2);\r
    }\r
    setShadow() {\r
        let op = this.options;\r
        this.ctx.shadowOffsetX = op.shadowOffsetX;\r
        this.ctx.shadowOffsetY = op.shadowOffsetY;\r
        this.ctx.shadowBlur = op.shadowBlur;\r
    }\r
    drawText() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        let y = op.fontSize + op.textGap + op.beanSize;\r
        this.ctx.fillText(op.text, 0, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Bean.ts?`);
        },
        "./src/draw/model/Clock.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Clock)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    lineCap: 'round',\r
    lineWidth: 2,\r
    lineColors: ['#d4d4d4', '#06ab2d', '#8a0303'],\r
    clockSize: 15,\r
    clockGap: 4,\r
    hLine: true,\r
    mLine: false,\r
    sLine: true,\r
    textTime: ''\r
};\r
const limits = [{\r
        key: 'lineColors', message: 'lineColors.length <= 3', limit: (key) => {\r
            return key.length <= 3;\r
        }\r
    }];\r
class Clock extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.initOptions(defaultOptions, limits);\r
        this.initPoint();\r
        this.nowTime = -1;\r
        this.nowS = 0;\r
        this.run(this.draw);\r
    }\r
    initPoint() {\r
        let op = this.options;\r
        this.ctx.lineCap = op.lineCap;\r
        this.ctx.lineWidth = op.lineWidth;\r
        this.ctx.save();\r
    }\r
    draw() {\r
        this.clearRect();\r
        this.drawClock();\r
    }\r
    drawText(h, m, s) {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        let y = op.clockSize * 2 + op.textGap;\r
        if (op.textTime === 'time')\r
            op.text = \`\${h} : \${m} : \${s}\`;\r
        if (op.textTime === 's')\r
            op.text = this.nowTime + 's';\r
        this.ctx.fillText(op.text, 0, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawClock() {\r
        let op = this.options;\r
        let s = new Date().getSeconds();\r
        let m = new Date().getMinutes();\r
        let h = new Date().getHours();\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.moveTo(-5, -(op.clockSize + op.clockGap));\r
        this.ctx.lineTo(5, -(op.clockSize + op.clockGap));\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2);\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
        this.ctx.save();\r
        for (let i = 0; i < 12; i++) {\r
            this.ctx.beginPath();\r
            this.ctx.rotate((360 / 12) * Math.PI / 180);\r
            this.ctx.moveTo(op.clockSize - op.clockGap, 0);\r
            this.ctx.lineTo(op.clockSize - op.clockGap, 0);\r
            this.ctx.stroke();\r
            this.ctx.closePath();\r
        }\r
        this.ctx.restore();\r
        if (op.hLine) {\r
            this.ctx.save();\r
            this.ctx.beginPath();\r
            this.ctx.lineWidth = op.lineWidth * 1.6;\r
            if (op.lineColors[0])\r
                this.ctx.strokeStyle = op.lineColors[0];\r
            this.ctx.rotate((-90 * Math.PI) / 180);\r
            this.ctx.rotate(((h * 360 / 60) * Math.PI) / 180);\r
            this.ctx.moveTo(-1, 0);\r
            this.ctx.lineTo(op.clockSize / 2, 0);\r
            this.ctx.stroke();\r
            this.ctx.closePath();\r
            this.ctx.restore();\r
        }\r
        if (op.mLine) {\r
            this.ctx.save();\r
            this.ctx.beginPath();\r
            if (op.lineColors[1])\r
                this.ctx.strokeStyle = op.lineColors[1];\r
            this.ctx.lineWidth = op.lineWidth * 1.2;\r
            this.ctx.rotate((-90 * Math.PI) / 180);\r
            this.ctx.rotate(((m * 360 / 60) * Math.PI) / 180);\r
            this.ctx.moveTo(-1, 0);\r
            this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0);\r
            this.ctx.stroke();\r
            this.ctx.closePath();\r
            this.ctx.restore();\r
        }\r
        if (op.sLine) {\r
            this.ctx.save();\r
            this.ctx.beginPath();\r
            if (op.lineColors[2])\r
                this.ctx.strokeStyle = op.lineColors[2];\r
            this.ctx.rotate((-90 * Math.PI) / 180);\r
            this.ctx.rotate(((s * 360 / 60) * Math.PI) / 180);\r
            this.ctx.moveTo(-1, 0);\r
            this.ctx.lineTo(op.clockSize - op.clockGap, 0);\r
            this.ctx.stroke();\r
            this.ctx.closePath();\r
            this.ctx.restore();\r
            if (this.nowS !== s)\r
                this.nowTime++;\r
            this.nowS = s;\r
        }\r
        this.drawText(h, m, s);\r
    }\r
    setShadow() {\r
        let op = this.options;\r
        this.ctx.shadowOffsetX = op.shadowOffsetX;\r
        this.ctx.shadowOffsetY = op.shadowOffsetY;\r
        this.ctx.shadowBlur = op.shadowBlur;\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Clock.ts?`);
        },
        "./src/draw/model/Gear.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gear)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    lineStartSkew: 0,\r
    lineStart: 10,\r
    lineEndSkew: 0,\r
    lineEnd: 16,\r
    lineWidth: 4,\r
    lineCap: 'round',\r
    lineNum: 10,\r
    direction: true\r
};\r
const limits = [\r
    {\r
        key: 'lineNum',\r
        message: 'lineNum value 4-18',\r
        limit: (key) => {\r
            return key >= 4 && key <= 18;\r
        }\r
    }\r
];\r
class Gear extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.initOptions(defaultOptions, limits);\r
        this.optimization(this.options.textGap + this.options.lineEnd);\r
        this.initPoint();\r
        this.aps = Array.from({ length: this.options.lineNum }, (_, _index) => _index);\r
        this.run(this.draw);\r
    }\r
    initPoint() {\r
        let op = this.options;\r
        this.ctx.lineCap = op.lineCap;\r
        this.ctx.lineWidth = op.lineWidth;\r
        this.ctx.save();\r
    }\r
    draw() {\r
        this.clearRect();\r
        this.controller();\r
        this.drawGear();\r
        this.drawText();\r
    }\r
    controller() {\r
        let op = this.options;\r
        if (op.direction)\r
            this.aps = this.aps.map((a) => (a - 1 <= 0 ? this.aps.length - 1 : a - 1));\r
        else\r
            this.aps = this.aps.map((a) => (a + 1 > this.aps.length ? 0 : a + 1));\r
    }\r
    drawGear() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.shadowOffsetX = op.shadowOffsetX;\r
        this.ctx.shadowOffsetY = op.shadowOffsetY;\r
        this.ctx.shadowBlur = op.shadowBlur;\r
        for (let i = 0; i < this.aps.length; i++) {\r
            this.ctx.beginPath();\r
            this.ctx.globalAlpha = this.aps[i] / 10;\r
            this.ctx.moveTo(op.lineEndSkew, op.lineStart);\r
            this.ctx.lineTo(op.lineStartSkew, op.lineEnd);\r
            this.ctx.stroke();\r
            this.ctx.closePath();\r
            this.ctx.rotate((2 * Math.PI) / op.lineNum);\r
        }\r
        this.ctx.restore();\r
    }\r
    drawText() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        let y = op.lineEnd + op.fontSize + op.textGap;\r
        this.ctx.fillText(op.text, 0, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    optimization(textY) {\r
        if (this.options.optimization) {\r
            if (textY * 4 > this.h) {\r
                this.options.lineStart = this.h / 6 - 5;\r
                this.options.lineEnd = this.h / 6;\r
                this.options.textGap = 2;\r
            }\r
        }\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Gear.ts?`);
        },
        "./src/draw/model/Img.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Img)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    src: '',\r
    width: 52,\r
    height: 52,\r
    turn: false\r
};\r
class Img extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.initOptions(defaultOptions, []);\r
        this.img = new Image();\r
        this.img.src = this.options.src;\r
        this.turn = 10;\r
        this.img.onload = () => {\r
            this.run(this.draw);\r
        };\r
    }\r
    draw() {\r
        this.clearRect();\r
        this.drawImg();\r
        this.drawText();\r
    }\r
    drawImg() {\r
        let op = this.options;\r
        this.ctx.save();\r
        if (op.turn)\r
            this.ctx.rotate(this.turn * Math.PI / 180);\r
        this.ctx.drawImage(this.img, -op.width / 2, -op.height / 2, op.width, op.height);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
        this.turn += 10;\r
    }\r
    drawText() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        let y = op.fontSize + op.textGap + op.height / 2;\r
        this.ctx.fillText(op.text, 0, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Img.ts?`);
        },
        "./src/draw/model/Pattern.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pattern)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/draw/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    charts: [_utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.ARC, _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.RECT, _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.TRIANGLE, _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.HEART, _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.POLYGON],\r
    chartColors: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd'],\r
    maxHeight: 60,\r
    chartSize: 12\r
};\r
const limits = [{\r
        key: 'chartSize', message: 'chartSize value 5-24', limit: (key) => {\r
            return key >= 5 && key <= 24;\r
        }\r
    }, {\r
        key: 'delay', message: 'Pattern.delay not allowed update', limit: (key) => {\r
            return key === (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)().delay;\r
        }\r
    }];\r
class Pattern extends _BaseModel__WEBPACK_IMPORTED_MODULE_2__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.initOptions(defaultOptions, limits);\r
        this.initPoint();\r
        this.pattern = { color: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)().themeColor, nowHeight: 10, chart: _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.RECT, shadow: 0, nowSatate: 1, turn: 0 };\r
        this.run(this.draw);\r
    }\r
    initPoint() {\r
        this.options.delay = 10;\r
    }\r
    draw() {\r
        let op = this.options;\r
        this.clearRect();\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.ctx.translate(0, this.pattern.nowHeight);\r
        this.ctx.rotate(this.pattern.turn / Math.PI * 2);\r
        this.ctx.fillStyle = this.pattern.color;\r
        this.selectChart(0, 0, op.chartSize);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
        this.drawShadow();\r
        this.clearRect(-this.w, 0, this.w * 2, this.h);\r
        this.controller(op);\r
        this.drawText(op);\r
    }\r
    controller(op) {\r
        this.pattern.turn += 10;\r
        if (this.pattern.nowSatate === 1) {\r
            this.pattern.nowHeight--;\r
            this.pattern.shadow += 0.2;\r
        }\r
        else if (this.pattern.nowSatate === 2) {\r
            this.pattern.nowHeight++;\r
            this.pattern.shadow -= 0.2;\r
        }\r
        if (this.pattern.nowHeight <= -op.chartSize && this.pattern.nowHeight % 8 == 0) {\r
            op.delay++;\r
        }\r
        if (this.pattern.nowHeight <= -op.maxHeight) {\r
            this.pattern.nowSatate = 2;\r
        }\r
        else if (this.pattern.nowHeight >= op.chartSize) {\r
            this.pattern.nowSatate = 1;\r
            op.delay = 10;\r
            this.pattern.chart = op.charts[parseInt(String(Math.random() * op.charts.length))];\r
            this.pattern.color = op.chartColors[parseInt(String(Math.random() * op.chartColors.length))];\r
        }\r
    }\r
    selectChart(x, y, size) {\r
        switch (this.pattern.chart) {\r
            case _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.RECT:\r
                this.drawRect(x, y, size);\r
                break;\r
            case _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.ARC:\r
                this.drawArc(x, y, size);\r
                break;\r
            case _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.TRIANGLE:\r
                this.drawTriangle(x, y, size);\r
                break;\r
            case _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.HEART:\r
                this.drawHeart(x, y, size);\r
                break;\r
            case _utils__WEBPACK_IMPORTED_MODULE_1__.PATTERN_CHART.POLYGON:\r
                this.drawPolygon(x, y, size);\r
                break;\r
        }\r
    }\r
    drawText(op) {\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.ctx.fillStyle = this.pattern.color;\r
        let y = op.fontSize + op.textGap;\r
        this.ctx.fillText(op.text, 0, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawShadow() {\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.globalAlpha = 0.2;\r
        this.ctx.strokeStyle = this.pattern.color;\r
        this.ctx.moveTo(-this.pattern.shadow / 2, 0);\r
        this.ctx.lineTo(this.pattern.shadow, 0);\r
        this.ctx.stroke();\r
        this.ctx.beginPath();\r
        this.ctx.restore();\r
    }\r
    drawRect(x, y, size) {\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.translate(-size / 2, -size / 2);\r
        this.ctx.fillRect(x, y, size, size);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawArc(x, y, size) {\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);\r
        this.ctx.fill();\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawTriangle(x, y, size) {\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.translate(-size / 2, -(size / 2 * Math.sqrt(3)) / 2);\r
        this.ctx.moveTo(x, y);\r
        this.ctx.lineTo(size, 0);\r
        this.ctx.lineTo(size / 2, size / 2 * Math.sqrt(3));\r
        this.ctx.lineTo(x, y);\r
        this.ctx.fill();\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawHeart(x, y, size) {\r
        size = size / 2;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.translate(0, -(size * 2) / 2);\r
        this.ctx.moveTo(x, y);\r
        this.ctx.bezierCurveTo(size / 2, -size, size * 3, -size / 2, y, size * 2);\r
        this.ctx.moveTo(x, y);\r
        this.ctx.bezierCurveTo(-size / 2, -size, -size * 3, -size / 2, y, size * 2);\r
        this.ctx.fill();\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawPolygon(x, y, size) {\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.setShadow();\r
        this.ctx.translate(-size / 2, -size / 2);\r
        this.ctx.moveTo(x, y);\r
        this.ctx.lineTo(size, y);\r
        this.ctx.lineTo(size + size / 2, size / 2);\r
        this.ctx.lineTo(size, size / 2 + size / 2);\r
        this.ctx.lineTo(x, size);\r
        this.ctx.lineTo(x - size / 2, size - size / 2);\r
        this.ctx.lineTo(x, y);\r
        this.ctx.fill();\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    setShadow() {\r
        let op = this.options;\r
        this.ctx.shadowOffsetX = op.shadowOffsetX;\r
        this.ctx.shadowOffsetY = op.shadowOffsetY;\r
        this.ctx.shadowBlur = op.shadowBlur;\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Pattern.ts?`);
        },
        "./src/draw/model/Ring.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ring)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    arcGap: Math.PI / 4,\r
    ringGap: 10,\r
    lineWidth: 2,\r
    ringNum: 2,\r
    radius: 6,\r
    lineCap: 'round',\r
    turn: 10,\r
    ringsTurn: [Math.PI, Math.PI / 4],\r
    direction: true\r
};\r
const limits = [{\r
        key: 'ringNum', message: 'ringNum value 1-10', limit: (key) => {\r
            return key >= 1 && key <= 10;\r
        }\r
    }, {\r
        key: 'ringsTurn', message: \`ringsTurn size \${defaultOptions.ringNum}\`, limit: (key) => {\r
            return key.length <= defaultOptions.ringNum;\r
        }\r
    }];\r
class Ring extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.rotate = 10;\r
        this.initOptions(defaultOptions, limits);\r
        this.initPoint();\r
        this.run(this.draw);\r
    }\r
    initPoint() {\r
        let op = this.options;\r
        this.ctx.lineCap = op.lineCap;\r
        this.ctx.lineWidth = op.lineWidth;\r
        this.ctx.save();\r
    }\r
    draw() {\r
        this.clearRect();\r
        this.controller();\r
        this.drawText();\r
    }\r
    controller() {\r
        this.ctx.save();\r
        let op = this.options;\r
        let rotate = this.rotate * Math.PI / 180 * (op.direction ? 1 : -1);\r
        this.ctx.rotate(rotate);\r
        this.ctx.shadowOffsetX = op.shadowOffsetX;\r
        this.ctx.shadowOffsetY = op.shadowOffsetY;\r
        this.ctx.shadowBlur = op.shadowBlur;\r
        for (let i = 1; i <= op.ringNum; i++) {\r
            this.drawRing(op.radius + ((i - 1) * op.ringGap), op.arcGap, op.ringsTurn && op.ringsTurn.length > 0 ? op.ringsTurn[i - 1] : Math.PI / i);\r
        }\r
        this.rotate += op.turn;\r
        this.ctx.restore();\r
    }\r
    drawText() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        let y = op.ringNum * (op.radius + op.ringGap) + op.textGap;\r
        this.ctx.fillText(op.text, 0, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawRing(r, arcGap = 1, angle = 0) {\r
        this.ctx.beginPath();\r
        this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle);\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
        this.ctx.beginPath();\r
        this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle);\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Ring.ts?`);
        },
        "./src/draw/model/Roll.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Roll)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/draw/utils.ts");
\r
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    rollGap: 12,\r
    childNum: 4,\r
    rollSize: 16,\r
    showChild: true,\r
    chart: _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WHEEL,\r
    windmills: ['#1ab3ea', '#de6834', '#30925d', '#f48ea5'],\r
    windmillPointColor: '#f2c31f',\r
    fixad: false\r
};\r
const limits = [{\r
        key: 'childNum', message: 'chartSize value 4-10', limit: (key) => {\r
            return key >= 4 && key <= 10;\r
        }\r
    }, {\r
        key: 'delay', message: 'Roll.delay not allowed update', limit: (key) => {\r
            return key === (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)().delay;\r
        }\r
    }];\r
class Roll extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.initOptions(defaultOptions, limits);\r
        this.Roll = {\r
            turn: 1,\r
            nowX: this.options.fixad ? 0 : (this.options.childNum / 2) * (this.options.rollSize + this.options.rollGap) + this.options.rollGap / 2,\r
            state: 2,\r
            child: []\r
        };\r
        this.run(this.draw);\r
    }\r
    draw() {\r
        this.clearRect();\r
        this.drawGround();\r
        this.drawChild();\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.ctx.translate(-this.Roll.nowX, 0);\r
        this.ctx.rotate(this.Roll.turn * Math.PI / 180);\r
        this.selectChart();\r
        this.controller();\r
        this.ctx.restore();\r
        this.drawText();\r
    }\r
    selectChart() {\r
        let op = this.options;\r
        switch (op.chart) {\r
            case _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.RECT:\r
                this.drawRect();\r
                break;\r
            case _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WHEEL:\r
                this.drawWheel();\r
                break;\r
            case _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WINDMILL:\r
                this.drawWindmill();\r
                break;\r
        }\r
    }\r
    controller() {\r
        let op = this.options;\r
        if (this.Roll.state === 1) {\r
            this.Roll.turn -= 10;\r
            if (op.delay < 20 && !op.fixad)\r
                op.delay += 2;\r
        }\r
        if (this.Roll.state === 2) {\r
            this.Roll.turn += 10;\r
            if (op.delay > 10 && !op.fixad)\r
                op.delay -= 5;\r
        }\r
        if (op.fixad)\r
            return;\r
        if (this.Roll.nowX <= -(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6))\r
            this.Roll.state = 1;\r
        if (this.Roll.nowX >= (op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2)\r
            this.Roll.state = 2;\r
        if (this.Roll.state === 1)\r
            this.Roll.nowX++;\r
        if (this.Roll.state === 2)\r
            this.Roll.nowX--;\r
        let child = this.Roll.child;\r
        if (this.Roll.nowX % (op.rollSize + op.rollGap) == 0 && this.Roll.state === 2) {\r
            child.push({ turn: this.Roll.turn, x: this.Roll.nowX });\r
        }\r
        if (this.Roll.state === 1 && child[child.length - 1] && child[child.length - 1].x === this.Roll.nowX) {\r
            this.Roll.child.pop();\r
        }\r
    }\r
    drawRect() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.setShadow();\r
        this.ctx.translate(-op.rollSize / 2, -op.rollSize / 2);\r
        this.ctx.fillRect(0, 0, op.rollSize, op.rollSize);\r
        this.ctx.restore();\r
    }\r
    drawWheel() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.lineWidth = 4;\r
        this.ctx.beginPath();\r
        this.ctx.arc(0, 0, op.rollSize / 6, 0, Math.PI * 2);\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
        this.ctx.beginPath();\r
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
        this.ctx.beginPath();\r
        this.ctx.arc(0, 0, op.rollSize, 0, Math.PI * 2);\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
        for (let i = 0; i < 6; i++) {\r
            this.ctx.beginPath();\r
            this.ctx.moveTo(0, op.rollSize / 2);\r
            this.ctx.lineTo(0, op.rollSize);\r
            this.ctx.stroke();\r
            this.ctx.rotate((360 / 6) * Math.PI / 180);\r
            this.ctx.closePath();\r
        }\r
        this.ctx.restore();\r
    }\r
    drawWindmill() {\r
        let op = this.options;\r
        this.ctx.save();\r
        for (let i = 0; i < op.windmills.length; i++) {\r
            this.ctx.beginPath();\r
            this.ctx.fillStyle = op.windmills[i];\r
            this.ctx.arc(-op.rollSize / 2, 0, op.rollSize, 0, Math.PI);\r
            this.ctx.fill();\r
            this.ctx.closePath();\r
            this.ctx.rotate((360 / 4) * Math.PI / 180);\r
        }\r
        this.ctx.beginPath();\r
        this.ctx.fillStyle = op.windmillPointColor;\r
        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);\r
        this.ctx.fill();\r
        this.ctx.restore();\r
    }\r
    drawChild() {\r
        let op = this.options;\r
        if (!op.showChild)\r
            return;\r
        this.Roll.child.forEach((c, index) => {\r
            this.ctx.save();\r
            this.ctx.translate(-c.x, 0);\r
            this.ctx.globalAlpha = (index + 1) / 10;\r
            this.ctx.rotate(c.turn * Math.PI / 180);\r
            this.selectChart();\r
            this.ctx.restore();\r
        });\r
    }\r
    drawGround() {\r
        let op = this.options;\r
        if (op.chart !== _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WHEEL)\r
            return;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        this.ctx.lineWidth = 3;\r
        this.ctx.globalAlpha = 0.03;\r
        this.ctx.moveTo(-(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6), op.rollSize + 3);\r
        this.ctx.lineTo((op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2, op.rollSize + 3);\r
        this.ctx.stroke();\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    drawText() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        let y = op.fontSize + op.textGap + op.rollSize;\r
        this.ctx.fillText(op.text, 0, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
    setShadow() {\r
        let op = this.options;\r
        this.ctx.shadowOffsetX = op.shadowOffsetX;\r
        this.ctx.shadowOffsetY = op.shadowOffsetY;\r
        this.ctx.shadowBlur = op.shadowBlur;\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Roll.ts?`);
        },
        "./src/draw/model/Skeleton.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Skeleton)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    skeletonColor: 'rgb(240, 240, 240)',\r
    skeletonAnimationColor: 'rgb(226, 226, 226)',\r
    radius: 5,\r
    animation: true,\r
    skeletonMax: true,\r
    deep: true,\r
    appoint: 'wl-show'\r
};\r
class Skeleton extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.initOptions(defaultOptions, []);\r
        this.skeleton = [];\r
        this.colorFlow = 0;\r
        this.state = 1;\r
        this.WL_IMG = 'wl-img';\r
        this.initPoint();\r
        this.controller(this.store.element.children);\r
        this.run(this.draw);\r
        console.dir(store.element);\r
    }\r
    initPoint() {\r
        let op = this.options;\r
        this.ctx.translate(-this.w / 2, -this.h / 2);\r
        this.canvas.width = this.store.element.scrollWidth;\r
        this.canvas.height = this.store.element.scrollHeight;\r
        this.ctx.fillStyle = op.skeletonColor;\r
    }\r
    draw() {\r
        this.clearRect();\r
        this.drawSkeleton();\r
    }\r
    controller(els) {\r
        let op = this.options;\r
        for (let e of Array.from(els)) {\r
            if (this.store.loadingId === e.id)\r
                continue;\r
            if (op.appoint.length > 0 && e.getAttribute(op.appoint) === null)\r
                continue;\r
            if (op.deep) {\r
                if (e.children.length <= 0) {\r
                    this.skeleton.push({ title: e.nodeName, element: e });\r
                }\r
                else\r
                    this.controller(e.children);\r
            }\r
            else {\r
                this.skeleton.push({ title: e.nodeName, element: e });\r
            }\r
        }\r
    }\r
    drawSkeleton() {\r
        let op = this.options;\r
        let linearGradient = this.ctx.createLinearGradient(0, 0, this.w, this.h);\r
        linearGradient.addColorStop(0, op.skeletonColor);\r
        linearGradient.addColorStop(this.colorFlow, op.skeletonAnimationColor);\r
        linearGradient.addColorStop(1, op.skeletonColor);\r
        if (op.animation)\r
            this.ctx.fillStyle = linearGradient;\r
        this.skeleton.forEach((s) => {\r
            let el = s.element;\r
            this.drowRadiusRect(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight, op.radius);\r
            this.ctx.fill();\r
        });\r
        if (op.animation) {\r
            if (this.colorFlow >= 0.9)\r
                this.state = 2;\r
            if (this.colorFlow <= 0.1)\r
                this.state = 1;\r
            if (this.state === 1)\r
                this.colorFlow += 0.06;\r
            if (this.state === 2)\r
                this.colorFlow -= 0.06;\r
        }\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Skeleton.ts?`);
        },
        "./src/draw/model/Zoom.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Zoom)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ "./src/utils.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/draw/utils.ts");
/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseModel */ "./src/draw/model/BaseModel.ts");
\r
\r
\r
const defaultOptions = {\r
    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r
    zoomGap: 10,\r
    maxSize: 16,\r
    zoomNum: 5,\r
    lineWidth: 10,\r
    zoomHeight: 2,\r
    lineCap: 'round',\r
    action: _utils__WEBPACK_IMPORTED_MODULE_1__.ZOOM_ACTION.SCALE,\r
    direction: true,\r
    zoomColors: []\r
};\r
const limits = [{\r
        key: 'lineWidth', message: 'lineWidth(default:10) <=  maxSize(default:16)', limit: (key) => {\r
            return defaultOptions.lineWidth <= defaultOptions.maxSize;\r
        },\r
    }, {\r
        key: 'maxSize', message: 'lineWidth(default:10) <=  maxSize(default:16)', limit: (key) => {\r
            return defaultOptions.lineWidth <= defaultOptions.maxSize;\r
        },\r
    }];\r
class Zoom extends _BaseModel__WEBPACK_IMPORTED_MODULE_2__["default"] {\r
    constructor(w, h, canvas, options, store) {\r
        super(w, h, canvas, options, store);\r
        this.zoomIndex = defaultOptions.direction ? 0 : defaultOptions.zoomNum - 1;\r
        this.initOptions(defaultOptions, limits);\r
        this.initPoint();\r
        this.list = Array.from({ length: this.options.zoomNum }, (_, _index) => Object.assign({\r
            value: defaultOptions.lineWidth,\r
            state: 0\r
        }));\r
        this.run(this.draw);\r
    }\r
    initPoint() {\r
        let op = this.options;\r
        this.ctx.lineCap = op.lineCap;\r
        this.ctx.lineWidth = op.lineWidth;\r
        this.ctx.translate(-(((op.lineWidth) * (op.zoomNum + 1)) + (op.zoomGap * (op.zoomNum + 1))) / 2, -(op.zoomHeight) / 2);\r
        this.ctx.save();\r
    }\r
    draw() {\r
        this.clearRect();\r
        this.drawZoom();\r
        this.drawText();\r
        this.controller();\r
    }\r
    controller() {\r
        let op = this.options;\r
        if (op.direction && this.zoomIndex >= op.zoomNum)\r
            this.zoomIndex = 0;\r
        else if (op.direction && this.zoomIndex < 0)\r
            this.zoomIndex = op.zoomNum - 1;\r
    }\r
    drawZoom() {\r
        let op = this.options;\r
        for (let i = 0; i < op.zoomNum; i++) {\r
            if (this.list[i].state === 1)\r
                this.list[i].value += 2;\r
            else if (this.list[i].state === 2 && this.list[i].value >= op.lineWidth)\r
                this.list[i].value--;\r
            if (op.action === _utils__WEBPACK_IMPORTED_MODULE_1__.ZOOM_ACTION.SCALE)\r
                this.ctx.lineWidth = this.list[i].value;\r
            if (i === this.zoomIndex) {\r
                if (this.list[i].value > op.maxSize) {\r
                    this.list[i].state = 2;\r
                    op.direction ? this.zoomIndex++ : this.zoomIndex - 1 >= 0 ? this.zoomIndex-- : this.zoomIndex = op.zoomNum - 1;\r
                }\r
                if (this.list[i].value <= op.lineWidth)\r
                    this.list[i].state = 1;\r
            }\r
            this.ctx.beginPath();\r
            if (op.zoomColors.length > 0 && op.zoomColors[i])\r
                this.ctx.strokeStyle = op.zoomColors[i];\r
            else\r
                this.ctx.strokeStyle = op.themeColor;\r
            let sH = 0, eH = op.zoomHeight;\r
            if (op.action === _utils__WEBPACK_IMPORTED_MODULE_1__.ZOOM_ACTION.HEIGHT || op.action === _utils__WEBPACK_IMPORTED_MODULE_1__.ZOOM_ACTION.WAVE) {\r
                sH = -this.list[i].value;\r
            }\r
            if (op.action === _utils__WEBPACK_IMPORTED_MODULE_1__.ZOOM_ACTION.WAVE) {\r
                eH = -this.list[i].value;\r
            }\r
            this.ctx.moveTo((i + 1) * (op.lineWidth + op.zoomGap), sH);\r
            this.ctx.lineTo((i + 1) * (op.lineWidth + op.zoomGap), eH);\r
            this.ctx.stroke();\r
            this.ctx.closePath();\r
        }\r
    }\r
    drawText() {\r
        let op = this.options;\r
        this.ctx.save();\r
        this.ctx.beginPath();\r
        let y = op.fontSize + op.maxSize;\r
        this.ctx.fillText(op.text, (((op.lineWidth) * (op.zoomNum + 1)) + (op.zoomGap * (op.zoomNum + 1))) / 2, y);\r
        this.ctx.closePath();\r
        this.ctx.restore();\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/draw/model/Zoom.ts?`);
        },
        "./src/draw/model/index.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Gear__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gear */ "./src/draw/model/Gear.ts");\n/* harmony import */ var _Zoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Zoom */ "./src/draw/model/Zoom.ts");\n/* harmony import */ var _Ring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ring */ "./src/draw/model/Ring.ts");\n/* harmony import */ var _Bean__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Bean */ "./src/draw/model/Bean.ts");\n/* harmony import */ var _Clock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Clock */ "./src/draw/model/Clock.ts");\n/* harmony import */ var _Pattern__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pattern */ "./src/draw/model/Pattern.ts");\n/* harmony import */ var _Roll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Roll */ "./src/draw/model/Roll.ts");\n/* harmony import */ var _Img__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Img */ "./src/draw/model/Img.ts");\n/* harmony import */ var _Skeleton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Skeleton */ "./src/draw/model/Skeleton.ts");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ Gear: _Gear__WEBPACK_IMPORTED_MODULE_0__["default"], Zoom: _Zoom__WEBPACK_IMPORTED_MODULE_1__["default"], Ring: _Ring__WEBPACK_IMPORTED_MODULE_2__["default"], Bean: _Bean__WEBPACK_IMPORTED_MODULE_3__["default"], Clock: _Clock__WEBPACK_IMPORTED_MODULE_4__["default"], Pattern: _Pattern__WEBPACK_IMPORTED_MODULE_5__["default"], Roll: _Roll__WEBPACK_IMPORTED_MODULE_6__["default"], Img: _Img__WEBPACK_IMPORTED_MODULE_7__["default"], Skeleton: _Skeleton__WEBPACK_IMPORTED_MODULE_8__["default"] });\r\n\n\n//# sourceURL=webpack://web-loading/./src/draw/model/index.ts?');
        },
        "./src/draw/utils.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "PATTERN_CHART": () => (/* binding */ PATTERN_CHART),\n/* harmony export */   "ROLL_CHART": () => (/* binding */ ROLL_CHART),\n/* harmony export */   "ZOOM_ACTION": () => (/* binding */ ZOOM_ACTION)\n/* harmony export */ });\nvar ZOOM_ACTION;\r\n(function (ZOOM_ACTION) {\r\n    ZOOM_ACTION["SCALE"] = "scale";\r\n    ZOOM_ACTION["WAVE"] = "wave";\r\n    ZOOM_ACTION["HEIGHT"] = "height";\r\n})(ZOOM_ACTION || (ZOOM_ACTION = {}));\r\nvar PATTERN_CHART;\r\n(function (PATTERN_CHART) {\r\n    PATTERN_CHART["RECT"] = "rect";\r\n    PATTERN_CHART["ARC"] = "arc";\r\n    PATTERN_CHART["TRIANGLE"] = "triangle";\r\n    PATTERN_CHART["HEART"] = "heart";\r\n    PATTERN_CHART["POLYGON"] = "polygon";\r\n})(PATTERN_CHART || (PATTERN_CHART = {}));\r\nvar ROLL_CHART;\r\n(function (ROLL_CHART) {\r\n    ROLL_CHART["RECT"] = "rect";\r\n    ROLL_CHART["WHEEL"] = "Wheel";\r\n    ROLL_CHART["WINDMILL"] = "Windmill";\r\n})(ROLL_CHART || (ROLL_CHART = {}));\r\n\n\n//# sourceURL=webpack://web-loading/./src/draw/utils.ts?');
        },
        "./src/loading.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ loading)\n/* harmony export */ });\n/* harmony import */ var _Webloading_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Webloading/index */ "./src/Webloading/index.ts");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");\n\r\n\r\nfunction loading(dom, options) {\r\n    let webLoading = new _Webloading_index__WEBPACK_IMPORTED_MODULE_0__["default"](dom, options);\r\n    const resize = () => {\r\n        webLoading.resize();\r\n    };\r\n    const reload = (options) => {\r\n        let op = Object.assign(webLoading.options, options);\r\n        if (!webLoading.loadingId) {\r\n            if (op.type !== _utils__WEBPACK_IMPORTED_MODULE_1__.LOADING_TYPES.DOM) {\r\n                op = Object.assign(op);\r\n            }\r\n            webLoading = new _Webloading_index__WEBPACK_IMPORTED_MODULE_0__["default"](dom, op);\r\n        }\r\n    };\r\n    const close = () => {\r\n        webLoading.close();\r\n    };\r\n    return {\r\n        reload,\r\n        resize,\r\n        close\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack://web-loading/./src/loading.ts?');
        },
        "./src/main.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ExtendLoading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExtendLoading */ "./src/ExtendLoading/index.ts");\n/* harmony import */ var _draw_model_BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./draw/model/BaseModel */ "./src/draw/model/BaseModel.ts");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");\n/* harmony import */ var _loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loading */ "./src/loading.ts");\n\r\n\r\n\r\n\r\nlet htmlElement = HTMLElement.prototype;\r\nlet $window = window;\r\nhtmlElement.BaseModel = _draw_model_BaseModel__WEBPACK_IMPORTED_MODULE_1__["default"];\r\nhtmlElement.loading = function (options) {\r\n    return (0,_loading__WEBPACK_IMPORTED_MODULE_3__["default"])(this, options);\r\n};\r\n$window.miniLoading = (options) => {\r\n    return extendLoading(_utils__WEBPACK_IMPORTED_MODULE_2__.LOADING_TYPES.MINI, options);\r\n};\r\n$window.loading = (options) => {\r\n    return extendLoading(_utils__WEBPACK_IMPORTED_MODULE_2__.LOADING_TYPES.FULL, options);\r\n};\r\nfunction extendLoading(type, options) {\r\n    let op = Object.assign(options || {}, { type });\r\n    let extendLoading = new _ExtendLoading__WEBPACK_IMPORTED_MODULE_0__["default"](op);\r\n    return (0,_loading__WEBPACK_IMPORTED_MODULE_3__["default"])(extendLoading.getElement(), op);\r\n}\r\n\n\n//# sourceURL=webpack://web-loading/./src/main.ts?');
        },
        "./src/utils.ts": (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
          eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$Log": () => (/* binding */ $Log),
/* harmony export */   "LOADING_TYPES": () => (/* binding */ LOADING_TYPES),
/* harmony export */   "LOG_TYPES": () => (/* binding */ LOG_TYPES),
/* harmony export */   "MODEL_TYPES": () => (/* binding */ MODEL_TYPES),
/* harmony export */   "clearAnimationFrame": () => (/* binding */ clearAnimationFrame),
/* harmony export */   "getDefOptions": () => (/* binding */ getDefOptions),
/* harmony export */   "isNull": () => (/* binding */ isNull)
/* harmony export */ });
var LOADING_TYPES;\r
(function (LOADING_TYPES) {\r
    LOADING_TYPES["FULL"] = "Full";\r
    LOADING_TYPES["MINI"] = "mini";\r
    LOADING_TYPES["DOM"] = "dom";\r
})(LOADING_TYPES || (LOADING_TYPES = {}));\r
var MODEL_TYPES;\r
(function (MODEL_TYPES) {\r
    MODEL_TYPES["GEAR"] = "Gear";\r
    MODEL_TYPES["RING"] = "Ring";\r
    MODEL_TYPES["Zoom"] = "Zoom";\r
    MODEL_TYPES["PATTERN"] = "Pattern";\r
    MODEL_TYPES["CLOCK"] = "Clock";\r
    MODEL_TYPES["BEAN"] = "Bean";\r
    MODEL_TYPES["ROLL"] = "Roll";\r
    MODEL_TYPES["IMG"] = "Img";\r
    MODEL_TYPES["SKELETON"] = "Skeleton";\r
})(MODEL_TYPES || (MODEL_TYPES = {}));\r
function getDefOptions() {\r
    return {\r
        custom: null,\r
        type: LOADING_TYPES.DOM,\r
        model: MODEL_TYPES.RING,\r
        miniClass: 'mini',\r
        delayColse: 520,\r
        optimization: false,\r
        zIndex: '2001',\r
        themeColor: 'rgba(64,158,255,1)',\r
        bgColor: 'rgba(0, 0, 0, 0.8)',\r
        shadowColor: 'rgba(64,158,255,0.6)',\r
        shadowOffsetX: 2,\r
        shadowOffsetY: 2,\r
        shadowBlur: 5,\r
        pointerEvents: false,\r
        delay: 65,\r
        text: '加载中...',\r
        textGap: 8,\r
        fontSize: 12,\r
        fontFamily: 'Microsoft YaHei'\r
    };\r
}\r
var LOG_TYPES;\r
(function (LOG_TYPES) {\r
    LOG_TYPES[LOG_TYPES["INFO"] = 1] = "INFO";\r
    LOG_TYPES[LOG_TYPES["WARN"] = 2] = "WARN";\r
    LOG_TYPES[LOG_TYPES["ERROR"] = 3] = "ERROR";\r
})(LOG_TYPES || (LOG_TYPES = {}));\r
class $Log {\r
    static info(message) {\r
        this.call(message, LOG_TYPES.INFO);\r
    }\r
    static warn(message) {\r
        this.call(message, LOG_TYPES.WARN);\r
    }\r
    static error(message) {\r
        this.call(message, LOG_TYPES.ERROR);\r
    }\r
    static call(message, type = LOG_TYPES.INFO, config = {\r
        color: getDefOptions().themeColor,\r
        bgColor: getDefOptions().bgColor\r
    }) {\r
        let bgColor = config.bgColor;\r
        if (type === 2)\r
            bgColor = '#fffbe5';\r
        if (type === 3)\r
            bgColor = '#fff0f0';\r
        let style = \`\r
      background:\${bgColor};\r
      font-size:14px;\r
      color:\${config.color};\r
      border: 1px solid;\`;\r
        console.log(\`%c web-loading:\${message} \`, style);\r
    }\r
}\r
function isNull(value) {\r
    return value === undefined || value === null;\r
}\r
function clearAnimationFrame(id) {\r
    if (!window.requestAnimationFrame) {\r
        window.clearInterval(id);\r
    }\r
    else {\r
        window.cancelAnimationFrame(id);\r
    }\r
}\r


//# sourceURL=webpack://web-loading/./src/utils.ts?`);
        }
      };
      var __webpack_module_cache__ = {};
      function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) {
          return cachedModule.exports;
        }
        var module2 = __webpack_module_cache__[moduleId] = {
          exports: {}
        };
        __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
        return module2.exports;
      }
      (() => {
        __webpack_require__.d = (exports2, definition) => {
          for (var key in definition) {
            if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
              Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
            }
          }
        };
      })();
      (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
      })();
      (() => {
        __webpack_require__.r = (exports2) => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports2, "__esModule", { value: true });
        };
      })();
      var __webpack_exports__ = __webpack_require__("./src/main.ts");
    })();
  }
});
export default require_main();
//# sourceMappingURL=web-loading-test.js.map
