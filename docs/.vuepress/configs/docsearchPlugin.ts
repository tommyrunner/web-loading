import { docsearchPlugin } from "@vuepress/plugin-docsearch";
export default docsearchPlugin({
    appId: "<App_Id>",
    apiKey: '<API_KEY>',
    indexName: '<INDEX_NAME>',
    locales: {
        '/': {
            placeholder: 'Search Documentation',
            translations: {
                button: {
                    buttonText: 'Search Documentation',
                },
            },
        },
        '/zh/': {
            placeholder: '搜索文档',
            translations: {
                button: {
                    buttonText: '搜索文档',
                },
            },
        },
    },
})