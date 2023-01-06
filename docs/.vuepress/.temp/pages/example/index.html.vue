<template><div><p><em>你好， {{ msg }}</em></p>
<RedDiv>
<p><em>当前计数为： {{ count }}</em></p>
</RedDiv>
<p><button @click="count++">点我！</button></p>
</div></template>


<script setup>
import { h, ref } from 'vue'
const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Markdown 中的 Vue'
const count = ref(0)
</script>
<style>
.red-div {
  color: red;
}
</style>