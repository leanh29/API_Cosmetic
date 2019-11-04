var detailController = require("../controller/detail.controller")
var router = require("express").Router();

router.post('/createDetail/:id/:id1',detailController.createDetail);
router.get('/orderDetail/:id/:id1',detailController.getOrderDetail);
router.delete('/orderDetail/:id/:id1',detailController.remove);
router.put('/orderDetail/:id/:id1',detailController.update);
// router.put('/user/:id',UserController.update);
// router.delete('/user/:id',UserController.remove);
//router.get('/orderDetail/:id/:id1/:id2',detailController.getDetailProduct);

module.exports=router;

