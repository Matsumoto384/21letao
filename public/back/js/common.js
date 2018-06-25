/**
 * Created by Sebastian on 2018/6/25.
 */

//实现进度条功能（给ajax请求加），注意要给所有的ajax加
//发送ajax开启进度条，ajax结束，关闭进度条

//第一个ajax发送时，开启进度条
$(document).ajaxStart(function(){
  NProgress.start();
});

//所有的ajax请求完成时调用，关闭进度条
$(document).ajaxStop(function(){
  //模拟网络延迟
  setInterval(function(){
    NProgress.done();
  },5000)

})
