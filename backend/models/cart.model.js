
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// 购物车数据 模型
var schema = new mongoose.Schema({
    title: String,
    count: String,
    userName:String,
    price: String,
    desc: String,
    cateId: String,
    imageurl:String
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Cart', schema, 'cart'); //'new' 数据库实际表名

