const {User} = require("./model.js");
const UserDao = {
	save(userinfo) { // 保存用户信息
		userinfo.reg_time = new Date();
		return new User(userinfo).save();
		
	},
	findByPage(page){
		const pageSize = 4; // 每页显示记录数
		return User.find().limit(pageSize).skip((page - 1) * pageSize);
	},
	findpage(){
		return User.find().count();
	},
	deleteuser(_id){
		return User.remove({_id:_id});
	},
	updateuser(condition,message){
		return User.update(condition,message);
	},
	queryuser(username){
		var query=new RegExp(username,'i');
		//console.log(query);
		return User.find({'username':query});
	},
	find(condition) { // 查找用户信息
		return User.find(condition);
	},
	modifypwd(condition,message){
		return User.update(condition,message);
	}
	
};

module.exports = UserDao;
