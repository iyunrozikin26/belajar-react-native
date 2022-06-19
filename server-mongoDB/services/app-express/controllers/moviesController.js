const { Movie, Genre, Cast, Order, sequelize } = require("../models");

class Controller {
    static async getAllMovies(req, res) {
        try {
            let option = {
                include: [
                    {
                        model: Genre,
                        attributes: ["name"],
                    },
                    {
                        model: Cast,
                        attributes: ["name", "profilePict"],
                    },
                ],
                order: [["createdAt", "DESC"]],
            };

            const allMovies = await Movie.findAndCountAll(option);
            res.status(200).json(allMovies);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static async createMovie(req, res) {
        const { title, slug, synopsis, trailerUrl, imgUrl, rating, price, GenreId } = req.body;
        const { _id } = req.headers;
        try {
            const newMovie = {
                title,
                slug,
                synopsis,
                trailerUrl,
                imgUrl,
                rating,
                price,
                GenreId,
                AuthorMongoId: _id,
            };

            const createNewMovie = await Movie.create(newMovie);
            res.status(201).json(createNewMovie);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static async readMovie(req, res) {
        const { movieId } = req.params;
        try {
            let option = {
                where: { id: movieId },
                include: [
                    {
                        model: Genre,
                        attributes: ["name"],
                    },
                    {
                        model: Cast,
                        attributes: ["name", "profilePict"],
                    },
                ],
            };

            const movie = await Movie.findOne(option);
            // const movie = await Movie.findByPk(movieId);
            if (!movie) throw { status: 404, message: "movie is Not Found" };

            res.status(200).json(movie);
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }

    static async updateMovie(req, res) {
        const { movieId } = req.params;
        const { title, slug, synopsis, trailerUrl, imgUrl, rating, price, GenreId } = req.body;

        try {
            const movieByPk = await Movie.findByPk(movieId);
            if (!movieByPk) throw { status: 404, message: "movie is Not Found" };

            const updateInput = {
                title,
                slug,
                synopsis,
                trailerUrl,
                imgUrl,
                rating,
                price,
                GenreId: +GenreId,
                AuthorId: req.user.id,
            };

            const updateMovie = await Movie.update(updateInput, {
                where: { id: movieId },
                returning: true,
            });
            res.status(201).json(updateMovie);
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }

    static async deleteMovie(req, res) {
        const { movieId } = req.params;
        try {
            const movieByPk = await Movie.findByPk(movieId);
            if (!movieByPk) throw { status: 404, message: "movie is Not Found" };

            const deleteMovie = await Movie.destroy({
                where: { id: movieId },
                returning: true,
            });
            res.status(201).json(movieByPk);
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }

    static async getAllGenre(req, res) {
        try {
            const allGenre = await Genre.findAll();
            res.status(200).json(allGenre);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = Controller;
