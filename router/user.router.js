var userController = require("../controller/user.controller");
var router = require("express").Router();

router.post("/dangky", dangky);
router.get("/getAllUsers", user_list);
router.get("/getUser/:username",findUser);
router.delete("/deleteUser/:username",delUser);
router.put("updateUser/:username",updateUser);
module.exports = router;

function dangky (req, res) {
    var username = req.body.username;
    //console.log(username);
    if(username == undefined){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập username"
        })
        return;
    }
    if(username.length < 1 || username.length > 15){
        res.json({
            statusCode : 400,
            message : "username phải từ 1 đến 15 ký tự"
        })
        return;
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
    
    var email = req.body.email;
    if(email == undefined){
        res.json({
            statusCode : 400,
            message : "Bạn chưa nhập email"
        })
        return;
    }
    //console.log("khong co j");
    userController.createUser(username, password, email)
    .then(function(data){
        res.json(data);
    })
    .catch(function(err){
        res.json(err);
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
        return res.json(data);
    })
    .catch(function(err){
        return res.json(err);
    })
}

