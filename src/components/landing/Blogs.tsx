"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const blogs = [
  {
    title: "The Forgetting Curve: Why you lose 70% of what you learn",
    excerpt: "Discover the science behind memory decay and how spaced repetition can permanently halt it.",
    date: "Apr 12, 2026",
    category: "Science",
    readTime: "5 min read"
  },
  {
    title: "How building a 'Second Brain' reduces cognitive overload",
    excerpt: "Stop trying to hold everything in your head. Learn how offloading tasks to NotesVaults frees up mental RAM.",
    date: "Apr 05, 2026",
    category: "Productivity",
    readTime: "4 min read"
  },
  {
    title: "Active Recall vs. Passive Reading: A definitive guide",
    excerpt: "Why re-reading your notes is a waste of time, and what you should be doing instead to actually remember.",
    date: "Mar 28, 2026",
    category: "Study Methods",
    readTime: "6 min read"
  }
];

export default function Blogs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".blog-card", 
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
    <section ref={sectionRef} id="blog" className="py-20 md:py-28 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-3 font-medium">
              Resources
            </p>
            <h2 className="font-[var(--font-plus-jakarta)] text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] tracking-tight">
              Latest from our blog
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1A1A] hover:text-[#525252] transition-colors group">
            View all articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {blogs.map((blog, i) => (
            <div key={i} className="blog-card opacity-0 group flex flex-col cursor-pointer">
              <div className="rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] aspect-[4/3] mb-5 overflow-hidden relative transition-colors duration-300 group-hover:bg-[#F5F5F5]">
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <span className="text-6xl font-[var(--font-plus-jakarta)] font-extrabold text-[#1A1A1A]">{i + 1}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] uppercase tracking-[0.1em] font-semibold bg-[#F5F5F5] text-[#1A1A1A] px-2 py-0.5 rounded-md border border-[#E5E5E5]">
                  {blog.category}
                </span>
                <span className="text-xs text-[#A3A3A3] font-medium">{blog.readTime}</span>
              </div>
              <h3 className="font-[var(--font-plus-jakarta)] font-bold text-lg text-[#1A1A1A] mb-2 leading-snug group-hover:underline underline-offset-2">
                {blog.title}
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed mb-4 flex-grow">
                {blog.excerpt}
              </p>
              <div className="text-xs text-[#A3A3A3] font-medium">
                {blog.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
