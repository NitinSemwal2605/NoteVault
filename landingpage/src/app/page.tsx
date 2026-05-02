import Navigation from "@/components/landing/Navigation";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import InteractiveDemo from "@/components/landing/InteractiveDemo";
import Roadmap from "@/components/landing/Roadmap";
import Pricing from "@/components/landing/Pricing";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <InteractiveDemo />
      <Roadmap />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}
