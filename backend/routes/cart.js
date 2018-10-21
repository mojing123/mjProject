
var express = require('express');
var router = express.Router();
const dataCtrl = require('../controllers/cart.controller');   //修改


/* new module */
router.post('/addData', dataCtrl.addData);         //增

router.post('/delData', dataCtrl.delData);         //删 单条
router.post('/delDatas', dataCtrl.delDatas);       //删 多条

router.put('/update/:id',dataCtrl.update);         //改

router.post('/listPost',dataCtrl.list);            //查

module.exports = router;
