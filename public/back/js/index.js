/**
 * Created by Sebastian on 2018/6/26.
 */
// 基于准备好的dom，初始化echarts实例
var echarts1 = echarts.init(document.querySelector('.echarts1'));

// 指定图表的配置项和数据
var option = {
  //大标题
  title: {
    text: '2018年 注册人数'
  },
  //提示框组件
  tooltip: {},
  //图例
  legend: {
    //data里的内容必须和数据项的name组合使用，值相同
    data:['人数']
  },
  //x轴坐标
  xAxis: {
    data: ["1月","2月","3月","4月","5月","6月"]
  },
  //y轴坐标，y轴一般不需要设置刻度，根据数据自动生成
  yAxis: {},
  //数据项
  series: [{
    name: '人数',
    //bar表示柱状图，line表示折线图，pie表示饼图
    type: 'bar',
    data: [1000, 1500, 1800, 1200, 2500, 1800]
  }]
};
// 使用刚指定的配置项和数据显示图表。
echarts1.setOption(option);






var echarts2 = echarts.init(document.querySelector('.echarts2'));

// 指定图表的配置项和数据
var option = {
  title : {
    text: '热门品牌销售',
    subtext: '2018年6月',
    x:'center'
  },
  //提示框组件
  tooltip : {
    //item数据项触发，用于饼图
    //axis坐标轴触发
    trigger: 'item',
    //指定提示框组件里的文本
    //{a}系列的名称{b}数据项名称{c}数值{d}百分比
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  //图例
  legend: {
    //控制图例的显示方向，horizontal水平
    orient: 'vertical',
    left: 'left',
    data: ['耐克','阿迪','新百伦','李宁','阿迪王']
  },
  series : [
    {
      name: '品牌',
      type: 'pie',
      //直径的长度
      radius : '55%',
      //圆心位置x,y
      center: ['50%', '60%'],
      data:[
        {value:335, name:'耐克'},
        {value:310, name:'阿迪'},
        {value:234, name:'新百伦'},
        {value:135, name:'李宁'},
        {value:1548, name:'阿迪王'}
      ],
      //设置阴影
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
echarts2.setOption(option);