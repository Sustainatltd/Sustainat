const express = require("express");
const router = express.Router();
const multer = require("multer");
const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");

const upload = multer(); // No disk storage – memory only

// 🖼️ POST /api/upload — Uploads image to Cloudinary
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const streamUpload = (req) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "sustainat" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload(req);
    res.json({ url: result.secure_url }); // ✅ Return image URL to frontend
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
