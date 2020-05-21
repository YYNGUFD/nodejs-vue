/*
 * @Author: MaFengyan
 * @Date: 2020-02-18 20:06:03
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-24 20:49:34
 * @Description: 
 */
module.exports = app=>{
  const mongoose = require('mongoose');
  mongoose.connect("mongodb://localhost:27017/node-vue-moba",{
    useNewUrlParser:true,
  })
// 
  // require('require-all')(__dirname+'/../modules')
  
}