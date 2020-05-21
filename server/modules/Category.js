/*
 * @Author: MaFengyan
 * @Date: 2020-02-18 20:08:49
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-23 18:05:20
 * @Description: 
 */
const mongoose = require('mongoose');
const schama = new mongoose.Schema({
  name:{type:String},
  parent:{type:mongoose.SchemaTypes.ObjectId,res:'Category'},//相当于外建一样
})

module.exports= mongoose.model('Category',schama);