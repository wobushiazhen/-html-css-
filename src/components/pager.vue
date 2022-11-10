
<!-- 需要传总数目 -->
<template>
  <div>
    <el-switch v-model="value" />
    <el-pagination
      :hide-on-single-page="value"
      :total="userList"
      v-model:current-page="page"
      :page-size="pageSize"
      layout="total,prev, pager, next"
    />
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import { getUserList } from "@/api/user.js";
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
const value = ref(false);
const userList = ref();
const page=ref(1)
const pageSize=ref(10)
function filterData() {
  getUserList()
    .then((res) => {
      userList.value = res.data.length;
    //   console.log(userList.value.length);
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: "获取失败",
        type: "error",
      });
    });
}

onMounted(() => {
  filterData();
});
</script>