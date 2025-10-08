// utils/imagekit.js
const ImageKit = require("imagekit");
const fs = require("fs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  try {
    // Read file buffer
    const fileBuffer = fs.readFileSync(file.path);

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer, // actual file buffer
      fileName: file.originalname,
      folder: "/notes", // optional folder name in ImageKit
      useUniqueFileName: true,
    });

    // Delete temp file
    fs.unlinkSync(file.path);

    return {
      fileUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  } catch (error) {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    throw error;
  }
}

module.exports = { uploadFile };
