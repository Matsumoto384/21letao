/**
 * Created by Sebastian on 2018/7/1.
 */

$(function(){

//  点击登录功能
  $('#loginBtn').click(function(){
    var username = $('[name="username"]').val();
    var password = $('[name="password"]').val();
    if(!username){
      mui.toast('请输入用户名');
      return;
    }
    if(!password){
      mui.toast('请输入密码');
      return;
    }

    $.ajax({
      type:'post',
      url:'/user/login',
      data: {
        username:username,
        password:password
      },
      dataType:'json',
      success:function(info){
        if(info.error){
          mui.toast('用户名或者密码错误');
        }else if(info.success){
        //  登录成功需要跳转
        //  1).传了地址，跳到地址页面
        //  2).没传地址，跳转到会员中心
          if(location.search.indexOf('retUrl') > -1){
          //  传地址
            var retUrl = location.search.replace('?retUrl=','');
            location.href = retUrl;
          }else{
          //  没有传地址
            location.href = 'user.html';
          }
        }
      }
    })
  })

})