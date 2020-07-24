var mongoose = require("mongoose");
const { schema } = require("./productCategoryModel");
const mongooseUniqueValidator = require("mongoose-unique-validator");

var adminSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    Login:{
        type:String,
        required:true
    },
    birthday:{
        type:String,
        required:false
    },
    account:{
        type:String,
        required:true
    },
    phone1:{
        type:String,
        required:true
    },
    phone2:{
        type:String,
        required:false
    },
    address:{
        type:String,
        required:false
    },
    town:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:false
    },
    ipAddress:{
        type:String,
        required:false
    },
    createdAt:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
    QR:{
        type:String,
        required:false
    }
});

module.exports = mongoose.model('admin', adminSchema);