// node_modules/web-loading-test/dist/main.js
(() => {
  var t, e, i = { 735: (t2, e2, i2) => {
    "use strict";
    i2.r(e2), i2.d(e2, { default: () => o2 });
    var n2 = i2(147);
    class o2 {
      constructor(t3, e3, i3, o3, s) {
        this.w = t3, this.h = e3, this.canvas = i3, this.ctx = i3.getContext("2d"), this.options = o3, this.store = s, this.webLog = n2.JG, this.stepClear = 1, this._$initPoint();
      }
      initOptions(t3, e3) {
        this.options = Object.assign(t3, this.options), this.store.options = this.options, e3 && e3.length && e3.forEach((t4) => {
          let e4 = this.options[t4.key];
          (0, n2.Ft)(e4) || t4.limit(e4) || n2.JG.warn(t4.message);
        });
      }
      _$initPoint() {
        this.clearRect();
        let t3 = this.options;
        this.ctx.fillStyle = t3.themeColor, this.ctx.strokeStyle = t3.themeColor, this.ctx.shadowColor = t3.shadowColor, this.ctx.font = `${t3.fontSize}px ${t3.fontFamily}`, this.ctx.textAlign = "center", this.ctx.textBaseline = "middle", this.ctx.translate(this.w / 2, this.h / 2), this.ctx.save();
      }
      clearRect(t3, e3, i3, o3) {
        if ((0, n2.Ft)(t3) || (0, n2.Ft)(e3) || (0, n2.Ft)(i3) || (0, n2.Ft)(o3))
          if ((0, n2.Ft)(t3) || (0, n2.Ft)(e3) || (0, n2.Ft)(i3) || !(0, n2.Ft)(o3))
            this.ctx.clearRect(-this.w, -this.h, 2 * this.w, 2 * this.h);
          else {
            let n3 = i3 - this.stepClear, o4 = Math.sqrt(i3 * i3 - n3 * n3), s = t3 - n3, a = e3 - o4, r = 2 * n3, l = 2 * o4;
            this.stepClear <= i3 ? (this.ctx.clearRect(s, a, r, l), this.stepClear += 1, this.clearRect(t3, e3, i3)) : this.stepClear = 1;
          }
        else
          this.ctx.clearRect(t3, e3, i3, o3);
      }
      drowRadiusRect(t3, e3, i3, n3, o3) {
        this.ctx.beginPath(), this.ctx.arc(t3 + o3, e3 + o3, o3, 1 * Math.PI, 1.5 * Math.PI), this.ctx.lineTo(t3 + i3 - o3, e3), this.ctx.arc(t3 + i3 - o3, e3 + o3, o3, 1.5 * Math.PI, 0), this.ctx.lineTo(t3 + i3, e3 + n3 - o3), this.ctx.arc(t3 + i3 - o3, e3 + n3 - o3, o3, 0, 0.5 * Math.PI), this.ctx.lineTo(t3 + o3, e3 + n3), this.ctx.arc(t3 + o3, e3 + n3 - o3, o3, 0.5 * Math.PI, Math.PI), this.ctx.lineTo(t3, e3 + o3), this.ctx.closePath();
      }
      run(t3) {
        this.store.animationId && this.clearAnimationFrame(this.store.animationId), this.animationFrame(t3);
      }
      animationFrame(t3) {
        window.requestAnimationFrame || (this.store.animationId = window.setInterval(t3, this.options.delay));
        let e3 = Date.now() + this.options.delay;
        t3.call(this);
        const i3 = () => {
          Date.now() > e3 && (t3.call(this), e3 = Date.now() + this.options.delay), this.store.animationId = window.requestAnimationFrame(i3);
        };
        this.store.animationId = window.requestAnimationFrame(i3);
      }
      clearAnimationFrame(t3) {
        (0, n2.VS)(t3);
      }
    }
  }, 147: (t2, e2, i2) => {
    "use strict";
    var n2, o2, s;
    function a() {
      return { custom: null, type: n2.DOM, model: o2.RING, miniClass: "mini", delayColse: 520, optimization: false, zIndex: "2001", themeColor: "rgba(64,158,255,1)", bgColor: "rgba(0, 0, 0, 0.8)", shadowColor: "rgba(64,158,255,0.6)", shadowOffsetX: 2, shadowOffsetY: 2, shadowBlur: 5, pointerEvents: false, delay: 65, text: "加载中...", textGap: 8, fontSize: 12, fontFamily: "Microsoft YaHei" };
    }
    i2.d(e2, { Ft: () => l, Fu: () => n2, JG: () => r, VS: () => h, g3: () => a }), function(t3) {
      t3.FULL = "Full", t3.MINI = "mini", t3.DOM = "dom";
    }(n2 || (n2 = {})), function(t3) {
      t3.GEAR = "Gear", t3.RING = "Ring", t3.Zoom = "Zoom", t3.PATTERN = "Pattern", t3.CLOCK = "Clock", t3.BEAN = "Bean", t3.ROLL = "Roll", t3.IMG = "Img", t3.SKELETON = "Skeleton";
    }(o2 || (o2 = {})), function(t3) {
      t3[t3.INFO = 1] = "INFO", t3[t3.WARN = 2] = "WARN", t3[t3.ERROR = 3] = "ERROR";
    }(s || (s = {}));
    class r {
      static info(t3) {
        this.call(t3, s.INFO);
      }
      static warn(t3) {
        this.call(t3, s.WARN);
      }
      static error(t3) {
        this.call(t3, s.ERROR);
      }
      static call(t3, e3 = s.INFO, i3 = { color: a().themeColor, bgColor: a().bgColor }) {
        let n3 = i3.bgColor;
        2 === e3 && (n3 = "#fffbe5"), 3 === e3 && (n3 = "#fff0f0");
        let o3 = `
      background:${n3};
      font-size:14px;
      color:${i3.color};
      border: 1px solid;`;
        console.log(`%c web-loading:${t3} `, o3);
      }
    }
    function l(t3) {
      return null == t3;
    }
    function h(t3) {
      window.requestAnimationFrame ? window.cancelAnimationFrame(t3) : window.clearInterval(t3);
    }
  }, 958: (t2, e2, i2) => {
    var n2 = { "./BaseModel.ts": [735], "./Bean.ts": [609, 609], "./Clock.ts": [529, 529], "./Gear.ts": [240, 240], "./Img.ts": [373, 373], "./Pattern.ts": [686, 686], "./Ring.ts": [383, 383], "./Roll.ts": [853, 853], "./Skeleton.ts": [823, 823], "./Zoom.ts": [996, 996], "./index.ts": [263, 263] };
    function o2(t3) {
      if (!i2.o(n2, t3))
        return Promise.resolve().then(() => {
          var e4 = new Error("Cannot find module '" + t3 + "'");
          throw e4.code = "MODULE_NOT_FOUND", e4;
        });
      var e3 = n2[t3], o3 = e3[0];
      return Promise.all(e3.slice(1).map(i2.e)).then(() => i2(o3));
    }
    o2.keys = () => Object.keys(n2), o2.id = 958, t2.exports = o2;
  } }, n = {};
  function o(t2) {
    var e2 = n[t2];
    if (void 0 !== e2)
      return e2.exports;
    var s = n[t2] = { exports: {} };
    return i[t2](s, s.exports, o), s.exports;
  }
  o.m = i, o.d = (t2, e2) => {
    for (var i2 in e2)
      o.o(e2, i2) && !o.o(t2, i2) && Object.defineProperty(t2, i2, { enumerable: true, get: e2[i2] });
  }, o.f = {}, o.e = (t2) => Promise.all(Object.keys(o.f).reduce((e2, i2) => (o.f[i2](t2, e2), e2), [])), o.u = (t2) => t2 + ".main.js", o.g = function() {
    if ("object" == typeof globalThis)
      return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t2) {
      if ("object" == typeof window)
        return window;
    }
  }(), o.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), t = {}, e = "web-loading-test:", o.l = (i2, n2, s, a) => {
    if (t[i2])
      t[i2].push(n2);
    else {
      var r, l;
      if (void 0 !== s)
        for (var h = document.getElementsByTagName("script"), c = 0; c < h.length; c++) {
          var d = h[c];
          if (d.getAttribute("src") == i2 || d.getAttribute("data-webpack") == e + s) {
            r = d;
            break;
          }
        }
      r || (l = true, (r = document.createElement("script")).charset = "utf-8", r.timeout = 120, o.nc && r.setAttribute("nonce", o.nc), r.setAttribute("data-webpack", e + s), r.src = i2), t[i2] = [n2];
      var m = (e2, n3) => {
        r.onerror = r.onload = null, clearTimeout(p);
        var o2 = t[i2];
        if (delete t[i2], r.parentNode && r.parentNode.removeChild(r), o2 && o2.forEach((t2) => t2(n3)), e2)
          return e2(n3);
      }, p = setTimeout(m.bind(null, void 0, { type: "timeout", target: r }), 12e4);
      r.onerror = m.bind(null, r.onerror), r.onload = m.bind(null, r.onload), l && document.head.appendChild(r);
    }
  }, o.r = (t2) => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
  }, (() => {
    var t2;
    o.g.importScripts && (t2 = o.g.location + "");
    var e2 = o.g.document;
    if (!t2 && e2 && (e2.currentScript && (t2 = e2.currentScript.src), !t2)) {
      var i2 = e2.getElementsByTagName("script");
      i2.length && (t2 = i2[i2.length - 1].src);
    }
    if (!t2)
      throw new Error("Automatic publicPath is not supported in this browser");
    t2 = t2.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), o.p = t2;
  })(), (() => {
    var t2 = { 179: 0 };
    o.f.j = (e3, i3) => {
      var n2 = o.o(t2, e3) ? t2[e3] : void 0;
      if (0 !== n2)
        if (n2)
          i3.push(n2[2]);
        else {
          var s = new Promise((i4, o2) => n2 = t2[e3] = [i4, o2]);
          i3.push(n2[2] = s);
          var a = o.p + o.u(e3), r = new Error();
          o.l(a, (i4) => {
            if (o.o(t2, e3) && (0 !== (n2 = t2[e3]) && (t2[e3] = void 0), n2)) {
              var s2 = i4 && ("load" === i4.type ? "missing" : i4.type), a2 = i4 && i4.target && i4.target.src;
              r.message = "Loading chunk " + e3 + " failed.\n(" + s2 + ": " + a2 + ")", r.name = "ChunkLoadError", r.type = s2, r.request = a2, n2[1](r);
            }
          }, "chunk-" + e3, e3);
        }
    };
    var e2 = (e3, i3) => {
      var n2, s, [a, r, l] = i3, h = 0;
      if (a.some((e4) => 0 !== t2[e4])) {
        for (n2 in r)
          o.o(r, n2) && (o.m[n2] = r[n2]);
        l && l(o);
      }
      for (e3 && e3(i3); h < a.length; h++)
        s = a[h], o.o(t2, s) && t2[s] && t2[s][0](), t2[s] = 0;
    }, i2 = self.webpackChunkweb_loading_test = self.webpackChunkweb_loading_test || [];
    i2.forEach(e2.bind(null, 0)), i2.push = e2.bind(null, i2.push.bind(i2));
  })(), (() => {
    "use strict";
    var t2 = o(147);
    let e2 = document;
    class i2 {
      constructor(t3) {
        this.options = t3, this.miniEl = this.initStyle();
      }
      initStyle() {
        this.miniEl = document.createElement("div");
        let i3 = this.options, n3 = "100vw", o2 = "100vh", s2 = "0px";
        return i3 && (this.miniEl.classList.add("wl_" + (i3.miniClass || "loading")), i3.type === t2.Fu.MINI && (n3 = "180px", o2 = "160px", s2 = "10px")), this.miniEl.style.cssText = `
        position:fixed;
        width:${n3};
        height:${o2};
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        border-radius: ${s2};
        box-shadow:
        2.8px 2.8px 2.2px rgba(0, 0, 0, 0.02),
        6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
        12.5px 12.5px 10px rgba(0, 0, 0, 0.035),
        22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
        41.8px 41.8px 33.4px rgba(0, 0, 0, 0.05),
        100px 100px 80px rgba(0, 0, 0, 0.07)
        ;
    `, e2.body.appendChild(this.miniEl), this.miniEl;
      }
      getElement() {
        return this.miniEl;
      }
      clearStyle() {
        this.miniEl.style.boxShadow = "none";
      }
    }
    var n2 = o(735);
    class s {
      constructor(e3, i3, n3) {
        this.options = Object.assign((0, t2.g3)(), i3), this.extendLoading = n3, this.canvas = document.createElement("canvas"), this.loadingId = String("wl_" + Date.now()), this.element = e3, this.initStore(), this.init();
      }
      resize() {
        this.canvas.width = this.element.clientWidth, this.canvas.height = this.element.clientHeight, this.draw();
      }
      close() {
        var _a;
        let e3 = this.options;
        this.clearStyle(), this.loadingId = null, e3.pointerEvents || (e3.type === t2.Fu.DOM ? this.element.style.pointerEvents = "auto" : document.body.style.pointerEvents = "auto"), e3.type !== t2.Fu.DOM && ((_a = this.extendLoading) == null ? void 0 : _a.clearStyle()), this.element.$store && (this.element.$store.model = null, this.element.$store.hookCall.beforeColse()), setTimeout(() => {
          var _a2, _b, _c, _d;
          ((_a2 = this.element.$store) == null ? void 0 : _a2.animationId) && (0, t2.VS)((_b = this.element.$store) == null ? void 0 : _b.animationId), e3.type !== t2.Fu.DOM ? (_c = this.extendLoading) == null ? void 0 : _c.getElement().remove() : this.canvas.remove(), ((_d = this.element.$store) == null ? void 0 : _d.hookCall) && this.element.$store.hookCall.colsed();
        }, e3.delayColse);
      }
      init() {
        this.initStyle(), this.draw();
      }
      clearStyle() {
        this.canvas.style.opacity = "0", this.canvas.style.zIndex = "-2001";
      }
      initStyle() {
        let e3 = this.options, i3 = this.element.clientWidth, n3 = this.element.clientHeight, o2 = window.getComputedStyle(this.element), s2 = this.element.style, a2 = this.canvas.style;
        this.element.loadingId = this.loadingId, e3.pointerEvents || (e3.type === t2.Fu.DOM ? this.element.style.pointerEvents = "none" : document.body.style.pointerEvents = "none"), o2.position && "static" !== o2.position || (s2.position = "relative"), this.canvas.id = this.loadingId, document.styleSheets[0].insertRule("\n@keyframes wl_show {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n"), this.canvas.style.animation = `wl_show ${e3.delayColse / 1e3}s linear`, a2.position = "absolute", a2.left = `${e3.pointerEvents ? 0 : this.element.scrollLeft}px`, a2.top = `${e3.pointerEvents ? 0 : this.element.scrollTop}px`, a2.zIndex = e3.zIndex, a2.transition = e3.delayColse / 1e3 + "s", a2.backgroundColor = e3.bgColor, a2.borderRadius = o2.borderRadius, this.canvas.width = i3, this.canvas.height = n3, this.element.append(this.canvas);
      }
      draw() {
        let e3 = this.canvas.offsetWidth, i3 = this.canvas.offsetHeight;
        this.element.$store ? function(e4, i4, n3, s2, a2) {
          try {
            let t3 = null;
            s2.custom ? t3 = new s2.custom(e4, i4, n3, s2, a2.element.$store) : o(958)(`./${s2.model}.ts`).then((t4) => {
              new t4.default(e4, i4, n3, s2, a2.element.$store);
            }), a2.model = t3;
          } catch (e5) {
            t2.JG.error("draw error(" + e5 + ")");
          }
        }(e3, i3, this.canvas, this.options, this.element.$store) : t2.JG.error("WebLoading:canvas or ctx null");
      }
      initStore() {
        this.element.$store = { options: this.options, element: this.element, animationId: void 0, loadingId: this.loadingId, model: null, hookCall: { beforeColse: () => {
        }, colsed: () => {
        } } };
      }
    }
    function a(e3, i3) {
      let n3 = new s(e3, i3);
      return { reload: (i4) => {
        let o2 = Object.assign(n3.options, i4);
        n3.loadingId || (o2.type !== t2.Fu.DOM && (o2 = Object.assign(o2)), n3 = new s(e3, o2));
      }, resize: () => {
        n3.resize();
      }, close: () => {
        n3.close();
      } };
    }
    let r = HTMLElement.prototype, l = window;
    function h(t3, e3) {
      let n3 = Object.assign(e3 || {}, { type: t3 });
      return a(new i2(n3).getElement(), n3);
    }
    r.BaseModel = n2.default, r.loading = function(t3) {
      return a(this, t3);
    }, l.miniLoading = (e3) => h(t2.Fu.MINI, e3), l.loading = (e3) => h(t2.Fu.FULL, e3);
  })();
})();
//# sourceMappingURL=web-loading-test.js.map
