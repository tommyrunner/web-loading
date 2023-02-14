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
        <el-tab-pane label="公共" name="gg" />
        <el-tab-pane label="model" name="model" />
      </el-tabs>
      <el-skeleton v-for="n in 10" :rows="1" animated v-if="isShowSkeleton" />
      <div class="options" v-else>
        <WebTypeInput
          v-for="item in getOptions"
          :key="item.key"
          v-model="item.value"
          :options="item"
          @update="onUpdate($event, item)"
        ></WebTypeInput>
      </div>
      <div class="set">
        <el-button type="primary" @click="onLoading">加载</el-button>
        <el-button type="danger" v-if="nowType === LOADING_TYPES.DOM" @click="onClose">关闭</el-button>
        <input type="number" placeholder="1秒关闭" @input="closeInput" v-model="closeTime" v-else />
        <el-dropdown>
          <el-button type="success">复制</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onReplication()">修改部分</el-dropdown-item>
              <el-dropdown-item @click="onReplication('all')">全部配置</el-dropdown-item>
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
  ElNotification,
  ElSkeleton
} from 'element-plus'
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
let isShowSkeleton = ref(true)
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
  import('web-loading/src/loading').then((res) => {
    webLoading = res.default()
    isShowSkeleton.value = false
    onLoading()
  })
})
function onLoading() {
  if (webLoading.getLoadingId()) return
  webLoading.loading(leftRef.value, fromOptions())
  // 自动关闭
  if (nowType.value !== LOADING_TYPES.DOM) {
    setTimeout(webLoading.close, (closeTime.value || 1) * 1000)
  }
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
      title: '提示',
      type: 'warning',
      message: '部分公共options是用于初始化canvas,例如:"背景色"与"事件穿透",需要 重新加载 显示效果!'
    })
    isNotification = true
  }
  webLoading && webLoading.update(fromOptions())
}
function initData() {
  for (let i = 0; i < 10; i++) list.push(randomItem())
  options = JSON.parse(JSON.stringify(defOptions))
  let urlParams = new URLSearchParams(location.search)
  let model = urlParams.get('model')
  let ops = urlParams.get('options')
  if (model) {
    // 修改model
    let key_model = options.find((o) => o.key === 'model')
    key_model.value = model
    nowModel.value = model
    // 修改options
    if (ops) {
      let json_ops = JSON.parse(ops)
      let key_models = options.filter((o) => o.form === 'gg' || o.model === model)
      // options逆转操作属性
      key_models.forEach((km) => {
        for (let [key, value] of Object.entries(json_ops)) {
          if (isArray(km.type) && km.key === key && km.arrayAdd && km.arrayItems && value.length) {
            km.arrayItems = []
            value.forEach((v) => {
              km.arrayItems.push(
                JSON.parse(
                  JSON.stringify(km.arrayAdd, (pk, pv) => {
                    switch (pk) {
                      case 'key':
                        return pv + km.arrayItems.length
                      case 'value':
                        return v
                      default:
                        return pv
                    }
                  })
                )
              )
            })
          }
          if (km.key === key) km.value = value
        }
      })
    }
  }
}
function onReplication(isAll) {
  let options = {}
  // 比较复制修改
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
  oInput.select() // 选择对象;
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.remove()
  ElMessage.success('复制成功!')
}
// 格式化操作options
function fromOptions() {
  let ops = options.filter((o) => o.model === nowModel.value || o.form === OPTIONS_FORM.GG)
  let temOptions = {}
  // 操作属性转options
  ops.forEach((op) => {
    if (isArray(op.type)) temOptions[op.key] = op.arrayItems.map((a) => a.value)
    else temOptions[op.key] = op.value
  })
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
.right .options {
  flex: 1;
  overflow: auto;
}
@media screen and (max-width: 820px) {
  .context {
    flex-direction: column;
    height: 100vh;
  }
  .context .left {
    height: 40%;
  }
  .context .right {
    height: 60%;
  }
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
