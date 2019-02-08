const Crawl = require("../models/Crawl");

crawlsRouter.use(verifyToken);
crawlsRouter.get("/", Crawl.index); // This will be rendered on a page where user can look at all the crawls added/completed by users. 
crawlsRouter.get("/:id", Crawl.show);
//Only when the user has completed a crawl, will we be able to create this crawl document.
crawlsRouter.post("/", Crawl.create); // Here we will first create the crawl, add the user's id to that crawls user id(ref) array (make sure to save the crawl because we essentially updated the crawl right after we created it). Then we add the crawl's id to the User's crawl array. Then save it because we essentailly updated the user. 
crawlsRouter.patch("/:id", Crawl.update); // This endpoint will only be pinged when a different user sees a crawl that has been added/completed by another user and wants to do that crawl. The button will be something like "do this crawl", which will ping this endpoint. We need a way to send that crawl's id.


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

    update: (req,res) => {
        
        //also need to handle logic for adding a user or deleting a user. 
    },

    create: (req,res) => {
        //handle user authentication. Only want users logged in to create. 
    },
}