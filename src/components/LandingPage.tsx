import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { ValuePropositions } from "./ValuePropositions";
import { SocialProof } from "./SocialProof";
import { HowItWorks } from "./HowItWorks";
import { PricingSection } from "./PricingSection";
import { NewsletterSection } from "./NewsletterSection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <ValuePropositions />
      <SocialProof />
      <HowItWorks />
      <PricingSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}