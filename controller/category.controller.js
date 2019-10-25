var modelData = require("../model/category.model");
var cateModel = modelData.cateModel;

module.exports = {
    createCategory: createCategory,
    cate_list: cate_list,
    findCate: findCate,
    delCate:delCate
}

function createCategory(cate_id,cate_name,image) {
    return cateModel.find({ cate_id: cate_id })
        .then(function (cateid) {
            if (cateid.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: "ma loai san pham da ton tai"
                })
            }
            else{
                return cateModel.find({ cate_name: cate_name })
                .then(function(catename){
                    if (catename.length > 0) {
                        return Promise.reject({
                            statusCode: 400,
                            message: "ten loai san pham da ton tai"
                        })
                    }
                    else {
                        //return new Promise((resolve, reject) => {
                            var Cate = new cateModel({

                                cate_id:cate_id,
                                cate_name: cate_name,
                                image: image,
                                
                            })
                            console.log(Cate)
                            Cate.save()
                                .then(function (addCate) {
                                    return resolve(addCate);
                                })
                                .catch(function (err) {
                                    return reject(err);
                                })
                        //})
                    };
                })
            }        
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
function cate_list() {
    return cateModel.find({})
        .then(data => {
            if (data.length > 0) {
                return Promise.resolve({
                    message: "danh sach loai san pham",
                    data: data
                })
            }
            else {
                return Promise.resolve({
                    message: "danh sach loai san pham trong"
                })

            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

function findCate(cate_name) {
    return cateModel.findOne({ cate_name: cate_name })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    data: data
                })
            }
            else {
                return new Promise.resolve({
                    message: "loai san pham khong ton tai"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
function delCate(cate_name) {
    return cateModel.findOneAndRemove({ cate_name: cate_name })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    message: "xóa thành công"
                })
            }
            else {
                return new Promise.resolve({
                    message: "loai san pham khong ton tai"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}