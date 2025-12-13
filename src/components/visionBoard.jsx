export default function VisionBoard({ steps, currentStep, onStepClick }) {
    return (
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLocked = index > currentStep;
  
          return (
            <div
              key={index}
              onClick={() => !isLocked && onStepClick(index)}
              className={`p-5 rounded-xl border transition-all cursor-pointer
                ${
                  isCompleted
                    ? "bg-green-100 border-green-400 text-green-900"
                    : isActive
                    ? "bg-blue-100 border-blue-400 text-blue-900"
                    : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">
                  Step {index + 1}: {step}
                </span>
  
                {isCompleted && <span>✓</span>}
                {isLocked && <span>🔒</span>}
                {isActive && <span>➡️</span>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  