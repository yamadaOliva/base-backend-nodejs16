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
    const reviewArray =[];
    const reviewArray1 = ["bad","good","very good","excellent"];
    const getRand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    for(let i=1;i<=100;i++){
        reviewArray.push({
            UserId: i+100,
            maid_id:i,
            review: reviewArray1[getRand(0,3)],
            rating: getRand(1 , 5),
            comment: faker.lorem.paragraph(),
        })
    }
    await queryInterface.bulkInsert('Review', reviewArray, {});
  const reviewArray2 =[];
  const trueFlase = [true,false];
  for(let i = 1; i<=10; i++){
    reviewArray2.push({
      review_id: 1,
      user_id: i,
      agreement :  trueFlase[Math.floor(Math.random() * trueFlase.length)],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  await queryInterface.bulkInsert('Review_agreement', reviewArray2, {});
    
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
