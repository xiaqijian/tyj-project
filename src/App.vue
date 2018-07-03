<template>
  <div id="app">
    <indexnav v-show="loginkey"></indexnav>
    <router-view/>
  </div>
</template>

<script>
import indexnav from './components/nav'

export default {
  name: 'App',
  data () {
    return {
      loginkey: 'false'
    }
  },
  mounted() {
    console.log(44444)
    let loginkey = window.localStorage.getItem('userkey')
    this.loginkey = loginkey;
    if (!loginkey) {
        console.log(55555)
        this.$router.push({ path: 'login' })
      }
  },
  watch: {
  '$route' (to, from) {
      console.log(to)
      let loginkey = window.localStorage.getItem('userkey')
      this.loginkey = loginkey;
      if (!loginkey) {
        console.log(55555)
        this.$router.push({ path: 'login' })
      }
      console.log('22222222222222222222')
      console.log(loginkey)
    }
  },
  components: {
    indexnav
  }
}
</script>

<style>
#app {
  width:100%;
  height:100%;
}
body {
  height: 100%;
}
html {
  height: 100%;
}
</style>
