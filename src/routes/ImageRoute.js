const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/ImageController");

router.get("/getSignedUrl", ImageController.getSignedUrl);

module.exports = router;
