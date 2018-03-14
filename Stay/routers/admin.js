/**
 * Created by dell on 2017/12/9.
 */
var express = require('express');
var router = express.Router()//创建一个路由对象

var mysql = require('mysql');
//配置数据库连接
var connection = mysql.createConnection({
    host:'',
    port:3306,
    database:'daizhe',
    user:'root',
    password:'root'
});



router.use(function (req,res,next) {
    console.log(req.userInfo)
    if(!req.userInfo.isAdmin){
        res.send("<h2>请以管理员身份登录</h2>");
    }
    next();
})

//统一回复json格式
var msg = {
    code:-1,
    message:""
}

//后台管理界面
router.get('/', function (req,res,next) {
    res.render('admin/index',{
        userInfo:req.userInfo
    })
})

//用户管理
router.get('/user', function (req,res,next) {
    connection.query("select * from user", function (err,result) {
        var count = result.length;              //总条数
        var page = Number(req.query.page) || 1;
        var size = 5;
        var pages = Math.ceil((count/size));
        page = Math.min(page,pages);
        var index = (page-1)*size;
        connection.query("select * from user limit ?,?",[index,size], function (err,result) {
            res.render('admin/user_index',{
                userInfo:req.userInfo,
                users:result,
                page:page,
                count:count,
                size:size,
                pages:pages,
                tag:'user'
            })
        })
    })
})

//查询帖子或者查询内容
router.get('/post', function (req,res,next) {
    connection.query("select * from post", function (err,result) {
        var count = result.length;              //总条数
        var page = Number(req.query.page) || 1; //当前页
        var size = 5;
        var pages = Math.ceil((count/size));
        page = Math.min(page,pages);
        var index = (page-1)*size;
        connection.query("select p.*,u.uname from post p,user u where p.uid = u.uid limit ?,?",[index,size], function (err,rs) {
            res.render('admin/content_post',{
                userInfo:req.userInfo,
                contents:rs,
                page:page,
                count:count,
                size:size,
                pages:pages,
                tag:'post'
            })
        })
    })
})

//查询状态或者查询内容
router.get('/status', function (req,res,next) {
    connection.query("select * from statuspost", function (err,result) {
        var count = result.length;              //总条数
        var page = Number(req.query.page) || 1; //当前页
        var size = 5;
        var pages = Math.ceil((count/size));
        page = Math.min(page,pages);
        var index = (page-1)*size;
        connection.query("select s.*,u.uname from statuspost s,user u where s.uid = u.uid limit ?,?",[index,size], function (err,rs) {
            res.render('admin/content_status',{
                userInfo:req.userInfo,
                contents:rs,
                page:page,
                count:count,
                size:size,
                pages:pages,
                tag:'status'
            })
        })
    })
})

//修改帖子
router.get('/content/update', function (req,res,next) {
    //获取要修改的tid
    var pid  = req.query.pid;
    connection.query("select p.*,u.uname from post p,user u where p.uid = u.uid and p.pid = ?",[pid],function(err,rs){
        res.render("admin/content_edit",{
            userInfo:req.userInfo,
            content:rs[0]
        })
    })
})


//保存修改数据
router.post('/content/edit', function (req,res,next) {
    var pid = req.body.pid;
    var title = req.body.title;
    var content = req.body.content;
    connection.query("update post set title = ?,p_contents = ? where pid = ?",[title,content,pid], function (err,result) {
        res.render('admin/success',{
            userInfo:req.userInfo,
            message:"帖子修改成功",
            url:'/admin/content'
        })
    })
})

//删除帖子
router.get('/content/delete', function (req,res,next) {
    //获取要删除的pid
    if(req.query.pid){
        var pid  = req.query.pid;
        connection.query("delete from post where pid = ?",[pid],function(err,result){
            res.render("admin/success",{
                userInfo:req.userInfo,
                message:"帖子删除成功",
                url:'/admin/post'
            })
        })
    }else{
        var sid  = req.query.sid;
        connection.query("delete from statuspost where sid = ?",[sid],function(err,result){
            res.render("admin/success",{
                userInfo:req.userInfo,
                message:"帖子删除成功",
                url:'/admin/status'
            })
        })
    }

})

module.exports = router;