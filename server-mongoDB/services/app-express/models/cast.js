"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cast extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Cast.belongsTo(models.Movie, { foreignKey: "MovieId" });
        }
    }
    Cast.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "name cannot to be null" },
                    notEmpty: { message: "name cannot to be empty" },
                },
            },
            profilePict: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "profile picture cannot to be null" },
                    notEmpty: { message: "profile picture cannot to be empty" },
                },
            },
            MovieId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { message: "movieId cannot to be null" },
                    notEmpty: { message: "movieId cannot to be empty" },
                },
                references: {
                    model: "Movies",
                    key: "id",
                 },
            },
        },
        {
            sequelize,
            modelName: "Cast",
        }
    );
    return Cast;
};
