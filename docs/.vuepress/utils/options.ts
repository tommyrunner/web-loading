import type { OptionsType } from './types'
import { MODEL_TYPES, LOADING_TYPES } from 'web-loading/src/utils'
import { ZOOM_ACTION, OPTIONS_TYPE, OPTIONS_FORM, CANVAS_LINE_CAP, PATTERN_CHART } from './enum'

export default [
  {
    title: '启动方式',
    key: 'type',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.GG,
    value: LOADING_TYPES.DOM,
    items: LOADING_TYPES
  },
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
    max: 10000
  },
  {
    title: '层级',
    key: 'zIndex',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.GG,
    value: '19'
  },
  {
    title: '主题色',
    key: 'themeColor',
    type: OPTIONS_TYPE.COLOR,
    form: OPTIONS_FORM.GG,
    value: 'rgba(64,158,255,1)'
  },
  {
    title: '背景色',
    key: 'bgColor',
    type: OPTIONS_TYPE.COLOR,
    form: OPTIONS_FORM.GG,
    value: 'rgba(0, 0, 0, 0.8)'
  },
  {
    title: '阴影色',
    key: 'shadowColor',
    type: OPTIONS_TYPE.COLOR,
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
  {
    title: '优化处理',
    key: 'optimization',
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
    title: '空隙',
    key: 'arcGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: Math.PI / 4,
    min: 0.1,
    max: 3.6,
    step: 0.1
  },
  {
    model: MODEL_TYPES.RING,
    title: '弧线空隙',
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
  {
    model: MODEL_TYPES.RING,
    title: '多环初始角度',
    key: 'ringsTurn',
    type: OPTIONS_TYPE.ARRAY_NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: [Math.PI, Math.PI / 4],
    arrayAdd: {
      title: '环',
      key: 0,
      value: Math.PI,
      type: OPTIONS_TYPE.NUMBER,
      step: 0.1,
      min: 0.1,
      max: 3.6
    },
    arrayItems: [
      {
        title: '环1',
        key: 0,
        value: Math.PI,
        type: OPTIONS_TYPE.NUMBER,
        step: 0.1,
        min: 0.1,
        max: 3.6
      },
      {
        title: '环2',
        key: 1,
        value: Math.PI / 4,
        type: OPTIONS_TYPE.NUMBER,
        step: 0.1,
        min: 0.1,
        max: 3.6
      }
    ]
  },
  {
    model: MODEL_TYPES.RING,
    title: '旋转方向',
    key: 'direction',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  // ZOOM
  {
    model: MODEL_TYPES.ZOOM,
    title: '变化最大',
    key: 'maxSize',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 16,
    min: 10,
    max: 36
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: '距离',
    key: 'zoomGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 10,
    min: 5,
    max: 40
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: '高度',
    key: 'zoomHeight',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 2,
    min: 1,
    max: 10
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: 'zoom数量',
    key: 'zoomNum',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 5,
    min: 3,
    max: 10
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: '自定义颜色',
    key: 'zoomColors',
    type: OPTIONS_TYPE.ARRAY_STRING,
    form: OPTIONS_FORM.MODEL,
    value: ['rgba(64,158,255,1)'],
    arrayAdd: {
      title: 'zoom',
      key: 0,
      value: 'rgba(64,158,255,1)',
      type: OPTIONS_TYPE.COLOR
    },
    arrayItems: [
      {
        title: 'zoom1',
        key: 0,
        value: 'rgba(64,158,255,1)',
        type: OPTIONS_TYPE.COLOR
      }
    ]
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: '线的样式',
    key: 'lineCap',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: CANVAS_LINE_CAP.round,
    items: CANVAS_LINE_CAP
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: '宽度(大小)',
    key: 'lineWidth',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 10,
    min: 1,
    max: 20
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: '动作',
    key: 'action',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: ZOOM_ACTION.SCALE,
    items: ZOOM_ACTION
  },
  {
    model: MODEL_TYPES.ZOOM,
    title: '旋转方向',
    key: 'direction',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  // PATTERN
  {
    model: MODEL_TYPES.PATTERN,
    title: '支持的图形',
    key: 'charts',
    type: OPTIONS_TYPE.ARRAY_STRING,
    form: OPTIONS_FORM.MODEL,
    value: [PATTERN_CHART.ARC, PATTERN_CHART.RECT, PATTERN_CHART.TRIANGLE, PATTERN_CHART.HEART, PATTERN_CHART.POLYGON],
    arrayItems: [
      {
        title: '图形1',
        key: 0,
        value: PATTERN_CHART.ARC,
        type: OPTIONS_TYPE.STRING,
        disabled: true
      },
      {
        title: '图形2',
        key: 1,
        value: PATTERN_CHART.RECT,
        type: OPTIONS_TYPE.STRING,
        disabled: true
      },
      {
        title: '图形3',
        key: 2,
        value: PATTERN_CHART.TRIANGLE,
        type: OPTIONS_TYPE.STRING,
        disabled: true
      },
      {
        title: '图形4',
        key: 3,
        value: PATTERN_CHART.HEART,
        type: OPTIONS_TYPE.STRING,
        disabled: true
      },
      {
        title: '图形5',
        key: 4,
        value: PATTERN_CHART.POLYGON,
        type: OPTIONS_TYPE.STRING,
        disabled: true
      }
    ]
  },
  {
    model: MODEL_TYPES.PATTERN,
    title: '动态颜色',
    key: 'chartColors',
    type: OPTIONS_TYPE.ARRAY_STRING,
    form: OPTIONS_FORM.MODEL,
    value: ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#0960bd'],
    arrayAdd: {
      title: '图形颜色',
      key: 0,
      value: '#409EFF',
      type: OPTIONS_TYPE.COLOR
    },
    arrayItems: [
      {
        title: '图形颜色1',
        key: 0,
        value: '#409EFF',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '图形颜色2',
        key: 1,
        value: '#67C23A',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '图形颜色3',
        key: 2,
        value: '#E6A23C',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '图形颜色4',
        key: 3,
        value: '#F56C6C',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '图形颜色5',
        key: 4,
        value: '#0960bd',
        type: OPTIONS_TYPE.COLOR
      }
    ]
  },
  {
    model: MODEL_TYPES.PATTERN,
    title: '图形大小',
    key: 'chartSize',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 12,
    min: 5,
    max: 24
  },
  {
    model: MODEL_TYPES.PATTERN,
    title: '高度',
    key: 'maxHeight',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 60,
    min: 50,
    max: 80
  }
] as Array<OptionsType>
