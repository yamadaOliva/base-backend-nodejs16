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
    const bookingArray =[{}];
    const status = ['pending','accepted','rejected',"done", "refused"];
    for(let i=101;i<=130;i++){
        bookingArray.push({
            user_id: i,
            booking_id: 1,
            start_date: faker.date.future(),
            end_date: faker.date.future(),
            status: status[Math.floor(Math.random() * status.length)],
            price : 5, 
            address: faker.location.street(),
            note: faker.lorem.paragraph(),
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
    await queryInterface.bulkInsert('Booking', bookingArray, {});
  
    
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
