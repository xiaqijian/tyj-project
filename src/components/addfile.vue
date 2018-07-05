<template>
  <div class="hello">
      <el-upload
  class="upload-demo"
  ref="upload"
  action="api/ExcelAction!importExcel.action"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<div class="file">
<el-row>
  <el-button type="success" @click="download">下载表格</el-button>
</el-row>
</div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      download () {
         console.log('dddddd')
         let that = this;
          this.$axios({
                method: 'get',
                url: 'api/tianyujiat/ExcelAction!exportExcel.action',
                responseType: 'blob'
            }).then((data) => {
                console.log(data)
                if (!data) {
                    return
                }
                var blob = new Blob([data.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                let url = window.URL.createObjectURL(blob)
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', 'excel.xls')
                
                document.body.appendChild(link)
                link.click()
            }).catch((error) => {
                console.log(error)
            })
      }
    }
  }
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
