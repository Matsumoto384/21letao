/**
 * Created by Sebastian on 2018/6/29.
 */

$(function(){

  //1.渲染用户信息
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType:'json',
    success:function(info){
      if(info.error === 400){
      //  说明当前用户没有登录
        location.href = 'login.html';
        return;
      }
      $('#userInfo').html(template('tmp',info));

    }
  });

//  2.退出功能
  $('#logoutBtn').click(function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      dataType:'json',
      success:function(info){
        if(info.success){
          location.href = 'login.html';
        }
      }
    })
  })

})