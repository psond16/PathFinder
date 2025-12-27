import VisionTile from "./visionTile.jsx";

export default function VisionBoard({ steps, onTaskToggle }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {steps.map((step) => {
        const isUnlocked = step.tasks.every((task) => task.completed);

        return (
          <VisionTile
            key={step.id}
            step={step}
            locked={!isUnlocked}
            onTaskToggle={onTaskToggle}
          />
        );
      })}
    </div>
  );
}
