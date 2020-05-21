
module.exports = app=>{
  const express = require('express')
  const jwt = require('jsonwebtoken');
  const assert = require('http-assert'); 
  const AdminUser = require("../../modules/AdminUser.js");
   
  const router = express.Router({
    mergeParams:true,//合并参数
  }) 
    
  
  //保存数据
  router.post('/',async (req,res)=>{ 
    const model =   await req.Model.create(req.body); 
    res.send(model);
  })
  
  //编辑数据
  router.put('/:id',async (req,res)=>{  
    console.log(req.body)
    const result =   await req.Model.findByIdAndUpdate(req.params.id,req.body); 
    res.send(result);
  })

  //删除数据
  router.delete('/:id',async (req,res)=>{  
    const result =   await req.Model.findByIdAndDelete(req.params.id); 
    res.send(result);
  })

  //获取数据列表
  router.get('/',async (req,res)=>{
    const  queryOptions ={};
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    } 
    const items =  await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items);
  })


  router.get('/parent-options',async (req,res)=>{
    const items =  await req.Model.find();
    res.send(items);
  })

  //详情
  router.get('/:id',async (req,res)=>{
    const model =  await req.Model.findById(req.params.id);
    res.send(model);
  })
   
  const authMiddleware = require("../../middleware/authlogin.js");
  const resourceMiddleware =require("../../middleware/resource.js")
  app.use('/admin/rest/:resource',authMiddleware(),resourceMiddleware(),router)


 //进行上传文件统一处理
  const multer = require('multer')
  const upload = multer({dest:__dirname+'/../../upload'})
  app.post('/admin/upload',upload.single("file"),authMiddleware(), async (req,res)=>{
     const file =  req.file;
     console.log(file)
     file.url = 'http://localhost:3000/uploads/'+file.filename;
     res.send(file) 
  })

  app.post('/admin/login',async (req,res)=>{
    //数据接受
    const  {username,password} = req.body; 
    //1.查询用户
    const userOne = await AdminUser.findOne({username:username}).select("+password");
    // assert(userOne,422,"用户不存在")
    if(!userOne) return res.status(422).send({
      message: "用户不存在"
    })
     //2.校验密码
    var isSame =  require("bcrypt").compareSync(password,userOne.password);
    // assert(isSame,422,"验证错误密码错误")
    if(!isSame)  return res.status(422).send({
      message: "验证错误密码错误"
    })
     //3.返货token 验证正确
    const token= jwt.sign({ 
      id:userOne._id, 
    },app.get('secret'))
    res.send({token:token});
  })
  //错误处理 
  app.use('',async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

 
}