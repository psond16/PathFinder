import { useState } from "react";
import DreamInput from "./components/DreamInput";
import VisionBoard from "./components/VisionBoard";
import { samplePath } from "./data/samplePaths";

export default function App() {
  const [steps, setSteps] = useState(samplePath);

  const toggleStep = (id) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? { ...step, completed: !step.completed }
          : step
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6">
      <DreamInput />

      <div className="w-full max-w-3xl">
        <VisionBoard steps={steps} onToggle={toggleStep} />
      </div>
    </div>
  );
}
