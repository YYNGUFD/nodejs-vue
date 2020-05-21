<!--
 * @Author: MaFengyan
 * @Date: 2020-02-19 14:17:08
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-21 16:10:26
 * @Description: 
 -->
<template>
  <div>
    <h1>{{ id ?"编辑":"新建"}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/admin/upload'"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
       </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
 export default {
   props:{
     id:String, //和路由尽可能结偶
   },
   data(){
    return {
     model:{} , 
    }
   },
   created(){ 
     this.id && this.fetch()

   },
   methods:{
     async save(){
       let res ; 
       res;
       if(this.id){ 
          res = await this.$http.put('/admin/rest/items/'+this.id,this.model);
       }else{
          res =  await this.$http.post('/admin/rest/items',this.model);
       }
       if(res)
      this.$router.push('/items/list')
      this.$message({
        type:'success',
        message:"保存成功",
      })
     }, 
     async fetch(){
     var res =   await this.$http.get('/admin/rest/items/'+this.id);
     console.log(res.data)
       this.model = res.data;
     },
     handleAvatarSuccess(res) { 
        //根据数据响应式 
        this.$set(this.model,'icon',res.url);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        console.log(file)
        return isJPG && isLt2M;
      }

   }
  
}
</script>
<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>