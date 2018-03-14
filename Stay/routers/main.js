/**
 * Created by dell on 2017/12/9.
 */
var express = require('express');
var router = express.Router()//创建一个路由对象
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
//配置数据库连接
var connection = mysql.createConnection({
    host:'127.0.0.1',
    port:3306,
    database:'daizhe',
    user:'root',
    password:'root'
});

var responseData;
router.use(function (req,res,next) {
    responseData = {
        code:0,
        message:""
    }
    next();
})

/*渲染首页*/
router.get('/', function (req,res,next) {
    req.userInfo.uname=decodeURI(req.userInfo.uname);
    var uid = req.userInfo.uid;
    connection.query('select * from user where uid=?',[uid], function (err,rs) {
        res.render('main/index.html',{
            userInfo:rs[0]
        })

    })
})
router.get('/personalPage', function (req,res,next) {
    req.userInfo.uname=decodeURI(req.userInfo.uname);
    var uid = req.userInfo.uid;
    connection.query('select * from user where uid=?',[uid], function (err,rs) {
        connection.query('select * from statuspost', function (err,result1) {
            var count = result1.length;
            var page = Number(req.query.page)||1;
            var size = 5;
            var pages=Math.ceil(count/size);
            page = Math.min(page,pages);
            page = Math.max(page,1);  //如果page=0的时候，将它改为1，当page=0时，index=-5，不符合要求的index初始值（0）；
            var index = (page-1)*size;
            connection.query('select s.*,u.uname,u.imgHead,u.sign from statuspost s,user u where s.uid=u.uid order by sid desc limit ?,?',[index,size] ,function (err,result2) {
                connection.query('select sid,count(sid) as count from comments group by sid', function (err,result3) {
                    res.render('main/personalPage.html',{
                        userInfo:rs[0],
                        contents:result2,
                        commentCount:result3,
                        page:page,
                        pages:pages,
                        count:count,
                        size:size
                    })
                })

            })
        })

    })

})
/*渲染注册界面*/
router.get('/register', function (req,res,next) {
    res.render('main/register.html',{

    })
})
/*渲染登陆界面*/
router.get('/login', function (req,res,next) {
    res.render('main/login.html',{
        userInfo:req.userInfo
    })

})
/*退出按钮*/
router.get('/logout', function (req,res,next) {
    res.render('main/login.html',{
        userInfo:req.userInfo
    })
})
/*渲染状态界面*/
router.get('/status', function (req,res,next) {
    var uid = req.userInfo.uid;
    var counts=[];
    var arr=[];
    var flag;
    var arrFlag=[];
    connection.query('select sid,Favor_users from statuspost', function (err,resul) {
        /*console.log(resul);*/
        for(var i in resul){
            if(resul[i].Favor_users==null){
               /* console.log(111);*/
                resul[i].Favor_users="0";
            }
            arr.push(resul[i].Favor_users);

        }
        if(arr==""){
            flag=0
        }else{
            for(var j in arr){
                var arr2=arr[j].split("_");
                for(var m in arr2){
                    if(Number(arr2[m])==uid){
                        flag=1;
                    }else{
                        flag=0;
                    }
                }
                arrFlag.push(flag);
            }
        }
        arrFlag.reverse();
       /* console.log(arrFlag)*/
    })
    connection.query('select * from user where uid=?',[uid], function (err,rs) {
        connection.query('select * from statuspost', function (err,result1) {
            var count = result1.length;
            var page = Number(req.query.page)||1;
            var size = 5;
            var pages=Math.ceil(count/size);
            page = Math.min(page,pages);
            page = Math.max(page,1);  //如果page=0的时候，将它改为1，当page=0时，index=-5，不符合要求的index初始值（0）；
            var index = (page-1)*size;
            connection.query('select s.*,u.uname,u.imgHead,u.sign from statuspost s,user u where s.uid=u.uid order by sid desc limit ?,?',[index,size] ,function (err,result2) {
                connection.query('select sid,count(sid) as counts from comments group by sid', function (err,result3) {
                    res.render('main/status.html',{
                        userInfo:rs[0],
                        contents:result2,
                        commentCount:count,
                        page:page,
                        pages:pages,
                        count:count,
                        size:size,
                        arrFlag:arrFlag,
                        Index:index
                    })
                })

            })
        })

    })
})

