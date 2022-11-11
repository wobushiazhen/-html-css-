<template>
  <div class="user-list">
    <div class="user-body">
      <div>
        <el-table :data="listFliterDate" border style="width: 100%">
          <el-table-column type="index" label="序号" width="180" />
          <el-table-column prop="id" label="用户id" width="180" />
          <el-table-column prop="adminName" label="用户名" width="180" />
          <el-table-column prop="role" label="权限">
            <template #default="scope">
              <el-tag :type="scope.row.role === '超' ? '' : 'success'"
                >{{ scope.row.role }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="400" />
          <el-table-column label="状态">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)"
                >在线</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer-parger" v-show="userList">
      <el-pagination
        :total="userList?.length"
        v-model:current-page="page"
        :page-size="pageSize"
        layout="total,prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import { getUserList } from "@/api/user.js";
import { computed, onMounted, ref } from "vue";
const userList = ref();
const date = new Date();

//分页器数据
const page = ref(1);
const pageSize = ref(10);

//请求数据封装
function filterData() {
  getUserList()
    .then((res) => {
      userList.value = res.data;
      for (var i = 0; i < userList.value?.length; i++) {
        userList.value[i].createTime = date;
      }
      if (userList.value.length) {
        ElMessage({
          showClose: true,
          message: "获取成功",
          type: "success",
        });
      }
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: "获取失败",
        type: "error",
      });
    });
}

//挂载拿数据
onMounted(() => {
  filterData();
});

//分页计算
const listFliterDate = computed(() => {
  return userList.value?.slice((page.value - 1) * 10, page.value * 10);
});

</script>

<style scoped>
.user-list {
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
.footer-parger {
  padding: 0 15px;
  margin-top: 10px;
}
</style>