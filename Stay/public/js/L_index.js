/**
 * Created by liruixi on 2017/12/18.
 */
$(function () {
    /*状态栏发布状态输入框*/
    $('.status1').on('click', function () {
        $('.postingBox').css('display','none');
        $('.postingBox2').css('display','block');
    })

    $('.zTags').on('click', function () {
        $('.zTags').css('display','none');
    })
   /* 最新热门*/
    $('.comentTag a').click(function () {
        $('.comentTag a').removeClass('current');
        $(this).addClass('current');
    })
   /* 关注取消*/
    
    $('.attented').hover(function () {
        $('.likeMe').css('background-color','orange');
        $('.attented').text('取消关注');
    }, function () {
        $('.likeMe').css('background-color','#2aabd2');
        $('.attented').text('已关注');
    })
    /*个人介绍浮动框*/
    var timer1=null;
    $('.headImg_A .headImg').on('mouseover', function () {
        $(this).parent('.headImg_A').next(".modle_imgfloat").css('display','block');
    })
    $('.headImg_A .headImg').on('mouseout', function () {
        timer1 = setTimeout(function () {
            $(this).parent('.headImg_A').next(".modle_imgfloat").css('display','none');
        },1500);
    })

    $('.headImg_A').next('.modle_imgfloat').on('mouseover', function () {
        $(this).css('display','block');
    })
    $('.headImg_A').next('.modle_imgfloat').on('mouseout', function () {
        $(this).css('display','none');
    })
    /*搜索栏点击*/
    $('#search_in').on('click', function () {
        if($('.search_frameLeft').width()==0){
            $('.search_frameLeft').css('width','220px');
            $('.search_frameLeft').css('right','0px');
        }else{
            $('.search_frameLeft').css('width','0px');
            $('.search_frameLeft').css('right','-220px');
        }


    })

    $('#listLoopArea li:nth-child(2n)').addClass('clemr');


   /* 个人主页鼠标经过爱心变红*/
    $(".i4").hover(function () {
        $(this).addClass('i4_red');
    }, function () {
        $(this).removeClass('i4_red');
    })
    /*个人简介粉丝显示名字*/
    $(".fans .imgList li").hover(function(){
        $(this).find(".showName").show();
    },function(){
        $(this).find(".showName").hide();
    });
    /* 个人主页 添加 取消文字颜色变化*/
    $(".block2 .block2_Til a").hover(function () {
        $(this).addClass('modhov');
    }, function () {
        $(this).removeClass('modhov');
    })
  /*  个人主页状态输入框*/
    $('.statusCategory .status1 .r1').click(function () {
        $(".perStatus_add .release .P_postingBox").css('display','none');
        $(".perStatus_add .release .postingBox2").css('display','block');
        $(".perStatus_add .release .postingBox2 .textarea1").focus();
    })
    $(".P_postingBox .P_status3").click(function () {
        $(this).parent('.P_postingBox').css('display','none');
        $(".perStatus_add .release .postingBox3").css('display','block');
        $(".perStatus_add .release .postingBox3 .status4").focus();
    })
    /*个人设置*/
    $('.c .note').each(function(){
        if($(this).parent().find('input').val().length > 0){
            $(this).hide();
        }
        $(this).on('click', function(){
            $(this).hide().parent().find('input').focus();
        });
    });
    $('.c .dataInp').on('click', function () {
        $(this).parent().find('.note').hide();
    })
    /*邮箱 手机号 uname的value为空时，失焦边框变成红色，否则便蓝色*/
    $('.c #telephone').on('focusout', function(){
        if($.trim($(this).val()).length == 0){
            $(this).css('border','1px solid red');
        }else{
            $(this).css('border','1px solid rgb(133, 218, 239)');
        }
    });
    $('.c #Email').on('focusout', function(){
        if($.trim($(this).val()).length == 0){
            $(this).css('border','1px solid red');
        }else{
            $(this).css('border','1px solid rgb(133, 218, 239)');
        }
    });
    $('.c #user_name').on('focusout', function(){
        if($.trim($(this).val()).length == 0){
            $(this).css('border','1px solid red');
        }else{
            $(this).css('border','1px solid rgb(133, 218, 239)');
        }
    });
    /*昵称*/
    var fl=true;
    $('.c').focusout(function () {
        var inputVal = $(this).find('input').val();
        var inputName = $(this).find('input').attr('name');
        var intVal = parseInt(inputVal); /*将input的value值转换成数字，如果value为字符型，则转换成纯数字，否则undefined*/
        /*  判断手机号不为空*/
        if (inputVal == "") {
            $(this).find('.error').css('display', 'inline-block');
            $(this).find('.yes').css('display', 'none');
            /*判断手机号码*/
            if(inputName=='telephone'){
                $(this).find('.error .errorMessage').html('手机号码不能为空!');
                $(this).find('input').focus();
                fl=false;
                return;
            }
            /* 判断邮箱*/
            if(inputName=='Email'){
                $(this).find('.error .errorMessage').html('邮箱不能为空!');
                $(this).find('input').focus();
                fl=false;
                return;
            }
            if(inputName=='user_name'){
                $(this).find('.error .errorMessage').html('昵称不能为空，至少为2到20个字符!');
                $(this).find('input').focus();
                fl=false;
                return;
            }
            if($(this).find('input').attr('id')=='job'){
                $(this).find('.note').css('display','inline-block');
                $(this).find('input[type=text]').css('border','1px solid #f3f3f3');
            }
            if($(this).find('input').attr('id')=='signature'){
                $(this).find('.note').css('display','inline-block');
                $(this).find('input[type=text]').css('border','1px solid #f3f3f3');
            }
        }else if (inputName=='telephone' && !inputVal.match(/(1[3-9]\d{9}$)/) /* &&  inputVal.length!=11 && !isNaN(intVal)*/ ) {
            $(this).find('.error').css('display', 'inline-block');
            $(this).find('.yes').css('display', 'none');
            $(this).find('.error .errorMessage').html('手机号码格式不正确!');
            $(this).find('input').focus();
            fl=false;
            return;
        } else if (inputName=='Email' && !inputVal.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
            $(this).find('.error').css('display', 'inline-block');
            $(this).find('.error .errorMessage').html('邮箱格式不正确!');
            $(this).find('input').focus();
            $(this).find('.yes').css('display', 'none');
            fl=false;
            return;
        } else{
           /* $(this).find('.yes').css('display', 'inline-block');
             $(this).find('.error').css('display', 'none');
             $(this).find('.error .errorMessage').html('');*/
            if(inputName=='telephone'){
                setSuccess('telephone');
                return true;
            }
            if(inputName=='Email'){
                setSuccess('Email');
                return true;
            }
            if(inputName=='user_name'){
                setSuccess('user_name');
                return true;
            }

        }
    })
  /*  职业*/
    $('#job').focus(function () {
        $(this).addClass('on');
        $(this).parent().find('.note').hide();
    })
    /*  签名*/
    $('#signature').focus(function () {
        $(this).addClass('on');
        $(this).parent().find('.note').hide();
    })
    $('.per_submit').hover(function () {
        $(this).css('background-position','0px -189px');
    }, function () {
        $(this).css('background-position','0px -141px');

    })
    /*出生年月日*/
    var birth_year = $('#birth_year');
    var birth_month=$('#birth_month');
    var birth_day = $('#birth_day');
    function YYYYMMDDstart()
    {
        MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        //先给年下拉框赋内容
        var y  = new Date().getFullYear();
        console.log(y)
        for (var i =y; i >1918; i--) //以今年为准，前30年，后30年
           birth_year.append("<option value='"+i+"'>"+i+"</option>");
        //赋月份的下拉框
        for (var i = 1; i < 13; i++)
            birth_month.append("<option value='"+i+"'>"+i+"</option>");
        var n = MonHead[new Date().getMonth()];
        if (new Date().getMonth() ==1 && IsPinYear(YYYYvalue)) n++;
        writeDay(n); //赋日期下拉框Author:meizz
    }
    if(document.attachEvent)
        window.attachEvent("onload", YYYYMMDDstart);
    else
        window.addEventListener('load', YYYYMMDDstart, false);
    $('#birth_year').on('change', function () {
        selYear(this.value);
    });
    $('#birth_month').on('change', function () {
        selMonth(this.value);
    });
    function selYear(str) //年发生变化时日期发生变化(主要是判断闰平年)
    {
        var Monthvalue =$('#birth_month option:selected').val();
        if (Monthvalue == ""){ var e =birth_day; optionsClear(e); return;}
        var n = MonHead[Monthvalue - 1];
        if (Monthvalue ==2 && IsPinYear(str)) n++;
        writeDay(n);
    }
    function selMonth(str)   //月发生变化时日期联动
    {
        var Yearvalue = $('#birth_year option:selected').val();
        if (Yearvalue == ""){ var e = birth_day; optionsClear(e); return;}
        var n = MonHead[str - 1];
        if (str ==2 && IsPinYear(Yearvalue)) n++;
        writeDay(n)
    }
    function writeDay(n)   //据条件写日期的下拉框
    {
        var e=birth_day;
        optionsClear(e);
        var e = birth_day; optionsClear(e);
        for (var i=1; i<(n+1); i++)
            birth_day.append("<option value='"+i+"'>"+i+"</option>");

    }
    function IsPinYear(year)//判断是否闰平年
    {     return(0 == year%4 && (year%100 !=0 || year%400 == 0));}
    function optionsClear(e)
    {
        e[0].options.length = 1;
    }

    /*修改密码*/
    $('#password_old').focusout(function () {
        checkOldPassword();
    })
    $('#password_new1,#password_new2').focusout(function () {
        if($(this).val().length<1){
            setErrorMsg($(this).attr('id'),'密码不能为空，请重新输入')
        }
        setSuccess($(this).attr('id'));
    })
    $('#password_new2').focusout(function () {
        if(checkNewPassword()){
            setSuccess($(this).attr('id'));
            console.log($(this).attr('id'));
        }
    })
   /* 保存提交*/
    $('#btn_submit').on('click',function(){
        if(checkOldPassword() && checkNewPassword()){
            var password_old = $.trim($('#password_old').val());
            var password_new1 = $.trim($('#password_new1').val());
            var password_new2 = $.trim($('#password_new2').val());
            $.ajax({
                type: 'post',
                url: '/peronalSet/modifyPassword',
                data: {
                    'password_old':password_old,
                    'password_new1':password_new1,
                    'password_new2':password_new2
                },
                success: function(result){
                    if(result.code == 1){
                        alert('密码修改成功');
                        window.location.href = 'http://localhost:8080/personalSet?uid='+result.uid;
                    }else{
                        alert(result.message);
                    }
                }
            });
        }
    });
   /* 检测旧密码输入是否正确*/
    function checkOldPassword(){
        var password_old = $.trim($('#password_old').val());
        if(password_old.length == 0){
            setErrorMsg('password_old', '原始密码不能为空，请输入原始密码');
            return false;
        }
        var isPass = true;
        $.ajax({
            type: 'post',
            url: '/modifyPassword1',
            data: {'password_old':password_old},
            success: function(result){
                console.log(result)
                if(result.code == 1){
                    setSuccess('password_old');
                }else{
                    setErrorMsg('password_old', result.message);
                    isPass = false;
                }
            }
        });
        if(!isPass){
            return false;
        }
        return true;
    }

  /*  检测新密码*/
    function checkNewPassword(){
        if($('#password_new1').val().length == 0){
            setErrorMsg('password_new1', '新密码不能为空，请输入新密码');
            return false;
        }
        if($('#password_new1').val().length < 6  || $('#password_new1').val().length > 16){
            $('.gray').hide();
            setErrorMsg('password_new1', '新密码长度必须为6~16位，请输入新密码');
            return false;
        }
        setSuccess('password_new1');

        if($('#password_new2').val() != $('#password_new1').val()){
            console.log(22);
            setErrorMsg('password_new2', '两次输入密码必须相同，请再次输入新密码');
            return false;
        }
        setSuccess('password_new2');
        return true;
    }

    $('.zTags').on('click', function () {
        $(this).hide();
        $('.tagInput').focus();
    })
    $('.tagInput').focusout(function () {
        if($(this).val().length<1){
            $('.zTags').show();
        }
    })
    $('.pages a').click(function () {
        $('.pages a').removeClass('pageA');
        $(this).addClass('pageA');
    })
  /*  个人页面查看评论*/
    $('.Review').on('click', function () {
        $(this).parents('.infoRight').find('.ReviewBox').toggle();
        var sid = $(this).attr('data-relate_id');
        /*var count = $(this).parents('.infoRight').find('.Review')*/
        var ul= $(this).parents('.infoRight').find('.com_list');
        $.ajax({
            type:'POST',
            url:'/status/comments',
            data:{
                sid:sid,
            },
            success:function(arr){
                ul.html(renderMessage(arr));//将div渲染到页面上
            }
        })
    })
    /*状态页面查看评论栏*/
    $('.jx_comment').on('click', function () {
        $(this).parents('.publishStatusList').next('.model_comments').toggle();
        var sid = $(this).attr('data-relate_id');
        var ul= $(this).parents('.listBox').find('.com_list');
                $.ajax({
                type:'POST',
                url:'/status/comments',
                data:{
                    sid:sid
            },
            success:function(arr){
                ul.html(renderMessage(arr));  //将div渲染到页面上
            }
        })
    })
    /*状态页评论提交*/
    $('.commentSubmit').on('click',function () {
      /*  console.log($.cookies("uid"))
        if(JSON.stringify($.cookie()) == "{}"){
            alert('只有登陆后才能评论哦~');
            location.reload();

        }else{*/
            var comment =$(this).parents('.inputTxt').find('.w_input').val();
            var ul=$(this).parents('.model_comments').find('.com_list');
            var sid = $(this).attr('data-relate_id');
            var sp_comments= $(this).parents('.listBox').find('.jx_comment em');
            var sp_commentsNum=Number(sp_comments.html())+1;
            console.log($(this).parents('.infoRight').find('.Review').html());
            console.log(sp_commentsNum);
            $(this).parents('.inputTxt').find('.w_input').val('');
            console.log(sid);
            $.ajax({
                type:'POST',
                url:'/giveComments',
                data:{
                    comment:comment,
                    sid:sid,
                    sp_commentsNum:sp_commentsNum
                },
                success:function(arr){
                    var html="";//拼接字符
                    for(var i=0;i<arr.result.length;i++) {
                        ul.html(renderMessage(arr.result));
                        sp_comments.html(arr.count);
                    }//将div渲染到页面上

                }
            })


    })
    /*个人主页评论提交*/
    $('.personalPage_Btn').on('click',function () {
        var comment =$(this).parents('.inputTxt').find('.w_input').val();
        var ul=$(this).parents('.model_comments').find('.com_list');
        var sid = $(this).attr('data-relate_id');
        var sp_comments=$(this).parents('.infoRight').find('.Review');
        var sp_commentsNum=Number(sp_comments.html())+1;
        console.log($(this).parents('.infoRight').find('.Review').html());
        console.log(sp_commentsNum);
        $(this).parents('.inputTxt').find('.w_input').val('');
        console.log(sid);
        $.ajax({
            type:'POST',
            url:'/giveComments',
            data:{
                comment:comment,
                sid:sid,
                sp_commentsNum:sp_commentsNum
            },
            success:function(arr){
                var html="";//拼接字符
                for(var i=0;i<arr.result.length;i++){
                    ul.html(renderMessage(arr.result));
                    sp_comments.html(arr.count);//将div渲染到页面上

                }
            }
        })
    })
    /*删除评论*/
    $('.del').on('click', function () {
        var sid = $(this).attr('id');
        /*var parent=$(this).parents('.publishMain');console.log(parent)*/
        var timer=null;
        $.ajax({
            type:"POST",
            url:'/del',
            data:{sid:sid},
            success: function (msg) {
                if(msg.code==1){
                    console.log(parent);
                    console.log($(this).parent());
                        location.reload();
                }
            }
        })
    })
    /*红心点赞*/
    $('.icos .i2 .heart').click(function(){
        $(this).addClass('jx_giveHeart');
        var _status_id = $(this).attr('data-status_id');
        var iLike=$(this).next('.jx_iLike');

        console.log(_status_id)
        /*    addStatusFavor(_status_id);*/
        addStatusFavor(_status_id,iLike);
    });

})
function addStatusFavor(status_id,iLike){
    if(status_id > 0){
        var iLike_Count=Number(iLike.html())+1;
        console.log(iLike_Count);
        $.ajax({
            type:"post",
            url:'/status/giveFavor',
            data:{
                status_id:status_id,
                iLike_Count:iLike_Count
            },
            success:function(result){
                if(result.code == 1) {
                  alert(result.message);
                }else if(result.code=2){
                    iLike.html(iLike_Count);
                }
            }
        });
    }
}


