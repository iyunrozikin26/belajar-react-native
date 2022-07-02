"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        let movies = require("../db/movies.json").map((mov) => {
            mov.createdAt = new Date();
            mov.updatedAt = new Date();
            mov.AuthorMongoId = "62b40413430aed2bca0ac406";
            return mov;
        });

        await queryInterface.bulkInsert("Movies", movies);
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
        await queryInterface.bulkDelete("Movies", null);

        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
