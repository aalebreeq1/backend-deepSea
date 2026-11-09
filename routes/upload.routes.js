const router = require("express").Router();
const cloudinary = require("../config/cloudinary");
const verifyToken = require("../middleware/verifyToken");
const uploadImage = require("../middleware/uploadImage");

router.post("/image", verifyToken, uploadImage, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "Please select an image.",
    });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "deep-sea",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
        },
        (error, uploadedImage) => {
          if (error) return reject(error);
          resolve(uploadedImage);
        }
      );

      stream.on("error", reject);
      stream.end(req.file.buffer);
    });

    return res.status(201).json({
      image: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    const invalidImage = error.http_code === 400;

    return res.status(invalidImage ? 400 : 502).json({
      message: invalidImage
        ? "The image could not be accepted. Choose a valid JPEG, PNG, or WebP."
        : "Image upload failed. Please try again.",
    });
  }
});

module.exports = router;