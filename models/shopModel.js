var mongoose = require("mongoose");

var shopSchema = mongoose.Schema({
    shopId:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    user: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
    shopElements:[{type:mongoose.Schema.Types.ObjectId, ref: 'shopElement'}]
});

module.exports = mongoose.model('shop', shopSchema);