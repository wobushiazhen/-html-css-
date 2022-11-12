<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="30"> {{userName}} </el-avatar>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="giteeTo">仓库代码</el-dropdown-item>
        <el-dropdown-item @click="checkout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import {useUserInfoStore} from '@/store/userInfo.js'
import { useRouter } from 'vue-router';
const {adminName}=useUserInfoStore();
const router=useRouter();

const userName=localStorage.getItem('adminName')

function checkout(){
    localStorage.clear()
    router.replace('/login')
}
function giteeTo(){
    open('https://gitee.com/jane-is-a-fake/small-background-projects')
}
</script>

<style scoped>
.el-avatar {
  font-size: 12px;
  /* padding: 0 0px; */
  margin: 0 0 0 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.el-icon--right{
   font-size: 18px;
   /* line-height: 40px; */
}
</style>