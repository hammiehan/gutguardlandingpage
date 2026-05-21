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
  label?: string;
  labelLines: string[];
  color: string;
  glow?: string;
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
  tag: "For Filipinos 35\u201355",
  titleLead: "Your doctor measures\ndisease.",
  titleAccent: "Nobody measures\nwhat comes before it.",
  paragraphs: [
    "That something is chronic inflammation \u2014 the documented upstream driver across virtually every major disease category. Your inflammatory load is measurable. It has a direction.",
    "And once you can see the direction, you can change it. GutGuard BioScan puts a number on your inflammation. Your enrolled independent physician monitors your GLIS wellness score. A matched protocol moves it. The direction is now yours.",
  ],
  trustItems: ["FDA-PH Registered", "Physician-reviewed", "90-day guarantee"],
};

export const heroRingStates: Record<HeroState, HeroRingState> = {
  before: {
    score: 74,
    progressDegrees: 266,
    verdict: "\u26A0 Elevated Inflammation",
    color: "#D42020",
    glow: "rgba(212,32,32,.5)",
    chips: [
      { label: "hs-CRP \u2191", tone: "hi" },
      { label: "NLR \u2191", tone: "hi" },
      { label: "Glucose \u2191", tone: "mid" },
      { label: "Ferritin \u2191", tone: "mid" },
      { label: "HDL \u2713", tone: "ok" },
      { label: "ALT \u2713", tone: "ok" },
    ],
  },
  after: {
    score: 31,
    progressDegrees: 111,
    verdict: "\u2713 Inflammation Controlled",
    color: "#5CB882",
    glow: "rgba(92,184,130,.45)",
    chips: [
      { label: "hs-CRP \u2713", tone: "ok" },
      { label: "NLR \u2713", tone: "ok" },
      { label: "Glucose \u2713", tone: "ok" },
      { label: "Ferritin \u2713", tone: "ok" },
      { label: "HDL \u2713", tone: "ok" },
      { label: "ALT \u2713", tone: "ok" },
    ],
  },
};

export const proofStats = [
  {
    value: "127",
    suffix: "",
    label: "Patients enrolled* & tracked",
    labelLines: ["Patients enrolled*", "& tracked"],
    color: "var(--grn)",
    glow: "rgba(92,184,130,.18)",
  },
  {
    value: "28",
    suffix: "pts",
    label: "Avg GLIS drop* per 90-day cycle",
    labelLines: ["Avg GLIS drop*", "per 90-day cycle"],
    color: "var(--bl)",
    glow: "rgba(59,130,200,.18)",
  },
  {
    value: "48",
    suffix: "hrs",
    label: "Physician review turnaround",
    labelLines: ["Physician review", "turnaround"],
    color: "var(--gld)",
    glow: "rgba(245,196,88,.18)",
  },
  {
    value: "3",
    suffix: "tx",
    label: "Physician re-scans over 90 days",
    labelLines: ["Physician re-scans", "over 90 days"],
    color: "var(--ter)",
    glow: "rgba(61,207,190,.18)",
  },
] satisfies StatItem[];

export const whyInflammationContent = {
  tag: "Published Research",
  heading:
    "Inflammation is the documented upstream driver in virtually every major disease.",
  paragraph:
    "Peer-reviewed literature links chronic low-grade inflammation to all of the following. You don't need to develop any of them. You need to know your direction before one of them becomes your diagnosis.",
  diseases: [
    { label: "Cardiovascular", icon: "\u2764\uFE0F", note: "CRP, NLR, fibrinogen" },
    { label: "Neurological", icon: "\uD83E\uDDE0", note: "IL-6, TNF-\u03B1 links" },
    { label: "Metabolic", icon: "\uD83E\uDE78", note: "Insulin resistance" },
    { label: "Autoimmune", icon: "\uD83E\uDDA0", note: "Gut-immune axis" },
    { label: "Pulmonary", icon: "\uD83E\uDEC1", note: "Airways, surfactant" },
    { label: "Musculoskeletal", icon: "\uD83E\uDDB4", note: "Joint, tendon load" },
  ] satisfies DiseaseCard[],
  barLabel: "Inflammatory Load \u2014 Where Are You On This Spectrum?",
  spectrumLabels: ["Optimal", "Elevated", "High", "Critical"],
  fillPercent: 68,
};

