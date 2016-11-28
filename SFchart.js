//简易的基于canvas的图表插件

(function(){
var SFchart = {}	

//2D柱状图
SFchart.Column2D = function(opt){
	//默认参数	
	this.setting = {
		num : 1,   //计数器{
		xSize : 12,
		ySize : 12,
		titleSize : 12,
		ySign : "",
		animation : false,
		title : ''
	}
	//参数重写
	extend(this.setting,opt);
}	
SFchart.Column2D.prototype.draw = function(ctx){
	//标题
	this.drawTitle();
	//坐标
	this.drawAxis();
	//绘制横纵坐标的刻度值
	this.drawAxisScale();	
	if(!this.setting.animation){    //没有动画
		//绘制柱图
		this.drawColumn();
	}else{     //有动画
		//绘制柱图
		this.drawColumnAnimation();
	}
}
//绘制坐标
SFchart.Column2D.prototype.drawAxis = function(){
	//横坐标
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(this.setting.ySize*3,this.setting.height+this.setting.titleSize*1.5);
	ctx.lineTo(this.setting.width + this.setting.ySize,this.setting.height+this.setting.titleSize*1.5);
	ctx.stroke();
	//纵坐标
	ctx.beginPath();
	ctx.moveTo(this.setting.ySize*3,this.setting.height+this.setting.titleSize*1.5);
	ctx.lineTo(this.setting.ySize*3,this.setting.titleSize*1.5);
	ctx.stroke();
	ctx.restore();
}
//绘制刻度值
SFchart.Column2D.prototype.drawAxisScale = function(){
	var len = this.setting.data.length;
	var intervalWidth = (this.setting.width - len*this.setting.columnWidth)/(len+1);
	ctx.save();
	for(var i=0; i<len; i++){   //横坐标
		ctx.beginPath();
		var textLen1 = ctx.measureText(this.setting.data[i].name).width;
		ctx.font = "italic " + this.setting.xSize + "px sans-serif";
		ctx.fillText(this.setting.data[i].name, this.setting.ySize*3+this.setting.columnWidth*0.5+(i+1)*intervalWidth+i*this.setting.columnWidth-textLen1/2, this.setting.height+this.setting.titleSize*1.5+this.setting.xSize*1.5);
	}
	for(var i=0; i<this.setting.yNum; i++){  //纵坐标
		ctx.beginPath();
		ctx.font = "italic " + this.setting.ySize + "px sans-serif";
		ctx.fillText(this.setting.maxY/(this.setting.yNum-1)*i+this.setting.ySign, 0, this.setting.height+this.setting.titleSize*1.5-this.setting.height/(this.setting.yNum-1)*i);
	}		
	ctx.restore();
}
//绘制无动画柱
SFchart.Column2D.prototype.drawColumn = function(){
	var len = this.setting.data.length;
	var intervalWidth = (this.setting.width - len*this.setting.columnWidth)/(len+1);
	ctx.save();
	for(var i=0; i<len; i++){
		ctx.beginPath();
		ctx.lineWidth = this.setting.columnWidth;
		ctx.strokeStyle = this.setting.data[i].color;
		ctx.moveTo(this.setting.ySize*3+this.setting.columnWidth*0.5+(i+1)*intervalWidth+i*this.setting.columnWidth,this.setting.height+this.setting.titleSize*1.5-1);
		ctx.lineTo(this.setting.ySize*3+this.setting.columnWidth*0.5+(i+1)*intervalWidth+i*this.setting.columnWidth,(1-this.setting.data[i].value/this.setting.maxY)*this.setting.height+this.setting.titleSize*1.5-1);
		ctx.stroke();
	}
	ctx.restore();
	this.drawValue();
}
//绘制有动画柱
SFchart.Column2D.prototype.drawColumnAnimation = function(){
	var num = this.setting.num;
	var _this = this;
	var timer = setInterval(function(){
		var len = _this.setting.data.length;
		var intervalWidth = (_this.setting.width - len*_this.setting.columnWidth)/(len+1);
		ctx.clearRect(_this.setting.ySize*3,_this.setting.titleSize*1.5,_this.setting.width,_this.setting.height);
		ctx.save();
		for(var i=0; i<len; i++){
			ctx.beginPath();
			ctx.lineWidth = _this.setting.columnWidth;
			ctx.strokeStyle = _this.setting.data[i].color;
			ctx.moveTo(_this.setting.ySize*3+_this.setting.columnWidth*0.5+(i+1)*intervalWidth+i*_this.setting.columnWidth,_this.setting.height+_this.setting.titleSize*1.5);
			ctx.lineTo(_this.setting.ySize*3+_this.setting.columnWidth*0.5+(i+1)*intervalWidth+i*_this.setting.columnWidth,_this.setting.height+_this.setting.titleSize*1.5-1-_this.setting.data[i].value/_this.setting.maxY*_this.setting.height/20*num);
			ctx.stroke();
		}
		ctx.restore();
		num++;
		if(num>20){
			clearInterval(timer);
			_this.animationEnd();	
		}			
	},30)	
}
//绘制标题
SFchart.Column2D.prototype.drawTitle = function(){
	ctx.save();
	ctx.beginPath();
	var textLen = ctx.measureText(this.setting.title).width;
	ctx.font = "italic " + this.setting.titleSize + "px sans-serif";
	ctx.fillText(this.setting.title, (this.setting.width-textLen)*0.5, this.setting.titleSize);
	ctx.restore();
}
SFchart.Column2D.prototype.drawValue = function(){
	var len = this.setting.data.length;
	var intervalWidth = (this.setting.width - len*this.setting.columnWidth)/(len+1);
	ctx.save();
	for(var i=0; i<len; i++){   //横坐标
		ctx.beginPath();
		var newValue = this.setting.data[i].value+this.setting.ySign;
		var textLen2 = ctx.measureText(newValue).width;
		ctx.font = "italic " + this.setting.titleSize + "px sans-serif";
		ctx.fillText(newValue, this.setting.ySize*3+this.setting.columnWidth*0.5+(i+1)*intervalWidth+i*this.setting.columnWidth-textLen2/2, (1-this.setting.data[i].value/this.setting.maxY)*this.setting.height+this.setting.titleSize*1.5-4);
	}
	ctx.restore();
}
//动画执行完毕触发
SFchart.Column2D.prototype.animationEnd = function(){
	this.drawValue();	
}


//2Darea
SFchart.Area2D = function(opt){
	//默认参数	
	this.setting = {
		num : 1,   //计数器
		xSize : 12,
		ySize : 12,
		titleSize : 12,
		ySign : '',
		animation : false,
		title : ''
	}
	//参数重写
	extend(this.setting,opt);
}

SFchart.Area2D.prototype.draw = function(){
	this.showValue = {
		"divBar" : null,
		"spanValue" : []	
	}
	var divBar = document.createElement('div');
	divBar.style.background = "green";
	divBar.style.position = "absolute";
	divBar.style.width = "2px";
	divBar.style.height = this.setting.height+"px";	
	divBar.style.display = "none";
	this.showValue.divBar = divBar;
	document.body.appendChild(divBar);
	for(var i=0; i<this.setting.data.length; i++){
		var spanValue = document.createElement('span');
		spanValue.style.position = "absolute";
		spanValue.style.color = "green";
		spanValue.style.border = "2px solid green";
		spanValue.style.borderRadius = "4px";
		spanValue.style.padding = "2px";
		spanValue.style.display = "none";
		this.showValue.spanValue.push(spanValue);
		document.body.appendChild(spanValue);
	}

	if(this.setting.animation){
		var _this = this;
		var timer = setInterval(function(){
			ctx.clearRect(0,0,_this.setting.canvasWidth,_this.setting.canvasHeight);
			//网格
			_this.drawAxis();
			//刻度
			_this.drawAxisScale();
			//画曲线
			_this.drawCurveAnimation();
			_this.drawTitle();
			_this.setting.num++;
			if(_this.setting.num>20){
				clearInterval(timer);	
				_this.drawValueLine();
			}			
		},30);
		return;
	}
	//网格
	this.drawAxis();
	//刻度
	this.drawAxisScale();
	//画曲线
	this.drawCurve();
	this.drawValueLine();
	this.drawTitle();
}

//绘制坐标轴
SFchart.Area2D.prototype.drawAxis = function(){
	var yNum = (this.setting.yMax - this.setting.yMin)/this.setting.yInterval;
	var yLen = this.setting.height/yNum;
	var xNum = this.setting.labels.length;
	var xLen = this.setting.width/(xNum-1);
	ctx.save();
	//横轴
	for(var i=0; i<=yNum; i++){
		if(i){
			ctx.strokeStyle = "rgba(0,0,0,0.4)";
		}
		ctx.beginPath();
		ctx.moveTo(this.setting.ySize*3,this.setting.height+this.setting.titleSize*1.5-yLen*i);
		ctx.lineTo(this.setting.width + this.setting.ySize*3,this.setting.height+this.setting.titleSize*1.5-yLen*i);
		ctx.stroke();			
	}

	//纵轴
	for(var i=0; i<xNum; i++){
		ctx.beginPath();
		ctx.moveTo(this.setting.ySize*3+xLen*i,this.setting.height+this.setting.titleSize*1.5);
		ctx.lineTo(this.setting.ySize*3+xLen*i,this.setting.titleSize*1.5);
		ctx.stroke();			
	}	
	ctx.restore();
}
//坐标刻度
SFchart.Area2D.prototype.drawAxisScale = function(){
	var len = this.setting.labels.length;
	var intervalWidth = (this.setting.width)/(len-1);
	var yNum = (this.setting.yMax - this.setting.yMin)/this.setting.yInterval;
	var yLen = this.setting.height/yNum;
	ctx.save();
	for(var i=0; i<len; i++){   //横坐标
		ctx.beginPath();
		var textLen1 = ctx.measureText(this.setting.labels[i]).width;
		ctx.font = "italic " + this.setting.xSize + "px sans-serif";
		ctx.fillText(this.setting.labels[i], this.setting.ySize*3+i*intervalWidth-textLen1/2, this.setting.height+this.setting.titleSize*1.5+this.setting.xSize*1.5);
	}
	for(var i=0; i<=yNum; i++){  //纵坐标
		ctx.beginPath();
		ctx.font = "italic " + this.setting.ySize + "px sans-serif";
		ctx.fillText(this.setting.yMin+this.setting.yInterval*i+this.setting.ySign, 0, this.setting.height+this.setting.titleSize*1.5-yLen*i);
	}		
	ctx.restore();
}
//折线图
SFchart.Area2D.prototype.drawCurve = function(){
	var xNum = this.setting.labels.length;
	var xLen = this.setting.width/(xNum-1);
	for(var i=0; i<this.setting.data.length; i++){
		var item = this.setting.data[i];
		ctx.save();
		ctx.fillStyle = item.color;
		for(var j=0; j<item.value.length; j++){
			ctx.beginPath();
			ctx.arc(this.setting.ySize*3+xLen*j, this.setting.height+this.setting.titleSize*1.5-(item.value[j]-this.setting.yMin)/(this.setting.yMax-this.setting.yMin)*this.setting.height, 4, 0, Math.PI*2);
			ctx.fill();
		}
		ctx.restore();
		
		ctx.save();
		ctx.strokeStyle = item.color;
		ctx.lineWidth = item.line_width;
		ctx.beginPath();
		for(var j=0; j<item.value.length; j++){
			ctx.lineTo(this.setting.ySize*3+xLen*j, this.setting.height+this.setting.titleSize*1.5-(item.value[j]-this.setting.yMin)/(this.setting.yMax-this.setting.yMin)*this.setting.height);
		}
		ctx.stroke();
		ctx.restore();
		
		ctx.save();
		ctx.fillStyle = item.color;
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		for(var j=-1; j<=item.value.length; j++){
			if(j===-1){
				ctx.lineTo(this.setting.ySize*3, this.setting.height+this.setting.titleSize*1.5);
			}else if(j===item.value.length){
				ctx.lineTo(this.setting.ySize*3+this.setting.width, this.setting.height+this.setting.titleSize*1.5);
			}else{
				ctx.lineTo(this.setting.ySize*3+xLen*j, this.setting.height+this.setting.titleSize*1.5-(item.value[j]-this.setting.yMin)/(this.setting.yMax-this.setting.yMin)*this.setting.height);
			}
		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
}

SFchart.Area2D.prototype.drawCurveAnimation = function(){
	var xNum = this.setting.labels.length;
	var xLen = this.setting.width/(xNum-1);
	for(var i=0; i<this.setting.data.length; i++){
		var item = this.setting.data[i];
		ctx.save();
		ctx.fillStyle = item.color;
		for(var j=0; j<item.value.length; j++){
			ctx.beginPath();
			ctx.arc(this.setting.ySize*3+xLen*j, this.setting.height+this.setting.titleSize*1.5-(item.value[j]-this.setting.yMin)/20*this.setting.num/(this.setting.yMax-this.setting.yMin)*this.setting.height, 4, 0, Math.PI*2);
			ctx.fill();
		}
		ctx.restore();
		
		ctx.save();
		ctx.strokeStyle = item.color;
		ctx.lineWidth = item.line_width;
		ctx.beginPath();
		for(var j=0; j<item.value.length; j++){
			ctx.lineTo(this.setting.ySize*3+xLen*j, this.setting.height+this.setting.titleSize*1.5-(item.value[j]-this.setting.yMin)/20*this.setting.num/(this.setting.yMax-this.setting.yMin)*this.setting.height);
		}
		ctx.stroke();
		ctx.restore();
		
		ctx.save();
		ctx.fillStyle = item.color;
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		for(var j=-1; j<=item.value.length; j++){
			if(j===-1){
				ctx.lineTo(this.setting.ySize*3, this.setting.height+this.setting.titleSize*1.5);
			}else if(j===item.value.length){
				ctx.lineTo(this.setting.ySize*3+this.setting.width, this.setting.height+this.setting.titleSize*1.5);
			}else{
				ctx.lineTo(this.setting.ySize*3+xLen*j, this.setting.height+this.setting.titleSize*1.5-(item.value[j]-this.setting.yMin)/20*this.setting.num/(this.setting.yMax-this.setting.yMin)*this.setting.height);
			}
		}
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}
}

SFchart.Area2D.prototype.drawValueLine = function(){
	var _this = this;
	ctx.beginPath();
	ctx.rect(this.setting.ySize*3,this.setting.titleSize*1.5,this.setting.width,this.setting.height);
	document.getElementById(this.setting.id).onmousemove = function(ev){
        e = ev || event;
        var x = e.clientX - this.offsetLeft;
        var y = e.clientY - this.offsetTop;
		if(ctx.isPointInPath(x,y)){			
			var xNum = _this.setting.labels.length;
			var xLen = _this.setting.width/(xNum-1);
			for(var i=0; i<xNum; i++){
				if(_this.setting.ySize*3+xLen*i < x && x < _this.setting.ySize*3+xLen*(i+1)){
					if((x - _this.setting.ySize*3+xLen*i)>(_this.setting.ySize*3+xLen*(i+1) - x)){
						//右边	
						_this.showValue.divBar.style.display = "block";
						_this.showValue.divBar.style.left = _this.setting.ySize*3+xLen*(i+1) + this.offsetLeft + "px";
						_this.showValue.divBar.style.top = _this.setting.titleSize*1.5 + this.offsetTop + "px";
						for(var j=0; j<_this.showValue.spanValue.length; j++){
							_this.showValue.spanValue[j].style.display = "inline-block";
							_this.showValue.spanValue[j].innerHTML = _this.setting.data[j].name + " : "+ _this.setting.data[j].value[i+1] + _this.setting.ySign ;	
							_this.showValue.spanValue[j].style.left = _this.setting.ySize*3+xLen*(i+1) + this.offsetLeft + 4 + "px";
							_this.showValue.spanValue[j].style.top = _this.setting.height+_this.setting.titleSize*1.5-(_this.setting.data[j].value[i+1]-_this.setting.yMin)/(_this.setting.yMax-_this.setting.yMin)*_this.setting.height + this.offsetTop + "px";
						}
					}else{
						//左边
						_this.showValue.divBar.style.display = "block";
						_this.showValue.divBar.style.left = _this.setting.ySize*3+xLen*i + this.offsetLeft + "px";
						_this.showValue.divBar.style.top = _this.setting.titleSize*1.5 + this.offsetTop + "px";
						for(var j=0; j<_this.showValue.spanValue.length; j++){
							_this.showValue.spanValue[j].style.display = "inline-block";
							_this.showValue.spanValue[j].innerHTML = _this.setting.data[j].name + " : "+ _this.setting.data[j].value[i] + _this.setting.ySign ;	
							_this.showValue.spanValue[j].style.left = _this.setting.ySize*3+xLen*i + this.offsetLeft + 4 + "px";
							_this.showValue.spanValue[j].style.top = _this.setting.height+_this.setting.titleSize*1.5-(_this.setting.data[j].value[i]-_this.setting.yMin)/(_this.setting.yMax-_this.setting.yMin)*_this.setting.height + this.offsetTop + "px";
						}
					}
				}
			}
		}else{
			_this.showValue.divBar.style.display = "none";	
			for(var j=0; j<_this.showValue.spanValue.length; j++){
				_this.showValue.spanValue[j].style.display = "none";
			}
		}	
	}
}
//绘制标题
SFchart.Area2D.prototype.drawTitle = function(){
	ctx.save();
	ctx.beginPath();
	var textLen = ctx.measureText(this.setting.title).width;
	ctx.font = "italic " + this.setting.titleSize + "px sans-serif";
	ctx.fillText(this.setting.title, (this.setting.width-textLen)*0.5, this.setting.titleSize);
	ctx.restore();
}



//2D饼状图

SFchart.Pie2D = function(opt){
	//默认参数	
	this.setting = {
		
	}
	//参数重写
	extend(this.setting,opt);
}	
SFchart.Pie2D.prototype.draw = function(ctx){
	if(this.setting.animation){
		this.drawCircleAnimation();
	}else{
		this.drawCircle();	
		this.drawValue();
		this.hover();
	}
	
}
SFchart.Pie2D.prototype.drawCircle = function(){
	var angle_pre= 0;
	var angle_next= 0;
	var x = this.setting.xCircle;
	var y = this.setting.yCircle;
	var r = this.setting.rCircle;
	
	for(var i=0; i<this.setting.data.length; i++){
		angle_next+=this.setting.data[i].value;
		ctx.beginPath();
		ctx.fillStyle = this.setting.data[i].color;
		ctx.strokeStyle = "white";
		ctx.moveTo(x,y);
		ctx.arc(x,y,r,angle_pre/100*Math.PI*2,angle_next/100*Math.PI*2);
		ctx.lineTo(x,y);
		ctx.fill();	
		ctx.stroke();	
		ctx.closePath();
		angle_pre = angle_next;
	}
	
}

SFchart.Pie2D.prototype.drawCircleAnimation = function(){
	var x = this.setting.xCircle;
	var y = this.setting.yCircle;
	var r = this.setting.rCircle;
	var num = 0;
	var _this = this;
	
	var timer = setInterval(function(){
		var now = 0;
		for(var i=0; i<_this.setting.data.length; i++){
			now+=_this.setting.data[i].value;
			if(num<now){
				ctx.beginPath();
				ctx.fillStyle = _this.setting.data[i].color;
				ctx.moveTo(x,y);
				ctx.arc(x,y,r,num/100*Math.PI*2,(num+1)/100*Math.PI*2);
				ctx.lineTo(x,y);
				ctx.fill();	
				ctx.closePath();
				break;	
			}	
		}
		num+=0.5;
		if(num>=100){
			clearInterval(timer);	
			_this.drawCircle();
			_this.drawValue();
			_this.hover();
		}
	},20)
}
SFchart.Pie2D.prototype.drawValue = function(){

	for(var i=0; i<this.setting.data.length; i++){
		var now = 0;
		if(i===0){
			now = this.setting.data[i].value/2;
		}else{
			for(var j=0; j<=(i-1); j++){
				now += this.setting.data[j].value;	
			}
			now += this.setting.data[i].value/2;			
		}
		
		var str = this.setting.data[i].name + ' : ' + this.setting.data[i].value + '%';
		var strLen = ctx.measureText(str).width;

		var x = Math.cos(-now/100*Math.PI*2)*this.setting.rCircle;
		var y = Math.sin(-now/100*Math.PI*2)*this.setting.rCircle;
		
		ctx.font = "italic 12px sans-serif";
		ctx.fillStyle = "green";
		if(now>25&&now<75){
			ctx.fillText(str, this.setting.xCircle+x-strLen, this.setting.yCircle-y);		
		}else{
			ctx.fillText(str, this.setting.xCircle+x, this.setting.yCircle-y);
		}
	}	
}

SFchart.Pie2D.prototype.hover = function(){

	var oC = document.getElementById(this.setting.id);
	var x = this.setting.xCircle;
	var y = this.setting.yCircle;
	var r = this.setting.rCircle;
	var _this = this;
	var i_prev = 0;

	
	document.onmousemove = function(ev){
		var angle_pre= 0;
		var angle_next= 0;
		var e = ev || event;
		var xM = e.clientX - oC.offsetLeft;
		var yM = e.clientY - oC.offsetTop;
		
		for(var i=0; i<_this.setting.data.length; i++){
			angle_next+=_this.setting.data[i].value;
			ctx.beginPath();
			ctx.moveTo(x,y);
			ctx.arc(x,y,r,angle_pre/100*Math.PI*2,angle_next/100*Math.PI*2);
			ctx.lineTo(x,y);
			if(ctx.isPointInPath(xM,yM)){
				console.log(i);
				if(i!=i_prev){
					console.log(i);
					_this.drawHover(i);
				}
				i_prev = i;
				return;	
			}
			angle_pre = angle_next;
		}	
		ctx.clearRect(x-2*r,y-2*r,4*r,4*r);
		_this.drawCircle();
		_this.drawValue();
	}
}

SFchart.Pie2D.prototype.drawHover = function(target){
	var x = this.setting.xCircle;
	var y = this.setting.yCircle;
	var r = this.setting.rCircle;
	ctx.clearRect(x-2*r,y-2*r,4*r,4*r);
	
	var angle_pre= 0;
	var angle_next= 0;
	var x = this.setting.xCircle;
	var y = this.setting.yCircle;
	var r = this.setting.rCircle;
	
	for(var i=0; i<this.setting.data.length; i++){
		angle_next+=this.setting.data[i].value;
		ctx.save();
		ctx.beginPath();
		if(i==target){
			ctx.globalAlpha = 0.6;	
		}else{
			ctx.globalAlpha = 1;	
		}
		ctx.fillStyle = this.setting.data[i].color;
		ctx.strokeStyle = "white";
		ctx.moveTo(x,y);
		ctx.arc(x,y,r,angle_pre/100*Math.PI*2,angle_next/100*Math.PI*2);
		ctx.lineTo(x,y);
		ctx.fill();	
		ctx.stroke();	
		ctx.closePath();
		ctx.restore();
		angle_pre = angle_next;
	}
	this.drawValue();
}



//对外接口
window.SFchart = SFchart;
//参数覆盖
function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr] = obj2[attr];
	}
}

})()