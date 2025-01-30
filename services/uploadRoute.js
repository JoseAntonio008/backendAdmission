const express = require("express");
const cloudinary = require("../utils/cloudinary"); // Import the Cloudinary config
const multer = require("multer");
const {Questions} = require('../models');
// Configure multer for handling form-data
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("File received:", req.file);

    // Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Validate file type (ensure it's an image)
    if (!req.file.mimetype.startsWith("image/")) {
      return res
        .status(400)
        .json({ error: "Invalid file type. Only images are allowed." });
    }

    // Upload stream logic
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "uploads" }, // Specify the folder in Cloudinary
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer); // Send the file buffer to the stream
    });

    const result = await uploadPromise; // Wait for the upload to complete
    console.log("Cloudinary upload result:", result);

    // Send success response
    res.status(200).json({
      message: "Upload successful",
      publicId: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});
const base64ToBuffer = (base64String) => {
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, ""); // Remove metadata if present
  return Buffer.from(base64Data, "base64");
};

uploadRouter.post("/upload-quiz", async (req, res) => {
  try {
    const { author, question } = req.body;

    if (!author || !Array.isArray(question)) {
      return res.status(400).json({ message: "Invalid request format" });
    }

    const processedQuestions = [];

    for (let i = 0; i < question.length; i++) {
      const q = question[i];
      const processedChoices = [];

      if (!q.choices || !Array.isArray(q.choices)) {
        return res
          .status(400)
          .json({ message: `Invalid choices format in question ${i + 1}` });
      }

      for (let j = 0; j < q.choices.length; j++) {
        const choice = q.choices[j];

        if (choice.image && choice.image.startsWith("data:image")) {
          try {
            // Extract Base64 data and upload to Cloudinary
            const base64Data = choice.image.replace(
              /^data:image\/\w+;base64,/,
              ""
            );
            const uploadResponse = await cloudinary.uploader.upload(
              `data:image/jpeg;base64,${base64Data}`,
              {
                folder: "uploads",
              }
            );

            processedChoices.push({
              ...choice,
              image: uploadResponse.secure_url, // Replace with Cloudinary URL
            });
          } catch (error) {
            console.error(
              `Error uploading image for choice ${j + 1} of question ${i + 1}`,
              error
            );
          }
        }
      }

      let processedQuestionImage = null;
      if (q.questionImage && q.questionImage.startsWith("data:image")) {
        try {
          // Upload the question image if it's Base64
          const base64Data = q.questionImage.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
          const uploadResponse = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${base64Data}`,
            { folder: "uploads" }
          );
          processedQuestionImage = uploadResponse.secure_url; // Replace with Cloudinary URL
        } catch (error) {
          console.error(
            `Error uploading question image for question ${i + 1}`,
            error
          );
        }
      }

      processedQuestions.push({
        ...q,
        questionImage: processedQuestionImage,
        choices: processedChoices,
      });
    }
    console.log(processedQuestions);
    
    const createQuestions = await Questions.bulkCreate(
      processedQuestions.map((q) => ({
        questionTitle: q.questionTitle,
        questionImage: q.questionImage,
        category: q.category,
        choices: q.choices, // Storing choices as JSON
        author: author, // Use the `author` from req.body
        correctAnswer: q.correctAnswer,
      }))
    );
    
    // Send the response with processed data
    res.status(200).json({
      message: "Quiz processed and images uploaded successfully!",
      data: {
        author,
        question: processedQuestions,
      },
    });
  } catch (error) {
    console.error("Error processing quiz:", error);
    res
      .status(500)
      .json({ message: "Server error", error: error.message || error });
  }
});


module.exports = uploadRouter;