export const wellnessDisclaimerText =
  "GutGuard BioScan is a wellness monitoring service \u2014 not a diagnostic test and not a treatment for any disease. The GLIS score does not replace your doctor\u2019s diagnosis or any prescribed medical treatment. Always continue any treatment your physician has prescribed.";

export const howItWorksContent = {
  heading: "Control the Direction.",
  subheading: "Three steps. 48 hours.",
  paragraph:
    "No new blood draw required. Your existing CBC or metabolic panel contains everything we need.",
  steps: [
    {
      number: "1",
      title: "Upload your existing blood panel",
      body: "Any recent CBC, lipid panel, or metabolic panel from your clinic or laboratory. We extract 8 inflammatory markers from what you already have \u2014 no new blood draw, no clinic visit.",
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
      body: "Your Pre\u2192Pro\u2192Postbiotic formula is matched to your specific GLIS score \u2014 not a generic protocol. Re-scanned at Day 30, 60, and 90. If the score isn't moving at Day 30, your physician adjusts the protocol.",
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
    "The GLIS score is calculated from 8 markers your doctor already orders. Each one is a documented inflammatory signal. Together they give a number \u2014 and a trajectory.",
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
      body: "Patented prebiotics \u2014 feeds the gut microbiome selectively",
    },
    {
      label: "Component 2",
      name: "Probiotics",
      body: "Nano-encapsulated target-specific strains \u2014 reaches the gut alive",
    },
    {
      label: "Component 3 \u2014 Postbiotics",
      name: "Urolithin-A \u00B7 L-Tryptophan",
      body: "Activates the Mitochondria Bio-regeneration System (MBS)",
    },
  ] satisfies FormulaCard[],
};

export const legalFirewallText =
  "The research associations above are drawn from peer-reviewed literature and describe population-level findings \u2014 they are not product claims. GutGuard SynBIOTIC+ is a licensed lifestyle food supplement, not a treatment for any disease. The GLIS score is an internal wellness monitoring framework \u2014 it has not been independently peer-reviewed or validated as a clinical diagnostic instrument. Continue any treatment prescribed by your physician.";

export const offerSectionContent = {
  tag: "The Protocol",
  titleLead: "Not a supplement.",
  titleAccent: "A direction \u2014 with a doctor watching it change.",
  paragraph:
    "Choose the protocol that matches your commitment. Every tier includes physician BioScan review, GLIS scoring, and a matched Pre\u2192Pro\u2192Postbiotic formula. Higher tiers extend your monitoring and supply.",
  disclaimerTitle: "Important:",
  disclaimerBody:
    "GutGuard SynBIOTIC+ is a licensed lifestyle food supplement \u2014 not a prescription medicine. The GLIS score is a wellness indicator \u2014 not a medical diagnosis. Do not discontinue any prescribed medication or treatment based on your GLIS score. Always consult your physician.",
  includes: [
    "BioScan + GLIS Score",
    "Physician review & approval",
    "Matched Pre\u2192Pro\u2192Postbiotic formula",
    "Urolithin-A + L-Tryptophan Postbiotics",
    "90-day money-back guarantee",
  ],
};

