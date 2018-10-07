function SupplierModel(){
	this.createDom();
	this.init();
	this.addListener();
};
SupplierModel.suppModel = `<div class="modal fade" id="updateModal" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">添加供应商</h4>
	      </div>
	      <div class="modal-body">
	        <form class="up-form">
	        	<div class="form-group hidden">
				    <label for="supp_id">供应商编码</label>
				    <input type="text" class="form-control" name="_id" id="up_id" placeholder="请输入供应商编码">
				  </div>
			  <div class="form-group">
			    <label for="suppName">供应商名称</label>
			    <input type="text" class="form-control" name="name" id="updatename" placeholder="请输入供应商名称">
			  </div>
			  <div class="form-group">
			    <label for="suppPerson">联系人</label>
			    <input type="text" class="form-control" name="person" id="updateperson" placeholder="请输入联系人">
			  </div>
			  <div class="form-group">
			    <label for="suppPhone">联系电话</label>
			    <input type="text" class="form-control" name="phone" id="updatephone" placeholder="请输入联系电话">
			  </div>
			  <div class="form-group">
			    <label for="suppAddress">联系地址</label>
			    <input type="text" class="form-control" name="address" id="updateaddress" placeholder="请输入联系地址">
			  </div>
			   <div class="form-group">
			    <label for="suppNumber">传真</label>
			    <input type="text" class="form-control" name="number" id="updatenumber" placeholder="请输入传真">
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-update">确定</button>
	      </div>
	    </div>
	  </div>
	</div>`;
$.extend(SupplierModel.prototype,{
	createDom(){
		$(SupplierModel.suppModel).appendTo('body');
	},
	init(){
		$(".supplier").addClass("active").siblings().removeClass("active");
		this.loadByPage(1);
		//拼接分页
		$.get("/api/supplier/page",(data)=>{
			const number = Math.ceil(data.number/4);

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
		$.post("/api/supplier/find",{page},(data)=>{
			console.log(data);
			let html = "";
			data.res_body.data.forEach((curr,index)=>{
				html += `<tr>
						<td class="hidden">${curr._id}</td>
		  				<td>${curr.name}</td>
		  				<td>${curr.person}</td>
		  				<td>${curr.phone}</td>
		  				<td>${curr.address}</td>
		  				<td>${curr.number}</td>
		  				<td>${curr.publish_time}</td>
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
			$("#table tbody").html(html);
		});
	},
	 addListener(){
	 	$(".btn-supplier").on("click", this.supplierHandler);
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
			$.post("/api/supplier/remove",{_id},(data)=>{
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
	 //修改
	 updateMessage(event){
	 	const src = event.target;
	 	console.log(1);
	 	const _id = $(src).parent().parent().parent().children().eq(0).html();
	 	const name = $(src).parent().parent().parent().children().eq(1).html();
	 	const person = $(src).parent().parent().parent().children().eq(2).html();
	 	const phone = $(src).parent().parent().parent().children().eq(3).html();
	 	const address = $(src).parent().parent().parent().children().eq(4).html();
	 	const number = $(src).parent().parent().parent().children().eq(5).html();
		$("#up_id").val(_id);
		$("#updatename").val(name);
		$("#updateperson").val(person);
		$("#updatephone").val(phone);
		$("#updateaddress").val(address);
		$("#updatenumber").val(number);
	 },
	 //修改
	 updateHandler(){
	 	let url = "/api/supplier/update";
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
	 	const name = $("#nameSupp").val();
	 	$.get("/api/supplier/query",{name},(data)=>{
	 		let html = "";
	 		data.res_body.data.forEach((curr,index)=>{
				html += `<tr>
		  				<td>${curr.name}</td>
		  				<td>${curr.person}</td>
		  				<td>${curr.phone}</td>
		  				<td>${curr.address}</td>
		  				<td>${curr.number}</td>
		  				<td>${curr.publish_time}</td>
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
			$("#table tbody").html(html);
	 	})
	 },
	 supplierHandler(){
	 	console.log(234);
	 	const url = "/api/supplier/supplier",
	 		data = $(".supp-form").serialize(); 
	 	console.log(data);
	 	$.post(url, data, (data) => {
	 		console.log(data);			
	 		if (data.res_code === 1) { 				
	 			sessionStorage.signUser = JSON.stringify(data.res_body.data);				
	 			window.location.reload();
	 		} else {
	 			$(".supp-error").removeClass("hidden");
	 		}
	 	});
	 }
});


new SupplierModel();