//访问个人设置页面
router.get('/personalSet', function (req,res,next) {
    var uid = req.query.uid;
    connection.query('select * from user where uid=?',[uid], function (err,rs) {
        res.render('main/personalSet.html',{
            userInfo:rs[0]
        })

    })
})
//封装一个自动生成文件夹的函数  递归算法
function mkdirsSync(dirname){
    if(fs.existsSync(dirname)){
        return true;
    }else{
        if(mkdirsSync(path.dirname(dirname))){
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
var date = new Date();
/*上传头像文件夹*/
var uploadFolder = "public/uploads/"+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
mkdirsSync(uploadFolder);    //生成一个年月日层层包裹的文件夹
/*状态图片上传*/
var statusPhoto = "public/statusPhoto/"+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
mkdirsSync(statusPhoto);
//通过filename属性定制
var storage1 = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,uploadFolder);  //uploadFolder保存的路径，自己创建的
    },
    filename: function (req,file,cb) {
        //将保存的文件设置为字段名+时间戳，比如logo+123334567777
        var date1 = new Date();
        console.log(date1.getFullYear()+""+(date1.getMonth()+1)+""+date1.getDate()+""+date1.getTime())
        cb(null,date1.getFullYear()+""+(date1.getMonth()+1)+""+date1.getDate()+""+date1.getTime());
    }
});
var storage2 = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,statusPhoto);  //uploadFolder保存的路径，自己创建的
    },
    filename: function (req,file,cb) {
        var date1 = new Date();
        cb(null,file.originalname);
    }
});
var upload1 = multer({storage:storage1}); //设置文件上传到uploadFolder文件夹里面  这个uploadFolder文件夹是自动生成的
var upload2 = multer({storage:storage2});

router.post('/personalSet',upload1.single('photo'), function (req,res,next) {
    var tel = req.body.telephone;
    var email = req.body.Email;
    var uname = req.body.user_name;
    var sex = req.body.gender_radio;
    var job = req.body.job;
    var sign = req.body.signature;
    var uid = req.userInfo.uid;
    var birthyear = req.body.birth_year;
    var birthmonth = req.body.birth_month;
    var birthday = req.body.birth_day;
    console.log(9999,uid);
    if(req.file){
        req.userInfo.imgHead=req.file.path;
    }
    connection.query('update user set tel=?,email=?,imgHead=?,uname=?,sex=?,birthday=?,job=?,sign=?,birthYear=?' +
        ',birthMonth=? where uid=?',[tel,email,req.userInfo.imgHead,uname,sex,birthday,job,sign,birthyear,birthmonth,uid], function (err,result) {
        console.log(tel,email,req.userInfo.imgHead,uname,sex,birthday,job,sign,birthyear,birthmonth,uid)
        if(err){
            console.log(err,'信息插入失败！');
        }else{
            connection.query('select * from user where uid=?',[uid], function (err,rs) {
                req.cookies.set('userInfo',JSON.stringify({
                    uid:rs[0].uid,
                    uname:encodeURI(rs[0].uname),
                    imgHead:rs[0].imgHead
                }));
                res.render('main/personalSet.html',{
                    userInfo:rs[0]
                })
            })
        }
    })
})
/*渲染修改密码*/
router.get('/modifyPassword', function (req,res,next) {
    var uid = req.userInfo.uid;
    connection.query('select * from user where uid=?',[uid], function (err,rs) {
        res.render('main/modifyPassword.html',{
            userInfo:rs[0]
        })
    })
})
router.post('/modifyPassword1', function (req,res,next) {
    var oldPwd = req.body.password_old;
    var uid = req.userInfo.uid;
    connection.query('select pwd from user where uid=?',[uid], function (err,result) {
        var yicun_pwd = result[0].pwd;
        if(yicun_pwd==oldPwd){
            responseData.code=1;
            res.json(responseData);
        }else{
            responseData.code=2;
            responseData.message="原始密码输入错误，请重新输入";
            res.json(responseData);
        }
    })

})
router.post('/peronalSet/modifyPassword', function (req,res,next) {
    var oldPwd = req.body.password_old;
    var newpwd1 = req.body.password_new1;
    var newpwd2 = req.body.password_new2;
    var uid = req.userInfo.uid;
    connection.query('update user set pwd=?  where uid=?',[newpwd2,uid], function (err,result) {
        if(err){
            console.log(err);
        }else{
            responseData.code=1;
            responseData.uid=uid;
            responseData.message="密码修改成功";
            res.json(responseData);
        }
    })

})

