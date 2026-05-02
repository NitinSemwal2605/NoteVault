import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import Blogs from "@/components/landing/Blogs";

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navigation />
      <div className="flex-grow pt-[80px]">
        <Blogs />
      </div>
      <Footer />
    </main>
  );
}
