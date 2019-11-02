var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var orderSchema = Schema({
    order_id: {
        type: String,
        unique: true,
        require: true,
    },
    details: [
        {
            type: Schema.Types.ObjectId,
            ref:'details'
        }]
    ,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {type: Date, default: Date.now()}
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