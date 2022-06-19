"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Movies", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            slug: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            synopsis: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            trailerUrl: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            imgUrl: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            rating: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            GenreId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            AuthorId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Movies");
    },
};
