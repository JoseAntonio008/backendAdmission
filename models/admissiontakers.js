'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admissiontakers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admissiontakers.init({
    admissionNumber: DataTypes.INTEGER,
    examSchedule: DataTypes.DATE,
    fname: DataTypes.STRING,
    mname: DataTypes.STRING,
    courseChoices: DataTypes.JSON,
    lname:DataTypes.STRING,
    password:DataTypes.STRING,
    token:DataTypes.STRING,
    email:DataTypes.STRING,
    status:{
      type:DataTypes.STRING,
      defaultValue:"active"
    }
  }, {
    sequelize,
    modelName: 'Admissiontakers',
  });
  return Admissiontakers;
};