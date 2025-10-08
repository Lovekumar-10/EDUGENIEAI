const OpenAI = require("openai");

// GitHub-hosted models
const client = new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_API_KEY, // Your GitHub PAT
});

const generateText = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-4.1", // GitHub model
      // model: "openai/gpt-4o",     // for fake 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI (GitHub) error:", error);
    return null;
  }
};

module.exports = { generateText };
