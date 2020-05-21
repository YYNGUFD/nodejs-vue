<!--
 * @Author: MaFengyan
 * @Date: 2020-02-20 15:07:29
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-20 16:07:55
 * @Description: 
 -->
<template>
  <div>
    <h1>{{ id ?"编辑":"新建"}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
        
      <el-form-item label="姓名">
        <el-input v-model="model.username" placeholder="请输入名称"></el-input>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="model.password" placeholder="请输入名称"></el-input>
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
     parents:[],
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
          res = await this.$http.put('/admin/rest/admin_users/'+this.id,this.model);
       }else{
          res =  await this.$http.post('/admin/rest/admin_users',this.model);
       }
       if(res)
      this.$router.push('/admin_users/list')
      this.$message({
        type:'success',
        message:"保存成功",
      })
     }, 
     async fetch(){
     var res =   await this.$http.get('/admin/rest/admin_users/'+this.id);
     console.log(res.data)
       this.model = res.data;
     }
   }
  
}
</script>