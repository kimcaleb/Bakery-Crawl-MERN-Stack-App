const
    User = require("./models/User"),
    { JWT_SECRET } = process.env,
    jwt = require("jsonwebtoken");

//Function for Creating Tokens
function signToken(user) {
    const userData = user.toObject(); // Convert user document from mongo to basic JS object. 
    delete userData.password;
    delete userData.crawls;
    return jwt.sign(userData,JWT_SECRET);
}

//Middleware function for verifying tokens and protecting routes
function verifyToken(req,res,next) {
    //Grab the token from either the header, body, or query String
    const token = req.get("token") || req.body.token || req.query.token
    // If no token present, deny access
    if(!token) return res.json({success:false, message:"No Token Provided"});
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        if(err) return res.json({success:false, message:"Invalid Token"});
        User.findById(decodedData._id, (err, user) => {
            if(!user) return res.json({success:false, message:"User Not Found"});
            req.user = user;
            next();
        });
    });
}

module.exports = { verifyToken,signToken }