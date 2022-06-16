"use strict";
const { Model } = require("sequelize");
const { hashingPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Movie, { foreignKey: "AuthorId" });
            User.hasMany(models.Order, { foreignKey: "AuthorId" });
        }
    }
    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your first name" },
                    notEmpty: { message: "cannot to be empty, enter your first name" },
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your last name" },
                    notEmpty: { message: "cannot to be empty, enter your last name" },
                },
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "role cannot to be null" },
                    notEmpty: { message: "role cannot to be empty" },
                },
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "phone number cannot to be null" },
                    notEmpty: { message: "phone number cannot to be empty" },
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "address cannot to be null" },
                    notEmpty: { message: "address cannot to be empty" },
                },
            },
            money: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { message: "money cannot to be null" },
                    notEmpty: { message: "money cannot to be empty" },
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: { message: "invalid email format" },
                    notNull: { message: "cannot to be null, enter your email" },
                    notEmpty: { message: "cannot to be empty, enter your email" },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your password" },
                    notEmpty: { message: "cannot to be empty, enter your password" },
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    User.addHook("beforeCreate", (user) => {
        // if (user.role === "") user.role = "customer";
        user.password = hashingPassword(user.password);
    });
    return User;
};
