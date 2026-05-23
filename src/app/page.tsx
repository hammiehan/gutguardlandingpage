import AuthWelcomeBanner from "@/components/auth/AuthWelcomeBanner";
import AuthCodeInterceptor from "@/components/auth/AuthCodeInterceptor";
import ClosingCTA from "@/components/landing/ClosingCTA";
import FloatingWhatsapp from "@/components/landing/FloatingWhatsapp";
import Footer from "@/components/landing/Footer";
import GuaranteeSection from "@/components/landing/GuaranteeSection";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import LegalFirewall from "@/components/landing/LegalFirewall";
import MarkersSection from "@/components/landing/MarkersSection";
import Navbar from "@/components/landing/Navbar";
import ProofStrip from "@/components/landing/ProofStrip";
import OfferSection from "@/components/landing/OfferSection";
import PatientVoices from "@/components/landing/PatientVoices";
import QualificationSection from "@/components/landing/QualificationSection";
import StickyCTA from "@/components/landing/StickyCTA";
import WellnessDisclaimer from "@/components/landing/WellnessDisclaimer";
import WhyInflammation from "@/components/landing/WhyInflammation";

export default function HomePage() {
  return (
    <>
      <AuthCodeInterceptor />
      <Navbar />
      <AuthWelcomeBanner />
      <main>
        <Hero />
        <ProofStrip />
        <WhyInflammation />
        <WellnessDisclaimer />
        <HowItWorks />
        <MarkersSection />
        <LegalFirewall />
        <OfferSection />
        <PatientVoices />
        <GuaranteeSection />
        <QualificationSection />
        <ClosingCTA />
        <Footer />
      </main>
      <StickyCTA />
      <FloatingWhatsapp />
    </>
  );
}
