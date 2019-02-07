const
    User = require("./models/User"),
    { JWT_SECRET } = process.env,
    jwt = require("jsonwebtoken");

//Function for Creating Tokens