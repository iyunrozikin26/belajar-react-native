const transactionRoute = require("express").Router();
const Controller = require("../controllers/transactionController");
const { authentication, authorAccess } = require("../middlewares/auth");

transactionRoute.get("/movies", authentication, Controller.allTransactionOrder);

transactionRoute.post("/:movieId/movies", authentication, Controller.postTransaction);

module.exports = transactionRoute;
