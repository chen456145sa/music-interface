const express = require('express');
//const template = require('art-template');
const bodyParser = require('body-parser');
const router = require('./router.js');
const path = require('path');
const app = express();




//启动静态资源
app.use('/public', express.static('public'));

//处理请求参数
app.use(bodyParser.urlencoded({extended: false})); //挂载 参数处理中间件post
app.use(bodyParser.json()); //处理json格式的参数 

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, X-Requested-By, If-Modified-Since, X-File-Name, X-File-Type, Cache-Control, Origin')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  next();
});


//配置路由
app.use(router);

/*手机访问时 需要手机电脑同时连在一个WiFi上
  2.打开cmd  输入 ipconfig   查看wifi 的ip4地址 例：192.168.191.1，将ip地址添加在package.json 中
	3.修改package.json  
	    "dev": "--host 192.168.191.1",
	
	4.访问时 使用 http://192.168.191.1:8888/public 去访问192.168.0.109 /192.168.43.171
	5.改了之后 变动巨大 组件的路由 也要跟着改成对应的 ip 才行 
 * */

//启动服务器功能
//监听端口
var server = app.listen(8888, function(){
	console.log("running...");
})