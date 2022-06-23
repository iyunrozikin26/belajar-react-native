const movieRouter = require("express").Router();
const Controller = require("../controllers/moviesController");

movieRouter.get("/", Controller.getAllMovies);
movieRouter.post("/", Controller.createMovie);
movieRouter.get("/:movieId/details", Controller.detailsMovie);
movieRouter.delete("/:movieId/delete", Controller.deleteMovie);

module.exports = movieRouter;
