"use client";

import { useRef } from "react";
import { Bot, Smartphone, Globe, Brain } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const items = [
  {
    icon: Bot,
    emoji: "🤖",
    title: "AI Summaries",
    desc: "Auto-generate concise summaries of your notes.",
    status: "Coming Soon",
    statusStyle: "bg-[#1A1A1A] text-white",
    cardBorder: "border-[#E5E5E5]",
  },
  {
    icon: Smartphone,
    emoji: "📱",
    title: "Mobile App",
    desc: "Learn on the go with native iOS and Android apps.",
    status: "In Progress",
    statusStyle: "bg-[#F5F5F5] text-[#1A1A1A] border border-[#E5E5E5]",
    cardBorder: "border-[#E5E5E5]",
  },
  {
    icon: Globe,
    emoji: "🔗",
    title: "Browser Extension",
    desc: "Capture notes from any webpage instantly.",
    status: "Planned",
    statusStyle: "bg-[#FAFAFA] text-[#A3A3A3] border border-[#E5E5E5]",
    cardBorder: "border-dashed border-[#D4D4D4]",
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "Adaptive Recall AI",
    desc: "ML-powered scheduling that learns your memory patterns.",
    status: "Planned",
    statusStyle: "bg-[#FAFAFA] text-[#A3A3A3] border border-[#E5E5E5]",
    cardBorder: "border-dashed border-[#D4D4D4]",
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".roadmap-card", 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-3 font-medium">
            Roadmap
          </p>
          <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-3 tracking-tight">
            What&apos;s coming next
          </h2>
          <p className="text-[#737373] text-base">
            We&apos;re just getting started.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className={`roadmap-card rounded-xl border ${item.cardBorder} bg-white p-5 transition-all duration-200 card-shadow card-shadow-hover opacity-0`}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-[var(--font-plus-jakarta)] font-bold text-[15px] text-[#1A1A1A]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#737373] leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] uppercase tracking-[0.1em] font-semibold ${item.statusStyle}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
