const subGoalTemplates = {
  "Become confident": [
    "Practice speaking in front of a mirror 10 minutes daily",
    "Record yourself giving a short speech once a week",
    "Join a local or online speaking club",
    "Ask a friend for feedback on your presentations"
  ],
  "Build portfolio": [
    "Design one project website",
    "Write a case study for a past project",
    "Add screenshots and descriptions of work",
    "Publish on GitHub or personal website"
  ],
  "Learn guitar": [
    "Practice chords 15 minutes daily",
    "Learn one new song each week",
    "Record yourself playing and review",
    "Take one online guitar lesson per week"
  ],
  "Become an influencer": [
    "Post one video every week",
    "Engage with your audience daily",
    "Collaborate with one creator per month",
    "Analyze which content performs best"
  ],
  "default": [
    "Break the goal into small weekly tasks",
    "Track your progress daily",
    "Review and adjust your plan",
    "Celebrate small wins"
  ]
};

export function generateMockPath(dreams) {
  const steps = dreams.map((dream, idx) => {
    // Choose a template if exists, else default
    const template = subGoalTemplates[dream] || subGoalTemplates["default"];

    // Pick 3 random tasks from the template
    const tasks = template
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((task, tIdx) => ({ id: `task-${idx}-${tIdx}`, visionPrompt: task }));

    return {
      id: `goal-${idx}`,
      title: dream,
      unlocked: true,
      completed: false,
      duration: `${2 + idx} weeks`,
      tasks
    };
  });

  return {
    finalVision: "Here’s your mock roadmap for the New Year! 🚀",
    steps
  };
}
