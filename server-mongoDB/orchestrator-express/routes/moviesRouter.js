const movieRouter = require("express").Router();
const Controller = require("../controllers/moviesController");

movieRouter.get("/", Controller.getAllMovies);
movieRouter.get("/:movieId/details", Controller.detailsMovie);
movieRouter.delete("/:movieId/delete", Controller.deleteMovie);

module.exports = movieRouter;
