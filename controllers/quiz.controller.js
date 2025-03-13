const express = require("express");
const { Questions } = require("../models");
const { fetchQuestions } = require("../services/quiz.service");
const quizRouter = express.Router();

quizRouter.get("/fetchQuestions", async (req, res) => {
  try {
    const result = await fetchQuestions();
    if (result.message == "No questions available") {
      return res
        .status(200)
        .json({ message: "no questions available", data: [] });
    }
    if (result.error) throw new Error(error.error);
    return res.status(200).json({ message: "success", data: result.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "an error occured", error: error.message });
  }
});

quizRouter.put("/update-choice/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const { choiceIndex, newText, action, newImage } = req.body;

    // Find the question
    const question = await Questions.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Parse choices from the DB (since it's stored as JSON string)
    let choices = JSON.parse(question.choices);

    // Validate choice index
    if (choiceIndex < 0 || choiceIndex >= choices.length) {
      return res.status(400).json({ message: "Invalid choice index" });
    }
    if (action === "add") {
      choices.push({ text: newText, image: newImage || null });
    } else if (action === "update") {
      // Update the specific choice
      choices[choiceIndex].text = newText || choices[choiceIndex].text;
    } else if (action === "delete") {
      // Delete the specific choice
      choices.splice(choiceIndex, 1);
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Update question with modified choices
    question.choices = choices;
    await question.save();

    return res
      .status(200)
      .json({ message: "Choice updated successfully", question });
  } catch (error) {
    console.error("Error updating choice:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = quizRouter;
