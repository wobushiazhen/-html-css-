<template>
    <div>
        <el-button  @click="open2">message</el-button>
    </div>
</template>
<script setup>
 function open2() {
  ElMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
</script>