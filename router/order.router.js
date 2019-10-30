var orderController = require("../controller/order.controller")
var router = require("express").Router();

//router.get("/getAllOrder",order_list);

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/getAllOrder',orderController.getAll);
router.post('/createOrder',orderController.create);
// router.get('/user/:id',UserController.getId);
// router.put('/user/:id',UserController.update);
// router.delete('/user/:id',UserController.remove);

router.post('/addProduct/:id',orderController.newProduct);
// router.get('/userOrder/:id',UserController.getUserOrder);
module.exports=router;

