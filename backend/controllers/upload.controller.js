var mongoose=require('mongoose');
var multer =require('multer')
var Upload=require('../models/upload.model.js')

/* 增加数据 */
exports.upload = function(req, res, next) {
    
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/upload')
          // cb(null, 'http://localhost:3000/upload')
          
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now()+file.originalname);
        }
      });
    var upload = multer({storage:storage}).single("pic");
    upload(req, res, function(err) {
      console.log(req.file);
      const uploadgory = new Upload(req.file); //实例化
      uploadgory.save().then(data => {
        //保存
        res.json(data);
      });
      if (err) {
        return;
      }
    });
  };
exports.remove = function(req,res,next){
    // console.log(req.params.id)
    const id = req.params.id;
    // 从User这个数据模型里去找ID的对象并且将它进行更新操作
    upload.findByIdAndRemove(id, function(err,data){
        res.json({"message":"删除成功"});
    })
}
exports.list = function(req,res,next){
    // var page = (req.body.page) ? req.body.page: 1;
    // var limit = (req.body.limit) ? req.body.limit: 2;
    // 查询条件
    var queryCondition = {};
    if(req.file && req.file.trim().length>0){
        var upload = req.file;
        queryCondition = {
             "upload": upload
        }
    }
    upload.paginate(queryCondition,{page: page,limit:limit},function(err,results){
        res.json(results)
    }) 
 }