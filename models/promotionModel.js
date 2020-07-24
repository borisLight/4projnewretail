var mongoose = require("mongoose");

var promotionSchema = mongoose.Schema({
    NomPromo:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:false
    },
    DateDebut:{
        type:String,
        required:false
    },
    DateFin:{
        type:String,
        required:false
    },
    Reduction:{
        type:String,
        required:false
    },
    Image:{
        type:String,
        required:false
    },
    State:{
        type:String,
        required:false
    },
});

module.exports = mongoose.model('promotions', promotionSchema);