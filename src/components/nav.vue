<template>
  <div id="indexnav">
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/">首页</el-menu-item>
  <el-menu-item index="adduser">添加用户</el-menu-item>
  <el-menu-item index="addsub">添加课程</el-menu-item>
  <el-menu-item index="addbook">添加书</el-menu-item>
  <el-menu-item index="file">文件</el-menu-item>
  <el-menu-item index="login" @click="loginout">退出</el-menu-item>
</el-menu>
</div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key)
        console.log(key, keyPath);
      },
      loginout () {
         window.localStorage.removeItem('userkey')
         this.$router.push({ path: '/login' })
      }
    }
  }
</script>
