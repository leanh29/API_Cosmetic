var modelData = require("../model/order.model")
var orderModel = modelData.orderModel
var productController = require("../controller/product.controller")
var productRouter = require("../router/product.router")
module.exports = {
    createOrder:createOrder,
    order_list: order_list,
    orderDetail: orderDetail,
    //addProduct: addProduct,
}

function createOrder(order) {
    return new Promise((resolve, reject) => {
        var Product = new productModel({
            order:order
        })
        return Product.save()
            .then(function (addProduct) {
                return resolve(addProduct);
            })
            .catch(function (err) {
                return reject(err);
            })
    })
}        
function order_list() {
    return orderModel.find({}, (err, data) => {
        if (data.length > 0) {
            return Promise.resolve({
                message: "danh sách đơn đặt hàng",
                data: data
            });

        }
        else {
            return Promise.resolve({
                message: "danh sách đơn đặt hàng trống"
            })
        }

    })
}
function orderDetail(order_id) {
    return orderModel.findOne({ order_id: order_id })
        .then(data => {
            if (data) {
                return Promise.resolve({
                    data: data.produc
                })
            }
            else {
                return new Promise.resolve({
                    message: "đơn đặt hàng không tồn tại"
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
}
// function addProduct(order_id)
// return orderModel.findOne({ order_id: order_id })
//     .then(orderFinded => {
//         if (orderFinded) {
//             return new Promise((resolve, reject) => {
//                 var Product = productRouter.addProduct;
//                 //orderFinded.Product.
//             })

//         }
//         else {
//             return new Promise.resolve({
//                 message: "đơn đặt hàng không tồn tại"
//             })
//         }
//     })
//     .catch(err => {
//         return Promise.reject(err);
//     });