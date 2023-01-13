<template>
  <el-input
    v-model="value"
    v-if="props.options.type === OPTIONS_TYPE.STRING"
    :placeholder="props.options.title"
  ></el-input>
  <el-slider
    v-model="value"
    v-if="props.options.type === OPTIONS_TYPE.NUMBER"
    size="small"
    :min="props.options.min"
    :max="props.options.max"
  />
  <el-switch v-model="value" v-if="props.options.type === OPTIONS_TYPE.BOOLEAN" />
  <el-select v-model="value" v-if="props.options.type === OPTIONS_TYPE.SELECT" placeholder="model">
    <el-option v-for="item in options.items" :key="item" :label="item" :value="item" />
  </el-select>
</template>
<script setup lang="ts">
import type { OptionsType } from '../utils/types'
import { OPTIONS_TYPE } from '../utils/options'
import { ElInput, ElSlider, ElSwitch, ElSelect, ElOption } from 'element-plus'
import { ref, watch } from 'vue'
interface PropsType {
  options: OptionsType
  modelValue: any
}
const props = withDefaults(defineProps<PropsType>(), {})
const value = ref(props.modelValue)
const emit = defineEmits(['update:modelValue', 'update'])
watch(value, () => {
  emit('update:modelValue', value.value)
  emit('update', value.value)
})
</script>
<style scoped>
* {
  width: 80%;
  align-self: center;
}
</style>
