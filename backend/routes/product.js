var express = require("express");
var router = express.Router();
const dataCtrl = require("../controllers/product.controller");

/* new module */
router.post("/addData", dataCtrl.addData); //增

router.post("/delData", dataCtrl.delData); //删 单条
router.post("/delDatas", dataCtrl.delDatas); //删 多条

router.put("/alterData/:_id", dataCtrl.alterData); //改

router.get("/list", dataCtrl.listGet); //查

//测试接口
router.post("/listPost", dataCtrl.list);
router.put("/update/:id", dataCtrl.update);

router.post("/getAllData", dataCtrl.getAllData); //查所有数据
router.post("/getTarData", dataCtrl.getTarData); //查目标数据
router.post("/getTarDataUid", dataCtrl.getTarDataUid); //查目标数据的Uid

//测试各种请求方式
// router.get('/test', dataCtrl.test);       //get请求方式
// router.post('/test', dataCtrl.test);      //post请求方式
// router.put('/test/:name', dataCtrl.test); //put请求方式(与delete相同)
// router.delete('/test/:name', dataCtrl.test); //delete请求方式

module.exports = router;
