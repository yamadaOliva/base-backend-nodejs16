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
    let arrayMaid = [];
    for (let i = 10; i <= 100; i++) {
      arrayMaid.push({
        email: `maid${i}@gmail.com`,
        password:
          "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
        username: `maid${i}`,
        role: 2,
        name: `maid`,
      });
    }
    await queryInterface.bulkInsert("User", arrayMaid, {});
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "maid1@gmail.com",
          password:
            "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
          username: "maid1",
          role: 2,
          name: "maid",
        },
        {
          email: "maid2",
          password:
            "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
          username: "maid2",
          role: 2,
          name: "maid",
        },
        {
          email: "maid3",
          password:
            "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
          username: "maid3",
          role: 2,
          name: "maid",
        },
        {
          email: "maid4",
          password:
            "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
          username: "maid4",
          role: 2,
          name: "maid",
        },
      ],
      {}
    );
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
