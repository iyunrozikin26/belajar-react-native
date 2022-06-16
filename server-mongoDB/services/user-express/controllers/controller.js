const User = require("../models/user");

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
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }

    static async postUser(req, res) {
        const { username, email, password, role, phoneNumber, address } = req.body;
        try {
            const newUser = {
                username,
                email,
                password,
                role,
                phoneNumber,
                address,
            };
            const newUserCreate = await User.createUser(newUser);
            res.status(201).json(newUserCreate);
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
