const subGoalTemplates = [
  {
    key: "guitar",
    title: "Learn guitar",
    tasks: [
      "Practice chords 15 minutes daily",
      "Learn one new song each week",
      "Record yourself playing and review",
      "Take one online guitar lesson per week",
    ],
  },
  {
    key: "confident",
    title: "Become confident",
    tasks: [
      "Practice speaking in front of a mirror",
      "Record yourself giving a short speech",
      "Join a speaking club",
      "Ask a friend for feedback",
    ],
  },
  {
    key: "portfolio",
    title: "Build portfolio",
    tasks: [
      "Design one project website",
      "Write a case study",
      "Add screenshots of work",
      "Publish on GitHub",
    ],
  },
  {
    key: "influencer",
    title: "Become an influencer",
    tasks: [
      "Post one video every week",
      "Engage with audience daily",
      "Collaborate with a creator",
      "Analyze content performance",
    ],
  },
];

export function generateMockPath(dreamText) {
  const inputGoals = dreamText
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

  const steps = inputGoals.map((goalText, idx) => {
    const lower = goalText.toLowerCase();

    const matched = subGoalTemplates.find((t) =>
      lower.includes(t.key)
    );

    const title = matched ? matched.title : goalText;

    const sourceTasks = matched
      ? matched.tasks
      : [
          "Break the goal into small weekly tasks",
          "Track your progress daily",
          "Review and adjust your plan",
          "Celebrate small wins",
        ];

    const tasks = sourceTasks.slice(0, 3).map((task, i) => ({
      id: `goal-${idx}-task-${i}`,
      visionPrompt: task,
      completed: false,
    }));

    return {
      id: `goal-${idx}`,
      title,
      duration: "2 weeks",
      tasks,
    };
  });

  return {
    finalVision: "Here’s your mock roadmap for the New Year! 🚀",
    steps,
  };
}
