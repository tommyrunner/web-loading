---
home: true
title: home
heroImage: '/images/occ.png'
lastUpdated: true
actions:
  - text: Quick start
    link: /guide/
    type: primary
  - text: Sample Demo
    link: /example/
    type: secondary
features:
  - title: compatibility
    details: Native structure construction, supporting native html, vue, react and other frameworks.
  - title: encapsulation
    details: WWebLoading encapsulates multiple startup modes of DOM, FULL and MINI, and provides global import and individual import modes.
  - title: custom
    details: WebLoading has many models by default, which are mainly drawn by Canvas. At the same time, it provides Custom customization and inheritance class.
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
   { model: 'Circular', delay: 12, },
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
  try {
      import('t-point-sdk').then((tPointSdk) => {
        tPointSdk.close()
        tPointSdk.init('5cd55c0861e2e7de32ca07956435f45e', 'webLoading', { https: true })
    })
  } catch(e){}
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
    text-align: center;
    line-height: 300px;
  }
  .occ img{
    transition: 0.25s !important;
  }
  .occ .show-img{
    position: absolute;
    opacity: 1 !important;
  }
  .occ .hide-img{
    opacity: 0 !important;
    transform:  scale(0) !important;
  }
</style>
