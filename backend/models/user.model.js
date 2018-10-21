/**
 * user模块model
 */
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

var schema = new mongoose.Schema({
    userName: String, // 姓名
    phone: String, // 手机号
    password: String, // 密码
    mail: String, // email
    city: String, // 城市
    gender: String, // 性别
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model("user", schema);
