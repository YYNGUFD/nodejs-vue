
<template>
  <div>
    <h1>{{ id ?"编辑":"新建"}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" placeholder="请选择文章分类" multiple>
          <el-option v-for="item in categories " :label="item.name" :key="item._id" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
       </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor"; 
 export default {
   components:{
      VueEditor
   },
   props:{
     id:String, //和路由尽可能结偶
   },
   data(){
    return {
     model:{} ,
     categories:[],
    }
   },
   created(){
     this.fetchCatgorise();
     this.id && this.fetch()

   },
   methods:{
     async save(){
       let res ;
       console.log(this.model);
       res;
       if(this.id){ 
          res = await this.$http.put('/admin/rest/articles/'+this.id,this.model);
       }else{
          res =  await this.$http.post('/admin/rest/articles',this.model);
       }
       if(res)
      this.$router.push('/articles/list')
      this.$message({
        type:'success',
        message:"保存成功",
      })
     },
     async fetchCatgorise(){
        const res =await this.$http.get('/admin/rest/categories/parent-options')
        this.categories = res.data;
     },
     async fetch(){
     var res =   await this.$http.get('/admin/rest/articles/'+this.id);
     console.log(res.data)
       this.model = res.data;
     },
     //自定义图片上传器
     async handleImageAdded(file, Editor, cursorLocation, resetUploader){
        var formData = new FormData();
        formData.append("file", file);
        var res =   await this.$http.post('/admin/upload',formData);
        let url = res.data.url; // Get url from response
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader(); 
     }
   }
  
}
</script>