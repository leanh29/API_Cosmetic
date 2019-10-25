var cateController = require("../controller/category.controller");
var router = require("express").Router();

router.post("/addCategory",addCategory);
router.get("/getAllCategories",cate_list);
router.get("/getCategory/:cate_name",findCate);
router.delete("/deleteCategory/:cate_name",deleteCate);
module.exports= router;

function addCategory(req,res){
    var cate_id= req.body.cate_id;
    if(cate_id == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập ma loai san pham"
        })
    }
    console.log(cate_id);
    var cate_name= req.body.cate_name;
    if(cate_name == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập ten loai san pham"
        })
    }
    var image= req.body.image;
    if(image == undefined){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa them hinh san pham"
        })
    }
    console.log(image);
    cateController.createCategory(cate_id,cate_name,image)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}

function cate_list(req, res){
    cateController.cate_list()
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.send(err);
    })
}

function findCate(req,res){
    var cate_name=req.query.cate_name;
    if(!cate_name){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập ten loai san pham"
        })
    }
    cateController.findCate(cate_name)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}

function deleteCate(req,res){
    var cate_name=req.query.cate_name;
    if(!cate_name){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập ten loai san pham"
        })
    }
    cateController.delCate(cate_name)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}