<!-- 分页器未完成 -->

<template>
  <div class="user-list">
    <div class="user-body">
      <el-table :data="listFliterDate" border style="width: 100%">
        <el-table-column prop="id" label="用户id" width="180" />
        <el-table-column prop="adminName" label="用户名" width="180" />
        <el-table-column prop="role" label="权限" />
        <el-table-column label="操作">
          <template #header>
            <el-input v-model.trim="search" style="margin-bottom: 3px;" @keyup.enter="onSearch" placeholder="搜索用户名" />
            <el-button @click="handleOpen">添加管理员</el-button>
            <el-button @click="filterDate">
              <el-icon>
                <Refresh />
              </el-icon>
            </el-button>
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 右边抽屉 -->
      <div>
        <el-drawer v-model="drawer">
          <template #title>
            <h4 v-if="handleType == 1">添加管理员</h4>
            <h4 v-else>更新管理员</h4>
          </template>
          <template #default>
            <el-form :model="drawerData" ref="formRef" label-width="120px" :rules="formRules">
              <el-form-item label="用户id" prop="id">
                <el-input disabled placeholder="id自动分配" v-model="drawerData.id" />
              </el-form-item>
              <el-form-item label="用户名" prop="adminName">
                <el-input  v-model="drawerData.adminName" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="drawerData.password">
                  <template v-if="handleType===2" #suffix>
                    <el-tooltip content="复制密码" placement="bottom" effect="light">
                      <el-icon @click="copy">
                        <CopyDocument />
                      </el-icon>
                    </el-tooltip>
                  </template>

                </el-input>

              </el-form-item>
              <el-form-item label="身份" prop="role">
                <el-select v-model="drawerData.role" placeholder="身份选择">
                  <el-option value="管理员" label="管理员" />
                  <el-option value="超级管理员" label="超级管理员" />
                </el-select>
              </el-form-item>
            </el-form>
          </template>
          <template #footer>
            <el-button v-if="handleType === 1" @click="handleAdd">添加</el-button>
            <el-button v-else @click="handleEditConfirm" :rules="formRules">更新</el-button>
          </template>
        </el-drawer>
      </div>
    </div>
  </div>
  <div class="footer-parger" v-show="listFliterDate?.length">
    <el-pagination :total="userList?.length" v-model:current-page="page" :page-size="pageSize"
      layout="total,prev, pager, next" />
  </div>
</template>

<script>
export default {
  name: "user-list",
};
</script>

<script setup>
// import { useRouterListStore } from '@/store/routes.js'
import { useUserListStore } from "@/store/userList.js";
import parger from "@/components/pager.vue";
import { computed, onMounted, reactive, ref, } from "vue";
//可复制
import clipboard3 from 'vue-clipboard3'
import {
  getUserList,
  delUserList,
  addUserList,
  editUserList,
  getSearchUserList,
} from "../../api/user.js";
import { storeToRefs } from "pinia";

const search = ref('')
const userList = ref(null);
const drawer = ref(false);
const formRef = ref();
const handleType = ref(1);
const { useUserList } = storeToRefs(useUserListStore());

//可复制
const { toClipboard } = clipboard3()
const copy = async () => {
  try {
    await toClipboard(drawerData.password);
    ElMessage({
      showClose: true,
      message: "复制成功",
      type: "success",
    });
  } catch (error) {
    console.log('复制失败');
  }
}

//分页器
const page = ref(1);
const pageSize = ref(10);

//
const drawerData = reactive({ id: null, adminName: "", password: '', role: [] });
const formRules = reactive({
  adminName: [{ required: true, message: "请填写" }],
  password: [{ required: true, message: "请填写" }],
  role: [{ required: true, message: "请填写" }],
});
//获取用户信息
function filterDate() {
  getUserList()
    .then((res) => {
      userList.value = res.data;
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
    }).finally(() => {

    })
}

// 删除
function handleDelete(row) {
  delUserList(row.id)
    .then((res) => {
      console.log("删除成功！");
      filterDate();
      ElMessage({
        showClose: true,
        message: "删除成功",
        type: "success",
      });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: "删除失败",
        type: "error",
      });
    });
}

//搜索
function onSearch() {
  if (search.value.length == 0) {
    return
  }
  getSearchUserList(search.value).then((res) => {
    console.log(res.data);
    userList.value = res.data
  }).catch(() => {

  })
}

//编辑
function handleEdit(row) {
  handleType.value = 2;
  drawerData.id = row.id;
  drawerData.adminName = row.adminName;
  drawerData.password = row.password;
  drawerData.role = row.role;
  drawer.value = true;
}

//更新按钮
function handleEditConfirm() {
  editUserList(drawerData.id, drawerData)
    .then(() => {
      ElMessage({
        showClose: true,
        message: "修改成功",
        type: "success",
      });
      filterDate();
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        message: "修改失败",
        type: "error",
      });
    });
}

//点击打开添加右侧抽屉
function handleOpen() {
  ((drawerData.id = null), (drawerData.adminName = ""), (drawerData.password = ""), (drawerData.role = ''));
  drawer.value = true;
  handleType.value = 1;
}
//添加数据
async function handleAdd() {
  try {
    await formRef.value.validate();
    addUserList(drawerData)
      .then(() => {
        console.log("添加成功");
        ElMessage({
          showClose: true,
          message: "添加成功",
          type: "success",
        });
        filterDate();
      })
      .catch((err) => {
        console.log("添加失败");
        ElMessage({
          showClose: true,
          message: "添加失败",
          type: "error",
        });
      });
  } catch { }
}

//分页计算
const listFliterDate = computed(() => {
  return userList.value?.slice((page.value - 1) * 10, page.value * 10);
});


//页面挂载是拿数据
onMounted(() => {
  filterDate();
});

</script>

<style scoped>
.user-list {
  /* width: 100%; */
  padding: 20px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: hidden;
  position: relative
}

.user-body {
  flex: 1;
}

.footer-parger {
  padding: 0 15px;
  margin-top: 10px;
  /* height: 10px; */
}
</style>