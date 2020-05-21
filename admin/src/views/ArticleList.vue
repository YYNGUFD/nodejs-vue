<!--
 * @Author: MaFengyan
 * @Date: 2020-02-20 10:54:34
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-20 11:40:35
 * @Description: 
 -->
<template>
  <div>
    <h1>分类列表</h1>
     <el-table  :data="tableData"   stripe  style="width: 100%">
      <el-table-column    prop="_id"   label="id"  width="230px"> </el-table-column>
      <el-table-column    prop="title" label="文章标题"   > </el-table-column>
       <el-table-column  fixed="right"  label="操作" width="100">
         <template slot-scope="scope">
           <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
           <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
     </el-table>
  </div>
</template>
<script>
 export default {
  data(){
    return {
     tableData:[],
    }
   }, 
   created(){
     this.init();
   },
   methods:{
    async init(){
       const data =await this.$http.get('/admin/rest/articles/')
       
       this.tableData = data.data;
     },
     handleClick(data){ 
       this.$router.push({path:'/articles/edit/'+data._id})
     },
     async deleteClick(data){
       let _this = this;
       _this.$confirm('是否要删除文章'+data.title+'?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
         await _this.$http.delete('/admin/articles/'+data._id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.init();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }

   }
}
</script>