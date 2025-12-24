export function generateMockPath(goalText) {
    console.log("MOCK AI CALLED WITH:", goalText);
  
    return {
      timeline: "3 months",
      finalVision: `You confidently express yourself and speak with ease about ${goalText}.`,
      steps: [
        {
          id: 1,
          title: "Start speaking daily",
          duration: "2 weeks",
          tasks: [
            {
              task: "Practice speaking for 10 minutes out loud",
              frequency: "daily",
              visionPrompt: "person speaking confidently alone in a calm room"
            }
          ]
        },
        {
          id: 2,
          title: "Build online presence",
          duration: "1 month",
          tasks: [
            {
              task: "Post short speaking videos online",
              frequency: "weekly",
              visionPrompt: "confident influencer speaking to camera on phone"
            }
          ]
        },
        {
          id: 3,
          title: "Refine confidence",
          duration: "1.5 months",
          tasks: [
            {
              task: "Record and review speaking sessions",
              frequency: "weekly",
              visionPrompt: "person reviewing recorded speech confidently"
            }
          ]
        }
      ]
    };
  }
  