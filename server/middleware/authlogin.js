module.exports = options=>{
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert'); 
  const AdminUser = require("../modules/AdminUser.js");
   
  return async (req,res,next)=>{
    //校验是否登录
    const token = String(req.headers.authorization || '').split(' ').pop()
    // assert(token, 401, '请先登录')
    
    if(!token)  return res.status(401).send({
      message: "请先登录"
    })
     
    const { id } = jwt.verify(token,req.app.get('secret'))
    // assert(id, 401, '请先登录')
    if(!id)  return res.status(401).send({
      message: "请先登录"
    })
    req.user = await AdminUser.findById(id)
    // assert(req.user, 401, '请先登录')
    if(!req.user)  return res.status(401).send({
      message: "请先登录"
    })
    await next() 
  }
}