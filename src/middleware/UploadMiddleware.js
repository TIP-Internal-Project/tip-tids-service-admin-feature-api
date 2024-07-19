const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.memoryStorage(); // Store files in memory for further processing

// File filter for images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg, .png images are allowed!"));
  }
};

// Initialize upload middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
});

module.exports = upload;
