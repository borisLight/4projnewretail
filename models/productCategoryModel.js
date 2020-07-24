var mongoose = require("mongoose");
const { schema } = require("./usersModel");
const mongooseUniqueValidator = require("mongoose-unique-validator");

var productCategorySchema = mongoose.Schema({
    idCategory:{
        type:String,
        required:true
    },
    label:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:false
    },
    products:[{type:mongoose.Schema.Types.ObjectId, ref: 'products'}],
    shopElements:[{type:mongoose.Schema.Types.ObjectId, ref: 'shopElement'}]
});

//schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('productCategory', productCategorySchema);