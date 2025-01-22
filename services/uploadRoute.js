const express = require("express");
const cloudinary = require("../utils/cloudinary"); // Import the Cloudinary config
const multer = require("multer");

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
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = uploadRouter;
