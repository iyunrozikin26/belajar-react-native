const router = require("express").Router();
const moviesRoute = require("./moviesRoute");

router.use("/movies", moviesRoute);

module.exports = router;
