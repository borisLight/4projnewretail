var mongoose = require("mongoose");

var locateSchema = mongoose.Schema({

    rayon:{
        type:String,
        required:false
    },
    user:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },
});

module.exports = mongoose.model('locate', locateSchema);