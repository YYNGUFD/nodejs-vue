const express  =require("express")

const app = express();

app.use(express.json()) 
const cors = require('cors');
app.use(cors());

const router = express.Router({
  mergeParams:true,//合并参数
}) 

var path = require('path');
var ejs = require('ejs');

// //安装body-parser 插件 并进行引用 解析post的数据 不加这个解析不到数据哦
// var bodyParser = require('body-parser');
// app.use(bodyParser());
// app.use(bodyParser.json());//数据JSON类型
// app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据


//引用数据库
require('./plugins/db.js')(app)
//引用路由
require('./routes/admin/index.js')(app);
require('./routes/web/index.js')(app);

//设置方法的请求头
app.all('*', function(req, res, next) {
  let origin=req.headers.origin;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.use(require('cors')())
app.use(express.json())
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/upload'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.set("secret","mafengyan");
app.listen(3000,()=>{ 
  console.log("http:localhost:3000")
})