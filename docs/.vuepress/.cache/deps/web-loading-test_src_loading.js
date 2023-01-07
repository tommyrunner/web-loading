import "./chunk-RSJERJUL.js";

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
function isNull(value) {
  return value === void 0 || value === null;
}
function clearAnimationFrame(id) {
  if (!window.requestAnimationFrame) {
    window.clearInterval(id);
  } else {
    window.cancelAnimationFrame(id);
  }
}

// node_modules/web-loading-test/src/draw/model/BaseModel.ts
var BaseModel = class {
  constructor(w, h, canvas, options, store) {
    this.w = w;
    this.h = h;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.options = options;
    this.store = store;
    this.webLog = $Log;
    this.stepClear = 1;
    this._$initPoint();
  }
  initOptions(options, limits8) {
    this.options = Object.assign(options, this.options);
    this.store.options = this.options;
    if (limits8 && limits8.length) {
      limits8.forEach((l) => {
        let mayKey = this.options[l.key];
        if (!isNull(mayKey) && !l.limit(mayKey))
          $Log.warn(l.message);
      });
    }
  }
  _$initPoint() {
    this.clearRect();
    let op = this.options;
    this.ctx.fillStyle = op.themeColor;
    this.ctx.strokeStyle = op.themeColor;
    this.ctx.shadowColor = op.shadowColor;
    this.ctx.font = `${op.fontSize}px ${op.fontFamily}`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.translate(this.w / 2, this.h / 2);
    this.ctx.save();
  }
  clearRect(x, y, w_r, h) {
    if (!isNull(x) && !isNull(y) && !isNull(w_r) && !isNull(h)) {
      this.ctx.clearRect(x, y, w_r, h);
    } else if (!isNull(x) && !isNull(y) && !isNull(w_r) && isNull(h)) {
      let calcWidth = w_r - this.stepClear;
      let calcHeight = Math.sqrt(w_r * w_r - calcWidth * calcWidth);
      let posX = x - calcWidth;
      let posY = y - calcHeight;
      let widthX = 2 * calcWidth;
      let heightY = 2 * calcHeight;
      if (this.stepClear <= w_r) {
        this.ctx.clearRect(posX, posY, widthX, heightY);
        this.stepClear += 1;
        this.clearRect(x, y, w_r);
      } else {
        this.stepClear = 1;
      }
    } else
      this.ctx.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
  }
  drowRadiusRect(x, y, w, h, r) {
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
  }
  run(fun) {
    if (this.store.animationId)
      this.clearAnimationFrame(this.store.animationId);
    this.animationFrame(fun);
  }
  animationFrame(fun) {
    if (!window.requestAnimationFrame) {
      this.store.animationId = window.setInterval(fun, this.options.delay);
    }
    let endTime = Date.now() + this.options.delay;
    fun.call(this);
    const run = () => {
      if (Date.now() > endTime) {
        fun.call(this);
        endTime = Date.now() + this.options.delay;
      }
      this.store.animationId = window.requestAnimationFrame(run);
    };
    this.store.animationId = window.requestAnimationFrame(run);
  }
  clearAnimationFrame(id) {
    clearAnimationFrame(id);
  }
};

