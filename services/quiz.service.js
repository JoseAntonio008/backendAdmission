const { where } = require("sequelize");
const { Questions } = require("../models");

const fetchQuestions = async () => {
  try {
    const result = await Questions.findAll();
    
    if (result.length === 0) {
      return {
        message: "No questions available",
      };
    }

    // Parse choices for each question
    const cleanedResult = result.map((question) => ({
      ...question.toJSON(), // Convert Sequelize object to plain JSON
      choices: JSON.parse(question.choices), // Parse the JSON string
    }));

    return {
      message: "Success",
      data: cleanedResult,
    };
  } catch (error) {
    return {
      message: "An error occurred",
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
