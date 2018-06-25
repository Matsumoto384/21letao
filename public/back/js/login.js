/**
 * Created by Sebastian on 2018/6/25.
 */



$(function(){





//1.表单校验功能
//1）.用户名不能为空长度2-6位
//2）.密码长度6-12位
//  表单校验初始化
  $('#form').bootstrapValidator({

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',//校验成功
      invalid: 'glyphicon glyphicon-remove',//校验失败
      validating: 'glyphicon glyphicon-refresh'//校验中
    },

  //指定校验字段
    fields:{
      username:{
      //  配置校验规则
        validators:{
          //配置非空校验
          notEmpty:{
            message:"用户名不能为空"
          },
          //配置长度校验
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须在2-6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        //  配置校验规则
        validators:{
          //配置非空校验
          notEmpty:{
            message:"密码不能为空"
          },
          //配置长度校验
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须在6-12位"
          },
          //定制一个专门用于响应回调的校验规则
          callback:{
            message:"密码错误"
          }
        }
      }

    }
  });


//  2.需要注册表单校验成功事件
  $('#form').on('success.form.bv',function(e){
    //阻止默认提交
    e.preventDefault();

  //  通过ajax提交
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
    //  表单序列化
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        if(info.success){
        //  登录成功
          location.href="index.html"
        }

        if(info.error === 1000){
          //alert('用户名不存在');
        //  将username的校验状态，置成校验失败状态，并提示用户不存在
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error === 1001){
          //alert('密码错误');
          //  将password的校验状态，置成校验失败状态，并提示密码错误
          //1.字段名 2.校验状态VALID INVALID
          //3.配置提示信息，需要传校验规则
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  });

//  3.重置表单，重置内容和校验状态
  $('[type="reset"]').click(function(){
  //  调用插件提供的方法，进行重置校验状态
  //  resetForm()没有参数，只重置校验状态
    $('#form').data('bootstrapValidator').resetForm();
  })
})