/*发布状态*/
router.post('/statusShow',upload2.single('statusPhoto'), function (req,res,next) {
    console.log(req.file)
    var content = req.body.textarea1;
    var tags = req.body.tagInput;
    var uid = req.userInfo.uid;
    var imgSrc;
    if(req.file){
        imgSrc = req.file.path;
    }else{
        imgSrc=null;
    }
    if(uid==null){
        res.render('main/login.html')
    }else{
        req.userInfo.uname = decodeURI(req.userInfo.uname);
        var date=new Date();
        var addTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+
            date.getMinutes()+":"+date.getSeconds();
        connection.query('insert into statuspost values (null,?,?,?,0,?,null,null,null,null,?,null,null,0,0)',[uid,addTime,content,imgSrc,tags], function (err,result) {
            if(err){
                console.log("状态信息发布失败",err)
            }else{
                connection.query('select * from statuspost ', function (err,result1) {
                    var count = result1.length;
                    var page = Number(req.query.page)||1;
                    var size = 5;
                    var pages=Math.ceil(count/size);
                    page = Math.min(page,pages);
                    page = Math.max(page,1);  //如果page=0的时候，将它改为1，当page=0时，index=-5，不符合要求的index初始值（0）；
                    var index = (page-1)*size;
                    connection.query('select s.*,u.uname,u.imgHead from statuspost s,user u where s.uid=u.uid order by sid desc limit ?,?',[index,size] ,function (err,result2) {
                        console.log(result2);
                        res.writeHead(302,
                            {'Location':'/status'}
                        )
                        res.end();
                    })
                })
            }
        })
    }
    })

