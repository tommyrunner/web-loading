import { defineClientConfig } from '@vuepress/client'
import options from './utils/options'
import { provide } from 'vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.mixin({
      mounted() {
        // 注入数据
        this.getDefOptions = options
      }
    })
  },
  setup() {
    provide('defOptions', options)
  }
})
