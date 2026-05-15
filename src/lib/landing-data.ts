export type LandingTheme = {
  colors: {
    bg: string;
    surface1: string;
    surface2: string;
    surface3: string;
    blend1: string;
    blend2: string;
    light1: string;
    light2: string;
    light3: string;
    green: string;
    gold: string;
    teal: string;
    red: string;
  };
  motion: {
    ease: string;
    spring: string;
  };
};

export type HeroState = "before" | "after";

export type HeroChip = {
  label: string;
  tone: "hi" | "mid" | "ok";
};

export type HeroRingState = {
  score: number;
  progressDegrees: number;
  verdict: string;
  color: string;
  glow: string;
  chips: HeroChip[];
};

export type StatItem = {
  value: string;
  suffix: string;
  labelLines: string[];
  color: string;
};

export type DiseaseCard = {
  label: string;
  icon: string;
  note: string;
};

export type StepItem = {
  number: string;
  title: string;
  body: string;
  badge: string;
  badgeTone: "blue" | "gold" | "green";
  icon: "file" | "user" | "pulse";
};

export type MarkerCard = {
  shortName: string;
  fullName: string;
  role: string;
};

export type FormulaCard = {
  label: string;
  name: string;
  body: string;
};

export type OfferCard = {
  name: string;
  capsuleSummary: string;
  pricePerCapsule: string;
  total: string;
  review: string;
  href: string;
  ctaLabel: string;
  featured?: boolean;
};

export type DoctorStat = {
  value: string;
  label: string;
  color: string;
  count?: number;
};

export type PatientMessage = {
  direction: "incoming" | "outgoing";
  text: string;
  time?: string;
};

export type PatientThread = {
  initials: string;
  name: string;
  meta: string;
  avatarColor: string;
  messages: PatientMessage[];
};

export type FooterLink = {
  label: string;
  href: string;
};

export const landingTheme: LandingTheme = {
  colors: {
    bg: "var(--bg)",
    surface1: "var(--s1)",
    surface2: "var(--s2)",
    surface3: "var(--s3)",
    blend1: "var(--bl)",
    blend2: "var(--bl2)",
    light1: "var(--lt)",
    light2: "var(--lt2)",
    light3: "var(--lt3)",
    green: "var(--grn)",
    gold: "var(--gld)",
    teal: "var(--ter)",
    red: "var(--red)",
  },
  motion: {
    ease: "var(--ease)",
    spring: "var(--spring)",
  },
};

export const heroContent = {
  tag: "For Filipinos 35–55",
  titleLead: "Your doctor measures\ndisease.",
  titleAccent: "Nobody measures\nwhat comes before it.",
  paragraphs: [
    "That something is chronic inflammation — the documented upstream driver across virtually every major disease category. Your inflammatory load is measurable. It has a direction.",
    "And once you can see the direction, you can change it. GutGuard BioScan puts a number on your inflammation. Your enrolled independent physician monitors your GLIS wellness score. A matched protocol moves it. The direction is now yours.",
  ],
  trustItems: ["FDA-PH Registered", "Physician-reviewed", "90-day guarantee"],
};

export const heroRingStates: Record<HeroState, HeroRingState> = {
  before: {
    score: 74,
    progressDegrees: 266,
    verdict: "⚠ Elevated Inflammation",
    color: "#D42020",
    glow: "rgba(212,32,32,.5)",
    chips: [
      { label: "hs-CRP ↑", tone: "hi" },
      { label: "NLR ↑", tone: "hi" },
      { label: "Glucose ↑", tone: "mid" },
      { label: "Ferritin ↑", tone: "mid" },
      { label: "HDL ✓", tone: "ok" },
      { label: "ALT ✓", tone: "ok" },
    ],
  },
  after: {
    score: 31,
    progressDegrees: 111,
    verdict: "✓ Inflammation Controlled",
    color: "#5CB882",
    glow: "rgba(92,184,130,.45)",
    chips: [
      { label: "hs-CRP ✓", tone: "ok" },
      { label: "NLR ✓", tone: "ok" },
      { label: "Glucose ✓", tone: "ok" },
      { label: "Ferritin ✓", tone: "ok" },
      { label: "HDL ✓", tone: "ok" },
      { label: "ALT ✓", tone: "ok" },
    ],
  },
};

