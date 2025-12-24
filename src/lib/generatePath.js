export async function generatePath(goalText) {
    const response = await fetch("http://localhost:3001/generate-path", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal: goalText }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate path");
    }
  
    return response.json();
  }
  