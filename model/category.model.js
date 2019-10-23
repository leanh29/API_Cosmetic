var mongoose = require("mongoose");
// var autoIncrement = require("mongoose-auto-increment");
// var connect = mongoose.createConnection("mongodb://localhost:27017/DB_Project",{ useNewUrlParser: true,
// useUnifiedTopology: true,
// useCreateIndex: true });
var Schema = mongoose.Schema;
var categorySchema = Schema({
    cate_id:{
        type: String,
        require: true,
        unique: true,
    },
    cate_name:{
        type: String,
        require: true,
        unique: true
    },
    image: String,
});
var cateModel = mongoose.model("categories",categorySchema);
// autoIncrement.initialize(connect);
// categorySchema.plugin(autoIncrement.plugin, {
//     model:"cateModel",
//     field: "cate_id",
//     startAt: 1,
//     incrementBy: 1,
// })
module.exports={
    cateModel:cateModel
}