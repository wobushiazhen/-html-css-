<template>
  <div class="layout-left">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :class="{'el-menu-xiao':isOpen}"
    >
    <layoutLeftItem
        v-for="(item, index) in getRoutes"
        :list="item"
        :key="index"
      >
      </layoutLeftItem> 
    </el-menu>
  </div>
</template>

<script setup>
  import { useRouterListStore } from "@/store/routes.js";
  import layoutLeftItem from "./layout-left-item.vue";
  import { reactive, ref } from "vue";
  import { useRoute } from 'vue-router';
  import {storeToRefs} from 'pinia'

  const router=useRoute();
  //默认激活的路由
  const activeIndex = ref(router.path);
  const { getRoutes } = useRouterListStore();
  const {isOpen}=storeToRefs(useRouterListStore())
</script>

<style>
.el-menu {
  height: 100%;
  width: 200px;
  background: #545c64;
}
.el-menu-xiao{
  width: 120px;
}

</style>