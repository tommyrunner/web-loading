<template>
  <el-input
    v-model="value"
    v-if="props.options.type === OPTIONS_TYPE.STRING"
    :placeholder="props.options.title"
  ></el-input>
  <el-slider
    v-model="value"
    :step="props.options.step || 1"
    v-if="props.options.type === OPTIONS_TYPE.NUMBER"
    size="small"
    :min="props.options.min"
    :max="props.options.max"
  />
  <el-switch v-model="value" v-if="props.options.type === OPTIONS_TYPE.BOOLEAN" />
  <el-select v-model="value" v-if="props.options.type === OPTIONS_TYPE.SELECT" :placeholder="props.options.title">
    <el-option v-for="item in options.items" :key="item" :label="item" :value="item" />
  </el-select>
  <div class="el-color-picker">
    <el-color-picker v-model="value" v-if="props.options.type === OPTIONS_TYPE.COLOR" show-alpha></el-color-picker>
  </div>
  <!-- array 多值 -->
  <el-popover v-if="isArray()" :width="200" trigger="click">
    <div class="array-items">
      <div class="item" v-for="item in props.options.arrayItems" :key="item.key">
        <span>{{ item.title }}:</span>
        <WebTypeInput v-model="item.value" :options="item" @update="onItemValue"></WebTypeInput>
      </div>
    </div>
    <template #reference>
      <div class="array-valus">
        <el-tag v-for="v in props.options.value">{{ v }}</el-tag>
      </div>
    </template>
  </el-popover>
</template>
<script setup lang="ts">
import type { OptionsType } from '../utils/types'
import { OPTIONS_TYPE } from '../utils/enum'
import { ElInput, ElSlider, ElSwitch, ElSelect, ElOption, ElColorPicker, ElPopover, ElTag } from 'element-plus'
import { ref, watch } from 'vue'
interface PropsType {
  options: OptionsType
  modelValue: any
}
const props = withDefaults(defineProps<PropsType>(), {})
const value = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'update', 'itemValue'])
watch(value, () => {
  emit('update:modelValue', value.value)
  emit('update', props.options)
})
function onItemValue(op: OptionsType) {
  let temValue = Object.assign(value.value)
  temValue[op.key] = op.value
  value.value = temValue
}
function isArray() {
  let type = props.options.type
  return type && type.includes('array_')
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
