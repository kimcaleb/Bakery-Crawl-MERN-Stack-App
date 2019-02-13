require("dotenv").config()
const
    express = require("express"),
    app = express(),
    logger = require("morgan"),
    {MONGODB_URI, PORT, GOOGLE_API_KEY} = process.env,
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    usersRouter = require("./routes/User"),
    axios = require("axios"),
    crawlsRouter = require("./routes/Crawl");

//Database
mongoose.connect(MONGODB_URI, {useNewUrlParser:true} ,(err) => {
    console.log(err || "Successfully connected to database")
});

//Middleware
app.use(bodyParser.json());
app.use(logger("dev"));


//Routes
app.use("/api/users", usersRouter);
app.get("/", (req,res) => {
    res.json({message:"API root"})
})
app.use("/api/crawls", crawlsRouter);

//3rd Party APIs
app.get("/places", (req,res) => {
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_API_KEY}&location=${req.query.lat},${req.query.lng}&radius=10000&type=bakery`).then( ({data}) => {
        res.json({data})
    }).catch(err => {console.log(err)});
});





//App Listen On
app.listen(PORT,err => {
    console.log(err || `Listening on Port ${PORT}`)
})
    