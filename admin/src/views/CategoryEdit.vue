<template>
  <div>
    <h1>{{ id ?"编辑":"新建"}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择上级分类">
          <el-option v-for="item in parents " :label="item.name" :key="item._id" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name" placeholder="请输入名称"></el-input>
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
     this.fetchParents();
     this.id && this.fetch()

   },
   methods:{
     async save(){
       let res ;
       console.log(this.model);
       res;
       if(this.id){ 
          res = await this.$http.put('/admin/rest/categories/'+this.id,this.model);
       }else{
          res =  await this.$http.post('/admin/rest/categories',this.model);
       }
       if(res)
      this.$router.push('/categories/list')
      this.$message({
        type:'success',
        message:"保存成功",
      })
     },
     async fetchParents(){
        const res =await this.$http.get('/admin/rest/categories/parent-options')
        this.parents = res.data;
     },
     async fetch(){
     var res =   await this.$http.get('/admin/rest/categories/'+this.id);
     console.log(res.data)
       this.model = res.data;
     }
   }
  
}
</script>