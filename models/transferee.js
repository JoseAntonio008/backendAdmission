'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transferee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transferee.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    studentType: DataTypes.STRING,
    typeOfSchool: DataTypes.STRING,
    nameCollege: DataTypes.STRING,
    courseEnrolled: DataTypes.STRING,
    highestAttainedYear: DataTypes.STRING,
    schoolAddress: DataTypes.STRING,
    awardsReceived: DataTypes.STRING,
    residency: DataTypes.STRING,
    schoolTypeCollege:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transferee',
    tableName: 'Transferee',
  });
  return Transferee;
};