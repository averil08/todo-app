import HeroSection from "@/components/landing/hero-section";
import Features from "@/components/landing/features-5";
import ContentSection from "@/components/landing/content-3";
import FooterSection from "@/components/landing/footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ContentSection/>
      <Features />
      <FooterSection />
    </div>
  );
}
