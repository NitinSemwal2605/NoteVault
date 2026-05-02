"use client";

import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-[#E5E5E5] py-3 shadow-sm"
          : "bg-white py-5 border-b border-transparent"
      }`}
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="NotesVaults Home"
          >
            <div className="relative w-10 h-10 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="NotesVaults Logo"
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>
            <span className="font-[var(--font-plus-jakarta)] text-xl font-extrabold text-[#1A1A1A] tracking-tight">
              NotesVaults
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] text-[#525252] hover:text-[#1A1A1A] transition-colors duration-200 font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden sm:inline-flex text-[14px] text-[#525252] hover:text-[#1A1A1A] transition-colors duration-200 font-semibold"
            >
              Sign In
            </a>
            <a href="/waitlist">
              <Button
                className="rounded-full bg-[#1A1A1A] text-white text-[14px] px-6 h-[40px] hover:bg-[#333] transition-all duration-200 font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                aria-label="Get Started"
              >
                Get Started
              </Button>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors text-[#1A1A1A]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-[#F5F5F5] mt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-2 py-3 text-base text-[#1A1A1A] font-bold hover:bg-[#FAFAFA] rounded-lg"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-[#F5F5F5] flex flex-col gap-3">
              <a
                href="#"
                className="px-2 py-2 text-base text-[#525252] font-semibold"
              >
                Sign In
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
