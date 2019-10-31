var modelData = require("../model/product.model")
var productModel = modelData.productModel
var model = require("../model/detail.model")
var detailModel = model.detailModel
// var Data = require("../model/order.model")
// var orderModel = Data.orderModel

module.exports={
    createProduct: createProduct,
    product_list: product_list,
    findProduct: findProduct,
    delProduct: delProduct,
    findProductByCate:findProductByCate
}
function createProduct(product_id,product_name,unit,price,image,discription,status,link,cate_id,sale_percent) {
    return productModel.find({ product_id: product_id })
        .then(function (productid) {
            if (productid.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: "ma san pham da ton tai",
                })
            }
            else{
                return productModel.find({ product_name: product_name })
                .then(function(productname){
                    if (productname.length > 0) {
                        return Promise.reject({
                            statusCode: 400,
                            message: " san pham da ton tai",
                        })
                    }
                    else {
                        return new Promise((resolve, reject) => {
                            var Product = new productModel({
                                product_id: product_id,
                                product_name: product_name,
                                unit: unit,
                                price: price,
                                image: image,
                                discription: discription,
                                status: status,
                                link: link,
                                cate_id: cate_id,
                                sale_percent: sale_percent
                            })
                           
                            return Product.save()
                                .then(function (addProduct) {
                                    return resolve(addProduct);
                                })
                                .catch(function (err) {
                                    return reject(err);
                                })
                        })
                    };
                })
            }        
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
// const newDetail = async (req, res, next) => {
//     const userId = req.params.id;
//     const productId = req.body.product;
//     //create order
//     const newDetail = new detailModel(req.body);

//     // get user
//     const user = await User.findById(userId);
//     const product = await productModel.findById(productId);
//     console.log(product);
//     newDetail.product = product;
//     //save order
//     await newDetail.save();

//     //product.detail.push(newDetail);
//     await product.save();
//     return res.status(201).json(newDetail);
// };
//module.exports.newDetail = newDetail;
function product_list(){
    return productModel.find({},(err,data)=>{
        if(data.length > 0){
            return Promise.resolve({
                message : "danh sách sản phẩm",
                data : data
            });

        }
        else{
            return Promise.resolve({
                message : "danh sách sản phẩm trống"
            })
        }

    })
}

function findProduct(product_name) {
    return productModel.findOne({ product_name: product_name })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    data: data
                })
            }
            else {
                return new Promise.resolve({
                    message: "sản phẩm khong ton tai"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
function findProductByCate(cate_id) {
    return productModel.find({ cate_id: cate_id})
        .then(data => {
            if (data) {
                return Promise.resolve({
                    data: data
                })
            }
            else {
                return new Promise.resolve({
                    message: "sản phẩm khong ton tai"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
function delProduct(product_name) {
    return userModel.findOneAndRemove({ product_name: product_name })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    message: "xóa thành công"
                })
            }
            else {
                return new Promise.resolve({
                    message: "sản phẩm không tồn tại"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}