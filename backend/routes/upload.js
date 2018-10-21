var express =require('express');
var router=express.Router();
var uploadCtrl=require('../controllers/upload.controller.js');

router.post('/upload',uploadCtrl.upload);
router.post('/list',uploadCtrl.list);
router.delete('/data/:id',uploadCtrl.remove);
module.exports=router;





