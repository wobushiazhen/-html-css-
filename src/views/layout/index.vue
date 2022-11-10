<template>
  <div class="layout">
    <div class="layout-left">
      <layoutLeftVue></layoutLeftVue>
    </div>
    <div class="layout-right">
      <div class="layout-right-header">
        <layoutheaderVue></layoutheaderVue>
      </div>
      <div class="layout-right-body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup>
import layoutLeftVue from './components/layout-left.vue';
import layoutheaderVue from './components/layout-header.vue';
</script>

<style scoped lang="scss">
.layout{
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  &-left{
    height: 100%;
    overflow: hidden;
    // width: 200px;
  }
  &-right{
    flex: 1;
  }
}
</style>
