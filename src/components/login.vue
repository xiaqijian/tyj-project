<template>
  <div class="hello">
      <form>
        <h2 class="loginh2">登录</h2>
        <div class="form-group">
            <label for="exampleInputEmail1">name</label>
            <el-input v-model="inputtext.name" placeholder="name"></el-input>
            
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
             <el-input v-model="inputtext.password" placeholder="password" type="password"></el-input>
        </div>
        
        <el-button
          type="primary"
          @click="submit" class="btn">
          login
        </el-button>
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
      inputtext:{
        name: '',
        password:''
      }
    }
  },
  mounted () {
    
  },
  methods: {
      submit () {
        let that = this
        console.log(this.inputtext)
        let name = this.inputtext.name;
        let password = this.inputtext.password;
        console.log(name+'***********'+password)
        if (name == "" || password == "") {
          console.log(9999)
          that.$alert('专业点哦，你都没填完整😂', '提示', {
                  confirmButtonText: '确定'
              });
          return;
        }
        const loading = this.$loading({
          lock: true,
          text: '登录中......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let config = {
            onUploadProgress: progressEvent => {
                var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                console.log('********hhhhhhhhhhhh'+complete)//进度值
                // this.jindu = complete
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        that.$axios({
            method: 'post',
            url: 'api/entry!login.action',
            data: qs.stringify({
                'user.uname':name,
               'user.upassword':password
            }),
             config
            }).then((res) => {
                console.log(res)
                let msg = res.data.message
                let  reslt = res.data.result
                var result = reslt ==="false" ? false : true;
                console.log('*******请求的结果*****')
                console.log(result);
                setTimeout(() => {
                    loading.close();
                    that.$alert(msg, '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        console.log(typeof result)
                        if(result) {
                          // console.log('2222222')
                          that.$router.push({ path: '/' })
                          window.localStorage.setItem('userkey', true)
                          window.localStorage.setItem('user', name)
                        }else {
                          // console.log(22221111)
                        }
                      }
                    });
                }, 500);
                
            }).catch((err) => {
              that.$alert('登录出错啦', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.$router.push({ path: '/login' })
                    
                  }
                });
            })
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  width: 400px;
  color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  margin-left: -200px;
}
.btn {
  width: 100%;
}
.hello {
  background: #303133;
  width:100%;
  height:100%;
  position:relative;
}
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
  
}
.loginh2 {
  text-align: center;
}
</style>
