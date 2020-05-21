 
 <template>
   <div>
     <el-card header="请先登录" class="login-card">
       <el-form label-width="60px" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
     </el-card>
   </div>
 </template>
 <script>
 export default {
   data(){
     return {
       model:{}
     }
   },
   methods:{
    async login(){
      console.log(this.model)
      var res = await this.$http.post('/admin/login',this.model);
      localStorage.token = res.data.token; //浏览器保存tokken
      this.$router.push("/")
      this.$message({
        type:"success",
        message:"登录成功"
      })
    }
   }
 }
 </script>
 <style lang="less">
 .login-card{
   width: 25em;
   margin:10em auto;
 }
   
 </style>
