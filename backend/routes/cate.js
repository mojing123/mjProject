// import { Mongoose } from "mongoose";

const express = require("express");
const router = express.Router();
const cateCtrl = require("../controllers/cate.controller");//通过controller
//增删改查的路由
router.post("/addData",cateCtrl.create);
router.put("/alterData/:id",cateCtrl.update);
router.delete("/delData/:id",cateCtrl.remove);
router.post("/delDatas/removes",cateCtrl.removes);
// router.post("/upload",cateCtrl.upload);

router.post("/list",cateCtrl.list);

//树形结构的路由
router.get("/data/lists/:type",cateCtrl.lists);


// router.get('/', function(req, res, next) {
//     res.send('cate is running');
//   });

//查 目标数据路由
router.post("/cateTarData",cateCtrl.cateTarData);



module.exports = router;
