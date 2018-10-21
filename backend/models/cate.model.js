const mongoosePaginate = require("mongoose-paginate");
var mongoose = require('mongoose'),
materializedPlugin = require('mongoose-materialized'),
Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    type: Number, // 类型
    title: String, // 标题
    concent: String, // 第三节点内容
});
schema.plugin(mongoosePaginate);
schema.plugin(materializedPlugin);
module.exports = mongoose.model("cate", schema);