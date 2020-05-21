/*
 * @Author: MaFengyan
 * @Date: 2020-02-19 14:25:12
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-19 14:26:59
 * @Description: 
 */
const mongoose = require('mongoose');
const schama = new mongoose.Schema({
  name:{type:String},
  icon:{type:String}
  
})
module.exports= mongoose.model('Item',schama);