//创建一个express应用程序
var express = require('express');//加载express模块
var path = require('path');//路径模块
// var favicon = require('serve-favicon');//请求网页的logo
var logger = require('morgan');//在控制台中，显示req请求的信息
var cookieParser = require('cookie-parser');//这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
var bodyParser = require('body-parser');//node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

var app = express();
//Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。
//你可以使用 express.static 中间件来设置静态文件路径
app.use("/public", express.static("public"));

//// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//GET请求
app.get("/", function(req, res) {
  res.send("hello world");
});

//  POST 请求
app.post("/", function(req, res) {
  console.log("主页 POST 请求");
  res.send("Hello POST");
});
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get("/ab*cd", function(req, res) {
  console.log("/ab*cd GET 请求");
  res.send("正则匹配");
});

app.get("/index.html", function(req, res) {
  // 输出 JSON 格式
  var response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  console.log(response);
  // res.end(JSON.stringify(response));
  res.sendFile( __dirname + "/" + "index.html" );
});
app.get('/process_get', function (req, res) {
 
  // 输出 JSON 格式
  var response = {
      "first_name":req.query.first_name,
      "last_name":req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
})
//app.set(name, value)
//将设置项 name 的值设为 value
app.set("title", "My Site");
app.get("title");

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
