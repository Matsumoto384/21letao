/**
 * Created by Sebastian on 2018/6/28.
 */

$(function(){
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
  });


})

//解析地址栏参数，用对象存储
function getSearchObj(name){
  //获取地址后拼接的数据
  var search = location.search;
  //中文解码
  search = decodeURI(search);
  //去掉'?'
  search = search.slice(1);
  //得到键值对的数组['name=张三','age=18']
  var arr = search.split('&');

  var obj = [];
  arr.forEach(function(v,i){
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key] = value;
  });

  return obj[name];
}

