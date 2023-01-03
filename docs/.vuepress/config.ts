import { defaultTheme } from "@vuepress/theme-default";
import docsearchPlugin from './configs/docsearchPlugin'
export default {
    // 部署才能找到相应资源
    base: "/web-loading/",
    title: "WebLoading",
    description: "web 加载动画",
    plugins: [docsearchPlugin],
    head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
    locales: {
        '/': {
            lang: 'zh-CN',
        },
        '/us/': {
            lang: 'en-US',
        },
    },
    theme: defaultTheme({
        logo: '/images/logo.png',
        navbar: [
            {
                text: "Foo",
                link: "/foo/",
            },
        ],
        locales: {
            '/': {
                selectLanguageName: '简体中文',
            },
            '/us/': {
                selectLanguageName: 'English',
            },
        },
    }),
};