// node_modules/web-loading-test/src/draw/model/Gear.ts
var defaultOptions = {
  ...getDefOptions(),
  lineStartSkew: 0,
  lineStart: 10,
  lineEndSkew: 0,
  lineEnd: 16,
  lineWidth: 4,
  lineCap: "round",
  lineNum: 10,
  direction: true
};
var limits = [
  {
    key: "lineNum",
    message: "lineNum value 4-18",
    limit: (key) => {
      return key >= 4 && key <= 18;
    }
  }
];
var Gear = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.initOptions(defaultOptions, limits);
    this.optimization(this.options.textGap + this.options.lineEnd);
    this.initPoint();
    this.aps = Array.from({ length: this.options.lineNum }, (_, _index) => _index);
    this.run(this.draw);
  }
  initPoint() {
    let op = this.options;
    this.ctx.lineCap = op.lineCap;
    this.ctx.lineWidth = op.lineWidth;
    this.ctx.save();
  }
  draw() {
    this.clearRect();
    this.controller();
    this.drawGear();
    this.drawText();
  }
  controller() {
    let op = this.options;
    if (op.direction)
      this.aps = this.aps.map((a) => a - 1 <= 0 ? this.aps.length - 1 : a - 1);
    else
      this.aps = this.aps.map((a) => a + 1 > this.aps.length ? 0 : a + 1);
  }
  drawGear() {
    let op = this.options;
    this.ctx.save();
    this.ctx.shadowOffsetX = op.shadowOffsetX;
    this.ctx.shadowOffsetY = op.shadowOffsetY;
    this.ctx.shadowBlur = op.shadowBlur;
    for (let i = 0; i < this.aps.length; i++) {
      this.ctx.beginPath();
      this.ctx.globalAlpha = this.aps[i] / 10;
      this.ctx.moveTo(op.lineEndSkew, op.lineStart);
      this.ctx.lineTo(op.lineStartSkew, op.lineEnd);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.rotate(2 * Math.PI / op.lineNum);
    }
    this.ctx.restore();
  }
  drawText() {
    let op = this.options;
    this.ctx.save();
    this.ctx.beginPath();
    let y = op.lineEnd + op.fontSize + op.textGap;
    this.ctx.fillText(op.text, 0, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
  optimization(textY) {
    if (this.options.optimization) {
      if (textY * 4 > this.h) {
        this.options.lineStart = this.h / 6 - 5;
        this.options.lineEnd = this.h / 6;
        this.options.textGap = 2;
      }
    }
  }
};

// node_modules/web-loading-test/src/draw/model/Zoom.ts
var defaultOptions2 = {
  ...getDefOptions(),
  zoomGap: 10,
  maxSize: 16,
  zoomNum: 5,
  lineWidth: 10,
  zoomHeight: 2,
  lineCap: "round",
  action: "scale" /* SCALE */,
  direction: true,
  zoomColors: []
};
var limits2 = [{
  key: "lineWidth",
  message: "lineWidth(default:10) <=  maxSize(default:16)",
  limit: (key) => {
    return defaultOptions2.lineWidth <= defaultOptions2.maxSize;
  }
}, {
  key: "maxSize",
  message: "lineWidth(default:10) <=  maxSize(default:16)",
  limit: (key) => {
    return defaultOptions2.lineWidth <= defaultOptions2.maxSize;
  }
}];
var Zoom = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.zoomIndex = defaultOptions2.direction ? 0 : defaultOptions2.zoomNum - 1;
    this.initOptions(defaultOptions2, limits2);
    this.initPoint();
    this.list = Array.from({ length: this.options.zoomNum }, (_, _index) => Object.assign({
      value: defaultOptions2.lineWidth,
      state: 0
    }));
    this.run(this.draw);
  }
  initPoint() {
    let op = this.options;
    this.ctx.lineCap = op.lineCap;
    this.ctx.lineWidth = op.lineWidth;
    this.ctx.translate(
      -(op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2,
      -op.zoomHeight / 2
    );
    this.ctx.save();
  }
  draw() {
    this.clearRect();
    this.drawZoom();
    this.drawText();
    this.controller();
  }
  controller() {
    let op = this.options;
    if (op.direction && this.zoomIndex >= op.zoomNum)
      this.zoomIndex = 0;
    else if (op.direction && this.zoomIndex < 0)
      this.zoomIndex = op.zoomNum - 1;
  }
  drawZoom() {
    let op = this.options;
    for (let i = 0; i < op.zoomNum; i++) {
      if (this.list[i].state === 1)
        this.list[i].value += 2;
      else if (this.list[i].state === 2 && this.list[i].value >= op.lineWidth)
        this.list[i].value--;
      if (op.action === "scale" /* SCALE */)
        this.ctx.lineWidth = this.list[i].value;
      if (i === this.zoomIndex) {
        if (this.list[i].value > op.maxSize) {
          this.list[i].state = 2;
          op.direction ? this.zoomIndex++ : this.zoomIndex - 1 >= 0 ? this.zoomIndex-- : this.zoomIndex = op.zoomNum - 1;
        }
        if (this.list[i].value <= op.lineWidth)
          this.list[i].state = 1;
      }
      this.ctx.beginPath();
      if (op.zoomColors.length > 0 && op.zoomColors[i])
        this.ctx.strokeStyle = op.zoomColors[i];
      else
        this.ctx.strokeStyle = op.themeColor;
      let sH = 0, eH = op.zoomHeight;
      if (op.action === "height" /* HEIGHT */ || op.action === "wave" /* WAVE */) {
        sH = -this.list[i].value;
      }
      if (op.action === "wave" /* WAVE */) {
        eH = -this.list[i].value;
      }
      this.ctx.moveTo((i + 1) * (op.lineWidth + op.zoomGap), sH);
      this.ctx.lineTo((i + 1) * (op.lineWidth + op.zoomGap), eH);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
  drawText() {
    let op = this.options;
    this.ctx.save();
    this.ctx.beginPath();
    let y = op.fontSize + op.maxSize;
    this.ctx.fillText(op.text, (op.lineWidth * (op.zoomNum + 1) + op.zoomGap * (op.zoomNum + 1)) / 2, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
};

// node_modules/web-loading-test/src/draw/model/Ring.ts
var defaultOptions3 = {
  ...getDefOptions(),
  arcGap: Math.PI / 4,
  ringGap: 10,
  lineWidth: 2,
  ringNum: 2,
  radius: 6,
  lineCap: "round",
  turn: 10,
  ringsTurn: [Math.PI, Math.PI / 4],
  direction: true
};
var limits3 = [{
  key: "ringNum",
  message: "ringNum value 1-10",
  limit: (key) => {
    return key >= 1 && key <= 10;
  }
}, {
  key: "ringsTurn",
  message: `ringsTurn size ${defaultOptions3.ringNum}`,
  limit: (key) => {
    return key.length <= defaultOptions3.ringNum;
  }
}];
var Ring = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.rotate = 10;
    this.initOptions(defaultOptions3, limits3);
    this.initPoint();
    this.run(this.draw);
  }
  initPoint() {
    let op = this.options;
    this.ctx.lineCap = op.lineCap;
    this.ctx.lineWidth = op.lineWidth;
    this.ctx.save();
  }
  draw() {
    this.clearRect();
    this.controller();
    this.drawText();
  }
  controller() {
    this.ctx.save();
    let op = this.options;
    let rotate = this.rotate * Math.PI / 180 * (op.direction ? 1 : -1);
    this.ctx.rotate(rotate);
    this.ctx.shadowOffsetX = op.shadowOffsetX;
    this.ctx.shadowOffsetY = op.shadowOffsetY;
    this.ctx.shadowBlur = op.shadowBlur;
    for (let i = 1; i <= op.ringNum; i++) {
      this.drawRing(op.radius + (i - 1) * op.ringGap, op.arcGap, op.ringsTurn && op.ringsTurn.length > 0 ? op.ringsTurn[i - 1] : Math.PI / i);
    }
    this.rotate += op.turn;
    this.ctx.restore();
  }
  drawText() {
    let op = this.options;
    this.ctx.save();
    this.ctx.beginPath();
    let y = op.ringNum * (op.radius + op.ringGap) + op.textGap;
    this.ctx.fillText(op.text, 0, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawRing(r, arcGap = 1, angle = 0) {
    this.ctx.beginPath();
    this.ctx.arc(0, 0, r, arcGap + angle, Math.PI + angle);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(0, 0, r, Math.PI + arcGap + angle, angle);
    this.ctx.stroke();
    this.ctx.closePath();
  }
};

// node_modules/web-loading-test/src/draw/model/Bean.ts
var defaultOptions4 = {
  ...getDefOptions(),
  beanSize: 15,
  pointLength: 15
};
var limits4 = [{
  key: "pointLength",
  message: "pointLength value >= 5",
  limit: (key) => {
    return key >= 5;
  }
}, {
  key: "beanSize",
  message: "beanSize value >= 5",
  limit: (key) => {
    return key >= 5;
  }
}];
var Bean = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.initOptions(defaultOptions4, limits4);
    this.bean = {
      turn: 30,
      state: 1,
      beanState: 1,
      nowX: -(this.options.pointLength * this.options.beanSize) / 2 - this.options.beanSize * 3,
      beans: Array.from({ length: this.options.pointLength }, () => 1),
      beanAnimaIndex: 0
    };
    this.run(this.draw);
  }
  draw() {
    let op = this.options;
    this.clearRect();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(this.bean.nowX, 0);
    this.ctx.arc(0, 0, op.beanSize, (360 - this.bean.turn) * Math.PI / 180, this.bean.turn * Math.PI / 180, true);
    this.ctx.lineTo(0, 0);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
    this.drawPoint();
    this.drawFillter();
    this.drawText();
    this.controller();
  }
  controller() {
    let op = this.options;
    if (this.bean.nowX >= op.pointLength * op.beanSize / 2 + op.beanSize * 2) {
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
      this.bean.turn -= 8;
    if (this.bean.state === 2)
      this.bean.turn += 8;
    if (this.bean.beanState === 1)
      this.bean.nowX -= op.beanSize / 3;
    if (this.bean.beanState === 2)
      this.bean.nowX += op.beanSize / 3;
  }
  drawPoint() {
    let op = this.options;
    this.ctx.save();
    this.setShadow();
    this.ctx.translate(-(op.pointLength * op.beanSize) / 2, 0);
    for (let i = 0; i < op.pointLength && i < this.bean.beanAnimaIndex; i++) {
      this.ctx.beginPath();
      if (i < this.bean.beanAnimaIndex)
        this.ctx.arc(op.beanSize * i, 0, op.beanSize / 4, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.closePath();
    }
    this.bean.beanAnimaIndex++;
    this.ctx.restore();
  }
  drawFillter() {
    let op = this.options;
    this.clearRect(-op.beanSize / 3 + this.bean.nowX, -op.beanSize / 2, op.beanSize / 4);
    this.clearRect(-(op.pointLength * op.beanSize) / 2 - op.beanSize / 2, -this.h, this.bean.nowX + op.pointLength * op.beanSize / 2 - op.beanSize / 2, this.h * 2);
    this.clearRect(-(op.pointLength * op.beanSize) / 2, -this.h, -180, this.h * 2);
    this.clearRect(op.pointLength * op.beanSize / 2, -this.h, 180, this.h * 2);
  }
  setShadow() {
    let op = this.options;
    this.ctx.shadowOffsetX = op.shadowOffsetX;
    this.ctx.shadowOffsetY = op.shadowOffsetY;
    this.ctx.shadowBlur = op.shadowBlur;
  }
  drawText() {
    let op = this.options;
    this.ctx.save();
    this.ctx.beginPath();
    let y = op.fontSize + op.textGap + op.beanSize;
    this.ctx.fillText(op.text, 0, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
};

// node_modules/web-loading-test/src/draw/model/Clock.ts
var defaultOptions5 = {
  ...getDefOptions(),
  lineCap: "round",
  lineWidth: 2,
  lineColors: ["#d4d4d4", "#06ab2d", "#8a0303"],
  clockSize: 15,
  clockGap: 4,
  hLine: true,
  mLine: false,
  sLine: true,
  textTime: ""
};
var limits5 = [{
  key: "lineColors",
  message: "lineColors.length <= 3",
  limit: (key) => {
    return key.length <= 3;
  }
}];
var Clock = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.initOptions(defaultOptions5, limits5);
    this.initPoint();
    this.nowTime = -1;
    this.nowS = 0;
    this.run(this.draw);
  }
  initPoint() {
    let op = this.options;
    this.ctx.lineCap = op.lineCap;
    this.ctx.lineWidth = op.lineWidth;
    this.ctx.save();
  }
  draw() {
    this.clearRect();
    this.drawClock();
  }
  drawText(h, m, s) {
    let op = this.options;
    this.ctx.save();
    this.ctx.beginPath();
    let y = op.clockSize * 2 + op.textGap;
    if (op.textTime === "time")
      op.text = `${h} : ${m} : ${s}`;
    if (op.textTime === "s")
      op.text = this.nowTime + "s";
    this.ctx.fillText(op.text, 0, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawClock() {
    let op = this.options;
    let s = new Date().getSeconds();
    let m = new Date().getMinutes();
    let h = new Date().getHours();
    this.ctx.save();
    this.ctx.beginPath();
    this.setShadow();
    this.ctx.moveTo(-5, -(op.clockSize + op.clockGap));
    this.ctx.lineTo(5, -(op.clockSize + op.clockGap));
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.setShadow();
    this.ctx.arc(0, 0, op.clockSize, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
    this.ctx.save();
    for (let i = 0; i < 12; i++) {
      this.ctx.beginPath();
      this.ctx.rotate(360 / 12 * Math.PI / 180);
      this.ctx.moveTo(op.clockSize - op.clockGap, 0);
      this.ctx.lineTo(op.clockSize - op.clockGap, 0);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    this.ctx.restore();
    if (op.hLine) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.lineWidth = op.lineWidth * 1.6;
      if (op.lineColors[0])
        this.ctx.strokeStyle = op.lineColors[0];
      this.ctx.rotate(-90 * Math.PI / 180);
      this.ctx.rotate(h * 360 / 60 * Math.PI / 180);
      this.ctx.moveTo(-1, 0);
      this.ctx.lineTo(op.clockSize / 2, 0);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }
    if (op.mLine) {
      this.ctx.save();
      this.ctx.beginPath();
      if (op.lineColors[1])
        this.ctx.strokeStyle = op.lineColors[1];
      this.ctx.lineWidth = op.lineWidth * 1.2;
      this.ctx.rotate(-90 * Math.PI / 180);
      this.ctx.rotate(m * 360 / 60 * Math.PI / 180);
      this.ctx.moveTo(-1, 0);
      this.ctx.lineTo(op.clockSize / 2 + op.clockGap, 0);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }
    if (op.sLine) {
      this.ctx.save();
      this.ctx.beginPath();
      if (op.lineColors[2])
        this.ctx.strokeStyle = op.lineColors[2];
      this.ctx.rotate(-90 * Math.PI / 180);
      this.ctx.rotate(s * 360 / 60 * Math.PI / 180);
      this.ctx.moveTo(-1, 0);
      this.ctx.lineTo(op.clockSize - op.clockGap, 0);
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
      if (this.nowS !== s)
        this.nowTime++;
      this.nowS = s;
    }
    this.drawText(h, m, s);
  }
  setShadow() {
    let op = this.options;
    this.ctx.shadowOffsetX = op.shadowOffsetX;
    this.ctx.shadowOffsetY = op.shadowOffsetY;
    this.ctx.shadowBlur = op.shadowBlur;
  }
};

// node_modules/web-loading-test/src/draw/model/Pattern.ts
var defaultOptions6 = {
  ...getDefOptions(),
  charts: ["arc" /* ARC */, "rect" /* RECT */, "triangle" /* TRIANGLE */, "heart" /* HEART */, "polygon" /* POLYGON */],
  chartColors: ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C", "#0960bd"],
  maxHeight: 60,
  chartSize: 12
};
var limits6 = [{
  key: "chartSize",
  message: "chartSize value 5-24",
  limit: (key) => {
    return key >= 5 && key <= 24;
  }
}, {
  key: "delay",
  message: "Pattern.delay not allowed update",
  limit: (key) => {
    return key === getDefOptions().delay;
  }
}];
var Pattern = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.initOptions(defaultOptions6, limits6);
    this.initPoint();
    this.pattern = { color: getDefOptions().themeColor, nowHeight: 10, chart: "rect" /* RECT */, shadow: 0, nowSatate: 1, turn: 0 };
    this.run(this.draw);
  }
  initPoint() {
    this.options.delay = 10;
  }
  draw() {
    let op = this.options;
    this.clearRect();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(0, this.pattern.nowHeight);
    this.ctx.rotate(this.pattern.turn / Math.PI * 2);
    this.ctx.fillStyle = this.pattern.color;
    this.selectChart(0, 0, op.chartSize);
    this.ctx.closePath();
    this.ctx.restore();
    this.drawShadow();
    this.clearRect(-this.w, 0, this.w * 2, this.h);
    this.controller(op);
    this.drawText(op);
  }
  controller(op) {
    this.pattern.turn += 10;
    if (this.pattern.nowSatate === 1) {
      this.pattern.nowHeight--;
      this.pattern.shadow += 0.2;
    } else if (this.pattern.nowSatate === 2) {
      this.pattern.nowHeight++;
      this.pattern.shadow -= 0.2;
    }
    if (this.pattern.nowHeight <= -op.chartSize && this.pattern.nowHeight % 8 == 0) {
      op.delay++;
    }
    if (this.pattern.nowHeight <= -op.maxHeight) {
      this.pattern.nowSatate = 2;
    } else if (this.pattern.nowHeight >= op.chartSize) {
      this.pattern.nowSatate = 1;
      op.delay = 10;
      this.pattern.chart = op.charts[parseInt(String(Math.random() * op.charts.length))];
      this.pattern.color = op.chartColors[parseInt(String(Math.random() * op.chartColors.length))];
    }
  }
  selectChart(x, y, size) {
    switch (this.pattern.chart) {
      case "rect" /* RECT */:
        this.drawRect(x, y, size);
        break;
      case "arc" /* ARC */:
        this.drawArc(x, y, size);
        break;
      case "triangle" /* TRIANGLE */:
        this.drawTriangle(x, y, size);
        break;
      case "heart" /* HEART */:
        this.drawHeart(x, y, size);
        break;
      case "polygon" /* POLYGON */:
        this.drawPolygon(x, y, size);
        break;
    }
  }
  drawText(op) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.pattern.color;
    let y = op.fontSize + op.textGap;
    this.ctx.fillText(op.text, 0, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawShadow() {
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
  }
  drawRect(x, y, size) {
    this.ctx.save();
    this.ctx.beginPath();
    this.setShadow();
    this.ctx.translate(-size / 2, -size / 2);
    this.ctx.fillRect(x, y, size, size);
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawArc(x, y, size) {
    this.ctx.save();
    this.ctx.beginPath();
    this.setShadow();
    this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawTriangle(x, y, size) {
    this.ctx.save();
    this.ctx.beginPath();
    this.setShadow();
    this.ctx.translate(-size / 2, -(size / 2 * Math.sqrt(3)) / 2);
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(size, 0);
    this.ctx.lineTo(size / 2, size / 2 * Math.sqrt(3));
    this.ctx.lineTo(x, y);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawHeart(x, y, size) {
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
  }
  drawPolygon(x, y, size) {
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
  }
  setShadow() {
    let op = this.options;
    this.ctx.shadowOffsetX = op.shadowOffsetX;
    this.ctx.shadowOffsetY = op.shadowOffsetY;
    this.ctx.shadowBlur = op.shadowBlur;
  }
};

// node_modules/web-loading-test/src/draw/model/Roll.ts
var defaultOptions7 = {
  ...getDefOptions(),
  rollGap: 12,
  childNum: 4,
  rollSize: 16,
  showChild: true,
  chart: "Wheel" /* WHEEL */,
  windmills: ["#1ab3ea", "#de6834", "#30925d", "#f48ea5"],
  windmillPointColor: "#f2c31f",
  fixad: false
};
var limits7 = [{
  key: "childNum",
  message: "chartSize value 4-10",
  limit: (key) => {
    return key >= 4 && key <= 10;
  }
}, {
  key: "delay",
  message: "Roll.delay not allowed update",
  limit: (key) => {
    return key === getDefOptions().delay;
  }
}];
var Roll = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.initOptions(defaultOptions7, limits7);
    this.Roll = {
      turn: 1,
      nowX: this.options.fixad ? 0 : this.options.childNum / 2 * (this.options.rollSize + this.options.rollGap) + this.options.rollGap / 2,
      state: 2,
      child: []
    };
    this.run(this.draw);
  }
  draw() {
    this.clearRect();
    this.drawGround();
    this.drawChild();
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.translate(-this.Roll.nowX, 0);
    this.ctx.rotate(this.Roll.turn * Math.PI / 180);
    this.selectChart();
    this.controller();
    this.ctx.restore();
    this.drawText();
  }
  selectChart() {
    let op = this.options;
    switch (op.chart) {
      case "rect" /* RECT */:
        this.drawRect();
        break;
      case "Wheel" /* WHEEL */:
        this.drawWheel();
        break;
      case "Windmill" /* WINDMILL */:
        this.drawWindmill();
        break;
    }
  }
  controller() {
    let op = this.options;
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
    if (this.Roll.nowX >= op.childNum / 2 * (op.rollSize + op.rollGap) + op.rollGap / 2)
      this.Roll.state = 2;
    if (this.Roll.state === 1)
      this.Roll.nowX++;
    if (this.Roll.state === 2)
      this.Roll.nowX--;
    let child = this.Roll.child;
    if (this.Roll.nowX % (op.rollSize + op.rollGap) == 0 && this.Roll.state === 2) {
      child.push({ turn: this.Roll.turn, x: this.Roll.nowX });
    }
    if (this.Roll.state === 1 && child[child.length - 1] && child[child.length - 1].x === this.Roll.nowX) {
      this.Roll.child.pop();
    }
  }
  drawRect() {
    let op = this.options;
    this.ctx.save();
    this.setShadow();
    this.ctx.translate(-op.rollSize / 2, -op.rollSize / 2);
    this.ctx.fillRect(0, 0, op.rollSize, op.rollSize);
    this.ctx.restore();
  }
  drawWheel() {
    let op = this.options;
    this.ctx.save();
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, op.rollSize / 6, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();
    this.ctx.arc(0, 0, op.rollSize, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.closePath();
    for (let i = 0; i < 6; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, op.rollSize / 2);
      this.ctx.lineTo(0, op.rollSize);
      this.ctx.stroke();
      this.ctx.rotate(360 / 6 * Math.PI / 180);
      this.ctx.closePath();
    }
    this.ctx.restore();
  }
  drawWindmill() {
    let op = this.options;
    this.ctx.save();
    for (let i = 0; i < op.windmills.length; i++) {
      this.ctx.beginPath();
      this.ctx.fillStyle = op.windmills[i];
      this.ctx.arc(-op.rollSize / 2, 0, op.rollSize, 0, Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.rotate(360 / 4 * Math.PI / 180);
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = op.windmillPointColor;
    this.ctx.arc(0, 0, op.rollSize / 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }
  drawChild() {
    let op = this.options;
    if (!op.showChild)
      return;
    this.Roll.child.forEach((c, index) => {
      this.ctx.save();
      this.ctx.translate(-c.x, 0);
      this.ctx.globalAlpha = (index + 1) / 10;
      this.ctx.rotate(c.turn * Math.PI / 180);
      this.selectChart();
      this.ctx.restore();
    });
  }
  drawGround() {
    let op = this.options;
    if (op.chart !== "Wheel" /* WHEEL */)
      return;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.lineWidth = 3;
    this.ctx.globalAlpha = 0.03;
    this.ctx.moveTo(-(op.childNum / 2) * (op.rollSize + op.rollGap / 1.6), op.rollSize + 3);
    this.ctx.lineTo(op.childNum / 2 * (op.rollSize + op.rollGap) + op.rollGap / 2, op.rollSize + 3);
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();
  }
  drawText() {
    let op = this.options;
    this.ctx.save();
    this.ctx.beginPath();
    let y = op.fontSize + op.textGap + op.rollSize;
    this.ctx.fillText(op.text, 0, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
  setShadow() {
    let op = this.options;
    this.ctx.shadowOffsetX = op.shadowOffsetX;
    this.ctx.shadowOffsetY = op.shadowOffsetY;
    this.ctx.shadowBlur = op.shadowBlur;
  }
};

// node_modules/web-loading-test/src/draw/model/Img.ts
var defaultOptions8 = {
  ...getDefOptions(),
  src: "",
  width: 52,
  height: 52,
  turn: false
};
var Img = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.initOptions(defaultOptions8, []);
    this.img = new Image();
    this.img.src = this.options.src;
    this.turn = 10;
    this.img.onload = () => {
      this.run(this.draw);
    };
  }
  draw() {
    this.clearRect();
    this.drawImg();
    this.drawText();
  }
  drawImg() {
    let op = this.options;
    this.ctx.save();
    if (op.turn)
      this.ctx.rotate(this.turn * Math.PI / 180);
    this.ctx.drawImage(this.img, -op.width / 2, -op.height / 2, op.width, op.height);
    this.ctx.closePath();
    this.ctx.restore();
    this.turn += 10;
  }
  drawText() {
    let op = this.options;
    this.ctx.save();
    this.ctx.beginPath();
    let y = op.fontSize + op.textGap + op.height / 2;
    this.ctx.fillText(op.text, 0, y);
    this.ctx.closePath();
    this.ctx.restore();
  }
};

// node_modules/web-loading-test/src/draw/model/Skeleton.ts
var defaultOptions9 = {
  ...getDefOptions(),
  skeletonColor: "rgb(240, 240, 240)",
  skeletonAnimationColor: "rgb(226, 226, 226)",
  radius: 5,
  animation: true,
  skeletonMax: true,
  deep: true,
  appoint: "wl-show"
};
var Skeleton = class extends BaseModel {
  constructor(w, h, canvas, options, store) {
    super(w, h, canvas, options, store);
    this.initOptions(defaultOptions9, []);
    this.skeleton = [];
    this.colorFlow = 0;
    this.state = 1;
    this.WL_IMG = "wl-img";
    this.initPoint();
    this.controller(this.store.element.children);
    this.run(this.draw);
    console.dir(store.element);
  }
  initPoint() {
    let op = this.options;
    this.ctx.translate(-this.w / 2, -this.h / 2);
    this.canvas.width = this.store.element.scrollWidth;
    this.canvas.height = this.store.element.scrollHeight;
    this.ctx.fillStyle = op.skeletonColor;
  }
  draw() {
    this.clearRect();
    this.drawSkeleton();
  }
  controller(els) {
    let op = this.options;
    for (let e of Array.from(els)) {
      if (this.store.loadingId === e.id)
        continue;
      if (op.appoint.length > 0 && e.getAttribute(op.appoint) === null)
        continue;
      if (op.deep) {
        if (e.children.length <= 0) {
          this.skeleton.push({ title: e.nodeName, element: e });
        } else
          this.controller(e.children);
      } else {
        this.skeleton.push({ title: e.nodeName, element: e });
      }
    }
  }
  drawSkeleton() {
    let op = this.options;
    let linearGradient = this.ctx.createLinearGradient(0, 0, this.w, this.h);
    linearGradient.addColorStop(0, op.skeletonColor);
    linearGradient.addColorStop(this.colorFlow, op.skeletonAnimationColor);
    linearGradient.addColorStop(1, op.skeletonColor);
    if (op.animation)
      this.ctx.fillStyle = linearGradient;
    this.skeleton.forEach((s) => {
      let el = s.element;
      this.drowRadiusRect(el.offsetLeft, el.offsetTop, el.offsetWidth, el.offsetHeight, op.radius);
      this.ctx.fill();
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
  }
};

// node_modules/web-loading-test/src/draw/model/index.ts
var model_default = { Gear, Zoom, Ring, Bean, Clock, Pattern, Roll, Img, Skeleton };

// node_modules/web-loading-test/src/draw/index.ts
function drawController(w, h, canvas, options, store) {
  try {
    let model = null;
    if (!options.custom)
      model = new model_default[options.model](w, h, canvas, options, store.element.$store);
    else
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
