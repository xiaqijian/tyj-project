<template>
  <div class="hello">
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="课程">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="选择学科">
    <el-select v-model="form.region" placeholder="选择学科">
      <el-option v-for="item in uid" :label="item.sname" :value="item.sid"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
var qs = require('qs')
export default {
  name: 'login',
  data () {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        uid:[]
    }
  },
  mounted () {
    let that = this;
    this.$axios.get('api/tianyujiat/sub!query.action')
        .then((res) => {
            console.log(res.data)
            console.log(typeof res.data)
            that.uid = res.data;
            console.log(33)
            // that.$set('uid',res.data)
            // console.log(typeof that.uid)

        })
        .catch((err) => {
            console.log(err)
        })
  },
  methods: {
      onSubmit () {
        let that = this
         console.log(this.inputtext)
        //  let data = {

        
        //      params: {
        //        'user.username':that.inputtext.name,
        //        'user.password':that.inputtext.password
        //      }
            
        //   }
        //  console.log(data)
        //  that.$axios.get('http://192.168.253.2:8080/tianyujiat/uuu!sss.action',data)
        //     .then((res) => {
            
        //     console.log(res)
        // })
        //  that.$axios.post('http://192.168.253.2:8080/tianyujiat/uuu!sss.action',{
        //     'user.username': 'admin',
        //     'user.password': '123'
        // }).then((res) => {
        //             console.log(res)
        //  }).catch(function (error) {
        //     console.log(error);
        // });
        let name = that.form.name;
        let sid = that.form.region;
        that.$axios({
            method: 'post',
            url: 'api/tianyujiat/book!addBook.action',
            data: qs.stringify({
                'book.bname':name,
               'book.sid':sid
            }),
             headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                console.log(res)
                that.$alert('添加成功', '添加', {
                  confirmButtonText: '确定',
                  callback: action => {
                    that.$router.go(0)
                  }
                });
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
