/**
 * comment模块逻辑控制
 * 负责数据的增、删、改、查
 */
const mongoose = require("mongoose");
const Comment = require("../models/comment.model");

/**
 * 通过前端修改数据
 */
exports.getData = (req,res,next)=>{
    const id = req.params.id;
    Comment.findById(id,(err,data)=>{
        res.json(data);
    })
}


/**
 * 增加数据
 */
exports.addData = (req, res, next) => {
    const comment = new Comment(req.body); // 请示方式是post
    comment.save().then(data => {
        res.json(data);
    });
};
/**
 * 修改数据
 */
exports.upData = (req,res,next) =>{
    const id = req.params.id;
    const comment = new Comment(req.body);

    Comment.findByIdAndUpdate(id,{$set:req.body},{new:false})
    .then(data=>{
        res.json(data);
    })
    
}

/**
 * 删除一条数据
 */
exports.removeData = (req,res,next) => {
    const id = req.params.id;
    Comment.findByIdAndRemove(id,function(err,data){
        res.json({'message':'数据已删除'})
    })
}

/**
 * 删除多条数据
 */

exports.removeDatas = (req,res,next) => {
    var ids = req.body.ids.split(',');
    if(ids.length > 0){
        Comment.remove({ _id: { $in: ids } })
        .then(data=>{
            res.json({'message':'多条数据已删除'})
        })
    }else{
        res.status(404).send({'message':'404'})
    }
}


/**
 * 查询数据
 */

exports.findList=function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    // var rows =(req.body.rows)?req.body.rows:5;
    var rows = req.body.limit ? req.body.limit:5;
    var queryCondition={};
    
    if(req.query.newsId&&req.query.newsId.trim().length>0){
        // newsId=req.query.newsId;
        queryCondition={
            // name:new RegExp(name,'i')
            newsId: req.query.newsId,
        }
    }
    Comment.paginate(queryCondition,{page:page,limit:rows},function(err,result){
        result.rows = result.docs;
        delete result.docs;
        res.json(result);
    });
}

//vue新增************************************************

// 改
exports.update = function(req,res,next){
    // 两种不同的参数传递方式
    const id = req.params.id;
    const comment = new Comment(req.body);

    Comment.findByIdAndUpdate(id, { $set: req.body }, {new: false})
    .then(data=>{
        //实时显示修改后的数据
        Comment.find({ '_id': [id] }, (err, data)=>{
            res.json(data);
        });
    });
}

//删 单个 done
exports.delData = function(req, res, next){
    
    if(JSON.stringify(req.body) == '{}'){
        res.send('POST request do not have params');
    }else{
        var id = req.body._id;
        if(id){
            Comment.findByIdAndRemove(id, function(err, data){
                res.send('id为：' + id + ' 的数据已删除');
            });
        }else{
            res.send('没有传入 _id 参数');
        }
    }
}

// 新增查 list (post)
exports.list = function(req, res, next){
    var page = (req.body.page) ? req.body.page : 1;
    var limit = (req.body.limit) ? parseInt( req.body.limit ) : 5;

    var queryCondition = {};
    // var r = {
    //     rows: []
    // };
    // var s;

    if(req.body.commentId && req.body.commentId.trim().length>0){
        commentId = req.body.commentId;
        queryCondition = Object.assign(queryCondition,{
            commentId: commentId
        });
    }

    if(req.body.username && req.body.username.trim().length>0){
        username = req.body.username;
        queryCondition = Object.assign(queryCondition,{
            username: username
        });
        
    }
    // else{
    //     res.send("用戶名不能為空");
    // }

    // Comment.find(queryCondition, function (err, result) {
    //     r.rows = result;
    //     res.json(r)
    // });
    Comment.paginate(queryCondition,{page: page,limit: limit},function(err, result){
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
    });

}

/***************/

