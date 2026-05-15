import { wellnessDisclaimerText } from "@/lib/landing-data";

export default function WellnessDisclaimer() {
  return (
    <div className="separator-bar">
      <p>
        <strong>The information above is educational only.</strong> {wellnessDisclaimerText}
      </p>
    </div>
  );
}
