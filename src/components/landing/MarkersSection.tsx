import Reveal from "@/components/landing/Reveal";
import { markersSectionContent } from "@/lib/landing-data";

export default function MarkersSection() {
  return (
    <section id="markers">
      <div className="mx">
        <Reveal>
          <div className="section-tag" style={{ color: "var(--bl)" }}>
            {markersSectionContent.tag}
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="section-h" style={{ color: "var(--d1)" }}>
            Eight markers.
            <br />
            One direction.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="section-body" style={{ maxWidth: 520, marginBottom: 0 }}>
            {markersSectionContent.paragraph}
          </p>
        </Reveal>

        <div className="markers-grid">
          {markersSectionContent.markers.map((marker, index) => (
            <Reveal key={marker.shortName} delay={0.08 + (index % 4) * 0.08}>
              <div className="mk">
                <div className="mk-name">{marker.shortName}</div>
                <div className="mk-full">{marker.fullName}</div>
                <div className="mk-role">{marker.role}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="formula-strip">
            {markersSectionContent.formulaCards.map((item) => (
              <div key={item.label} className="formula-item">
                <div className="formula-num">{item.label}</div>
                <div className="formula-name">{item.name}</div>
                <div className="formula-ing">{item.body}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
