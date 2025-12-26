import { useState } from "react";

export default function DreamInput({ onGenerate }) {
  const [dream, setDream] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!dream.trim()) return;
    onGenerate(dream);
    setDream("");
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-12 text-center px-4">
      <h1 className="text-4xl font-bold mb-4 bg-red-500 text-white">PathFinder</h1>

      <p className="text-gray-600 mb-6">
        Describe a dream, goal, or future you want to work toward.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          rows={4}
          placeholder="I want to become confident at public speaking..."
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="self-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Generate My Path
        </button>
      </form>
    </div>
  );
}
