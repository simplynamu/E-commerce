const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const localFolder = path.join(__dirname, 'upload/images');

fs.readdir(localFolder, (err, files) => {
  if (err) return console.error("Error reading folder:", err);

  files.forEach((file) => {
    const filePath = path.join(localFolder, file);

    cloudinary.uploader.upload(filePath, { folder: 'products' }, (error, result) => {
      if (error) {
        console.error("Upload error for", file, ":", error);
      } else {
        console.log("✅ Uploaded:", file, "->", result.secure_url);
        // Optional: Update DB if needed here
      }
    });
  });
});
