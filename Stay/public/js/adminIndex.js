/**
 * Created by dell on 2017/11/5.
 */
$(function () {
    //登录窗口
    var $loginBox = $('#loginBox');
    //注册窗口
    var $registerBox = $('#registerBox');

    //切换到注册
    $loginBox.find('a').on('click', function () {
        $loginBox.hide();
        $registerBox.show();
    })

    //切换到登录
    $registerBox.find('a').on('click', function () {
        $loginBox.show();
        $registerBox.hide();
    })
    //注册
    $registerBox.find('button').on('click', function () {
        //发ajax请求后台   完成注册操作
        var pwd = $registerBox.find('[name = "password"]').val();
        var repwd = $registerBox.find('[name="repassword"]').val();
        if(pwd==""||repwd==""||$registerBox.find('[name="username"]').val()==""){
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
                uname:$registerBox.find("[name='username']").val(),
                pwd:$registerBox.find("[name='password']").val()
            },
            success: function (msg) {
                $registerBox.find('.colWarning').html(msg.message);
                if(msg.code ==4){
                    $loginBox.show();
                    $registerBox.hide();
                }

            }
        })
    })
    //登录
    $loginBox.find('button').on('click', function () {
        var uname = $loginBox.find('[name = "username"]').val();
        var pwd = $loginBox.find('[name="password"]').val();
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
                        location.reload();
                    },1000)
                }
            }
        })
    })
    //退出功能
    $('#logout').on('click', function () {
        //调后台   清除cookie
        $.ajax({
            url:'/api/user/logout',
            success: function (msg) {

                if(msg.code==4){
                    location.reload();
                }
            }
        })
    })
})