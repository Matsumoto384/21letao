/**
 * Created by Sebastian on 2018/6/28.
 */


$(function(){
//  1.左侧列表渲染

  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    dataType:'json',
    success:function(info){
      $('.lt-cate-left ul').html(template('ltmp',info));
      //应该渲染 根据id第一个分类的对应的二级分类
      renderSecondById(info.rows[0].id);
    }
  })

//  2.点击左侧按钮，让二级列表重新渲染
  $('.lt-cate-left').on('click','a',function(){
  //  获取当前点击一级列表的id
    var id = $(this).data('id');
    renderSecondById(id);

  // 让当前a加上current类
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  });


//
  function renderSecondById(id){

    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      dataType:'json',
      success:function(info){
        $('.lt-cate-right ul').html(template('rtmp',info));
      }
    })
  }
})