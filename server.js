import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
