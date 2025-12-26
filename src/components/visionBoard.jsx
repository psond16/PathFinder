import VisionTile from "./VisionTile";

const quoteImages = [
  "https://via.placeholder.com/300x200.png?text=Believe+in+Yourself",
  "https://via.placeholder.com/300x200.png?text=Dream+Big",
  "https://via.placeholder.com/300x200.png?text=Keep+Going",
];

function mergeStepsAndQuotes(steps) {
  const merged = [];
  steps.forEach((step, index) => {
    merged.push({ ...step, type: "step" });

    // Add a quote every 2 steps
    if (index % 2 === 1) {
      const quote =
        quoteImages[Math.floor(Math.random() * quoteImages.length)];
      merged.push({ type: "quote", image: quote, id: `q-${index}` });
    }
  });
  return merged;
}

export default function VisionBoard({ steps, onTileClick }) {
  const items = mergeStepsAndQuotes(steps);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mx-auto">
      {items.map((item) =>
        item.type === "quote" ? (
          <img
            key={item.id}
            src={item.image}
            alt="inspiration"
            className="w-full h-48 object-cover rounded-lg shadow-lg"
          />
        ) : (
          <VisionTile
            key={item.id}
            step={item}
            locked={!item.unlocked}
            onClick={() => onTileClick(item.id)}
          />
        )
      )}
    </div>
  );
}
