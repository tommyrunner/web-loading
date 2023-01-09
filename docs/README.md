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
// import 'web-loading-test'
import webLoading,{miniLoading,fullLoading} from 'web-loading-test/src/loading'
// 默认样式
let allModels = [
    { model: 'Gear', lineWidth:6, lineStart:20, lineEnd:32},
    { model: 'Ring',lineWidth:4, radius: 16, ringGap:16},
    { model: 'Zoom', action:'height',zoomColors:['#f44336','#e91e63','#2196f3','#ff5722','#8bc34a']},
    { model: 'Pattern', chartSize:18},
    { model: 'Clock',lineWidth: 3.6, clockSize:32, clockGap:8},
    { model: 'Bean', pointLength:25},
    { model: 'Roll',rollSize:20,rollGap:32},
    { model: 'Skeleton'},
    { model: 'Img'}
  ]
let loading = null
let occDom = null
// let index = parseInt(Math.random() * allModels.length)
let index = 7
onMounted(()=>{
  let dom = document.getElementsByClassName('hero')[0]
   occDom = document.createElement('div')
  occDom.style.cssText = `
  height:300px;
  margin-top:1.8rem;
  `
  dom.insertBefore(occDom,dom.children[0])
  loading =  webLoading(occDom,getOption())
})
onUnmounted(()=>{
  if(loading) loading.close()
  if(occDom) occDom.remove()
})
function getOption(){
  let publicOption = {
    bgColor: '', 
    text: ''
  }
  return Object.assign(publicOption,allModels[index])
}
</script>
