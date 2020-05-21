/*
 * @Author: MaFengyan
 * @Date: 2020-02-20 14:44:14
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-20 15:23:43
 * @Description: 
 * 
 */
 

const mongoose = require('mongoose');
const schama = new mongoose.Schema({
  username:{type:String},

  password:{type:String,
    select:false, //无法用数据库查询出来
    set:(val)=>{
    //进行改变 密码进行hash散列存储 10为散列指数 指数越高散列的密度越大 消耗比较大
    return  require('bcrypt').hashSync(val,10)
  }},
    
})
module.exports= mongoose.model('AdminUser',schama);
