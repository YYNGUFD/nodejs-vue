/*
 * @Author: MaFengyan
 * @Date: 2020-02-20 11:00:56
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-24 16:37:44
 * @Description: 
 */

const mongoose = require('mongoose');
const schama = new mongoose.Schema({
  title:{type:String},
  //分类
  categories: [{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],//相当于外建一样
  content:{type:String}, 
},{
  timestamps:true,
})
module.exports= mongoose.model('Article',schama);