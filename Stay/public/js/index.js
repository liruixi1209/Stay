/**
 * Created by dell on 2017/12/21.
 */
$(function () {
    //注册
    $(".tel .text").focusin(function(){
        $(this).css("border","1px solid #d4ecef");
    });
    $(".tel .text:eq(0)").focusout(function(){
        $(this).css("border","1px solid #dcdcdc");
        if($(this).val()==''){
            $('#login_form_loginname').attr('placeholder','账号不能为空');
        }
    });
    $(".tel .text:eq(1)").focusout(function(){
            $(this).css("border","1px solid #dcdcdc");
            if($(this).val()==''){
                $('#login_form_loginpwd').attr('placeholder','密码不能为空');
            }
    });
    $(".tel .text:eq(2)").focusout(function(){
        $(this).css("border","1px solid #dcdcdc");
        if($(this).val()==''){
            $('#login_form_loginrepwd').attr('placeholder','密码不能为空');
        }
    });
    $('#login_form_loginname').focusin(function () {
        $(this).attr('placeholder','请输入您的账号');
    });
    $('#login_form_loginpwd').focusin(function () {
        $(this).attr('placeholder','请输入您的密码');
    });
    $('#login_form_loginrepwd').focusin(function () {
        $(this).attr('placeholder','请确认您的密码');
    });
    //
    if($('#username').val()!=''){
        $(this).parent().find('.note').hide();
        $('#pwd').parent().find('.note').hide();
    }
    //登录
    $('#username').on('focusin',function () {
        setloginSuccess($(this).attr('id'));
        $(this).parent().find('.note').hide();
        $(this).css("border","1px solid #d4ecef");
    });
    $('#pwd').on('focusin',function () {
        setloginSuccess($(this).attr('id'));
        $(this).parent().find('.note').hide();
        $(this).css("border","1px solid #d4ecef");
    });
    $('#username').blur(function () {
        $(this).css("border","1px solid #dcdcdc");
       checkLoginname();
    });
    $('#pwd').blur(function () {
        $(this).css("border","1px solid #dcdcdc");
        checkLoginpwd();
    })
    //注册
    var $register = $('#sendCodeBtn');
    var $registerBox = $('.register');
    $register.on('click', function () {
        //发ajax请求后台   完成注册操作
        var pwd = $registerBox.find('[name = "login_form_loginpwd"]').val();
        var repwd = $registerBox.find('[name="login_form_loginrepwd"]').val();
        if(pwd==""||repwd==""||$registerBox.find('[name="login_form_loginname"]').val()==""){
            $('.colWarning').html("用户名或密码不能为空");
            return;
        }
        if(pwd!=repwd){
            $('.colWarning').html('两次密码不一致!');
            return;
        }
        $('.colWarning').html("");
        $.ajax({
            type:'POST',
            url:'/api/user/register',
            data:{
                uname:$registerBox.find("[name='login_form_loginname']").val(),
                pwd:$registerBox.find("[name='login_form_loginpwd']").val()
            },
            success: function (msg) {
                $registerBox.find('.colWarning').html(msg.message);
                if(msg.code ==4){

                }
            }
        })
    })
    var $loginBox = $('.login_box');
    //登录
    $('.logBtn').on('click', function () {
        var uname = $loginBox.find('[name = "username"]').val();
        var pwd = $loginBox.find('[name="pwd"]').val();
        if(uname==''||pwd==''){
            $('.colWarning').html('用户名或密码不能为空');
            return;
        }
        //向后台发送请求  验证密码和账户是否正确
        $.ajax({
            type:'POST',
            url:'/api/user/login',
            data:{
                uname:uname,
                pwd:pwd
            },
            success: function (msg) {
                $(".colWarning").html(msg.message);
                if(msg.code==4){
                    setTimeout(function () {
                        window.location.href = '/';
                    },1000)
                }
            }
        })
    })

    //退出功能
    $('.li_3').on('click', function () {
        //调后台   清除cookie
        $.ajax({
            url:'/api/logout',
            success: function (msg) {
                if(msg.code==4){
                    window.location.href = '/';
                }
            }
        })
    })
    //导航栏
    $('#head_user_islogin').hover(function () {
        $('#head-notice_all_cnt1').css('display','none');
        $(this).stop().animate({'height':'210px'},300);
    }, function () {
        if(parseInt($('#head-notice_all_cnt1').html())>0){
            $('#head-notice_all_cnt1').css('display','');
        }
        $(this).stop().animate({'height':'30px'},300);
    });
    $('#head_user_islogin .user_more .li_1').hover(function () {
        $(this).find('.new').addClass('new_hov');
    }, function () {
        $(this).find('.new').removeClass('new_hov');
    });
    $('#head_user_islogin .user_more .li_2').hover(function () {
        $(this).find('.man').addClass('man_hov');
    }, function () {
        $(this).find('.man').removeClass('man_hov');
    })
    $('#head_user_islogin .user_more .li_3').hover(function () {
        $(this).find('.out').addClass('out_hov');
    }, function () {
        $(this).find('.out').removeClass('out_hov');
    })
    $('#head_user_islogin .user_more .li_4').hover(function () {
        $(this).find('.cen').addClass('cen_hov');
    }, function () {
        $(this).find('.cen').removeClass('cen_hov');
    })
    $('#head_user_islogin .user_more .li_5').hover(function () {
        $(this).find('.ord').addClass('ord_hov');
    }, function () {
        $(this).find('.ord').removeClass('ord_hov');
    })
})

//登录
function setloginErrormessage(id,message){
    if($('#'+id).val().length>0){
        $('#'+id).css("color",'#ffffff');
    };
    $('#'+id).addClass("pwderror");
    $('#'+id).parent().find('.note').hide();
    $('#'+id).parent().find('.errorImg').show();
    $('#'+id+'_error').html(message);
    $('#'+id).parent().find('.error').show();
}
function checkLoginname(){
    if($('#username').val().length==0){
        setloginErrormessage('username','账号不能为空');
        return false;
    }
    setloginSuccess('username');
    return true;
}
function checkLoginpwd(){
    if($('#pwd').val().length==0){
        setloginErrormessage('pwd','密码不能为空');
        return false;
    }
    setloginSuccess('pwd');
    return true;
}
function setloginSuccess(id){
    console.log($('#'+id).val());
    $('#'+id).removeClass('pwderror');
    if($('#'+id).val().length>0){
        $('#'+id).parent().find('.note').hide();
        $('#'+id).css("color",'#333333');
    }else{
        $('#'+id).parent().find('.note').show();
    }
    $('#'+id).parent().find('.error').hide();
    $('#'+id).parent().find('.errorImg').hide();
}