export const proofStats: StatItem[] = [
  {
    value: "127",
    suffix: "",
    labelLines: ["Patients enrolled*", "& tracked"],
    color: "var(--grn)",
  },
  {
    value: "28",
    suffix: "pts",
    labelLines: ["Avg GLIS drop*", "per 90-day cycle"],
    color: "var(--bl)",
  },
  {
    value: "48",
    suffix: "hrs",
    labelLines: ["Physician review", "turnaround"],
    color: "var(--gld)",
  },
  {
    value: "3",
    suffix: "tx",
    labelLines: ["Physician re-scans", "over 90 days"],
    color: "var(--ter)",
  },
];

export const whyInflammationContent = {
  tag: "Published Research",
  heading:
    "Inflammation is the documented upstream driver in virtually every major disease.",
  paragraph:
    "Peer-reviewed literature links chronic low-grade inflammation to all of the following. You don't need to develop any of them. You need to know your direction before one of them becomes your diagnosis.",
  diseases: [
    { label: "Cardiovascular", icon: "❤️", note: "CRP, NLR, fibrinogen" },
    { label: "Neurological", icon: "🧠", note: "IL-6, TNF-α links" },
    { label: "Metabolic", icon: "🩸", note: "Insulin resistance" },
    { label: "Autoimmune", icon: "🦠", note: "Gut-immune axis" },
    { label: "Pulmonary", icon: "🫁", note: "Airways, surfactant" },
    { label: "Musculoskeletal", icon: "🦴", note: "Joint, tendon load" },
  ] satisfies DiseaseCard[],
  barLabel: "Inflammatory Load — Where Are You On This Spectrum?",
  spectrumLabels: ["Optimal", "Elevated", "High", "Critical"],
  fillPercent: 68,
};

export const wellnessDisclaimerText =
  "GutGuard BioScan is a wellness monitoring service — not a diagnostic test and not a treatment for any disease. The GLIS score does not replace your doctor’s diagnosis or any prescribed medical treatment. Always continue any treatment your physician has prescribed.";

export const howItWorksContent = {
  heading: "Control the Direction.",
  subheading: "Three steps. 48 hours.",
  paragraph:
    "No new blood draw required. Your existing CBC or metabolic panel contains everything we need.",
  steps: [
    {
      number: "1",
      title: "Upload your existing blood panel",
      body: "Any recent CBC, lipid panel, or metabolic panel from your clinic or laboratory. We extract 8 inflammatory markers from what you already have — no new blood draw, no clinic visit.",
      badge: "10 minutes from your phone",
      badgeTone: "blue",
      icon: "file",
    },
    {
      number: "2",
      title: "A physician reviews your 8 markers",
      body: "An independent licensed physician reviews your BioScan through the GutGuard platform within 48 hours. They calculate your GLIS score from the 8 markers, assess your inflammatory trajectory, and approve your protocol.",
      badge: "Licensed Philippine physician",
      badgeTone: "gold",
      icon: "user",
    },
    {
      number: "3",
      title:
        "Your physician-approved GutGuard Lifestyle Protocol activates. Your score moves.",
      body: "Your Pre→Pro→Postbiotic formula is matched to your specific GLIS score — not a generic protocol. Re-scanned at Day 30, 60, and 90. If the score isn't moving at Day 30, your physician adjusts the protocol.",
      badge: "Monitored every 30 days",
      badgeTone: "green",
      icon: "pulse",
    },
  ] satisfies StepItem[],
};

