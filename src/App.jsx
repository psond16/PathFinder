import { useState, useEffect } from "react";
import DreamInput from "./components/dreamInput.jsx";
import VisionBoard from "./components/visionBoard.jsx";
import VisionCollage from "./components/visionCollage.jsx";
import Notification from "./components/notification.jsx";
import { generateMockPath } from "./lib/mockPath.js";

export default function App() {
  const [pathData, setPathData] = useState(null);
  const [reflections, setReflections] = useState({}); // {goalId: text}
  const [notifications, setNotifications] = useState([]);
  const [boardMood, setBoardMood] = useState("morning"); // morning, evening, night

  // Set board mood based on local time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setBoardMood("morning");
    else if (hour >= 12 && hour < 18) setBoardMood("evening");
    else setBoardMood("night");
  }, []);

  function handleGeneratePath(dreamText) {
    if (!dreamText.trim()) return;
    setPathData(generateMockPath(dreamText));
  }

  function handleTaskToggle(stepId, taskId) {
    setPathData((prev) => {
      const newSteps = prev.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              tasks: step.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : step
      );

      // Check if main goal just completed
      const completedStep = newSteps.find((s) => s.id === stepId);
      const goalJustCompleted =
        completedStep.tasks.every((t) => t.completed) &&
        !prev.steps.find((s) => s.id === stepId)?.tasks.every((t) => t.completed);

      if (goalJustCompleted) {
        // Add notification
        setNotifications((prevNotifs) => [
          ...prevNotifs,
          { id: Date.now(), message: `${completedStep.title} completed!` },
        ]);
      }

      return { ...prev, steps: newSteps };
    });
  }

  function handleReflection(goalId, text) {
    setReflections((prev) => ({ ...prev, [goalId]: text }));
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center transition-colors duration-500 ${
        boardMood === "morning"
          ? "bg-gradient-to-b from-yellow-50 to-blue-50"
          : boardMood === "evening"
          ? "bg-gradient-to-b from-orange-50 to-purple-50"
          : "bg-gradient-to-b from-gray-800 to-gray-900"
      }`}
    >
      <DreamInput onGenerate={handleGeneratePath} />

      {pathData && (
        <p className="mt-6 text-center text-xl font-semibold text-gray-700 max-w-2xl">
          🌟 {pathData.finalVision}
        </p>
      )}

      {pathData && (
        <VisionCollage
          steps={pathData.steps}
          reflections={reflections}
          boardMood={boardMood}
        />
      )}

      {pathData?.steps?.length > 0 && (
        <div className="w-full max-w-6xl mt-12 px-6">
          <VisionBoard
            steps={pathData.steps}
            onTaskToggle={handleTaskToggle}
            onReflection={handleReflection}
            reflections={reflections}
          />
        </div>
      )}

      {/* Notifications */}
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          message={notif.message}
          onClose={() =>
            setNotifications((prev) =>
              prev.filter((n) => n.id !== notif.id)
            )
          }
        />
      ))}
    </div>
  );
}
