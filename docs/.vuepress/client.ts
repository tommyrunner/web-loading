import { defineClientConfig } from '@vuepress/client'
import options from './utils/options'
import { provide } from 'vue'

export default defineClientConfig({
  setup() {
    provide('defOptions', options)
  }
})