export const markersSectionContent = {
  tag: "The BioScan",
  heading: "Eight markers.\nOne direction.",
  paragraph:
    "The GLIS score is calculated from 8 markers your doctor already orders. Each one is a documented inflammatory signal. Together they give a number — and a trajectory.",
  markers: [
    {
      shortName: "hs-CRP",
      fullName: "High-sensitivity C-Reactive Protein",
      role: "Primary Inflammation Marker",
    },
    {
      shortName: "NLR",
      fullName: "Neutrophil-Lymphocyte Ratio",
      role: "Immune Stress Index",
    },
    {
      shortName: "Ferritin",
      fullName: "Serum Ferritin Level",
      role: "Iron / Inflammatory Store",
    },
    {
      shortName: "Glucose (FBS)",
      fullName: "Fasting Blood Sugar",
      role: "Metabolic Load Driver",
    },
    {
      shortName: "HDL-C",
      fullName: "High-Density Lipoprotein",
      role: "Anti-Inflammatory Indicator",
    },
    {
      shortName: "ALT",
      fullName: "Alanine Aminotransferase",
      role: "Hepatic Stress Signal",
    },
    {
      shortName: "Uric Acid",
      fullName: "Serum Uric Acid",
      role: "Oxidative Stress Marker",
    },
    {
      shortName: "Lymphocyte %",
      fullName: "Differential Lymphocyte Count",
      role: "Immune System Capacity",
    },
  ] satisfies MarkerCard[],
  formulaCards: [
    {
      label: "Component 1",
      name: "Prebiotics",
      body: "Patented prebiotics — feeds the gut microbiome selectively",
    },
    {
      label: "Component 2",
      name: "Probiotics",
      body: "Nano-encapsulated target-specific strains — reaches the gut alive",
    },
    {
      label: "Component 3 — Postbiotics",
      name: "Urolithin-A · L-Tryptophan",
      body: "Activates the Mitochondria Bio-regeneration System (MBS)",
    },
  ] satisfies FormulaCard[],
};

export const legalFirewallText =
  "The research associations above are drawn from peer-reviewed literature and describe population-level findings — they are not product claims. GutGuard SynBIOTIC+ is a licensed lifestyle food supplement, not a treatment for any disease. The GLIS score is an internal wellness monitoring framework — it has not been independently peer-reviewed or validated as a clinical diagnostic instrument. Continue any treatment prescribed by your physician.";

export const offerSectionContent = {
  tag: "The Protocol",
  titleLead: "Not a supplement.",
  titleAccent: "A direction — with a doctor watching it change.",
  paragraph:
    "Choose the protocol that matches your commitment. Every tier includes physician BioScan review, GLIS scoring, and a matched Pre→Pro→Postbiotic formula. Higher tiers extend your monitoring and supply.",
  disclaimerTitle: "Important:",
  disclaimerBody:
    "GutGuard SynBIOTIC+ is a licensed lifestyle food supplement — not a prescription medicine. The GLIS score is a wellness indicator — not a medical diagnosis. Do not discontinue any prescribed medication or treatment based on your GLIS score. Always consult your physician.",
  includes: [
    "BioScan + GLIS Score",
    "Physician review & approval",
    "Matched Pre→Pro→Postbiotic formula",
    "Urolithin-A + L-Tryptophan Postbiotics",
    "90-day money-back guarantee",
  ],
};

export const offerCards: OfferCard[] = [
  {
    name: "Trial",
    capsuleSummary: "10 capsules · 1 bottle · 1 BioScan",
    pricePerCapsule: "₱130",
    total: "₱1,299 total · 10 caps",
    review: "1 BioScan review included",
    href: "gutguard-patient-portal-v33.html",
    ctaLabel: "Start Trial →",
  },
  {
    name: "Start",
    capsuleSummary: "40 capsules · 4 bottles · 1 BioScan",
    pricePerCapsule: "₱115",
    total: "₱4,900 total · 40 caps",
    review: "1 BioScan review included",
    href: "gutguard-patient-portal-v33.html",
    ctaLabel: "Start Protocol →",
  },
  {
    name: "Grow",
    capsuleSummary: "120 capsules · 12 bottles · 3 BioScans",
    pricePerCapsule: "₱103",
    total: "₱13,000 total · 120 caps",
    review: "3 BioScan reviews · Day 0, 45, 90",
    href: "gutguard-patient-portal-v33.html",
    ctaLabel: "Start Grow →",
    featured: true,
  },
  {
    name: "Power",
    capsuleSummary: "400 capsules · 40 bottles · 3 BioScans",
    pricePerCapsule: "₱87",
    total: "₱39,000 total · 400 caps",
    review: "3 BioScan reviews · full-cycle supply",
    href: "gutguard-patient-portal-v33.html",
    ctaLabel: "Start Power →",
  },
];

