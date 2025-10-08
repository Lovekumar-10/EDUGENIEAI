const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { uploadFile } = require("../utils/imagekit");
const Note = require("../models/Note");

const router = express.Router();

// Multer setup: 10 MB limit + only PDF mime types
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max file size
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    const ext = file.originalname.split(".").pop().toLowerCase();

    if (allowedTypes.includes(file.mimetype) && ext === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF (.pdf) files are allowed"));
    }
  },
});

// POST route to upload a note
router.post("/upload", upload.single("noteFile"), async (req, res) => {
  try {
    const { name, title, tags, category, subCategory } = req.body;

    if (!name || !title || !req.file) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Upload file to ImageKit
    const file = await uploadFile(req.file);

    // Create new note document with file URL
    const newNote = new Note({
      name,
      title,
      category: category || "",
      subCategory: subCategory || "",
      tags: tags || "",
      fileUrl: file.fileUrl,
      fileId: file.fileId, 
    });

    await newNote.save();

    res.status(201).json({ message: "Uploaded successfully!", note: newNote });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
});

// GET route to fetch paginated notes
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Note.countDocuments();

    res.json({
      notes,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("❌ Fetch notes failed:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

module.exports = router;
