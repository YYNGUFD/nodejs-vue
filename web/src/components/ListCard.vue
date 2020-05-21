<!--
 * @Author: MaFengyan
 * @Date: 2020-02-23 16:22:34
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-24 15:23:47
 * @Description: 
 -->
 <template>
  <m-card :icon="icon" :title="title">
        <div class="nav d-flex jc-between">
          <div class="nav-item " 
          v-for="(item,index) in categories" :key = index 
           :class="{active:activeIndex==index}"
           @click="changeTab(index)"
          >
            <div class="nav-link" >{{item.name}}</div>
          </div>
        </div>
        <div class="pt-3">
           <swiper ref="list" 
             @slide-change="()=>activeIndex = $refs.list.swiper.realIndex" 
             class='swiImgs ' :options="swiperOption" >
            <swiper-slide v-for="(item,index) in categories" :key=index>
              <slot name="items" :category="item"></slot> 
            </swiper-slide>
           </swiper>
        </div>
  </m-card>
 </template>
 <script>
 export default {
   props:{
     icon:String,
     title:String,
     categories:{
       type:Array,
       require:true,
     }

   },
   data(){
     return {
      swiperOption: {
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          stopOnLastSlide: false
        },
        autoHeight:true,
        slidesPerView: 1,
        watchOverflow: true,
        centeredSlides: true, // 选中tab居中
        spaceBetween: 1, // tab间距
        initialSlide: 0,
        observer: true,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      activeIndex:0,
     }
   },
   computed:{
     swiper() {  
      return this.$refs.list.swiper;  
     } 
   },
   methods:{
     changeTab(index){
       this.activeIndex =index;
       this.swiper.slideTo(index, 1000, false)
     }
   }
 }
 </script>
 <style lang="less" scoped>
 
 </style>
