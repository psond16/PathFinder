export default function VisionTile({ step, locked, onClick }) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 p-4 bg-white`}
      onClick={locked ? undefined : onClick}
    >
      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
      <p className="text-sm text-gray-500 mb-2">{step.duration}</p>

      <ul className="text-gray-700 list-disc list-inside">
        {step.tasks.map((task) => (
          <li key={task.id}>{task.visionPrompt}</li>
        ))}
      </ul>

      {locked && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          <span className="text-3xl">🔒</span>
        </div>
      )}
    </div>
  );
}
