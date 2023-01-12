import { defineClientConfig } from '@vuepress/client'
import options from './utils/options'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.mixin({
      mounted() {
        this.getDefOptions = options
      }
    })
  }
})
