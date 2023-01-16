<div class="context">
    <div class="left" ref="leftRef">
      <el-card v-for="item in list" :key="item.id">
        <div class="list">
          <span>
            id:
            <b>{{ item.id }}</b>
          </span>
          <span>
            user:
            <b>{{ item.user }}</b>
          </span>
          <span>
            value:
            <b>{{ item.value }}</b>
          </span>
          <span>
            date:
            <b>{{ item.date }}</b>
          </span>
        </div>
      </el-card>
    </div>
    <div class="right">
      <div class="types">
        <el-radio-group v-model="type" @change="onChangeTypes">
          <el-radio-button v-for="t in LOADING_TYPES" :key="t" :label="t" />
        </el-radio-group>
      </div>
      <el-tabs v-model="optionsModel" class="demo-tabs">
        <el-tab-pane label="公共" name="gg" />
        <el-tab-pane label="model" name="model" />
      </el-tabs>
      <div class="options">
        <div class="items" v-for="item in getOptions" :key="item.key">
          <span>{{ item.title }}:</span>
          <WebTypeInput v-model="item.value" :options="item" @update="onUpdate($event, item)"></WebTypeInput>
        </div>
      </div>
      <div class="set">
        <el-button type="primary" @click="onLoading">加载</el-button>
        <el-button type="danger" v-if="type === LOADING_TYPES.DOM" @click="onClose">关闭</el-button>
        <input type="number" placeholder="1秒关闭" @input="closeInput" v-model="closeTime" v-else />
        <el-dropdown>
          <el-button type="success">复制</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>配置</el-dropdown-item>
              <el-dropdown-item>全部配置</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
</div>

<script setup>
import { ref, reactive, inject, computed, onMounted } from 'vue'
import { LOADING_TYPES, MODEL_TYPES } from 'web-loading/src/utils'
import 'element-plus/dist/index.css'
import {
  ElCard,
  ElButton,
  ElRadioGroup,
  ElRadioButton,
  ElTabs,
  ElTabPane,
  ElMessage,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from 'element-plus'
import { OPTIONS_FORM } from '../../../utils/options'
let list = reactive([])
let type = ref(LOADING_TYPES.DOM)
let options = reactive([])
let closeTime = ref('')
let optionsModel = ref('gg')
let defOptions = inject('defOptions')
let { initLoading, fullLoading, miniLoading } = inject('webLoading')
let nowModel = ref(MODEL_TYPES.GEAR)
let leftRef = ref(null)
let webLoading = null
const getOptions = computed(() => {
  let om = options.filter((o) => o.form === optionsModel.value)
  if (optionsModel.value === 'model') {
    om = om.filter((o) => o.model === nowModel.value)
  }
  return om
})
// 初始化基础数据
initData()
onMounted(() => {
  webLoading = initTypeLoading()
})
function onLoading() {
  if (webLoading.getLoadingId()) return
  webLoading.loading(leftRef.value,fromOptions())
  // 自动关闭
  if (type.value !== LOADING_TYPES.DOM) {
    setTimeout(webLoading.close, (closeTime.value || 1) * 1000)
  }
}
function onClose() {
  webLoading.close()
}
function onUpdate(v, e) {
  if (e.key === 'model') {
    optionsModel.value = 'model'
    nowModel.value = v
  }
  webLoading && webLoading.update(fromOptions())
}
function initData() {
  for (let i = 0; i < 10; i++) list.push(randomItem())
  options = JSON.parse(JSON.stringify(defOptions))
}
function initTypeLoading(options) {
  let typeLoading = initLoading
  if (type.value === LOADING_TYPES.FULL) typeLoading = fullLoading
  if (type.value === LOADING_TYPES.MINI) typeLoading = miniLoading
  return typeLoading(options)
}
function onChangeTypes() {
  webLoading = initTypeLoading()
}
function getSetOptions(isAll) {
  // if(isAll) webLoading.getOptions()
}
function fromOptions() {
   let ops = options.filter((o) => o.model === nowModel.value || o.form === OPTIONS_FORM.GG)
  let temOptions = {}
  ops.forEach((op) => {
    temOptions[op.key] = op.value
  })
  console.log(temOptions)
  return temOptions
}
function closeInput() {
  let v = parseInt(closeTime.value)
  if (v < 1 || v > 30) {
    ElMessage.warning('范围1-30秒')
    closeTime.value = ''
  }
}
function randomItem() {
  let date = new Date()
  return {
    id: parseInt(Math.random() * 10000000),
    user: parseInt(Math.random() * 10000000),
    value: parseInt(Math.random() * 100),
    date: `${date.getFullYear()}${date.getMonth() - 1}-${date.getDate()}`
  }
}
</script>
<style scoped>
.context {
  display: flex;
  height: 70vh;
  padding: 10px;
  margin-top: 18px;
}
@media screen and (max-width: 820px) {
  .context {
    flex-direction: column;
    height: 100vh;
  }
  .context .right {
    height: 60vh;
  }
}
.context .left {
  flex: 2;
  border-radius: 10px;
  border: 4px gainsboro solid;
  padding: 16px;
  transition: 0.25s;
  overflow: auto;
}
.context .left .list {
  display: flex;
  flex-direction: column;
  line-height: 30px;
}
.left .el-card {
  margin-bottom: 12px;
}
.context .right {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
}
.context .right .types {
  display: flex;
  justify-content: center;
}

.right .options {
  flex: 1;
  overflow: auto;
}
.options .items {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  border: 1px gainsboro solid;
  border-radius: 5px;
  padding: 8px;
  box-shadow: var(--el-box-shadow-light);
}
.options .items span {
  font-size: 12px;
  display: inline-block;
  margin-bottom: 6px;
}
.right .set {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right .set input {
  width: 58px;
  height: 32px;
  margin-left: 10px;
  border: 1px gainsboro solid;
  border-radius: 5px;
  padding-left: 6px;
  background-color: white;
  color: black;
}
.right .set .btn:nth-child(1) {
  margin-right: 10px;
}
.right .set .btn:nth-child(2) {
  margin-left: 10px;
}
.right .set .el-dropdown {
  margin-left: 10px;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
