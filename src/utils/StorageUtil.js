require("dotenv").config();
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "engagement-app-tids",
  keyFilename: "./engagementAppKey.json",
});

const bucket = storage.bucket(process.env.BUCKET_NAME);

module.exports = { storage, bucket };
