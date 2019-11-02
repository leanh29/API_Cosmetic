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
    const newDetail = new detailModel({
        detail_id:req.body.detail_id,
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        amount: 200*5
    } 
    );
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
    console.log(order.price);
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
    const order=await orderModel.findById(orderId).populate({ path: 'details', model: detailModel})
    const copyproduct = [];
    const copydetail = [];
    Array.from(order.details).forEach(element => {
        copyproduct.push((element.product_id).toString())
    });
    for (let i=0; i<copy.length; i++) {
        const product =await productModel.findById(copy[i]);
        console.log(";;;;;;;;;;;;;;;;;;;;;",product.price)
      }
    Array.from(order.details).forEach(element => {
        copydetail.push((order.details).toString())
        console.log(element.quantity)
        console.log(element.detail_id)
    });
    for (let i=0; i<copydetail.length; i++) {
        //const product =await productModel.findById(copy[i]);
        console.log(";;;;;;;;;;;;;;;;;;;;;",copydetail.quantity)
      }

    return detailModel.updateOne({detail_id: "d01"},{$set: {amount: 100000}})
    //return res.status(200).json(detail);
};
module.exports.getOrderDetail = getOrderDetail;






