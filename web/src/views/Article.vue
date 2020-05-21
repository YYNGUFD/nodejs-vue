 
 <template>
   <div class="page-article bg-white" v-if="model">
     <div class="d-flex py-3 px-2 border-bottom" >
      <div class="iconfont icon-fanhui text-blue"></div>
      <strong class="flex-1 text-blue pl-2"> 
       {{model.title}}
      </strong>
      <div class="text-gray fs-xs">
       {{model.createdAt|data}}
      </div>
     </div>
     <div class="model-body p-3 body" v-html="model.content"> </div>
     <div class="px-3 border-top py-2"  >
       <div class="d-flex ai-center">
         <i class="iconfont icon-caidan1"></i>
         <strong class="text-blue fs-lg ml-1">相关咨询</strong>
       </div>
       <div class="pt-2 fs-lg">
         <router-link tag="div" v-for="(item,index) in model.related" :key="index"
         class="py-2 text-blue "
         :to="`/article/${item._id}`">
               {{item.title}}
         </router-link>
       </div>
     </div>
   </div>
 </template>
 <script>
import dayjs from 'dayjs'
export default {
  filters:{
    data(val){
        return dayjs(val).format('MM/DD');
    }  
   },
   props:{
     id:{
       required:true,
     },
   },
   data(){
     return{
       model:null
     }
   },
   created(){
      this.fetch();
   },
   watch:{
    id(){
      this.fetch();
    }
   },
   methods:{
    async fetch(){
      const data=  await  this.$http('/article/'+this.id);
      this.model = data.data;
    }
   }
 }
 </script>
<style lang="less" scoped>
.page-article {
  .body{
     img{
       max-width: 100%;
       height: auto;
     }
     iframe{
       width: 100%;
       height: auto;
     }
  }
}

</style>