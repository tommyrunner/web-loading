---
home: true
lang: zh-CN
title: 首页
actions:
  - text: 快速上手
    link: /guide/
    type: primary
  - text: 示例演示
    link: /example/
    type: secondary
features:
  - title: 兼容性
    details: 原生js结构搭建，支持原生js、vue、react等等多种框架。
  - title: 更方便
    details: 可以通过全局引入dom挂载方式，也可以单独引入，并提供FULL、MINI以及DOM多种启动方式。
  - title: 自定义
    details: WebLoading默认有许多model，主要通过Canvas方式绘制同时，提供了Custom自定义方式，并提供继承Class。
---

<script setup>
import { h, ref ,onMounted,onUnmounted} from 'vue'
import webLoading,{miniLoading} from 'web-loading-test/src/loading'
let time = null
let loading = null
let occDom = null
onMounted(()=>{
  let dom = document.getElementsByClassName('hero')[0]
   occDom = document.createElement('div')
  occDom.style.cssText = `
  height:300px;
  margin-top:1.8rem;
  `
  dom.insertBefore(occDom,dom.children[0])
  // loading =  webLoading(occDom,{model:'Gear',bgColor:'',text:''})
 loading= miniLoading()
 loading.close()
})
onUnmounted(()=>{
  if(occDom) occDom.remove()
  if(time) clearInterval(time)
})
</script>
