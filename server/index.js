import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/generate-path", async (req, res) => {
  const { goal } = req.body;

  if (!goal) {
    return res.status(400).json({ error: "Goal is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a life planning assistant.
Convert a user's goal into a realistic, step-by-step action plan
and a vision board structure.

Return ONLY valid JSON in this exact format:

{
  "timeline": "weeks or months",
  "finalVision": "short description of achieved future",
  "steps": [
    {
      "id": 1,
      "title": "Step title",
      "duration": "time estimate",
      "tasks": [
        {
          "task": "specific action",
          "frequency": "daily/weekly/once",
          "visionPrompt": "image prompt describing success"
        }
      ]
    }
  ]
}
`
          },
          {
            role: "user",
            content: goal,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API error:", data);
      return res.status(500).json({ error: "AI generation failed" });
    }

    const result = JSON.parse(data.choices[0].message.content);
    res.json(result);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 PathFinder backend running on http://localhost:${PORT}`);
});
