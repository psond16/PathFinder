import VisionTile from "./visionTile.jsx";

export default function VisionBoard({ steps = [], onTaskToggle, onReflection, reflections }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {steps.map((step) => {
        const goalCompleted = step.tasks?.every((task) => task.completed);

        return (
          <div key={step.id}>
            <VisionTile
              step={step}
              locked={!goalCompleted}
              onTaskToggle={onTaskToggle}
            />

            {/* Reflection input */}
            {goalCompleted && !reflections[step.id] && (
              <div className="mt-2 p-3 bg-yellow-50 rounded-md shadow-sm flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Why did this goal matter to you?
                </label>
                <input
                  type="text"
                  className="p-2 border rounded-md"
                  placeholder="Write 1–2 sentences..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onReflection(step.id, e.target.value);
                    }
                  }}
                />
                <small className="text-gray-500">Press Enter to save</small>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
