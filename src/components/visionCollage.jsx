import { useMemo, useState } from "react";

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

const collageImages = [
    caseStudyContent,
    contentInsta,
    designWebsite,
    github,
    guitarChords,
    guitarRecord,
    learnGuitar,
    postInsta,
    recordVid,
    speakToYourself,
    speakingClub,
    quote1,
    quote2,
    quote3,
    quote4,
    quote5,
];

export default function VisionCollage() {
    const [items, setItems] = useState(() =>
        collageImages.map((img, i) => ({
            id: i,
            src: img,
            top: Math.random() * 65,
            left: Math.random() * 65,
            width: 120 + Math.random() * 140,
            rotate: -8 + Math.random() * 16,
            z: i,
            style: Math.random() > 0.5 ? "pin" : "tape",
        }))
    );

    const startDrag = (e, id) => {
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;

        const item = items.find((i) => i.id === id);
        const startTop = item.top;
        const startLeft = item.left;

        const onMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;

            setItems((prev) =>
                prev.map((it) =>
                    it.id === id
                        ? {
                            ...it,
                            top: startTop + dy / 5,
                            left: startLeft + dx / 5,
                            z: 99,
                        }
                        : it
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

    return (
        <div className="w-full flex justify-center my-12">
            <div className="relative w-full max-w-5xl h-[420px] bg-[#f7f4ef] border-4 border-neutral-300 rounded-xl shadow-xl overflow-hidden">
                {items.map((item) => (
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
                        {/* PIN */}
                        {item.style === "pin" && (
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                                <div className="w-3 h-3 bg-red-500 rounded-full shadow-md" />
                            </div>
                        )}

                        {/* TAPE */}
                        {item.style === "tape" && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-6deg] z-10">
                                <div className="w-16 h-4 bg-yellow-200 opacity-80 rounded-sm shadow-sm" />
                            </div>
                        )}

                        {/* IMAGE */}
                        <img
                            src={item.src}
                            alt="vision item"
                            draggable={false}
                            className="rounded-md shadow-md transition-transform duration-200 hover:scale-[1.03]"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
