var detailController = require("../controller/detail.controller")
var router = require("express").Router();

router.post('/createOrder/:id/:id1',detailController.createDetail);
router.get('/orderDetail/:id/:id1',detailController.getOrderDetail);
router.get('/orderDetail/:id/:id1/:id2',detailController.getDetailProduct);

module.exports=router;

