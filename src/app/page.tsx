import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import BlogPreviewSection from "@/components/home/blog-preview-section";
import LeadMagnetSection from "@/components/home/lead-magnet-section";
import CTASection from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <BlogPreviewSection />
        <LeadMagnetSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}