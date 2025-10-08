// const express = require("express");
// const multer = require("multer");
// const pdfParse = require("pdf-parse");
// const Pdf = require("../models/pdf");
// const { PDFDocument } = require("pdf-lib");
// const fs = require("fs");
// const path = require("path");

// const router = express.Router();

// // Multer memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Upload + compress + extract text
// router.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // 1️⃣ Load the PDF from buffer
//     const pdfDoc = await PDFDocument.load(req.file.buffer);

//     // 2️⃣ Create a new PDF to compress
//     const newPdf = await PDFDocument.create();
//     const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
//     pages.forEach((page) => newPdf.addPage(page));

//     // 3️⃣ Save compressed PDF to buffer
//     const pdfBytes = await newPdf.save();

//     // 4️⃣ Optional: Save compressed PDF to disk
//     const compressedDir = path.join(__dirname, "../uploads");
//     if (!fs.existsSync(compressedDir)) fs.mkdirSync(compressedDir);

//     const compressedPath = path.join(
//       compressedDir,
//       "compressed-" + req.file.originalname
//     );
//     fs.writeFileSync(compressedPath, pdfBytes);

//     // 5️⃣ Extract text from the compressed PDF
//     const data = await pdfParse(pdfBytes);

//     // 6️⃣ Save metadata + text + sizes to MongoDB
//     const newPdfDoc = new Pdf({
//       filename: req.file.originalname,
//       text: data.text,
//       originalSize: req.file.size,      // size before compression in bytes
//       compressedSize: pdfBytes.length,  // size after compression in bytes
//     });
//     await newPdfDoc.save();

//     // 7️⃣ Respond to client
//     res.json({
//       message: "PDF uploaded, compressed & text extracted ✅",
//       pdfId: newPdfDoc._id,
//       preview: data.text.slice(0, 500) + "...",
//       originalSize: req.file.size,
//       compressedSize: pdfBytes.length,
//       compressedFile: compressedPath,
//     });
//   } catch (error) {
//     console.error("Error uploading PDF:", error);
//     res.status(500).json({ error: "Failed to process PDF" });
//   }
// });

// module.exports = router;









const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const Pdf = require("../models/pdf");
const { PDFDocument } = require("pdf-lib");

const router = express.Router();

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload + compress + extract text (no disk saving)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1️⃣ Load the PDF from buffer
    const pdfDoc = await PDFDocument.load(req.file.buffer);

    // 2️⃣ Create a new PDF to compress
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    pages.forEach((page) => newPdf.addPage(page));

    // 3️⃣ Save compressed PDF to buffer
    const pdfBytes = await newPdf.save();

    // 4️⃣ Extract text from the compressed PDF
    const data = await pdfParse(pdfBytes);

    // 5️⃣ Save metadata + text + sizes to MongoDB
    const newPdfDoc = new Pdf({
      filename: req.file.originalname,
      text: data.text,
      originalSize: req.file.size,      // size before compression in bytes
      compressedSize: pdfBytes.length,  // size after compression in bytes
    });
    await newPdfDoc.save();

    // 6️⃣ Respond to client
    res.json({
      message: "PDF uploaded, compressed & text extracted ✅",
      pdfId: newPdfDoc._id,
      preview: data.text.slice(0, 500) + "...",
      originalSize: req.file.size,
      compressedSize: pdfBytes.length,
      // we no longer save to disk, so no compressedFile path
    });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

module.exports = router;
