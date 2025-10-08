// models/Pdf.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  originalSize: {
    type: Number,  // size before compression in bytes
  },
  compressedSize: {
    type: Number,  // size after compression in bytes
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pdf', pdfSchema);




