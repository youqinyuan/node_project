function RegisterModel(){
	this.createDom();
	this.init();
	this.addListener();
	
};
RegisterModel.regModel = `
	<div class="modal fade" id="regModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">添加用户</h4>
	      </div>
	      <div class="modal-body">
	      <div class="alert alert-danger hidden reg-error">用户注册失败，请稍后重试</div>
	        <form class="reg-form">
	        	<div class="form-group hidden">
				    <label for="reg_id">用户编码</label>
				    <input type="text" class="form-control" name="_id" id="reg_id" placeholder="请输入用户名">
				  </div>
			  <div class="form-group">
			    <label for="regUsername">用户名称</label>
			    <input type="text" class="form-control" name="username" id="regUsername" placeholder="请输入用户名">
			  </div>
			  <div class="form-group">
			    <label for="regUserdate">出生日期</label>
			    <input type="text" class="form-control" name="date" id="regUserdate" placeholder="请输入出生日期">
			  </div>
			  <div class="form-group">
			    <label for="regUserphone">用户电话</label>
			    <input type="text" class="form-control" name="phonenumber" id="regUserphone" placeholder="请输入电话">
			  </div>
			  <div class="form-group">
			    <label for="regPassword">密码</label>
			    <input type="password" class="form-control" name="password" id="regPassword" placeholder="请输入密码">
			  </div>
			  <div>
			  	<label for="resType">用户类别:</label>
			  	<label class="radio-inline">
				  <input type="radio" name="type" id="inlineRadio1" value="管理员"> 管理员
				</label>
				<label class="radio-inline">
				  <input type="radio" name="type" id="inlineRadio2" value="经理"> 经理
				</label>
				<label class="radio-inline">
				  <input type="radio" name="type" id="inlineRadio3" value="普通用户"> 普通用户
				</label>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-register">确定</button>
	      </div>
	    </div>
	  </div>
	</div>`;
