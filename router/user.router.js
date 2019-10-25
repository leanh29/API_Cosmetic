var userController = require("../controller/user.controller");
var router = require("express").Router();

router.post("/dangky", dangky);
router.get("/getAllUsers", user_list);
router.get("/getUser/:username",findUser);
router.delete("/deleteUser/:username",delUser);
router.put("/updateUser/:username",updateUser);
router.get("/dangnhap/:thongtin",dangnhap);
module.exports = router;

function dangky (req, res) {
    var email = req.body.email;
    if(email == undefined){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập email"
        })
        //return;
    }
    console.log(email);
    var username = req.body.username;
    if(username == undefined){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập username"
        })
        //return;
    }
    if(username.length < 1 || username.length > 15){
        res.json({
            statusCode : 400,
            message : "username phải từ 1 đến 15 ký tự"
        })
        //return;
    }
    
    var password = req.body.password;
    if(password == undefined){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập password"
        })
        return;
    }
    if(password.length < 5 || password.length > 15 ){
        res.json({
            statusCode : 400,
            message : "password phải từ 5 đến 15 ký tự"
        })
    }
    
    var sdt = req.body.sdt;
    var location = req.body.location;
    var gender = req.body.gender;

    //console.log("khong co j");
    userController.createUser(email,username, password, sdt, location,gender)
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
    })

}
function dangnhap(req,res){
    var username=req.query.username;
    if(!username){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập username"
        })
    }
    var password=req.query.password;
    if(!password){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập password"
        })
    }
    userController.dangnhap(username,password)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}
function user_list(req,res){
    userController.user_list()
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
    })
}
function findUser(req,res){
    var username=req.query.username;
    if(!username){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập username"
        })
    }
    userController.findUser(username)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}
function delUser(req,res){
    var username=req.query.username;
    if(!username){
        return res.json({
            statusCode : 400,
            message : "Bạn chưa nhập username"
        })
    }
    userController.delUser(username)
    .then(function(data){
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}
function updateUser(req,res){
    var username=req.params.username;
    // if(!username){
    //     return res.json({
    //         statusCode : 400,
    //         message : "Bạn chưa nhập username"
    //     })
    // }
    let email=req.body.email;
    userController.updateUser(username,email)
    .then(function(data){
        
        return res.json({
            data:data,
            statusCode: 200,
            message: config.SUCCESS,
        });
    })
    .catch(function(err){
        return res.json(err);
    })
}

