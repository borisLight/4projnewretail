var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    productLabel:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    productCategory: {type:mongoose.Schema.Types.ObjectId, ref:'productCategory'}
});

module.exports = mongoose.model('products', productSchema);