export const offerCards: OfferCard[] = [
  {
    name: "Trial",
    capsuleSummary: "10 capsules \u00B7 1 bottle \u00B7 1 BioScan",
    pricePerCapsule: "\u20B1130",
    total: "\u20B11,299 total \u00B7 10 caps",
    review: "1 BioScan review included",
    href: "https://www.tiktok.com/view/product/1733428486628607712?encode_params=MIIBpgQMh240QSbo4l4E0UZUBIIBggPdWycRJ-lMiOsgDL_rzWS2MwHb7CyDSDNcDm8-Gy8r0a0gOrDnBNq4DhKy0RI3jLq-cMBK_pcUWJ9TSa_DlSDITVwOQb5CVGNfcE0oTbjT9QUux2QCDLJjkprkxRPIga20g6RH3LqWHJMruUGjHmn_ICgjdQ9tyWrJQ3lpnCW7dqmEKxEx_H1HTl1rPYwjM-9Kch8uMpWHfa6UOhYta_dp3XoOwhaqqJsjGejOOirkCqJEIS5de4xdsAQLBAF0jMXRdKSEwJv3PbVGvpoMMjJs_--3Ce-Vm-uJm_1weugYpOwd4RfbUdAgZgWI_kW4OZTw-8bE_ZpH0_K-1VcZj_-hi4ZMX74NyD1oz1nvqo9XKdznq37WNPYca0MQ6dSi_ODSNxyDakrDAM5mnZsXKFa7QQAinLx170Ra5wpN85YZ-ewSIonNzx1lDqWbno3UbdwRArVpmYGqKwP9KG94qajUF7xKIMRrhxgwQ8ho69jGeLk959xsVqlfGXldwDQLcBsqBBBT_X6avmo-QyguJy1232VI&region=PH&locale=en&source=seller_center&hide_tips=&no-cache=1&e=1",
    ctaLabel: "Start Trial \u2192",
  },
  {
    name: "Start",
    capsuleSummary: "40 capsules \u00B7 4 bottles \u00B7 1 BioScan",
    pricePerCapsule: "\u20B1125",
    total: "\u20B14,999 total \u00B7 40 caps",
    review: "1 BioScan review included",
    href: "https://www.tiktok.com/view/product/1735690226633574112?encode_params=MIIBpgQMShJ5kwAYAJ_1hrMzBIIBgie1ranvRK2TLkQQ9Nk60h2YbvRh1_njfRYNoS23kBtdI9QHFjQQ0vKP9Tnojl1k4KsECEA8TOajc5kR9eglEXMxaKblEngsd8hzuujLSDogK-2Alvr23JrdF34bFVME6SuD3_gG-Y9xETXp0f_gA2ypWUDZZO278IHybbuWMXT9FK2mKFORiv2cTxL2bCRveAANEnFd1EmPExYiQ368MYhP2sOGHjgE9PuhAiKtOLnDfixRi9_1E6O9C1fXclci8GxhrT4kMC81YvqcGqaSWKN4LvluG1wVU-CxU5Dq2g_JOKaGfF_D5k0OtkWP8ChyGrbhpAT6ViKITEfvxSzjU7s6TgyJRaF5S3W34iMMxDiIzCF4-wpZKMIHAChlqm-9m-YDsRLTUZczfBY2YjiD-wYn4yrStp_mj_V5BOhjdcYs3NgBfpdHpL68dp3XoqrvR-yP01TLq8k-oVthiLglYQnDH7-qcDR1kMpVyuoYmMeLzakhKSkKMqpPswEsnJK2j-VaBBDFoel9LTx2BTcUN32RYIbO&region=PH&locale=en&source=seller_center&hide_tips=&no-cache=1&e=1",
    ctaLabel: "Start Protocol \u2192",
  },
  {
    name: "Grow",
    capsuleSummary: "120 capsules \u00B7 12 bottles \u00B7 3 BioScans",
    pricePerCapsule: "\u20B1117",
    total: "\u20B113,999 total \u00B7 120 caps",
    review: "3 BioScan reviews \u00B7 Day 0, 45, 90",
    href: "https://www.tiktok.com/view/product/1735690692352444128?encode_params=MIIBpgQM6gRwTX7tnU3CMwc5BIIBgqb9PASRMlbwByBFx8sG8dBw2qI4JtUHzC4v27UvKNIIt5hcX29oYhj9WXDDLoVLEzJymOZqqdf-jBqyrwpA44__jNCsdwbG5fwnwkn9lZuJLlC6QHWG20-g-K1vqzdi3tIlj-0joow17mXtKIcbCf-8j-zXU3m6oSwLYmTmDysDgMTCDoHLgRjwGpQSEDb2glCH8ymE2UGcXlV1Z9NHoMc5zwF-aVJ32PMNbJPRIsijOg6RjWCLcm6jIQhSVB2M28wllckPQAkdIjQti-c1tpUJLR2h-aoJur0OUfyQtWm6imnGIgPSMwrc_OEYVd9tMrCWmHSD9577s3ZBYQd6zGUznG0r73SfPPWK2gsHAg8NKtbGPtQMgIpRBN-XvIp7SyJgmtLlNQuyFZA-gmtsWIY3EoabtMFFLSDy3nTxF165C6lDAd3uUipa3RydLuyc0RUV8B5NsD1rRZC4jpGRyVtyvmf7T5II96hzuLX4FVixJaJY-Xf9JLlqECR-nyAPY3SKBBDdRBJcB0L-R7luyxaDP-LB&region=PH&locale=en&source=seller_center&hide_tips=&no-cache=1&e=1",
    ctaLabel: "Start Grow \u2192",
    featured: true,
  },
  {
    name: "Peak",
    capsuleSummary: "400 capsules \u00B7 40 bottles \u00B7 3 BioScans",
    pricePerCapsule: "\u20B1100",
    total: "\u20B139,999 total \u00B7 400 caps",
    review: "3 BioScan reviews \u00B7 full-cycle supply",
    href: "https://www.tiktok.com/view/product/1735691058658576096?encode_params=MIIBpgQMrB_SQROzosUZKsuhBIIBgsyscgTJ0mPqIxhoFlw8UMkKGz1y6UVkfFJ3w0SwJWS060qNslbIkTMmYOV6RclFyisE1hhz7v6_yuRt-s__tTXYjEdpNdkMDuO2Xy0zoM2iFGcgk-KJDT49tK6xCNh6csDFn0TDgXe8LmZ4epmeus-Olo_aMA2Tul56BPGTNUoKBKSKH1CTDVQcjB9lg4_NDH6vhSb2C-WrIka66iPxhD8OpSWdn8oZqPAUJguDBSqokgELM2tcdcxtxDLtzQGih_qKOyNDNXPYPsuJn67UxIioJfrir7kpUDyezaW8RkOHDCkTyy1luQXs69B3xTkJEvQCUY8dr-7TheCudPJsF7E4BOEVg1n23-UuvQ4Rftb_S0fyPhnooDE7OAPsRZDtAx5WSigeSEwqxt1FEwy5_CtkT72nhDKnF-HxDchgG7SY2vwgQY--pYvmzI8QcRnjVVC-SOmVzM4axlhCnAnzAKKMqPmBjGwZmr6GRnVDgWrt36krNq125pvPp2G-8F85lrPuBBBdQjsJZ1xOR-oq46mDXRsR&region=PH&locale=en&source=seller_center&hide_tips=&no-cache=1&e=1",
    ctaLabel: "Start Peak \u2192",
  },
];

