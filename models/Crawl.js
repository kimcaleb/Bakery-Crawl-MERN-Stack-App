const   
    mongoose = require("mongoose"),
    crawlSchema = new mongoose.Schema({
        bakeries: [],
        users: [{type: mongoose.Types.ObjectId, ref: "User"}]
    }, {timestamps:true});

    module.exports = mongoose.model("Crawl", crawlSchema);