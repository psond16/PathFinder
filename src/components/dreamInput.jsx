export default function DreamInput({ value, onChange, onSubmit }) {
    return (
      <div className="flex flex-col gap-4 max-w-xl">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="I want to move abroad, become financially independent, and live peacefully..."
          className="w-full p-4 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
  
        <button
          onClick={onSubmit}
          className="self-start px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
        >
          Create My Path
        </button>
      </div>
    );
  }
  