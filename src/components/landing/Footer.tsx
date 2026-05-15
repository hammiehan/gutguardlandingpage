import { footerContent } from "@/lib/landing-data";

export default function Footer() {
  return (
    <footer>
      <div className="mx">
        <div className="ft-top">
          <div className="ft-logo">
            Gut<em>Guard</em>
          </div>
          <div className="ft-links">
            {footerContent.links.map((link) => (
              <a key={link.label} href={link.href} className="ft-link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="ft-disc">
          <strong>{footerContent.disclaimerLead}</strong>
          {footerContent.disclaimer}
        </div>
      </div>
    </footer>
  );
}
