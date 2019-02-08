const   
    mongoose = require("mongoose"),
    crawlSchema = new mongoose.Schema({
        bakeries: [{type:String}], // This will contain the places' id. 
        reviews: [{type:String}], //Stretch Goal
        users: [{type:mongoose.Schema.Types.ObjectId, ref: "User"}]
    }, {timestamps:true});

    module.exports = mongoose.model("Crawl", crawlSchema);