const axios = require("axios");

const MOVIES_URL = "http://localhost:3001/movies";
const USERS_URL = "http://localhost:8080/users";

class Controller {
    static async getAllMovies(req, res) {
        try {
            const { data: allMovies } = await axios.get(MOVIES_URL);
            res.status(200).json(allMovies);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static async detailsMovie(req, res) {
        const { movieId } = req.params;
        try {
            const { data: selectedMovie } = await axios.get(`${MOVIES_URL}/${movieId}`);
            if (!selectedMovie) throw { status: 401, message: "movie is Not Found" };
            const { AuthorMongoId } = selectedMovie;
            const { data: selectedUserByMongoId } = await axios.get(`${USERS_URL}/${AuthorMongoId}`);

            const details = {
                ...selectedMovie,
                Author: selectedUserByMongoId,
            };
            // console.log(details);
            res.status(200).json(details);
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteMovie(req, res) {
        const { movieId } = req.params;
        const { access_token } = req.headers;
        try {
            const { data: deletedMovie } = await axios({
                method: "delete",
                url: `${MOVIES_URL}/${movieId}/delete`,
                // headers: { access_token },
            });
            console.log(deletedMovie);
            res.status(201).json(deletedMovie);
        } catch (error) {
            console.log(error);
            res.status(404).json(error.data);
        }
    }
}
module.exports = Controller;
