"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Movie.hasMany(models.Cast, { foreignKey: "MovieId" });
            Movie.hasMany(models.Order, { foreignKey: "MovieId" });

            Movie.belongsTo(models.Genre, { foreignKey: "GenreId" });
        }
    }
    Movie.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie title" },
                    notEmpty: { message: "cannot to be empty, enter your movie title" },
                },
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie slug" },
                    notEmpty: { message: "cannot to be empty, enter your movie slug" },
                },
            },
            synopsis: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie synopsis" },
                    notEmpty: { message: "cannot to be empty, enter your movie synopsis" },
                },
            },
            trailerUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie trailer" },
                    notEmpty: { message: "cannot to be empty, enter your movie trailer" },
                },
            },
            imgUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie image" },
                    notEmpty: { message: "cannot to be empty, enter your movie image" },
                },
            },
            rating: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie rate" },
                    notEmpty: { message: "cannot to be empty, enter your movie rate" },
                },
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie price" },
                    notEmpty: { message: "cannot to be empty, enter your movie price" },
                },
            },
            GenreId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { message: "cannot to be null, enter your movie genre" },
                    notEmpty: { message: "cannot to be empty, enter your movie genre" },
                },
                references: {
                    model: "Genres",
                    key: "id",
                },
            },
            AuthorId: {
                type: DataTypes.INTEGER,
            },
            AuthorMongoId: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: "Movie",
        }
    );
    return Movie;
};
