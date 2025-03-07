'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SecondDegreeTaker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SecondDegreeTaker.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    studentType: DataTypes.STRING,
    residency: DataTypes.STRING,
    courseCompleter: DataTypes.STRING,
    courseCompleted: DataTypes.STRING,
    yearGraduated: DataTypes.STRING,
    schoolGraduated: DataTypes.STRING,
    schoolAddress: DataTypes.STRING,
    awardsReceived: DataTypes.STRING,
    status:{
      type:DataTypes.STRING,
      defaultValue:"active"
    }
  }, {
    sequelize,
    modelName: 'SecondDegreeTaker',
    tableName: 'SecondDegreeTaker',
  });
  return SecondDegreeTaker;
};