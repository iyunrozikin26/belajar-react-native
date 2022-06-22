const Controller = require("../controllers/usersController");

const userRouter = require("express").Router();

userRouter.post("/login", Controller.userLogin);
userRouter.post("/register", Controller.userRegister);
userRouter.get("/:userId", Controller.getOneUser);

module.exports = userRouter;
