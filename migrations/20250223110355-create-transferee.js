'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transferees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      studentType: {
        type: Sequelize.STRING
      },
      typeOfSchool: {
        type: Sequelize.STRING
      },
      nameCollege: {
        type: Sequelize.STRING
      },
      courseEnrolled: {
        type: Sequelize.STRING
      },
      highestAttainedYear: {
        type: Sequelize.STRING
      },
      schoolAddress: {
        type: Sequelize.STRING
      },
      awardsReceived: {
        type: Sequelize.STRING
      },
      residency: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Transferees');
  }
};