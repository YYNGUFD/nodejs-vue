import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Categories from '../views/Categories.vue'
import CategoriesEdit from '../views/CategoryEdit.vue'

import Item from '../views/ItemList.vue'
import ItemEdit from '../views/ItemEdit.vue'

import Heros from '../views/HeroList.vue'
import HerosEdit from '../views/HeroEdit.vue'

import Articles from '../views/ArticleList.vue'
import ArticlesEdit from '../views/ArticleEdit.vue'

import Ads from '../views/Ads.vue'
import AdsEdit from '../views/AdsEdit.vue'


import Admin from '../views/AdminUser.vue'
import AdminEdit from '../views/AdminUserEdit.vue'

import Login from '../views/Login.vue'
 


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:"Login",
    component:Login,
    meta:{
      isPublic:true,
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path:'/categories/list',component:Categories},
      {path:'/categories/createEdit',component:CategoriesEdit},
      {path:'/categories/edit/:id',component:CategoriesEdit,props:true},
      
      {path:'/items/add',component:ItemEdit},
      {path:'/items/list',component:Item},
      {path:'/items/edit/:id',component:ItemEdit,props:true},
      
      {path:'/Heros/add',component:HerosEdit},
      {path:'/Heros/list',component:Heros},
      {path:'/Heros/edit/:id',component:HerosEdit,props:true},
   
      {path:'/articles/add',component:ArticlesEdit},
      {path:'/articles/list',component:Articles},
      {path:'/articles/edit/:id',component:ArticlesEdit,props:true},
      
      {path:'/ads/add',component:AdsEdit},
      {path:'/ads/list',component:Ads},
      {path:'/ads/edit/:id',component:AdsEdit,props:true},
   
      {path:'/admin_users/add',component:AdminEdit},
      {path:'/admin_users/list',component:Admin},
      {path:'/admin_users/edit/:id',component:AdminEdit,props:true},
   
    ]
  },
   
  
]
var router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:routes
})
router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
}) 
export default router
