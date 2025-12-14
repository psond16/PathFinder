export async function generatePath(goalText) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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
            content: goalText,
          },
        ],
        temperature: 0.7,
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate path");
    }
  
    const data = await response.json();
  
    return JSON.parse(data.choices[0].message.content);
  }
  
  console.log("AI generator loaded");
