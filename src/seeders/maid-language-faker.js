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
        language_name: "Vietnamese",
      },
      {
        language_name: "Chinese",
      },
      {
        language_name: "Japanese",
      },
      {
        language_name: "Korean",
      },
      {
        language_name: "French",
      },
      {
        language_name: "German",
      },
      {
        language_name: "Spanish",
      },
    ];
    await queryInterface.bulkInsert("Language", arrayLanguage, {});
    const arrayMaidLanguage = [{}];
    for(let i = 1; i <= 100; i++){
      arrayMaidLanguage.push({
        MaidProfileId: i,
        LanguageId: Math.floor(Math.random() * 8) + 1,
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
