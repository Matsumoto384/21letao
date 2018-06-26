/**
 * Created by Sebastian on 2018/6/26.
 */
$(function(){
  var currentPage = 1;//当前页
  var pageSize = 5;//每天条数

  //1.渲染页面
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize,
      },
      dataType:'json',
      success:function(info){
        $('tbody').html(template('tmp',info));

      //  分页初始化
        $('#pages').bootstrapPaginator({
        //  版本号
          bootstrapMajorVersion:3,
        //  总页数
          totalPages:Math.ceil(info.total / info.size),
        //  指定当前页
          currentPage:info.page,
        //  给按钮添加点击事件
          onPageClicked:function(a,b,c,page){
          //  更新当前页
            currentPage = page;
          //  重新渲染
            render();
          }
        })
      }
    })
  }


//  2.添加分类功能
  $('#addBtn').click(function(){
    //console.log(1);
    $('#addModal').modal('show');
  })

//  3.表单验证
  $('#form').bootstrapValidator({
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
  //  配置字段
    fields:{
      categoryName:{
        //配置校验规则
        validators:{
          notEmpty:{
            message:'一级分类名称不能为空'
          }
        }

      }
    }

  })

//  4.注册表单校验成功事件
  $('#form').on('success.form.bv',function(e){
  //  阻止默认提交
    e.preventDefault;

    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      //表单序列化
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        if(info.success){
        //  添加成功
        //  关闭模态框
          $('#addModal').modal('hide');
        //  重新渲染第一页
          currentPage = 1;
          render();
        //  重置模态框表单（内容和校验状态
        //  true不仅重置校验状态还重置表单内容
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })


})