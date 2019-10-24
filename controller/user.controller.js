var modelData = require("../model/user.model");
var crypto = require('crypto');
var userModel = modelData.userModel;

module.exports = {
    createUser : createUser,
    user_list : user_list,
    findUser : findUser,
    delUser: delUser,
    updateUser: updateUser
}

function createUser(username,password,email){
    return userModel.find({email : email})
        .then(function(user){
            if(user.length > 0 ){
                return Promise.reject({
                    statusCode : 400,
                    message : "email đã tồn tại"
                })
            }else{
               return userModel.find({username : username})
               .then(function(data){
                if(data.length > 0){
                    return Promise.reject({
                        statusCode : 400,
                        message : "user đã tồn tại"
                    })
                }else{
                    var hash = crypto.createHmac('sha256', "MonAn")
                    .update(password)
                    .digest('hex');
                    password = hash;
                    var user = new userModel({
                        username : username,
                        password : password,
                        email : email
                    })
                    user.save()
                        .then(function(user){
                            return Promise.resolve(user);
                        })
                        .catch(function(err){
                            return Promise.reject(err);
                        })   
                    }
                })
                .catch(function(err){
                   return Promise.reject(err);
               })
            }
        })
        .catch(function(err){
            return Promise.reject(err);
        })
}

function user_list(){
    return userModel.find({},(err,data)=>{
        if(data.length > 0){
            return Promise.resolve({
                message : "danh sách thông tin người dùng",
                data : data
            });

        }
        else{
            return Promise.resolve({
                message : "danh sách người dùng trống"
            })
        }

    })
}
function findUser(username) {
    return userModel.findOne({ username: username })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    data: data
                })
            }
            else {
                return new Promise.resolve({
                    message: "user khong ton tai"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
function delUser(username) {
    return userModel.findOneAndRemove({ username: username })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    message: "xóa thành công"
                })
            }
            else {
                return new Promise.resolve({
                    message: "user khong ton tai"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
function updateUser(username) {
    return userModel.findOneAndUpdate({ username: username })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    message: "update thành công"
                })
            }
            else {
                return new Promise.resolve({
                    message: "user khong ton tai"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}