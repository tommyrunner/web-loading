"use strict";
exports.__esModule = true;
var WebLoading = /** @class */ (function () {
    function WebLoading(element, options) {
        // 动画canvas
        this.canvas = document.createElement("canvas");
        this.loadingId = String(Date.now());
        this.canvas.id = this.loadingId;
        // 画笔
        this.ctx = this.canvas.getContext("2d");
        // 动画元素
        this.element = element;
        this.element.loadingId = this.loadingId;
        this.element.append(this.canvas);
        this.init();
    }
    WebLoading.prototype.init = function () {
        var elementW = this.element.offsetWidth, elementH = this.element.offsetHeight;
        this.element.style.position = "relative";
        // 初始化样式
        this.canvas.style.cssText = "\n        position: absolute;\n        left:0px;\n        top:0px;\n        zIndex:2001;\n        transition: 0.26s;\n        background-color: rgb(0 0 0 / 42%);\n    ";
        this.canvas.width = elementW;
        this.canvas.height = elementH;
        // 默认画
        this.draw();
    };
    WebLoading.prototype.draw = function () {
        var w = this.canvas.offsetWidth, h = this.canvas.offsetHeight;
        if (this.ctx) {
            this.ctx.clearRect(0, 0, w, h);
            // 设置画布颜色
            this.ctx.arc(w / 2, h / 2, 10, 0, Math.PI * 2);
            this.ctx.fill();
        }
    };
    WebLoading.prototype.resize = function () {
        this.canvas.width = this.element.offsetWidth;
        this.canvas.height = this.element.offsetHeight;
        this.draw();
    };
    WebLoading.prototype.close = function () {
        var _this = this;
        this.canvas.style.opacity = '0';
        this.canvas.style.zIndex = '-2001';
        this.loadingId = null;
        setTimeout(function () {
            // 清空dom
            _this.canvas.remove();
        }, 0.26 * 1000);
    };
    return WebLoading;
}());
exports["default"] = WebLoading;
