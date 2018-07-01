/**
 * Created by Sebastian on 2018/6/29.
 */

$(function(){

  //1.渲染页面
  function render(){
    $.ajax({
      type:'get',
      url:'/cart/queryCart',
      dataType:'json',
      success:function(info){
        $('#OA_task_2').html(template('tmp',{arr:info}));

      //  页面渲染完结束下拉刷新
        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
      }
    })
  }


  //2.下拉刷新
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        style:'circle',
        auto: true,//可选,默认false.首次加载自动上拉刷新一次
        callback :function(){
          render();
        }
      }
    }
  });

//  3.删除购物车商品功能
//  1).a标签用tap事件
//  2).获取当前删除商品id
  $('#OA_task_2').on('tap','.btn-del',function(){
    var id = $(this).data('id');
    $.ajax({
      type:'get',
      url:'/cart/deleteCart',
      data:{
        id:[id]
      },
      dataType:'json',
      success:function(info){
        if(info.success){
        //  删除成功，重新渲染(下拉刷新
          mui('.mui-scroll-wrapper').pullRefresh.pulldownLoading();

        }
      }
    })
  })


//  4.编辑功能
  $('#OA_task_2').on('tap','.btn-edit',function(){

    //获取自定义属性
    var obj = this.dataset;
    var id = obj.id;

    var htmlStr = template('edit-tmp',obj);
  //  mui默认会将模板中的\n替换为br换行标签
  //  手动替换掉/n
    htmlStr = htmlStr.replace(/\n/g,'');
  //  显示模态框
    mui.confirm(
      htmlStr,
      '编辑商品',
      ['确认','取消'],
      function(e){
        if(e.index === 0){
          var size = $('.lt-size span.current').text();
          var num = $('.mui-numbox-input').val();

          $.ajax({
            type:'post',
            url:'/cart/updateCart',
            data:{
              id:id,
              size:size,
              num:num
            },
            dataType:'json',
            success:function(info){
              if(info.success){
                mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
              }
            }
          })
        }
      }
    )

  //  初始化数字框
    mui('.mui-numbox').numbox()

  })


//  5.尺码选择功能
  $('body').on('click','.lt-size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })



})