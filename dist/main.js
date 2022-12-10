/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/loading/index.ts":
/*!******************************!*\
  !*** ./src/loading/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WebLoading)\n/* harmony export */ });\nclass WebLoading {\r\n    constructor(element, options) {\r\n        this.canvas = document.createElement(\"canvas\");\r\n        this.loadingId = String(Date.now());\r\n        this.canvas.id = this.loadingId;\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n        this.element = element;\r\n        this.element.loadingId = this.loadingId;\r\n        this.options = this.defOptions(options);\r\n        this.init();\r\n    }\r\n    defOptions(options) {\r\n        return Object.assign({\r\n            delay: 0.26,\r\n            optimization: false,\r\n            zIndex: \"2001\",\r\n            theme: { color: \"#13C2C2\", bgColor: \"rgba(0, 0, 0, 0.26)\" },\r\n        }, options);\r\n    }\r\n    init() {\r\n        let elementW = this.element.offsetWidth, elementH = this.element.offsetHeight;\r\n        this.element.style.position = \"relative\";\r\n        this.canvas.style.position = \"absolute\";\r\n        this.canvas.style.left = \"0px\";\r\n        this.canvas.style.top = \"0px\";\r\n        this.canvas.style.zIndex = this.options.zIndex;\r\n        this.canvas.style.transition = `${this.options.delay}s`;\r\n        this.canvas.style.backgroundColor = this.options.theme.bgColor;\r\n        this.canvas.width = elementW;\r\n        this.canvas.height = elementH;\r\n        this.element.append(this.canvas);\r\n        this.draw();\r\n    }\r\n    draw() {\r\n        let w = this.canvas.offsetWidth, h = this.canvas.offsetHeight;\r\n        if (this.ctx) {\r\n            this.ctx.clearRect(0, 0, w, h);\r\n            this.ctx.fillStyle = this.options.theme.color;\r\n            this.ctx.arc(w / 2, h / 2, 10, 0, Math.PI * 2);\r\n            this.ctx.fill();\r\n        }\r\n    }\r\n    resize() {\r\n        this.canvas.width = this.element.offsetWidth;\r\n        this.canvas.height = this.element.offsetHeight;\r\n        this.draw();\r\n    }\r\n    close() {\r\n        this.canvas.style.opacity = \"0\";\r\n        this.canvas.style.zIndex = \"-2001\";\r\n        this.loadingId = null;\r\n        setTimeout(() => {\r\n            this.canvas.remove();\r\n        }, this.options.delay * 1000);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://foundation.plugs-js/./src/loading/index.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loading_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loading/index */ \"./src/loading/index.ts\");\n\r\nlet htmlElement = HTMLElement.prototype;\r\nhtmlElement.loading = function loading(options) {\r\n    let webLoading = new _loading_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this, options);\r\n    const resize = () => {\r\n        webLoading.resize();\r\n    };\r\n    const reload = () => {\r\n        if (!webLoading.loadingId)\r\n            webLoading = new _loading_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\r\n    };\r\n    const close = () => {\r\n        webLoading.close();\r\n    };\r\n    return {\r\n        reload,\r\n        resize,\r\n        close,\r\n    };\r\n};\r\n\n\n//# sourceURL=webpack://foundation.plugs-js/./src/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;