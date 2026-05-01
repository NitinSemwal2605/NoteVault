"use client";

import { useRef } from "react";
import { Brain, RefreshCw, Timer, Target, BarChart3, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    icon: Brain,
    title: "Smart Capture",
    desc: "Save notes, snippets, and ideas with intelligent auto-tagging.",
  },
  {
    icon: RefreshCw,
    title: "Intelligent Recall",
    desc: "Notes resurface at the perfect interval using adaptive scheduling.",
    core: true,
  },
  {
    icon: Timer,
    title: "Revision Engine",
    desc: "Reminders at 1, 3, 7, 14-day intervals for maximum retention.",
  },
  {
    icon: Target,
    title: "Context Suggestions",
    desc: "Relevant notes surface while you study or prep for interviews.",
  },
  {
    icon: BarChart3,
    title: "Learning Insights",
    desc: "Track retention scores, streaks, and topic mastery visually.",
  },
  {
    icon: Zap,
    title: "Minimal UI",
    desc: "Distraction-free. Built for focus and speed.",
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".feature-card", 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-3 font-medium">
            Features
          </p>
          <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
            Everything you need to learn smarter
          </h2>
          <p className="text-[#737373] text-base max-w-lg mx-auto leading-relaxed">
            Powerful features designed to maximize your retention and make learning effortless — for everyone.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`feature-card opacity-0 group relative rounded-xl border bg-white p-6 transition-all duration-200 cursor-default card-shadow card-shadow-hover ${
                  f.core
                    ? "border-[#1A1A1A] ring-1 ring-[#1A1A1A]/10"
                    : "border-[#E5E5E5] hover:border-[#D4D4D4]"
                }`}
              >
                {/* Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <Icon size={24} className="text-[#1A1A1A] transition-colors duration-200" />
                </div>

                <h3 className="font-[var(--font-plus-jakarta)] font-bold text-[#1A1A1A] text-[15px] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">
                  {f.desc}
                </p>

                {f.core && (
                  <span className="inline-block mt-3 text-[10px] uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] bg-[#F5F5F5] px-2.5 py-1 rounded-md border border-[#E5E5E5]">
                    Core Feature
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
