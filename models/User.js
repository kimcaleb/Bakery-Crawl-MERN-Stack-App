const 
    bcrypt = require("bcrypt-nodejs"),
    mongoose = require("mongoose"),
    userSchema = new mongoose.Schema({
        name: {type:String, require:true},
        email: {type:String, require:true, unique:true},
        password: {type:String, require:true},
        crawls: [{type:mongoose.Schema.Types.ObjectId, ref: "Crawl"}]
    }, {timestamps:true});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
}

userSchema.pre("save", function(next) {
    if(this.isModified("password")) {
        this.password = this.generateHash(this.password);
    }
    next();
});

module.exports = mongoose.model("User", userSchema);