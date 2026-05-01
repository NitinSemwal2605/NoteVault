"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    desc: "For anyone getting started",
    popular: false,
    features: [
      "Unlimited notes",
      "50 recalls/day",
      "Web only",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    period: "/mo",
    desc: "For serious learners",
    popular: true,
    features: [
      "Unlimited recalls",
      "AI summaries",
      "Mobile app (coming)",
      "Priority support",
      "Advanced insights",
    ],
  },
  {
    name: "Team",
    price: "$19",
    period: "/mo",
    desc: "For teams and organizations",
    popular: false,
    features: [
      "Everything in Pro",
      "Team spaces",
      "Analytics dashboard",
      "Admin controls",
      "SSO integration",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".pricing-card", 
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
    <section ref={sectionRef} id="pricing" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-3 font-medium">
            Pricing
          </p>
          <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-[#737373] text-base max-w-md mx-auto">
            Start free. Upgrade when you need more power.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`pricing-card opacity-0 relative rounded-xl bg-white p-6 transition-all duration-200 card-shadow card-shadow-hover ${
                tier.popular
                  ? "border-2 border-[#1A1A1A] ring-1 ring-[#1A1A1A]/5"
                  : "border border-[#E5E5E5]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-0.5 rounded-md text-[10px] uppercase tracking-[0.1em] font-bold bg-[#1A1A1A] text-white">
                  Most Popular
                </span>
              )}

              <h3 className="font-[var(--font-plus-jakarta)] font-bold text-lg text-[#1A1A1A] mb-1">
                {tier.name}
              </h3>
              <p className="text-xs text-[#A3A3A3] mb-5">{tier.desc}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-[var(--font-plus-jakarta)] text-4xl font-extrabold text-[#1A1A1A]">
                  {tier.price}
                </span>
                <span className="text-sm text-[#A3A3A3]">{tier.period}</span>
              </div>

              <Button
                className={`w-full rounded-lg h-10 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  tier.popular
                    ? "bg-[#1A1A1A] text-white hover:bg-[#333]"
                    : "bg-[#F5F5F5] text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#EAEAEA]"
                }`}
                aria-label={`Get started with ${tier.name}`}
              >
                Get Started
              </Button>

              <ul className="mt-6 space-y-2.5">
                {tier.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 text-sm text-[#737373]"
                  >
                    <Check size={14} className="text-[#1A1A1A] shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