export const doctorStripContent = {
  name: "Dr. Shane Animas, MD",
  title:
    "Medical Director (oversight & advisory) · IG International / GutGuard · Internal Medicine",
  quote:
    "Every patient who submits a BioScan gets a physician's eyes on their data before anything is activated. The protocol is matched to a specific GLIS number — not a generic template. If the score isn't moving at Day 30, we adjust it.",
  stats: [
    {
      value: "127",
      label: "Protocols reviewed",
      color: "var(--grn)",
      count: 127,
    },
    {
      value: "48h",
      label: "Review turnaround",
      color: "var(--bl)",
    },
    {
      value: "PRC Verified",
      label: "Licensed physician",
      color: "var(--gld)",
    },
  ] satisfies DoctorStat[],
};

export const patientVoicesContent = {
  tag: "Patient Stories",
  titleLead: "What it looks like",
  titleAccent: "when the number moves.",
  paragraph:
    "Two patients. Same frustration — \"normal labs\" while feeling everything but normal. Different scores, same direction.",
  threads: [
    {
      initials: "MC",
      name: "M. Cruz, 47",
      meta: "Grow Protocol · GenSan · GLIS 68 → 29",
      avatarColor: "var(--ter)",
      messages: [
        {
          direction: "incoming",
          text: "Parang ang OA ko pero I've been exhausted for two years. Bloodwork lagi \"within normal limits.\"",
        },
        {
          direction: "outgoing",
          text: "That's exactly what GLIS 68 looks like. Your hs-CRP and NLR are both in the high-normal zone — technically fine individually, but together they tell a different story.",
        },
        {
          direction: "incoming",
          text: "Day 30 na. GLIS ko 51 na. Hindi pa dramatic pero I actually slept through the night for the first time in months.",
        },
        {
          direction: "outgoing",
          text: "That tracks — the sleep improvement usually shows before the score drops significantly. Day 60 re-scan is next. Keep going.",
        },
        {
          direction: "incoming",
          text: "Day 90. GLIS 29. Diba 68 siya dati? Hindi ko mapigilang iyak 😭",
          time: "✓✓ Read",
        },
      ],
    },
    {
      initials: "RB",
      name: "R. Buenaventura, 52",
      meta: "Power Protocol · Davao · GLIS 74 → 31",
      avatarColor: "var(--grn)",
      messages: [
        {
          direction: "incoming",
          text: "My doctor says I'm healthy. But my knees, my back — parang every day may inflammation. Sabi ko nga \"doctor-healthy\" lang ako.",
        },
        {
          direction: "outgoing",
          text: "GLIS 74. You're right that your standard labs look fine — but your NLR is 3.9 and ferritin is elevated. That's a real signal. You're not imagining it.",
        },
        {
          direction: "incoming",
          text: "Finally. Someone said it's real. Sige, anong protocol?",
        },
        {
          direction: "outgoing",
          text: "Power Protocol for your score range. Day 30 re-scan scheduled — we'll see the first movement there.",
        },
        {
          direction: "incoming",
          text: "Day 90 na. 31 na yung GLIS ko. Yung knees ko — I can go up stairs without stopping now. Unbelievable.",
          time: "✓✓ Read",
        },
      ],
    },
  ] satisfies PatientThread[],
};

export const guaranteeContent = {
  heading: "The Number Moves or the Money Does.",
  paragraph:
    "Complete 90 days. Follow the protocol. If your GLIS score doesn't show measurable improvement — your supplement cost comes back in full. No forms. No arguments. Cash back to the same account you paid from.",
};

