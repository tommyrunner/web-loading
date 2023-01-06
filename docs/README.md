---
home: true
lang: zh-CN
title: 首页
---

<span v-for="i in 3"> span: {{ i }}1 </span>
<RedDiv ref="reDiv" class="red-div">
当前计数为：
</RedDiv>

<script setup>
import { h, ref ,onMounted} from 'vue'
import 'web-loading1'
const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)
const msg = 'Markdown 中的 Vue'
const count = ref(0)
const reDiv = ref()
onMounted(()=>{
    console.log(reDiv.value.loading({model:'Clock'}))
})
</script>

<style>
.red-div {
  height:300px;
}
</style>
