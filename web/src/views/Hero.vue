import Tooltip from 'tooltip.js/dist/umd/tooltip.min.js';
<!--
 * @Author: MaFengyan
 * @Date: 2020-02-24 17:02:24
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-24 21:27:28
 * @Description: 
 -->
 <template>
   <div v-if="model">
    <div class="topbar bg-black py-2 px-4  d-flex ai-center">
         <img src="../assets/logo.png" alt="" height="30">
         <div class="px-2 flex-1 text-white">
           <span class="">王者荣耀</span>
           <span class="ml-2">攻略战</span>
         </div>
         <router-link to="/"  tag="div" class="text-gray-1 fs-xxs">更多英雄 &gt;</router-link>
     </div>
     <div class="top pt-4"  :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 d-flex h-100 flex-column jc-end">
        <div>{{model.title}}</div>
        <h2 class="py-2">{{model.name}}</h2> 
        <div >{{model.categories.map(v=>v.name).join("-")}}</div>
         <div class="d-flex jc-between pt-2 fs-sm">
          <div class="scores d-flex ai-center " v-if="model.scores">
            <span>难度</span>
            <span class="bage bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="bage bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="bage bg-dannger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="bage bg-primary">{{model.scores.survive}}</span>
          </div>
          <router-link  to="/" tag="div" class="fs-sm text-gray text-white">
            皮肤3&gt;
          </router-link>
         </div>
      </div>
     </div>
     <!-- end fo top -->
     <!-- begin of body -->
     <div >
       <div class="px-3 bg-white">
         <div class="nav d-flex jc-around pt-3 pb-2  border-bottom">
           <div class="nav-item active">
             <div class="na-link">英雄初试</div>
           </div>
           <div class="nav-item">
             <div class="na-link">进阶攻略</div>
           </div>
         </div>
       </div>
       <swiper>
         <swiper-slide>
           <div>
             <div class="p-3 bg-white border-bottom">
               <div class="d-flex">
                 <router-link tag="button" to="/" class="btn flex-1 btn-lg">
                  <i class="iconfont icon-caidan1 text-primary"></i>
                  英雄介绍视频
                </router-link> 
                <router-link tag="button" to="/" class="btn flex-1 btn-lg ml-2">
                  <i class="iconfont icon-caidan1 text-primary"></i>
                  英雄介绍视频
                </router-link>
               </div>
               <div class="skills mt-3">
                  <div class="d-flex jc-around">
                    <img 
                    @click="activeIndex=i"
                    class="icon"
                    :class="{active:i==activeIndex}"
                    :src="item.icon" alt="" v-for="(item,i) in model.skills" 
                    :key="i"
                    width="60"
                    height="60">
                  </div>
                  <div  v-if="currentSkills">
                    <div class="d-flex pt-4 pb-3">
                      <h3>{{currentSkills.name}}</h3>
                      <span class="text-gray-1 ml-4 fs-sm">
                        (冷却值：{{currentSkills.delay}}
                        消耗:{{currentSkills.cost}})
                      </span>
                    </div>
                    <p class="pb-2">{{currentSkills.description}}</p>
                    <div class="border-top py-1" v-if="currentSkills.tips">
                      <p class="text-gray-1 fs-sm">小提示：{{currentSkills.tips}}</p>
                    </div>
                  </div>
               </div>
             </div>
             <!-- skills -->
             <m-card plain="false" icon="icon-caidan1" title="出装推荐" class="items">
                <div class="fs-xl mb-2">顺风出装</div>
                <div class="d-flex jc-around text-center">
                  <div v-for="(item,i) in model.items1" :key="i">
                    <img :src="item.icon" alt="">
                    <div class="fs-sm mt-1">{{item.name}}</div>
                  </div>
                </div>
                <div class="border-bottom mt-3"></div>
                 <div class="fs-xl mb-2 mt-3">逆风出装</div>
                <div class="d-flex jc-around text-center">
                  <div v-for="(item,i) in model.items2" :key="i">
                    <img :src="item.icon" alt="">
                    <div class="fs-sm mt-1">{{item.name}}</div>
                  </div>
                </div>
             </m-card>
             <m-card plain="false"  icon="icon-caidan1" title="使用技巧"> 
                <p class="m-0 fs-sm">{{model.usageTips}}</p>
             </m-card>
             <m-card  plain="false"  icon="icon-caidan1" title="对抗技巧"> 
                <p class="m-0 fs-sm">{{model.battleTips}}</p>
             </m-card>
             <m-card plain="false"  icon="icon-caidan1" title="团战思路"> 
                <p class="m-0 fs-sm">{{model.teamTips}}</p>
             </m-card>
              <m-card plain="false"  icon="icon-caidan1" title="英雄关系">
                <div class="fs-xl">最佳搭档</div>
                <div v-for="(item,index) in model.partners" 
                :key=index
                class="d-flex pt-4">
                   <img :src="item.hero.avatar" alt="" height="50">
                   <p class="flex-1 m-0 ml-3 ">
                     {{item.description}}
                   </p>
                </div>
                <div class="border-bottom mt-3"></div>
             </m-card>
           </div>
         </swiper-slide>
       </swiper>


     </div>
     <div class="body">
       
     </div>

   </div>
 </template>
 <script>
 export default {
   props:{
     id:{
       required:true,
     }
   },
   data(){
     return{
       model:null,
       activeIndex:0,
     }
   },
   created(){
     this.fetch();
   },
   methods:{
    async fetch (){
      const res = await this.$http('/heros/'+this.id);
      this.model=res.data;

     }
   },
   computed:{
     currentSkills(){
       return this.model.skills[this.activeIndex];
     }
   }
 }
 </script>
 <style lang="less" scoped>
 .top{
   height:50vm;
   background:rgb(228, 199, 199) no-repeat top center; 
 }
 .info{
   background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
   .scores{
     .bage{
       margin: 0 0.25rem;
       display: inline-block; 
       width: 1.1rem;
       height: 1.1rem;
       line-height: 1.2rem;
       text-align: center;
       font-size: 0.9rem;
       border-radius: 50%;
       border: 1px solid rgba(255, 255, 255, 0.3);
     }
   }
 }
 .skills{
   .icon{
     border: 3px solid #fff;
     width: 70px;
     height: 70px;
     &.active{ 
       border-color:#db9e3f;
       border-radius: 50%;
     }
   }
 }
 .items{
   img{
     width: 45px;
     height: 45px;
     border-radius: 50%;
   }
 }
 </style>
