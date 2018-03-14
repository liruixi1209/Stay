var a1 = false;
function checkHeadSearch() {
    if (a1 == false) {
        $('#search_in').prev().css("width", "220px");
        $('#search_in').prev().css("right", "0px");
        a1 = true;
        console.log(1);
        return false;

    } else {
        if ($('input[name="k"]').val() == '') {
            $('#search_in').prev().css("width", "0px");
            a1 = false;
            console.log(2);
            return false;
        } else {
            return true;
        }
    }
}

function verifyloginname(){
    window.onbeforeunload = '';
    location.href = "/passport/verifyloginname";
}
function verifymobile(){
    window.onbeforeunload = '';
    location.href = "/passport/verifymobile";
}
//更新用户信息
function upUserInfo(ele, callback){
    var data_key = ele.attr('data-key'),
        data_value = ele.val();
    if(typeof(callback) == 'undefined'){
        var callback = function(){};
    }
    $.ajax({
        url: '/profile/index/',
        type: 'post',
        data: {'ajax':'update-user_info','data_key':data_key,'data_value':data_value},
        dataType: 'json',
        success: function(result){
            if(result.code == 1){
                if(typeof(callback) == 'function'){
                    callback(result);
                }
            }
        }
    });
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
