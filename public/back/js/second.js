/**
 * Created by Sebastian on 2018/6/26.
 */

$(function(){

  var currentPage = 1;
  var pageSize = 5;
//  1.渲染页面
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        $('tbody').html(template('tmp',info));

        //分页初始化
        $('#pages').bootstrapPaginator({
        //  版本号
          bootstrapMajorVersion:3,
        //总数
          totalPages:Math.ceil(info.total / info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

//2.实现添加功能
  $('#addBtn').click(function(){
    $('#addModal').modal('show');

  //  发送ajax请求，获取下拉菜单的数据并且渲染
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        //通过加载第一页，100条数据，模拟获取所有数据
        page:1,
        pageSize:100
      },
      dataType:'json',
      success:function(info){
        $('.dropdown-menu').html(template('ftmp',info));

      }
    })
  })

//3.dropdown-menu 的a注册事件，模拟select
  $('.dropdown-menu').on('click','a',function(){
  //  获文本，设置给button内容
    var txt = $(this).text();
    $('#dropdownTxt').text(txt);

  //  获取id设置name="categoryId"的input框
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);

  //  重置name：categoryId 的input框校验状态为valid
    $('#form').data("bootstrapValidator").updateStatus("categoryId","VALID")
  })

//  4.进行jQuery-fileupload 实例化，配置回调函数
  $("#fileupload").fileupload({
    dataType:"json",
    //图片上传完成的回调函数
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data);
      var picUrl = data.result.picAddr;
      $('#imgBox img').attr('src',picUrl);

    //  将图片地址存入name:brandLogo的input框
      $('[name="brandLogo"]').val(picUrl);

      //  重置name：brandLogo 的input框校验状态为valid
      $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID")
    }
  });

//5.表单校验初始化
  $('#form').bootstrapValidator({
    //默认不校验隐藏域，需要充值excluded为空
    excluded:[],
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
  //  配置字段
    fields:{
      categoryId:{
        //用户选择一级分类id
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName:{
        //用户输入二级分类名称
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandLogo:{
        //上传的图片地址
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      }
    }
  })


//  6.注册表单校验成功事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        if(info.success){
          //关闭模态框
          $('#addModal').modal('hide');
          //重置表单
          $('#form').data('bootstrapValidator').resetForm(true);
          //渲染页面
          currentPage = 1;
          render();

          $('#dropdownTxt').text('请选择一级分类');
          $('#imgBox img').attr('src',"imgs/none.png");
        }
      }
    })
  })

})