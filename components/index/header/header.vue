<template>
  <div class="m-header">
    <div class="m-header-container">
      <el-col :span="4">
        <Logo/>
      </el-col>
      <el-col :span="15">
        <Navigator/>
      </el-col>
      <el-col :span="5">
        <User/>
      </el-col>
    </div>
  </div>
</template>

<script>
import Logo from './logo'
import Navigator from './navigator'
import User from './user'
export default {
  components: {
    Logo,
    Navigator,
    User
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/public/header/index.scss';
</style>