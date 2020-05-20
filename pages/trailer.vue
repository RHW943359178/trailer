<template>
  <div class="m-container">
    <el-row class="m-header">
      <Header/>
    </el-row>
  </div>
</template>

<script>
import Header from '@/components/index/header/header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/index/index.scss';
</style>