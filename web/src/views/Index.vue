
 <template>
   <div>
     <div class="topbar bg-black py-2 px-4  d-flex ai-center">
         <img src="../assets/logo.png" alt="" height="30">
         <div class="pl-2 flex-1">
           <div class="text-white">王者荣耀</div>
           <div class="text-gray-1 fs-xxs">团队成就更多</div>
         </div>
         <button type="button" class="btn bg-primary">立即下载</button>
     </div>
     <div class=" bg-primary pt-3 pb-2">
       <div class="nav d-flex text-white jc-around nav-inverse">
          <div class="nav-item active">
            <router-link class="nav-link" to="/" tag="span">首页</router-link>
          </div> 
          <div class="nav-item">
            <router-link class="nav-link" to="/about" tag="span">攻略中心</router-link> 
          </div>
           <div class="nav-item">
            <router-link class="nav-link" to="/about" tag="span">赛事中心</router-link> 
          </div>
       </div>   
     </div>
     <router-view></router-view>
   </div>
 </template>
 <script>
 export default {
   data(){
     return{
       
     }
   }
 }
 </script>
 <style lang="less" scoped>
 .topbar{
   position: sticky;
   top: 0;
   z-index: 999;
   
 }
 
 </style>
