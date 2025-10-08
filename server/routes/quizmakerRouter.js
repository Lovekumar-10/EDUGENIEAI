

const express = require("express");
const router = express.Router();
const { generateText } = require("../utils/openai");

// Helper function to shuffle array
function shuffleArray(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// POST /api/quiz/generate
router.post("/generate", async (req, res) => {
  try {
    const { topic, customText, difficulty, numQuestions } = req.body;

    //  Validate input
    if ((!topic && !customText) || !numQuestions || !difficulty) {
      return res.status(400).json({
        error: "Please provide topic or customText, difficulty, and numQuestions",
      });
    }

    // Prepare content for AI prompt
    const content = customText ? customText : `Topic: ${topic}`;

    //  AI Prompt
    const prompt = `You are an AI quiz maker.

Generate ${numQuestions} multiple-choice questions (MCQs) based on the following content:

${content}

Rules:
1. Each question should have 4 options.
2. Include the correct answer for each question.
3. Difficulty: ${difficulty} (easy, medium, hard).
4. Randomize the position of the correct answer among the 4 options.
5. Make all 4 options realistic and relevant to the topic.
6. Return output in strict JSON format like this:

[
  {
    "id": 1,
    "question": "Your question text here",
    "options": ["option 1", "option 2", "option 3", "option 4"],
    "answer": "Correct option here"
  }
]

Ensure that:
- JSON is parsable with no extra text.
- The "id" starts from 1 and increments by 1.
- Options are always shuffled.`;

    //  Generate questions via OpenAI
    const aiResponse = await generateText(prompt);

    //  Parse AI response into JSON
    let questions;
    try {
      questions = JSON.parse(aiResponse);
    } catch (err) {
      console.error("❌ Failed to parse AI response:", err);
      return res.status(500).json({
        error: "Failed to parse AI response as JSON",
        aiResponse,
      });
    }

    // Final Safety: Shuffle each question's options again (so no pattern)
    const shuffledQuestions = questions.map((q) => {
      const shuffledOptions = shuffleArray(q.options);
      return {
        ...q,
        options: shuffledOptions,
        answer: q.answer, // keep answer text same
      };
    });

    //  Send final questions to frontend
    res.json({ questions: shuffledQuestions });
  } catch (error) {
    console.error("💥 Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

module.exports = router;
