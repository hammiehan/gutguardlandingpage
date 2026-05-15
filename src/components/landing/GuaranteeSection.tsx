import Reveal from "@/components/landing/Reveal";
import { guaranteeContent } from "@/lib/landing-data";

export default function GuaranteeSection() {
  return (
    <section id="guarantee">
      <div className="mx">
        <Reveal>
          <div className="guar-wrap">
            <div className="guar-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--grn)" strokeWidth="2" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h3 className="guar-h">{guaranteeContent.heading}</h3>
              <p className="guar-p">{guaranteeContent.paragraph}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
