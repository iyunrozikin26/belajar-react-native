const { Order, Movie, Cast, Genre, User, sequelize } = require("../models");

module.exports = class Controller {
    static async allTransactionOrder(req, res) {
        const AuthorId = req.user.id; // hardcore

        try {
            const option = {
                where: { AuthorId: req.user.id },
                include: [{ model: Movie }],
                // include: [
                //     {
                //         model: Movie,
                //         include: [
                //             {
                //                 model: Cast,
                //                 attributes: ["name", "profilePict"],
                //             },
                //             {
                //                 model: Genre,
                //                 attributes: ["name"],
                //             },
                //         ],
                //     },
                // ],
            };
            const orderTransaction = await Order.findAll(option);
            if (!orderTransaction) throw { status: 403, message: "Not allowed to be accessed" };
            res.status(200).json(orderTransaction);
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }

    static async postTransaction(req, res, next) {
        const t = await sequelize.transaction();

        const { movieId } = req.params;
        const AuthorId = req.user.id; // hardcore
        try {
            const user = await User.findByPk(AuthorId);
            const movie = await Movie.findByPk(movieId);

            const order = await Order.findOne({ where: { MovieId: movieId } });

            // console.log(+user.money);
            // console.log(+movie.price);

            if (!user) throw { status: 401, message: "you must to login first" };
            if (Number(user.money) < Number(movie.price)) throw { status: 402, message: "your money is not enough" };

            if (order) throw { status: 429, message: "you have ordered this movie" };

            const currentMoney = Number(user.money) - Number(movie.price);

            // TRANSACTION PROSES
            const createdOrder = await Order.create({ MovieId: movieId, AuthorId }, { transaction: t });
            const updatedUser = await User.update({ money: currentMoney }, { where: { id: AuthorId }, returning: true }, { transaction: t });

            await t.commit();
            res.status(201).json(updatedUser[1]);
        } catch (error) {
            console.log(error);
            await t.rollback();
            res.status(error.status).json(error.message);
        }
    }
};
