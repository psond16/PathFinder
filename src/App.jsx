import { useState } from "react";
import DreamInput from "./components/dreamInput.jsx";
import VisionBoard from "./components/visionBoard.jsx";
import VisionCollage from "./components/visionCollage.jsx";
import { generateMockPath } from "./lib/mockPath.js";

export default function App() {
  const [pathData, setPathData] = useState(null);

  function handleGeneratePath(dreamText) {
    if (!dreamText.trim()) return;
    setPathData(generateMockPath(dreamText));
  }

  function handleTaskToggle(stepId, taskId) {
    setPathData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
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
      ),
    }));
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <DreamInput onGenerate={handleGeneratePath} />

      {pathData && (
        <p className="mt-6 text-center text-xl font-semibold text-gray-700 max-w-2xl">
          🌟 {pathData.finalVision}
        </p>
      )}

      {pathData && <VisionCollage steps={pathData.steps} />}

      {pathData?.steps?.length > 0 && (
        <div className="w-full max-w-6xl mt-12 px-6">
          <VisionBoard
            steps={pathData.steps}
            onTaskToggle={handleTaskToggle}
          />
        </div>
      )}
    </div>
  );
}
