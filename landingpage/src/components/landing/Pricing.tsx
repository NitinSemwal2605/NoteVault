"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type BillingPeriod = "monthly" | "yearly";

const tiers = [
  {
    name: "Free",
    price: {
      monthly: "₹0",
      yearly: "₹0",
    },
    period: "/mo",
    desc: "For tech people getting started",
    popular: false,
    features: [
      "Up to 50 notes",
      "Basic recall engine (fixed intervals)",
      "Web access",
      "No exports",
    ],
  },
  {
    name: "Pro",
    price: {
      monthly: "₹199",
      yearly: "₹1499",
    },
    period: "/mo",
    desc: "For power users & devs",
    popular: true,
    features: [
      "Unlimited notes",
      "Adaptive recall (confidence intervals)",
      "Mobile app access",
      "Topic Vaults",
      "Weekly email digest",
      "Note export (PDF/Markdown)",
    ],
  },
  {
    name: "Team",
    price: {
      monthly: "₹499",
      yearly: "₹2999",
    },
    period: "/mo",
    desc: "For study groups & dev teams",
    popular: false,
    features: [
      "Everything in Pro",
      "Shared vaults",
      "Up to 5 members",
      "Priority team support",
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

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
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-3 font-medium">
            Pricing Strategy
          </p>
          <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4 tracking-tight">
            Built for those who value knowledge
          </h2>
          <p className="text-[#737373] text-base max-w-md mx-auto mb-8">
            Simple, transparent, and fair. No hidden costs.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-[#1A1A1A]" : "text-[#A3A3A3]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
              className="relative w-12 h-6 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] transition-colors duration-200 focus:outline-none"
              aria-label="Toggle billing period"
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-[#1A1A1A] transition-transform duration-200 ${
                  billingPeriod === "yearly" ? "translate-x-6" : ""
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${billingPeriod === "yearly" ? "text-[#1A1A1A]" : "text-[#A3A3A3]"}`}>
              Yearly
              <span className="bg-[#1A1A1A] text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                ~50% Off
              </span>
            </span>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`pricing-card opacity-0 relative rounded-2xl bg-white p-8 transition-all duration-300 card-shadow-hover flex flex-col ${
                tier.popular
                  ? "border-2 border-[#1A1A1A] ring-4 ring-[#1A1A1A]/5 scale-105 z-10"
                  : "border border-[#E5E5E5]"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.15em] font-black bg-[#1A1A1A] text-white">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <h3 className="font-[var(--font-plus-jakarta)] font-bold text-xl text-[#1A1A1A] mb-2">
                  {tier.name}
                </h3>
                <p className="text-sm text-[#737373] leading-relaxed">{tier.desc}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="font-[var(--font-plus-jakarta)] text-4xl font-extrabold text-[#1A1A1A]">
                  {tier.price[billingPeriod]}
                </span>
                <span className="text-sm text-[#A3A3A3] font-medium">
                  {billingPeriod === "monthly" ? "/month" : "/year"}
                </span>
              </div>

              <a href="/waitlist" className="w-full block mb-8">
                <Button
                  className={`w-full rounded-xl h-12 text-sm font-bold transition-all duration-300 cursor-pointer shadow-sm ${
                    tier.popular
                      ? "bg-[#1A1A1A] text-white hover:bg-[#333] hover:-translate-y-0.5"
                      : "bg-[#F5F5F5] text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#EAEAEA] hover:border-[#D4D4D4]"
                  }`}
                  aria-label={`Get started with ${tier.name}`}
                >
                  Get Started
                </Button>
              </a>

              <div className="mt-auto">
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#A3A3A3] font-bold mb-4">
                  What's included
                </p>
                <ul className="space-y-4">
                  {tier.features.map((feat, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-[#525252]"
                    >
                      <Check size={16} className="text-[#1A1A1A] shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
