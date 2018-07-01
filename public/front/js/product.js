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

    }
  })
})