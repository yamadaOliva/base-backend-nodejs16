"use strict";

const maid_profile = require('../models/maid_profile');

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
    const { faker } = require('@faker-js/faker');
    const userArray =[];
    for(let i=101;i<=200;i++){
        userArray.push({
            UserId : i,
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            phone_number: faker.phone.number(),
            address: faker.location.street(),
            city: faker.location.city(),
            country: faker.location.country(),
            description: faker.lorem.paragraph(),
            avatar_url: faker.image.avatar(),
            createdAt: new Date(), 
            updatedAt: new Date(),
        })
    }
    await queryInterface.bulkInsert('User_profile', userArray, {});
  
    
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
