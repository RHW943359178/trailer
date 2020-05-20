<template>
  <div class="m-header-navigator">
    <ul>
      <router-link v-for="item in navigators" :key="item.id" active-class="active" tag="li" exact :to="item.url">{{ item.label }}</router-link>
    </ul>
    <div class="m-header-search">
      <el-input id="input" v-model="searchInfo" size="medium" @focus="focus" @blur="blur" placeholder="电影搜索"></el-input>
      <div id="search-btn" class="search-btn">
        <i class="el-icon-search"></i>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      navigators: [
        {id: 1, label: '首页', url: '/'},
        {id: 2, label: '预告片', url: '/trailer'},
        {id: 3, label: '看电影', url: '/movies'},
        {id: 4, label: '影评', url: '/comments'},
      ],
      activeType: 1,
      searchInfo: ''
    }
  },
  methods: {
    focus () {
      document.getElementsByClassName('m-header-search')[0].style.cssText = 'width:300px;transition:width 0.6s;'
      document.getElementsByClassName('search-btn')[0].style.cssText = 'background:#969696;border-radius:50%;color:#fff'
    },
    blur () {
      document.getElementsByClassName('m-header-search')[0].style.cssText = 'width:220px;transition:width 0.6s;'
      document.getElementsByClassName('search-btn')[0].style.cssText = 'background:none;border-radius:0;color:#606266'
    },
    liChange (val) {
      this.activeType = val
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/public/header/navigator.scss';
</style>
