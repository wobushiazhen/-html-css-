<template>
  <div id="main">
    <div class="title">{{title}}</div>
    <div ref="container" id="container"></div>
  </div>
</template>

<script setup>
const props=defineProps({
  title:String,
  option:Object
})
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
const container = ref();
onMounted(() => {
  const mychart = echarts.init(container.value);
  mychart.setOption(props.option);
});
</script>

<style scoped>
#main{
  padding: 20px;
  display:flex;
  width: 100%;
}
#container {
  height: 400px;
  width: 500px;
}
.title{
  margin-left: 5px;
}
</style>
