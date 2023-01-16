import { defineClientConfig } from '@vuepress/client'
import initLoading, { fullLoading, miniLoading } from 'web-loading/src/loading'
import options from './utils/options'
import { provide } from 'vue'

export default defineClientConfig({
  setup() {
    provide('webLoading', {
      initLoading,
      fullLoading,
      miniLoading
    })
    provide('defOptions', options)
  }
})
