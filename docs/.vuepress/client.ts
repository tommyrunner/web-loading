import { defineClientConfig } from '@vuepress/client'
export default defineClientConfig({
  enhance({ app }) {
    app.mixin({
      mounted() {
        // README中注入document
        this.$document = document || window.document
      }
    })
  }
})
