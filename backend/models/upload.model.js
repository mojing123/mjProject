var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
materializedPlugin = require('mongoose-materialized'),
Schema = mongoose.Schema;
var schema = new mongoose.Schema({
    fieldname:String,
    originalname:String,
    encoding:String,
    mimetype: String,
    destination:String,
    filename:String,
    path:String,
    size:Number,
    cate:String
    // date: { type: Date, default: Date.now },
});

schema.plugin(mongoosePaginate);
schema.plugin(materializedPlugin);
module.exports =  mongoose.model('upload',schema); // Model.paginate()