var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var orderSchema = Schema({
    date: {type: Date, default: Date.now()},
    order_id: {
        type: String,
        unique: true,
        require: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    details: [
        {
            type: Schema.Types.ObjectId,
            ref:'details'
        }]
})
var orderModel = mongoose.model("orders", orderSchema);
module.exports = {
    orderModel: orderModel
}
// check:[
    //     {
    //         check_id:{
    //             type: Number,
    //             require: true,
    //             unique: true
    //         },
    //         amount:{
    //             type: Number,
    //             require: true,
    //             unique: true
    //         },
    //         date:{
    //             type: Date,
    //             default: Date.now,
    //         }
    //     }
    // ]    