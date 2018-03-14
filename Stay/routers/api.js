/**
 * Created by dell on 2017/12/9.
 */
var express = require('express');
var router = express.Router()//创建一个路由对象

var mysql = require('mysql');
//配置数据库连接
var connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    database:'daizhe',
    user:'root',
    password:'root'
});
connection.connect(function (err) {
    if(err){
        console.log('数据库链接失败');
        console.log(err);
    }else{
        console.log('数据库链接成功');
        connection.query("select * from user where uname = 'admin'", function (err,result) {
            if(result&&result.length ==0){
                connection.query("insert into user values(null,'admin',null,'admin','public/uploads/2017/12/29/100.jpg',null,null,null,null,null,null,null,null,1)", function (err,result) {
                    console.log(err,result,'管理员信息初始化成功...');
                })
            }
        })
    }
})
//定义一个返回格式
var responseData;

router.use(function (req,res,next) {
    responseData = {
        code:0,
        message:""
    }
    next();
})

router.post('/user/register', function (req,res,next) {
    var uname = req.body.uname;
    var pwd = req.body.pwd;
    var file = 'public/uploads/2017/12/29/100.jpg';
    connection.query('select * from user where uname = ?',
        [uname], function (err,result) {
            if(err){
                console.log(err);
                console.log('注册查询失败');
            }else if(result.length>0){
                responseData.code = 1;//代表用户已存在
                responseData.message = "用户已存在";
                res.json(responseData);
            }else{
                connection.query('insert into user values(null,?,null,?,?,null,null,null,null,null,null,null,null,2)',[uname,pwd,file], function (err) {
                    if(err){

                        console.log(err,'注册信息插入失败');
                    }else{
                        responseData.message = "注册成功";
                        res.json(responseData);
                    }
                })
            }
        }
    )
})
//登录
router.post('/user/login', function (req,res,next) {
    var uname = req.body.uname;
    var pwd = req.body.pwd;
    connection.query("select * from user where uname = ? and pwd = ?",[uname,pwd], function (err,rs) {
        if(err){
            console.log(err);
        }else{
            if(rs.length == 0){
                responseData.code = 1;//1代表用户名或密码错误
                responseData.message = '用户名或密码错误';
                res.json(responseData);
                return;
            }
            responseData.code = 4;//4代表登录成功
            responseData.message = "登录成功";
            responseData.userInfo = {
                uid:rs[0].uid,
                uname:rs[0].uname,
                imgHead:rs[0].imgHead,
                isAdmin:rs[0].isAdmin
            }
            //将登录用户存入cookie
            req.cookies.set('userInfo',JSON.stringify({
                uid:rs[0].uid,
                uname:encodeURI(rs[0].uname),
                imgHead:rs[0].imgHead,
                isAdmin:rs[0].isAdmin
            }))
            res.json(responseData);
        }
    })
})

//退出
router.get('/logout', function (req,res,next) {
    req.cookies.set('userInfo',null);
    req.cookies.set('personalSet',null);
    responseData.code = 4;//4代表退出成功
    responseData.message = "退出成功";
    res.json(responseData);
})

module.exports = router;