/*点赞设置*/
router.post('/status/giveFavor', function (req,res,next) {
    var sid=req.body.status_id;
    var Favor=req.body.iLike_Count;
    var uid=req.userInfo.uid;
    var str="";
    var arr=[];
    connection.query('select Favor_user,Favor_users from statuspost where sid=?',[sid], function (err,rs1) {/*选出暂存的已点赞用户id*/
        console.log(rs1);
        if(Number(rs1[0].Favor_user)==uid){
            console.log("该用户已点赞")
            responseData.code=1;
            responseData.message="你已经点赞了！";
            res.json(responseData);
            return;
        }else if(rs1[0].Favor_users!=null){
            arr=rs1[0].Favor_users.split('_');console.log(arr);
            for(var i in arr){
                if(Number(arr[i])==uid){
                    responseData.code=1;
                    responseData.message="你已经点赞了！！！";
                    res.json(responseData);
                    return;
                }
            }
        }
            /*判断Favor_users是否为空,为空，直接插入uid,不为空在原来的基础+‘_uid’*/
        if(rs1[0].Favor_users==null){
            rs1[0].Favor_users=uid.toString();
        }else{
            rs1[0].Favor_users+="_"+uid;
        }

        connection.query('update  statuspost set sp_favorComments=?,Favor_user=?,Favor_users=? where sid=?',[Favor,uid,rs1[0].Favor_users,sid], function (err,rs1) {
            if(err){
                console.log("点赞数更新失败",err)
            }else{
                responseData.code=2;
                responseData.message="点赞成功";
                res.json(responseData);
            }
        })
    })
})
/*router.post('/statusImg',upload2.array('statusPhoto',6), function (req,res,next) {
    var srcAll=""; /!*初始化图片路径字符串*!/
    var pathArr=[]; /!*初始化图片路径数组*!/
    for(var i in req.files){
        pathArr.push(req.files[i].path);
    }
    srcAll=pathArr.join('_');
    console.log(srcAll);
    connection.query('update statuspost set img1=? where sid=(select sid from statuspost ORDER BY sid DESC LIMIT 1)',[srcAll], function (err,result) {
        if(err){
            console.log("图片路径插入失败"+err);
        }
    })

})*/
/*查看每条状态下的所有评论*/
router.post('/status/comments', function (req,res,next) {
    console.log(33333)
    var sid=req.body.sid;
    connection.query('select c.*,u.uname,u.imgHead from comments c,user u where sid=? and c.uid=u.uid order by cid desc',[sid], function (err,result) {
        res.send(result);
    })
})
/*提交评论*/
router.post('/giveComments', function (req,res,next) {

   console.log(req.body,req.userInfo)
    var uid = req.userInfo.uid;
    var sid = req.body.sid;
    var comment = req.body.comment;
    var sp_commentsNum=req.body.sp_commentsNum;/*前台初始化评论数为0，然后再每点击一次提交评论，评论数+1，传到后台，更新状态表中sp_comments的值 */
    var date=new Date();
    var addTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+
        date.getMinutes()+":"+date.getSeconds();
    connection.query('insert into comments values (null,?,?,?,?)',[uid,comment,addTime,sid], function (err,result) {
        if(err){
            console.log("评论信息插入失败",err)
        }else{
           /* 更新评论数*/
          connection.query('update statuspost set sp_commentCounts=? where sid=?',[sp_commentsNum,sid], function (err,result1) {
              if(err){
                  console.log("评论此数更新失败",err)
              }
          })
            connection.query('select c.*,u.uname,u.imgHead from comments c,user u where sid=? and c.uid=u.uid order by cid desc',[sid], function (err,rs1) {
                if(err){
                    console.log("评论信息查询失败",err)
                }else{
                    responseData.count=rs1.length;
                    responseData.result=rs1;
                    responseData.userInfo=req.userInfo;
                    res.json(responseData);
                }
            })
        }
    })
})
/*个人页面发布状态*/
router.post('/personalPage_show',upload2.single('statusPhoto'), function (req,res,next) {
    var content = req.body.textarea1;
    var tags = req.body.tagInput;
    var uid = req.userInfo.uid;
    var imgSrc = req.file.path;
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    var date=new Date();
    var addTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+
        date.getMinutes()+":"+date.getSeconds();
    connection.query('insert into statuspost values (null,?,?,?,0,?,null,null,null,null,?,null,null,0,0)',[uid,addTime,content,imgSrc,tags], function (err,result) {
        if(err){
            console.log("状态信息发布失败",err)
        }else{
            connection.query('select * from statuspost ', function (err,result1) {
                var count = result1.length;
                var page = Number(req.query.page)||1;
                var size = 5;
                var pages=Math.ceil(count/size);
                page = Math.min(page,pages);
                page = Math.max(page,1);  //如果page=0的时候，将它改为1，当page=0时，index=-5，不符合要求的index初始值（0）；
                var index = (page-1)*size;
                connection.query('select s.*,u.uname,u.imgHead from statuspost s,user u where s.uid=u.uid order by sid desc limit ?,?',[index,size] ,function (err,result2) {
                    console.log(result2);
                    /* res.render('main/personalPage.html',{
                       userInfo:req.userInfo,
                        contents:result2,
                        page:page,
                        pages:pages,
                        count:count,
                        size:size
                    })*/
                    res.writeHead(302,
                        {'Location':'/personalPage'}
                    )
                    res.end();

                })
            })
        }
    })
})
/*user状态页面*/
router.get('/personalPage/userStatus', function (req,res,next) {
    var uid=req.userInfo.uid;
    connection.query('select * from statuspost where uid=?',[uid], function (err,rs) {
        console.log(rs);
    })
})
/*删除状态*/
router.post('/del', function (req,res,next) {
    console.log(2222)
    var sid=req.body.sid;
    connection.query('delete from comments where sid=?',[sid], function (err,rs) {
        if(err){
            console.log('删除"'+sid+'"号状态失败',err);
        }else {
            connection.query('delete from statuspost where sid=?',[sid], function (err,result) {
                if(err){
                    console.log('删除状态失败',err);
                }else{
                    console.log('删除状态成功');
                    responseData.code=1;
                    res.json(responseData);
                }
            })
        }
    })

})
/*加载更多*/
router.get('/personalPage/load_more', function (req,res,next) {
    connection.query('select * from statuspost ', function (err,result1) {
        console.log(1)
        var count = result1.length;
        var page = parseInt(req.query.nextPage);
        console.log(page,typeof page)
        var size = 5;
        var pages=Math.ceil(count/size);
        page = Math.min(page,pages);
        page = Math.max(page,1);  //如果page=0的时候，将它改为1，当page=0时，index=-5，不符合要求的index初始值（0）；
        var index =0;
        connection.query('select s.*,u.uname,u.imgHead from statuspost s,user u where s.uid=u.uid order by sid desc limit ?,?',[index,size*page] ,function (err,result2) {
            responseData.page=page;
            responseData.pages=pages;
            responseData.userInfo=req.userInfo;
            responseData.contents=result2;
            res.json(responseData);
        })
    })
})

