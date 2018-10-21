const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// 新闻数据 模型
var schema = new mongoose.Schema({
    title: String,
    userName:String,
    price: String,
    desc: String,
    cateId: String,
    imageurl:String
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', schema, 'product'); //'new' 数据库实际表名

