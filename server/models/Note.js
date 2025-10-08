// // models/Note.js
// const mongoose = require("mongoose");

// const noteSchema = new mongoose.Schema({
//   name: { type: String, required: true },         // uploader name
//   title: { type: String, required: true },        // title/topic/book name
//   category: { type: String, default: "" },        // main category
//   subCategory: { type: String, default: "" },     // sub category
//   tags: { type: String, default: "" },           // array of tags
//   fileUrl: { type: String, required: true },      // Dropbox direct download link
//   dropboxFileId: { type: String, required: true },// Dropbox file ID for reference
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Note", noteSchema);









const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: { type: String, required: true },          // uploader name
  title: { type: String, required: true },         // title/topic/book name
  category: { type: String, default: "" },          // main category
  subCategory: { type: String, default: "" },       // sub category
  tags: { type: String, default: "" },              // array of tags
  fileUrl: { type: String, required: true },        // Firebase direct download link
  fileId: { type: String, required: true },         // Firebase file ID or name for reference
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
