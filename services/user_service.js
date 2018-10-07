const UserDao = require("../dao/user_dao.js");
const bcrypt = require("bcrypt");
const UserService = {
	//注册
	register(req, res, next) {
		// 获取用户注册的信息：POST请求中的数据
		const {username,date,phonenumber,password,type} = req.body;
		//console.log({username,date,phonenumber,password});
		// 密码加密
		const hash = bcrypt.hashSync(password, 8);
		console.log(password);
		console.log(hash);
		UserDao.save({username,date,phonenumber,password:hash,type})
					.then((data)=>{ // 保存成功
						// 将用户信息保存到 session 中
						req.session.loginUser = data;
						res.json({res_code:1, res_error: "", res_body: {data: {username,reg_time: data.reg_time}}});
					})
					.catch((err)=>{
						res.json({res_code: 0, res_error: err, res_body: {}});
					});
	},
	find(req,res,next){
		//获取查询的页码
		//console.log(index);
		const {page} = req.body;
		//console.log({page});
		//查询
		UserDao.findByPage(page)
							.then((data)=>{
								//console.log(data);
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
	//分页
	page(req,res,next){
		UserDao.findpage()
				.then((data)=>{
					//console.log(data);
					res.json({number:data});
				})
				.catch();
	},
	//删除
	remove(req,res,next){
		const {_id} = req.body;
		UserDao.deleteuser(_id)
							.then((data)=>{
								//console.log(data);
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
				
	},
	//更新
	update(req,res,next){
		const {_id,username,date,phonenumber} =req.query;
		UserDao.updateuser({_id},{username,date,phonenumber})
					.then((data)=>{
						//console.log(data);
						res.json({res_code:1, res_error:"", res_body:{data}});
					})
					.catch((err)=>{
						res.json({res_code:1, res_error:err, res_body:{}});
					});
	},
	//模糊查询
	query(req,res,next){
		const {username} = req.query;
		UserDao.queryuser(username)
							.then((data)=>{
								//console.log(data);
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
	//登录
	login(req,res,next){
		// 获取post请求中传递的登录用户名与密码
		const {username, password} = req.body;
		//console.log({username, password});
		// 从数据库中查询出用户名对应的用户信息
		UserDao.find({username})
					  .then((data)=>{
					  	console.log(data);
					  	if(data.length === 1){
					  		const user = data[0];
					  		const b = bcrypt.compareSync(password, user.password);
					  		if(b){
					  			req.session.loginUser = user;
					  			res.json({res_code:1, res_error:"", res_body:{data:{username: user.username, phonenumber: user.phonenumber, type: user.type, reg_time: user.reg_time}}});
					  		}else{
					  			res.json({res_code:0, res_error:"", res_body:{}});
					  		}
					  	}else{
					  		res.json({res_code:0, res_error:err, res_body:{}});
					  	}
					  	
					  })
					  .catch((err)=>{
					  	res.json({res_code:-1, res_error:err, res_body:{}});
					  })
	},
	// 注销
	logout(req, res, next) {
		req.session.loginUser = null;
		res.json({res_code:1});
	},
	//密码修改
	modify(req, res, next){
		// 获取post请求中传递的登录用户名与密码
		const {username,password,newpassword,okpassword} = req.query;
		console.log({username,password,newpassword,okpassword});
		const hash = bcrypt.hashSync(newpassword, 8);
		UserDao.modifypwd({username},{password:hash})
					  .then((data)=>{
					  	console.log(data);
					  	res.json({res_code:1, res_error:"", res_body:{}});
					  })
					  .catch((err)=>{
					  	res.json({res_code:0, res_error:err, res_body:{}});
					  })
		
	}
};

module.exports = UserService;
