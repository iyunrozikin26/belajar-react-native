const router = require("express").Router();
const userRoute = require("./userRoute");
const moviesRoute = require("./moviesRoute");
const transactionRoute = require("./transactionRoute");

router.use("/users", userRoute);
router.use("/movies", moviesRoute);
router.use("/transaction", transactionRoute);

module.exports = router;
