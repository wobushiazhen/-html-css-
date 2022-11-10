<template>
  <div class="layout-header">
    <div class="layout-header-left">
      <div class="layout-header-left-icon">
        <el-icon size="28" v-if="!isOpen" @click="isOpen = !isOpen"
          ><Fold
        /></el-icon>
        <el-icon size="28" v-if="isOpen" @click="isOpen = !isOpen"
          ><Expand
        /></el-icon>
      </div>
      <!-- 面包屑，后面在封装 -->
      <!-- :to="{ path:item.path }"  能跳转 -->
      <div class="layout-header-left-bc">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :key="item.path" v-for="item in breadList">{{
            item.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="layout-header-right">
      <!-- 全屏 -->
      <Screenfull></Screenfull>
      <!-- 我的中心 -->
      <headPortrait />
    </div>
  </div>
</template>

<script>
export default {
  name: "layout-header",
};
</script>

<script setup>
import { ref, watch, computed, onMounted, watchEffect } from "vue";
import { useRouterListStore } from "@/store/routes.js";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import Screenfull from "./screenfull.vue";
import headPortrait from "./headPortrait.vue";
const { isOpen } = storeToRefs(useRouterListStore());
const { getRoutes } = useRouterListStore();

//面包屑封装
//路由集合
const route = useRoute();
const breadList = ref([]);

watchEffect(() => {
  breadList.value = route.matched;
  breadList.value.filter(
    (item) => {
      return item.name;
    },
  );
});
</script>

<style scoped lang="scss">
.layout-header {
  box-sizing: border-box;
  width: 100%;
  padding: 0 5px;
  height: 48px;
  background: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(235, 235, 235);
  color: rgb(135, 132, 132);
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
.layout-header-left-icon > .el-icon {
  margin-top: 4.5px;
  padding: 0 15px 0 0;
  cursor: pointer;
}
headPortrait {
  width: 20px;
}
</style>