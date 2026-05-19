import { NextRequest, NextResponse } from "next/server";

type LeadPayload = {
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  lead_source?: string;
  lead_status?: string;
  consent_marketing?: boolean;
  consent_privacy?: boolean;
  notes?: string;
  page_url?: string;
  landing_page_url?: string;
  referrer_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ttclid?: string;
  ttp?: string;
  tiktok_pixel_id?: string;
  tik_tok_event?: string;
  click_id?: string;
  ad_platform?: string;
  campaign_id?: string;
  adgroup_id?: string;
  ad_id?: string;
  metadata?: Record<string, unknown>;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function isSupabaseOpaqueKey(key: string) {
  return key.startsWith("sb_publishable_") || key.startsWith("sb_secret_");
}

function getIpAddress(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) {
    return null;
  }

  return forwardedFor.split(",")[0]?.trim() || null;
}

function getString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false;
}

function parseUtmParams(urlValue: string | null) {
  if (!urlValue) {
    return {};
  }

  try {
    const url = new URL(urlValue);

    return {
      utm_source: getString(url.searchParams.get("utm_source")),
      utm_medium: getString(url.searchParams.get("utm_medium")),
      utm_campaign: getString(url.searchParams.get("utm_campaign")),
      utm_content: getString(url.searchParams.get("utm_content")),
      utm_term: getString(url.searchParams.get("utm_term")),
      ttclid: getString(url.searchParams.get("ttclid")),
    };
  } catch {
    return {};
  }
}

function buildLeadRecord(request: NextRequest, payload: LeadPayload) {
  const pageUrl = getString(payload.page_url);
  const landingPageUrl = getString(payload.landing_page_url) || pageUrl;
  const urlParams = parseUtmParams(pageUrl);

  return {
    full_name: getString(payload.full_name),
    first_name: getString(payload.first_name),
    last_name: getString(payload.last_name),
    email: getString(payload.email),
    phone: getString(payload.phone),
    lead_source: getString(payload.lead_source) || "landing_page",
    lead_status: getString(payload.lead_status) || "new",
    consent_marketing: getBoolean(payload.consent_marketing),
    consent_privacy: getBoolean(payload.consent_privacy),
    notes: getString(payload.notes),
    page_url: pageUrl,
    landing_page_url: landingPageUrl,
    referrer_url: getString(payload.referrer_url) || getString(request.headers.get("referer")),
    user_agent: getString(request.headers.get("user-agent")),
    ip_address: getIpAddress(request),
    utm_source: getString(payload.utm_source) || urlParams.utm_source || null,
    utm_medium: getString(payload.utm_medium) || urlParams.utm_medium || null,
    utm_campaign: getString(payload.utm_campaign) || urlParams.utm_campaign || null,
    utm_content: getString(payload.utm_content) || urlParams.utm_content || null,
    utm_term: getString(payload.utm_term) || urlParams.utm_term || null,
    ttclid: getString(payload.ttclid) || urlParams.ttclid || getString(request.cookies.get("ttclid")?.value),
    ttp: getString(payload.ttp) || getString(request.cookies.get("_ttp")?.value),
    tiktok_pixel_id: getString(payload.tiktok_pixel_id),
    tik_tok_event: getString(payload.tik_tok_event) || "SubmitLead",
    click_id: getString(payload.click_id),
    ad_platform: getString(payload.ad_platform) || "tiktok",
    campaign_id: getString(payload.campaign_id),
    adgroup_id: getString(payload.adgroup_id),
    ad_id: getString(payload.ad_id),
    metadata: payload.metadata && typeof payload.metadata === "object" ? payload.metadata : {},
  };
}

export async function POST(request: NextRequest) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Supabase environment variables are missing." },
      { status: 500 },
    );
  }

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const email = getString(payload.email);
  const phone = getString(payload.phone);

  if (!email && !phone) {
    return NextResponse.json(
      { error: "At least one contact field is required: email or phone." },
      { status: 400 },
    );
  }

  const leadRecord = buildLeadRecord(request, payload);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Prefer: "return=representation",
  };

  // Supabase's new publishable/secret keys are not JWTs and should not be sent
  // as Bearer tokens to PostgREST. Legacy service_role JWTs still can be.
  if (!isSupabaseOpaqueKey(SUPABASE_SERVICE_ROLE_KEY)) {
    headers.Authorization = `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`;
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: "POST",
    headers,
    body: JSON.stringify(leadRecord),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    return NextResponse.json(
      { error: "Failed to store lead.", details: errorText },
      { status: 500 },
    );
  }

  const [savedLead] = (await response.json()) as Array<{ id: string }>;

  return NextResponse.json({ ok: true, id: savedLead?.id ?? null });
}
