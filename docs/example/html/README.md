<div class="context">
  <div class="top" ref="topRef"></div>
  <div class="bottom">
    <el-tabs v-model="tabModel" class="demo-tabs">
      <el-tab-pane label="html" name="html" />
      <el-tab-pane label="css" name="css" />
    </el-tabs>
    <div class="options">
      <pre v-html="hljs.highlightAuto(options[tabModel]).value"></pre>
    </div>
    <div class="set">
      <el-button type="primary" @click="onLoading">加载</el-button>
      <el-button type="danger" @click="onClose">关闭</el-button>
      <el-button type="success" @click="onReplication(options[tabModel])">复制</el-button>
    </div>
    <div class="foot">
      <a href="https://uiverse.io/loaders" target="_blank">推荐网站</a>
    </div>
  </div>
</div>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import 'element-plus/dist/index.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { ElButton, ElTabs, ElTabPane, ElMessage } from 'element-plus'
import { htmlList } from '../../../../utils/listData.ts'
let options = reactive({
  html: '',
  css: ''
})
let tabModel = ref('html')
let topRef = ref(null)
let webLoading = null
// 初始化基础数据
initData()
onMounted(() => {
  import('web-loading').then((params) => {
    webLoading = params.initLoading()
    onLoading()
  })
})
function onLoading() {
  if (webLoading.getLoadingId()) return
  webLoading.loading(topRef.value, fromOptions())
}
function onClose() {
  webLoading && webLoading.close()
}
function initData() {
  let route = useRoute()
  let model = route.query.model
  if (model) {
    let data = htmlList.find((h) => h.model === model)
    options.html = data.html
    options.css = data.css
  }
}
function onReplication(text) {
  let oInput = document.createElement('input')
  oInput.value = text
  document.body.appendChild(oInput)
  oInput.select() // 选择对象;
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.remove()
  ElMessage.success('复制成功!')
}
// 格式化操作options
function fromOptions() {
  // 处理css
  topRef.value.innerHTML = `<style>${options.css}</style >`
  return options
}
</script>
<style scoped>
.context {
  padding: 10px;
  margin-top: 18px;
}
.context .top {
  height: 30vh;
  border-radius: 10px;
  border: 4px gainsboro solid;
}
.context .bottom {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
}
.bottom .options {
  height: 36vh;
  overflow: auto;
}
.bottom .set {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom .set .btn:nth-child(1) {
  margin-right: 10px;
}
.bottom .set .btn:nth-child(2) {
  margin-left: 10px;
}
.bottom .set .el-dropdown {
  margin-left: 10px;
}
.foot{
  text-align: center;
  margin-top: 28px;
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
</style>
