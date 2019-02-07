const 
    mongoose = require("mongoose"),
    bakerySchema = new mongoose.Schema({
        name: {type:String, require:true},
        address: {type:String},
        rating: {type:Number},
        totalRatings: {type:Number},
        image: {type:String}
    }, {timestamps:true}),
    userSchema = new mongoose.Schema({
        name: {type:String, require:true},
        email: {type:String, require:true, unique:true},
        password: {type:String, require:true},
        bakeries: [bakerySchema]
    }, {timestamps:true});