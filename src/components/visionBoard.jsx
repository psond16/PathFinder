import VisionTile from "./VisionTile.jsx";

export default function VisionBoard({ steps, onTileClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <VisionTile
          key={step.id}
          step={step}
          locked={!step.unlocked}
          onClick={() => onTileClick(step.id)}
        />
      ))}
    </div>
  );
}
