function Update(){
	this.init();
	this.addListener();
}

$.extend(Update.prototype,{
	init(){
		$(".updatePwd").addClass("active").siblings().removeClass("active");
	},
	addListener(){
		//点击保存
		$(".modify-btn").on("click",this.modifyHandler);
	},
	modifyHandler(){
		const url = "/api/user/modify",
			data = $(".update-form").serialize(); 
			console.log(data);
		$.get(url,data,(data)=>{
			if(data.res_code === 1){
				window.location.href = "/html/login.html";
			}else{
				//修改失败
			}
		})
		
	}
});
new Update();
