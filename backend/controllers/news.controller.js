
/*
 新闻模块
 逻辑控制, 增 删 改 查
*/

const mongoose = require('mongoose');
const News = require('../models/news.model');


//连接数据库
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017';


//增 增加一条数据 done
exports.addData = function(req, res, next){
    const news = new News(req.body);
    news.save().then(data=>{
        res.json(data);
    });
}


//改 待测试
exports.alterData = function(req, res, next){
    // 两种不同的参数传递方式 req.params:put请求, req.body:post请求
    // res.send(req.params._id);
    
    if(req.params._id){
        var id = req.params._id;

        News.findByIdAndUpdate( id, { $set : req.body }, { new: false })
        .then(v=>{
            //此时显示的是修改前的结果, 要在数据库中查看修改后的结果
            // res.json(v);
            //实时显示修改后的数据
            News.find({ '_id': [id] }, (err, data)=>{
                res.json(data);
            });
        });
    }else{
        res.send('PUT request do not have params');
    }
}


//查 查找数据库表中所有数据 done
exports.getAllData = function(req, res, next){
    const tName = req.body.tName;
    if(tName){
        MongoClient.connect(DB_CONN_STR, function(err, client){
            //chain 链式写法
            var conn = client.db('my_database').collection(tName);
            conn.find({}).toArray(function(err, data){
                res.json(data);
            });
        });
    }else{
        res.send('POST request do not have params');
    }
}


//查 查找与目标数据匹配的所有数据 done
exports.getTarData = function(req, res, next){
    if(JSON.stringify(req.body) == "{}"){
        res.send('POST request do not have params');
    }else{
        var params = req.body, keys = [];
        for(var k in params){ keys.push(k); }

        //{ [keys[0]] : params[keys[0]] } 对象的key和val都使用变量的形式
        News.find({ [keys[0]] : params[keys[0]] }, function(err, data){
            res.json(data);
        });
    }
}


//查 查找与目标数据匹配的_id (Uid) done
exports.getTarDataUid = function(req, res, next){
    if(JSON.stringify(req.body) == "{}"){
        res.send('POST request do not have params');
    }else{
        var params = req.body, keys = [];
        for(var k in params){ keys.push(k); }

        //{ [keys[0]] : params[keys[0]] } 对象的key和val都使用变量的形式
        News.find({ [keys[0]] : params[keys[0]] }, function(err, data){
            var content = '';
            data.forEach(v=>{
                content += v._id + ',';
            });
            res.send(content.substring(0, content.length - 1));
        });
    }
}


//删 单个 done
exports.delData = function(req, res, next){
    
    if(JSON.stringify(req.body) == '{}'){
        res.send('POST request do not have params');
    }else{
        var id = req.body._id;
        if(id){
            News.findByIdAndRemove(id, function(err, data){
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
            News.remove({ _id: { $in: ids } }).then(data=>{
                res.send('多条数据 删除成功');
            });
        }else{
            res.send('没有传入 _ids 参数');
        }
    }
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

    News.paginate(queryCondition,{page: page,limit: limit},function(err, result){
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
    });
}


// 改 now interface
exports.update = function(req,res,next){
    // 两种不同的参数传递方式
    const id = req.params.id;
    const news = new News(req.body);

    News.findByIdAndUpdate(id, { $set: req.body }, {new: false})
    .then(data=>{
        //实时显示修改后的数据
        News.find({ '_id': [id] }, (err, data)=>{
            res.json(data);
        });
    });
}


// 查 listGet
exports.listGet = function(req, res, next){
    var page = (req.query.page) ? req.query.page : 1;
    var limit = (req.query.limit) ? req.query.limit : 5;

    var queryCondition = {};

    if(req.query.title && req.query.title.trim().length>0){
        title = req.query.title;
        queryCondition = {
            "title": new RegExp(title,'i')
        }
    }

    if(req.query.parentId && req.query.parentId.trim().length>0){
        parentId = req.query.parentId;
        queryCondition = Object.assign(queryCondition,{
            parentId: parentId
        });
    }

    News.paginate(queryCondition,{page: page, limit: limit},function(err, result){
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
    });
}


//测试多种请求方式
// exports.test = function(req, res, next){
    // var getParams = req.query;  //get方式(参数在url中)
    // res.send('get 请求成功');
    // res.send(req.query);

    // var namePost = req.body;  //post方式(参数在body中, 选择x-www-form...)
    // var namePut = req.params; //put方式(url示例: http://localhost:3000/news/test/zhaoqi500)
    // var nameDelete = req.params; //delete方式(url与put方式相同)
    // res.send(nameGet);
    // res.send(namePost);
    // res.send(namePut);
    // res.send(nameDelete);
// }
