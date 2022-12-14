<template>
  <div>
    <div>
      <el-table :data="listFliterDate"  border style="width: 100%">
        <el-table-column  type='index' label="序号"  width="80" />
        <el-table-column  v-for="item in cols" :prop="item.prop" :label="item.label" width="180" />
      </el-table>
      <el-pagination
        :total="tableData?.length"
        v-model:current-page="page"
        :page-size="pageSize"
        layout="total,prev, pager, next"
      />
    </div>
  </div>
</template>

<script setup>
import {computed,ref, defineProps} from 'vue'
const props=defineProps({
  initalData:Object,
  cols:Array
})

const page=ref(1)
const pageSize = ref(10);
const tableData=computed(()=>{
  return props.initalData?.filter((item)=>{
    return item.percentage;
  })
})
const listFliterDate = computed(() => {
  return tableData.value?.slice((page.value - 1) * 10, page.value * 10);
});
</script>