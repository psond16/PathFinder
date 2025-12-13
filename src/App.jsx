import { useState } from "react";
import DreamInput from "./components/DreamInput";
import VisionBoard from "./components/VisionBoard";

const STEPS = [
  "Clarify your goal",
  "Research what success looks like",
  "Create a realistic timeline",
  "Start with the smallest action",
  "Reflect and refine your approach",
];

export default function App() {
  const [goal, setGoal] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);

  const startPath = () => {
    if (goal.trim() === "") return;
    setCurrentStep(0);
  };

  const handleStepClick = (index) => {
    if (index === currentStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">PathFinder</h1>
      <p className="text-gray-300 mb-6">
        Describe a dream, goal, or future you want to work toward.
      </p>

      <DreamInput
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        onSubmit={startPath}
      />

      {currentStep >= 0 && (
        <div className="mt-10 max-w-xl">
          <VisionBoard
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
        </div>
      )}
    </div>
  );
}