router.get('/share', function (req,res,next) {
    //查询分类
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    var cateId = req.query.cateId;
    var addwhere = "";
    if(cateId){
        addwhere = " and c.pid = "+cateId;
    }
    connection.query("select * from post order by pid desc", function (err,result) {
        connection.query("select c.*,u.uname from post c,user u where c.uid = u.uid "+addwhere, function (err,rs) {
            var count = rs.length;              //总条数
            var page = Number(req.query.page) || 1; //当前页
            var size = 5;
            var pages = Math.ceil((count/size));
            page = Math.min(page,pages);
            var index = (page-1)*size;
            connection.query("select c.*,u.uname,u.imgHead from post c,user u where "+
                "c.uid = u.uid order by pid desc limit ?,?",[index,size],function (err,rs){
                res.render('main/share.html',{
                    userInfo:req.userInfo,
                    cates:result,
                    page:page,
                    contents:rs,
                    pages:pages,
                    cateId:cateId,
                    on:'share'
                })
            })

        })
    })
})

router.get('/share/detail', function (req,res,next) {
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    console.log(req.query)
    var pid = req.query.pid;
    console.log(pid);
    connection.query("select p.*,u.uname,u.imgHead from post p,user u where pid=? and p.uid=u.uid", [pid], function (err, result1) {
        connection.query('select * from postcomment where pid=?',[pid], function (err,result2) {
            console.log(result2.length);
            var counts = result2.length;              //总条数
            var page = Number(req.query.page) || 1; //当前页
            var size = 5;
            var pages = Math.ceil((counts/size));
            page = Math.min(page,pages);
            var index = (page-1)*size;
            console.log(page,pages)
            connection.query("select p.*,u.uname,u.imgHead from postcomment p,user u where pid=? and p.uid=u.uid order by cid limit ?,?",[pid,index,size], function (err,result3) {

                res.render('main/sharedetail.html', {
                    userInfo: req.userInfo,
                    content: result1[0],
                    comments:result3,
                    page:page,
                    pages:pages
                })
            })
        })



    })


    /*connection.query("select * from post order by pid", function (err,cates) {
        var pid = req.query.pid;
        //先把帖子阅读数+1
        connection.query("update post set views = views+1 "+"where pid = ?",[pid], function (err,result){})
        connection.query("select c.*,u.uname from post c,user u where c.uid = u.uid and pid = ?",[pid], function (err,posts) {
            connection.query("select m.*,p.* from postcomment m,post p where pid = ? and m.c_pid = p.pid order by cid",[pid], function (err,result) {
                var counts = result.length;              //总条数
                var page = Number(req.query.page) || 1; //当前页
                var size = 5;
                var pages = Math.ceil((counts/size));
                page = Math.min(page,pages);
                var index = (page-1)*size;
                connection.query("select m.*,u.uname from postcomment m,user u where "+
                    "cid = ? and m.uid = u.uid order by mid limit ?,?",[pid,index,size],function (err,rs) {
                    res.render('main/sharedetail.html',{
                        userInfo:req.userInfo,
                        page:page,
                        cates:cates,
                        content:posts[0],
                        size:size,
                        messages:rs,
                        pages:pages,
                        count:counts
                    })
                })
            })
        })
    })*/
})

