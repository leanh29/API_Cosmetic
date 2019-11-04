const mongoose = require('mongoose');

const dataOrder = require('../model/order.model')
const orderModel = dataOrder.orderModel
var dataProduct = require("../model/product.model")
var productModel = dataProduct.productModel
var dataDetail = require("../model/detail.model")
var detailModel = dataDetail.detailModel

const createDetail = async (req, res, next) => {
    const productId = req.body.product_id;
    const orderId = req.params.id1;
    const newDetail = new detailModel({
        detail_id:req.body.detail_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        amount: 0
    } 
    );

    // luu new detail, dua vao mang order
    const order = await orderModel.findById(orderId);
    newDetail.order_id = order;
    await newDetail.save();
    var arrDetail = order.details;
    await arrDetail.push(newDetail._id);
    order.details = arrDetail;

    // tinh thanh tien moi san pham
    const product = await productModel.findById(newDetail.product_id);
    amount=product.price*newDetail.quantity
    
    // luu thanh tien vao tung detail trong order
    await detailModel.updateOne({_id:newDetail._id},{$set: {amount:amount}})

    // tinh tong thanh tien cua hoa don
    tong = Number(order.total)
    amount = Number(amount)
    tong+=amount
   
    // luu tong thanh tien vao hoa hdon
    return orderModel.updateOne({_id: order._id},{$set: {details: arrDetail,total: tong}})
    .then(da => {
        return res.status(201).json(newDetail);
    })
    .catch(er => {
        return res.json(er);
    })
};
module.exports.createDetail = createDetail;

const getOrderDetail = async (req, res, next) => {
    const orderId = req.params.id1;
    const order=await orderModel.findById(orderId).populate({ 
        path: 'details', 
        populate : {path: 'product_id'}})
    return res.status(200).json(order);
};
module.exports.getOrderDetail = getOrderDetail;

const remove = async (req, res, next) => {
    orderId = req.params.id1
    //console.log("==================",req.query.detailId)
    test = await detailModel.findById(req.query.detailId);
    tru = test.amount
    console.log(tru)
    detailModel.findByIdAndRemove(req.query.detailId, (err, detail) => {
        if (err) return next(err);
        res.json(detail);
    })
    return orderModel.updateOne({_id: orderId},{$set: {total: (tong-tru)}})
};
module.exports.remove = remove;
const update =async (req, res, next) => {
    orderId = req.params.id1
    product_id = req.body.product_id
    quantity = req.body.quantity
    detail1 = await detailModel.findById(req.query.detailId);
    product2 = await productModel.findById(product_id)
    order = await orderModel.findById(orderId)
    detailModel.findByIdAndUpdate(req.query.detailId, {$set: {product_id: product_id, quantity:quantity,amount: product2.price*quantity}}, (err, detail) => {
        if (err) return next(err);
        return res.json(detail);
    })
    return orderModel.updateOne({_id: orderId},{$set: {total: (order.total-(detail1.amount)+(product2.price*quantity))}})
};
module.exports.update = update;