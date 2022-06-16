"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        let genres = require("../genre.json").map((genre) => {
            genre.createdAt = new Date();
            genre.updatedAt = new Date();
            return genre;
        });
        await queryInterface.bulkInsert("Genres", genres);
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Genres", null);
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
