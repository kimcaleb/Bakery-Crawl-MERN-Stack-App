const
    User = require("../controllers/User"),
    express = require("express"),
    usersRouter = new express.Router(),
    verifyToken = require("../serverAuth").verifyToken;

//Unprotected Routes
usersRouter.get("/", User.index);
usersRouter.post("/", User.create);
usersRouter.post("/authenticate", User.authenticate);

//Protected Routes
usersRouter.use(verifyToken); // The verifyToken method will always be called in the middle of the execution of the following routes. 
usersRouter.get("/:id", User.show);
usersRouter.patch("/:id", User.update);
usersRouter.delete("/:id", User.destroy);

module.exports = usersRouter;