const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'engagement-app-288317', 
  keyFilename: './engagementAppKey.json', 
});

const bucket = storage.bucket('engagement-app-images'); 


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB in bytes (adjust as needed)
    },
  });
  
  module.exports = upload;