var mongoose = require("mongoose");

var shopElementSchema = mongoose.Schema({
    shopElementId:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:false
    },
    quantity:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    shop: {type:mongoose.Schema.Types.ObjectId, ref:'shop'},
    product: {type:mongoose.Schema.Types.ObjectId, ref:'products'}
});

module.exports = mongoose.model('shopElement', shopElementSchema);