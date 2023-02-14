<template>
  <div class="type-input">
    <div class="head">
      <span>{{ props.options.title }}:</span>
      <el-icon
        :size="20"
        color="rgb(64, 158, 255)"
        @click="onHeadAdd(props.options)"
        v-if="props.options.arrayItems && props.options.arrayAdd"
      >
        <CirclePlusFilled />
      </el-icon>
    </div>
    <el-input
      v-model="value"
      v-if="props.options.type === OPTIONS_TYPE.STRING"
      :placeholder="props.options.title"
      :disabled="props.options.disabled"
    ></el-input>
    <el-slider
      v-model="value"
      :step="props.options.step || 1"
      v-if="props.options.type === OPTIONS_TYPE.NUMBER"
      size="small"
      :min="props.options.min"
      :max="props.options.max"
      :disabled="props.options.disabled"
    />
    <el-switch v-model="value" v-if="props.options.type === OPTIONS_TYPE.BOOLEAN" :disabled="props.options.disabled" />
    <el-select
      v-model="value"
      v-if="props.options.type === OPTIONS_TYPE.SELECT"
      :placeholder="props.options.title"
      :disabled="props.options.disabled"
    >
      <el-option v-for="item in options.items" :key="item" :label="item" :value="item" />
    </el-select>
    <div class="el-color-picker">
      <el-color-picker
        v-model="value"
        v-if="props.options.type === OPTIONS_TYPE.COLOR"
        show-alpha
        :disabled="props.options.disabled"
      ></el-color-picker>
    </div>
    <!-- array 多值 -->
    <el-popover v-if="isArrayShow()" :width="200" :visible="isShowPopover" :key="updatePopover">
      <div class="array-items">
        <el-button type="success" :icon="Check" circle @click="isShowPopover = false" />
        <WebTypeInput
          class="type-input-array"
          v-for="item in props.options.arrayItems"
          :key="item.key"
          v-model="item.value"
          :options="item"
          @update="onItemValue"
        ></WebTypeInput>
      </div>
      <template #reference>
        <div class="array-valus" @click="isShowPopover = true">
          <el-tag closable @close="onCloseTag(v)" v-for="v in props.options.arrayItems">
            {{ v.value }}
          </el-tag>
        </div>
      </template>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import type { OptionsType } from '../utils/types'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { Check } from '@element-plus/icons-vue'
import { OPTIONS_TYPE } from '../utils/enum'
import {
  ElInput,
  ElSlider,
  ElSwitch,
  ElSelect,
  ElOption,
  ElColorPicker,
  ElPopover,
  ElTag,
  ElIcon,
  ElButton
} from 'element-plus'
import { ref, watch } from 'vue'
interface PropsType {
  options: OptionsType
  modelValue: any
}
const props = withDefaults(defineProps<PropsType>(), {})
const value = ref(props.modelValue)
const isShowPopover = ref(false)
const updatePopover = ref(0)
const emit = defineEmits(['update:modelValue', 'update', 'itemValue'])
watch(value, () => {
  emit('update:modelValue', value.value)
  emit('update', props.options)
})
function onItemValue(op: OptionsType) {
  let arrayItems = props.options.arrayItems
  if (arrayItems) {
    let findValue = arrayItems.find((a) => a.key === op.key)
    if (findValue) {
      findValue.value = op.value
    }
  }
  onUpdatePopover()
}
function onCloseTag(v: OptionsType) {
  let arrayItems = props.options.arrayItems
  if (arrayItems) {
    props.options.arrayItems = arrayItems.filter((a) => a.key !== v.key)
  }
  onUpdatePopover()
}
// 多值组件添加
function onHeadAdd(item: OptionsType) {
  let tem = JSON.parse(JSON.stringify(item.arrayAdd))
  if (item.arrayItems) {
    let index = item.arrayItems.length
    tem.key = index
    tem.title += index + 1
    item.arrayItems.push(tem)
    ;(item.value as any).push(tem.value)
    onUpdatePopover()
  }
}
function isArrayShow() {
  let type = props.options.type
  return type && type.includes('array_')
}
function onUpdatePopover() {
  // 更新视图
  updatePopover.value++
  // 更新数据
  emit('update', props.options)
}
</script>
<style scoped>
.type-input {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  border: 1px gainsboro solid;
  border-radius: 5px;
  padding: 8px;
  box-shadow: var(--el-box-shadow-light);
}
.type-input-array {
  box-shadow: none;
  border: none;
  padding: 2px;
  border-radius: 0px;
}
.type-input .head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}
.type-input .head .el-icon {
  cursor: pointer;
  transition: 0.25s;
}
.type-input .head .el-icon:hover {
  transform: scale(1.1);
}
.type-input .head .el-icon:active {
  transform: scale(0.9);
}
.type-input .head span {
  font-size: 12px;
  display: inline-block;
}

.el-input,
.el-slider,
.el-switch,
.el-select,
.el-color-picker {
  width: 80%;
  align-self: center;
  cursor: pointer;
}
.array-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.array-items > .el-button {
  cursor: pointer;
  transition: 0.25s;
  position: absolute;
  width: 12px;
  height: 12px;
  right: 0px;
  bottom: 0px;
}
.array-items > .el-button:hover {
  transform: scale(1.1);
}
.array-items > .el-button:active {
  transform: scale(0.9);
}
.array-valus {
  border-radius: 5px;
  border: 1px solid var(--el-color-info);
  cursor: pointer;
  transition: 0.25s;
  min-height: 30px;
}
.array-valus:hover {
  border: 1px solid var(--c-brand);
}
.array-valus .el-tag {
  margin: 2px;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
  background: none;
  mask: none !important;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
  color: #606266 !important;
  font-weight: 400;
}
</style>
