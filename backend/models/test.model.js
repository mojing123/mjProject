const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// 测试数据 模型
var schema = new mongoose.Schema({
    title: String,
    brief: String,
    author: String,
    source: String,
    date: { type: Date, default: Date.now },
    desc: String,
    cateId: String,
    userId: String
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Test', schema, 'test'); //'new' 数据库实际表名

