"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweb_loading1"] = self["webpackChunkweb_loading1"] || []).push([["src_draw_model_Ring_ts"],{

/***/ "./src/draw/model/Ring.ts":
/*!********************************!*\
  !*** ./src/draw/model/Ring.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ring)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/utils.ts\");\n/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ \"./src/draw/model/BaseModel.ts\");\n\r\n\r\nconst defaultOptions = {\r\n    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r\n    arcGap: Math.PI / 4,\r\n    ringGap: 10,\r\n    lineWidth: 2,\r\n    ringNum: 2,\r\n    radius: 6,\r\n    lineCap: 'round',\r\n    turn: 10,\r\n    ringsTurn: [Math.PI, Math.PI / 4],\r\n    direction: true\r\n};\r\nconst limits = [{\r\n        key: 'ringNum', message: 'ringNum value 1-10', limit: (key) => {\r\n            return key >= 1 && key <= 10;\r\n        }\r\n    }, {\r\n        key: 'ringsTurn', message: `ringsTurn size ${defaultOptions.ringNum}`, limit: (key) => {\r\n            return key.length <= defaultOptions.ringNum;\r\n        }\r\n    }];\r\nclass Ring extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n    constructor(w, h, canvas, options, store) {\r\n        super(w, h, canvas, options, store);\r\n        this.rotate = 10;\r\n        this.initOptions(defaultOptions, limits);\r\n        this.initPoint();\r\n        this.run(this.draw);\r\n    }\r\n    initPoint() {\r\n        let op = this.options;\r\n        this.ctx.lineCap = op.lineCap;\r\n        this.ctx.lineWidth = op.lineWidth;\r\n        this.ctx.save();\r\n    }\r\n    draw() {\r\n        this.clearRect();\r\n        this.controller();\r\n        this.drawText();\r\n    }\r\n    controller() {\r\n        this.ctx.save();\r\n        let op = this.options;\r\n        let rotate = this.rotate * Math.PI / 180 * (op.direction ? 1 : -1);\r\n        this.ctx.rotate(rotate);\r\n        this.ctx.shadowOffsetX = op.shadowOffsetX;\r\n        this.ctx.shadowOffsetY = op.shadowOffsetY;\r\n        this.ctx.shadowBlur = op.shadowBlur;\r\n        for (let i = 1; i <= op.ringNum; i++) {\r\n            this.drawRing(op.radius + ((i - 1) * op.ringGap), op.arcGap, op.ringsTurn && op.ringsTurn.length > 0 ? op.ringsTurn[i - 1] : Math.PI / i);\r\n        }\r\n        this.rotate += op.turn;\r\n        this.ctx.restore();\r\n    }\r\n    drawText() {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        this.ctx.beginPath();\r\n        let y = op.ringNum * (op.radius + op.ringGap) + op.textGap;\r\n        this.ctx.fillText(op.text, 0, y);\r\n        this.ctx.closePath();\r\n        this.ctx.restore();\r\n    }\r\n    drawRing(r, arcGap = 1, angle = 0) {\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle);\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle);\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web-loading1/./src/draw/model/Ring.ts?");

/***/ })

}]);