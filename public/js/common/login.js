function Login(){
	this.load();
	this.addListener();
};
//原型上写方法
$.extend(Login.prototype,{
	// 页面加载
	load() {
		// 显示验证码
		$.getJSON("/api/captcha", (data)=>{
			$(".captcha-container").html(data.res_body.data);
		});
	},
	//注册时间监听
	addListener(){
		// 登录
		$(".login-btn").on("click",this.loginHandler);
		// 刷新验证码
		$(".captcha-container").on("click", this.load);
		// 验证码文本框失去焦点，校验
		$("#loginCaptcha").on("blur", this.verify);
	},
	// 验证码
	verify() {
		$.getJSON("/api/verify_captcha", {captcha: $("#loginCaptcha").val()}, (data)=>{
			if (data.res_body.valid) {
				$("#captcha-info").text("正确")
			} else {
				$("#captcha-info").text("错误")
			}
		});
	},	
	//登录处理
	loginHandler() {
		// todo：表单校验
		const url = "/api/user/login", // URL
			data = $(".login-form").serialize(); // 向服务器提交的数据
		$.post(url, data, (data)=>{
			console.log(data);
			// 处理响应数据
			if (data.res_code === 1) { // 登录成功
				// 将登录成功的用户信息保存到 sessionStorage 中
				sessionStorage.loginUser = JSON.stringify(data.res_body.data);
				// 刷新页面
				window.location.href = "/";
			} else { // 登录失败
				$(".login-error").removeClass("hidden");
			}
		});
	}

});
new Login();

