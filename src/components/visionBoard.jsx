export default function VisionBoard({ steps, onUpdateNotes, onComplete }) {
    return (
      <div className="flex flex-col gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-5 rounded-lg border ${
              step.unlocked
                ? "border-gray-700 bg-neutral-900"
                : "border-gray-800 bg-neutral-900 opacity-40"
            }`}
          >
            <h3 className="font-semibold text-lg mb-2">
              Step {step.id + 1}: {step.title}
            </h3>
  
            {!step.unlocked && (
              <p className="text-sm text-gray-500">🔒 Locked</p>
            )}
  
            {step.unlocked && (
              <>
                <textarea
                  value={step.notes}
                  onChange={(e) =>
                    onUpdateNotes(step.id, e.target.value)
                  }
                  placeholder="Write your thoughts here..."
                  className="w-full mt-3 p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                  rows={3}
                />
  
                {!step.completed && (
                  <button
                    onClick={() => onComplete(step.id)}
                    className="mt-3 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
                  >
                    Mark as complete
                  </button>
                )}
  
                {step.completed && (
                  <p className="mt-3 text-green-400">✓ Completed</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  }
  