import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Integrations"],
  Resources: ["Blog", "Documentation", "Help Center", "API"],
  Company: ["About", "Careers", "Privacy", "Terms"],
  Connect: ["Twitter", "GitHub", "Discord", "Email"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-10">
          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <a
              href="/"
              className="flex items-center gap-2.5 font-[var(--font-plus-jakarta)] text-lg font-extrabold text-[#1A1A1A] mb-3 tracking-tight"
            >
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="NotesVaults Logo"
                  fill
                  className="object-contain mix-blend-multiply"
                />
              </div>
              NotesVaults
            </a>
            <p className="text-sm text-[#A3A3A3] leading-relaxed">
              Remember everything.
              <br />
              Forget nothing.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-[var(--font-plus-jakarta)] font-bold text-xs uppercase tracking-[0.15em] text-[#1A1A1A] mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#A3A3A3] hover:text-[#1A1A1A] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-[#E5E5E5]" />

        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
          <p className="text-xs text-[#A3A3A3]">
            © {new Date().getFullYear()} NotesVaults. All rights reserved.
          </p>
          <p className="text-xs text-[#A3A3A3]">
            Made with 🧠 for lifelong learners
          </p>
        </div>
      </div>
    </footer>
  );
}
