function Header(){
	this.createDom();
	this.loadUser();
	this.addListener();
};
Header.temp = `<nav class="navbar navbar-default navbar-inverse">
	  <div class="container-fluid">
	    <div class="navbar-header">
	    	<img src="/images/buy.png">
	      <a class="navbar-brand" href="#">超市账单管理系统</a>
	    </div>
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">	      
	      <ul class="nav navbar-nav navbar-right reg-login-link">
	        <li><a href="/html/login.html"><button type="button" class="btn btn-success">登录</button></a></li>
	      </ul>
	      <ul class="nav navbar-nav navbar-right hidden welcome-logout-link">
	        <li class="welcome"><a href="#">你好,</a></li>
	        <li><a href="javascript:void(0)" class="logout-link"><button type="button" class="btn btn-success">退出</button></a></li>
	      </ul>
	    </div>
	  </div>
	</nav>`;
$.extend(Header.prototype,{
	createDom(){
		$(Header.temp).appendTo("header");
	},
	//加载用户登录的信息
	loadUser(){
		//从 sessionStorage 中获取登录成功的用户信息
	let user = sessionStorage.loginUser;
		if (!user) // 没有登录成功的用户，结束函数调用
			return;

		// 还原解析为JS中的对象
		user = JSON.parse(user);
		$(".reg-login-link").hide()
					  .next(".welcome-logout-link")
					  .removeClass("hidden")
					  .find("a:first").text("你好，" + user.username);
		$(".a-login").hide()
					.next(".b-login")
					.removeClass("hidden")
					.find("h3").text(user.username);
	},
	// 注册事件监听
	addListener() {
		// 点击“注销”链接，退出登录
		$(".logout-link").on("click", this.logoutHandler);
	},
	// 注销处理
	logoutHandler() {
		// 访问后端注销的接口
		$.get("/api/user/logout", ()=>{				
			// 清除 sessionStorage 中保存的数据
			sessionStorage.removeItem("loginUser");
			// 刷新
			location.reload();
		});
	}
	
})
new Header();