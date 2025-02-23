'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admissiontakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admissionNumber: {
        type: Sequelize.INTEGER
      },
      examSchedule: {
        type: Sequelize.DATE
      },
      fname: {
        type: Sequelize.STRING
      },
      mname: {
        type: Sequelize.STRING
      },
      courseChoices: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('Admissiontakers');
  }
};