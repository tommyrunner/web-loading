import { defaultTheme } from '@vuepress/theme-default'
import docsearchPlugin from './configs/docsearchPlugin'
export default {
  // 部署才能找到相应资源
  base: '/web-loading/',
  title: 'WebLoading',
  description: 'web 加载动画',
  plugins: [docsearchPlugin],
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  locales: {
    '/': {
      lang: 'zh-CN'
    },
    '/us/': {
      lang: 'en-US'
    }
  },
  theme: defaultTheme({
    logo: '/images/logo.png',
    navbar: [
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
        text: 'GitHub',
        link: 'https://github.com/tommyrunner/web-loading'
      }
    ],
    locales: {
      '/': {
        selectLanguageName: '简体中文'
      },
      '/us/': {
        selectLanguageName: 'English'
      }
    }
  })
}
