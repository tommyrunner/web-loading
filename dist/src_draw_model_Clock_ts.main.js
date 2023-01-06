"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweb_loading1"] = self["webpackChunkweb_loading1"] || []).push([["src_draw_model_Clock_ts"],{

/***/ "./src/draw/model/Clock.ts":
/*!*********************************!*\
  !*** ./src/draw/model/Clock.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Clock)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/utils.ts\");\n/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ \"./src/draw/model/BaseModel.ts\");\n\r\n\r\nconst defaultOptions = {\r\n    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r\n    lineCap: 'round',\r\n    lineWidth: 2,\r\n    lineColors: ['#d4d4d4', '#06ab2d', '#8a0303'],\r\n    clockSize: 15,\r\n    clockGap: 4,\r\n    hLine: true,\r\n    mLine: false,\r\n    sLine: true,\r\n    textTime: ''\r\n};\r\nconst limits = [{\r\n        key: 'lineColors', message: 'lineColors.length <= 3', limit: (key) => {\r\n            return key.length <= 3;\r\n        }\r\n    }];\r\nclass Clock extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n    constructor(w, h, canvas, options, store) {\r\n        super(w, h, canvas, options, store);\r\n        this.initOptions(defaultOptions, limits);\r\n        this.initPoint();\r\n        this.nowTime = -1;\r\n        this.nowS = 0;\r\n        this.run(this.draw);\r\n    }\r\n    initPoint() {\r\n        let op = this.options;\r\n        this.ctx.lineCap = op.lineCap;\r\n        this.ctx.lineWidth = op.lineWidth;\r\n        this.ctx.save();\r\n    }\r\n    draw() {\r\n        this.clearRect();\r\n        this.drawClock();\r\n    }\r\n    drawText(h, m, s) {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        this.ctx.beginPath();\r\n        let y = op.clockSize * 2 + op.textGap;\r\n        if (op.textTime === 'time')\r\n            op.text = `${h} : ${m} : ${s}`;\r\n        if (op.textTime === 's')\r\n            op.text = this.nowTime + 's';\r\n        this.ctx.fillText(op.text, 0, y);\r\n        this.ctx.closePath();\r\n        this.ctx.restore();\r\n    }\r\n    drawClock() {\r\n        let op = this.options;\r\n        let s = new Date().getSeconds();\r\n        let m = new Date().getMinutes();\r\n        let h = new Date().getHours();\r\n        this.ctx.save();\r\n        this.ctx.beginPath();\r\n        this.setShadow();\r\n        this.ctx.moveTo(-5, -(op.clockSize + op.clockGap));\r\n        this.ctx.lineTo(5, -(op.clockSize + op.clockGap));\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n        this.ctx.beginPath();\r\n        this.setShadow();\r\n        this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2);\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n        this.ctx.restore();\r\n        this.ctx.save();\r\n        for (let i = 0; i < 12; i++) {\r\n            this.ctx.beginPath();\r\n            this.ctx.rotate((360 / 12) * Math.PI / 180);\r\n            this.ctx.moveTo(op.clockSize - op.clockGap, 0);\r\n            this.ctx.lineTo(op.clockSize - op.clockGap, 0);\r\n            this.ctx.stroke();\r\n            this.ctx.closePath();\r\n        }\r\n        this.ctx.restore();\r\n        if (op.hLine) {\r\n            this.ctx.save();\r\n            this.ctx.beginPath();\r\n            this.ctx.lineWidth = op.lineWidth * 1.6;\r\n            if (op.lineColors[0])\r\n                this.ctx.strokeStyle = op.lineColors[0];\r\n            this.ctx.rotate((-90 * Math.PI) / 180);\r\n            this.ctx.rotate(((h * 360 / 60) * Math.PI) / 180);\r\n            this.ctx.moveTo(-1, 0);\r\n            this.ctx.lineTo(op.clockSize / 2, 0);\r\n            this.ctx.stroke();\r\n            this.ctx.closePath();\r\n            this.ctx.restore();\r\n        }\r\n        if (op.mLine) {\r\n            this.ctx.save();\r\n            this.ctx.beginPath();\r\n            if (op.lineColors[1])\r\n                this.ctx.strokeStyle = op.lineColors[1];\r\n            this.ctx.lineWidth = op.lineWidth * 1.2;\r\n            this.ctx.rotate((-90 * Math.PI) / 180);\r\n            this.ctx.rotate(((m * 360 / 60) * Math.PI) / 180);\r\n            this.ctx.moveTo(-1, 0);\r\n            this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0);\r\n            this.ctx.stroke();\r\n            this.ctx.closePath();\r\n            this.ctx.restore();\r\n        }\r\n        if (op.sLine) {\r\n            this.ctx.save();\r\n            this.ctx.beginPath();\r\n            if (op.lineColors[2])\r\n                this.ctx.strokeStyle = op.lineColors[2];\r\n            this.ctx.rotate((-90 * Math.PI) / 180);\r\n            this.ctx.rotate(((s * 360 / 60) * Math.PI) / 180);\r\n            this.ctx.moveTo(-1, 0);\r\n            this.ctx.lineTo(op.clockSize - op.clockGap, 0);\r\n            this.ctx.stroke();\r\n            this.ctx.closePath();\r\n            this.ctx.restore();\r\n            if (this.nowS !== s)\r\n                this.nowTime++;\r\n            this.nowS = s;\r\n        }\r\n        this.drawText(h, m, s);\r\n    }\r\n    setShadow() {\r\n        let op = this.options;\r\n        this.ctx.shadowOffsetX = op.shadowOffsetX;\r\n        this.ctx.shadowOffsetY = op.shadowOffsetY;\r\n        this.ctx.shadowBlur = op.shadowBlur;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web-loading1/./src/draw/model/Clock.ts?");

/***/ })

}]);