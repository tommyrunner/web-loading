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
    details: 原生js结构搭建，支持原生html、vue、react等等多种框架。
  - title: 封装
    details: WebLoading封装了DOM、FULL、MINI多种启动方式，并提供全局引入以及单独引入方式。
  - title: 自定义
    details: WebLoading默认有许多model，主要通过Canvas方式绘制，同时，提供了Custom自定义方式，并提供继承Class。
---

<div class="occ" ref="occRef">
  <img src="/images/logo.png" ref="occImgRef">
</div>

<script setup>
import { ref, onMounted,onUnmounted,getCurrentInstance} from 'vue'
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
let webLoading = null
let occRef = ref(null)
let occImgRef = ref(null)
const {ctx} = getCurrentInstance()
let index = parseInt(Math.random() * allModels.length)
let callTime = null
onMounted(()=>{
  // 300毫秒内如果还没加载才消失默认图标
  occImgRef.value.style.opacity = 0
  callTime = setTimeout(()=>{
    occImgRef.value.classList.add('show-img') 
  },300)
  // 该插件用到了操作dom，只能异步引入
  import('web-loading/src/loading').then((initLoading) => {
    clearTimeout(callTime)
    occImgRef.value.classList.add('hide-img') 
    webLoading =  initLoading.default(getOption())
    webLoading.loading(occRef.value)
  })
  // 初始化埋点
  import('t-point-sdk').then((tPointSdk) => {
    tPointSdk.close()
    tPointSdk.init('5cd55c0861e2e7de32ca07956435f45e', 'webLoading', { https: true })
  })
})
onUnmounted(()=>{
  if(webLoading) webLoading.close()
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
  .home .feature p{
    color:#4e6e8e;
  }
  .occ{
    position: absolute;
    left: 50%;
    top: 16%;
    width: 300px;
    height: 300px;
    transform: translate(-50%);
  }
  .occ .show-img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    opacity: 1 !important;
    transition: 0.25s !important;
  }
  .occ .hide-img{
    opacity: 0 !important;
    transform: translate(-50%,-50%) scale(0) !important;
  }
</style>
