import { useState } from "react";
import DreamInput from "./components/dreamInput";
import { generateMockPath } from "./lib/mockPath";

export default function App() {
  const [pathData, setPathData] = useState(null);

  function handleGeneratePath(dreamText) {
    console.log("handleGeneratePath fired:", dreamText);
  
    if (!dreamText.trim()) return;
  
    const result = generateMockPath(dreamText);
    console.log("AI PATH RESULT:", result);
  
    setPathData(result);
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6">
      <DreamInput onGenerate={handleGeneratePath} />

      {/* TEMP DEBUG OUTPUT — WILL REMOVE LATER */}
      {pathData && (
        <pre className="mt-8 max-w-3xl w-full bg-white p-4 rounded-lg shadow text-left text-sm overflow-auto">
          {JSON.stringify(pathData, null, 2)}
        </pre>
      )}
    </div>
  );
}
