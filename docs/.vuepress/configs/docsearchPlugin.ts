import { docsearchPlugin } from '@vuepress/plugin-docsearch'
export default docsearchPlugin({
  appId: 'DLPCCW1SI8',
  apiKey: '8c384f5cdb8b5695865dc839f1ec19cb',
  indexName: 'web-loading',
  locales: {
    '/': {
      placeholder: '搜索文档',
      translations: {
        button: {
          buttonText: '搜索文档'
        }
      }
    },
    '/us/': {
      placeholder: 'Search Documentation',
      translations: {
        button: {
          buttonText: 'Search Documentation'
        }
      }
    }
  }
})
