import { legalFirewallText } from "@/lib/landing-data";

export default function LegalFirewall() {
  return (
    <div className="separator-bar compact">
      <p>
        <strong>Important:</strong> {legalFirewallText}
      </p>
    </div>
  );
}
