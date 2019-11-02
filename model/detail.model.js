var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var detailSchema = Schema({
    detail_id:{
        type:String,
        require:true,
    },
    product_id:{
        type:Schema.Types.ObjectId,
        ref:'products'
    },
    order_id:{
        type:Schema.Types.ObjectId,
        ref:'orders'
    },
    quantity:{
        type: Number    
    },
    amount:{
        type: Number
    }
})
var detailModel = mongoose.model("details",detailSchema);
module.exports={
    detailModel: detailModel
}