  <div class="context">
    <div class="line">Canvas</div>
    <div class="canvas-list">
      <div
        :style="{ backgroundImage: `url(${withBase(`/images/list/list-${item.model}.gif`)})` }"
        class="item"
        v-for="item in canvasList"
        :key="item.model"
        @click="toCanvas(item)"
      >
        <span class="title">{{ item.model }}</span>
      </div>
    </div>
    <div class="line">Html</div>
  </div>

<script setup>
import { withBase } from '@vuepress/client'
import { canvasList } from '../../../utils/listData.ts'
function toCanvas(canvas) {
  location.href = `/web-loading/example/canvas?model=${canvas.model}&options=${JSON.stringify(canvas.options)}`
}
</script>
<style scoped>
.context {
  margin-top: 20px;
}
.context .line {
  border-bottom: 1px solid rgba(192, 192, 192, 0.597);
  padding-bottom: 12px;
  font-size: 24px;
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
