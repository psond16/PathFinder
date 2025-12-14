import { generatePath } from "./lib/generatePath";
import { useState } from "react";
import DreamInput from "./components/DreamInput";
import VisionBoard from "./components/VisionBoard";

export default function App() {
  const [goal, setGoal] = useState("");
  const [steps, setSteps] = useState([]);

  const handleGenerate = (dream) => {
    setGoal(dream);
    // steps will be generated in Phase 6B
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6">
      <DreamInput onGenerate={handleGenerate} />

      {steps.length > 0 && (
        <div className="w-full max-w-3xl">
          <VisionBoard steps={steps} />
        </div>
      )}
    </div>
  );
}
