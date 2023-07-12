"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const arrayLanguage = [
      {
        language_name: "English",
      },
      {
        language_name: "Japanese",
      }
    ];
    await queryInterface.bulkInsert("Language", arrayLanguage, {});
    const arrayMaidLanguage = [{}];
    for(let i = 1; i <= 100; i++){
      arrayMaidLanguage.push({
        MaidProfileId: i,
        LanguageId: Math.floor(Math.random() * 2) + 1,
      });
    }
    await queryInterface.bulkInsert("Maid_language", arrayMaidLanguage, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
