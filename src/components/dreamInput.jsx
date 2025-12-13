import { useState } from "react";

export default function DreamInput({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
  };

  return (
    <div className="text-center p-8 max-w-xl w-full">
      <h1 className="text-4xl font-bold mb-4">PathFinder</h1>

      <p className="text-gray-600 mb-6">
        Describe a dream, goal, or future you want to work toward.
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="I want to move abroad, become financially independent, and live peacefully..."
          className="w-full p-4 border rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          rows="4"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Create My Path
        </button>
      </form>
    </div>
  );
}
