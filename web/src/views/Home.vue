
<template>
<div>
  <swiper class='swiImgs' :options="swiperOption" v-if="swiperSlides.length!=0">
    <!-- <swiper-slide v-for="(item, index) in swiperSlides" data-index="index" :key="index" class="item">
     <img   class='swiImg w-100' :src='item'/>
    </swiper-slide> --> 
     <swiper-slide>
     <img   class='swiImg w-100' src='../assets/swiper/2.jpeg'/>
    </swiper-slide>
     <swiper-slide>
     <img   class='swiImg w-100' src='../assets/swiper/3.jpeg'/>
    </swiper-slide>
     <swiper-slide>
     <img   class='swiImg w-100' src='../assets/swiper/4.jpeg'/>
    </swiper-slide>
     <div class="swiper-pagination w-100 text-right pr-3" v-for="(item, index) in swiperSlides" :key="index" slot="pagination"></div> 
  </swiper>
<!-- begin of nav-icons -->
  <div class="nav-icons text-center pt-3 mt-3 bg-white text-gray-1">
    <div class=" d-flex flex-wrap">
      <div class="nav-item mb-3" v-for="n in 10" :key="n">
        <i class="sprite sprite-news"></i>
        <div class="py-2">爆料站</div>
      </div>
    </div>
    <div class="bg-light py-2 fs-sm">
       <i class="sprite sprite-arrow mr-1"></i>
      <span>收起</span>
    </div>
  </div>
   <!-- end of nav-icons -->
     <m-list-card icon="icon-caidan1" title="新闻咨询" :categories="newsCats">
       <template  #items="{category}"> 
         <router-link tag="div" 
            class="py-2 d-flex" d-flex v-for="(news,index) in category.newsList" :key=index
            :to="`article/${news._id}`">
              <span class="text-gray text-info">[{{news.categoryName}}]</span>
              <span class="px-2">|</span>
              <span class="flex-1 text-ellipsis pr-2">{{news.title}}</span>
              <span class="text-gray">{{news.createdAt | data}}</span>
          </router-link>
       </template>
     </m-list-card> 
      <m-list-card icon="icon-yingxiongbang" title="英雄列表" :categories="herosCats">
       <template  #items="{category}"> 
         <div class="d-flex flex-wrap " style="margin:0 -0.5rem">
           <router-link class="p-2 text-center"  tag="div"
           :to="`/heros/${hero._id}`"
            style="width:20%"
             v-for="(hero,index) in category.heroList" :key=index>
             <img :src="hero.avatar" alt=""  class="w-100">
             <div class="fs-sm">{{hero.name}}</div>
            </router-link> 
          </div>
       </template>
     </m-list-card> 
      <m-list-card icon="icon-yingxiongbang" title="精彩视频" :categories="herosCats">
       <template  #items="{category}"> 
        {{category}}
       </template>
     </m-list-card> 
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
  data(){
    return{
      swiperOption: {
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          stopOnLastSlide: false
        },
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
        swiperSlides: [1, 2, 3, 4, 5],
        newsCats:[] ,
        herosCats:[],
    }
  },
  created(){
    this.fetch();

  },
  methods:{
   async fetch(){
     //新闻分类
     const res = await this.$http.get('/news/list')
     this.newsCats = res.data;
     //英雄分类
     const res2 = await this.$http.get('/heros/list')
     this.herosCats = res2.data;
   }
  },
  mounted() {
      
  }
}
</script>
<style lang="less" > 

.swiper-pagination-bullets{
  .swiper-pagination-bullet{
     background: #fff!important;
     border-radius: 0.1538rem;
     opacity: 0.5;
    &.swiper-pagination-bullet-active{
      background: #4b67af!important; 
    }
  }
}
</style>
<style lang="less" scoped>
@import url('../style/varibles.less');
.nav-icons{
  border-top: 1px solid @border-color;
   border-bottom: 1px solid @border-color;
  .nav-item{
    width: 25%;
    border-right: 1px solid @border-color;
    &:nth-child(4n){
      border:none;
    }
    
  }
}
</style>