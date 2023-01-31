import { defaultTheme } from '@vuepress/theme-default'
import docsearchPlugin from './configs/docsearchPlugin'
import navbarZh from './configs/navbar/zh'
import navbarUs from './configs/navbar/us'
import sidebarZh from './configs/sidebar/zh'
import sidebarUs from './configs/sidebar/us'
import { getDirname, path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
const __dirname = getDirname(import.meta.url)
export default {
  // 部署才能找到相应资源
  base: '/web-loading/',
  title: 'WebLoading',
  plugins: [docsearchPlugin, registerComponentsPlugin({ componentsDir: path.resolve(__dirname, './components') })],
  head: [['link', { rel: 'icon', href: '/web-loading/images/logo.png' }]],
  locales: {
    '/': {
      lang: 'zh-CN',
      description: 'web 加载动画'
    },
    '/us/': {
      lang: 'en-US',
      description: 'Web loading animation'
    }
  },
  theme: defaultTheme({
    logo: '/images/logo.png',
    locales: {
      '/': {
        sidebar: sidebarZh,
        navbar: navbarZh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: ['这里什么都没有', '我们怎么到这来了？', '这是一个 404 页面', '看起来我们进入了错误的链接'],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏'
      },
      '/us/': {
        sidebar: sidebarUs,
        navbar: navbarUs,
        selectLanguageName: 'English'
      }
    }
  })
}
