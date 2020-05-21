<template>
  <div>
    <h1>{{ id ?"编辑":"新建"}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="广告">
          <el-button  @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告信息</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
              <el-col :md="24"  v-for="(item,index) in model.items" :key="index">
                <el-form-item label="广告介绍" style="margin-top:2px">
                  <el-input v-model="item.title"></el-input>
                </el-form-item>
                 <el-form-item label="链接" style="margin-top:2px">
                  <el-input  v-model="item.url"></el-input>
                </el-form-item>
                <el-form-item label="图标" style="margin-top:2px">
                  <el-upload
                    class="avatar-uploader "
                    :action="$http.defaults.baseURL+'/admin/upload'"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res=>item.image =res.url"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="item.image" :src="item.image" class="avatar avatar-icon">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <el-button type="danger" size="samll" 
                   @click="model.skills.splice(index,1)" 
                  >删除</el-button>
                </el-form-item>
        
                 
              </el-col>
          </el-row>
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
     model:{
       items:[],
     } , 
    }
   },
   created(){ 
     this.id && this.fetch()

   },
   methods:{
     async save(){
       let res ;
       console.log(this.model);
       res;
       if(this.id){ 
          res = await this.$http.put('/admin/rest/ads'+this.id,this.model);
       }else{
          res =  await this.$http.post('/admin/rest/ads',this.model);
       }
       if(res)
      this.$router.push('/ads/list')
      this.$message({
        type:'success',
        message:"保存成功",
      })
     },
     
     async fetch(){
     var res =   await this.$http.get('/admin/rest/ads/'+this.id);
     this.model = Object.assign({},this.model,res.data);
   
     },
     handleAvatarSuccess(res) { 
        //根据数据响应式
        this.$set(this.model,'avatar',res.url);
      },
      successImage(res,index){
        this.$set(this.model.items[index],'image',res.url);
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