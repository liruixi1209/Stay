/**
 * Created by liruixi on 2017/12/7.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection(
    {
        host :'localhost',
        port :3306,
        database:'blog',
        user:'root',
        password:'root'
    });

router.get('/', function (req,res,next) {
    res.render("main/newsadd.html",{

    })
});
router.post('/newsadd', function (req,res,next) {
    console.log(1)
    var title = req.body.title;
    var content = req.body.content;

    connection.query('insert into news values(null,?,?)',[title,content],function(err,result){
        if(err){
            console.log('新闻信息插入失败...'+err);
        }else {
           res.send('新闻添加成功')
        }
    })

});
router.get('/news_index', function (req,res,next) {
    connection.query('select * from news', function (err,result) {
        if(err){
            console.log(err);
        }else{
            res.render('main/news',{
                news:result[0]
            })
        }
    })
})
module.exports=router;