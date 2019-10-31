var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var detailSchema = Schema({
    detail_id:{
        type:String,
        require:true,
    },
    // product:{
    //     type: Schema.Types.ObjectId,
    //     ref:'products'
    // },
    order:{
        type:Schema.Types.ObjectId,
        ref:'orders'
    },
    quantity:{
        type: Number    
    }
})
var detailModel = mongoose.model("details",detailSchema);
module.exports={
    detailModel: detailModel
}