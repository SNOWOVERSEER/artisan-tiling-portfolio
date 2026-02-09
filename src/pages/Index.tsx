import Navbar from "@/components/layout/Navbar";
import SectionDivider from "@/components/layout/SectionDivider";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/*  Hero (dark 5%) → About (light 10%)  */}
      <SectionDivider fromDark toDark={false} />
      <AboutSection />
      {/*  About (light 10%) → Services (dark 5%)  */}
      <SectionDivider fromDark={false} toDark decoration="diamond" />
      <ServicesSection />
      {/*  Services (dark 5%) → Expertise (light 10%)  */}
      <SectionDivider fromDark toDark={false} decoration="dots" />
      <ExpertiseSection />
      {/*  Expertise (light 10%) → Portfolio (light 10%)  */}
      <SectionDivider fromDark={false} toDark={false} decoration="diamond" />
      <PortfolioSection />
      {/*  Portfolio (light 10%) → Testimonials (dark 5%)  */}
      <SectionDivider fromDark={false} toDark decoration="dots" />
      <TestimonialsSection />
      {/*  Testimonials (dark 5%) → Contact (light 10%)  */}
      <SectionDivider fromDark toDark={false} decoration="diamond" />
      <ContactSection />
      {/*  Contact (light 10%) → Footer (dark 5%)  */}
      <SectionDivider fromDark={false} toDark decoration="dots" />
      <Footer />
    </div>
  );
}
