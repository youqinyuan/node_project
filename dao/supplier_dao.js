const {Supplier} = require("./model.js");
const SupplierDao = {
	save(userinfo) { // 保存用户信息
		userinfo.publish_time = new Date();
		return new Supplier(userinfo).save();
		
	},
	findByPage(page){
		const pageSize = 4; // 每页显示记录数
		return Supplier.find().limit(pageSize).skip((page - 1) * pageSize);
	},
	findpage(){
		return Supplier.find().count();
	},
	deletesupp(_id){
		return Supplier.remove({_id:_id});
	},
	updatesupp(condition,message){
		return Supplier.update(condition,message);
	},
	querysupp(name){
		var query=new RegExp(name,'i');
		//console.log(query);
		return Supplier.find({'name':query});
	}
		
};
module.exports = SupplierDao;