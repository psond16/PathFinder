export default function VisionBoard({ steps, onToggle }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-6 rounded-xl border transition-all cursor-pointer
              ${
                step.completed
                  ? "bg-white text-black border-green-500"
                  : "bg-gray-200 text-gray-400 border-gray-300"
              }`}
            onClick={() => onToggle(step.id)}
          >
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="mt-2 text-sm">
              {step.completed ? "Completed ✓" : "Locked"}
            </p>
          </div>
        ))}
      </div>
    );
  }
  