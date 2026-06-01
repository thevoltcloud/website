import HeroSection from "@/components/hero-section";
import LogoCloud from "@/components/logo-cloud";
import BentoOne from "@/components/bento-1";
import StatsSection from "@/components/stats-4";
import IntegrationsSection from "@/components/integrations-1";
import Pricing from "@/components/pricing";
import TestimonialsSection from "@/components/testimonials-4";
import TeamSection from "@/components/team-1";
import FAQs from "@/components/faqs-2";
import CallToAction from "@/components/call-to-action";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <BentoOne />
      <StatsSection />
      <IntegrationsSection />
      <Pricing />
      <TestimonialsSection />
      <TeamSection />
      <FAQs />
      <CallToAction />
    </>
  );
}
