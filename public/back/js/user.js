/**
 * Created by Sebastian on 2018/6/26.
 */

$(function(){
  var currentPage = 1;
  var pageSize= 5;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        //在模板中，可以任意使用数据对象中的数据
        var tmpStr = template('tmp',info);
        $('tbody').html(tmpStr);

        //  分页
        $('#pages').bootstrapPaginator({
          bootstrapMajorVersion:3,//需要定义版本号3
          //总页数
          totalPages:Math.ceil(info.total / info.size),
          //  当前页
          currentPage:info.page,
          //  配置按钮点击事件
          //  page表示当前点击的页码
          onPageClicked(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }
//  1.通过ajax获取数据，通过模板引擎渲染





})