<template>
  <div class="layout-left">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
    <layoutLeftItem
        v-for="(item, index) in routerList"
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
const activeIndex = ref("1");
const activeIndex2 = ref("1");
const { routerList } = useRouterListStore();
</script>

<style>
.el-menu {
  height: 100%;
  width: 100%;
  background: #545c64;
}
</style>