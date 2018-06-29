/**
 * Created by Sebastian on 2018/6/26.
 */

$(function(){
  var currentPage = 1;//当前页
  var pageSize= 5;//每页多少条
  var currentId = null;
  var isDelete = null;

  //  1.通过ajax获取数据，通过模板引擎渲染
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

//  2.启用禁用功能，点击按钮，弹出模态框
  $('tbody').on('click','.btn',function(){
  //  让模态框显示
    $('#userModal').modal('show');
    //点击时候，将当前选中的用户id记录在全局currentId
    currentId = $(this).parent().data('id');
  //  点击禁用按钮，让用户变成禁用状态 即 isDelete：0
    isDelete = $(this).hasClass('btn-danger') ? 0 :1;
  })

//  点击确定按钮更数据
  $('#submitBtn').click(function(){
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:currentId,
        isDelete:isDelete,
      },
      dataType:'json',
      success:function(){

      //  1.关闭模态框
        $('#userModal').modal('hide');
      //  2.重新渲染页面
        render();
      }
    })
  })



})