<div class="context">
  <div class="list-content" v-for="l in list" :key="l.title">
    <div class="line">
      <span>{{ l.title }}</span>
      <a :href="l.link">使用方法></a>
    </div>
    <div class="canvas-list">
      <div
        :style="{ backgroundImage: `url(${withBase(`/images/list/list-${item.model}.gif`)})` }"
        class="item"
        v-for="item in l.list"
        :key="item.model"
        @click="toPage(item)"
      >
        <span class="title">{{ item.model }}</span>
      </div>
    </div>
  </div>
</div>

<script setup>
import { withBase } from '@vuepress/client'
import { canvasList, htmlList } from '../../../utils/listData.ts'
import { useRouter } from 'vue-router'
const router = useRouter()
let list = [
  { title: 'Canvas', list: canvasList, link: '/web-loading/document/use.html' },
  { title: 'Html', list: htmlList, link: '/web-loading/document/use.html#html配置方式' }
]
function toPage(canvas) {
  router.push(`/example/${canvas.model.includes('html-') ? 'html' : 'canvas'}?model=${canvas.model}`)
}
</script>
<style scoped>
.context {
  margin-top: 20px;
}
.context .line {
  border-bottom: 1px solid rgba(192, 192, 192, 0.597);
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.context .line span {
  font-size: 24px;
}
.context .line a {
  font-size: 16px;
  cursor: pointer;
}
.canvas-list {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
}
@media (max-width: 750px) {
  .canvas-list {
    justify-content: center;
  }
}
.canvas-list .item {
  width: 200px;
  height: 200px;
  box-shadow: 0 0 20px rgb(0 0 0 / 5%);
  cursor: pointer;
  border-radius: 12px;
  margin: 22px;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  transition: 0.22s;
}
.canvas-list .item:active {
  transform: scale(0.9);
}
.canvas-list .item .title {
  position: absolute;
  bottom: 5px;
  left: 10px;
  color: white;
  font-weight: bold;
  font-size: 12px;
}
</style>
