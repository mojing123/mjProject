const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment.controller");

router.post("/addData", commentCtrl.addData);

//vue新增*****************************  

router.post('/listPost',commentCtrl.list); //查
router.put('/update/:id',commentCtrl.update); //改
router.post('/delData', commentCtrl.delData); //删 单条


module.exports = router;