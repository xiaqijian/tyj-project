<template>
  <div class="hello">
    <table class="table">
      <caption>Optional table caption.</caption>
      <thead>
        <tr>
          <th>id</th>
           <th>用户</th>
             <th>课程名称</th>
          <th>书名</th>
          <th>删除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td>{{item.uid}}</td>
          <td @click="updateUser(item.uid, item.uname)">{{item.uname}}</td>
          <td @click="updateSub (item.sid, item.sname) ">{{item.sname}}</td>
          <td>{{item.bname}}</td>
          <td @click="dele(item.sid)" :data-uid="item.sid">
             <el-row>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-row>
          </td>
            
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
var qs = require('qs')
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      items:[]
    }
  },
  mounted () {
    let that = this;
    that.$axios.get('api/tianyujiat/entry!queryAll.action')
     .then((res) => {
       that.items = res.data;
       console.log(res.data)
     })
  },
  methods: {
    updata () {
      let that = this;
      that.$axios.get('api/tianyujiat/entry!queryAll.action')
      .then((res) => {
        that.items = res.data;
        console.log(res.data)
      })
    },
    updateSub (id, name) {
        let that = this
        this.$prompt('请输入新的课程名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          that.$axios.post('api/tianyujiat/sub!updateSub.action', qs.stringify({
                // 'subject.sid': uid
                "subject.sid": id,
                "subject.sname": value
            }))
            .then( (val) => {
               console.log(val)
              that.$message({
                type: 'success',
                message: '新的课程名称: ' + value
              });
             
              that.updata()
            })
            .catch((err) => {
              console.log(err)
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      console.log(id, name)
    },
    updateUser (id, name) {
      console.log('更新用户')
      // user.uid,user.password
      let that = this
        this.$prompt('你这正修改用户' + name + '的密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          that.$axios.post('api/tianyujiat/entry!updateUser.action', qs.stringify({
                // 'subject.sid': uid
                "user.uid": id,
                "user.upassword": value
            }))
            .then( (val) => {
               console.log(val)
              that.$message({
                type: 'success',
                message: '新的密码: ' + value
              });
             
              that.updata()
            })
            .catch((err) => {
              console.log(err)
            })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      console.log(id, name)
    },
    dele (id) {
      console.log(id)
       let that = this;
       let uid = id;
        that.$axios({
            method: 'post',
            url: 'api/tianyujiat/sub!deleteSub.action',
            data: qs.stringify({
                'subject.sid': uid
            }),
             headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
               that.$message('删除成功');
               that.getdata()
                console.log(res)
            })
    },
    getdata () {
      let that = this;
    that.$axios.get('api/tianyujiat/entry!queryAll.action')
     .then((res) => {
       that.items = res.data;
       console.log(res.data)
     })
    }
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
