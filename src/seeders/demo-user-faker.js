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
    for (let i = 1; i <= 100; i++) {
      arrayMaid.push({
        email: `maid${i}@gmail.com`,
        password:
          "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
        username: `maid${i}`,
        role: 2,
        name: `maid`,
        active: true,
      });
    }
    let arrayUser = [];
    for(let i= 101;i<=200;i++){
      arrayUser.push({
        email:`user${i}@gmail.com`,
        password:
          "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
        username: `user${i}`,
        role: 1,
        name: `user`,
        active: true,
      });
    } 
    await queryInterface.bulkInsert("User", arrayMaid, {});
    await queryInterface.bulkInsert("USer", arrayUser, {});
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "adm@gmail.com",
          password:
            "$2a$10$TB0ZOdUaSdWCJjXY5GnfquMEBw6WuBDaN5rRyGDIj4M6maqD51nES",
          username: "maid1",
          role: 0,
          name: "ADMIN",
        }
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
