import type { OptionsType } from './types'
import { MODEL_TYPES } from 'web-loading/src/utils'
export enum OPTIONS_FORM {
  GG = 'gg',
  MODEL = 'model'
}
export enum OPTIONS_TYPE {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select'
}
export enum CANVAS_LINE_CAP {
  butt,
  round,
  square
}
export default [
  {
    title: '模块',
    key: 'model',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.GG,
    value: MODEL_TYPES.GEAR,
    items: MODEL_TYPES
  },
  {
    title: '字体内容',
    key: 'text',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.GG,
    value: '加载中...'
  },
  {
    title: '字体间距',
    key: 'textGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 8,
    min: 2,
    max: 20
  },
  {
    title: '字体大小',
    key: 'fontSize',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 12,
    min: 2,
    max: 20
  },
  {
    title: '字体类型',
    key: 'fontFamily',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.GG,
    value: 'Microsoft YaHei'
  },
  {
    title: '动画延迟',
    key: 'delay',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 65,
    min: 65,
    max: 1000
  },
  {
    title: '关闭动画延迟',
    key: 'delayColse',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 520,
    min: 65,
    max: 1000
  },
  {
    title: '优化处理',
    key: 'optimization',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.GG,
    value: false
  },
  {
    title: '层级',
    key: 'zIndex',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.GG,
    value: '2001'
  },
  {
    title: '主题色',
    key: 'themeColor',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.GG,
    value: 'rgba(64,158,255,1)'
  },
  {
    title: '背景色',
    key: 'bgColor',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.GG,
    value: 'rgba(0, 0, 0, 0.8)'
  },
  {
    title: '阴影色',
    key: 'shadowColor',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.GG,
    value: 'rgba(64,158,255,0.6)'
  },
  {
    title: '阴影X',
    key: 'shadowOffsetX',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 2,
    min: 0,
    max: 60
  },
  {
    title: '阴影Y',
    key: 'shadowOffsetY',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 2,
    min: 0,
    max: 60
  },
  {
    title: '阴影范围',
    key: 'shadowBlur',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 5,
    min: 0,
    max: 60
  },
  {
    title: '事件穿透',
    key: 'pointerEvents',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.GG,
    value: false
  },
  // GEAR
  {
    model: MODEL_TYPES.GEAR,
    title: '线端',
    key: 'lineStart',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 10,
    min: 1,
    max: 20
  },
  {
    model: MODEL_TYPES.GEAR,
    title: '线末',
    key: 'lineEnd',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 16,
    min: 1,
    max: 20
  },
  {
    model: MODEL_TYPES.GEAR,
    title: '线端偏移度',
    key: 'lineStartSkew',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 0,
    min: 0,
    max: 20
  },
  {
    model: MODEL_TYPES.GEAR,
    title: '线末偏移度',
    key: 'lineEndSkew',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 0,
    min: 0,
    max: 20
  },
  {
    model: MODEL_TYPES.GEAR,
    title: '线宽度',
    key: 'lineWidth',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 4,
    min: 1,
    max: 20
  },
  {
    model: MODEL_TYPES.GEAR,
    title: '线的样式',
    key: 'lineCap',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: CANVAS_LINE_CAP.round,
    items: CANVAS_LINE_CAP
  },
  {
    model: MODEL_TYPES.GEAR,
    title: '线数量',
    key: 'lineNum',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 10,
    min: 4,
    max: 8
  },
  {
    model: MODEL_TYPES.GEAR,
    title: '旋转方向',
    key: 'direction',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  // RING
  {
    model: MODEL_TYPES.RING,
    title: '环与环空隙',
    key: 'arcGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: Math.PI / 4
  },
  {
    model: MODEL_TYPES.RING,
    title: '弧线间隔',
    key: 'ringGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 10,
    min: 1,
    max: 20
  },
  {
    model: MODEL_TYPES.RING,
    title: '线宽度',
    key: 'lineWidth',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 2,
    min: 1,
    max: 20
  },
  {
    model: MODEL_TYPES.RING,
    title: '环数量',
    key: 'ringNum',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 2,
    min: 1,
    max: 10
  },
  {
    model: MODEL_TYPES.RING,
    title: '环半径',
    key: 'radius',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 6,
    min: 1,
    max: 20
  },
  {
    model: MODEL_TYPES.RING,
    title: '线的样式',
    key: 'lineCap',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: CANVAS_LINE_CAP.round,
    items: CANVAS_LINE_CAP
  },
  {
    model: MODEL_TYPES.RING,
    title: '旋转角度',
    key: 'turn',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 10,
    min: 1,
    max: 20
  },
  // {
  //   model: MODEL_TYPES.RING,
  //   title: '多环初始角度',
  //   key: 'ringsTurn',
  //   type: OPTIONS_TYPE.NUMBER,
  //   form: OPTIONS_FORM.MODEL,
  //   value: 10,
  //   min: 1,
  //   max: 20
  // }
  {
    model: MODEL_TYPES.RING,
    title: '旋转方向',
    key: 'direction',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  }
] as Array<OptionsType>
