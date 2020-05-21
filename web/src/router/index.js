/*
 * @Author: MaFengyan
 * @Date: 2020-02-22 16:57:37
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-24 17:03:36
 * @Description: 
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Index.vue'
import Home from '../views/Home.vue'

import Article from '../views/Article.vue'

import Hero from '../views/Hero.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:"Main",
    component:Main, 
    children:[
      {path:'',name:"Home",component:Home},
      {path:'article/:id',name:"Article",component:Article,props:true},
    ]
  },
  {
    path:'/heros/:id',
    name:"Hero",
    component:Hero, 
    props:true,
  },
   
  
]
var router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{ 
   
  next();
}) 

export default router
