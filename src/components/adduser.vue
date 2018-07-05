<template>
  <div class="hello">
      <form @submit.prevent="submit">
        <div class="form-group">
            <label for="exampleInputEmail1">name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="name" v-model="inputtext.name">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="inputtext.password">
        </div>
        <button type="submit" class="btn btn-success">添加用户</button>
        
    </form>
  </div>
</template>

<script>
var qs = require('qs')
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[],
      inputtext:{}
    }
  },
  mounted () {
    
  },
  methods: {
      submit () {
        let that = this
        let userdata = {
            "user.uname": "",
            "user.upassword": ""
        }
       
        console.log(this.inputtext)
        let adddata = this.inputtext
        userdata["user.uname"]=adddata.name;
        userdata["user.upassword"]=adddata.password;
        that.$axios({
            method: 'post',
            url: 'api/entry!addUser.action',
            data: qs.stringify(userdata),
             headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                console.log(res)
                that.$alert('添加成功', '添加用户', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.$router.push({ path: '/' })
                  }
                });
            })
      }
      // },
      // clicksub () {
      //    let that = this
      //    let data = {
      //        params: {
      //          'username':'admin',
      //          'password':'123'
      //        }
      //   }
      //   that.$axios.get('api/tianyujiat/entry!login.action',data)
      //   .then((res) => {
      //       console.log(res)
      //   })
      // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  padding:30px;
  width:80%;
}
</style>
