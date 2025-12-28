export default function VisionTile({ step, onTaskToggle }) {
  const goalCompleted = step.tasks.every((task) => task.completed);

  return (
    <div
      className={`relative rounded-xl shadow-lg p-4 transition ${
        goalCompleted ? "bg-green-50 ring-2 ring-green-400" : "bg-white"
      }`}
    >
      {goalCompleted && (
        <div className="absolute top-2 right-2 text-green-600 text-xl">
          ✅
        </div>
      )}

      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{step.duration}</p>

      <ul className="space-y-2">
        {step.tasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onTaskToggle(step.id, task.id)}
              className="accent-green-600"
            />
            <span
              className={`text-sm ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-700"
              }`}
            >
              {task.visionPrompt}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
