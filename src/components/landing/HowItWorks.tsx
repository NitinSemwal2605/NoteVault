"use client";

import { useRef } from "react";
import { FileText, CalendarClock, BellRing } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Capture",
    desc: "Add your notes, code snippets, or ideas in seconds.",
    emoji: "✏️",
  },
  {
    num: "02",
    icon: CalendarClock,
    title: "Schedule",
    desc: "NotesVaults calculates your optimal review intervals automatically.",
    emoji: "📅",
  },
  {
    num: "03",
    icon: BellRing,
    title: "Recall",
    desc: "Get notified at the right time and reinforce your memory.",
    emoji: "🔔",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".step-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: -60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-28 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-3 font-medium">
            How It Works
          </p>
          <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
            Three simple steps
          </h2>
          <p className="text-[#737373] text-base max-w-md mx-auto">
            From capture to recall — in seconds, not hours.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-0 md:gap-0 relative max-w-4xl mx-auto">
          {/* Dashed connector — positioned between icon boxes, behind them */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] z-0">
            <div className="dashed-line-h w-full" />
          </div>

          {steps.map((step, i) => (
            <div key={i} className="step-item relative text-center px-4 py-6 md:py-0 z-10">
              {/* Large faint step number */}
              <span className="block font-[var(--font-plus-jakarta)] text-[64px] font-extrabold text-[#1A1A1A] opacity-[0.04] leading-none select-none pointer-events-none">
                {step.num}
              </span>

              {/* Icon box — sits on top of the dashed line */}
              <div className="relative z-10 w-14 h-14 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center mx-auto -mt-6 mb-5 card-shadow">
                <span className="text-xl">{step.emoji}</span>
              </div>

              <h3 className="font-[var(--font-plus-jakarta)] font-bold text-lg text-[#1A1A1A] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#737373] max-w-[240px] mx-auto leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
