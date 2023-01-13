import { defineClientConfig } from '@vuepress/client'
import webLoading, { fullLoading, miniLoading } from 'web-loading/src/loading'
import options from './utils/options'
import { provide } from 'vue'

export default defineClientConfig({
  setup() {
    provide('webLoading', {
      webLoading,
      fullLoading,
      miniLoading
    })
    provide('defOptions', options)
  }
})
