const mongoose = require('mongoose');

const dataOrder = require('../model/order.model')
const orderModel = dataOrder.orderModel
var dataProduct = require("../model/product.model")
var productModel = dataProduct.productModel
var dataDetail = require("../model/detail.model")
var detailModel = dataDetail.detailModel

const createDetail = async (req, res, next) => {
    const userId = req.params.id;
    const orderId = req.params.id1;
    //const productId = req.body.product;
    //create order
    const newDetail = new detailModel(req.body);
    //console.log(newOrder);
    // get user
    const order = await orderModel.findById(orderId);
    // cái này lưu user vào order
    newDetail.order_id = order;
    //save order
    await newDetail.save();
    //user.orders=newOrder;
    // console.log(user.username);
    // cái này lưu order vào user
    var arrDetail = order.details;
    // console.log(newOrder._id);
    await arrDetail.push(newDetail._id);
    // console.log(arrOrder);
    order.details = arrDetail;
    console.log(order);
    return orderModel.updateOne({_id: order._id},{$set: {details: arrDetail}})
    .then(da => {
        return res.status(201).json(newDetail);
    })
    .catch(er => {
        return res.json(er);
    })
    
    // console.log("_____________",userPush)

    //await product.save();
    
};
module.exports.createDetail = createDetail;

const getOrderDetail = async (req, res, next) => {
    const orderId = req.params.id1;
    //const order=await orderModel.findById(orderId).populate('detai_id')
    
    const order=await orderModel.findById(orderId).populate({ path: 'details', select: ['product_id','detail_id','quantity']})
    return res.status(200).json(order.details);
};
module.exports.getOrderDetail = getOrderDetail;






