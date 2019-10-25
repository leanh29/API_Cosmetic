var modelData = require("../model/user.model");
var crypto = require('crypto');
var userModel = modelData.userModel;

module.exports = {
    createUser: createUser,
    user_list: user_list,
    findUser: findUser,
    delUser: delUser,
    updateUser: updateUser,
    dangnhap:dangnhap
}

function createUser(email, username, password, sdt, location, gender) {
    return userModel.find({ email: email })
        .then(function (user) {
            if (user.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: "email đã tồn tại"
                })
            } else {
                return userModel.find({ username: username })
                    .then(function (data) {
                        if (data.length > 0) {
                            return Promise.reject({
                                statusCode: 400,
                                message: "username đã tồn tại"
                            })
                        } else {
                            // var hash = crypto.createHmac('sha256', "MonAn")
                            //     .update(password)
                            //     .digest('hex');
                            // password = hash;
                            var user = new userModel({
                                email: email,
                                username: username,
                                password: password,
                                sdt: sdt,
                                location: location,
                                gender: gender
                            })
                            user.save()
                                .then(function (user) {
                                    return Promise.resolve(user);
                                })
                                .catch(function (err) {
                                    return Promise.reject(err);
                                })
                        }
                    })
                    .catch(function (err) {
                        return Promise.reject(err);
                    })
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
function dangnhap(username,password) {
    return userModel.findOne({ username: username })
        .then(data => {
            if (!data) {
                return Promise.reject({
                    message: "username không chính xác",
                })
            }
            else {
                return userModel.findOne({password})
                .then(pass =>{
                    if (!pass){
                        return Promise.reject({
                            message: "password không chính xác"
                        })
                    }
                    else{
                        return Promise.resolve({
                            message: "đăng nhập thành công"
                        })
                    }
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
function user_list() {
    return userModel.find({}, (err, data) => {
        if (data.length > 0) {
            return Promise.resolve({
                message: "danh sách thông tin người dùng",
                data: data
            });

        }
        else {
            return Promise.resolve({
                message: "danh sách người dùng trống"
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
function updateUser(username, email) {
    return userModel.findOne({ username: username })
        .then(data => {
            if (data) {
                return Promise((resolve, reject) => {
                    return userModel.updateOne({ username: username }, { $set: { email: email } })
                        .then(() => {
                            data.email = email;
                            return resolve(data);
                        })
                        .catch((err) => {
                            return reject(err);
                        });
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