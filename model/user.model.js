var mongoose =  require("mongoose");
var Schema = mongoose.Schema;
var userSchema =  Schema({
    email : String,
    username : String,
    password : String,
});

var userModel = mongoose.model("users",userSchema);
module.exports = {
    userModel : userModel
}