const router = require("express").Router();
const movieRouter = require("./moviesRouter");
const userRouter = require("./usersRouter");

router.use("/movies", movieRouter);
router.use("/users", userRouter);

module.exports = router;
