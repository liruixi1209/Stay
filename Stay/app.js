/**
 * Created by dell on 2017/12/9.
 */
var express = require('express');

//加载模块模板   实现内容和逻辑分离
var swig = require('swig');


//加载一个body-parser模块  用来处理post请求  提交过来的参数
var bodyParser = require('body-parser');
//加载cookies模块
var cookies = require('cookies');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

//css  js  静态托管
app.use('/public',express.static(__dirname+'/public'));
//
app.engine('html',swig.renderFile);
//
app.set('views','./views');
//
app.set('view engine','html');
//
swig.setDefaults({cache:false});

//


//设置cookie
app.use(function (req,res,next) {
    req.cookies = new cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        req.userInfo = JSON.parse(req.cookies.get('userInfo'));
    }
    next();
})
//
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));
app.use('/news',require('./routers/news'));
//
app.listen(8080,'localhost');