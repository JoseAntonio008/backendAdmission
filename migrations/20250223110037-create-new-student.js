'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NewStudents', {
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
      residency: {
        type: Sequelize.STRING
      },
      shs: {
        type: Sequelize.STRING
      },
      schoolType: {
        type: Sequelize.STRING
      },
      schoolAddress: {
        type: Sequelize.STRING
      },
      yearGraduated: {
        type: Sequelize.STRING
      },
      awardsReceived: {
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
    await queryInterface.dropTable('NewStudents');
  }
};