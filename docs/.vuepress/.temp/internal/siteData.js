export const siteData = JSON.parse("{\"base\":\"/web-loading/\",\"lang\":\"en-US\",\"title\":\"WebLoading\",\"description\":\"web 加载动画\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/images/logo.png\"}]],\"locales\":{\"/\":{\"lang\":\"zh-CN\"},\"/us/\":{\"lang\":\"en-US\"}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
