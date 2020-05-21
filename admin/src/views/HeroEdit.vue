 
<template>
  <div>
    <h1>{{ id ?"编辑":"新建"}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
     <el-tabs type="border-card"  v-model="activeName" v-if="model">
      <el-tab-pane label="基本信息" name="base">
        <el-form-item label="名称">
          <el-input v-model="model.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="称号">
            <el-input v-model="model.title" placeholder="请输入名称"></el-input>
        </el-form-item>
         <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/admin/upload'"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="res=> $set(model, 'avatar', res.url)"
              :before-upload="beforeAvatarUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
             <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/admin/upload'"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="res=> $set(model, 'banner', res.url)"
              :before-upload="beforeAvatarUpload">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
         <el-form-item label="类型">
          <el-select v-model="model.categories" placeholder="请选择英雄类型" multiple>
            <el-option v-for="item of categories " :label="item.name" :key="item._id" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="model.scores">
        <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem" :max="9" show-score  v-model="model.scores.difficult" placeholder="请输入名称"></el-rate>
        </el-form-item>
        <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem" :max="9" show-score  v-model="model.scores.skills" placeholder="请输入名称"></el-rate>
        </el-form-item>
        <el-form-item label="攻击力">
            <el-rate style="margin-top:0.6rem" :max="9"  show-score v-model="model.scores.attack" placeholder="请输入名称"></el-rate>
        </el-form-item>
        <el-form-item label="生存力度">
            <el-rate style="margin-top:0.6rem" :max="9" show-score  v-model="model.scores.survive" placeholder="请输入名称"></el-rate>
        </el-form-item>
      </div>
        <el-form-item label="顺风出装">
          <el-select v-model="model.items1" placeholder="请选择英雄类型" multiple>
            <el-option v-for="item of items " :label="item.name" :key="item._id" :value="item._id"></el-option>
          </el-select>
         </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" placeholder="请选择英雄类型" multiple>
              <el-option v-for="item of items " :label="item.name" :key="item._id" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/admin/upload'"
              :show-file-list="false"
              :headers="getAuthHeaders()"
              :on-success="res => $set(model, 'banner', res.url)"
              :before-upload="beforeAvatarUpload">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
      </el-tab-pane> 
      <el-tab-pane label="技能" name='skills'>
        <el-button  @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
              <el-col :md="12"  v-for="(item,index) in model.skills" :key="index">
                
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                 <el-form-item label="冷却值">
                  <el-input v-model="item.delay"></el-input>
                </el-form-item>
                 <el-form-item label="消耗">
                  <el-input v-model="item.cost"></el-input>
                </el-form-item> 
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader "
                    :action="$http.defaults.baseURL+'/admin/upload'"
                    :show-file-list="false"
                    :headers="getAuthHeaders()"
                    :on-success="res=>$set(item, 'icon', res.url)"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="item.icon" :src="item.icon" class="avatar avatar-icon">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size="samll" 
                   @click="model.skills.splice(index,1)" 
                  >删除</el-button>
                </el-form-item>
              </el-col>
          </el-row>
      </el-tab-pane>
       <el-tab-pane label="最佳搭档" name='partners'>
        <el-button  @click="model.partners.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap">
              <el-col :md="12"  v-for="(item,index) in model.partners" :key="index">
              <el-form-item label="最佳搭档">
                <el-select filterable v-model="item.hero" placeholder="请选择英雄类型" >
                  <el-option v-for="item of heroes " :label="item.name" :key="item._id" :value="item._id"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>  
                 <el-form-item>
                  <el-button type="danger" size="samll" 
                   @click="model.partners.splice(index,1)" 
                  >删除</el-button>
                </el-form-item>
              </el-col>
          </el-row>
      </el-tab-pane>
       <el-form-item >
        <el-button type="primary" @click="save">提交</el-button>
      </el-form-item>
     </el-tabs>
      
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
      activeName:"base",
     model:{
      skills:[],
       score:{
         difficult:0,
         skills:0,
         attack:0,
         survive:0   
       },//多层级需要定义
       partners:[],
     } , 
     categories:[],
     items:[] ,
     heroes:[],
    }
   },
   created(){ 
     this.id && this.fetch()
     this.fetchCategories()
     this.fetchItem()
     this.fetchHero();

   },
   methods:{
     async fetchCategories(){
       //只需要英雄分类
       const data =await this.$http.get('/admin/rest/categories/')
       this.categories = Object.assign({},this.model,data.data);
     },
      async fetchItem(){
       //只需要英雄分类
       const data =await this.$http.get('/admin/rest/items/')
       this.items = Object.assign({},this.model,data.data);
     },
     async fetchHero(){
       const data =await this.$http.get('/admin/rest/heros');
       this.heroes = data.data;
    
     },
     async save(){
       let res ;  
       if(this.id){ 
          res = await this.$http.put('/admin/rest/heros/'+this.id,this.model);
       }else{
          res =  await this.$http.post('/admin/rest/heros',this.model);
       } 
       console.log(res)
      // this.$router.push('/heros/list')
      this.$message({
        type:'success',
        message:"保存成功",
      })
     }, 
     async fetch(){
        var res =   await this.$http.get('/admin/rest/heros/'+this.id);
        this.model = Object.assign({},this.model,res.data);
    
     },
     handleAvatarSuccess(res) { 
        //根据数据响应式
        this.$set(this.model,'avatar',res.url);
      }, 
      
      beforeAvatarUpload(file) {
        console.log(file)
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // } 
        // return isJPG && isLt2M;
      }

   }
  
}
</script>
<style lang="less" scoped>

  .avatar-icon{
    width: 100px;
    height: 100px;
    display: block;
  }
</style>