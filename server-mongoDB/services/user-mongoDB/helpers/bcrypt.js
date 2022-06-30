const { hashSync, genSaltSync, compareSync } = require("bcryptjs");

module.exports = {
    hashingPassword: (password) => hashSync(password, genSaltSync(10)),
    comparePassword: (password, hashPassword) => compareSync(password, hashPassword),
};
