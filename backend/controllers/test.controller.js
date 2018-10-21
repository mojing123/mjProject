
/*
 测试模块
 逻辑控制, 增 删 改 查
*/

const mongoose = require('mongoose');
const Test = require('../models/test.model');


//连接数据库
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017';


//增 增加一条数据 done
exports.addData = function(req, res, next){
    const test = new Test(req.body);
    test.save().then(data=>{
        res.json(data);
    });
}
