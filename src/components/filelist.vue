<template>
  <div class="hello">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
  <div style="margin: 15px 0;"></div>
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
   <div>
       <el-row>
            <el-button type="success" @click="downfile">下载</el-button>
        </el-row>
   </div>
  </div>
</template>

<script>
//  const cityOptions = ['上海', '北京', '广州', '深圳'];
var qs = require('qs')
  export default {
    data() {
      return {
        checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: true
      };
    },
    mounted () {
      let that = this;
      this.$axios.get('api/FileUploadAction!queryFileName.action')
        .then((res) => {
          console.log(res.data)
        //   cityOptions = res.data;
          that.cities = res.data
        })
        .catch((err) => {
            console.log(err)
        })
    },
    methods: {
      handleCheckAllChange(val) {
        let cityOptions = this.cities
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        console.log(this.checkedCities)
      },
      downfile () {
          let val = this.checkedCities;
          let len = val.lenght;
          let that = this;
          if (len == 0) {
              return;
          }
          let sname = val.join(',');
          console.log(sname)
          that.$axios({
            method: 'post',
            url: 'api/FileUploadAction!DownloadFiles.action',
            data: qs.stringify({
                'filepath': sname,
               'filename':'哈哈哈'
            }),
            responseType: 'blob',
            }).then((data) => {
               console.log(data)
                console.log(data)
                if (!data) {
                    return
                }
                var blob = new Blob([data.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                let url = window.URL.createObjectURL(blob)
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'excel.zip')
                
                document.body.appendChild(link)
                link.click()
                
            })
            .catch((err) => {
                console.log(err)
            })
          console.log(val.length)
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.file {
  margin:40px;
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
  padding:30px;
  width:80%;
}
</style>
