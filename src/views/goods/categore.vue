<template>
  <div class="goods-list">
    <div class="goods-body">
      <keep-alive>
        <el-tabs @tab-click="fn1" class="demo-tabs">
          <el-tab-pane
            :label="item"
            :name="item"
            v-for="(item, index) in cetegores"
            :key="index"
          >
            <el-table
              :data="list"
              :default-sort="{ prop: 'count', order: 'descending' }"
              border
              style="width: 100%"
              height="600"
            >
              <el-table-column type="index" label="序号" width="80" />
              <el-table-column prop="id" label="商品编号" width="100" />
              <el-table-column
                prop="categore"
                label="商品类别"
                sortable
                width="120"
              >
                <template #default="scope">
                  <el-popover
                    effect="light"
                    trigger="hover"
                    placement="top"
                    width="auto"
                  >
                    <template #default>
                      <div style="text-align: center; font-weight: 800">
                        商品类别
                      </div>
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
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </keep-alive>
    </div>
  </div>
</template>

<script setup>
import { getGoods, getCategoreGoodsList } from "@/api/goods.js";
import { ref, onMounted } from "vue";
const list = ref();

//默认选中
// const activeName = ref("家电");

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
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: "获取失败",
        type: "error",
      });
    });
}
//刷新
function filterDate() {
  goodList();
}

//菜单
function changeMenu(item) {
  console.log("11111", item);
}

function fn1(tab) {
  getCategoreGoodsList(tab.index)
    .then((res) => {
      list.value = res.data;
      if (!list.value.length) {
        return;
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

//

//页面加载拿数据
onMounted(() => {
  goodList();
  getCategoreGoodsList();
});
</script>

<style scoped>
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
</style>