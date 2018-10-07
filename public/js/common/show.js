function Show(){
	this.createDom();
	this.showTime();
};
Show.temp = `<div class="show">
		<img src="/images/time.png" id="shizhong">
		<p><div id="div">
			<img src="/images/0.png" width="15" height="15"/>
			<img src="/images/8.png" width="15" height="15"/>
			时
			<img src="/images/1.png" width="15" height="15"/>
			<img src="/images/5.png" width="15" height="15"/>
			分
			<img src="/images/0.png" width="15" height="15"/>
			<img src="/images/9.png" width="15" height="15"/>
			秒
		</div></p>
		<p>温馨提示：为了能够正常使用，请使用高版本浏览器！(IE10+)</p>
	</div>`;
$.extend(Show.prototype,{
	createDom(){
		$(Show.temp).appendTo("#show_time");
	},
	showTime(){
		var div = document.getElementById("div");
		div.style.right = 0;
		var aImg = div.getElementsByTagName("img");
		//每一秒都要执行一次
		setInterval((function fn(){
			//获取对象
			var date = new Date();
			var hour = addZero(date.getHours());
			var minute = addZero(date.getMinutes());
			var second = addZero(date.getSeconds());
			//拼接成一个字符串
			var str = "" + hour + minute + second;
			
			for(var i = 0; i < aImg.length; i++){
				aImg[i].src = "/images/"+ str[i] +".png";
			}
			return fn;
		})(),1000);
		
		function addZero(n){
			return n < 10? "0"+n : n;
		}
				
	}
})
new Show();