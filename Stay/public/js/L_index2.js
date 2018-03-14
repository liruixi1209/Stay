/**
 * Created by liruixi on 2018/1/5.
 */
$(function () {


    var all;/*初始化cookie的uid*/
    $('#load_more').on('click', function () {
        var _this=$(this);
        var arrImg=[];
        var page=$(this).parent('.personalPage_more').attr('data-page');
        var maxPage=$(this).parent('.personalPage_more').attr('data-pagenum');
        var ul= $(this).parents('.perStatus_down').find('.publishMain');

        var nextPage=Number(page)+1;
        $(this).parent('.personalPage_more').attr('data-page',page);
        $.ajax({
            type:'GET',
            url:'/personalPage/load_more',
            data:{nextPage:nextPage},
            beforeSend: function () {
                $('#load_more').html('加载中...')
            },
            complete: function () {
                $('#load_more').html('更多')
            },
            success:function(arr){
                _this.parent('.personalPage_more').attr('data-page',nextPage);
                var html="";//拼接字符
                for(var i=0;i<arr.contents.length;i++){
                    html+=' <div class="listBox">' +
                                ' <div class="modleInfo clear">' +
                                    ' <a href="#"><img src="'+arr.contents[i].imgHead+'" class="headImg fl"> </a>'+
                                    '<div class="fl infoRight">' +
                                        ' <div class="nameIntro fl"> ' +
                                        '<a href="#" class="name">'+arr.contents[i].uname+'</a>发布了一个状态 ' +
                                        '</div> ' +
                                        '<span class="fr time">'+arr.contents[i].sp_dateTime+'</span>' +
                                        '<div class="contentBox clear">' +
                                            ' <div class="contentText fl">' +
                                                ' <p class="p_Text"> <em></em>'+arr.contents[i].sp_contents+'<!-- 此处限字96个--> ' + '<i></i> </p><div class="moreImg_pics moreImg_pics1 clear"> <ul data-cnt="1"> <li> <a href="'+arr.contents[i].img1+'" data-lightbox="group_75942"> <img id="statusData_{{content.uid}}_0" data-src="'+arr.contents[i].img1+'" src="'+arr.contents[i].img1+'" style="width:200px;height: 200px;"> </a> </li> </ul> </div>' +

                                                ' <div class="icos"> ' +
                                                    '<i class="i4 Favor" id="statusFavorCnt_'+arr.contents[i].uid+'" data-status_id="75892">'+arr.contents[i].sp_favorComments+'</i> <!-- i2_red 变红--> ' +
                                                    '<i class="i5 Review" id="commentCnt_'+arr.contents[i].uid+'" data-comment_type="9" data-relate_id="'+arr.contents[i].sid+'">'+arr.contents[i].sp_commentCounts+'</i>' +
                                                    ' <em class="del" id="'+arr.contents[i].sid+'" data-feed_id="470401" data-status_id="'+arr.contents[i].uid+'">删除 </em> ' +
                                                '</div>' +
                                            '</div> ' +
                                       '</div> ' +
                                       '<div class=" model_comments ReviewBox" id="commentBox_'+arr.contents[i].uid+'"> <span class="model_san"></span>' +
                                            ' <div class="clear inputTxt"> ' +
                                                '<textarea class="w_input fl" id="'+arr.contents[i].uid+'"></textarea> ' +
                                                '<input type="hidden" id="commentReplyHead_'+arr.contents[i].uid+'" value="">' +
                                                ' <input type="hidden" id="commentFid_'+arr.contents[i].uid+'" value=""> ' +
                                                '<input type="button" class="fl txtBtn personalPage_Btn" value="" id="'+arr.contents[i].uid+'" data-comment_type="9" data-relate_id="'+arr.contents[i].sid+'">' +
                                            '</div> ' +
                                            '<ul class="com_list clear" id="commentListBox_'+arr.contents[i].uid+'"> </ul> ' +
                                            '<div class="moreMeg cBlue" id="commentBtnMore_'+arr.contents[i].uid+'">' +
                                            '</div> ' +
                                       '</div>' +
                                    '</div>' +
                               '</div> ' +
                           '</div>'
                    arrImg.push(arr.contents[i].img1);/*将图片路径存到arrImg里面*/
                }
                ul.html(html);  //将div渲染到页面上
                var imgs=$('.moreImg_pics');
                imgs.each(function (i,elem) {
                    if(arrImg[i]==null){
                        imgs[i].remove();
                    }
                })
               /* 判断当前页数与最大页数是不是相等，相等，则删除  更多 这个节点*/
                if(nextPage==maxPage){
                    $('#load_more').remove();
                }


                var del=$(ul).find('.del');
                del.each(function (i,elem) {
                    if(Number(del.eq(i).attr('data-status_id'))!=arr.userInfo.uid){
                        del.eq(i).remove();
                    }
              })
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
                            ul.html(renderMessage(arr));
                        }
                    })
                })
                $('.personalPage_Btn').click(function () {
                    var comment =$(this).parents('.inputTxt').find('.w_input').val();
                    var ul=$(this).parents('.model_comments').find('.com_list');
                    var sid = $(this).attr('data-relate_id');
                    var sp_comments=$(this).parents('.infoRight').find('.Review');
                    var sp_commentsNum=Number(sp_comments.html())+1;
                    $(this).parents('.inputTxt').find('.w_input').val('');
                    $.ajax({
                        type:'POST',
                        url:'/giveComments',
                        data:{
                            comment:comment,
                            sid:sid,
                            sp_commentsNum:sp_commentsNum
                        },
                        success:function(arr){
                            ul.html(renderMessage(arr.result));
                            sp_comments.html(arr.count);
                            //将div渲染到页面上

                        }
                    })
                })
            /*    删除评论*/
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
                                location.reload();
                            }
                        }
                    })
                })
            }
        })
    });

    $('#statusPhoto').on('click', function () {
        var newFileInput='<input type="file" id="uploadFile" class="file" name="statusPhoto"  multiple="multiple" onchange="uploadImage(this)">'
        $(this).parent('#photograph1').append($(newFileInput));
        $('#uploadFile').bind('change', function (e) {
            var srcAll=[];
            var imgRUL = "";
            var imgURL = "";
            try{
                var file = null;
                if(node.files && node.files[0] ){
                    file = node.files[0];
                }else if(node.files && node.files.item(0)) {
                    file = node.files.item(0);
                }
                //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
                try{
                    imgURL =  file.getAsDataURL();
                }catch(e){
                    imgRUL = window.URL.createObjectURL(file);
                }
            }catch(e){
                if (node.files && node.files[0]) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        imgURL = e.target.result;
                    };
                    reader.readAsDataURL(node.files[0]);
                }
            }
            creatStatusImg(imgRUL);
            if( $('.fileImg').attr('src')!=""){
                $('.postingBox2 .photoImg').css('display','block');
            }else {
                $('.postingBox2 .photoImg').css('display','none');
            }
            $(this).remove('id');
            return imgURL;

        })
        $('#statusPhoto').click();
    });

    $('.shareA').on('click', function () {
        var views=Number($(this).parents('.bbsmainRight').find('.views').html());
        var pid=Number($(this).attr("href").substring(18));
        var newViews = views+1;
        $.ajax({
            type:"POST",
            url:"/addViews",
            data:{
                views:newViews,
                pid:pid
            },
            success: function (msg) {
               if(msg.code==3){
                   console.log("浏览数目更新成功")
               }else {
                   console.log("浏览数目更新失败")
               }
            }
        })
    })
    $('.shareTitle').on('click', function () {
        var views=Number($(this).parents('.bbsmainRight').find('.views').html());
        var pid=Number($(this).attr("href").substring(18));
        var newViews = views+1;
        $.ajax({
            type:"POST",
            url:"/addViews",
            data:{
                views:newViews,
                pid:pid
            },
            success: function (msg) {
                if(msg.code==3){
                    console.log("浏览数目更新成功")
                }else {
                    console.log("浏览数目更新失败")
                }
            }
        })
    })
});
function renderMessage(arr){
    var html="";//拼接字符
    for(var i=0;i<arr.length;i++){
        html+='<li class="o clear"><div class="fl information_headImg"> <!--评论者头像--> <a target="_blank" href="/user/205990" class="h">'+
            '<img class="headImg" src="'+arr[i].imgHead+'"></a></div>'+
            '<div class="block"><div class="clear"> <div class="fl"> <span class="nameNew"> <!-- 评论者名字--> ' +
            '<a href="/user/205990" target="_blank">'+arr[i].uname+'</a></span> <!-- 评论时间-->' +
            '<span class="times">'+arr[i].c_dateTime+'</span> </div>' +
            '<a href="javascript:;" class="fr re" data-comment_type="9" data-comment_id="107812" data-user_name="哈哈啦">回复</a> </div> ' +
            '<!--评论内容--> <p class="c"> <span class="texts">'+arr[i].comments+'</span> </p> </div> </li>'
    }
      return html;//将div渲染到页面上
}
function resizeImg(img, maxWidth, maxHeight){
    var w = img.width,
        h = img.height;
// 当图片比预览区域小时不做任何改变
    if(w < maxWidth && h < maxHeight) return;
// 当实际图片比例大于预览区域宽高比例时
// 缩放图片宽度，反之缩放图片宽度
    w/h > maxWidth/maxHeight ? img.width = maxWidth : img.height = maxHeight;
};

