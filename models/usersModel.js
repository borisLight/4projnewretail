var mongoose = require("mongoose");
const { schema } = require("./productCategoryModel");
const mongooseUniqueValidator = require("mongoose-unique-validator");

var userSchema = mongoose.Schema({
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
        required:false
    },
    birthday:{
        type:String,
        required:false
    },
    account:{
        type:String,
        required:false
    },
    phone1:{
        type:String,
        required:false
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
    },
    shops:[{type:mongoose.Schema.Types.ObjectId, ref: 'Shop'}]
});

schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('users', userSchema);