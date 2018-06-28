/**
 * Created by Sebastian on 2018/6/25.
 */


//  5.如果当前用户没有登录，需要拦截到登录页面
//  登录页面的信息也是没有登录，会一直跳转登录页面
//  所以要把登录页面排除在外
if(location.href.indexOf('login.html') === -1){

  //如果索引为-1 ，说明地址栏参数中没有login.html 需要登录拦截
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){

      if(info.error === 400){
        //  用户没登录,拦截
        location.href="login.html";
      }
      if(info.success){
        console.log('用户登录')
      }
    }
  })
}

//6.实现进度条功能（给ajax请求加），注意要给所有的ajax加
//发送ajax开启进度条，ajax结束，关闭进度条

//第一个ajax发送时，开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
});

//所有的ajax请求完成时调用，关闭进度条
$(document).ajaxStop(function(){
  //模拟网络延迟
  setInterval(function(){
    NProgress.done();
  },500)

});

//公共功能
$(function(){
//  1.左侧二级菜单切换
  $('.lt-aside .cate').click(function(){
    $('.lt-aside .child').stop().slideToggle();
  });
//  2.左侧侧边栏显示隐藏功能
  $('.lt-topbar .icon_menu').click(function(){
    $('.lt-aside').toggleClass('hiddenmenu');
    $('.lt-topbar').toggleClass('hiddenmenu');
    $('.lt-main').toggleClass('hiddenmenu');
  })
//  3.点击头部退出按钮显示模态框
  $('.lt-topbar .icon_logout').click(function(){
    $('#logoutModal').modal('show');
  })
//  4.模态框的退出功能
  $('#logoutBtn').click(function(){
  //  发送ajax请求，进行退出操作
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })


})



