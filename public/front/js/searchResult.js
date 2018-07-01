/**
 * Created by Sebastian on 2018/6/29.
 */

$(function(){


  var currentPage = 1;
  var pageSize = 4;

//  1.渲染页面
//  1).解析地址栏参数，将值设置给input

  var key = getSearchObj('key')
  $('.search-int').val(key);

  //render();

  //
  function render( callback ){

    //loading加载
    //$('.lt-product').html('<div class="loading"></div>');

    //处理参数
    var params = {};
    params.proName = $('.search-int').val();
    params.page = currentPage;
    params.pageSize = pageSize;
    //可传参数price num
    //根据有current类的a标签来决定如何排序
    var $current = $('.lt-sort .current');
    if($current.length > 0){
      //有current类的a，排序
      //排序名称
      var sortName = $current.data('type');
      //排序值
      var sortValue = $current.find('i').hasClass('fa-angle-down')? 2 : 1;
      params[sortName] = sortValue;
    }

    setTimeout(function() {
      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:params,
        dataType:'json',
        success:function(info){

          //模拟loading加载
          //setTimeout(function(){
          //  $('.lt-product').html(template('tmp',info));
          //},500)

          callback && callback(info);
        }
      })
    }, 500);
  }

//  2.点击搜索功能,历史记录管理

  $('.search-btn').click(function(){
    var key = $('.search-int').val();
    if(!key){
      mui.toast('请输入搜索关键字');
      return;
    }
    //调用render，重新根据搜索框的值进行页面渲染
    //render();


    //触发下拉刷新，重新渲染
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();

    //搜索成功，需要更新历史记录
    var key = $('.search-int').val();
    var history = localStorage.getItem('searchList');
    var arr = JSON.parse(history);
    var index = arr.indexOf(key);
    if(index > -1){
      arr.splice(index,1);
    }
    if(arr.length >= 10){
      arr.pop();
    }

    arr.unshift(key);
    localStorage.setItem('searchList',JSON.stringify(arr));

  //  清空搜索框
    $('.search-int').val('');
  })

//  3.排序功能
//  1).添加点击事件
//  2).排他加类current
//    切换排序升降相关的类名
//  3).渲染页面


  //$('.lt-sort a[data-type]').click(function(){
    //要给a绑定tap事件
  $('.lt-sort a[data-type]').on('tap',function(){

    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else{
      $(this).addClass('current').siblings().removeClass('current');
    }

    //render();

    //触发下拉刷新重新渲染
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })




  //4.配置下拉刷新,上拉加载
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等

      //下拉
      down : {
        height:50,//可选,默认50.触发下拉刷新拖动距离,
        auto: true,//可选,默认false.首次加载自动下拉刷新一次
        contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback :function(){
          //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；

          //下拉刷新，需要渲染第一页，重置currentPage
          currentPage = 1;
          render(function(info){
            $('.lt-product').html(template('tmp',info));
            //数据回来之后，需要关闭下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

            //  下拉刷新完成后，重新启用上拉加载
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh();
          });
        }
      },
      //上拉加载
      up:{
        callback:function(){
          //  请求下一页的数据
          currentPage++;

          //  渲染
          render(function(info){
            console.log(info);
            if(info.data.length === 0){
              //没有数据，关闭上拉加载
              //endPullupToRefresh(true) 参数为true，显示“没有更多数据”，并且禁用上拉加载
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            }else{
              //有数据正常渲染,正常关闭上拉加载
              $('.lt-product').append(template('tmp',info));
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
            }
          })
        }
      }
    }
  });



  //给a标签添加连接，在区域滚动下拉刷新中，无法点击a标签整个区域

  //$('.lt-product').on('tap','a',function(){
  //  var id = $(this).data('id');
  //  location.href = 'product.html?productId=' + id;
  //})


})