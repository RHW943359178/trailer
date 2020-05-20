<template>
  <div class="m-header">
    <div class="m-header-container">
      <el-col :span="4">
        <Logo/>
      </el-col>
      <el-col :span="15">
        <Navigator/>
      </el-col>
      <el-col :span="5"></el-col>
    </div>
  </div>
</template>

<script>
import Logo from './logo'
import Navigator from './navigator'
export default {
  components: {
    Logo,
    Navigator
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>