export const doctorStripContent = {
  name: "Dr. Shane Animas, MD",
  title:
    "Medical Director (oversight & advisory) \u00B7 IG International / GutGuard \u00B7 Internal Medicine",
  quote:
    "Every patient who submits a BioScan gets a physician's eyes on their data before anything is activated. The protocol is matched to a specific GLIS number \u2014 not a generic template. If the score isn't moving at Day 30, we adjust it.",
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
      value: "PRC\nVerified",
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
    "Two patients. Same frustration \u2014 \"normal labs\" while feeling everything but normal. Different scores, same direction.",
  threads: [
    {
      initials: "MC",
      name: "M. Cruz, 47",
      meta: "Grow Protocol \u00B7 GenSan \u00B7 GLIS 68 \u2192 29",
      avatarColor: "var(--ter)",
      messages: [
        {
          direction: "incoming",
          text: "Parang ang OA ko pero I've been exhausted for two years. Bloodwork lagi \"within normal limits.\"",
        },
        {
          direction: "outgoing",
          text: "That's exactly what GLIS 68 looks like. Your hs-CRP and NLR are both in the high-normal zone \u2014 technically fine individually, but together they tell a different story.",
        },
        {
          direction: "incoming",
          text: "Day 30 na. GLIS ko 51 na. Hindi pa dramatic pero I actually slept through the night for the first time in months.",
        },
        {
          direction: "outgoing",
          text: "That tracks \u2014 the sleep improvement usually shows before the score drops significantly. Day 60 re-scan is next. Keep going.",
        },
        {
          direction: "incoming",
          text: "Day 90. GLIS 29. Diba 68 siya dati? Hindi ko mapigilang iyak \uD83D\uDE2D",
          time: "\u2713\u2713 Read",
        },
      ],
    },
    {
      initials: "RB",
      name: "R. Buenaventura, 52",
      meta: "Power Protocol \u00B7 Davao \u00B7 GLIS 74 \u2192 31",
      avatarColor: "var(--grn)",
      messages: [
        {
          direction: "incoming",
          text: "My doctor says I'm healthy. But my knees, my back \u2014 parang every day may inflammation. Sabi ko nga \"doctor-healthy\" lang ako.",
        },
        {
          direction: "outgoing",
          text: "GLIS 74. You're right that your standard labs look fine \u2014 but your NLR is 3.9 and ferritin is elevated. That's a real signal. You're not imagining it.",
        },
        {
          direction: "incoming",
          text: "Finally. Someone said it's real. Sige, anong protocol?",
        },
        {
          direction: "outgoing",
          text: "Power Protocol for your score range. Day 30 re-scan scheduled \u2014 we'll see the first movement there.",
        },
        {
          direction: "incoming",
          text: "Day 90 na. 31 na yung GLIS ko. Yung knees ko \u2014 I can go up stairs without stopping now. Unbelievable.",
          time: "\u2713\u2713 Read",
        },
      ],
    },
  ] satisfies PatientThread[],
};

