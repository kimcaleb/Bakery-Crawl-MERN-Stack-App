require("dotenv").config()
const
    express = require("express"),
    app = express(),
    logger = require("morgan"),
    {MONGODB_URI, PORT, GOOGLE_API_KEY} = process.env,
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

//Database
mongoose.connect(MONGODB_URI, {useNewUrlParser:true} ,(err) => {
    console.log(err || "Successfully connected to database")
});

//Middleware
app.use(bodyParser.json());
app.use(logger("dev"));


//Routes





//App Listen On
app.listen(PORT,err => {
    console.log(err || `Listening on Port ${PORT}`)
})
    