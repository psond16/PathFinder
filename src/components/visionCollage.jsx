import { useState, useEffect, useRef } from "react";
import heic2any from "heic2any";

import caseStudyContent from "../assets/vision/case-study-content.jpg";
import contentInsta from "../assets/vision/content-insta.jpg";
import designWebsite from "../assets/vision/design-website.webp";
import github from "../assets/vision/github.jpg";
import guitarChords from "../assets/vision/guitar-chords.jpg";
import guitarRecord from "../assets/vision/guitar-record.jpg";
import learnGuitar from "../assets/vision/learn-guitar.jpg";
import postInsta from "../assets/vision/post-insta.jpg";
import recordVid from "../assets/vision/record-vid.webp";
import speakToYourself from "../assets/vision/speak-to-yourself.webp";
import speakingClub from "../assets/vision/speaking-club.jpg";
import quote1 from "../assets/vision/quote1.jpg";
import quote2 from "../assets/vision/quote2.jpg";
import quote3 from "../assets/vision/quote3.jpg";
import quote4 from "../assets/vision/quote4.jpg";
import quote5 from "../assets/vision/quote5.png";

const goalImages = {
  "Become confident": [speakToYourself, speakingClub],
  "Build portfolio": [caseStudyContent, designWebsite, github],
  "Learn guitar": [guitarChords, guitarRecord, learnGuitar],
  "Become an influencer": [contentInsta, postInsta, recordVid],
  default: [quote1, quote2, quote3, quote4, quote5],
};

export default function VisionCollage({ steps = [], reflections = {}, boardMood = "morning" }) {
  const [items, setItems] = useState([]);
  const fileInputs = useRef({});

  /* ---------------- INITIALIZE ITEMS ONCE PER GOAL ---------------- */
  useEffect(() => {
    setItems((prev) => {
      const existingIds = prev.map((i) => i.id);
      const additions = [];

      steps.forEach((step, idx) => {
        (goalImages[step.title] || goalImages.default).forEach((img, i) => {
          const id = `${step.id}-img-${i}`;
          if (!existingIds.includes(id)) {
            additions.push({
              id,
              type: "image",
              src: img,
              top: Math.random() * 65,
              left: Math.random() * 65,
              width: 120 + Math.random() * 140,
              rotate: -8 + Math.random() * 16,
              z: idx * 10 + i,
              goalId: step.id,
            });
          }
        });

        if (reflections[step.id]) {
          const rid = `${step.id}-reflection`;
          if (!existingIds.includes(rid)) {
            additions.push({
              id: rid,
              type: "reflection",
              text: reflections[step.id],
              top: 10 + Math.random() * 50,
              left: 10 + Math.random() * 50,
              width: 180,
              rotate: -5 + Math.random() * 10,
              z: idx * 10 + 10,
              goalId: step.id,
            });
          }
        }
      });

      return [...prev, ...additions];
    });
  }, [steps, reflections]);

  /* ---------------- DRAG LOGIC (UNCHANGED) ---------------- */
  const startDrag = (e, id) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const item = items.find((i) => i.id === id);
    const startTop = item.top;
    const startLeft = item.left;

    const onMove = (me) => {
      const dx = me.clientX - startX;
      const dy = me.clientY - startY;
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, top: startTop + dy / 5, left: startLeft + dx / 5, z: 99 } : it
        )
      );
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  /* ---------------- IMAGE REPLACEMENT ---------------- */
  const handleReplaceImage = async (id, file) => {
    let finalFile = file;
  
    // 🔁 Convert HEIC → JPEG if needed
    if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
      const convertedBlob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });
  
      finalFile = new File([convertedBlob], "converted.jpg", {
        type: "image/jpeg",
      });
    }
  
    const reader = new FileReader();
  
    reader.onload = () => {
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, src: reader.result } : it
        )
      );
    };
  
    reader.readAsDataURL(finalFile);
  };
  
  

  const unlockedGoals = steps
    .filter((s) => s.tasks.every((t) => t.completed))
    .map((s) => s.id);

  const moodStyles = {
    morning: "bg-yellow-50",
    evening: "bg-orange-50",
    night: "bg-gray-900",
  };

  return (
    <div className="w-full flex justify-center my-12">
      <div className={`relative w-full max-w-5xl h-[420px] border-4 rounded-xl shadow-xl overflow-hidden ${moodStyles[boardMood]}`}>
        {items.map((item) => {
          const isUnlocked = item.type === "reflection" || unlockedGoals.includes(item.goalId);

          return (
            <div
              key={item.id}
              onMouseDown={(e) => startDrag(e, item.id)}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: `${item.width}px`,
                transform: `rotate(${item.rotate}deg)`,
                zIndex: item.z,
              }}
            >
              {item.type === "image" ? (
                <>
                  <img
                    src={item.src}
                    alt=""
                    draggable={false}
                    onDoubleClick={() => isUnlocked && fileInputs.current[item.id]?.click()}
                    className={`rounded-md shadow-md hover:scale-[1.03] transition ${
                      !isUnlocked ? "grayscale" : ""
                    }`}
                  />

                  {/* Hidden upload input */}
                  {isUnlocked && (
                    <input
                      ref={(el) => (fileInputs.current[item.id] = el)}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && handleReplaceImage(item.id, e.target.files[0])}
                    />
                  )}

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center pointer-events-none">
                      🔒
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-yellow-200 p-2 rounded-md shadow-md text-xs">
                  {item.text}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
