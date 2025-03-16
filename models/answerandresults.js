'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerAndResults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AnswerAndResults.init({
    admissionNumber: DataTypes.STRING,
    userAnswer: DataTypes.JSON,
    userScore: DataTypes.INTEGER,
    questionItems: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnswerAndResults',
  });
  return AnswerAndResults;
};