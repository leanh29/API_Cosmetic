var productController = require("../controller/product.controller");
var router = require("express").Router();

router.post("/addProduct",addProduct);
router.get("/getAllProduct",product_list);
router.get("/getProduct/:product_name",findProduct);
router.get("/Product/:cate_id",findProductByCate);
router.delete("/deleteProduct/:product_name",delProduct);
//router.post("/createDetail",productController.newDetail);
module.exports=router;

function addProduct(req,res){
    var product_id= req.body.product_id;
    if(product_id == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập ma san pham"
        })
    }
    var product_name= req.body.product_name;
    if(product_name == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập ten san pham"
        })
    }
    var unit= req.body.unit;
    if(unit == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập đơn vị san pham"
        })
    }
    var price= req.body.price;
    if(price == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập giá san pham"
        })
    }
    var image= req.body.image;
    if(image == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa thêm hình san pham"
        })
    }
    var discription= req.body.discription;
    var status= req.body.status;
    var link= req.body.link;
    var cate_id= req.body.cate_id;
    if(cate_id == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập loại san pham"
        })
    }
    var sale_percent= req.body.sale_percent;
    productController.createProduct(product_id,product_name,unit,price,image,discription,status,link,cate_id,sale_percent)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}
function product_list(req,res){
    productController.product_list()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
    })
}
function findProduct(req,res){
    var product_name=req.query.product_name;
    if(!product_name){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập tên sản phẩm"
        })
    }
    productController.findProduct(product_name)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}
function findProductByCate(req,res){
    var cate_id=req.query.cate_id;
    if(!cate_id){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập tên loại sản phẩm"
        })
    }
    productController.findProductByCate(cate_id)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}
function delProduct(req,res){
    var product_name=req.query.product_name;
    if(!product_name){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập tên sản phẩm"
        })
    }
    productController.delProduct(product_name)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}