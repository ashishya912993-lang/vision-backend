import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: req.body.message }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });
} catch (err) {
  console.log("FULL ERROR 👉", err);

  res.status(500).json({
    error: err.message || "Unknown error"
  });
        }

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