router.post('/addViews', function (req,res,result) {
    var views=req.body.views;
    var pid = req.body.pid;
    connection.query('update post set views=? where pid=? ',[views,pid], function (err,rs) {
        if(err){
            console.log(err,"浏览数目更新失败！")
        }else{
            responseData.code=3;
            res.json(responseData);
        }
    })
})
router.get('/createguide', function (req,res,next) {
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    res.render('main/createguide.html',{
        userInfo:req.userInfo
    })
})

router.get('/create', function (req,res,next) {
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    if(req.userInfo.uid){
        res.render('main/create.html',{
            userInfo:req.userInfo
        })
    }else{
        res.render('main/login.html',{
            userInfo:req.userInfo
        })
    }
})

router.post('/share', function (req,res,next) {
    //获取帖子信息
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    var shareTitle = req.body.shareTitle;
    var shareContent = req.body.shareContent;
    var date = new Date();
    var addTime = date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    connection.query("insert into post values(null,?,?,null,?,0,0,?)",[req.userInfo.uid,shareTitle,addTime,shareContent], function (err,result) {
        if(err){
            console.log(err);
            res.render('/share/error',{
                message:"发帖失败"
            })
        }else{
         /*   res.render('main/share.html',{
                userInfo:req.userInfo,
                message:"发帖成功",
            })*/
            res.writeHead(302,
                {'Location':'/share'}
            )
            res.end();
        }
    })
})
//添加评论
router.post('/shareComment', function (req,res,next) {
    console.log(3333)
    var cmt = req.body.cmt;
    var pid = req.body.cpid;
    var uid = req.userInfo.uid;
    var date = new Date();
    connection.query("update post set p_comments = p_comments+1 "+"where pid = ?",[pid], function (err,result){})
    var addTime = date.getFullYear()+","+(date.getMonth()+1)+","+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    connection.query("insert into postcomment values(null,?,?,?,?)",[cmt,pid,uid,addTime], function (err,result) {
        if(err){
            console.log(err);
        }else{
            connection.query("select m.*,u.uname from postcomment m,user u where pid = ? "+
                "and m.uid = u.uid order by cid",[pid], function (err,result){
                var counts = result.length;
                var page = Number(req.query.page) || 1; //当前页
                var size = 5;
                var pages = Math.ceil((counts/size));
                page = Math.min(page,pages);
                console.log(page,pages)
                var index = (page-1)*size;
                connection.query("select m.*,u.uname,u.imgHead from postcomment m,user u where "+
                    "pid = ? and m.uid = u.uid order by cid desc limit ?,?",[pid,index,size],function (err,rs) {
                    res.send(rs);
                })
            })
        }
    })
})
router.get('/personalPage_status', function (req,res,next) {
   var uid=req.query.uid;
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    connection.query('select * from statuspost where uid=?',[uid], function (err,result1) {
        var counts = result1.length;
        var page = Number(req.query.page) || 1; //当前页
        var size = Number(req.query.size)|| 5;
        var pages = Math.ceil((counts/size));
        page = Math.min(page,pages);
        console.log(page,pages)
        var index = (page-1)*size;
        connection.query('select * from statuspost where uid=? order by sp_dateTime desc ',[uid], function (err,result2) {
            res.render('main/personalPage_status.html',{
                userInfo:req.userInfo,
                contents:result2,
                counts:result2.length,
                size:size
            })
        })
    })
})
router.get('/personalPage_post', function (req,res,next) {
    req.userInfo.uname = decodeURI(req.userInfo.uname);
    var uid=req.query.uid;
    connection.query('select * from post where uid=? order by p_addTime desc',[uid], function (err,result1) {
        console.log(result1);
        res.render('main/personalPage_post.html',{
            userInfo:req.userInfo,
            contents:result1,
            counts:result1.length,
        })
    })
})
module.exports = router;