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
          <!-- :filter-node-method="filterNode"
             :props="defaultProps"
          -->
          <el-tree
            ref="treeRef"
            class="filter-tree"
            show-checkbox
            :data="getRoutes"
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
import { ref, onMounted, computed, reactive } from "vue";
import { useRouterListStore } from "@/store/routes.js";
const { getRoutes } = useRouterListStore();

//用户列表数据
const userList = ref();
//选中的名字
const changeNames = ref([]);
//树形组件
// const filterText = ref('')
const treeRef = ref("");
//选中的权限的数据
const treeData = ref([]);

// 验证字段
const formRef = ref();
const validateForm = reactive({
  userName: "",
});

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
function handleReset() {
  if (!changeNames.value.length) {
    ElMessage({
      showClose: true,
      message: "请选择用户",
      type: "error",
    });
  }
  console.log(changeNames);
  let checkedNodes = treeRef.value?.getCheckedNodes();
  checkedNodes = checkedNodes.map((item) => {
    return item.name;
  });
}

//确认按钮
const handleAdd = async () => {
  console.log(treeRef.value?.getCheckedNodes());
  treeData.value = await treeRef.value?.getCheckedNodes();
  treeData.value.map((item) => {
    console.log(item.path);
  });
};
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

//算出权限
const roleData = computed(() => {
  treeData.value.map((item) => {
    console.log(item.path);
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

.el-tree {
  margin: 20px 0px;
}
</style>
