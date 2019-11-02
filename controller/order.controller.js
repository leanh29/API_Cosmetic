const mongoose = require('mongoose');
var exec = require('exec');
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
    const newOrder = new orderModel(req.body);
    console.log(newOrder);
    const user = await userModel.findById(userId);
    newOrder.user_id = user;
    await newOrder.save();
    var arrOrder = user.orders;
    // console.log(newOrder._id);
    await arrOrder.push(newOrder._id);
    // console.log(arrOrder);
    user.orders = arrOrder;
    console.log(user);
    return userModel.updateOne({_id: user._id},{$set: {orders: arrOrder}})
    .then(da => {
        return res.status(201).json(newOrder);
    })
    .catch(er => {
        return res.json(er);
    })
};
module.exports.createOrder = createOrder;
const getUserOrder = async (req, res, next) => {
    const userId = req.params.id;
    const user=await userModel.findById(userId).populate({ path: 'orders', select: 'order_id' })
    return res.status(200).json(user.orders);
};
module.exports.getUserOrder = getUserOrder;


