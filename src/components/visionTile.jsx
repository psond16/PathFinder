export default function VisionTile({ step, locked, onClick }) {
    const imageUrl = `https://via.placeholder.com/300x200.png?text=${encodeURIComponent(
      step.tasks[0].visionPrompt
    )}`;
  
    return (
      <div
        className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-500 ${
          locked ? "grayscale blur-[1px]" : "grayscale-0"
        }`}
        onClick={locked ? undefined : onClick}
      >
        <img
          src={imageUrl}
          alt={step.title}
          className="w-full h-48 object-cover transition-all duration-500"
        />
  
        <div className="p-3 bg-white">
          <h3 className="font-semibold">{step.title}</h3>
          <p className="text-sm text-gray-500">{step.duration}</p>
          {step.completed && <p className="text-green-500 mt-1">✓ Completed</p>}
        </div>
  
        {locked && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-3xl">🔒</span>
          </div>
        )}
      </div>
    );
  }
  