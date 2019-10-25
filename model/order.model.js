var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var orderSchema = Schema({
    order_id: {
        type: String,
        unique: true,
        require: true,
    },
    detail: [
        {
            product_id: {
                type: [Schema.Types.ObjectId],
                ref: 'products'
            },
            quantity: {
                type: Number,
                require: true
            }
        }],
    check:[
        {
            check_id:{
                type: Number,
                require: true,
                unique: true
            },
            amount:{
                type: Number,
                require: true,
                unique: true
            },
            date:{
                type: Date,
                default: Date.now,
            }
        }
    ]    
})