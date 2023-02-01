export default [
  {
    text: '首页',
    link: '/'
  },
  {
    text: '指南',
    link: '/guide/'
  },
  {
    text: '示例',
    link: '/example/'
  },
  {
    text: '文档',
    link: '/document/',
    children: [
      {
        text: '使用',
        link: '/document/use.html'
      },
      {
        text: '模块',
        link: '/document/model.html'
      }
    ]
  },
  {
    text: '生态',
    link: '/document/',
    children: [
      {
        text: 'vue-share-element',
        link: 'https://www.npmjs.com/package/vue-share-element'
      },
      {
        text: 'animation-list',
        link: 'https://www.npmjs.com/package/animation-list'
      }
    ]
  },
  {
    text: 'GitHub',
    link: 'https://github.com/tommyrunner/web-loading'
  }
]
