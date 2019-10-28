var orderController = require("../controller/order.controller")
var router = require("express").Router();

router.get("/getAllOrder",order_list);

module.exports=router;

function createOrder(req,res){
    var order = req.body;
    orderController.createOrder(order)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}
function order_list(req,res){
    orderController.order_list()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
    })
}

function orderDetail(req,res){
    var order_id=req.query.order_id;
    if(!order_id){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập tên mã đơn đặt hàng"
        })
    }
    orderController.orderDetail(order_id)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}