export const guaranteeContent = {
  heading: "The Number Moves or the Money Does.",
  paragraph:
    "Complete 90 days. Follow the protocol. If your GLIS score doesn't show measurable improvement \u2014 your supplement cost comes back in full. No forms. No arguments. Cash back to the same account you paid from.",
};

export const qualificationContent = {
  tag: "Honest About Fit",
  heading: "This is not for everyone.\nWe mean that.",
  yesTitle: "Good fit \u2713",
  noTitle: "Not a fit \u2717",
  yesItems: [
    "Filipino adults 35\u201360 with fatigue, joint pain, or brain fog their labs call \"normal\"",
    "Anyone with a family history of cardiovascular, metabolic, or autoimmune disease",
    "People who have recent bloodwork and want to know what it's actually telling them",
    "Those who want a physician watching their direction \u2014 not just a pill",
  ],
  noItems: [
    "Anyone expecting symptom relief in the first two weeks \u2014 this is a 90-day trajectory protocol",
    "Those currently on immunosuppressants or biologics \u2014 consult your specialist first",
    "Pregnant or breastfeeding \u2014 not evaluated for this group",
    "Anyone looking for a diagnosis \u2014 GLIS is a wellness score, not a clinical test",
  ],
};

export const closingCtaContent = {
  headingLead: "Somewhere between your last clean blood test and",
  headingAccent: "\"We need to talk\"",
  headingSuffix: "is a window.",
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
    "FDA-PH \u00B7 CPR FR-4XXXXXXX \u00B7 Medical Director (advisory): Dr. Shane Animas, MD \u00B7 PRC Lic. 0098732 \u00B7 Internal Medicine \u00B7 General Santos City",
  disclaimer:
    "GutGuard SynBIOTIC+ is a licensed lifestyle food supplement (FDA-PH CPR FR-4XXXXXXX \u00B7 LTO FDO-XXXXXXX). It is not intended to diagnose, treat, cure, or prevent any disease. The GLIS (Gut-Lifestyle Inflammation Score) is a composite biological score targeting inflammaging \u2014 chronic low-grade systemic inflammation \u2014 documented in the GLIS Clinical Methodology v1.3 (April 2026). It is a wellness screening tool, not a clinical diagnostic instrument. The methodology is based on peer-reviewed inflammaging literature; the specific composite has not yet undergone independent peer-reviewed validation (study planned Q3 2026, target publication Philippine Journal of Internal Medicine). Protocol assignment is a supplement recommendation, not a prescription act under RA 9173 or the Medical Act. Research associations are drawn from published peer-reviewed literature and do not constitute product claims. Individual results vary. *Outcome data from internal observational tracking (n=127, Apr 2025\u2013Mar 2026) \u2014 not a peer-reviewed clinical trial. Not representative of all users. Outcome data from internal tracking of enrolled completers \u2014 not a peer-reviewed clinical trial. GLIS is patient-primary: patients can use it independently with their own offline doctor (the default), or opt in to an optional GutGuard supervising physician. Optional supervising physician review is conducted by enrolled independent licensed physicians; Dr. Shane Animas serves as Medical Director in an advisory and optional supervising capacity per RA 2382. Pediatric exclusion: GLIS is for adults 18 and over. Patient data processed under RA 10173 (Data Privacy Act) \u2014 patient consent required before BioScan submission. Patients explicitly acknowledge critical findings and are responsible for clinical follow-up with a qualified doctor. Protocol credit redemptions via vRedeem constitute taxable income under the Philippine NIRC (BIR). Physician participation subject to PMA Code of Ethics. Liability of IG International / GutGuard is limited to the purchase price of the protocol in the 12 months preceding any claim. Always consult your physician before starting any supplement protocol. Compliant with RA 9711, RA 7394, RA 10173, and applicable FDA-PH regulations.",
};
