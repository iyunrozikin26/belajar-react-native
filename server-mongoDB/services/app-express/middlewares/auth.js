const { User, Movie } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers;
        if (!access_token) throw { name: "InvalidToken" };
        let payload = verifyToken(access_token);

        let user = await User.findOne({ where: { email: payload.email } });
        if (!user) throw { name: "InvalidToken" };
        req.user = { id: user.id, email: payload.email };
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid token" });
    }
};

const authorAccess = async (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            next();
        } else {
            const movie = await Movie.findByPk(req.params.movieId);
            if (movie.id === req.user.id) next();
            else throw { status: 403, message: "access not allowed" };
        }
    } catch (error) {
        res.status(error.status).json(error.message);
    }
};

module.exports = { authentication, authorAccess };
