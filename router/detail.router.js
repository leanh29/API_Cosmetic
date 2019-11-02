var detailController = require("../controller/detail.controller")
var router = require("express").Router();


// router.post('/createOrder/:id',orderController.createOrder);
// router.get('/userOrder/:id',orderController.getUserOrder);
// router.get('/user/:id',UserController.getId);
// router.put('/user/:id',UserController.update);
// router.delete('/user/:id',UserController.remove);

router.post('/createOrder/:id/:id1',detailController.createDetail);
router.get('/orderDetail/:id/:id1',detailController.getOrderDetail);
router.get('/orderDetail/:id/:id1/:id2',detailController.getDetailProduct);
//router.get('/orderDetail/:id',orderController.getOrderDetail);
module.exports=router;

