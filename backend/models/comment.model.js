/**
 * comment模块model
 */
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

var schema = new mongoose.Schema({
    username: String, // 姓名
    content: String, // 内容
    date: { type: Date, default: Date.now }, //时间
    commentId:String,  // 评论所属的ID
    commentTitle:String, // 评论所属的title
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('comment', schema, 'comment');
