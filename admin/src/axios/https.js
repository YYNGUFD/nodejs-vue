import axios from 'axios'
import Vue from 'vue'
import router from '../router/index.js'
//域名进行替换
var https  = axios.create({
  baseURL:process.env.VUE_APP_API_URL||'/', 
})
https.interceptors.request.use((config)=>{
  if(localStorage.token){
    config.headers.Authorization ="Bearer " +localStorage.token
  
  }
 return config;
},(err)=>{
 
  return Promise.reject(err)
})
//请求拦截器
https.interceptors.response.use((res)=>{
 return res;

},err=>{
  //发生的错误请求 
  if(err.response.data.message){
    Vue.prototype.$message.error(err.response.data.message)
  }
  if(err.response.status ==401){
    console.log("login")
    router.replace('/login')
 
  }
  return Promise.reject(err);
})
export default https;