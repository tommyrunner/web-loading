<template>
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
  <el-popover v-if="isArray()" :width="200" :visible="isShowPopover" :key="updatePopover">
    <div class="array-items">
      <el-icon :fontSize="16" @click="isShowPopover = false"><Close /></el-icon>
      <div class="item" v-for="item in props.options.arrayItems" :key="item.key">
        <span>{{ item.title }}:</span>
        <WebTypeInput v-model="item.value" :options="item" @update="onItemValue"></WebTypeInput>
      </div>
    </div>
    <template #reference>
      <div class="array-valus" @click="isShowPopover = true">
        <el-tag closable @close="onCloseTag(v)" v-for="v in props.options.value">{{ v }}</el-tag>
      </div>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import { Close } from '@element-plus/icons-vue'
import type { OptionsType } from '../utils/types'
import { OPTIONS_TYPE } from '../utils/enum'
import { ElInput, ElSlider, ElSwitch, ElSelect, ElOption, ElColorPicker, ElPopover, ElTag, ElIcon } from 'element-plus'
import { ref, watch } from 'vue'
import { computed } from '@vue/reactivity'
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
  let temValue = Object.assign(value.value)
  temValue[op.key] = op.value
  asyncData(temValue)
}
function onCloseTag(v: any) {
  let temValue = Object.assign(value.value)
  let arrayItems = props.options.arrayItems
  if (arrayItems) {
    let filterItems = arrayItems.filter((a: any) => a.value !== v)
    let filterValues = temValue.filter((f: any) => f !== v)
    props.options.arrayItems = filterItems
    asyncData(filterValues)
  }
  onUpdatePopover()
}
function isArray() {
  let type = props.options.type
  return type && type.includes('array_')
}
function asyncData(asyncData: Array<any>) {
  // 同步双向数据
  value.value = asyncData
  // 同步显示数据
  props.options.value = asyncData
}
function onUpdatePopover() {
  updatePopover.value++
}
</script>
<style scoped>
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
.array-items .item {
  display: flex;
  flex-direction: column;
}
.array-items .item span {
  margin-top: 3px;
  margin-bottom: 3px;
}
.array-items > .el-icon {
  cursor: pointer;
  transition: 0.25s;
  position: absolute;
  right: 0px;
  top: 0px;
}
.array-items > .el-icon:hover {
  color: var(--c-brand);
  transform: scale(1.1);
}
.array-items > .el-icon:active {
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
