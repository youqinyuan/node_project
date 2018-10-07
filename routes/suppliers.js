var express = require('express');
var SupplierService = require("../services/supplier_service.js");
var router = express.Router();
//配置路由
//添加
router.post("/supplier",SupplierService.supplier);
//按每页4条数据查找
router.post("/find",SupplierService.find);
//分页
router.get("/page",SupplierService.page);
//删除
router.post("/remove",SupplierService.remove);
//修改
router.get("/update",SupplierService.update);
router.get("/query",SupplierService.query);

module.exports = router;