const Controller = require("../controllers/moviesController");
const moviesRoute = require("express").Router();
const { authentication, authorAccess } = require("../middlewares/auth");

moviesRoute.get("/", Controller.getAllMovies);
moviesRoute.get("/genre", Controller.getAllGenre);
moviesRoute.post("/", authentication, Controller.createMovie);
moviesRoute.get("/:movieId", Controller.readMovie);
moviesRoute.patch("/:movieId/edit", authentication, Controller.updateMovie);
moviesRoute.delete("/:movieId/delete", Controller.deleteMovie);

module.exports = moviesRoute;
