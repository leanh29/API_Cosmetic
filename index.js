var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var userRouter = require("./router/user.router");
var cateRouter = require("./router/category.router");
var productRouter = require("./router/product.router")
var orderRouter = require("./router/order.router");
var detailRouter = require("./router/detail.router")

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users',userRouter);
app.use('/categories',cateRouter);
app.use('/products',productRouter);
app.use('/orders',orderRouter);
app.use('/details',detailRouter);
//app.use('/api',unitRouter);

app.get('/', (req, res, next) => {
    res.render('home');
});

var connect = mongoose.connect("mongodb+srv://leanh:anh0944164009@cluster0-fsymw.mongodb.net/DBFreshCosmetics?retryWrites=true&w=majority", 
{useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true });

app.listen(process.env.PORT || 3000, function () {
    console.log("ung dung chay tren port 3000");
});