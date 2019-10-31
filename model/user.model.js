var mongoose =  require("mongoose");
var Schema = mongoose.Schema;
var userSchema =  Schema({
    email :{
        type: String,
        require: true,
        unique: true,
    } ,
    username : {
        type: String,
        require: true,
        unique: true,
    },
    password : String,
    sdt: String,
    location: String,
    gender: String,
    order:[{
        type: Schema.Types.ObjectId,
        ref: 'orders'
    }]
});

var userModel = mongoose.model("users",userSchema);
module.exports = {
    userModel : userModel
}