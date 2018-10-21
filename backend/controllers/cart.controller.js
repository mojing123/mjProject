
/*
 购物车模块
 逻辑控制, 增 删 改 查
*/

const mongoose = require('mongoose');
const Cart = require('../models/cart.model');


//连接数据库
// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017';


//增 增加一条数据 done
exports.addData = function(req, res, next){
    const cart = new Cart(req.body);
    cart.save().then(data=>{
        res.json(data);
    });
}


//删 单个 done
exports.delData = function(req, res, next){
    
    if(JSON.stringify(req.body) == '{}'){
        res.send('POST request do not have params');
    }else{
        var id = req.body._id;
        if(id){
            Cart.findByIdAndRemove(id, function(err, data){
                res.send('id为：' + id + ' 的数据已删除');
            });
        }else{
            res.send('没有传入 _id 参数');
        }
    }
}


//删 多个 done
exports.delDatas = function(req, res, next){
    if(JSON.stringify(req.body) == '{}'){
        res.send('POST request do not have params');
    }else{
        var ids = req.body._ids;
        if(ids != undefined && ids.length > 0){
            ids = ids.split(',');
            Cart.remove({ _id: { $in: ids } }).then(data=>{
                res.send('多条数据 删除成功');
            });
        }else{
            res.send('没有传入 _ids 参数');
        }
    }
}


// 改 now interface
exports.update = function(req,res,next){
    // 两种不同的参数传递方式
    const id = req.params.id;
    const cart = new Cart(req.body);

    Cart.findByIdAndUpdate(id, { $set: req.body }, {new: false})
    .then(data=>{
        //实时显示修改后的数据
        Cart.find({ '_id': [id] }, (err, data)=>{
            res.json(data);
        });
    });
}


// now interface
// 查 list (post)
exports.list = function(req, res, next){
    var page = (req.body.page) ? req.body.page : 1;
    var limit = (req.body.limit) ? parseInt( req.body.limit ) : 5;
    console.log(req.body);

    var queryCondition = {};

    if(req.body.title && req.body.title.trim().length>0){
        title = req.body.title;
        queryCondition = {
            "title": new RegExp(title,'i')
        }
    }

    if(req.body.cateId && req.body.cateId.trim().length>0){
        cateId = req.body.cateId;
        queryCondition = Object.assign(queryCondition,{
            cateId: cateId
        });
    }

    if(req.body.userId && req.body.userId.trim().length>0){
        userId = req.body.userId;
        queryCondition = Object.assign(queryCondition,{
            userId: userId
        });
    }

    Cart.paginate(queryCondition,{page: page,limit: limit},function(err, result){
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
    });
}
