
<!-- 需要传总数目 -->
<template>
    <el-pagination
      :hide-on-single-page="value"
      :total="length"
      v-model:current-page="page"
      :page-size="pageSize"
      layout="total,prev, pager, next"
    />
</template>

<script setup>

// 这些都不需要，转一个总长度
import { onMounted, ref,defineProps } from "vue";

const value = ref(false);
const totol=defineProps({
  length,
  page:{
    default:1
  }
})

// const listFliterDate = computed(() => {
//   return list.value?.slice((page.value - 1) * 10, page.value * 10);
// });
const page=ref(1)
const pageSize=ref(10)
</script>