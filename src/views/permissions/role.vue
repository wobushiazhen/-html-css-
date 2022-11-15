<template>
  <div id="role">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-input v-model="filterText" placeholder="选择一个用户" />
      <el-tab-pane label="页面权限" name="pageRole">
        <el-tree
          ref="treeRef"
          class="filter-tree"
          show-checkbox
          :data="getRoutes"
          :props="defaultProps"
          :filter-node-method="filterNode"
        />
      </el-tab-pane>
      <el-tab-pane label="按钮权限" name="buttonRole">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref,watch } from "vue";
import { useRouterListStore } from "@/store/routes.js";
const { getRoutes } = useRouterListStore();
console.log(getRoutes);
//树形组件
// const filterText = ref('')
const treeRef = ref('')
const defaultProps = {
  children: 'children',
  label: 'label',
}

//默认页面
const activeName = ref("pageRole");


</script>


<style setup>
#role {
  /* width: 100%; */
  padding: 20px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.user-body {
  flex: 1;
}
</style>