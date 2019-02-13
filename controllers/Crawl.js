const 
    Crawl = require("../models/Crawl"),
    User = require("../models/User");

module.exports = {
    index: (req,res) => {
        Crawl.find({}).populate("users").exec((err,crawls) => {
            if(err) return res.json({message:"Could Not Retrieve Crawls", err});
            res.json({message:"Crawls Populated With Users Found", crawls}); 
        });
    },

    show: (req,res) => {
        Crawl.findById(req.params.id).populate("users").exec((err,crawl) => {
            if(err) return res.json({message:"Could Not Retrieve Crawl"});
            res.json({message:"Craw Populated With Users Retrieved", crawl})
        });
    },

    create: (req,res) => {

        Crawl.create(req.body, (err,newCrawl) => {
            console.log(req.body);
            if(err) return res.json({message:"Failed To Create Crawl", err});
            //Push the users id into the created crawl's users array.
            console.log(newCrawl); 
            newCrawl.users.push(req.user._id);
            newCrawl.save(err => {
                // if it successfully saves, push the crawls's id into the user's crawls array
                User.findById(req.user._id, (err,user) => {
                    if(err) return res.json({message:"Failed to Find User After Creating Crawl",err});
                    user.crawls.push(newCrawl._id);
                    user.save(err => {
                        if(err) console.log("Unsuccessfully saved User");
                        console.log("Successfully added User to Crawls and Vice Versa");
                        res.json({message:"Success", newCrawl});
                    });
                });
            });
        });
    },
// This endpoint will only be pinged when a different user sees a crawl that has been added/completed by another user and wants to do that crawl. The button will be something like "do this crawl", which will ping this endpoint. We need a way to send that crawl's id.
    update: (req,res) => {
        Crawl.findById(req.params.id, (err,crawl) => {
            if(err) return res.json({message:"Could Not Reteive Crawl", err});
            crawl.users.push(req.user._id);
            crawl.save(err => {
                User.findById(req.user.id, (err,user) => {
                    if(err) return res.json({message:"User Not Found After Updating Crawl", err});
                    user.crawls.push(crawl._id);
                    user.save(err => {
                        if(err) return res.json({message:"Unsuccessful in Saving User", err});
                        res.json({crawl});
                    });
                });
            });
        });
    }
}