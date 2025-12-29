import { useEffect } from "react";

const LETTER_TEMPLATES = [
  ({ boardName, reflection }) => `
Dear You,

You named this board "${boardName}" for a reason.
You began because ${reflection || "something inside you wanted change"}.

What you learned is this:
progress doesn’t announce itself —
it grows quietly, every time you showed up.

— Your Past Self
`,
  ({ boardName, reflection }) => `
"${boardName}" was never about perfection.

It started with ${reflection || "hope and uncertainty"}.
Along the way, you discovered that momentum
is built from small, uncelebrated moments.

Keep going.
You already are.

— A Version of You That Believed
`,
  ({ boardName, reflection }) => `
When you created "${boardName}",
you weren’t chasing results —
you were choosing direction.

${reflection || "That choice mattered more than you knew."}

This board is proof:
you kept choosing yourself.

— You, Still Becoming
`,
];

export function generatePseudoLetter({ boardName, reflection }) {
  const template = LETTER_TEMPLATES[Math.floor(Math.random() * LETTER_TEMPLATES.length)];
  return template({ boardName, reflection });
}

export default function PseudoLetterOverlay({ boardName, reflection, onClose }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const template = LETTER_TEMPLATES[Math.floor(Math.random() * LETTER_TEMPLATES.length)];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

      <div className="relative z-10 max-w-xl w-[90%] bg-[#fffaf3] text-[#2b2b2b] p-8 rounded-xl shadow-2xl font-serif whitespace-pre-line animate-fade-in">
        {template({ boardName, reflection })}

        <button
          onClick={onClose}
          className="mt-6 block ml-auto text-sm text-gray-600 hover:text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}
