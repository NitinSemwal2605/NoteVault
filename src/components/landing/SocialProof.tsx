export default function SocialProof() {
  const logos = ["MIT", "Stanford", "Google", "Notion", "Stripe", "Figma", "Vercel", "Linear"];
  const doubled = [...logos, ...logos];

  return (
    <section className="py-8 border-y border-[#E5E5E5] bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-[#A3A3A3] mb-5 font-medium">
          Trusted by learners at
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee w-max">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="mx-10 sm:mx-14 text-base sm:text-lg font-bold text-[#1A1A1A] opacity-20 select-none font-[var(--font-plus-jakarta)] whitespace-nowrap tracking-wide"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
