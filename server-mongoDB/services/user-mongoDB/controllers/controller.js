const User = require("../models/user");
const { comparePassword, hashingPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class Controller {
    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    static async getOneUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            // console.log(user)
            res.status(200).json({
                _id: id,
                email: user[0].email,
                address: user[0].address,
                phoneNumber: user[0].phoneNumber,
                firstName: user[0].firstName,
                lastName: user[0].lastName,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // buat post login
    static async postLogin(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user) throw { status: 401, message: "wrong email / password" };
            else {
                if (comparePassword(password, user.password)) {
                    const access_token = signToken({ email });
                    if (!access_token) throw { status: 401, message: "wrong email / password" };

                    res.status(200).json({
                        _id: user._id,
                        email: user.email,
                        access_token,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(error.status).json(error.message);
        }
    }

    static async postRegister(req, res) {
        const { firstName, lastName, email, password, phoneNumber, address } = req.body;
        try {
            const newUser = {
                firstName,
                lastName,
                email,
                password: hashingPassword(password), //hashing(password)
                role: "customer",
                phoneNumber,
                address,
            };
            const newUserCreate = await User.createUser(newUser);
            if (newUserCreate.insertedId)
                res.status(201).json({
                    _id: newUserCreate.insertedId,
                    email: newUser.email,
                });
        } catch (error) {
            console.log(error);
        }
    }

    static async patchUser(req, res) {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            if (!user) throw { status: 404, message: `User Not Found` };

            const updated = await User.patchingUser(id, req.body);

            console.log(updated);
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const delUser = await User.deleted(id);
            res.status(200).json(delUser);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;
