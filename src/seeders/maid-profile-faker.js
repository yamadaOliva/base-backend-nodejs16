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
    const money = [5,10,15,20];
    const { faker } = require('@faker-js/faker');
    const getRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const arraySkill = ['care','food']
    const getRandom1Skills = () => {
      let skill = arraySkill[getRand(0, 1)];
      return [skill];
    }
    const arrayCefitication = ['IELTS 8.0','TOEIC','TOEFL','JLPT N2']
    const getRandom2Cefitication = () => {
      let cefitication1 = arrayCefitication[getRand(0, 3)];
      let cefitication2 = arrayCefitication[getRand(0, 3)];
      while (cefitication1 === cefitication2) {
        cefitication2 = arrayCefitication[getRand(0, 3)];
      }
      return [cefitication1, cefitication2];
    }
    let arrayMaid = [];
    for (let i = 1; i <= 100; i++) {
      arrayMaid.push({
        UserId: i,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone_number: faker.phone.number(),
        address: faker.location.street(), 
        city: faker.location.city(),
        country: faker.location.country(),
        description: faker.lorem.paragraph(),
        skills: faker.lorem.paragraph(),
        experience: getRand(1, 10),
        skills: getRandom1Skills().join(','),
        birth_date: faker.date.past(),
        ceftification: getRandom2Cefitication().join(','),
        price_per_hour: money[getRand(0, 3)],
        avatar_url: faker.image.avatar(),
        rating: faker.number.float({min: 0, max: 5, precision: 0.1}),
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
