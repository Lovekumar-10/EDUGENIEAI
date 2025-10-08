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






// const mongoose = require('mongoose');

// // Flashcard schema
// const flashcardSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   answer: { type: String, required: true },
// });

// // MCQ schema
// const mcqSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   options: { type: [String], required: true },
//   correctAnswer: { type: String, required: true },
// });

// // Main PDF schema
// const pdfSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   text: { type: String, required: true },
//   uploadedAt: { type: Date, default: Date.now },

//   // New Phase 1 fields
//   summaries: [
//     {
//       chapter: { type: String },
//       summary: { type: String },
//     },
//   ],

//   flashcards: [flashcardSchema],
//   mcqs: [mcqSchema],
// });

// module.exports = mongoose.model('Pdf', pdfSchema);
