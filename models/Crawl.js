const   
    mongoose = require("mongoose"),
    crawlSchema = new mongoose.Schema({
        bakeries: [{type:Object}], // This will contain the places' id. 
        users: [{type:mongoose.Schema.Types.ObjectId, ref: "User"}]
    }, {timestamps:true});

    module.exports = mongoose.model("Crawl", crawlSchema);