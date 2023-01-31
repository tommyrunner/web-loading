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
    <el-tabs v-model="optionsModel" class="demo-tabs">
      <el-tab-pane label="public" name="gg" />
      <el-tab-pane label="model" name="model" />
    </el-tabs>
    <div class="options">
      <div class="items" v-for="item in getOptions" :key="item.key">
        <div class="head">
          <span>{{ item.key }}:</span>
          <el-icon
            :size="20"
            color="rgb(64, 158, 255)"
            @click="onHeadAdd(item)"
            v-if="item.arrayItems && item.arrayAdd"
          >
            <CirclePlusFilled />
          </el-icon>
        </div>
        <WebTypeInput v-model="item.value" :options="item" @update="onUpdate($event, item)"></WebTypeInput>
      </div>
    </div>
    <div class="set">
      <el-button type="primary" @click="onLoading">loading</el-button>
      <el-button type="danger" v-if="nowType === LOADING_TYPES.DOM" @click="onClose">close</el-button>
      <input type="number" placeholder="1 second off" @input="closeInput" v-model="closeTime" v-else />
      <el-dropdown>
        <el-button type="success">copy</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="onReplication()">Modified part</el-dropdown-item>
            <el-dropdown-item @click="onReplication('all')">Configure All</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</div>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { LOADING_TYPES, MODEL_TYPES } from 'web-loading/src/utils'
import 'element-plus/dist/index.css'
import {
  ElCard,
  ElButton,
  ElTabs,
  ElTabPane,
  ElMessage,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
  ElNotification
} from 'element-plus'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { OPTIONS_FORM } from '../../../../utils/enum'
import defOptions from '../../../../utils/options'
let list = reactive([])
let options = reactive([])
let closeTime = ref('')
let optionsModel = ref('gg')
let nowModel = ref(MODEL_TYPES.GEAR)
let nowType = ref(LOADING_TYPES.DOM)
let leftRef = ref(null)
let webLoading = null
let isNotification = false
const getOptions = computed(() => {
  let om = options.filter((o) => o.form === optionsModel.value)
  if (optionsModel.value === 'model') {
    om = om.filter((o) => o.model === nowModel.value)
  }
  return om
})
// Initialize basic data
initData()
onMounted(() => {
  import('web-loading/src/loading').then((res) => {
    webLoading = res.default()
  })
})
function onLoading() {
  if (webLoading.getLoadingId()) return
  webLoading.loading(leftRef.value, fromOptions())
  // Automatic shutdown
  if (nowType.value !== LOADING_TYPES.DOM) {
    setTimeout(webLoading.close, (closeTime.value || 1) * 1000)
  }
}
// Multi-valued component addition
function onHeadAdd(item) {
  let tem = Object.assign(item.arrayAdd)
  let index = item.arrayItems.length
  tem.key = index
  tem.title += index
  item.arrayItems.push(tem)
  item.value.push(tem.value)
}
function onClose() {
  webLoading && webLoading.close()
}
function onUpdate(v, op) {
  if (op.key === 'model') {
    optionsModel.value = 'model'
    nowModel.value = v.value
  }
  if (op.key === 'type') {
    nowType.value = v.value
  }
  if (!isNotification && ['bgColor', 'pointerEvents'].includes(op.key)) {
    ElNotification({
      title: 'Tips',
      type: 'warning',
      message: 'Some public options are used to initialize canvas, such as "background color" and "event penetration". You need to reload the display effect!'
    })
    isNotification = true
  }
  webLoading && webLoading.update(fromOptions())
}
function initData() {
  for (let i = 0; i < 10; i++) list.push(randomItem())
  options = JSON.parse(JSON.stringify(defOptions))
}
function onReplication(isAll) {
  let options = {}
  // Compare Replication Modifications
  let nowOp = fromOptions()
  if (defOptions && nowOp) {
    defOptions.forEach((def) => {
      if (
        (!def['model'] && nowOp[def.key] && nowOp[def.key] !== def.value) ||
        isAll ||
        (def['model'] &&
          def['model'] === nowOp['model'] &&
          (isArray(def.type) ? nowOp[def.key].join() !== def.value.join() : nowOp[def.key] !== def.value))
      ) {
        options[def.key] = nowOp[def.key]
      }
    })
  }
  let oInput = document.createElement('input')
  oInput.value = JSON.stringify(options)
  document.body.appendChild(oInput)
  oInput.select() // Select objects;
  document.execCommand('Copy') // Execute browser copy command
  oInput.remove()
  ElMessage.success('Copy succeeded!')
}
function fromOptions() {
  let ops = options.filter((o) => o.model === nowModel.value || o.form === OPTIONS_FORM.GG)
  let temOptions = {}
  ops.forEach((op) => {
    temOptions[op.key] = op.value
  })
  return temOptions
}
function closeInput() {
  let v = parseInt(closeTime.value)
  if (v < 1 || v > 30) {
    ElMessage.warning('Range 1-30 seconds')
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
function isArray(type) {
  return type && type.includes('array_')
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
  overflow-y: auto;
  overflow-x: hidden;
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
.options .items .head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.items .head .el-icon {
  cursor: pointer;
  transition: 0.25s;
}
.items .head .el-icon:hover {
  transform: scale(1.1);
}
.items .head .el-icon:active {
  transform: scale(0.9);
}
.items .head span {
  font-size: 12px;
  display: inline-block;
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