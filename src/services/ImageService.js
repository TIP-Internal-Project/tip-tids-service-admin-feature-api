const { bucket } = require("../utils/StorageUtil");

class ImageService {
  async uploadImage(imageBuffer, fileName) {
    try {
      console.log(
        "Uploading image:",
        fileName,
        "Buffer size:",
        imageBuffer.length
      );
      const file = bucket.file(fileName);
      await file.save(imageBuffer);

      const authenticatedURL = `https://storage.cloud.google.com/${bucket.name}/${file.name}`;
      console.log("Image uploaded. Public URL:", authenticatedURL);

      return authenticatedURL;
    } catch (error) {
      console.log("Error uploading image:", error.message);
      throw error;
    }
  }

  async getSignedUrl(fileName) {
    try {
      const file = bucket.file(fileName);

      // Generate a signed URL for read access
      const [url] = await file.getSignedUrl({
        action: "read",
        expires: Date.now() + 1000 * 60 * 60 * 24, // URL expires in 24 hours
      });

      return url;
    } catch (error) {
      console.error("Error generating signed URL:", error);
      res.status(500).send("Error generating signed URL");
    }
  }
}

module.exports = new ImageService();
