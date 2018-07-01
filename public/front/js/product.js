/**
 * Created by Sebastian on 2018/7/1.
 */


$(function(){

  //1.渲染页面
  var productId = getSearchObj('productId');

  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:productId
    },
    dataType:'json',
    success:function(info){
      $('.lt-main .mui-scroll').html(template('tmp',info));

    //  渲染完成后，调用mui方法，轮播图初始化

      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });

    //  初始化数字框
      mui('.mui-numbox').numbox()
    }
  })


//  用户选择尺码功能
  $('.lt-main').on('click','.lt-size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })


//  2.加入购物车功能
//  1）.点击事件
//  2）.获取用户选择的尺码和数量
//  3）.发送ajax请求，加入购物车

  $('#addCart').click(function(){
    //尺码
    var size = $('.lt-size span.current').text();
    //数量
    var num = $('.mui-numbox-input').val();
    if(!size){
      mui.toast('请选择尺码');
      return;
    }
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:productId,
        size:size,
        num:num
      },
      dataType:'json',
      success:function(info){
        if(info.success){
        //  已登录,加入购物车成功，提示用户加入成功
          mui.confirm(
            '添加成功',
            '温馨提示',
            ['去购物车','继续浏览'],
            function(e){
              if(e.index === 0){
                location.href = 'cart.html';
              }
            }
          )

        }else if(info.error === 400){
          //将当前页面的地址拼接，方便登录后返回到当前页
          location.href = 'login.html?retUrl='+ location.href;
        }
      }
    })

  })

})