<div class="context">
    <div class="left">
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
        <el-radio-group v-model="type">
        <el-radio-button v-for="t in LOADING_TYPES" :key="t" :label="t" />
        </el-radio-group>
    </div>
    <el-tabs v-model="optionsModel" class="demo-tabs">
        <el-tab-pane label="公共" name="gg" />
        <el-tab-pane label="model" name="model" />
    </el-tabs>
    <div class="options">
        <p>12</p>
    </div>
    <div class="set">
        <el-button type="primary" :icon="Search">加载</el-button>
        <el-button type="danger" v-if="type === LOADING_TYPES.DOM">关闭</el-button>
        <input type="number" placeholder="[1-30]秒关闭" @input="closeInput" v-model="closeTime" v-else />
    </div>
    </div>
</div>

<script setup>
import { ref, reactive } from 'vue'
import { LOADING_TYPES } from 'web-loading/src/utils'
import 'element-plus/dist/index.css'
import { ElCard, ElButton, ElRadioGroup, ElRadioButton, ElTabs, ElTabPane, ElMessage } from 'element-plus'
let list = reactive([])
let type = ref(LOADING_TYPES.DOM)
let closeTime = ref('')
let optionsModel = ref('model')
// 初始化
for (let i = 0; i < 10; i++) list.push(randomItem())
function closeInput() {
  let v = parseInt(closeTime.value)
  if (v < 1 || v > 30) {
    ElMessage.warning('范围1-30秒')
    closeTime.value = ''
  }
}
function randomItem() {
  return {
    id: Date.now(),
    user: parseInt(Date.now() / (Math.random() * 10000000)),
    value: parseInt(Math.random() * 100),
    date: new Date().getSeconds()
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
.right .set {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.right .set input {
  width: 78px;
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
::-webkit-scrollbar {
  width: 0px;
}
</style>