$.extend(RegisterModel.prototype,{
	createDom(){
		$(RegisterModel.regModel).appendTo('body');
	},
	init(){
		$(".userman").addClass("active").siblings().removeClass("active");
		this.loadByPage(1);
		$.get("/api/user/page",(data)=>{
//			console.log(data);
			const number = Math.ceil(data.number/4);
//			console.log(number);
			//console.log(page);
			//拼接分页
//			var index;
			for(var i = 1;i<=number;i++){
				$("<li><a>"+i+"</a></li>").insertBefore(".next");	
			}
			$(".prev").next().addClass("active");
		})
	},
	//按页加载职位信息
	loadByPage(page){
		//page是待加载的页面，默认加载第一页
		page = page || 1;
		//ajax访问查询接口
		$.post("/api/user/find",{page},(data)=>{
			console.log(data);
			let html = "";
			data.res_body.data.forEach((curr,index)=>{
				html += `<tr>
						<td class="hidden">${curr._id}</td>
		  				<td>${curr.username}</td>
		  				<td>${curr.date}</td>
		  				<td>${curr.phonenumber}</td>
		  				<td class="hidden">${curr.password}</td>
		  				<td>${curr.type}</td>
		  				<td>${curr.reg_time}</td>
		  				<td>
							<a href="javacript:void(0);" class="updateBtn" data-toggle="modal" data-target="#updateModal">
								<img src="/images/updata.png" title="修改">
							</a>
							<a href="javascript:;" class="deleBtn">
								<img src="/images/delete.png" title="删除">
							</a>						
						</td>
		  			</tr>`
			});
			$(".user-table tbody").html(html);
			//获取模态框的值
			$("#table").on("click",".updateBtn",this.updateMessage);
			//点击查询
			$("#queryBtn").on("click",this.queryHandler);
		})
	},
	 addListener(){
	 	$(".btn-register").on("click", this.registerHandler);
	 	$("#addUser").on("click",this.createDom);
	 	//点击页面翻页
	 	$(".pagination").on("click", "a", $.proxy(this.loadByPageHandler, this));
	 	//删除
	 	$("#table").on("click",".deleBtn",this.deleHandler);
	 	//获取模态框的值
		$("#table").on("click",".updateBtn",this.updateMessage);
	 	//更新
	 	$(".btn-update").on("click", this.updateHandler);
	 	//点击查询
		$("#queryBtn").on("click",this.queryHandler);
	 },
	 loadByPageHandler(event){
	 	const src = event.target;
		//console.log(src);
		//页面
		const page = Number($(src).text()) || 1;
		//加载
		if(!isNaN(Number(page))){
			index = page;
		}else if($(src).parent().hasClass("prev")){
			index--;
			if(index<1) index = 1;
		}else if($(src).parent().hasClass("next")){
			index++;
			if(index > number) index = number;
		}
		this.loadByPage(index);
		
		//激活
        $(".pagination").children().eq(index).addClass("active").siblings().removeClass("active");	
		return false;
	 },
	 //删除
	 deleHandler(event){
	 	const src = event.target;
	 	console.log(1);
		if(confirm("你确定要删除吗?")){
			const _id = $(src).parent().parent().parent().children().eq(0).html();
			console.log(_id);
			console.log($(src).parent().parent().parent());
			$.post("/api/user/remove",{_id},(data)=>{
				data = data.res_code;
				console.log(data);
				if(data){
					$(src).parent().parent().parent().remove();
					window.location.reload();
				}else{
					alert("删除失败");
				}
			});
		}
	 	
	 },
	 updateMessage(event){
	 	const src = event.target;
	 	console.log(1);
	 	const _id = $(src).parent().parent().parent().children().eq(0).html();
	 	const username = $(src).parent().parent().parent().children().eq(1).html();
	 	const date = $(src).parent().parent().parent().children().eq(2).html();
	 	const phonenumber = $(src).parent().parent().parent().children().eq(3).html();
		$("#up_id").val(_id);
		$("#upUsername").val(username);
		$("#upUserdate").val(date);
		$("#upUserphone").val(phonenumber);	
	 },
	 //修改
	 updateHandler(){
	 	let url = "/api/user/update";
	 	let formData = $(".up-form").serialize();
	 	console.log(formData);
		//ajax上传
		$.ajax({
			type : "get",
			url,
			data : formData,
			//dataType : "json",
			processData: false, // 不转换 data 向服务器提交的数据（默认是将对象转换为查询字符串）
			contentType: false, 
			success(data) {
				$("#updateModal").modal("hide");
			  	window.location.reload();
			}
		})
		
	 },
	 //模糊查询
	 queryHandler(){
	 	const username = $("#nameUser").val();
	 	console.log(username);
	 	$.get("/api/user/query",{username},(data)=>{
	 		let html = "";
	 		data.res_body.data.forEach((curr,index)=>{
				html += `<tr>
						<td class="hidden">${curr._id}</td>
		  				<td>${curr.username}</td>
		  				<td>${curr.date}</td>
		  				<td>${curr.phonenumber}</td>
		  				<td>${curr.type}</td>
		  				<td>${curr.reg_time}</td>
		  				<td>
							<a href="javacript:void(0);" class="updateBtn" data-toggle="modal" data-target="#updateModal">
								<img src="/images/updata.png" title="修改">
							</a>
							<a href="javascript:;" class="deleBtn">
								<img src="/images/delete.png" title="删除">
							</a>						
						</td>
		  			</tr>`
			});
			$(".user-table tbody").html(html);
	 	})
	 },
	 //用户注册
	 registerHandler(){
	 	const url = "/api/user/register",
	 		data = $(".reg-form").serialize(); 
	 	console.log(data);
	 	$.post(url, data, (data) => {
	 		console.log(data);			
	 		if (data.res_code === 1) { 				
	 			sessionStorage.signUser = JSON.stringify(data.res_body.data);				
	 			window.location.reload();
	 		} else {
	 			$(".reg-error").removeClass("hidden");
	 		}
	 	});
	 }
});
new RegisterModel();