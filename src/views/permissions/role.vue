<template>
  <div id="role">
    <!-- @tab-click="handleClick" -->
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-select
        v-model="changeNames"
        multiple
        placeholder="选择用户"
        style="width: 240px; margin: 30px 0px"
      >
        <el-option
          v-for="item in adminNameList"
          :key="item.value"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-tab-pane label="页面权限" name="pageRole">
        <div class="roleList">
          <h3>选择页面权限</h3>
          <el-tree
            ref="treeRef"
            class="filter-tree"
            show-checkbox
            :data="getRoutes"
            :props="defaultProps"
            :filter-node-method="filterNode"
          />
          <el-button size="small" @click="handleAdd">确认</el-button>
          <el-button size="small" @click="handleReset">重置</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="按钮权限" name="buttonRole">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { getUserList } from "@/api/user.js";
import { ref, watch, onMounted, computed } from "vue";
import { useRouterListStore } from "@/store/routes.js";
const { getRoutes } = useRouterListStore();

//用户列表数据
const userList = ref();
//选中的名字
const changeNames = ref([]);
//树形组件
// const filterText = ref('')
const treeRef = ref("");

const defaultProps = {
  children: "children",
  label: "label",
};


//选中的页面权限
const selectedData = ref([]);

//默认选中页面
const activeName = ref("pageRole");

//用户数据
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
    })
    .finally(() => {});
}

//重置
function handleReset(){
    console.log(111);
    // selectedData.value=treeRef.value?.getCheckedKeys()
    treeRef.value=['']
}

onMounted(() => {
  filterDate();
  //   console.log(userList.value.data);
});

//过滤用户数据中的姓名
const adminNameList = computed(() => {
  return userList.value?.map((item) => {
    return item?.adminName;
  });
});

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
.roleList {
  width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
}
.el-tree{
    margin: 20px 0px;
}
</style>