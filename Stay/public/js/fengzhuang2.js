//check昵称
function checkUsername(){
    var id = 'user_name';
    var _this = $('#' + id);
    var _valthis = $.trim(_this.val());
    var isPass = false;
    if(_this.length == 0 || _valthis.length == 0){
        setErrorMsg(id, '昵称不能为空，长度为2至20个字符');
        _this.focus();
        isPass = false;
    }else{
        $.ajax({
            type: 'post',
            url: '/api/checkusername',
            data: {'user_name': _valthis},
            async: false,
            dataType:'json',
            success: function(result){
                if(result.code == 400){
                    setErrorMsg(id, '昵称太短，长度为2至20个字符');
                    _this.focus();
                    isPass = false;
                }else if(result.code == 401){
                    setErrorMsg(id, '昵称太长，长度为2至20个字符');
                    _this.focus();
                    isPass = false;
                }else if(result.code == 403){
                    if(result.msg == '206205'){
                        setSuccess(id);
                        isPass = true;
                    }else{
                        setErrorMsg(id, '昵称已经被占用，请选择其他昵称');
                        _this.focus();
                        isPass = false;
                    }
                }else if(result.code != 200){
                    setErrorMsg(id, '昵称必须是中文、字母或数字，请重新输入昵称');
                    _this.focus();
                    isPass = false;
                }else{
                    setSuccess(id);
                    isPass = true;
                }
            },
            error: function(){
                _this.focus();
                isPass = false;
            }
        });
    }
    return isPass;
}
//checkAvatar
function checkAvatar(){
    return true;

    var id = 'avatar';
    var _this = $('#' + id);
    var _valthis = $.trim(_this.val());
    if(_this.length == 0 || _valthis.length == 0){
        setErrorMsg(id, '头像不能为空，请重新上传');
        _this.focus();
        return false;
    }else{
        setSuccess(id);
        return true;
    }
}
//check性别
function checkGender(){
    return true;

    var id = 'gender';
    var _this = $('#' + id);
    var _valthis = parseInt(_this.val());
    if(_valthis.length == 0 || _valthis > 1 || _valthis < 0){
        setErrorMsg(id, '性别不能为空，请重新选择');
        $('input[name="gender_radio"]').focus();
        return false;
    }else{
        setSuccess(id);
        return true;
    }
}
//check登录邮箱
function checkLoginName(){
    return true;

    var id = 'login_name';
    var _this = $('#' + id);
    var _valthis = $.trim(_this.val());
    var searchStr = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
    if(_this.length == 0 || _valthis.length == 0){
        setErrorMsg(id, '邮箱不能为空，请重新填写');
        _this.focus();
        return false;
    }else if(_valthis.length > 0 && !searchStr.test(_valthis)) {
        setErrorMsg(id, '邮箱格式不正确，请重新填写');
        _this.focus();
        return false;
    }else{
        setSuccess(id);
        return true;
    }
}
//check邮箱
function checkEmail(){
    return true;

    var id = 'email';
    var _this = $('#' + id);
    var _valthis = $.trim(_this.val());
    var searchStr = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
    if(_this.length == 0 || _valthis.length == 0){
        setErrorMsg(id, '邮箱不能为空，请重新填写');
        _this.focus();
        return false;
    }else if(_valthis.length > 0 && !searchStr.test(_valthis)) {
        setErrorMsg(id, '邮箱格式不正确，请重新填写');
        _this.focus();
        return false;
    }else{
        setSuccess(id);
        return true;
    }
}
//check绑定电话
function checkPhoneNumber(){
    return true;

    var id = 'phone_number';
    var _this = $('#' + id);
    var _valthis = $.trim(_this.val());
    var searchStr = /^[\+\-\d\s]*$/;
    if(_valthis.length == 0){
        setErrorMsg(id, '电话号码不能为空，请重新填写');
        _this.focus();
        return false;
    }else if(_valthis.length < 7 || !searchStr.test(_valthis)){
        setErrorMsg(id, '电话格式不正确，请重新填写');
        _this.focus();
        return false;
    }else{
        setSuccess(id);
        return true;
    }
}
//check电话
function checkTel(){
    return true;

    var id = 'tel';
    var _this = $('#' + id);
    var _valthis = $.trim(_this.val());
    var searchStr = /^[\+\-\d\s]*$/;
    if(_valthis.length == 0){
        setErrorMsg(id, '电话号码不能为空，请重新填写');
        _this.focus();
        return false;
    }else if(_valthis.length < 7 || !searchStr.test(_valthis)){
        setErrorMsg(id, '电话格式不正确，请重新填写');
        _this.focus();
        return false;
    }else{
        setSuccess(id);
        return true;
    }
}
//check生日
function checkBirth(){
    return true;

    var index_y = $('#birth_year').find('option:selected').index();
    var index_m = $('#birth_month').find('option:selected').index();
    var index_d = $('#birth_day').find('option:selected').index();
    if(index_y == 0 || index_m == 0 || index_d == 0){
        setErrorMsg('birth_year', '生日不能为空，请重新选择', 0);
        return false;
    }else{
        setSuccess('birth_year', 0);
        return true;
    }
}
//check省市
function checkPCA() {
    return true;

    var index_a = $('#pca_p').find('option:selected').index();
    var index_b = $('#pca_c').find('option:selected').index();
    //var optlen_a = $('#area_a option').length;
    var optlen_b = $('#pca_c option').length;
    if(index_a == 0 || (index_b == 0 && optlen_b > 1)){
        setErrorMsg('pca_p', '省、市不能为空，请重新选择', 0);
        return false;
    }else{
        setSuccess('pca_p', 0);
        return true;
    }
};
//check通用input必填项
function checkCommon(id){
    return true;

    var _this = $('#' + id);
    var _valthis = $.trim(_this.val());
    if(_this.length == 0 || _valthis.length == 0){
        setErrorMsg(id, '不能为空，请重新填写');
        _this.focus();
        return false;
    }else{
        setSuccess(id);
        return true;
    }
}
