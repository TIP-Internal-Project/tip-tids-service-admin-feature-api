const ImageService = require("../services/ImageService");

const getSignedUrl = async (req, res) => {
  const fileName = req.query.fileName; // Get file name from query parameter

  if (!fileName) {
    return res.status(400).send("File name is required");
  }

  try {
    const imageUrl = await ImageService.getSignedUrl(fileName);
    res.status(200).json(imageUrl);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSignedUrl };
