<template>
  <div class="goods-list">
    <div class="goods-body">
      <el-input
        v-model.trim="search"
        style="margin-bottom: 3px"
        @keyup.enter="onSearch"
        placeholder="搜索商品"/>
      <el-button @click="listAdd">
          添加
      </el-button>
      <el-button @click="filterDate">
        <el-icon>
          <Refresh />
        </el-icon>
      </el-button>
      <el-table
        :data="listFliterDate"
        :default-sort="{ prop: 'categore', order: 'descending' }"
        border
        style="width: 100%"
        height="600"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="id" label="商品编号" width="100" />
        <el-table-column prop="categore" label="商品类别" sortable width="120">
          <template #default="scope">
            <el-popover
              effect="light"
              trigger="hover"
              placement="top"
              width="auto"
            >
              <template #default>
                <div style="text-align: center; font-weight: 800">商品类别</div>
                <div>{{ cetegores }}</div>
                <div style="text-align: center; font-weight: 800">
                  {{ cetegores[scope.row.categore] }}
                </div>
              </template>
              <template #reference>
                <el-tag>{{ cetegores[scope.row.categore] }}</el-tag>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="照片" prop="img" width="230">
          <template #default="scope">
            <img class="imgS" :src="scope.row.img" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="商品名称" />
        <el-table-column prop="price" label="价格" width="120" />
        <el-table-column prop="count" label="库存" sortable width="120" />
        <el-table-column label="地区" prop="area" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
            <!-- <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button> -->
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
    <div class="footer-parger" v-show="listFliterDate?.length">
      <el-pagination
        :total="list?.length"
        v-model:current-page="page"
        :page-size="pageSize"
        layout="total,prev, pager, next"
      />
    </div>
  </div>
</template>
<script setup>
import { getGoods, getSearchGoodsList, delGood } from "@/api/goods.js";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";

const router=useRouter()
const list = ref();
const search = ref("");
//分页器
const page = ref(1);
const pageSize = ref(10);
let cetegores = ref([
  "服装",
  "家电",
  "母婴",
  "家居日用",
  "化妆品",
  "文体",
  "数码",
  "鞋包",
  "汽车挂件",
]);

//获取数据封装
function goodList() {
  getGoods()
    .then((res) => {
      list.value = res.data;
      if (list.value.length) {
        ElMessage({
          showClose: true,
          message: "获取成功",
          type: "success",
        });
      }
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        message: "获取失败",
        type: "error",
      });
    });
}

//搜索
function onSearch() {
  if (search.value.length == 0) {
    return;
  }
  getSearchGoodsList(search.value)
    .then((res) => {
      console.log(res.data);
      list.value = res.data;
      if (list.value.length) {
        ElMessage({
          showClose: true,
          message: "获取成功",
          type: "success",
        });
      }
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        message: "获取失败",
        type: "error",
      });
    });
}

function filterDate() {
  goodList();
}

//删除
function handleDelete(row) {
  // let id = ;
  delGood(row?.id)
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

//添加按钮
function listAdd(){
  router.replace('add')
}
//
onMounted(() => {
  goodList();
});

//分页计算
const listFliterDate = computed(() => {
  return list.value?.slice((page.value - 1) * 10, page.value * 10);
});
</script>

<style setup>
.imgS {
  width: 100px;
  height: 92px;
}

.goods-list {
  /* width: 100%; */
  padding: 20px;
  flex: 1;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

.goods-body {
  flex: 1;
}

.footer-parger {
  padding: 0 15px;
  margin-top: 10px;
}

.el-input {
  width: 300px;
  float: right;
}
</style>