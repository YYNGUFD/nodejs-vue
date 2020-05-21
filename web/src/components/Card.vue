<!--
 * @Author: MaFengyan
 * @Date: 2020-02-23 13:04:08
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-24 21:06:59
 * @Description: 

 -->
 <template> 
     <div class="card p-2 pt-3 bg-white mt-3">
      <div class="card-header d-flex ai-center " 
      :class="{'border-bottom':!plain,'pb-3':!plain}">
        <span class="iconfont  text-primary" :class="icon"></span>
         <div class="fs-xl flex-1 px-2"><strong>{{title}}</strong></div>
         <span class="iconfont icon-gengduo" v-if="!plain"></span>
      </div>
      <div class="card-body pt-3">
        <slot ></slot>
      </div>
    </div> 
 </template>
 <script>
 export default {
   props:{
     title:String,
     icon:String,
     plain:{type:Boolean,default:false}
   },
   data(){
     return{

     }
   }
 }
 </script>
 <style lang="less" scoped>
@import url('../style/varibles.less');
 .card{
   
    border-bottom: 1px solid @border-color; 
  

 }
 
 </style>
