---
home: true
title: 首页
heroImage: '/images/occ.png'
lastUpdated: true
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
    details: WebLoading默认有许多model，主要通过Canvas方式绘制，同时，提供了Custom自定义方式，并提供继承Class。
---

<RedDiv class="occ" ref="occRef"></RedDiv>

<script setup>
import { ref, onMounted,onUnmounted} from 'vue'
import webLoading from 'web-loading-test/src/loading'
// 默认样式
let allModels = [
  { model: 'Gear', lineWidth: 6, lineStart: 20, lineEnd: 32 },
  { model: 'Ring', lineWidth: 4, radius: 16, ringGap: 16 },
  { model: 'Zoom', action: 'height', zoomColors: ['#f44336', '#e91e63', '#2196f3', '#ff5722', '#8bc34a'] },
  { model: 'Pattern', chartSize: 18 },
  { model: 'Clock', lineWidth: 3.6, clockSize: 32, clockGap: 8 },
  { model: 'Bean', pointLength: 25 },
  { model: 'Roll', rollSize: 20, rollGap: 32 },
  { model: 'Img', width: 68, height: 68 }
]
let loading = null
let occRef = ref(null)

let index = parseInt(Math.random() * allModels.length)
onMounted(()=>{
  loading =  webLoading(occRef.value,getOption())
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
<style>
  .occ{
    position: absolute;
    left: 50%;
    top: 12%;
    width: 300px;
    height: 300px;
    transform: translate(-50%);
  }
</style>
