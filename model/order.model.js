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
        }]
    
})