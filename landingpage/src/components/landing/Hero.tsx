"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

/* Thought-bubbles / task items that float around the illustration */
const bubbles = [
  { text: "📝 Finish essay draft", x: "left-[0%]", y: "top-[5%]", delay: 0.6 },
  { text: "🎸 Guitar practice", x: "right-[-5%]", y: "top-[15%]", delay: 0.8 },
  { text: "🧪 Chemistry formulas", x: "left-[-18%]", y: "top-[40%]", delay: 1.0 },
  { text: "🇪🇸 Spanish vocab", x: "right-[-18%]", y: "top-[50%]", delay: 1.2 },
  { text: "📸 Edit photos", x: "left-[5%]", y: "top-[75%]", delay: 1.4 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* Text reveals */
      tl.fromTo(".hero-tag", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(".hero-h1 > span", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 }, "-=0.2")
        .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".hero-cta-row > *", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, "-=0.2");

      /* Girl illustration */
      tl.fromTo(".hero-girl", 
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 
        "-=0.6"
      );

      /* Bubbles pop in */
      tl.fromTo(".bubble-item", 
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }, 
        "-=0.4"
      );

      /* Continuous gentle float on bubbles */
      gsap.utils.toArray<HTMLElement>(".bubble-item").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -8 : 8,
          duration: 2.5 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative pt-[100px] pb-10 overflow-hidden bg-[#FFFFFF]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center min-h-[calc(100vh-120px)] gap-12 lg:gap-8">
          {/* ── Left: copy ── */}
          <div className="flex flex-col justify-center py-12 lg:py-20 z-10 relative">
            {/* Tag */}
            <div className="hero-tag mb-6">
              <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] bg-[#F5F5F5] px-3 py-1.5 rounded-full border border-[#E5E5E5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] inline-block animate-pulse" />
                Smart memory engine
              </span>
            </div>

            <h1 className="hero-h1 font-[var(--font-plus-jakarta)] text-[52px] sm:text-[68px] lg:text-[80px] font-extrabold leading-[1.05] tracking-tight text-[#1A1A1A] mb-6">
              <span className="block">Remember</span>
              <span className="block">
                every<span className="inline-block relative ml-1 sm:ml-2 px-3 sm:px-5 py-0 sm:py-1 bg-[#1A1A1A] text-white rounded-2xl transform -rotate-2 shadow-[6px_6px_0_#E5E5E5] align-baseline pb-1">thing.</span>
              </span>
            </h1>

            {/* Sub — one short line */}
            <p className="hero-sub text-lg sm:text-xl text-[#525252] max-w-[460px] mb-8 leading-relaxed font-medium">
              Your notes resurface right when you need them. Built for everyone who wants to learn and never forget.
            </p>

            {/* CTAs */}
            <div className="hero-cta-row flex flex-wrap items-center gap-3">
              <a
                href="/waitlist"
                className="inline-flex items-center justify-center rounded-full bg-[#1A1A1A] text-white text-[15px] px-7 h-12 hover:bg-[#333] transition-all duration-200 font-bold shadow-[3px_3px_0_rgba(26,26,26,1)] hover:shadow-[5px_5px_0_rgba(26,26,26,1)] hover:-translate-y-0.5"
              >
                Try it free
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] text-[15px] px-7 h-12 hover:bg-[#F5F5F5] transition-all duration-200 font-bold shadow-[3px_3px_0_rgba(26,26,26,1)] hover:shadow-[5px_5px_0_rgba(26,26,26,1)] hover:-translate-y-0.5"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* ── Right: illustration + floating bubbles ── */}
          <div className="relative self-end lg:self-center flex items-center justify-center h-[500px] sm:h-[600px] lg:h-[700px] w-full max-w-[500px] mx-auto">
            {/* Floating task bubbles */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {bubbles.map((b, i) => (
                <div
                  key={i}
                  className={`bubble-item absolute ${b.x} ${b.y} pointer-events-auto`}
                >
                  <div className="bg-white rounded-xl border-2 border-[#1A1A1A] px-4 py-2.5 text-[14px] text-[#1A1A1A] font-bold shadow-[4px_4px_0_rgba(26,26,26,1)] whitespace-nowrap select-none hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(26,26,26,1)] transition-all duration-200 cursor-default">
                    {b.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Team illustration */}
            <div className="hero-girl relative z-10 w-[280px] sm:w-[340px] lg:w-[420px] pb-10">
              <Image
                src="/team_tasks_illustration.png"
                alt="A stylish young man and woman planning their tasks together"
                width={800}
                height={1000}
                className="w-full h-auto object-contain filter drop-shadow-sm mix-blend-multiply"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dashed background lines */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
         <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent dashed-line-v" />
         <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-transparent via-[#E5E5E5] to-transparent dashed-line-v" />
      </div>
      
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E5E5E5]" />
    </section>
  );
}
