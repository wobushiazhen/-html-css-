<!-- 全屏组件封装 -->
<template>
  <el-tooltip :content="isquanping?'全屏':'正常'">
    <el-icon size="22" @click="toggleScreenfull"><FullScreen /></el-icon>
  </el-tooltip>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import screenfull from "screenfull";
// 控制显示
const isquanping=ref(true)
// 全屏事件
function toggleScreenfull() {
    isquanping.value=!isquanping.value
  if (screenfull.isEnabled) {
    screenfull.toggle();
   
    // console.log(screenfull);
  }
}

</script>
<style scoped>
.el-icon {
  cursor: pointer;
}
</style>
