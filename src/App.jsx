import { useState } from "react";
import DreamInput from "./components/dreamInput";
import VisionBoard from "./components/VisionBoard";
import VisionCollage from "./components/VisionCollage";
import { generateMockPath } from "./lib/mockPath";

export default function App() {
  const [pathData, setPathData] = useState(null);

  function handleGeneratePath(dreamText) {
    if (!dreamText.trim()) return;
    setPathData(generateMockPath([dreamText]));
  }

  function handleTileClick(stepId) {
    console.log("Tile clicked:", stepId);
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-white">
      <DreamInput onGenerate={handleGeneratePath} />

      {pathData && (
        <p className="mt-6 text-center text-xl font-semibold text-gray-700 max-w-2xl">
          🌟 {pathData.finalVision}
        </p>
      )}

      {pathData && <VisionCollage />}

      {pathData && (
        <div className="w-full max-w-6xl mt-12 px-6">
          <VisionBoard steps={pathData.steps} onTileClick={handleTileClick} />
        </div>
      )}
    </div>
  );
}
