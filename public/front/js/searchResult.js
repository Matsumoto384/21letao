/**
 * Created by Sebastian on 2018/6/29.
 */

$(function(){

//  1.渲染页面
//  1).解析地址栏参数，将值设置给input

  var key = getSearchObj('key')
  $('.search-int').val(key);

  render();
  function render(){

    $('.lt-product').html('<div class="loading"></div>');

    //处理参数
    var params = {};
    params.proName = $('.search-int').val();
    params.page = 1;
    params.pageSize = 100;
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
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:params,
      dataType:'json',
      success:function(info){
        setTimeout(function(){
          $('.lt-product').html(template('tmp',info));
        },500)

      }
    })
  }

//  2.点击搜索功能,历史记录管理
  $('.search-btn').click(function(){
    var key = $('.search-int').val();
    if(!key){
      mui.toast('请输入搜索关键字');
      return;
    }
    //调用render，重新根据搜索框的值进行页面渲染
    render();

  //  搜索成功，需要更新历史记录
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
  $('.lt-sort a[data-type]').click(function(){
    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    }else{
      $(this).addClass('current').siblings().removeClass('current');
    }
    render();
  })


})