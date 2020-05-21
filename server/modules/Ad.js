/*
 * @Author: MaFengyan
 * @Date: 2020-02-20 13:58:23
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-20 14:00:09
 * @Description: 
 */
 

const mongoose = require('mongoose');
const schama = new mongoose.Schema({
  name:{type:String},
  items:[ {
    image:{type:String},
    url:{type:String},
    title:{type:String},
  }],
  content:{type:String}
})
module.exports= mongoose.model('Article',schama);