"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const notes = [
  {
    title: "How to make the perfect omelette",
    tags: ["Cooking", "Breakfast"],
    streak: 5,
    status: "Review Today",
  },
  {
    title: "Guitar chord progressions — G, C, D",
    tags: ["Music", "Guitar"],
    streak: 12,
    status: "Mastered",
  },
  {
    title: "Spanish verbs: ser vs estar",
    tags: ["Language", "Spanish"],
    streak: 3,
    status: "Due Tomorrow",
  },
  {
    title: "Yoga breathing techniques",
    tags: ["Health", "Mindfulness"],
    streak: 8,
    status: "Review Today",
  },
  {
    title: "Photography composition rules",
    tags: ["Art", "Photography"],
    streak: 2,
    status: "New",
  },
];

export default function InteractiveDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(".demo-header",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      gsap.fromTo(".note-card-item",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".notes-grid",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    },
    { scope: sectionRef }
  );

  const handleGotIt = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    setFlipped(null);
    setToastMessage(`"${title}" marked as reviewed!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="demo-header text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-3 font-medium">
            Live Preview
          </p>
          <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
            Your notes, always at the right time
          </h2>
          <p className="text-[#737373] text-base max-w-lg mx-auto leading-relaxed">
            Click any card to flip it and test your recall — just like in the real app.
          </p>
        </div>

        {/* Interactive note cards */}
        <div className="notes-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto relative">
          {notes.map((note, i) => (
            <div
              key={i}
              className="note-card-item perspective-[800px] cursor-pointer"
              onClick={() => setFlipped(flipped === i ? null : i)}
            >
              <div
                className={`relative w-full transition-transform duration-500 preserve-3d ${
                  flipped === i ? "[transform:rotateY(180deg)]" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div
                  className="relative rounded-xl border border-[#E5E5E5] bg-white p-5 card-shadow hover:shadow-lg transition-shadow duration-200 backface-hidden h-full min-h-[180px] flex flex-col"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] uppercase tracking-[0.1em] font-semibold px-2 py-0.5 rounded-md ${
                        note.status === "Review Today"
                          ? "bg-[#1A1A1A] text-white"
                          : note.status === "Mastered"
                          ? "bg-[#F5F5F5] text-[#737373] border border-[#E5E5E5]"
                          : note.status === "New"
                          ? "bg-[#F5F5F5] text-[#1A1A1A] border border-[#E5E5E5]"
                          : "bg-[#FAFAFA] text-[#A3A3A3] border border-[#E5E5E5]"
                      }`}
                    >
                      {note.status}
                    </span>
                    <span className="text-xs text-[#A3A3A3]">🔥 {note.streak}d</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-[var(--font-plus-jakarta)] font-semibold text-[15px] text-[#1A1A1A] mb-3 leading-snug flex-grow">
                    {note.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAFAFA] text-[#737373] border border-[#E5E5E5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tap hint */}
                  <p className="text-[10px] text-[#D4D4D4] mt-3 text-center">tap to flip →</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 rounded-xl border border-[#1A1A1A] bg-[#1A1A1A] p-5 text-white flex flex-col items-center justify-center backface-hidden [transform:rotateY(180deg)] min-h-[180px]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <p className="text-sm text-white/60 mb-3 text-center">Do you remember this?</p>
                  <p className="font-[var(--font-plus-jakarta)] font-bold text-base text-center mb-5 leading-snug">
                    {note.title}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      className="bg-white text-[#1A1A1A] text-xs h-8 px-4 rounded-lg hover:bg-[#F5F5F5] font-medium cursor-pointer transition-colors"
                      onClick={(e) => handleGotIt(e, note.title)}
                    >
                      ✓ Got it
                    </Button>
                    <Button
                      className="bg-transparent border border-white/30 text-white text-xs h-8 px-4 rounded-lg hover:bg-white/10 font-medium cursor-pointer transition-colors"
                      onClick={(e) => { e.stopPropagation(); setFlipped(null); }}
                    >
                      ↩ Again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* New Add Button */}
          <div className="note-card-item flex rounded-xl border-2 border-dashed border-[#E5E5E5] bg-[#FAFAFA] p-5 items-center justify-center min-h-[180px] hover:border-[#D4D4D4] hover:bg-[#F5F5F5] transition-all cursor-pointer group">
            <div className="text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                <Plus size={20} className="text-[#1A1A1A]" />
              </div>
              <p className="text-[13px] font-semibold text-[#1A1A1A]">Add more notes</p>
            </div>
          </div>

          {/* Toast Notification */}
          <div 
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-5 py-3 rounded-xl shadow-lg border border-[#333] text-sm font-medium transition-all duration-300 z-50 flex items-center gap-2 ${
              toastMessage ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#333] flex items-center justify-center">
              <span className="text-[10px]">🔥</span>
            </div>
            {toastMessage}
          </div>
        </div>
      </div>
    </section>
  );
}
