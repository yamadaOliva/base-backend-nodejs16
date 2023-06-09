'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Maid_profile', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    UserID: {
        type: Sequelize.INTEGER,
     },
     first_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      experience: {
        type: Sequelize.INTEGER,
      },
      skills: {
        type: Sequelize.STRING,
      },
      ceftification: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.DATE,
      },
      price_per_hour: {
        type: Sequelize.INTEGER,
      },
      avatar_url: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.DECIMAL(10,1),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Maid_profile');
  }
};