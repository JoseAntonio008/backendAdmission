const express = require("express");
const cloudinary = require("../utils/cloudinary"); // Import the Cloudinary config
const multer = require("multer");
const upload = multer(); // Configure multer for handling form-data

const uploadRouter = express.Router();

uploadRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Upload the file buffer to Cloudinary
    const result = cloudinary.uploader.upload_stream(
      {
        folder: "uploads", // Optional: specify a folder in Cloudinary
      },
      (error, uploadResult) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }

        // Return the Cloudinary URL
        return res.status(200).json({
          message: "Upload successful",
          url: uploadResult.secure_url,
        });
      }
    );

    // Pipe the file buffer to Cloudinary's upload stream
    const stream = result;
    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = uploadRouter;
