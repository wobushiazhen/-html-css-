<template>
  <div class="upload">
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="http://localhost:3000/upload"
      :on-change="handleChange"
    >
      <el-button type="primary">点击上传文件</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    <el-button @click="handleDownLoad" icon="Download" type="info"
      >下载Excel</el-button
    >
    <el-button @click="print" type="info">打印</el-button>
    <div>
      <tables
        id="my-table"
        ref="tableRef"
        :initalData="initalData.data"
        :cols="cols"
      ></tables>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { upLoad, getUpLoad } from "@/api/upload";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import tables from "@/components/table.vue";
const fileList = ref([]);
const initalData = ref([]);
const tableRef = ref([]);
const cols = ref([
  { label: "文件名", prop: "name" },
  { label: "uid", prop: "uid" },
  { label: "文件大小", prop: "size" },
  { label: "百分比", prop: "percentage" },
  { label: "操作" },
]);
const handleChange = async (params) => {
  // fileList.value = fileList.value.slice(1)
  await upLoad(params);
  await getUpLoadData();
};
function getUpLoadData() {
  getUpLoad()
    .then((res) => {
      initalData.value = res;
    })
    .catch((err) => {
      console.log(err);
    });
}
//导出
function handleDownLoad() {
  var wb = XLSX.utils.table_to_book(document.querySelector("#my-table")); //关联dom节点
  /* get binary string as output */
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], {
        type: "application/octet-stream",
      }),
      "文件.xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  return wbout;
}

function print() {
  const content = document.getElementById("my-table").innerHTML;
  window.print();
}
onMounted(() => {
  getUpLoadData();
});

const filterData = computed(() => {
  initalData.value.filter((item) => {
    return item.percentage > 0;
  });
});
</script>

<style scoped>
.upload {
  padding: 20px;
}
</style>
