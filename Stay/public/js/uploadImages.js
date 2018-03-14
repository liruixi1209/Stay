
function getImage(node) {
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
    creatImg(imgRUL);
    return imgURL;

}

var textHtml = "";
function creatImg(imgRUL){
    $('#show_photo').attr('src',imgRUL);
    console.log($('#show_photo')[0].src);
}
var srcAll=[];
function uploadImage(node){
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

    return imgURL;

}


var imgNum=1;
function creatStatusImg(imgRUL){
    if(imgNum>6){
        alert('最多只能上传6张图片');
        return;
    }
    var html=' <img src="'+imgRUL+'" class="fileImg" id="imgPreview_'+imgNum+'"> <span class="close" id="ac7_'+imgNum+'"></span>'
    imgNum++;
    $('.photo_addImg').before(html);
    var allPhoto=Number($('.all').html())+1;
    var surplusPhoto=Number($('.surplus').html())-1;
    $('.all').html(allPhoto);
    $('.surplus').html(surplusPhoto);
    if(imgNum>6){
        $('.photo_addImg').hide();
    }else{
        $('.photo_addImg').show();
    }
    srcAll.push(imgRUL);
    console.log(srcAll);
    var srcString =srcAll.join('_');
    $('.srcAll').attr('value',srcString);
    console.log(srcString);
    /*删除图片*/
    $('.postingBox2 .close').each(function (i, elem) {//每次添加图片的时候会给之前添加过的图片重复绑定点击事件，所以要先给所有的close先解绑，保证每张图片只绑定一次删除的点击事件
        $($('.postingBox2 .close').eq(i)).off('click');
        $($('.postingBox2 .close').eq(i)).on('click', function () {
            $($('.postingBox2 .fileImg').eq(i)).remove();
            $(this).remove();
            console.log( $($('.postingBox2 .fileImg').eq(i)));
            imgNum--;
            allPhoto--;
            surplusPhoto++;
            $('.all').html(allPhoto);
            $('.surplus').html(surplusPhoto);


            if(imgNum<2){
                $('.postingBox2 .photoImg').css('display','none')
            }
        })
    });
    console.log(imgNum);


}

