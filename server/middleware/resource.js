/*
 * @Author: MaFengyan
 * @Date: 2020-02-21 11:37:39
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-21 11:54:10
 * @Description: 
 */
/*
 * @Author: MaFengyan
 * @Date: 2020-02-21 11:35:18
 * @LastEditors: MaFengyan
 * @LastEditTime: 2020-02-21 11:36:38
 * @Description: 
 */
module.exports =options=>{ 
  return  async(req,res,next)=>{
    //统一的前置处理资源 
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require('../modules/'+modelName)
    console.log(req.Model)
    next();
  }
}