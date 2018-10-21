var express = require("express");
var router = express.Router();
const dataCtrl = require("../controllers/user.controller");

router.post("/addData", dataCtrl.insert); // 通过post向数据库中增加用户

router.post("/alterData", dataCtrl.update); // 通过put修改用户信息，以用户名来查找用户。要求用户名唯一

router.post("/delData", dataCtrl.remove); // 删除指定用户

router.post("/delDatas", dataCtrl.removes); // 删除多个用户

router.post("/listPost", dataCtrl.list); // 查找多个用户

router.get("/list/:name", dataCtrl.getUserByName); // 通过用户名查找单个用户

router.post("/login", dataCtrl.loginCheck); // 登录检查

module.exports = router;
