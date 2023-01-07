// node_modules/web-loading-test/src/utils.ts
function getDefOptions() {
  return {
    custom: null,
    type: "dom" /* DOM */,
    model: "Ring" /* RING */,
    miniClass: "mini",
    delayColse: 520,
    optimization: false,
    zIndex: "2001",
    themeColor: "rgba(64,158,255,1)",
    bgColor: "rgba(0, 0, 0, 0.8)",
    shadowColor: "rgba(64,158,255,0.6)",
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    shadowBlur: 5,
    pointerEvents: false,
    delay: 65,
    text: "加载中...",
    textGap: 8,
    fontSize: 12,
    fontFamily: "Microsoft YaHei"
  };
}
var $Log = class {
  static info(message) {
    this.call(message, 1 /* INFO */);
  }
  static warn(message) {
    this.call(message, 2 /* WARN */);
  }
  static error(message) {
    this.call(message, 3 /* ERROR */);
  }
  static call(message, type = 1 /* INFO */, config = {
    color: getDefOptions().themeColor,
    bgColor: getDefOptions().bgColor
  }) {
    let bgColor = config.bgColor;
    if (type === 2)
      bgColor = "#fffbe5";
    if (type === 3)
      bgColor = "#fff0f0";
    let style = `
      background:${bgColor};
      font-size:14px;
      color:${config.color};
      border: 1px solid;`;
    console.log(`%c web-loading:${message} `, style);
  }
};
function clearAnimationFrame(id) {
  if (!window.requestAnimationFrame) {
    window.clearInterval(id);
  } else {
    window.cancelAnimationFrame(id);
  }
}

// node_modules/web-loading-test/src/draw/index.ts
function drawController(w, h, canvas, options, store) {
  try {
    let model = null;
    if (!options.custom) {
      import(`./model/${options.model}.ts`).then((model2) => {
        new model2.default(w, h, canvas, options, store.element.$store);
      });
    } else
      model = new options.custom(w, h, canvas, options, store.element.$store);
    store.model = model;
  } catch (e) {
    $Log.error("draw error(" + e + ")");
  }
}

// node_modules/web-loading-test/src/Webloading/style.ts
var style_default = `
@keyframes wl_show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

// node_modules/web-loading-test/src/Webloading/index.ts
var WebLoading = class {
  constructor(element, options, extendLoading) {
    this.options = Object.assign(getDefOptions(), options);
    this.extendLoading = extendLoading;
    this.canvas = document.createElement("canvas");
    this.loadingId = String("wl_" + Date.now());
    this.element = element;
    this.initStore();
    this.init();
  }
  resize() {
    this.canvas.width = this.element.clientWidth;
    this.canvas.height = this.element.clientHeight;
    this.draw();
  }
  close() {
    var _a;
    let op = this.options;
    this.clearStyle();
    this.loadingId = null;
    if (!op.pointerEvents) {
      if (op.type === "dom" /* DOM */)
        this.element.style.pointerEvents = "auto";
      else
        document.body.style.pointerEvents = "auto";
    }
    if (op.type !== "dom" /* DOM */)
      (_a = this.extendLoading) == null ? void 0 : _a.clearStyle();
    if (this.element.$store) {
      this.element.$store.model = null;
      this.element.$store.hookCall.beforeColse();
    }
    setTimeout(() => {
      var _a2, _b, _c, _d;
      if ((_a2 = this.element.$store) == null ? void 0 : _a2.animationId)
        clearAnimationFrame((_b = this.element.$store) == null ? void 0 : _b.animationId);
      if (op.type !== "dom" /* DOM */)
        (_c = this.extendLoading) == null ? void 0 : _c.getElement().remove();
      else
        this.canvas.remove();
      if ((_d = this.element.$store) == null ? void 0 : _d.hookCall)
        this.element.$store.hookCall.colsed();
    }, op.delayColse);
  }
  init() {
    this.initStyle();
    this.draw();
  }
  clearStyle() {
    this.canvas.style.opacity = "0";
    this.canvas.style.zIndex = "-2001";
  }
  initStyle() {
    let op = this.options;
    let elementW = this.element.clientWidth, elementH = this.element.clientHeight, readElementStyle = window.getComputedStyle(this.element), elementStyle = this.element.style, canvasStyle = this.canvas.style;
    this.element.loadingId = this.loadingId;
    if (!op.pointerEvents) {
      if (op.type === "dom" /* DOM */)
        this.element.style.pointerEvents = "none";
      else
        document.body.style.pointerEvents = "none";
    }
    if (!readElementStyle.position || readElementStyle.position === "static")
      elementStyle.position = "relative";
    this.canvas.id = this.loadingId;
    document.styleSheets[0].insertRule(style_default);
    this.canvas.style.animation = `wl_show ${op.delayColse / 1e3}s linear`;
    canvasStyle.position = "absolute";
    canvasStyle.left = `${op.pointerEvents ? 0 : this.element.scrollLeft}px`;
    canvasStyle.top = `${op.pointerEvents ? 0 : this.element.scrollTop}px`;
    canvasStyle.zIndex = op.zIndex;
    canvasStyle.transition = `${op.delayColse / 1e3}s`;
    canvasStyle.backgroundColor = op.bgColor;
    canvasStyle.borderRadius = readElementStyle.borderRadius;
    this.canvas.width = elementW;
    this.canvas.height = elementH;
    this.element.append(this.canvas);
  }
  draw() {
    let w = this.canvas.offsetWidth, h = this.canvas.offsetHeight;
    if (this.element.$store) {
      drawController(w, h, this.canvas, this.options, this.element.$store);
    } else {
      $Log.error("WebLoading:canvas or ctx null");
    }
  }
  initStore() {
    this.element.$store = {
      options: this.options,
      element: this.element,
      animationId: void 0,
      loadingId: this.loadingId,
      model: null,
      hookCall: {
        beforeColse: () => {
        },
        colsed: () => {
        }
      }
    };
  }
};

// node_modules/web-loading-test/src/loading.ts
function loading(dom, options) {
  let webLoading = new WebLoading(dom, options);
  const resize = () => {
    webLoading.resize();
  };
  const reload = (options2) => {
    let op = Object.assign(webLoading.options, options2);
    if (!webLoading.loadingId) {
      if (op.type !== "dom" /* DOM */) {
        op = Object.assign(op);
      }
      webLoading = new WebLoading(dom, op);
    }
  };
  const close = () => {
    webLoading.close();
  };
  return {
    reload,
    resize,
    close
  };
}
export {
  loading as default
};
//# sourceMappingURL=web-loading-test_src_loading.js.map
