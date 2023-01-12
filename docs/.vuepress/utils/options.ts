import { LOADING_TYPES } from 'web-loading/src/utils'
export default [
  {
    title: '模块',
    key: 'model',
    type: 'select',
    form: 'gg',
    value: LOADING_TYPES.DOM
  },
  {
    title: '字体内容',
    key: 'text',
    type: 'string',
    form: 'gg',
    value: '加载中...'
  },
  {
    title: '字体间距',
    key: 'textGap',
    type: 'number',
    form: 'gg',
    value: 8,
    min: 2,
    max: 20
  },
  {
    title: '字体大小',
    key: 'fontSize',
    type: 'number',
    form: 'gg',
    value: 12,
    min: 2,
    max: 20
  },
  {
    title: '字体类型',
    key: 'fontFamily',
    type: 'string',
    form: 'gg',
    value: 'Microsoft YaHei'
  },
  {
    title: '动画延迟',
    key: 'delay',
    type: 'number',
    form: 'gg',
    value: 65,
    min: 65,
    max: 1000
  },
  {
    title: '关闭动画延迟',
    key: 'delayColse',
    type: 'number',
    form: 'gg',
    value: 520,
    min: 65,
    max: 1000
  },
  {
    title: '优化处理',
    key: 'optimization',
    type: 'boolean',
    form: 'gg',
    value: false
  },
  {
    title: '层级',
    key: 'zIndex',
    type: 'string',
    form: 'gg',
    value: '2001'
  },
  {
    title: '主题色',
    key: 'themeColor',
    type: 'string',
    form: 'gg',
    value: 'rgba(64,158,255,1)'
  },
  {
    title: '背景色',
    key: 'bgColor',
    type: 'string',
    form: 'gg',
    value: 'rgba(0, 0, 0, 0.8)'
  },
  {
    title: '阴影色',
    key: 'shadowColor',
    type: 'string',
    form: 'gg',
    value: 'rgba(64,158,255,0.6)'
  },
  {
    title: '阴影X',
    key: 'shadowOffsetX',
    type: 'number',
    form: 'gg',
    value: 2,
    min: 0,
    max: 60
  },
  {
    title: '阴影Y',
    key: 'shadowOffsetY',
    type: 'number',
    form: 'gg',
    value: 2,
    min: 0,
    max: 60
  },
  {
    title: '阴影范围',
    key: 'shadowBlur',
    type: 'number',
    form: 'gg',
    value: 5,
    min: 0,
    max: 60
  },
  {
    title: '事件穿透',
    key: 'pointerEvents',
    type: 'boolean',
    form: 'gg',
    value: false
  }
]
