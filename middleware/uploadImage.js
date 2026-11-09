const multer = require("multer");

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
  },

  fileFilter(req, file, callback) {
    if (!allowedTypes.has(file.mimetype)) {
      return callback(
        new Error("Only JPEG, PNG, and WebP images are allowed.")
      );
    }

    callback(null, true);
  },
});

function uploadImage(req, res, next) {
  upload.single("image")(req, res, (error) => {
    if (error) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({
          message: "The image must be smaller than 5 MB.",
        });
      }

      return res.status(400).json({
        message: error.message || "Invalid image upload.",
      });
    }

    next();
  });
}

module.exports = uploadImage;