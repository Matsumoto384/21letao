/**
 * Created by Sebastian on 2018/6/28.
 */

$(function(){
  var currentPage = 1;
  var pageSize = 5;
  //定义一个数组，存储所有用于上传图片地址
  var picArr = [];

//  1.渲染页面
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:'json',
      success:function(info){
        $('tbody').html(template('tmp',info));
      //  分页初始化
        $('#pages').bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total / info.size),
          currentPage:info.page,
          //配置每个按钮的显示文字
          //根据返回值进行文本测试
          //type:按钮的功能类型，page普通页面，next，prev，last
          //page：跳转的哪一页
          //current：表示当前页
          itemTexts:function(type,page,current){
            switch (type){
              case 'first':
                return "首页";
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return page;
            }
          },
          //配置每个按钮的title
          tooltipTitles:function(type,page,current){
            switch (type) {
              case 'first':
                return "首页";
              case 'prev':
                return '上一页';
              case 'next':
                return '下一页';
              case 'last':
                return '尾页';
              case 'page':
                return '前往' + page + '页';
            }
          },
          //使用bootstrap的提示框
          useBootstrapTooltip:true,
          onPageClicked:function(a,b,c,page){
          //  更新
            currentPage = page;
            render();
          }
        })
      }
    })
  }

//  2.显示模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
  //  请求二级分类数据
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100,
      },
      dataType:'json',
      success:function(info){
        $('.dropdown-menu').html(template('ftmp',info))

      }
    })
  })

//3.事件委托
  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownTxt').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
  //  隐藏域校验状态
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
  })
//4.图片上传初始化
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      //data.result
      var picUrl = data.result.picAddr;
      //将图片地址名称的对象，添加到数组中最前面，和图片结构同步
      picArr.unshift(data.result);
      //图片预览
      $('#imgBox').prepend('<img src="'+picUrl+'" height="100" width="100" alt="">');
      //如果长度大于3，就应该删除最后一个
      if(picArr.length > 3){
      //  图片数组删除最后一个，
        picArr.pop();
      //  图片结构删除最后一个
        $('#imgBox img:last-of-type').remove();
      };


    //  如果picArr 数组长度等于3，就说明当前用户已经上传满了3张图片
      // 需要手动重置图片校验状态为成功VALID状态
      if(picArr.length === 3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
    }
  })

//  5.表单校验
  $('#form').bootstrapValidator({
    //默认不校验隐藏域，需要充值excluded为空
    excluded:[],
    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },
    //字段
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选中二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'请输入商品名称'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'请输入商品描述'
          }
        }
      },
      num:{//商品库存要求必须非零开头的数字
        validators:{
          notEmpty:{
            message:'请输入商品库存'
          },
          regexp:{
            //[1-9]可以出现1-9任意一个
            //[^0]除了0都可以出现，包括字母
            // \d 数字[0-9]
            // + 可以出现一次或多次
            // * 可以出现0次或多次
            // ？ 可以出现0次或1次
            // {n} 可以出现n次
            regexp:/^[1-9]\d*$/,
            message:'商品库存必须是非0开头的数字'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'请输入商品尺码'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'商品尺码必须xx-xx的格式，例如:32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传3张图片'
          }
        }
      },
    }
  })

//  6.注册表单校验成功事件
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();

    var paramsStr = $('#form').serialize();

    //&picAddr1=xx&picName1=
    //&picAddr2=xx&picName2=
    //&picAddr3=xx&picName3=

    paramsStr += "&picAddr1="+picArr[0].picAddr+"&picName1="+picArr[0].picName;
    paramsStr += "&picAddr2="+picArr[1].picAddr+"&picName2="+picArr[1].picName;
    paramsStr += "&picAddr3="+picArr[2].picAddr+"&picName3="+picArr[2].picName;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:paramsStr,
      dataType:'json',
      success:function(info){
        if(info.success){
          $('#addModal').modal('hide');
          //重置表单
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownTxt').text('请选择二级分类');
          $('#imgBox img').remove();

          currentPage = 1;
          render();
        }
      }
    })
  })
})