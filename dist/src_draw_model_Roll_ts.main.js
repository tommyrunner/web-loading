"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweb_loading1"] = self["webpackChunkweb_loading1"] || []).push([["src_draw_model_Roll_ts"],{

/***/ "./src/draw/model/Roll.ts":
/*!********************************!*\
  !*** ./src/draw/model/Roll.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Roll)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/utils.ts\");\n/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ \"./src/draw/model/BaseModel.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ \"./src/draw/utils.ts\");\n\r\n\r\n\r\nconst defaultOptions = {\r\n    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r\n    rollGap: 12,\r\n    childNum: 4,\r\n    rollSize: 16,\r\n    showChild: true,\r\n    chart: _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WHEEL,\r\n    windmills: ['#1ab3ea', '#de6834', '#30925d', '#f48ea5'],\r\n    windmillPointColor: '#f2c31f',\r\n    fixad: false\r\n};\r\nconst limits = [{\r\n        key: 'childNum', message: 'chartSize value 4-10', limit: (key) => {\r\n            return key >= 4 && key <= 10;\r\n        }\r\n    }, {\r\n        key: 'delay', message: 'Roll.delay not allowed update', limit: (key) => {\r\n            return key === (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)().delay;\r\n        }\r\n    }];\r\nclass Roll extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n    constructor(w, h, canvas, options, store) {\r\n        super(w, h, canvas, options, store);\r\n        this.initOptions(defaultOptions, limits);\r\n        this.Roll = {\r\n            turn: 1,\r\n            nowX: this.options.fixad ? 0 : (this.options.childNum / 2) * (this.options.rollSize + this.options.rollGap) + this.options.rollGap / 2,\r\n            state: 2,\r\n            child: []\r\n        };\r\n        this.run(this.draw);\r\n    }\r\n    draw() {\r\n        this.clearRect();\r\n        this.drawGround();\r\n        this.drawChild();\r\n        this.ctx.save();\r\n        this.ctx.beginPath();\r\n        this.ctx.translate(-this.Roll.nowX, 0);\r\n        this.ctx.rotate(this.Roll.turn * Math.PI / 180);\r\n        this.selectChart();\r\n        this.controller();\r\n        this.ctx.restore();\r\n        this.drawText();\r\n    }\r\n    selectChart() {\r\n        let op = this.options;\r\n        switch (op.chart) {\r\n            case _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.RECT:\r\n                this.drawRect();\r\n                break;\r\n            case _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WHEEL:\r\n                this.drawWheel();\r\n                break;\r\n            case _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WINDMILL:\r\n                this.drawWindmill();\r\n                break;\r\n        }\r\n    }\r\n    controller() {\r\n        let op = this.options;\r\n        if (this.Roll.state === 1) {\r\n            this.Roll.turn -= 10;\r\n            if (op.delay < 20 && !op.fixad)\r\n                op.delay += 2;\r\n        }\r\n        if (this.Roll.state === 2) {\r\n            this.Roll.turn += 10;\r\n            if (op.delay > 10 && !op.fixad)\r\n                op.delay -= 5;\r\n        }\r\n        if (op.fixad)\r\n            return;\r\n        if (this.Roll.nowX <= -(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6))\r\n            this.Roll.state = 1;\r\n        if (this.Roll.nowX >= (op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2)\r\n            this.Roll.state = 2;\r\n        if (this.Roll.state === 1)\r\n            this.Roll.nowX++;\r\n        if (this.Roll.state === 2)\r\n            this.Roll.nowX--;\r\n        let child = this.Roll.child;\r\n        if (this.Roll.nowX % (op.rollSize + op.rollGap) == 0 && this.Roll.state === 2) {\r\n            child.push({ turn: this.Roll.turn, x: this.Roll.nowX });\r\n        }\r\n        if (this.Roll.state === 1 && child[child.length - 1] && child[child.length - 1].x === this.Roll.nowX) {\r\n            this.Roll.child.pop();\r\n        }\r\n    }\r\n    drawRect() {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        this.setShadow();\r\n        this.ctx.translate(-op.rollSize / 2, -op.rollSize / 2);\r\n        this.ctx.fillRect(0, 0, op.rollSize, op.rollSize);\r\n        this.ctx.restore();\r\n    }\r\n    drawWheel() {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        this.ctx.lineWidth = 4;\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(0, 0, op.rollSize / 6, 0, Math.PI * 2);\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n        this.ctx.beginPath();\r\n        this.ctx.arc(0, 0, op.rollSize, 0, Math.PI * 2);\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n        for (let i = 0; i < 6; i++) {\r\n            this.ctx.beginPath();\r\n            this.ctx.moveTo(0, op.rollSize / 2);\r\n            this.ctx.lineTo(0, op.rollSize);\r\n            this.ctx.stroke();\r\n            this.ctx.rotate((360 / 6) * Math.PI / 180);\r\n            this.ctx.closePath();\r\n        }\r\n        this.ctx.restore();\r\n    }\r\n    drawWindmill() {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        for (let i = 0; i < op.windmills.length; i++) {\r\n            this.ctx.beginPath();\r\n            this.ctx.fillStyle = op.windmills[i];\r\n            this.ctx.arc(-op.rollSize / 2, 0, op.rollSize, 0, Math.PI);\r\n            this.ctx.fill();\r\n            this.ctx.closePath();\r\n            this.ctx.rotate((360 / 4) * Math.PI / 180);\r\n        }\r\n        this.ctx.beginPath();\r\n        this.ctx.fillStyle = op.windmillPointColor;\r\n        this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);\r\n        this.ctx.fill();\r\n        this.ctx.restore();\r\n    }\r\n    drawChild() {\r\n        let op = this.options;\r\n        if (!op.showChild)\r\n            return;\r\n        this.Roll.child.forEach((c, index) => {\r\n            this.ctx.save();\r\n            this.ctx.translate(-c.x, 0);\r\n            this.ctx.globalAlpha = (index + 1) / 10;\r\n            this.ctx.rotate(c.turn * Math.PI / 180);\r\n            this.selectChart();\r\n            this.ctx.restore();\r\n        });\r\n    }\r\n    drawGround() {\r\n        let op = this.options;\r\n        if (op.chart !== _utils__WEBPACK_IMPORTED_MODULE_2__.ROLL_CHART.WHEEL)\r\n            return;\r\n        this.ctx.save();\r\n        this.ctx.beginPath();\r\n        this.ctx.lineWidth = 3;\r\n        this.ctx.globalAlpha = 0.03;\r\n        this.ctx.moveTo(-(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6), op.rollSize + 3);\r\n        this.ctx.lineTo((op.childNum / 2) * (op.rollSize + op.rollGap) + op.rollGap / 2, op.rollSize + 3);\r\n        this.ctx.stroke();\r\n        this.ctx.closePath();\r\n        this.ctx.restore();\r\n    }\r\n    drawText() {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        this.ctx.beginPath();\r\n        let y = op.fontSize + op.textGap + op.rollSize;\r\n        this.ctx.fillText(op.text, 0, y);\r\n        this.ctx.closePath();\r\n        this.ctx.restore();\r\n    }\r\n    setShadow() {\r\n        let op = this.options;\r\n        this.ctx.shadowOffsetX = op.shadowOffsetX;\r\n        this.ctx.shadowOffsetY = op.shadowOffsetY;\r\n        this.ctx.shadowBlur = op.shadowBlur;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web-loading1/./src/draw/model/Roll.ts?");

/***/ }),

/***/ "./src/draw/utils.ts":
/*!***************************!*\
  !*** ./src/draw/utils.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PATTERN_CHART\": () => (/* binding */ PATTERN_CHART),\n/* harmony export */   \"ROLL_CHART\": () => (/* binding */ ROLL_CHART),\n/* harmony export */   \"ZOOM_ACTION\": () => (/* binding */ ZOOM_ACTION)\n/* harmony export */ });\nvar ZOOM_ACTION;\r\n(function (ZOOM_ACTION) {\r\n    ZOOM_ACTION[\"SCALE\"] = \"scale\";\r\n    ZOOM_ACTION[\"WAVE\"] = \"wave\";\r\n    ZOOM_ACTION[\"HEIGHT\"] = \"height\";\r\n})(ZOOM_ACTION || (ZOOM_ACTION = {}));\r\nvar PATTERN_CHART;\r\n(function (PATTERN_CHART) {\r\n    PATTERN_CHART[\"RECT\"] = \"rect\";\r\n    PATTERN_CHART[\"ARC\"] = \"arc\";\r\n    PATTERN_CHART[\"TRIANGLE\"] = \"triangle\";\r\n    PATTERN_CHART[\"HEART\"] = \"heart\";\r\n    PATTERN_CHART[\"POLYGON\"] = \"polygon\";\r\n})(PATTERN_CHART || (PATTERN_CHART = {}));\r\nvar ROLL_CHART;\r\n(function (ROLL_CHART) {\r\n    ROLL_CHART[\"RECT\"] = \"rect\";\r\n    ROLL_CHART[\"WHEEL\"] = \"Wheel\";\r\n    ROLL_CHART[\"WINDMILL\"] = \"Windmill\";\r\n})(ROLL_CHART || (ROLL_CHART = {}));\r\n\n\n//# sourceURL=webpack://web-loading1/./src/draw/utils.ts?");

/***/ })

}]);