'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const { faker } = require('@faker-js/faker');
    let arrayMaid = [];
    for (let i = 1; i <= 100; i++) {
      arrayMaid.push({
        maid_id: i,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone_number: faker.phone.number(),
        address: faker.location.street(), 
        city: faker.location.city(),
        country: faker.location.country(),
        description: faker.lorem.paragraph(),
        skills: faker.lorem.paragraph(),
        experience: faker.lorem.paragraph(),
        skills: faker.lorem.paragraph(),
        birth_date: faker.date.past(),
        ceftification: faker.lorem.paragraph(),
        price_per_hour: faker.number.int()
      });
    }
    await queryInterface.bulkInsert('maid_profile', arrayMaid, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
