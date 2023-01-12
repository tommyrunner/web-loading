import { defaultTheme } from '@vuepress/theme-default'
import docsearchPlugin from './configs/docsearchPlugin'
import navbar from './configs/navbar'
import sidebarZh from './configs/sidebar/zh'
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
const __dirname = getDirname(import.meta.url)
export default {
  // 部署才能找到相应资源
  base: '/web-loading/',
  title: 'WebLoading',
  description: 'web 加载动画',
  plugins: [docsearchPlugin, registerComponentsPlugin({ componentsDir: path.resolve(__dirname, './components') })],
  head: [['link', { rel: 'icon', href: '/web-loading/images/logo.png' }]],
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
    navbar: navbar,
    locales: {
      '/': {
        sidebar: sidebarZh,
        selectLanguageName: '简体中文'
      },
      '/us/': {
        selectLanguageName: 'English'
      }
    }
  })
}
