const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class Controller {
    static async postRegisterAdmin(req, res) {
        const { firstName, lastName, email, password } = req.body;
        try {
            const newUser = {
                firstName,
                lastName,
                email,
                password,
                role: "admin",
                phoneNumber: "edit your phone number",
                address: "edit your address",
                money: "top-up your money",
            };

            const createNewUser = await User.create(newUser);

            res.status(201).json({
                id: createNewUser.id,
                email: createNewUser.email,
            });
        } catch ({ errors }) {
            console.log(errors);
            res.status(403).json(errors[0].message);
        }
    }
    static async postRegisterCust(req, res) {
        const { firstName, lastName, email, password } = req.body;
        try {
            const newUser = {
                firstName,
                lastName,
                email,
                password,
                role: "customer",
                phoneNumber: "edit your phone number",
                address: "edit your address",
                money: 0,
            };

            const createNewUser = await User.create(newUser);

            res.status(201).json({
                id: createNewUser.id,
                email: createNewUser.email,
            });
        } catch ({ errors }) {
            console.log(errors);
            res.status(403).json(errors[0].message);
        }
    }

    static async postLogin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) throw { status: 401, message: "wrong email/password" };
            else {
                if (comparePassword(password, user.password)) {
                    const access_token = signToken({ email });
                    if (!access_token) throw { status: 401, message: "wrong email/password" };
                    res.status(200).json({
                        access_token,
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }

    static async getUser(req, res) {
        try {
            const user = await User.findOne({
                where: { id: req.user.id },
                attributes: ["firstName", "lastName", "money"],
            });
            if (!user) throw { status: 404, message: "Not Found" };
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }

    static async topUpMoney(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) throw { status: 404, message: "Not Found" };
            // console.log(user.money);
            // console.log(req.body.money);

            const currentMoney = Number(user.money) + Number(req.body.money);
            // console.log(currentMoney);
            const updateMoney = await User.update({ money: currentMoney }, { where: { id: req.user.id }, returning: true });

            res.status(201).json(updateMoney[1]);
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }
}

module.exports = Controller;
