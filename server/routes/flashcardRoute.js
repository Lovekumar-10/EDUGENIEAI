
const express = require("express");
const Pdf = require("../models/pdf");
const { generateText } = require("../utils/openai");
const UserToken = require("../models/UserToken");
const router = express.Router();

// Helper: Split text into word chunks (~1000 words)
const splitIntoWordChunks = (text, wordsPerChunk = 1000) => { 
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += wordsPerChunk) {
    const chunkWords = words.slice(i, i + wordsPerChunk);
    chunks.push(chunkWords.join(" "));
  }
  return chunks;
};

// Temporary in-memory store for user chosen counts (per server session)
const userFlashcardCounts = {}; // { `${userId}_${pdfId}`: count }


router.post("/flashcards/:pdfId/:chunkIndex/:userId", async (req, res) => {
  try {
    const { pdfId, chunkIndex, userId } = req.params;
    let { count } = req.body;

    // Persist the chosen count for future chunks
    const userKey = `${userId}_${pdfId}`;
    if (count && !isNaN(count) && count > 0) {
      userFlashcardCounts[userKey] = parseInt(count);
    } else if (userFlashcardCounts[userKey]) {
      count = userFlashcardCounts[userKey]; // fallback to previous count
    } else {
      return res.status(400).json({ error: "Please provide a valid count of flashcards." });
    }

    const pdf = await Pdf.findById(pdfId);
    if (!pdf) return res.status(404).json({ error: "PDF not found" });

    // Split into chunks
    const chunks = splitIntoWordChunks(pdf.text);
    const index = parseInt(chunkIndex);
    if (index < 0 || index >= chunks.length) {
      return res.status(400).json({ error: "Invalid chunk index" });
    }

    // Token limit logic
    const today = new Date().toISOString().slice(0, 10);
    let userToken = await UserToken.findOne({ userId, date: today });
    if (!userToken) {
      userToken = new UserToken({ userId, date: today, tokensUsed: 0 });
    }

    const chunkTokens = chunks[index].split(/\s+/).length;
    const DAILY_LIMIT = 60000;
    if (userToken.tokensUsed + chunkTokens > DAILY_LIMIT) {
      return res.status(403).json({ 
        error: "Daily free limit exceeded. Please wait for tomorrow!" 
      });
    }

    // Flashcard prompt
    const flashcardPrompt = `
      Create ${count} flashcards from the following text.
      Return them ONLY in this JSON array format:
      [
        {"question": "Question 1", "answer": "Answer 1"},
        {"question": "Question 2", "answer": "Answer 2"}
      ]

      Text:
      ${chunks[index]}
    `;

    const flashcardsText = await generateText(flashcardPrompt);

    // Try to parse JSON safely
    let flashcards;
    try {
      flashcards = JSON.parse(flashcardsText);
    } catch (e) {
      console.warn("Could not parse AI response as JSON. Using fallback.");
      flashcards = Array.from({ length: count }, (_, i) => ({
        question: `Sample Question ${i + 1}`,
        answer: `Sample Answer ${i + 1}`
      }));
    }

    // Update tokens
    userToken.tokensUsed += chunkTokens;
    await userToken.save();

    res.json({
      message: `Flashcards for chunk ${index + 1} of ${chunks.length}`,
      flashcards,
      totalChunks: chunks.length,
      currentChunk: index + 1,
      tokensUsed: userToken.tokensUsed,
      dailyLimit: DAILY_LIMIT
    });

  } catch (error) {
    console.error("Error generating flashcards:", error);
    res.status(500).json({ error: "Failed to generate flashcards" });
  }
});

module.exports = router;
