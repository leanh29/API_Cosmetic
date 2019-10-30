var modelData = require("../model/order.model")
var orderModel = modelData.orderModel
var productModel = require("../model/product.model").productModel
var productController = require("../controller/product.controller")
var productRouter = require("../router/product.router")

const create = (req, res, next) => {
    console.log(req.body);
    orderModel.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    })
};
module.exports.create = create;

const getAll = (req, res, next) => {
    orderModel.find((err, users) => {
        if (err) return next(err);
        res.json(users);
    })
};
module.exports.getAll = getAll;

// const update = (req, res, next) => {
//     User.findByIdAndUpdate(req.params.id, req.body, (err, users) => {
//         if (err) return next(err);
//         return res.json(users);
//     })
// };
// module.exports.update = update;

// const remove = (req, res, next) => {
//     User.findByIdAndRemove(req.params.id, (err, users) => {
//         if (err) return next(err);
//         res.json(users);
//     })
// };
// module.exports.remove = remove;

const newProduct = async (req, res, next) => {
    const orderId = req.params.id;
    //create product
    const product_id = req.body.product_id;
    const product = await productModel.findOne({product_id:product_id})
    console.log(product);

    // get order
    const order = await orderModel.findById(orderId);
    console.log(order);
    //product.order_infor = order;
    //save order
    //await newProduct.save();

    order.products.push(product);
    //console.log(order);
    await order.save();
    return res.status(201).json(newProduct);
};
module.exports.newProduct = newProduct;

// const getUserOrder = async (req, res, next) => {
//     const userid = req.params.id;
//     const user = await User.findById(userid).populate('orders');
//     return res.status(200).json(user);
// };
// module.exports.getUserOrder = getUserOrder;
