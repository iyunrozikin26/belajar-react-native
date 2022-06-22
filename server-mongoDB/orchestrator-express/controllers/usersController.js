const axios = require("axios");
const USERS_URL = "http://localhost:8080/users";
const Redis = require("ioredis");
const redis = new Redis();

class Controller {
    static async userLogin(req, res) {
        const { email, password } = req.body;
        try {
            const { data: user } = await axios({
                method: "post",
                url: `${USERS_URL}/login`,
                data: { email, password },
            });
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    }

    static async userRegister(req, res) {
        try {
            const { data: newUser } = await axios({
                method: "post",
                url: `${USERS_URL}/register`,
                data: req.body,
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
        }
    }

    static async getOneUser(req, res) {
        const { userId } = req.params;
        try {
            const cacheUser = await redis.get("user");
            if (cacheUser) {
                res.status(200).json(JSON.parse(cacheUser));
            } else {
                const { data: user } = await axios({
                    method: "get",
                    url: `${USERS_URL}/${userId}`,
                });
                await redis.set("user", JSON.stringify(user));
                res.status(200).json(user);
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;
