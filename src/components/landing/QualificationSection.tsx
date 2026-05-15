import Reveal from "@/components/landing/Reveal";
import { qualificationContent } from "@/lib/landing-data";

export default function QualificationSection() {
  return (
    <section id="qualify">
      <div className="mx">
        <Reveal>
          <div className="section-tag" style={{ color: "rgba(255,255,255,.35)" }}>
            {qualificationContent.tag}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-h" style={{ color: "#fff" }}>
            This is not for everyone.
            <br />
            We mean that.
          </h2>
        </Reveal>
        <div className="qualify-grid">
          <Reveal delay={0.08}>
            <div className="qual-card qual-yes">
              <div className="qual-head">{qualificationContent.yesTitle}</div>
              {qualificationContent.yesItems.map((item) => (
                <div key={item} className="qual-item">
                  <div className="qual-dot">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="qual-card qual-no">
              <div className="qual-head">{qualificationContent.noTitle}</div>
              {qualificationContent.noItems.map((item) => (
                <div key={item} className="qual-item">
                  <div className="qual-dot">✗</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
