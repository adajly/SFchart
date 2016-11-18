# SoftChart
基于canvas的数据可视化工具

#如何使用
1、引入SFchart.js

```
<script src="SFchart.js"></script>
```
2、在html文件中添加canvas标签

```
<canvas id="myChart" width="800" height="400"></canvas>
```
3、根据需求实例化对象
例：

```
new SFchart.Column2D().draw()
```

```
//2D柱状图实例
var canvas = document.getElementById('myChart');
var ctx = canvas.getContext("2d");
new SFchart.Column2D({
	//配置参数 opt
}).draw(ctx);
```

#配置
1、2Dcolumn

```
//配置项说明
{
	width : 450,   //图表宽度  必填
	height : 300,  //图表高度  必填
	xSize : 12,   //x轴字体大小  选填
	ySize : 12,   //y轴字体大小  选填
	titleSize : 12,   //标题字体大小  选填
	data : data,    // 数据
	columnWidth : 30,  //柱的宽度  必填
	maxY : 40,   //y轴的最大高度
	yNum : 5,    //y轴的刻度数
	ySign : "%",   //y轴的单位
	animation : true,  //是否开启动画  选填
	title : 'demo1'  //标题  选填
}
```

```
//数据格式示例
data = [
	{name : 'IE',value : 35.75,color:'#a5c2d5'},
	{name : 'Chrome',value : 29.84,color:'#cbab4f'},
	{name : 'Safari',value : 6.77,color:'#9f7961'},
	{name : 'Opera',value : 2.02,color:'#a56f8f'},
	{name : 'Firefox',value : 24.88,color:'#76a871'},
	{name : 'Other',value : 0.73,color:'#6f83a5'}
]
```
[点击此处查看示例](https://zyl1314.github.io/SFchart/column2D.html)

2、2DArea
```
//配置项说明
{
	width : 450,   //图表宽度  必填
	height : 300,  //图表高度  必填
	canvasWidth : 800,  //canvas宽度  必填
	canvasHeight : 400,  //canvas高度  必填
	xSize : 12,   //x轴字体大小  选填
	ySize : 12,   //y轴字体大小  选填
	titleSize : 12,   //标题字体大小  选填
	data : data,    // 数据
	labels : labels,  //x轴的值  必填
	yMax  : 40,   //y轴的最大值
	yMin : -10,   //y轴的最小值
	yInterval : 5,  //y轴刻度间隔
	ySign : "%",   //y轴的单位
	animation : true,  //是否开启动画  选填
	title : 'demo1'  //标题  选填
}
```
```
//数据格式示例
var data = [
	{
		name : '上海',
		value:[4,16,18,24,32,36,38,38,36,26,20,14],
		color:'#aad0db',
		line_width:2
	},
	{
		name : '北京',
		value:[-9,1,12,20,26,30,32,29,22,12,0,-6],
		color:'#f68f70',
		line_width:2
	}
];
var labels = ["01月","02月","03月","04月","05月","06月","07月","08月","09月","10月","11月","12月"];
```
[点击此处查看示例](https://zyl1314.github.io/SFchart/area2D.html)