function formaDate(d){
    var date1 = new Date(d);
    return date1.getFullYear()+"年"+(date1.getMonth()+1)+"月"+date1.getDate()+"日"+
        date1.getHours()+":"+date1.getMinutes()+":"+date1.getSeconds();
}
























//tip error
function setErrorMsg(id, message, type){
    var _this = $('#' + id);
    if(typeof(type) == 'undefined'){
        var type = 1;
    }
    if(_this.length > 0){
        var peth_y = _this.parent().find('.yes');
        var peth_e = _this.parent().find('.error');
        var peth_n = _this.parent().find('.note');
        if(peth_y.length > 0){
            peth_y.css('display', 'none');
        }
        if(peth_e.length > 0){
            peth_e.css('display', 'inline-block').html('<span class="icon"></span> ' + message);
        }
        if(peth_n.length > 0 && _this.val().length < 1){
            peth_n.show();
        }
        if(type == 1){
            _this.css('border', 'solid 1px #ff6e68');
        }
    }
}
//tip success
function setSuccess(id, type){
    var _this = $('#' + id);
    if(typeof(type) == 'undefined'){
        var type = 1;
    }
    if(_this.length > 0){
        var peth_y = _this.parent().find('.yes');
        var peth_e = _this.parent().find('.error');
        var peth_n = _this.parent().find('.note');
        if(peth_y.length > 0){
            peth_y.css('display', 'inline-block');
        }
        if(peth_e.length > 0){
            peth_e.css('display', 'none');
        }
        if(peth_n.length > 0){
            peth_n.hide();
        }
        if(type == 1){
            _this.css('border', 'solid 1px #85daef');
        }
    }
}
