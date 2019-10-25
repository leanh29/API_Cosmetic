const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productShema = Schema({
    product_id:{
        type: Number,
        require: true,
        unique: true
    },
    product_name:{
        type: String,
        require: true,
        unique: true
    },
    unit: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
        require: true
    }
        ,
    discription: String,
    status: Number,
    link: String,
    cate_name:{
        type: String,
        require: true
    },
    sale_percent: Number
})
var productModel = mongoose.model("products",productShema);
module.exports={
    productModel:productModel
}