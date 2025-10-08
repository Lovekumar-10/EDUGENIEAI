

// const express = require("express");
// const Pdf = require("../models/pdf");
// const { generateText } = require("../utils/openai");
// const UserToken = require("../models/UserToken"); // Import new model
// const router = express.Router();

// // Helper: Split text into word chunks (~1000 words)
// const splitIntoWordChunks = (text, wordsPerChunk = 1000) => { 
//   const words = text.split(/\s+/); // split text into words
//   const chunks = [];

//   for (let i = 0; i < words.length; i += wordsPerChunk) {
//     const chunkWords = words.slice(i, i + wordsPerChunk);
//     chunks.push(chunkWords.join(" "));
//   }

//   return chunks;
// };

// // Generate summary for one chunk
// router.get("/summary/:pdfId/:chunkIndex/:userId", async (req, res) => { // added userId
//   try {
//     const { pdfId, chunkIndex, userId } = req.params;
//     const pdf = await Pdf.findById(pdfId);

//     if (!pdf) return res.status(404).json({ error: "PDF not found" });

//     // Split into 1000-word chunks
//     const chunks = splitIntoWordChunks(pdf.text); 
//     const index = parseInt(chunkIndex);

//     if (index < 0 || index >= chunks.length) {
//       return res.status(400).json({ error: "Invalid chunk index" });
//     }

//     // ----------------- ✅ Token limit logic -----------------
//     const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
//     let userToken = await UserToken.findOne({ userId, date: today });

//     if (!userToken) {
//       userToken = new UserToken({ userId, date: today, tokensUsed: 0 });
//     }

//     const chunkTokens = chunks[index].split(/\s+/).length; // simple token approx = word count
//     const DAILY_LIMIT = 40000;

//     if (userToken.tokensUsed + chunkTokens > DAILY_LIMIT) {
//       return res.status(403).json({ 
//         error: "Daily free limit exceeded. Please wait for tomorrow!" 
//       });
//     }

//     // ----------------- ✅ Generate summary -----------------
//     // const summaryPrompt = `Summarize the following text clearly and in detail, in paragraph form: ${chunks[index]} `;

//     const summaryPrompt = `Make study notes from the following text${chunks[index]} `;

//     const summary = await generateText(summaryPrompt);

//     // Update user's token usage
//     userToken.tokensUsed += chunkTokens;
//     await userToken.save();

//     res.json({
//       message: `Summary for chunk ${index + 1} of ${chunks.length}`,
//       summary,
//       totalChunks: chunks.length,
//       currentChunk: index + 1,
//       tokensUsed: userToken.tokensUsed,
//       dailyLimit: DAILY_LIMIT,
//     });

//   } catch (error) {
//     console.error("Error generating summary:", error);
//     res.status(500).json({ error: "Failed to generate summary" });
//   }
// });

// module.exports = router;
  











const express = require("express");
const Pdf = require("../models/pdf");
const { generateText } = require("../utils/openai");
const UserToken = require("../models/UserToken"); // Import new model
const router = express.Router();

// Helper: Split text into word chunks (~1000 words)
const splitIntoWordChunks = (text, wordsPerChunk = 1000) => { 
  const words = text.split(/\s+/); // split text into words
  const chunks = [];

  for (let i = 0; i < words.length; i += wordsPerChunk) {
    const chunkWords = words.slice(i, i + wordsPerChunk);
    chunks.push(chunkWords.join(" "));
  }

  return chunks;
};

// Generate summary for one chunk
router.post("/summary/:pdfId/:chunkIndex/:userId", async (req, res) => { // added userId
  try {
    const { pdfId, chunkIndex, userId } = req.params;
    const { subChoice, customInput } = req.body; 
    const pdf = await Pdf.findById(pdfId);

    if (!pdf) return res.status(404).json({ error: "PDF not found" });

    // Split into 1000-word chunks
    const chunks = splitIntoWordChunks(pdf.text); 
    const index = parseInt(chunkIndex);

    if (index < 0 || index >= chunks.length) {
      return res.status(400).json({ error: "Invalid chunk index" });
    }

    // ----------------- ✅ Token limit logic -----------------
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    let userToken = await UserToken.findOne({ userId, date: today });

    if (!userToken) {
      userToken = new UserToken({ userId, date: today, tokensUsed: 0 });
    }

    const chunkTokens = chunks[index].split(/\s+/).length; // simple token approx = word count
    const DAILY_LIMIT = 40000;

    if (userToken.tokensUsed + chunkTokens > DAILY_LIMIT) {
      return res.status(403).json({ 
        error: "Daily free limit exceeded. Please wait for tomorrow!" 
      });
    }

    const userPrompt = customInput || subChoice;

    // Combine with chunk text
    const summaryPrompt = `${userPrompt}\n\n${chunks[index]}`;


    const summary = await generateText(summaryPrompt);

    // Update user's token usage
    userToken.tokensUsed += chunkTokens;
    await userToken.save();

    res.json({
      message: `Summary for chunk ${index + 1} of ${chunks.length}`,
      summary,
      totalChunks: chunks.length,
      currentChunk: index + 1,
      tokensUsed: userToken.tokensUsed,
      dailyLimit: DAILY_LIMIT,
    });

  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
  });


module.exports = router;
  






