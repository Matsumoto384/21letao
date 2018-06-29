/**
 * Created by Sebastian on 2018/6/29.
 */

$(function(){

//  用一个数组searchList记录搜索关键字，存储在本地存储中

//  1.搜索历史记录 渲染功能
//  1）.获取本地存储的数据 jsonStr
//  2）.转换成数组
//  3）.通过模板引擎将数组内容渲染到页面上
// var arr = ["耐克", "阿迪达斯", "新百伦", "361", "鸿星尔克"]
// var str = JSON.stringify(arr);
// localStorage.setItem('searchList',str);
  render();


  //获取历史记录数组
  function getHistory(){
    //注：！当本地存储清空后getItem结果为null，所以要设置一个空数组[]
    // 使模板引擎中的arr.length有值
    var history = localStorage.getItem('searchList') || '[]';
    var arr = JSON.parse(history);
    return arr;
  }

//读取历史记录，进行页面渲染
  function render(){
    var arr = getHistory();
    $('.lt-history').html(template('tmp',{arr:arr}))
  }


//2.清空历史记录功能
//  1).给清空按钮添加点击事件
//  2).将searchList从本地存储中清空，使用removeItem（）
//  3).页面重新渲染

  $('.lt-history').on('click','.icon-empty',function(){

    //添加确认框
    //message,title,btnValue,callback
    mui.confirm(
      '您是否要清空全部的历史记录',
      '温馨提示',
      ['取消','确认'],
      function(e){
        //取消0，确认1
        if(e.index === 1){
          localStorage.removeItem('searchList');
          render();
        }
      }
    );


  })

//  3.删除一条记录功能
//  1).删除按钮点击事件（事件委托）
//  2).将所有的索引存储在标签中，用于删除数组中对应的数据
//  3).更新searchList
//  4).重新渲染页面

  $('.lt-history').on('click','.icon-del',function(){
    var that = this;
    mui.confirm(
      '您确认要删除这条搜索记录吗',
      '温馨提示',
      ['取消','确认'],
      function(e){
        //取消0，确认1
        if(e.index === 1){
          var index = $(that).data('index');
          var arr = getHistory();
          //arr.splice(开始索引，删除个数，替换项1，替换项2...)
          arr.splice(index,1);
          localStorage.setItem('searchList',JSON.stringify(arr));
          render();
        }
      }
    );


  })


//  4.添加搜索记录功能
//  1).给搜索按钮添加点击事件
//  2).获取搜索关键字
//  3).获取数组，添加到数组最前unshift
//  4).存储到localStorage中
//  5).重新渲染
  $('.search-btn').click(function(){
    var key = $('.search-int').val();
    //非空验证
    if(!key){
      //message,默认两秒
      mui.toast('请输入搜索关键字');
      return;
    }
    var arr = getHistory();

    //不能出现重复项
    var index = arr.indexOf(key);
    if(index > -1){
    //  删除重复项
      arr.splice(index,1);
    }
    //数组长度max值为10
    if(arr.length >= 10){
      arr.pop();
    }

    arr.unshift(key);
    localStorage.setItem('searchList',JSON.stringify(arr));
    render();
    $('.search-int').val('');

    //进行页面跳转
    location.href = 'searchResult.html?key='+key;

  })





})