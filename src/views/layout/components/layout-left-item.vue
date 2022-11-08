<template>
    <el-menu-item v-if="!ischildren" :index="path">
      {{ list.label }}
    </el-menu-item>

    <el-sub-menu v-else :index="path">
      <template #title>{{ list.label }}</template>

      <layout-left-item
        v-for="(item, index) in list.children"
        :key="index"
        :list="item"
        :parentList="list"
      ></layout-left-item>

    </el-sub-menu>
</template>


<script setup>
import { reactive, ref,computed } from "vue";

const props =defineProps({
  list:Object,
  parentList:Object,
})

 const ischildren=computed(()=>{
  return props.list.children && props.list.children.length
})

const path=computed(()=>{
  if(props.parentList){
    return [props.parentList.path,props.list.path].join('/');
  }
  else{
    return props.list.path;
  }
})


</script >


<style scoped>
.el-menu {
  height: 100%;
  width: 100%;
  background: #545c64;
}
</style>