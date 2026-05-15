import Reveal from "@/components/landing/Reveal";
import { closingCtaContent } from "@/lib/landing-data";

export default function ClosingCTA() {
  return (
    <section id="close">
      <div className="close-orb" />
      <div className="mx-xs close-inner">
        <Reveal>
          <h2 className="close-h">
            {closingCtaContent.headingLead}
            <br />
            <em>{closingCtaContent.headingAccent}</em>
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="close-sub">{closingCtaContent.paragraph}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="close-cta-wrap">
            <a href="#offer" className="btn-primary" style={{ fontSize: 18, padding: "20px 40px" }}>
              Start My BioScan →
            </a>
            <div className="close-proof">
              {closingCtaContent.proofItems.map((item) => (
                <span key={item} className="close-proof-item">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
