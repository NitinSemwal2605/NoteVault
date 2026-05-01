"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".cta-inner > *", 
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="cta-inner text-center max-w-2xl mx-auto">
          <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
            Start building your second brain — today.
          </h2>
          <a href="/waitlist">
            <Button
              className="mt-6 rounded-lg bg-white text-[#1A1A1A] text-sm px-8 h-12 hover:bg-[#F5F5F5] transition-all duration-200 font-semibold cursor-pointer"
              aria-label="Get Started Free"
            >
              Get Started Free →
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
