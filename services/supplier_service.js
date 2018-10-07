const SupplierDao = require("../dao/supplier_dao.js");
const SupplierService ={
	supplier(req, res, next) {
		const {name,person,phone,address,number} = req.body;
		console.log({name,person,phone,address,number});
		SupplierDao.save({name,person,phone,address,number})
					.then((data)=>{ // 保存成功
					
						res.json({res_code:1, res_error: "", res_body: {}});
					})
					.catch((err)=>{
						res.json({res_code: 0, res_error: err, res_body: {}});
					});
	},
	find(req,res,next){
		//获取查询的页码
		//console.log(index);
		const {page} = req.body;
		console.log({page});
		//查询
		SupplierDao.findByPage(page)
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
		SupplierDao.findpage()
				.then((data)=>{
					//console.log(data);
					res.json({number:data});
				})
				.catch();
	},
	//删除
	remove(req,res,next){
		const {_id} = req.body;
		SupplierDao.deletesupp(_id)
							.then((data)=>{
								//console.log(data);
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:0, res_error:err, res_body:{}});
							});
				
	},
	//修改
	update(req,res,next){
		const {_id,name,person,phone,address,number} =req.query;
		console.log({_id,name,person,phone,address,number});
		SupplierDao.updatesupp({_id},{name,person,phone,address,number})
						.then((data)=>{
							res.json({res_code:1, res_error:"", res_body:{data}});
						})
						.catch((err)=>{
							res.json({res_code:0, res_error:err, res_body:{}});
						})
	},
	//模糊查询
	query(req,res,next){
		const {name} = req.query;
		SupplierDao.querysupp(name)
							.then((data)=>{
								//console.log(data);
								res.json({res_code:1, res_error:"", res_body:{data}});
							})
							.catch((err)=>{
								res.json({res_code:1, res_error:err, res_body:{}});
							});
	},
};
module.exports =SupplierService;