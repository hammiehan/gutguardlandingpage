import { NextRequest, NextResponse } from "next/server";

type PurchaseClickPayload = {
  offer_name?: string;
  offer_href?: string;
  page_url?: string;
  landing_page_url?: string;
  referrer_url?: string;
  ttclid?: string;
  ttp?: string;
  tiktok_pixel_id?: string;
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

function buildPurchaseClickRecord(request: NextRequest, payload: PurchaseClickPayload) {
  const pageUrl = getString(payload.page_url);
  const landingPageUrl = getString(payload.landing_page_url) || pageUrl;
  const urlParams = parseUtmParams(pageUrl);

  return {
    offer_name: getString(payload.offer_name),
    offer_href: getString(payload.offer_href),
    page_url: pageUrl,
    landing_page_url: landingPageUrl,
    referrer_url: getString(payload.referrer_url) || getString(request.headers.get("referer")),
    user_agent: getString(request.headers.get("user-agent")),
    ip_address: getIpAddress(request),
    utm_source: urlParams.utm_source || null,
    utm_medium: urlParams.utm_medium || null,
    utm_campaign: urlParams.utm_campaign || null,
    utm_content: urlParams.utm_content || null,
    utm_term: urlParams.utm_term || null,
    ttclid: getString(payload.ttclid) || urlParams.ttclid || getString(request.cookies.get("ttclid")?.value),
    ttp: getString(payload.ttp) || getString(request.cookies.get("_ttp")?.value),
    tiktok_pixel_id: getString(payload.tiktok_pixel_id),
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

  let payload: PurchaseClickPayload;

  try {
    payload = (await request.json()) as PurchaseClickPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!getString(payload.offer_name) || !getString(payload.offer_href)) {
    return NextResponse.json(
      { error: "Both offer_name and offer_href are required." },
      { status: 400 },
    );
  }

  const purchaseClickRecord = buildPurchaseClickRecord(request, payload);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Prefer: "return=representation",
  };

  if (!isSupabaseOpaqueKey(SUPABASE_SERVICE_ROLE_KEY)) {
    headers.Authorization = `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`;
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/purchase_clicks`, {
    method: "POST",
    headers,
    body: JSON.stringify(purchaseClickRecord),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();

    return NextResponse.json(
      { error: "Failed to store purchase click.", details: errorText },
      { status: 500 },
    );
  }

  const [savedClick] = (await response.json()) as Array<{ id: string }>;

  return NextResponse.json({ ok: true, id: savedClick?.id ?? null });
}
