const mongoose = require('mongoose');
//const detailModel = require('../model/detail.model');
const dataOrder = require('../model/order.model')
const orderModel = dataOrder.orderModel
var dataProduct = require("../model/product.model")
var productModel = dataProduct.productModel
// var model = require("../model/detail.model")
// var detailModel = model.detailModel
var dataUser = require("../model/user.model")
var userModel = dataUser.userModel

const createOrder = async (req, res, next) => {
    const userId = req.params.id;
    //create order
    const newOrder = new orderModel(req.body);
    // get user
    const user = await userModel.findById(userId);
    
    newOrder.user_id = user;
    //save order
    await newOrder.save();
    //user.orders=newOrder;
    console.log(user.username);
    await user.orders.push(newOrder);
    userPush = user.update({_id:userId},{$set: {orders:newOrder}})
    console.log("_____________",userPush)
    //await product.save();
    return res.status(201).json(newOrder);
};
module.exports.createOrder = createOrder;
const getUserOrder = async (req, res, next) => {
    const userId = req.params.id;
    const user = await userModel.findById(userId).populate('orders');
    console.log("============",user.orders);
    return res.status(200).json(user);
};
module.exports.getUserOrder = getUserOrder;
// const newDetail = async (req, res, next) => {
//     const userId = req.params.id;
//     console.log(userId);
//     const orderId = req.params.id1;
//     console.log(orderId)
//     const productId = req.body.product;
//     //create order
//     const newDetail = new detailModel(req.body);

//     // get user
//     const user = await userModel.findById(userId);
//     console.log(user)
//     const order = await orderModel.findById(orderId)
//     const product = await productModel.findById(productId);
//     console.log(product);
//     newDetail.product = product;
//     //save order
//     await newDetail.save();

//     order.detail.push(newDetail);
//     await product.save();
//     return res.status(201).json(order);
// };
// module.exports.newDetail = newDetail;

// const getOrderDetail = async (req, res, next) => {
//     const orderId = req.params.id;
//     const order = await orderModel.findById(orderId).populate('detail');
//     return res.status(200).json(order);
// };
// module.exports.getOrderDetail = getOrderDetail;






// var modelData = require("../model/order.model")
// var orderModel = modelData.orderModel
// var productModel = require("../model/product.model").productModel
// var productController = require("../controller/product.controller")
// var productRouter = require("../router/product.router")

// const create = (req, res, next) => {
//     console.log(req.body);
//     orderModel.create(req.body, (err, post) => {
//         if (err) return next(err);
//         res.json(post);
//     })
// };
// module.exports.create = create;

// const getAll = (req, res, next) => {
//     orderModel.find((err, users) => {
//         if (err) return next(err);
//         res.json(users);
//     })
// };
// module.exports.getAll = getAll;

// // const update = (req, res, next) => {
// //     User.findByIdAndUpdate(req.params.id, req.body, (err, users) => {
// //         if (err) return next(err);
// //         return res.json(users);
// //     })
// // };
// // module.exports.update = update;

// // const remove = (req, res, next) => {
// //     User.findByIdAndRemove(req.params.id, (err, users) => {
// //         if (err) return next(err);
// //         res.json(users);
// //     })
// // };
// // module.exports.remove = remove;

// const newProduct = async (req, res, next) => {
//     const orderId = req.params.id;
//     //create product
//     const product_id = req.body.product_id;
//     const product = await productModel.findOne({product_id:product_id})
//     console.log(product);

//     // get order
//     const order = await orderModel.findById(orderId);
//     console.log(order);
//     //product.order_infor = order;
//     //save order
//     //await newProduct.save();

//     order.products.push(product);
//     //console.log(order);
//     await order.save();
//     return res.status(201).json(newProduct);
// };
// module.exports.newProduct = newProduct;

// // const getUserOrder = async (req, res, next) => {
// //     const userid = req.params.id;
// //     const user = await User.findById(userid).populate('orders');
// //     return res.status(200).json(user);
// // };
// // module.exports.getUserOrder = getUserOrder;