export const qualificationContent = {
  tag: "Honest About Fit",
  heading: "This is not for everyone.\nWe mean that.",
  yesTitle: "Good fit ✓",
  noTitle: "Not a fit ✗",
  yesItems: [
    "Filipino adults 35–60 with fatigue, joint pain, or brain fog their labs call \"normal\"",
    "Anyone with a family history of cardiovascular, metabolic, or autoimmune disease",
    "People who have recent bloodwork and want to know what it's actually telling them",
    "Those who want a physician watching their direction — not just a pill",
  ],
  noItems: [
    "Anyone expecting symptom relief in the first two weeks — this is a 90-day trajectory protocol",
    "Those currently on immunosuppressants or biologics — consult your specialist first",
    "Pregnant or breastfeeding — not evaluated for this group",
    "Anyone looking for a diagnosis — GLIS is a wellness score, not a clinical test",
  ],
};

export const closingCtaContent = {
  headingLead: "Somewhere between your last clean blood test and",
  headingAccent: "\"We need to talk\" is a window.",
  paragraph:
    "Most people don't know the window exists. Most find out it closed from a specialist's office. You're finding out now.",
  proofItems: [
    "Existing labs only",
    "48-hour physician review",
    "90-day money-back",
    "FDA-PH registered",
  ],
};

export const footerContent = {
  links: [
    { label: "Are you a physician?", href: "gutguard-physician-acquisition.html" },
    { label: "Patient Portal", href: "gutguard-patient-portal-v33.html" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Refund Policy", href: "#" },
    { label: "Contact", href: "#" },
  ] satisfies FooterLink[],
  disclaimerLead:
    "FDA-PH · CPR FR-4XXXXXXX · Medical Director (advisory): Dr. Shane Animas, MD · PRC Lic. 0098732 · Internal Medicine · General Santos City",
  disclaimer:
    "GutGuard SynBIOTIC+ is a licensed lifestyle food supplement (FDA-PH CPR FR-4XXXXXXX · LTO FDO-XXXXXXX). It is not intended to diagnose, treat, cure, or prevent any disease. The GLIS (Gut-Lifestyle Inflammation Score) is a composite biological score targeting inflammaging — chronic low-grade systemic inflammation — documented in the GLIS Clinical Methodology v1.3 (April 2026). It is a wellness screening tool, not a clinical diagnostic instrument. The methodology is based on peer-reviewed inflammaging literature; the specific composite has not yet undergone independent peer-reviewed validation (study planned Q3 2026, target publication Philippine Journal of Internal Medicine). Protocol assignment is a supplement recommendation, not a prescription act under RA 9173 or the Medical Act. Research associations are drawn from published peer-reviewed literature and do not constitute product claims. Individual results vary. *Outcome data from internal observational tracking (n=127, Apr 2025–Mar 2026) — not a peer-reviewed clinical trial. Not representative of all users. Outcome data from internal tracking of enrolled completers — not a peer-reviewed clinical trial. GLIS is patient-primary: patients can use it independently with their own offline doctor (the default), or opt in to an optional GutGuard supervising physician. Optional supervising physician review is conducted by enrolled independent licensed physicians; Dr. Shane Animas serves as Medical Director in an advisory and optional supervising capacity per RA 2382. Pediatric exclusion: GLIS is for adults 18 and over. Patient data processed under RA 10173 (Data Privacy Act) — patient consent required before BioScan submission. Patients explicitly acknowledge critical findings and are responsible for clinical follow-up with a qualified doctor. Protocol credit redemptions via vRedeem constitute taxable income under the Philippine NIRC (BIR). Physician participation subject to PMA Code of Ethics. Liability of IG International / GutGuard is limited to the purchase price of the protocol in the 12 months preceding any claim. Always consult your physician before starting any supplement protocol. Compliant with RA 9711, RA 7394, RA 10173, and applicable FDA-PH regulations.",
};
