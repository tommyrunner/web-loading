"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkweb_loading1"] = self["webpackChunkweb_loading1"] || []).push([["src_draw_model_Img_ts"],{

/***/ "./src/draw/model/Img.ts":
/*!*******************************!*\
  !*** ./src/draw/model/Img.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Img)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils */ \"./src/utils.ts\");\n/* harmony import */ var _BaseModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseModel */ \"./src/draw/model/BaseModel.ts\");\n\r\n\r\nconst defaultOptions = {\r\n    ...(0,_utils__WEBPACK_IMPORTED_MODULE_0__.getDefOptions)(),\r\n    src: '',\r\n    width: 52,\r\n    height: 52,\r\n    turn: false\r\n};\r\nclass Img extends _BaseModel__WEBPACK_IMPORTED_MODULE_1__[\"default\"] {\r\n    constructor(w, h, canvas, options, store) {\r\n        super(w, h, canvas, options, store);\r\n        this.initOptions(defaultOptions, []);\r\n        this.img = new Image();\r\n        this.img.src = this.options.src;\r\n        this.turn = 10;\r\n        this.img.onload = () => {\r\n            this.run(this.draw);\r\n        };\r\n    }\r\n    draw() {\r\n        this.clearRect();\r\n        this.drawImg();\r\n        this.drawText();\r\n    }\r\n    drawImg() {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        if (op.turn)\r\n            this.ctx.rotate(this.turn * Math.PI / 180);\r\n        this.ctx.drawImage(this.img, -op.width / 2, -op.height / 2, op.width, op.height);\r\n        this.ctx.closePath();\r\n        this.ctx.restore();\r\n        this.turn += 10;\r\n    }\r\n    drawText() {\r\n        let op = this.options;\r\n        this.ctx.save();\r\n        this.ctx.beginPath();\r\n        let y = op.fontSize + op.textGap + op.height / 2;\r\n        this.ctx.fillText(op.text, 0, y);\r\n        this.ctx.closePath();\r\n        this.ctx.restore();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://web-loading1/./src/draw/model/Img.ts?");

/***/ })

}]);