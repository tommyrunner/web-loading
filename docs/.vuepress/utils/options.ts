import type { OptionsType } from './types'
import { MODEL_TYPES, LOADING_TYPES } from './enum'
import {
  ZOOM_ACTION,
  OPTIONS_TYPE,
  OPTIONS_FORM,
  CANVAS_LINE_CAP,
  PATTERN_CHART,
  CLOCK_TEXT,
  ROLL_CHART,
  CIRCULAR_ACTION
} from './enum'

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
    min: 1,
    max: 500
  },
  {
    title: '进入/关闭 动画延迟',
    key: 'delayInto',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 320,
    min: 65,
    max: 10000
  },
  {
    title: '无感刷新',
    key: 'notFeel',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.GG,
    value: 0,
    min: 0,
    max: 5000
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
    value: [],
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
  },
  // CLOCK
  {
    model: MODEL_TYPES.CLOCK,
    title: '文字显示模式',
    key: 'textTime',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: '',
    items: CLOCK_TEXT
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: '指针颜色',
    key: 'lineColors',
    type: OPTIONS_TYPE.ARRAY_STRING,
    form: OPTIONS_FORM.MODEL,
    value: ['#d4d4d4', '#06ab2d', '#8a0303'],
    arrayAdd: {
      title: '指针颜色',
      key: 0,
      value: '#409EFF',
      type: OPTIONS_TYPE.COLOR
    },
    arrayItems: [
      {
        title: '指针颜色1',
        key: 0,
        value: '#d4d4d4',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '指针颜色2',
        key: 1,
        value: '#06ab2d',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '指针颜色3',
        key: 2,
        value: '#8a0303',
        type: OPTIONS_TYPE.COLOR
      }
    ]
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: '线的样式',
    key: 'lineCap',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: CANVAS_LINE_CAP.round,
    items: CANVAS_LINE_CAP
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: '线宽度',
    key: 'lineWidth',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 2,
    min: 1,
    max: 12
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: 'clock大小',
    key: 'clockSize',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 15,
    min: 10,
    max: 40
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: 'clock空隙',
    key: 'clockGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 4,
    min: 2,
    max: 16
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: '时指',
    key: 'hLine',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: '分指',
    key: 'mLine',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: false
  },
  {
    model: MODEL_TYPES.CLOCK,
    title: '秒指',
    key: 'sLine',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  // ROLL
  {
    model: MODEL_TYPES.BEAN,
    title: 'bean的大小',
    key: 'beanSize',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 15,
    min: 5,
    max: 26
  },
  {
    model: MODEL_TYPES.BEAN,
    title: 'point数量',
    key: 'pointLength',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 16,
    min: 5,
    max: 26
  },
  // ROLL
  {
    model: MODEL_TYPES.ROLL,
    title: 'roll大小',
    key: 'rollSize',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 16,
    min: 6,
    max: 36
  },
  {
    model: MODEL_TYPES.ROLL,
    title: '显示影子',
    key: 'showChild',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  {
    model: MODEL_TYPES.ROLL,
    title: '影子数量',
    key: 'childNum',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 4,
    min: 0,
    max: 10
  },
  {
    model: MODEL_TYPES.ROLL,
    title: '影子空隙',
    key: 'rollGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 12,
    min: 4,
    max: 26
  },
  {
    model: MODEL_TYPES.ROLL,
    title: '显示的图形',
    key: 'chart',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: ROLL_CHART.WHEEL,
    items: ROLL_CHART
  },
  {
    model: MODEL_TYPES.ROLL,
    title: 'Windmills的叶片颜色',
    key: 'windmills',
    type: OPTIONS_TYPE.ARRAY_STRING,
    form: OPTIONS_FORM.MODEL,
    value: ['#1ab3ea', '#de6834', '#30925d', '#f48ea5'],
    arrayAdd: {
      title: '叶片颜色',
      key: 0,
      value: '#409EFF',
      type: OPTIONS_TYPE.COLOR
    },
    arrayItems: [
      {
        title: '叶片颜色1',
        key: 0,
        value: '#1ab3ea',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '叶片颜色2',
        key: 1,
        value: '#de6834',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '叶片颜色3',
        key: 2,
        value: '#30925d',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '叶片颜色3',
        key: 3,
        value: '#f48ea5',
        type: OPTIONS_TYPE.COLOR
      }
    ]
  },
  {
    model: MODEL_TYPES.ROLL,
    title: 'Windmills中间点颜色',
    key: 'windmillPointColor',
    type: OPTIONS_TYPE.COLOR,
    form: OPTIONS_FORM.MODEL,
    value: '#f2c31f'
  },
  {
    model: MODEL_TYPES.ROLL,
    title: '固定',
    key: 'fixad',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: false
  },
  // Circular
  {
    model: MODEL_TYPES.Circular,
    title: 'arc大小',
    key: 'arcSize',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 8,
    min: 5,
    max: 26
  },
  {
    model: MODEL_TYPES.Circular,
    title: 'arc空隙',
    key: 'arcGap',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 2,
    min: 0,
    max: 20
  },
  {
    model: MODEL_TYPES.Circular,
    title: '颜色',
    key: 'arcColors',
    type: OPTIONS_TYPE.ARRAY_STRING,
    form: OPTIONS_FORM.MODEL,
    value: ['#ec7546', '#8364a4', '#ff6c6e', '#5bc6ab'],
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
        value: '#ec7546',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '图形颜色2',
        key: 1,
        value: '#8364a4',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '图形颜色3',
        key: 2,
        value: '#ff6c6e',
        type: OPTIONS_TYPE.COLOR
      },
      {
        title: '图形颜色4',
        key: 3,
        value: '#5bc6ab',
        type: OPTIONS_TYPE.COLOR
      }
    ]
  },
  {
    model: MODEL_TYPES.Circular,
    title: '动作',
    key: 'action',
    type: OPTIONS_TYPE.SELECT,
    form: OPTIONS_FORM.MODEL,
    value: CIRCULAR_ACTION.COLLISION,
    items: CIRCULAR_ACTION
  },
  // IMG
  {
    model: MODEL_TYPES.IMG,
    title: '图片链接',
    key: 'src',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.MODEL,
    value:
      'data:image/png;base64,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'
  },
  {
    model: MODEL_TYPES.IMG,
    title: '宽度',
    key: 'width',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 52,
    min: 10,
    max: 100
  },
  {
    model: MODEL_TYPES.IMG,
    title: '高度',
    key: 'height',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 52,
    min: 10,
    max: 100
  },
  {
    model: MODEL_TYPES.IMG,
    title: '旋转',
    key: 'turn',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  // SKELETON
  {
    model: MODEL_TYPES.SKELETON,
    title: '默认颜色',
    key: 'skeletonColor',
    type: OPTIONS_TYPE.COLOR,
    form: OPTIONS_FORM.MODEL,
    value: 'rgb(240, 240, 240)'
  },
  {
    model: MODEL_TYPES.SKELETON,
    title: '动画颜色',
    key: 'skeletonAnimationColor',
    type: OPTIONS_TYPE.COLOR,
    form: OPTIONS_FORM.MODEL,
    value: 'rgb(226, 226, 226)'
  },
  {
    model: MODEL_TYPES.SKELETON,
    title: '圆角',
    key: 'radius',
    type: OPTIONS_TYPE.NUMBER,
    form: OPTIONS_FORM.MODEL,
    value: 5,
    min: 0,
    max: 6
  },
  {
    model: MODEL_TYPES.SKELETON,
    title: '动画',
    key: 'animation',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  {
    model: MODEL_TYPES.SKELETON,
    title: '深度',
    key: 'deep',
    type: OPTIONS_TYPE.BOOLEAN,
    form: OPTIONS_FORM.MODEL,
    value: true
  },
  {
    model: MODEL_TYPES.SKELETON,
    title: '指定元素',
    key: 'appoint',
    type: OPTIONS_TYPE.STRING,
    form: OPTIONS_FORM.MODEL,
    value: ''
  }
] as Array<OptionsType>
