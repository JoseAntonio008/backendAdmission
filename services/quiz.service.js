const { where } = require("sequelize");
const { Questions } = require("../models");

const fetchQuestions = async () => {
  try {
    const result = await Questions.findAll();
    return {
      message: "results retrieved successfully",
      data: result,
    };
  } catch (error) {
    return {
      message: "an Error occured",
      error: error.message,
    };
  }
};

const deleteQuestion = async (id) => {
  try {
    const checkExist = await Questions.findByPk(id);
    if (!checkExist) throw new Error("no question found with this id");

    const toDelete = await Questions.destroy({
      where: {
        id,
      },
    });

    return {
      message: "deleted Successfully",
    };
  } catch (error) {
    return {
      message: "an error occured deleting the Question",
      error: error.message,
    };
  }
};
const updateQuestion = async ({
  id,
  questionTitle,
  questionImage,
  choices,
  author,
  category,
  correctAnswer,
}) => {
  try {
    const checkExist = await Questions.findByPk(id);

    if (!checkExist) throw new Error("no question find with this id");

    const toUpdate = await Questions.update(
      {
        questionTitle,
        questionImage,
        choices,
        author,
        category,
        correctAnswer,
      },
      {
        where: {
          id: checkExist.id,
        },
      }
    );
    return {
      message: "question Updated Successfully",
    };
  } catch (error) {
    return {
      message: "an error occurred",
      error: error.message,
    };
  }
};

module.exports = {
  fetchQuestions,
  deleteQuestion,
  updateQuestion,
};
