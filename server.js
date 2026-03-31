import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.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
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
